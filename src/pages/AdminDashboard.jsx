import React, { useEffect, useState, useCallback } from "react";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Tab components
const TabButton = ({ active, label, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${active
            ? "bg-[#1A386A] text-white shadow-md"
            : "text-slate-600 hover:bg-slate-100"
            }`}
    >
        {label}
    </button>
);

// Generic Table
const Table = ({ headers, children }) => (
    <div className="overflow-x-auto rounded-xl border border-[#ECF1F3] bg-white shadow-sm">
        <table className="min-w-full divide-y divide-[#ECF1F3]">
            <thead className="bg-[#F9FAFB]">
                <tr>
                    {headers.map((h, i) => (
                        <th key={i} className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                            {h}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#ECF1F3]">{children}</tbody>
        </table>
    </div>
);



// Confirm Modal
const ConfirmModal = ({ open, title, description, onCancel, onConfirm, loading }) => {
    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") onCancel(); };
        if (open) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onCancel]);

    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 z-10 animate-in fade-in zoom-in duration-200">
                <h3 className="text-lg font-semibold text-[#1A386A]">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{description}</p>
                <div className="mt-6 flex justify-end gap-3">
                    <button onClick={onCancel} className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-slate-50 transition">Cancel</button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-60 transition shadow-sm"
                    >
                        {loading ? "Processing..." : "Confirm"}
                    </button>
                </div>
            </div>
        </div>
    );
};

// Toast Notification
const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-300">
            <div className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 text-white ${type === 'error' ? 'bg-red-600' : 'bg-[#1A386A]'}`}>
                <span className="text-sm font-medium">{message}</span>
                <button onClick={onClose} className="opacity-80 hover:opacity-100">✕</button>
            </div>
        </div>
    );
};

