import React, { useEffect, useRef, useState } from "react";
import client from "../api/client";

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const closeBtnRef = useRef(null);
  const formRef = useRef(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!firstName || !email || !message) {
      setStatus({ type: "error", text: "Please fill name, email and message." });
      return;
    }

    setLoading(true);
    try {
      await client.post("/contact", {
        firstName,
        lastName,
        email,
        phone: form.phone.trim(),
        message,
      });

      setStatus({
        type: "success",
        text: "Thanks — we got your message. We'll reach out soon.",
      });

      setShowSuccessModal(true);

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      const serverMessage =
        err?.response?.data?.message || err?.message || "Something went wrong. Try again.";
      setStatus({ type: "error", text: serverMessage });
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    if (formRef.current) {
      const btn = formRef.current.querySelector('button[type="submit"]');
      if (btn) btn.focus();
    }
  };

  useEffect(() => {
    if (!showSuccessModal) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showSuccessModal]);
  
  useEffect(() => {
    if (showSuccessModal && closeBtnRef.current) {
      closeBtnRef.current.focus();
    }
  }, [showSuccessModal]);

  return (
    <>
      <form ref={formRef} onSubmit={onSubmit} className="space-y-6" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
          <div>
            <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={onChange}
              placeholder="e.g. Jane"
              className="mt-2 w-full h-12 rounded-lg border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-blue-200"
              autoComplete="given-name"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={onChange}
              placeholder="e.g. Doe"
              className="mt-2 w-full h-12 rounded-lg border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-blue-200"
              autoComplete="family-name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              className="mt-2 w-full h-12 rounded-lg border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-blue-200"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={onChange}
              placeholder="(123) 456-789"
              className="mt-2 w-full h-12 rounded-lg border border-slate-200 px-4 outline-none focus:ring-2 focus:ring-blue-200"
              autoComplete="tel"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={onChange}
            placeholder="Leave us a message..."
            rows={6}
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {status && status.type !== "success" && (
          <div
            role="status"
            aria-live="polite"
            className={`text-sm px-4 py-2 rounded bg-red-50 text-red-700`}
          >
            {status.text}
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow-sm transition-all duration-300 ease-in-out hover:translate-y-1 disabled:opacity-60 group"
          >
            {loading ? "Sending..." : "Send Message"}
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </button>
        </div>
      </form>

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          aria-modal="true"
          role="dialog"
          aria-labelledby="contact-success-title"
        >
          {/* backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* card */}
          <div className="relative z-10 max-w-lg w-full">
            <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 ring-1 ring-slate-100">
              {/* close button */}
              <button
                ref={closeBtnRef}
                onClick={closeModal}
                aria-label="Close"
                className="absolute -top-3 -right-3 bg-white rounded-full shadow p-1.5 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                style={{ transform: "translate(50%, -50%)" }}
              >
                <svg className="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {/* decorative check-circle */}
                  <div className="bg-green-50 rounded-full p-3">
                    <svg className="w-7 h-7 text-green-600" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" stroke="currentColor" strokeWidth="0" fill="currentColor" opacity="0.08"/>
                      <path d="M9 12.5l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </div>
                </div>

                <div>
                  <h3 id="contact-success-title" className="text-lg font-semibold text-slate-900">
                    Message sent!
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Thanks for reaching out, <span className="font-medium">{form.firstName || "there"}</span>. We received your message and will get back to you shortly.
                  </p>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none"><path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      <div>
                        <div className="text-xs text-slate-500">What happens next</div>
                        <div className="text-sm font-medium text-slate-700">We'll contact you within 24 hours</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none"><path d="M12 2v20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      <div>
                        <div className="text-xs text-slate-500">Need immediate help?</div>
                        <div className="text-sm font-medium text-slate-700">Call our support at <span className="text-blue-600">+1 800 555 0199</span></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex justify-end">
                    <button
                      onClick={closeModal}
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      Okay, thanks
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* decorative bottom element */}
            <div className="mt-4 text-center text-xs text-slate-400">
              <span>Fixora — connecting customers & providers</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
