import React from "react";
import HeroImg from "../assets/hero-worker.jpg";

const Hero = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden pt-4 md:pt-8 pb-14 md:pb-20">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Hero Container */}
        <div className="relative rounded-[28px] shadow-2xl overflow-hidden">
          {/* Decorative Blue Lines (accurate curved shape) */}
          <svg
            className="absolute right-[-100px] top-[-60px] w-[700px] h-[500px] opacity-90 hidden md:block z-10"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top horizontal wave */}
            <path
              d="M120 120C260 160 420 60 600 120"
              stroke="#45A5FF"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Large vertical sweeping curve */}
            <path
              d="M480 -80C520 80 520 300 480 580"
              stroke="#45A5FF"
              strokeWidth="12"
              strokeLinecap="round"
            />
          </svg>

          {/* Background Image */}
          <img
            src={HeroImg}
            alt="Plumber working"
            className="w-full h-[440px] md:h-[500px] lg:h-[540px] object-cover"
          />

          {/* Gradient Overlay for readability */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-white/95 via-white/70 to-transparent" />

          {/* Text Overlay */}
          <div className="absolute inset-y-0 right-0 w-full md:w-1/2 flex items-center">
            <div className="px-6 sm:px-8 lg:px-10 py-8 md:py-0">
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
                Fast and reliable <br /> plumbing repairs
              </h1>

              <p className="mt-4 text-gray-700 md:text-lg max-w-xl">
                Sed aliquam dictumst quisque eget non nisl in rhoncus. In a ipsum
                ut aliquam ac felis consequat. In sit diam porta laoreet. Amet id
                magna diam diam in egestas.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-4">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-7 py-3 rounded-lg shadow transition">
                  Get a quote →
                </button>
                <button className="border-2 border-gray-900 px-7 py-3 rounded-lg hover:bg-gray-100 font-semibold transition">
                  Our services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