export default function AdminDashboard() {
    const { user } = useAuth() || {};
    const [activeTab, setActiveTab] = useState("users");
    const [loading, setLoading] = useState(false);

    // Filter & Pagination States
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(9);
    const [totalPages, setTotalPages] = useState(1);

    // Data states
    const [users, setUsers] = useState([]);
    const [providers, setProviders] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [queries, setQueries] = useState([]);

    // Modal & Toast state
    const [modal, setModal] = useState({ open: false, title: "", description: "", onConfirm: null });
    const [actionLoading, setActionLoading] = useState(false);
    const [toast, setToast] = useState(null);

    // Fetch logic
    const fetchData = useCallback(async (type, p = 1, l = 9, s = "") => {
        setLoading(true);
        try {
            const res = await client.get(`/admin/${type}?page=${p}&limit=${l}&search=${encodeURIComponent(s)}`);
            const { data, pagination } = res.data;

            if (type === "users") setUsers(data);
            if (type === "providers") setProviders(data);
            if (type === "bookings") setBookings(data);
            if (type === "queries") setQueries(data);

            if (pagination) {
                setTotalPages(pagination.pages);
                setPage(pagination.page);
            }
        } catch (err) {
            console.error(`fetch ${type}`, err);
            setToast({ message: "Failed to load data", type: "error" });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Debounce search
        const timer = setTimeout(() => {
            fetchData(activeTab, page, limit, search);
        }, 500);

        return () => clearTimeout(timer);
    }, [activeTab, page, limit, search, fetchData]);

    // Reset pagination when tab changes
    useEffect(() => {
        setPage(1);
        setSearch("");
    }, [activeTab]);


    // Actions
    const showToast = (msg, type = 'success') => setToast({ message: msg, type });
    const closeModal = () => setModal({ ...modal, open: false });

    // Verify Provider Action
    const initiateVerifyProvider = (id, currentStatus) => {
        setModal({
            open: true,
            title: currentStatus ? "Unverify Provider?" : "Verify Provider?",
            description: `Are you sure you want to ${currentStatus ? "unverify" : "verify"} this provider? They will ${currentStatus ? "lose" : "gain"} the verified badge.`,
            onConfirm: () => handleVerifyProvider(id)
        });
    };

    const handleVerifyProvider = async (id) => {
        setActionLoading(true);
        try {
            const res = await client.patch(`/admin/providers/${id}/verify`);
            setProviders(prev => prev.map(p => p._id === id ? { ...p, isProviderVerified: res.data.data.isProviderVerified } : p));
            showToast("Provider status updated");
            closeModal();
        } catch (err) {
            showToast("Action failed", "error");
        } finally {
            setActionLoading(false);
        }
    };

    // Delete Action
    const initiateDelete = (type, id) => {
        setModal({
            open: true,
            title: "Confirm Deletion",
            description: "Are you sure you want to delete this item? This action cannot be undone.",
            onConfirm: () => handleDelete(type, id)
        });
    };

    const handleDelete = async (type, id) => {
        setActionLoading(true);
        try {
            await client.delete(`/admin/${type}/${id}`);
            if (type === "users") setUsers(prev => prev.filter(u => u._id !== id));
            if (type === "queries") setQueries(prev => prev.filter(q => q._id !== id));
            showToast("Item deleted successfully");
            closeModal();
            // Refresh data to keep pagination in sync
            fetchData(activeTab, page, limit, search);
        } catch (err) {
            showToast("Delete failed", "error");
        } finally {
            setActionLoading(false);
        }
    };

    if (!user || user.role !== "admin") {
        return <div className="p-10 text-center text-red-600">Access Denied. Admins only.</div>;
    }

    // Pagination Component
    const Pagination = () => (
        <div className="flex items-center justify-end gap-2 mt-6">
            <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded border text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
                <FiChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition ${page === p
                        ? "bg-[#2563EB] text-white shadow-md"
                        : "bg-white border text-slate-600 hover:bg-slate-50"
                        }`}
                >
                    {p}
                </button>
            ))}
            <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded border text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
                <FiChevronRight className="w-5 h-5" />
            </button>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-6 min-h-screen">
            <div className="mb-8 flex flex-col items-start gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#1A386A]">Admin Dashboard</h1>
                    <p className="text-slate-600">Manage Fixora platform.</p>
                </div>
                <div className="flex flex-col sm:flex-row w-full justify-between items-center gap-4">
                    <div className="flex gap-2 bg-white p-1 rounded-xl border shadow-sm overflow-x-auto">
                        {["users", "providers", "bookings", "queries"].map(t => (
                            <TabButton key={t} active={activeTab === t} label={t.charAt(0).toUpperCase() + t.slice(1)} onClick={() => setActiveTab(t)} />
                        ))}
                    </div>

                    <div className="flex gap-3 w-full sm:w-auto">
                        {/* Search Input */}
                        <div className="relative flex-1 sm:w-64">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder={`Search ${activeTab}...`}
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1A386A]/20"
                            />
                        </div>

                        {/* Rows per page */}
                        <select
                            value={limit}
                            onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                            className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm text-slate-600 focus:outline-none"
                        >
                            <option value={9}>9 / page</option>
                            <option value={20}>20 / page</option>
                            <option value={50}>50 / page</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="min-h-[400px]">


                {activeTab === "users" && (
                    <div>
                        <h2 className="text-xl font-bold text-[#1A386A] mb-4">Users Management</h2>
                        {loading ? <div className="p-8 text-center text-slate-500">Loading users...</div> : (
                            <>
                                <Table headers={["Name", "Email", "Joined", "Actions"]}>
                                    {users.map(u => (
                                        <tr key={u._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button onClick={() => initiateDelete("users", u._id)} className="text-red-600 hover:text-red-900 font-medium px-3 py-1 rounded hover:bg-red-50 transition">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </Table>
                                {users.length > 0 && <Pagination />}
                            </>
                        )}
                        {!loading && users.length === 0 && <div className="p-8 text-center text-slate-500 bg-white border rounded-xl mt-2">No users found.</div>}
                    </div>
                )}

                {activeTab === "providers" && (
                    <div>
                        <h2 className="text-xl font-bold text-[#1A386A] mb-4">Providers Management</h2>
                        {loading ? <div className="p-8 text-center text-slate-500">Loading providers...</div> : (
                            <>
                                <Table headers={["Name", "Email", "Status", "Joined", "Actions"]}>
                                    {providers.map(p => (
                                        <tr key={p._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{p.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{p.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${p.isProviderVerified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                                                    {p.isProviderVerified ? "Verified" : "Pending"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(p.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                                <button
                                                    onClick={() => initiateVerifyProvider(p._id, p.isProviderVerified)}
                                                    className={`px-3 py-1 rounded transition font-medium ${p.isProviderVerified ? "text-orange-600 hover:bg-orange-50" : "text-green-600 hover:bg-green-50"}`}
                                                >
                                                    {p.isProviderVerified ? "Unverify" : "Verify"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </Table>
                                {providers.length > 0 && <Pagination />}
                            </>
                        )}
                        {!loading && providers.length === 0 && <div className="p-8 text-center text-slate-500 bg-white border rounded-xl mt-2">No providers found.</div>}
                    </div>
                )}

                {activeTab === "bookings" && (
                    <div>
                        <h2 className="text-xl font-bold text-[#1A386A] mb-4">All Bookings</h2>
                        {loading ? <div className="p-8 text-center text-slate-500">Loading bookings...</div> : (
                            <>
                                <Table headers={["Service", "Customer", "Provider", "Status", "Date", "Price"]}>
                                    {bookings.map(b => (
                                        <tr key={b._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{b.serviceTitle}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.user?.name || "Unknown"}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{b.provider?.name || "Unknown"}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${b.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    b.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                        'bg-blue-50 text-blue-800'
                                                    }`}>
                                                    {b.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(b.scheduledAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{b.price || "-"}</td>
                                        </tr>
                                    ))}
                                </Table>
                                {bookings.length > 0 && <Pagination />}
                            </>
                        )}
                        {!loading && bookings.length === 0 && <div className="p-8 text-center text-slate-500 bg-white border rounded-xl mt-2">No bookings found.</div>}
                    </div>
                )}

                {activeTab === "queries" && (
                    <div>
                        <h2 className="text-xl font-bold text-[#1A386A] mb-4">Support Queries</h2>
                        {loading ? <div className="p-8 text-center text-slate-500">Loading queries...</div> : (
                            <>
                                <Table headers={["Name", "Email", "Message", "Date", "Actions"]}>
                                    {queries.map(q => (
                                        <tr key={q._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{q.firstName} {q.lastName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{q.email}</td>
                                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={q.message}>{q.message}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(q.createdAt).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button onClick={() => initiateDelete("queries", q._id)} className="text-red-600 hover:text-red-900 font-medium px-3 py-1 rounded hover:bg-red-50 transition">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </Table>
                                {queries.length > 0 && <Pagination />}
                            </>
                        )}
                        {!loading && queries.length === 0 && <div className="p-8 text-center text-slate-500 bg-white border rounded-xl mt-2">No queries found.</div>}
                    </div>
                )}
            </div>

            {/* Confirm Modal */}
            <ConfirmModal
                open={modal.open}
                title={modal.title}
                description={modal.description}
                onCancel={closeModal}
                onConfirm={modal.onConfirm}
                loading={actionLoading}
            />

            {/* Toast */}
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
}
