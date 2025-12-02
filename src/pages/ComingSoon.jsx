// src/pages/ComingSoon.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ComingSoon() {
  return (
    <main className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-white">

      {/* Floating background blobs */}
      <div className="absolute w-72 h-72 bg-blue-600/10 rounded-full blur-3xl -top-10 -left-20 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-blue-600/10 rounded-full blur-3xl top-1/2 -right-20 animate-pulse delay-300"></div>

      {/* Center card */}
      <div className="relative max-w-4xl w-full mx-6 bg-blue-800 text-white rounded-3xl shadow-2xl p-10 md:p-14 overflow-hidden animate-slideUp">

        {/* Decorative curved line */}
        <div className="absolute top-0 left-0 opacity-20 pointer-events-none">
          <svg width="280" height="200" viewBox="0 0 280 200" fill="none">
            <path
              d="M10 150 C90 40 200 260 270 50"
              stroke="white"
              strokeWidth="18"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">

          {/* Illustration / Icon */}
          <div className="flex items-center justify-center md:w-1/2">
            <div className="w-44 h-44 rounded-full bg-white/20 flex items-center justify-center text-6xl shadow-lg animate-float">
              🚧
            </div>
          </div>

          {/* Text Section */}
          <div className="md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              This page is  
              <span className="text-yellow-400"> coming soon</span>
            </h1>

            <p className="mt-4 text-white/90 text-base leading-relaxed">
              We're building something amazing here!  
              This page is still under development but will be available very soon.  
              Thanks for your patience.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/"
                className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                Go Home
              </Link>

              <Link
                to="/contact"
                className="px-6 py-3 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 backdrop-blur transition-all duration-300 hover:-translate-y-0.5"
              >
                Contact Us
              </Link>
            </div>
          </div>

        </div>

        {/* subtle footer text */}
        <p className="relative z-10 mt-8 text-xs text-white/60 text-center">
          If you believe this is an error, try checking the URL or return to the homepage.
        </p>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }

          @keyframes slideUp {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-slideUp {
            animation: slideUp 0.8s ease-out forwards;
          }
        `}
      </style>

    </main>
  );
}
