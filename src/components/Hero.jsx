import React from "react";
import HeroImg from "../assets/hero-worker.jpg";

const Hero = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden pt-2 md:pt-4 pb-14 md:pb-20">
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Hero Container */}
        <div className="relative rounded-[28px] shadow-lg overflow-hidden">

          {/* Background Image */}
          <img
            src={HeroImg}
            alt="Plumber working"
            className="w-full h-[520px] md:h-[600px] lg:h-[640px] object-cover"
          />

          {/* Gradient Overlay for readability */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-white/95 via-white/70 to-transparent" />

          {/* Text Overlay */}
          <div className="absolute inset-y-0 right-0 w-full md:w-1/2 flex items-center">
            <div className="px-6 sm:px-8 lg:px-10 py-8 md:py-0">
              <h1 className="text-2xl md:text-4xl font-extrabold leading-snug text-gray-900">
                Reliable Home Repairs, <br /> Done Right the First Time
              </h1>

              <p className="mt-4 text-gray-700 text-sm md:text-base max-w-xl leading-relaxed">
                Fixora connects you with trusted professionals for plumbing, electrical, and maintenance work — delivered fast, safely, and at fair prices. From small fixes to big installations, we’ve got your home covered.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-4">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2.5 rounded-lg shadow-sm transition">
                  Book a Service →
                </button>
                <button className="border-2 border-gray-900 px-6 py-2.5 rounded-lg font-semibold text-gray-900 bg-transparen hover:bg-gray-900 hover:text-white transition-all duration-300">
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
