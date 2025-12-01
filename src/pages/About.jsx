import React from "react";
import { Link } from "react-router-dom";
import HeroImg from "../assets/about-hero-main.jpg";     
import StoryImg from "../assets/our-story.jpg";          
import MissionImg from "../assets/our-mission.jpg";      
import TeamImg from "../assets/hero-worker.jpg";        

import AboutValues from "../components/AboutValues";

export default function About() {
  const handleScroll = () => {
    const el = document.getElementById("about-details");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white text-slate-900">

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 pt-6 pb-12">
        <div className="bg-sky-50 rounded-3xl grid md:grid-cols-2 items-stretch overflow-hidden shadow">

          {/* LEFT HERO IMAGE */}
          <div className="relative min-h-[380px] md:min-h-[560px]">
            <img
              src={HeroImg}
              alt="technician smiling in workshop"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ borderTopLeftRadius: 24, borderBottomLeftRadius: 24 }}
            />
          </div>

          {/* RIGHT HERO CONTENT */}
          <div className="p-8 md:p-16 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Learn more <br /> about our story
            </h1>

            <p className="mt-6 text-lg text-slate-600 max-w-xl">
              Fixora connects you with trusted professionals for plumbing,
              electrical and maintenance work — delivered quickly and safely.
            </p>

            <div className="flex gap-4 mt-8">
              <Link
                to="/hire"
                className="
                  inline-flex items-center gap-2 
                  bg-yellow-400 text-black font-semibold 
                  px-6 py-2.5 rounded-lg shadow-sm 
                  transition-all duration-300 
                  hover:translate-y-1 
                  group
                "
              >
                Book a Service
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>

              <button
                onClick={handleScroll}
                className="
                  inline-flex items-center gap-2
                  border-2 border-gray-900 
                  px-6 py-2.5 rounded-lg 
                  font-semibold text-gray-900 
                  hover:bg-gray-900 hover:text-white 
                  transition-all duration-300 
                  hover:translate-y-1 
                  group
                "
              >
                Read more
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      {/* <section className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          ["2.5K", "Connected Customers"],
          ["4.2K", "Jobs Completed"],
          ["1.4K", "Repeat Customers"],
          ["80", "Trusted Pros"],
        ].map(([n, label]) => (
          <div key={label}>
            <h3 className="text-4xl font-extrabold">{n}</h3>
            <p className="text-sm text-slate-600 mt-1">{label}</p>
          </div>
        ))}
      </section> */}

      {/* ---------------- STORY SECTION ---------------- */}
      <section
        id="about-details"
        className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-start"
      >
        {/* LEFT TEXT */}
        <div>
          <span className="bg-sky-100 text-sky-700 px-3 py-1 text-sm rounded-full inline-block">
            Our story
          </span>

          <h2 className="mt-6 text-3xl md:text-4xl font-extrabold">
            Everything began 20 years ago — building better home services
          </h2>

          <p className="mt-6 text-slate-600 leading-relaxed max-w-xl">
            Fixora was founded to remove the frustration from finding dependable
            tradespeople. We verify professionals, manage bookings, and make home services simple.
          </p>

          <p className="mt-6 text-slate-600 leading-relaxed max-w-xl">
            Whether emergency repair or routine maintenance, Fixora connects you with trusted specialists.
          </p>

          <div className="mt-8">
            <Link
              to="/hire"
              className="
                inline-flex items-center gap-2 
                bg-yellow-400 text-black font-semibold 
                px-6 py-3 rounded-lg shadow 
                transition-all duration-300 
                hover:translate-y-1 
                group
              "
            >
              Book a Service
              <span className="transition-transform duration-300 group-hover:translate-x-1 ml-1">→</span>
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE (MADE TALLER) */}
        <div className="rounded-3xl overflow-hidden h-[480px] md:h-[600px] bg-slate-100">
          <img
            src={StoryImg}
            alt="technician working"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ---------------- MISSION SECTION ---------------- */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT IMAGE (MADE TALLER) */}
          <div className="rounded-3xl overflow-hidden h-[480px] md:h-[600px] shadow bg-white">
            <img
              src={MissionImg}
              alt="professional technician planning work"
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT TEXT */}
          <div className="px-2 md:px-6">
            <span className="bg-sky-100 text-sky-700 px-3 py-1 text-sm rounded-full inline-block">
              Our mission
            </span>

            <h3 className="mt-6 text-3xl md:text-4xl font-extrabold">
              Our mission is to simplify your everyday life.
            </h3>

            <p className="mt-6 text-slate-600 leading-relaxed max-w-xl">
              We focus on quality, reliability and convenience — so you never worry about home services again.
            </p>

            <blockquote className="mt-6 border-l-4 border-slate-200 pl-6 italic text-slate-800 max-w-xl">
              “At Fixora, we are committed to providing exceptional service and making people's lives easier.”
            </blockquote>

            <div className="mt-6 flex items-center gap-4">
              <img src={TeamImg} alt="founder portrait" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="font-semibold">Danielle Wise</div>
                <div className="text-sm text-slate-600">CEO & Founder</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <AboutValues />

      {/* FOUNDER SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h3 className="text-3xl font-extrabold">Meet the Founder</h3>
        <p className="text-slate-600 mt-2">The visionary behind Fixora</p>

        <div className="mt-10 flex justify-center">
          <div className="bg-white p-6 rounded-2xl shadow max-w-xs">
            <img
              src={TeamImg}
              className="w-40 h-40 rounded-full object-cover mx-auto"
              alt="Vipul Sharma portrait"
            />
            <h4 className="mt-4 text-xl font-bold">Mr Vipul Sharma</h4>
            <p className="text-slate-500">CEO & Founder</p>
            <p className="mt-4 text-sm text-slate-600">
              Built Fixora to make home services reliable, fast, and fair.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
