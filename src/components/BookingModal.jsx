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
  const [paymentMode, setPaymentMode] = useState("offline"); // "online" | "offline"

  if (!open) return null;

  function loadRazorpayScript() {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!scheduledAt || !address) {
      setError("Please choose date/time and provide an address.");
      return;
    }

    setLoading(true);
    try {
      // Calculate provisional price (assuming rate is in the format "₹500 / hr")
      // If price parsing fails, default to 0. 
      // NOTE: Ideally, the provider object should have a numeric 'price' field.
      // Based on dummy data string "₹500 / hr"
      let priceRate = 500;

      if (provider?.hourlyRate) {
        const parsed = Number(provider.hourlyRate.replace(/[^\d]/g, ""));
        if (!Number.isNaN(parsed) && parsed > 0) {
          priceRate = parsed;
        }
      }
      else priceRate = 500; // default fallback

      const totalAmount = Math.max(priceRate * durationHours, 1);;

      // Prepare payload base
      const payload = {
        providerId: provider._id || provider.id || provider.providerId,
        serviceTitle: provider.categories?.[0] ? `${provider.categories[0]} service` : "Service",
        scheduledAt: dayjs(scheduledAt).toISOString(),
        durationHours,
        address,
        notes,
        price: totalAmount,
        paymentMode
      };

      if (paymentMode === "online") {
        const loaded = await loadRazorpayScript();
        if (!loaded) {
          setError("Example: Razorpay SDK failed to load. Are you online?");
          setLoading(false);
          return;
        }

        // Create Order
        const { data: order } = await client.post("/bookings/payment/order", { amount: totalAmount });

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: "Fixora Services",
          description: `Booking with ${provider.name}`,
          order_id: order.id,
          handler: async function (response) {
            payload.razorpayPaymentId = response.razorpay_payment_id;
            payload.razorpayOrderId = response.razorpay_order_id;
            payload.razorpaySignature = response.razorpay_signature;

            await createBooking(payload);
          },
          modal: {
            ondismiss: function () {
              setLoading(false);
              // Option: setError("Payment cancelled"); to let user know why it stopped
            }
          },
          prefill: {
            name: "Fixora User",
            email: "user@example.com",
            contact: "9999999999"
          },
          theme: {
            color: "#FACC15"
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        rzp.on('payment.failed', function (response) {
          setError("Payment Failed: " + response.error.description);
          setLoading(false);
        });
      } else {
        // Offline flow
        await createBooking(payload);
      }

    } catch (err) {
      console.error("Booking caught error:", err);
      setError(err?.message || "Failed to initiate booking");
      setLoading(false);
    }
  }

  async function createBooking(payload) {
    try {
      const res = await client.post("/bookings", payload);

      const data = res?.data || {};
      let masterBooking = null;
      let providerBooking = null;

      if (data.data) {
        masterBooking = data.data.master || data.data.booking || data.data;
        if (data.data.provider) providerBooking = data.data.provider;
      } else if (data.booking) {
        masterBooking = data.booking;
      } else {
        masterBooking = data;
      }

      if (typeof onBooked === "function") {
        onBooked({ master: masterBooking, provider: providerBooking, booking: masterBooking || providerBooking });
      }

      onClose && onClose();
      // Reset
      setScheduledAt("");
      setDurationHours(1);
      setAddress("");
      setNotes("");
      setPaymentMode("offline");
      setLoading(false);
    } catch (err) {
      console.error("createBooking final error:", err);
      const status = err?.response?.status;
      const serverMsg = err?.response?.data?.error || err?.response?.data?.message || err?.message;

      if (status === 409) {
        setError(serverMsg || "Provider not available at the selected time.");
      } else if (status === 400) {
        setError(serverMsg || "Invalid booking data.");
      } else if (status === 401 || status === 403) {
        setError("You must be logged in to book this provider.");
      } else {
        setError(serverMsg || "Failed to create booking.");
      }
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
            <div className="text-slate-600 font-semibold">{provider.hourlyRate || "₹500 / hr"}</div>
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

          {/* Payment Mode Selection */}
          <div className="md:col-span-2">
            <label className="block text-xs text-slate-600 mb-2">Payment Option</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer border p-3 rounded-lg flex-1 hover:border-yellow-400 transition">
                <input
                  type="radio"
                  name="paymentMode"
                  value="offline"
                  checked={paymentMode === "offline"}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="accent-yellow-500"
                />
                <div>
                  <span className="block text-sm font-semibold">Pay Offline</span>
                  <span className="text-xs text-slate-500">Cash after service</span>
                </div>
              </label>

              <label className="flex items-center gap-2 cursor-pointer border p-3 rounded-lg flex-1 hover:border-yellow-400 transition">
                <input
                  type="radio"
                  name="paymentMode"
                  value="online"
                  checked={paymentMode === "online"}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="accent-yellow-500"
                />
                <div>
                  <span className="block text-sm font-semibold">Pay Online</span>
                  <span className="text-xs text-slate-500">Secure Razorpay</span>
                </div>
              </label>
            </div>
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
            {loading ? "Processing..." : (paymentMode === "online" ? "Pay & Book" : "Confirm Booking")}
          </button>
        </div>
      </form>
    </div>
  );
}
