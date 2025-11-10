import React from "react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Pipe unblocking",
    desc: "Fast, clean removal of clogs in kitchens, bathrooms and main lines.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
        <path d="M3 10h6a3 3 0 1 0 0-6H7V2H5v2H3a3 3 0 0 0 0 6Zm0-4h6a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2Zm18 6h-6a3 3 0 1 0 0 6h2v2h2v-2h2a3 3 0 1 0 0-6Zm0 4h-6a1 1 0 1 1 0-2h6a1 1 0 1 1 0 2Z" />
      </svg>
    ),
  },
  {
    title: "Electrical fixes",
    desc: "Switches, sockets, short-circuits and safe wiring by certified pros.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
      </svg>
    ),
  },
  {
    title: "Plumbing systems",
    desc: "Leak detection, mixer installs, taps, flush tanks & water lines.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
        <path d="M4 10h8v2H4v4H2V8a2 2 0 0 1 2-2h8v2H4v2Zm18 2a4 4 0 0 1-4 4h-2v-2h2a2 2 0 1 0 0-4h-2V8h2a4 4 0 0 1 4 4Z" />
      </svg>
    ),
  },
  {
    title: "Water heaters",
    desc: "Geyser install, service & repair with genuine spares.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
        <path d="M7 3h10a2 2 0 0 1 2 2v14H5V5a2 2 0 0 1 2-2Zm0 2v12h10V5H7Z" />
      </svg>
    ),
  },
  {
    title: "AC & cooling",
    desc: "Split/Window AC service, gas top-up, deep cleaning & installs.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
        <path d="M4 6h16a2 2 0 0 1 2 2v6H2V8a2 2 0 0 1 2-2Zm0 10h3v2H4v-2Zm6 0h4v2h-4v-2Zm7 0h3v2h-3v-2Z" />
      </svg>
    ),
  },
  {
    title: "Carpentry & fixtures",
    desc: "Door locks, hinges, shelves, curtain rods & minor woodwork.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
        <path d="M3 13 13 3l8 8-10 10H3v-8Zm4 6h2.6L18 10.6 15.4 8 7 16.4V19Z" />
      </svg>
    ),
  },
];

const Services = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Eyebrow */}
        <div className="flex justify-center">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-500">
            Why us?
          </span>
        </div>

        {/* Title */}
        <h2 className="mt-4 text-center text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          Explore our wide<br className="hidden md:block" /> range of services
        </h2>
        <p className="mt-5 text-center text-gray-600 max-w-2xl mx-auto">
          From quick fixes to full installs, our verified professionals handle
          plumbing, electrical, appliances, AC, carpentry and more.
        </p>

        {/* Cards grid */}
        <div className="mt-14 grid gap-8 sm:gap-9 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            // Lift middle cards
            const liftMiddle = i === 1 || i === 4;
            return (
              <div
                key={i}
                className={`rounded-2xl border border-gray-100 bg-white shadow-md hover:shadow-md transition p-6 md:p-7 flex flex-col items-center text-center ${
                  liftMiddle ? "lg:-mt-8 lg:mb-4" : ""
                }`}
              >
                <div
                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-sm backdrop-blur-sm"
                    style={{ backgroundColor: "rgba(87, 174, 244)" }}
                    >
                    {s.icon}
                </div>


                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{s.desc}</p>

                <Link
                    to="/services"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold transition"
                    style={{ color: "rgba(87, 174, 244)" }}
                >
                    Learn more →
                </Link>

              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 lg:mt-6 flex justify-center">
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-xl shadow transition"
          >
            Book a Service <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
