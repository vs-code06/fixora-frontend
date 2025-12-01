import React, { useEffect, useState, useCallback, useMemo } from "react";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";
import { connectSocket } from "../lib/socket";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const STATUS_CLASSES = {
  pending: "bg-yellow-50 text-yellow-800 border-yellow-200",
  accepted: "bg-blue-50 text-blue-800 border-blue-200",
  in_progress: "bg-indigo-50 text-indigo-800 border-indigo-200",
  completed: "bg-green-50 text-green-800 border-green-200",
  rejected: "bg-red-50 text-red-800 border-red-200",
  cancelled: "bg-gray-50 text-gray-700 border-gray-200",
};

const statusActions = {
  pending: [
    { label: "Accept", next: "accepted", variant: "primary" },
    { label: "Reject", next: "rejected", variant: "danger" },
    { label: "Cancel", next: "cancelled", variant: "ghost" },
  ],
  accepted: [
    { label: "Start", next: "in_progress", variant: "primary" },
    { label: "Cancel", next: "cancelled", variant: "ghost" },
  ],
  in_progress: [
    { label: "Complete", next: "completed", variant: "primary" },
    { label: "Cancel", next: "cancelled", variant: "ghost" },
  ],
  rejected: [],
  completed: [],
  cancelled: [],
};

function formatDateTime(d) {
  try {
    return new Date(d).toLocaleString();
  } catch {
    return d;
  }
}

