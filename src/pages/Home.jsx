import React from "react";
import { Link } from "react-router-dom";
import HeroImg from "../assets/hero-worker.jpg";
import AboutHeroImg from "../assets/About-hero-worker.jpg";
import TestimonialsSection from "../components/TestimonialsSection";

const Hero = () => {
  return (
    <section className="relative w-full bg-white overflow-hidden pt-6 md:pt-10 pb-12 md:pb-20">
      <div className="max-w-7xl mx-auto px-6 relative">

        {/* ----------- MOBILE LAYOUT (STACKED) ----------- */}
        <div className="md:hidden flex flex-col gap-6">
          <img
            src={HeroImg}
            alt="Plumber working"
            className="w-full h-72 object-cover rounded-3xl"
          />

          <h1 className="text-2xl font-extrabold leading-snug text-gray-900">
            Reliable Home Repairs,<br /> Done Right the First Time
          </h1>

          <p className="text-gray-700 text-base leading-relaxed">
            Fixora connects you with trusted professionals for plumbing,
            electrical, and maintenance work — delivered fast, safely, and at
            fair prices. From small fixes to big installations, we’ve got your
            home covered.
          </p>

          <div className="flex flex-col gap-3 w-full">
            <Link
              to="/hire"
              className="
                inline-flex items-center justify-center gap-2 
                bg-yellow-400 text-gray-900 font-semibold 
                px-6 py-3 rounded-xl shadow 
                transition-all duration-300 ease-in-out 
                hover:translate-y-1
                group
              "
            >
              Book a Service
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              to="/services"
              className="
                inline-flex items-center justify-center gap-2
                border-2 border-gray-900 
                px-6 py-3 rounded-xl 
                font-semibold text-gray-900 
                bg-transparent 
                hover:bg-gray-900 hover:text-white 
                transition-all duration-300 ease-in-out 
                hover:translate-y-1 
                group
              "
            >
              Our services
            </Link>

          </div>
        </div>

        {/* ----------- DESKTOP LAYOUT (OVERLAY) ----------- */}
        <div className="hidden md:block relative rounded-[28px] overflow-hidden">
          <img
            src={HeroImg}
            alt="Plumber working"
            className="w-full h-[600px] lg:h-[640px] object-cover"
          />

          {/* gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-l from-white/95 via-white/70 to-transparent" />

          <div className="absolute inset-y-0 right-0 w-1/2 flex items-center">
            <div className="px-10 py-10">
              <h1 className="text-4xl lg:text-5xl font-extrabold leading-snug text-gray-900">
                Reliable Home Repairs,<br /> Done Right the First Time
              </h1>

              <p className="mt-4 text-gray-700 text-base max-w-xl leading-relaxed">
                Fixora connects you with trusted professionals for plumbing,
                electrical, and maintenance work — delivered fast, safely, and
                at fair prices. From small fixes to big installations, we’ve got
                your home covered.
              </p>

              <div className="mt-7 flex gap-4">
                <Link
                  to="/hire"
                  className="
                    inline-flex items-center gap-2 
                    bg-yellow-400 text-gray-900 font-semibold 
                    px-6 py-3 rounded-lg shadow 
                    transition-all duration-300 ease-in-out 
                    hover:translate-y-1
                    group
                  "
                >
                  Book a Service
                  <span 
                    aria-hidden 
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>

                <Link
                  to="/services"
                  className="
                    inline-flex items-center gap-2
                    border-2 border-gray-900 
                    px-6 py-3 rounded-lg
                    font-semibold text-gray-900 
                    bg-transparent 
                    hover:bg-gray-900 hover:text-white 
                    transition-all duration-300 ease-in-out 
                    hover:translate-y-1 
                    group
                  "
                >
                Our services
              </Link>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};


/* -------------------- Range of Services Section -------------------- */
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

const RangeOfServices = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-500">
            Why us?
          </span>
        </div>

        <h2 className="mt-4 text-center text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          Explore our wide<br className="hidden md:block" /> range of services
        </h2>
        <p className="mt-5 text-center text-gray-600 max-w-2xl mx-auto">
          From quick fixes to full installs, our verified professionals handle
          plumbing, electrical, appliances, AC, carpentry and more.
        </p>

        <div className="mt-14 grid gap-8 sm:gap-9 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
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
                  className="
                    mt-4 inline-flex items-center gap-1 text-sm font-semibold
                    text-[rgba(87,174,244)] hover:text-yellow-400
                    transition-all duration-300 ease-in-out group
                  "
                >
                  Learn more
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-8 lg:mt-6 flex justify-center">
        <Link
          to="/hire"
          className="
            inline-flex items-center gap-2 
            bg-yellow-400 text-gray-900 font-semibold 
            px-6 py-3 rounded-lg shadow 
            transition-all duration-300 ease-in-out 
            hover:translate-y-1
            group
          "
        >
          Book a Service 
          <span 
            aria-hidden 
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>

        </div>
      </div>
    </section>
  );
};


/* -------------------- AboutBand Section -------------------- */
const AboutBand = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative mx-auto max-w-6xl rounded-[28px] bg-white ring-1 ring-black/5 overflow-hidden">

          {/* MOBILE: stacked layout */}
          <div className="md:hidden p-4 sm:p-6">
            <img
              src={AboutHeroImg}
              alt="Technician at work"
              className="w-full h-64 sm:h-80 object-cover rounded-2xl"
            />

            <div className="mt-5 rounded-2xl bg-white shadow-md p-5">
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-600">
                About
              </span>

              <h3 className="mt-3 text-2xl font-extrabold text-gray-900 leading-tight">
                We’ve been working in the
                <br className="hidden md:block" />
                industry for 20 years
              </h3>

              <p className="mt-3 text-gray-700 text-sm">
                Tempor tristique diam id semper tellus. Est aliquam sit est ac.
                Felis diam nunc nibh blandit risus. Hendrerit sed consectetur
                quis leo praesent scelerisque integer amet. Sit fermentum.
              </p>

              <Link
                to="/about"
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white hover:bg-black hover:text-white px-4 py-2.5 font-semibold text-gray-900 transition-all duration-300 ease-in-out hover:translate-y-1 group"
              >
                About us
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* DESKTOP / MD+: original overlay layout */}
          <div className="hidden md:block p-4 sm:p-5 md:p-6">
            <div className="relative h-[520px] md:h-[560px] rounded-[28px] overflow-hidden bg-white">
              <img
                src={AboutHeroImg}
                alt="Technician at work"
                className="absolute inset-y-0 right-0 h-full w-[92%] sm:w-[80%] md:w-[62%] lg:w-[58%] object-cover"
              />

              <div
                className="absolute z-10 left-5 sm:left-8 md:left-10 top-6 sm:top-8 md:top-12
                  w-[90%] sm:w-[72%] md:w-[58%] lg:w-[52%]
                  rounded-3xl bg-white shadow-xl ring-1 ring-black/5
                  p-5 sm:p-6 md:p-8"
              >
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-600">
                  About
                </span>

                <h3 className="mt-3 md:mt-4 text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                  We’ve been working in the<br className="hidden md:block" />
                  industry for 20 years
                </h3>

                <p className="mt-3 md:mt-4 text-gray-700">
                  Tempor tristique diam id semper tellus. Est aliquam sit est ac.
                  Felis diam nunc nibh blandit risus. Hendrerit sed consectetur
                  quis leo praesent scelerisque integer amet. Sit fermentum.
                </p>

                <Link
                  to="/about"
                  className="mt-4 md:mt-6 inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white hover:bg-black hover:text-white px-4 py-2.5 font-semibold text-gray-900 transition-all duration-300 ease-in-out hover:translate-y-1 group"
                >
                  About us
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};




/* ------------------------------ Home Page ------------------------------ */
export default function Home() {
  return (
    <div>
      <Hero />
      <RangeOfServices />
      <AboutBand/>
      <TestimonialsSection />
    </div>
  );
}
