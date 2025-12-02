import React, { useEffect, useMemo, useState, useCallback } from "react";
import client from "../api/client";
import dayjs from "dayjs";

const brand = {
  primary: "#FFCE51",
  primaryDark: "#F2C43A",
  accent: "#1A386A",
  secondary1: "#2563EB",
  secondary2: "#E9F4FF",
  neutral800: "#3D4249",
  neutral700: "#586272",
  neutral600: "#9399A2",
  neutral400: "#D9DCE2",
  neutral300: "#ECEFF3",
  neutral200: "#F7F9FC",
  white: "#FFFFFF",
};

function Toast({ toast, onClose }) {
  if (!toast) return null;
  return (
    <div className="fixed right-6 bottom-6 z-50">
      <div
        className="max-w-sm rounded-xl shadow-2xl px-4 py-3"
        style={{
          background: toast.type === "error" ? "rgba(239,68,68,0.95)" : brand.accent,
          color: brand.white,
        }}
      >
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="font-semibold">{toast.title}</div>
            <div className="text-sm mt-1 opacity-90">{toast.message}</div>
          </div>
          <button onClick={onClose} className="ml-2 text-sm opacity-90">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* Remove confirmation modal (replaces window.confirm) */
function RemoveConfirmModal({ open, booking, onCancel, onConfirm, loading }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onCancel();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
      <div className="absolute inset-0" style={{ background: "rgba(10,20,40,0.36)" }} onClick={onCancel} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 z-50">
        {/* Title color changed to black */}
        <h3 className="text-lg font-semibold" style={{ color: "#000" }}>
          Remove booking from list
        </h3>
        <p className="mt-2 text-sm" style={{ color: brand.neutral700 }}>
          This will remove the booking from your bookings list. Are you sure you want delete it!
        </p>

        {booking && (
          <div className="mt-4 p-3 rounded-md" style={{ background: brand.neutral200 }}>
            <div className="text-sm font-medium" style={{ color: brand.accent }}>{booking.serviceTitle}</div>
            <div className="text-xs text-slate-500 mt-1">{booking.provider?.name ?? "—"} · {dayjs(booking.scheduledAt).format("DD MMM YYYY, HH:mm")}</div>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="px-3 py-2 rounded-lg border" style={{ borderColor: brand.neutral300 }}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-3 py-2 rounded-lg text-black font-semibold disabled:opacity-60"
            style={{ background: brand.primary }}
          >
            {loading ? "Removing…" : "Remove from my list"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({ open, title, message, onCancel, onConfirm, loading }) {
  if (!open) return null;
  return (
    <div aria-modal="true" role="dialog" className="fixed inset-0 z-40 flex items-center justify-center px-4">
      <div className="absolute inset-0" style={{ background: "rgba(10,20,40,0.36)" }} onClick={onCancel} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 z-50">
        <h3 className="text-lg font-semibold" style={{ color: brand.accent }}>
          {title}
        </h3>
        <p className="mt-2 text-sm" style={{ color: brand.neutral700 }}>
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="px-3 py-2 rounded-lg border" style={{ borderColor: brand.neutral300 }}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-3 py-2 rounded-lg text-white font-semibold disabled:opacity-60"
            style={{ background: "#ef4444" }}
          >
            {loading ? "Processing…" : "Yes, cancel booking"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailsModal({ open, booking, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center px-4">
      <div className="absolute inset-0" style={{ background: "rgba(10,20,40,0.36)" }} onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-t-xl md:rounded-2xl shadow-2xl p-6 z-50">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold" style={{ color: brand.accent }}>
              {booking?.serviceTitle}
            </h3>
            <div className="text-sm mt-1" style={{ color: brand.neutral700 }}>
              With: <span className="font-medium" style={{ color: brand.accent }}>{booking?.provider?.name ?? "—"}</span>
            </div>
          </div>
          <div className="text-sm" style={{ color: brand.neutral600 }}>
            {dayjs(booking?.createdAt).format("DD MMM YYYY, HH:mm")}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-xs" style={{ color: brand.neutral600 }}>Scheduled</div>
            <div className="font-medium mt-1">{dayjs(booking?.scheduledAt).format("DD MMM YYYY, HH:mm")}</div>
            <div className="text-xs mt-1" style={{ color: brand.neutral400 }}>{booking?.durationHours} hour(s)</div>
          </div>

          <div>
            <div className="text-xs" style={{ color: brand.neutral600 }}>Address</div>
            <div className="font-medium mt-1">{booking?.address}</div>
            <div className="text-xs mt-1" style={{ color: brand.neutral400 }}>{booking?.notes || "No notes"}</div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-sm" style={{ color: brand.neutral600 }}>Status</div>
            <div className="px-3 py-1 rounded-full text-xs font-medium border" style={{ background: brand.neutral200, color: brand.accent, borderColor: brand.neutral300 }}>
              {String(booking?.status ?? "").replace("_", " ")}
            </div>
            {booking?.paid && <div className="text-sm font-semibold" style={{ color: "#16a34a" }}>Paid</div>}
          </div>

          <div className="text-right">
            <div className="text-lg font-bold" style={{ color: brand.accent }}>
              ₹{booking?.price != null ? Number(booking.price).toLocaleString() : (booking?.durationHours * 500).toLocaleString()}
            </div>
            <div className="text-xs" style={{ color: brand.neutral400 }}>{booking?.durationHours} hr</div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border" style={{ borderColor: brand.neutral300 }}>Close</button>
        </div>
      </div>
    </div>
  );
}

/* StatusBadge uses palette tints — text uses accent instead of black */
function StatusBadge({ status }) {
  const styleMap = {
    pending: {
      bg: "rgba(255,206,81,0.12)",
      color: "#664f00",
      border: "rgba(255,206,81,0.28)",
    },
    accepted: {
      bg: "rgba(87,174,244,0.12)",
      color: brand.secondary1,
      border: "rgba(87,174,244,0.25)",
    },
    in_progress: {
      bg: "rgba(26,56,106,0.06)",
      color: brand.accent,
      border: "rgba(26,56,106,0.12)",
    },
    completed: {
      bg: "rgba(16,185,129,0.08)",
      color: "#059669",
      border: "rgba(16,185,129,0.15)",
    },
    rejected: {
      bg: "rgba(239,68,68,0.06)",
      color: "#dc2626",
      border: "rgba(239,68,68,0.12)",
    },
    cancelled: {
      bg: brand.neutral200,
      color: brand.neutral700,
      border: brand.neutral300,
    },
  };

  const s = styleMap[status] || styleMap.pending;

  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border"
      style={{
        background: s.bg,
        color: s.color,
        borderColor: s.border,
      }}
    >
      {String(status).replace("_", " ")}
    </span>
  );
}

function ProviderAvatar({ name, size = 36 }) {
  const initials = (name || "?").split(" ").map(s => s[0]).slice(0, 2).join("");
  return (
    <div
      aria-hidden
      className="flex items-center justify-center rounded-full font-semibold text-sm"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(180deg, ${brand.primary} 0%, ${brand.primaryDark} 100%)`,
        color: brand.accent,
        boxShadow: "0 6px 16px rgba(16,36,58,0.06)",
      }}
    >
      {initials}
    </div>
  );
}

const TABS = [
  { key: "all", label: "All" },
  { key: "upcoming", label: "Upcoming" },
  { key: "in_progress", label: "In Progress" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
  { key: "rejected", label: "Rejected" },
];

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, booking: null, loading: false });
  const [details, setDetails] = useState({ open: false, booking: null });
  const [toast, setToast] = useState(null);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1, counts: null });

  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");

  // pagination state
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(9);

  // remove-modal state
  const [removeOpen, setRemoveOpen] = useState(false);
  const [removeBooking, setRemoveBooking] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  // reusable fetch function (supports optional page override)
  const fetchBookings = useCallback(
    async ({ pageOverride } = {}) => {
      const controller = new AbortController();
      const usedPage = pageOverride ?? page;
      setLoading(true);

      try {
        const res = await client.get("/bookings/me", {
          params: {
            page: usedPage,
            perPage,
            status: activeTab,
            q: query || undefined,
          },
          signal: controller.signal,
        });

        // backend expected to return { data: [...], meta: { total, totalPages, counts? } }
        setBookings(res.data.data || []);
        setMeta(res.data.meta || { total: 0, totalPages: 1, counts: null });
      } catch (err) {
        // ignore aborts
        const isAbort = err?.name === "CanceledError" || err?.name === "AbortError";
        if (!isAbort) {
          console.error("fetch bookings:", err);
          setToast({
            title: "Error",
            message: err?.response?.data?.error || "Could not load bookings",
            type: "error",
          });
        }
      } finally {
        setLoading(false);
      }

      return () => controller.abort();
    },
    [page, perPage, activeTab, query]
  );

  // initial + reactive fetch when page/perPage/filters change
  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const res = await client.get("/bookings/me", {
          params: {
            page,
            perPage,
            status: activeTab,
            q: query || undefined,
          },
          signal: controller.signal,
        });
        if (cancelled) return;
        setBookings(res.data.data || []);
        setMeta(res.data.meta || { total: 0, totalPages: 1, counts: null });
      } catch (err) {
        if (err?.name === "CanceledError" || err?.name === "AbortError") return;
        console.error("fetch bookings:", err);
        setToast({
          title: "Error",
          message: err?.response?.data?.error || "Could not load bookings",
          type: "error",
        });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [page, perPage, activeTab, query]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  // reset to page 1 when filters change
  useEffect(() => setPage(1), [activeTab, query, perPage]);

  // counts (prefer meta.counts from server; fallback calculates from page)
  const counts = useMemo(() => {
    if (meta?.counts) return meta.counts;
    // fallback: counts from current page (best-effort)
    const c = {
      all: 0,
      upcoming: 0,
      in_progress: 0,
      completed: 0,
      cancelled: 0,
      rejected: 0,
    };
    bookings.forEach(b => {
      c.all += 1;
      const s = b.status;
      if (s === "in_progress") c.in_progress += 1;
      else if (s === "completed") c.completed += 1;
      else if (s === "cancelled") c.cancelled += 1;
      else if (s === "rejected") c.rejected += 1;
      const scheduledFuture = dayjs(b.scheduledAt).isAfter(dayjs());
      if (scheduledFuture && ["pending", "accepted"].includes(s)) c.upcoming += 1;
    });
    return c;
  }, [meta, bookings]);

  function openCancelModal(booking) {
    setConfirm({ open: true, booking, loading: false });
  }

  async function doCancel() {
    const booking = confirm.booking;
    if (!booking) {
      setConfirm({ open: false, booking: null, loading: false });
      return;
    }

    setCancellingId(booking._id);
    setConfirm(prev => ({ ...prev, loading: true }));

    try {
      // const res = await client.patch(`/bookings/${booking._id}/status`, { status: "cancelled" });
      // instead of patching local list, re-fetch current page to keep meta consistent
      await fetchBookings();
      setToast({ title: "Cancelled", message: "Your booking has been cancelled", type: "success" });
    } catch (err) {
      console.error("cancel booking:", err);
      setToast({ title: "Error", message: err?.response?.data?.error || "Failed to cancel booking", type: "error" });
    } finally {
      setCancellingId(null);
      setConfirm({ open: false, booking: null, loading: false });
    }
  }

  // open remove modal (instead of window.confirm)
  function openRemoveModal(booking) {
    setRemoveBooking(booking);
    setRemoveOpen(true);
  }

  // confirm removal (calls backend, updates UI)
  async function confirmRemove() {
    if (!removeBooking) {
      setRemoveOpen(false);
      return;
    }
    setRemovingId(removeBooking._id);
    try {
      await client.delete(`/bookings/me/${removeBooking._id}`);

      // compute next page if we removed the last item on the last page
      const newTotal = Math.max(0, (meta.total || 0) - 1);
      let nextPage = page;
      if ((nextPage - 1) * perPage >= newTotal && nextPage > 1) {
        nextPage = nextPage - 1;
        setPage(nextPage);
      }

      // re-fetch using nextPage (so meta is correct)
      await fetchBookings({ pageOverride: nextPage });

      setToast({ title: "Removed", message: "Removed from your bookings", type: "success" });
    } catch (err) {
      console.error("removeFromMyList:", err);
      setToast({ title: "Error", message: err?.response?.data?.error || "Failed to remove", type: "error" });
    } finally {
      setRemovingId(null);
      setRemoveOpen(false);
      setRemoveBooking(null);
    }
  }

  function openDetails(b) {
    setDetails({ open: true, booking: b });
  }

  const totalPages = Math.max(1, meta.totalPages || 1);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="mb-6">
        <div className="flex items-start justify-between gap-4 flex-col md:flex-row">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight" style={{ color: brand.accent }}>
              My bookings
            </h2>
            <p className="mt-2" style={{ color: brand.neutral700 }}>
              All your upcoming and past bookings in one place.
            </p>
          </div>

          {/* Right side: search + per-page */}
          <div className="w-full md:w-1/2 lg:w-2/5 flex items-center gap-3 mt-3 md:mt-0">
            <div className="flex-1">
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by service or provider..."
                className="w-full rounded-lg border px-3 py-2 text-sm"
                style={{ borderColor: brand.neutral300, color: brand.accent }}
              />
            </div>

            <div>
              <select
                value={perPage}
                onChange={e => setPerPage(Number(e.target.value))}
                className="rounded-lg border px-3 py-2 text-sm"
                style={{ borderColor: brand.neutral300, color: brand.accent }}
              >
                <option value={5}>5 / page</option>
                <option value={9}>9 / page</option>
                <option value={12}>12 / page</option>
                <option value={20}>20 / page</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs / Filters */}
      <div className="mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-2 px-2 py-1 rounded-lg text-sm font-medium transition"
                style={{
                  background: activeTab === tab.key ? brand.secondary1 : brand.white,
                  color: activeTab === tab.key ? brand.white : brand.accent,
                  boxShadow: activeTab === tab.key ? "0 6px 20px rgba(87,174,244,0.12)" : "none",
                  border: activeTab === tab.key ? "none" : `1px solid ${brand.neutral300}`,
                }}
                aria-pressed={activeTab === tab.key}
              >
                <span style={{ fontSize: 13 }}>{tab.label}</span>
                <span style={{ fontSize: 11, opacity: 0.95, background: brand.neutral200, padding: "2px 8px", borderRadius: 999, color: brand.accent }}>
                  {counts[tab.key] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="rounded-lg p-4 flex items-center gap-3" style={{ background: brand.neutral200, border: `1px solid ${brand.neutral300}` }}>
          <div className="h-8 w-8 rounded-full animate-pulse" style={{ background: brand.neutral300 }} />
          <div style={{ color: brand.neutral700 }}>Loading your bookings…</div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="rounded-xl" style={{ border: `1px dashed ${brand.neutral300}`, padding: 28, textAlign: "center", background: brand.white }}>
          <h3 className="text-lg font-medium mb-2" style={{ color: brand.accent }}>
            {activeTab === "all" ? "No bookings yet" : `No ${TABS.find(t => t.key === activeTab)?.label || "bookings"}`}
          </h3>
          <p className="text-sm" style={{ color: brand.neutral700 }}>
            {activeTab === "upcoming"
              ? "No upcoming bookings scheduled. Create a new booking to get started."
              : "Try switching tabs or updating your search."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map(b => (
            <article
              key={b._id}
              className="relative bg-white rounded-xl shadow-md border p-3 md:p-4 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] items-start gap-3"
              style={{ borderColor: brand.neutral300 }}
            >
              {/* left accent and avatar */}
              <div className="flex items-start gap-3">
                <div className="w-1 rounded-l-2xl" style={{ background: brand.primary }} aria-hidden />
                <div className="-ml-2">
                  <ProviderAvatar name={b.provider?.name || b.customerName || "User"} />
                </div>
              </div>

              {/* main content */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-base font-semibold" style={{ color: brand.accent }}>{b.serviceTitle}</div>
                    <div className="text-sm" style={{ color: brand.neutral700, marginTop: 6 }}>
                      With <span className="font-medium" style={{ color: brand.accent }}>{b.provider?.name ?? "—"}</span>
                    </div>
                    <div className="text-xs" style={{ color: brand.neutral600, marginTop: 8 }}>{dayjs(b.scheduledAt).format("DD MMM YYYY, HH:mm")}</div>
                  </div>

                  <div className="text-right md:hidden">
                    <div className="text-sm font-semibold" style={{ color: brand.accent }}>
                      ₹{b.price != null ? Number(b.price).toLocaleString() : (b.durationHours * 500).toLocaleString()}
                    </div>
                    <div className="text-xs" style={{ color: brand.neutral400 }}>{b.durationHours} hr</div>
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <StatusBadge status={b.status} />
                  {b.paid && (
                    <div className="px-2 py-0.5 rounded-md text-xs font-semibold" style={{ color: "#16a34a", background: "rgba(16,163,127,0.06)", border: "1px solid rgba(16,163,127,0.12)" }}>
                      Paid
                    </div>
                  )}
                  <div className="text-xs" style={{ color: brand.neutral600 }}>Created: {dayjs(b.createdAt).format("DD/MM/YYYY")}</div>
                </div>

                <div className="mt-3 text-sm" style={{ color: brand.neutral700, display: "flex", gap: 12 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 7V12L15 14" stroke={brand.neutral600} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span>{b.durationHours} hr</span>
                  </div>

                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9z" stroke={brand.neutral600} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span>₹{b.price != null ? Number(b.price).toLocaleString() : (b.durationHours * 500).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* actions */}
              <div className="flex flex-col items-end justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openDetails(b)}
                    className="px-3 py-1 rounded-lg border text-sm"
                    style={{ borderColor: brand.neutral300, color: brand.accent }}
                  >
                    Details
                  </button>

                  { ["pending", "accepted"].includes(b.status) && (
                    <button
                      onClick={() => openCancelModal(b)}
                      disabled={cancellingId === b._id}
                      className="px-3 py-1 rounded-lg text-sm"
                      style={{
                        background: "rgba(239,68,68,0.06)",
                        color: "#dc2626",
                        border: `1px solid rgba(239,68,68,0.12)`,
                      }}
                    >
                      {cancellingId === b._id ? "Cancelling…" : "Cancel"}
                    </button>
                  )}
                </div>

                <div className="hidden md:flex flex-col items-end text-right">
                  <div className="text-sm font-bold" style={{ color: brand.accent }}>
                    ₹{b.price != null ? Number(b.price).toLocaleString() : (b.durationHours * 500).toLocaleString()}
                  </div>
                  <div className="text-xs" style={{ color: brand.neutral400 }}>{b.durationHours} hr</div>

                  {/* Show Remove button for archived bookings */}
                  {["completed", "rejected", "cancelled"].includes(b.status) && (
                    <button
                      onClick={() => openRemoveModal(b)}
                      className="mt-2 px-3 py-1 rounded-lg border text-sm"
                      style={{ borderColor: brand.neutral300, color: brand.accent }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}

          {/* pagination controls */}
          <div className="mt-2 flex items-center justify-between">
            <div className="text-sm" style={{ color: brand.neutral700 }}>
              Showing <span style={{ color: brand.accent, fontWeight: 600 }}>{bookings.length === 0 ? 0 : (page - 1) * perPage + 1}</span> - <span style={{ color: brand.accent, fontWeight: 600 }}>{(page - 1) * perPage + bookings.length}</span> of <span style={{ color: brand.accent, fontWeight: 600 }}>{meta.total || 0}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded-lg border"
                style={{ borderColor: brand.neutral300, color: brand.accent, opacity: page === 1 ? 0.5 : 1 }}
              >
                Prev
              </button>

              {/* simple page buttons */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pNum => (
                <button
                  key={pNum}
                  onClick={() => setPage(pNum)}
                  className="px-3 py-1 rounded-lg border text-sm"
                  style={{
                    borderColor: pNum === page ? "transparent" : brand.neutral300,
                    background: pNum === page ? brand.secondary1 : brand.white,
                    color: pNum === page ? brand.white : brand.accent,
                    boxShadow: pNum === page ? "0 6px 20px rgba(87,174,244,0.12)" : "none",
                  }}
                >
                  {pNum}
                </button>
              ))}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded-lg border"
                style={{ borderColor: brand.neutral300, color: brand.accent, opacity: page === totalPages ? 0.5 : 1 }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        open={confirm.open}
        title="Cancel booking"
        message={`Are you sure you want to cancel "${confirm.booking?.serviceTitle}" scheduled on ${confirm.booking ? dayjs(confirm.booking.scheduledAt).format("DD MMM YYYY, HH:mm") : ""}?`}
        onCancel={() => setConfirm({ open: false, booking: null, loading: false })}
        onConfirm={doCancel}
        loading={confirm.loading}
      />

      <DetailsModal
        open={details.open}
        booking={details.booking}
        onClose={() => setDetails({ open: false, booking: null })}
      />

      <RemoveConfirmModal
        open={removeOpen}
        booking={removeBooking}
        onCancel={() => { setRemoveOpen(false); setRemoveBooking(null); }}
        onConfirm={confirmRemove}
        loading={Boolean(removingId)}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
