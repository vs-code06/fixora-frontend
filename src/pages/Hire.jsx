import React, { useEffect, useState } from "react";
import client from "../api/client"; 
import BookingModal from "../components/BookingModal";
import HireCard from "../components/HireCard";

function DummyProfileModal({ provider, open, onClose, onHire }) {
  if (!open) return null;
  const dummy = {
    bio: "Experienced professional offering reliable home services. Trusted by local customers for quality and punctuality.",
    phone: "9876 543 210",
    location: "Sample City",
    hourlyRate: "₹500 / hr",
    services: ["Inspection", "Repair", "Installation"],
    availability: "Mon - Sat, 9:00 AM - 6:00 PM",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-lg font-semibold">{provider?.name || "Provider"}</div>
            <div className="text-xs text-slate-500">{(provider?.categories || []).join(", ") || "General"}</div>
          </div>
          <button onClick={onClose} className="text-sm text-gray-500">Close</button>
        </div>

        <div className="mt-4 space-y-3 text-sm text-slate-700">
          <p>{dummy.bio}</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <div className="text-xs text-slate-500">Phone</div>
              <div className="font-medium">{dummy.phone}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Location</div>
              <div className="font-medium">{dummy.location}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-2 rounded-md border text-sm">Close</button>
          <button
            onClick={() => {
              onClose();
              onHire && onHire(provider);
            }}
            className="px-3 py-2 rounded-md bg-yellow-400 text-sm font-semibold"
          >
            Hire
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Hire() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  const [providers, setProviders] = useState([]);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [bookingProvider, setBookingProvider] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const categories = ["Plumbing", "Cleaning", "Electrical", "AC Repair", "Painting", "Carpentry"];

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");
    (async () => {
      try {
        const params = {
          q: q || undefined,
          category: category || undefined,
          page,
          pageSize,
        };
        const res = await client.get("/providers", { params });
        if (!mounted) return;
        setProviders(res.data.data || []);
        setMeta(res.data.meta || { total: 0, totalPages: 1 });
      } catch (err) {
        console.error(err);
        setError("Failed to load providers");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => (mounted = false);
  }, [q, category, page, pageSize]);

  function getPageWindow(totalPages) {
    const maxWindow = 5;
    if (totalPages <= maxWindow) return [...Array(totalPages)].map((_, i) => i + 1);
    let left = Math.max(1, page - 2);
    let right = Math.min(totalPages, left + maxWindow - 1);
    if (right - left < maxWindow - 1) left = Math.max(1, right - maxWindow + 1);
    return [...Array(right - left + 1)].map((_, i) => left + i);
  }
  const pageWindow = getPageWindow(meta.totalPages || 1);

  // function handleViewProfile(p) {
  //   setSelectedProvider(p);
  //   setIsProfileModalOpen(true);
  // }

  function handleHire(p) {
    setBookingProvider(p);
    setBookingModalOpen(true);
  }

  function handleBooked(booking) {
    try {
      alert("Booking created successfully.");
    } catch (err) {
      console.log("Booked", booking);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Hire Professionals</h1>
            <p className="text-sm text-gray-600 mt-1">Browse trusted local professionals for home services.</p>
          </div>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center bg-white border border-gray-200 rounded-md px-3 py-2 shadow-sm w-full sm:w-[420px]">
              <svg className="w-5 h-5 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10.5 18C6.36 18 3 14.64 3 10.5S6.36 3 10.5 3 18 6.36 18 10.5 14.64 18 10.5 18z" />
              </svg>

              <input
                value={q}
                onChange={(e) => { setQ(e.target.value); setPage(1); }}
                placeholder="Search providers, skills, or city"
                className="flex-1 outline-none text-sm text-gray-700"
                aria-label="Search providers"
              />
              {q && <button onClick={() => { setQ(""); setPage(1); }} className="text-sm text-gray-500 ml-2">Clear</button>}
            </div>

            <select
              value={pageSize}
              onChange={(e) => { setPageSize(parseInt(e.target.value, 10)); setPage(1); }}
              className="mt-2 sm:mt-0 sm:ml-2 border rounded-md px-3 py-2 text-sm bg-white"
              aria-label="Items per page"
            >
              <option value={6}>6 / page</option>
              <option value={9}>9 / page</option>
              <option value={12}>12 / page</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex gap-2 flex-wrap">
          <button onClick={() => { setCategory(""); setPage(1); }} className={`px-3 py-1.5 rounded-md text-sm ${category === "" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}>All</button>
          {categories.map(c => (
            <button key={c} onClick={() => { setCategory(c); setPage(1); }} className={`px-3 py-1.5 rounded-md text-sm ${category === c ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"}`}>{c}</button>
          ))}
          <button onClick={() => { setCategory(""); setQ(""); setPage(1); }} className="ml-2 text-sm text-gray-500 underline">Reset</button>
        </div>
      </div>

      {/* grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: pageSize }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border p-4 animate-pulse h-48" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map(p => (
              <HireCard key={p._id} provider={p} onHire={handleHire} />
            ))}
          </div>

          {providers.length === 0 && <p className="text-center text-gray-600 mt-10">No matching providers found.</p>}

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing <b>{providers.length === 0 ? 0 : (page-1)*pageSize + 1}</b> – <b>{Math.min(meta.total || 0, page*pageSize)}</b> of <b>{meta.total || 0}</b>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} className={`px-3 py-2 rounded-md border text-sm ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}>Prev</button>

              <div className="flex items-center gap-1 overflow-x-auto py-1">
                {pageWindow[0] > 1 && (
                  <>
                    <button onClick={() => setPage(1)} className="px-3 py-1 rounded-md border text-sm">1</button>
                    {pageWindow[0] > 2 && <span className="px-2">…</span>}
                  </>
                )}

                {pageWindow.map(pNum => (
                  <button key={pNum} onClick={() => setPage(pNum)} className={`px-3 py-1 rounded-md border text-sm ${pNum===page ? "bg-blue-600 text-white border-blue-600": ""}`}>{pNum}</button>
                ))}

                {pageWindow[pageWindow.length-1] < (meta.totalPages || 1) && (
                  <>
                    {pageWindow[pageWindow.length-1] < (meta.totalPages || 1) - 1 && <span className="px-2">…</span>}
                    <button onClick={() => setPage(meta.totalPages || 1)} className="px-3 py-1 rounded-md border text-sm">{meta.totalPages || 1}</button>
                  </>
                )}
              </div>

              <button onClick={() => setPage(p => Math.min(meta.totalPages || 1, p+1))} disabled={page === (meta.totalPages || 1)} className={`px-3 py-2 rounded-md border text-sm ${page === (meta.totalPages || 1) ? "opacity-50 cursor-not-allowed" : ""}`}>Next</button>
            </div>
          </div>
        </>
      )}

      <DummyProfileModal
        provider={selectedProvider}
        open={isProfileModalOpen}
        onClose={() => { setIsProfileModalOpen(false); setSelectedProvider(null); }}
        onHire={handleHire}
      />

      <BookingModal
        provider={bookingProvider}
        open={bookingModalOpen}
        onClose={() => { setBookingModalOpen(false); setBookingProvider(null); }}
        onBooked={handleBooked}
      />
    </div>
  );
}