function monthKey(dt) {
  const d = new Date(dt);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`; // YYYY-MM
}

function lastNMonths(n = 6) {
  const arr = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    arr.push({
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleString(undefined, { month: "short", year: "numeric" }),
    });
  }
  return arr;
}

/* Confirmation modal component */
function ConfirmModal({ open, title, description, onCancel, onConfirm, loading }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onCancel();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 z-10">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{description}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="px-3 py-2 rounded-md border text-sm">Cancel</button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-3 py-2 rounded-md bg-yellow-400 text-sm font-semibold hover:brightness-95 disabled:opacity-60"
          >
            {loading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* Price modal used when provider completes a booking and must enter the final price */
function PriceModal({ open, booking, onCancel, onSubmit, loading }) {
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      // prefill if booking already has price
      setPrice(booking?.price != null ? String(booking.price) : "");
      setError("");
    } else {
      setPrice("");
      setError("");
    }
  }, [open, booking]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 z-10">
        <h3 className="text-lg font-semibold">Complete booking</h3>
        <p className="mt-2 text-sm text-slate-600">Enter final price for <b>{booking?.serviceTitle}</b></p>

        <div className="mt-4">
          <label className="text-xs text-slate-600">Price (INR)</label>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full border rounded-md px-3 py-2"
            placeholder="e.g. 1200"
          />
          {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="px-3 py-2 rounded-md border text-sm">Cancel</button>
          <button
            onClick={() => {
              const num = Number(price);
              if (Number.isNaN(num) || num <= 0) { setError("Enter a valid positive price"); return; }
              onSubmit(num);
            }}
            disabled={loading}
            className="px-3 py-2 rounded-md bg-yellow-400 text-sm font-semibold hover:brightness-95 disabled:opacity-60"
          >
            {loading ? "Processing..." : "Complete & Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProviderDashboard() {
  const { user, token } = useAuth() || {};
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmPayload, setConfirmPayload] = useState({});

  // new price modal state
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [priceBooking, setPriceBooking] = useState(null);

  const fetchBookings = useCallback(async () => {
    if (!user || user.role !== "provider") {
      setBookings([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await client.get("/bookings/provider");
      setBookings(res.data.data || []);
    } catch (err) {
      console.error("fetch bookings:", err);
      setError(err?.response?.data?.error || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // socket live updates
  useEffect(() => {
    if (!user || user.role !== "provider") return;
    const s = connectSocket(token);
    if (!s) return;

    function upsertBooking(payloadBooking) {
      setBookings(prev => {
        const exists = prev.some(b => String(b._id) === String(payloadBooking._id));
        if (exists) return prev.map(b => (String(b._id) === String(payloadBooking._id) ? payloadBooking : b));
        return [payloadBooking, ...prev];
      });
    }

    function onNotification(payload) {
      if (payload?.booking) upsertBooking(payload.booking);
      else fetchBookings();
    }

    function onBookingCreated(payload) {
      if (payload?.booking) upsertBooking(payload.booking);
      else fetchBookings();
    }

    s.on("notification", onNotification);
    s.on("booking:created", onBookingCreated);

    return () => {
      s.off("notification", onNotification);
      s.off("booking:created", onBookingCreated);
    };
  }, [user, token, fetchBookings]);

  // update status (now accepts optional price)
  async function doUpdateStatus(bookingId, nextStatus, price) {
    setUpdatingId(bookingId);
    try {
      const body = { status: nextStatus };
      if (typeof price === "number") body.price = price;

      const res = await client.patch(`/bookings/${bookingId}/status`, body);
      const updated = res.data.data;
      setBookings(prev => prev.map(b => (String(b._id) === String(updated._id) ? updated : b)));
    } catch (err) {
      console.error("updateStatus:", err);
      alert(err?.response?.data?.error || "Failed to update booking status");
    } finally {
      setUpdatingId(null);
      setConfirmOpen(false);
      setConfirmPayload({});
      setPriceModalOpen(false);
      setPriceBooking(null);
    }
  }

  // open confirm or price modal
  function openConfirm(booking, action) {
    if (action.next === "completed") {
      // open price modal flow
      setPriceBooking(booking);
      setPriceModalOpen(true);
      return;
    }
    setConfirmPayload({
      bookingId: booking._id,
      nextStatus: action.next,
      label: action.label,
      booking,
    });
    setConfirmOpen(true);
  }

  // handle price submitted by provider
  function handlePriceSubmit(priceValue) {
    if (!priceBooking) return;
    doUpdateStatus(priceBooking._id, "completed", priceValue);
  }

  // partition: Active vs Archive
  const active = bookings
    .filter((b) => ["pending", "accepted", "in_progress"].includes(b.status || "pending"))
    .sort((a,b) => new Date(a.scheduledAt) - new Date(b.scheduledAt));
  const archive = bookings
    .filter((b) => ["completed","rejected","cancelled"].includes(b.status || ""))
    .sort((a,b) => new Date(b.scheduledAt) - new Date(a.scheduledAt));

  // Earnings per month (last 6 months)
  const months = lastNMonths(6);
  const earningsByMonth = useMemo(() => {
    const map = {};
    months.forEach(m => { map[m.key] = 0; });

    bookings.forEach(b => {
      const key = monthKey(b.scheduledAt || b.createdAt || new Date());
      const price = typeof b.price === "number" ? b.price : 0; // now only use price (provider sets on complete)
      if (map[key] !== undefined) map[key] += Number(price || 0);
    });

    const chartData = months.map(m => ({ label: m.label, key: m.key, earnings: Math.round(map[m.key] || 0) }));
    const currentKey = months[months.length - 1].key;
    const thisMonthEarnings = Math.round(map[currentKey] || 0);
    return { chartData, thisMonthEarnings };
  }, [bookings, months]);

  // totals
  const totalBookings = bookings.length;
  const totalCompleted = bookings.filter(b => b.status === "completed").length;

  if (!user) {
    return <div className="p-6">Please log in to view your dashboard.</div>;
  }
  if (user.role !== "provider") {
    return <div className="p-6 text-red-600">This page is for providers only.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#1A386A]">Provider Dashboard</h1>
        <p className="text-slate-600 mt-1">Welcome back, <span className="font-semibold">{user.name.split(" ")[0]}</span>. Manage bookings below.</p>
      </div>

      {/* top three */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl p-6 shadow-md bg-[#E9F4FF] border border-[#D9DCE2]">
          <div className="text-sm text-slate-600">Total bookings</div>
          <div className="text-2xl font-bold text-[#1A386A]">{totalBookings}</div>
          <div className="text-xs text-slate-500 mt-2">All time</div>
        </div>

        <div className="rounded-xl p-6 shadow-md bg-white border border-[#ECF1F3]">
          <div className="text-sm text-slate-600">Total completed</div>
          <div className="text-2xl font-bold text-[#1A386A]">{totalCompleted}</div>
          <div className="text-xs text-slate-500 mt-2">Completed bookings</div>
        </div>

        <div className="rounded-xl p-6 shadow-md bg-[#FFF6DC] border border-[#FFE9A5]">
          <div className="text-sm text-slate-600">Earnings (this month)</div>
          <div className="text-2xl font-bold text-[#8A6A00]">₹{earningsByMonth.thisMonthEarnings.toLocaleString()}</div>
          <div className="text-xs text-slate-500 mt-2">Last {months.length} months shown below</div>
        </div>
      </div>

      {/* refresh */}
      <div className="flex items-center justify-end mb-6 gap-3">
        {error && <div className="text-sm text-red-600 mr-4">{error}</div>}
        <button onClick={fetchBookings} disabled={loading} className="px-4 py-2 rounded-md bg-[#1A386A] text-white text-sm font-medium shadow-md hover:bg-[#162d55] transition disabled:opacity-60">
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Active */}
      <section className="mb-10">
        <div className="flex items-center mb-4">
          <div className="w-1 h-6 bg-[#57A7F4] rounded-full mr-3" />
          <h2 className="text-xl font-semibold text-[#1A386A]">Active</h2>
        </div>

        {active.length === 0 ? (
          <div className="p-6 rounded-xl border border-dashed bg-[#F7F9FC] text-center text-slate-500">No active bookings.</div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {active.map(b => (
                <motion.div key={b._id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} layout>
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-[#ECF1F3] hover:shadow-md transition flex flex-col sm:flex-row justify-between gap-3">
                    <div className="flex-1">
                      <div className="text-lg font-semibold text-[#1A386A]">{b.serviceTitle}</div>
                      <div className="text-sm text-slate-600 mt-1">Customer: <span className="font-medium">{b.user?.name}</span></div>
                      <div className="text-sm text-slate-700 mt-2">{b.address}</div>
                      <div className="text-xs text-slate-400 mt-2">Created: {formatDateTime(b.createdAt)}</div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <div className="text-sm text-slate-500">{formatDateTime(b.scheduledAt)}</div>

                      <motion.span layout className={`inline-block px-3 py-1 text-xs rounded-full border font-medium capitalize ${STATUS_CLASSES[b.status]}`}>
                        {b.status.replace("_", " ")}
                      </motion.span>

                      <div className="flex gap-2">
                        {statusActions[b.status]?.map(action => (
                          <button
                            key={action.next}
                            onClick={() => openConfirm(b, action)}
                            disabled={updatingId === b._id}
                            className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                              action.variant === "primary"
                                ? "bg-[#57A7F4] text-white hover:bg-[#4b91d6]"
                                : action.variant === "danger"
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "border text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            {updatingId === b._id ? "…" : action.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Archive */}
      <section className="mb-10">
        <div className="flex items-center mb-4">
          <div className="w-1 h-6 bg-[#1A386A] rounded-full mr-3" />
          <h2 className="text-xl font-semibold text-[#1A386A]">Archive</h2>
        </div>

        {archive.length === 0 ? (
          <div className="p-6 rounded-xl border border-dashed bg-[#F7F9FC] text-center text-slate-500">No archived bookings.</div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {archive.map(b => (
                <motion.div key={b._id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} layout>
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-[#ECF1F3] flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium text-[#1A386A]">{b.serviceTitle}</div>
                      <div className="text-xs text-slate-500">{b.user?.name} · {formatDateTime(b.scheduledAt)}</div>
                    </div>

                    <div className="flex items-center gap-4">
                      <motion.span layout className={`px-3 py-1 text-xs rounded-full border font-medium capitalize ${STATUS_CLASSES[b.status]}`}>
                        {b.status.replace("_", " ")}
                      </motion.span>
                      {b.status === "completed" && typeof b.price === "number" && (
                        <div className="text-sm text-slate-600">₹{Number(b.price).toLocaleString()}</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* Earnings chart (bottom) */}
      <section className="mb-12">
        <div className="flex items-center mb-4">
          <div className="w-1 h-6 bg-[#57A7F4] rounded-full mr-3" />
          <h2 className="text-xl font-semibold text-[#1A386A]">Earnings (last {months.length} months)</h2>
        </div>

        <div className="rounded-xl p-4 bg-white border border-[#ECF1F3] shadow-sm">
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsByMonth.chartData}>
                <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `₹${v}`} />
                <Tooltip formatter={(value) => `₹${value}`} />
                <Bar dataKey="earnings" fill="#57A7F4" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Confirm Modal */}
      <ConfirmModal
        open={confirmOpen}
        title={confirmPayload.label || "Confirm"}
        description={confirmPayload.booking ? `Are you sure you want to mark "${confirmPayload.booking.serviceTitle}" as ${confirmPayload.label}?` : `Are you sure?`}
        loading={updatingId === confirmPayload.bookingId}
        onCancel={() => { setConfirmOpen(false); setConfirmPayload({}); }}
        onConfirm={() => doUpdateStatus(confirmPayload.bookingId, confirmPayload.nextStatus)}
      />

      {/* Price Modal */}
      <PriceModal
        open={priceModalOpen}
        booking={priceBooking}
        onCancel={() => { setPriceModalOpen(false); setPriceBooking(null); }}
        loading={updatingId === priceBooking?._id}
        onSubmit={handlePriceSubmit}
      />
    </div>
  );
}
