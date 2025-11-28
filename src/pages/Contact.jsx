// src/pages/Contact.jsx
import React from "react";
// import { Link } from "react-router-dom";
import ContactForm from "../components/ContactForm";
import FAQ from "../components/FAQ";

export default function Contact() {
  return (
    <main className="pt-12 pb-24">
      {/* Hero / band */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="rounded-[20px]  p-14 md:p-20 text-center" style={{ backgroundColor: "#E9F4FF" }}>
          <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
            Contact
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-gray-900">
            Contact us
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Have a question or need help with a service? Our team is here to support you.
          Send us a message and we’ll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Form card centered */}
      <section className="max-w-3xl mx-auto px-6 mt-[-56px] z-10 relative">
        <div className="bg-white rounded-3xl shadow-lg border border-white p-8 md:p-12" style={{ backgroundColor: "#F7F9FC" }}>
          <ContactForm />
        </div>
      </section>

      <section className="mt-20 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-full">
          <span className="text-blue-700 font-semibold text-sm">Visit Us</span>
        </div>

        <h2 className="mt-4 text-3xl font-bold text-gray-900">Find Our Location</h2>
        <p className="mt-2 text-gray-600">We’re easy to reach — find the location on map below</p>
      </section>


      {/* Location / map preview (decor) */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="relative rounded-3xl overflow-hidden h-72 md:h-80 lg:h-[460px]">

          {/* Map full background */}
          <div className="absolute inset-0">
            <iframe
              title="Rishihood University Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14024.148740108216!2d77.08172!3d28.984572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390db1e3451de103%3A0xf3b49ff0baac646f!2sRishihood%20University!5e0!3m2!1sen!2sin!4v1732812000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Card moved top-right & smaller */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10 p-3 md:p-4 pointer-events-none">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl max-w-xs p-4 border border-white pointer-events-auto">

              <span
                className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold"
                style={{ backgroundColor: "#E9F4FF", color: "#1D4ED8" }}
              >
                Location
              </span>

              <h2 className="mt-2 text-xl font-bold text-gray-900">
                Come and visit us
              </h2>

              <p className="mt-1.5 text-gray-600 text-sm leading-relaxed">
                Feel free to stop by or explore our location on the map.
              </p>

              <div className="mt-4 space-y-3">

                {/* Address */}
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-yellow-500 mt-0.5" viewBox="0 0 24 24" fill="none">
                    <path d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M12 21s7-4.5 7-10.5A7 7 0 0 0 5 10.5C5 16.5 12 21 12 21z" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                  <div>
                    <p className="text-[11px] text-gray-500">Address</p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Newton+School+of+Technology+Sonipat"
                      className="text-sm font-semibold text-gray-700 hover:text-[#FFCE51] transition"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Newton School of Technology, Rishihood University
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-yellow-500 mt-0.5" viewBox="0 0 24 24" fill="none">
                    <path d="M22 16.92V20a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h3.09" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                  <div>
                    <p className="text-[11px] text-gray-500">Phone</p>
                    <a
                      href="tel:+1123456789"
                      className="text-sm font-semibold text-gray-700 hover:text-[#FFCE51] transition"
                    >
                      (+1) 123 456 789
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-yellow-500 mt-0.5" viewBox="0 0 24 24" fill="none">
                    <path d="M3 8.5v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M21 8.5l-9 6-9-6" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                  <div>
                    <p className="text-[11px] text-gray-500">Email</p>
                    <a
                      href="mailto:vipultheplayer@gmail.com"
                      className="text-sm font-semibold text-gray-700 hover:text-[#FFCE51] transition"
                    >
                      vipultheplayer@gmail.com
                    </a>
                  </div>
                </div>

              </div>
            </div>

            <p className="mt-2 text-[10px] text-slate-500 ml-1">Fixora — connecting customers & providers</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-6 mt-16">
        <FAQ />
      </section>
    </main>
  );
}
