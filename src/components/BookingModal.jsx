import React, { useState } from "react";
import client from "../api/client";
import dayjs from "dayjs";

export default function BookingModal({ provider, open, onClose, onBooked }) {
  const [scheduledAt, setScheduledAt] = useState("");
  const [durationHours, setDurationHours] = useState(1);
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!scheduledAt || !address) {
      setError("Please choose date/time and provide an address.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        providerId: provider._id || provider.id || provider.providerId,
        serviceTitle: provider.categories?.[0] ? `${provider.categories[0]} service` : "Service",
        scheduledAt: dayjs(scheduledAt).toISOString(),
        durationHours,
        address,
        notes,
      };

      const res = await client.post("/bookings", payload);

      // Accept multiple possible backend shapes:
      // 1) { data: booking } (single booking)
      // 2) { data: { master: ..., provider: ... } } (two docs)
      // 3) { data: { booking: ... } }
      const data = res?.data || {};
      let masterBooking = null;
      let providerBooking = null;

      // common patterns
      if (data.data) {
        // if data is an object that contains master/provider
        if (data.data.master || data.data.provider) {
          masterBooking = data.data.master || null;
          providerBooking = data.data.provider || null;
        } else if (Array.isArray(data.data)) {
          // unlikely, but handle array
          masterBooking = data.data[0] || null;
        } else {
          // single booking object
          masterBooking = data.data;
        }
      } else if (data.booking) {
        masterBooking = data.booking;
      } else {
        // fallback to whole response
        masterBooking = data;
      }

      // Call onBooked with both if available, otherwise pass the booking object
      if (typeof onBooked === "function") {
        onBooked({ master: masterBooking, provider: providerBooking, booking: masterBooking || providerBooking });
      }

      // close modal and reset fields
      onClose && onClose();
      setScheduledAt("");
      setDurationHours(1);
      setAddress("");
      setNotes("");
    } catch (err) {
      console.error("create booking error:", err);

      // friendly messages for common statuses
      const status = err?.response?.status;
      const serverMsg = err?.response?.data?.error || err?.response?.data?.message || err?.message;

      if (status === 409) {
        setError(serverMsg || "Provider not available at the selected time.");
      } else if (status === 400) {
        setError(serverMsg || "Invalid booking data.");
      } else if (status === 401 || status === 403) {
        setError("You must be logged in to book this provider.");
      } else {
        setError(serverMsg || "Failed to create booking. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={() => { if (!loading) onClose(); }} />
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-2 p-6 z-10"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold">Book {provider.name}</h3>
            <p className="text-sm text-slate-500 mt-1">Choose a time and provide details</p>
          </div>
          <div className="text-right text-xs text-slate-400">
            <div className="font-medium">{provider.categories?.[0] ?? "Service"}</div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-600 mb-1">When</label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-slate-600 mb-1">Duration</label>
            <select
              value={durationHours}
              onChange={(e) => setDurationHours(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value={1}>1 hour</option>
              <option value={2}>2 hours</option>
              <option value={3}>3 hours</option>
              <option value={4}>4 hours</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs text-slate-600 mb-1">Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Service address"
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs text-slate-600 mb-1">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              rows={3}
            />
          </div>
        </div>

        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg border hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-yellow-400 font-semibold hover:brightness-95 disabled:opacity-60"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </form>
    </div>
  );
}
