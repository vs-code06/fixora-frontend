import React from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaLock,
  FaShieldAlt,
  FaHandsHelping,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

const values = [
  {
    title: "Trust",
    desc:
      "We build long-lasting relationships by being reliable, transparent, and committed to delivering quality results every single time.",
    Icon: FaHeart,
  },
  {
    title: "Integrity",
    desc:
      "We operate with honesty and fairness, ensuring every service meets the highest standards of professionalism and ethics.",
    Icon: FaCheckCircle,
  },
  {
    title: "Security",
    desc:
      "Your safety is our highest priority. All Fixora professionals are verified, trained, and trusted to work in your home with care.",
    Icon: FaLock,
  },
  {
    title: "Commitment",
    desc:
      "We strive to exceed expectations by delivering dependable services and support from the moment you book to project completion.",
    Icon: FaHandsHelping,
  },
  {
    title: "Responsibility",
    desc:
      "We take accountability for our work and ensure every task is completed with precision, dedication, and respect for your space.",
    Icon: FaShieldAlt,
  },
  {
    title: "Teamwork",
    desc:
      "Our experts collaborate effectively to provide faster solutions, better execution, and a smoother experience for every customer.",
    Icon: FaUsers,
  },
];

export default function AboutValues() {
  return (
    <section className="py-20 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Larger rounded card */}
        <div className="rounded-[32px] bg-slate-50 p-12 md:p-20 text-center shadow-md">
          
          {/* Header */}
          <div className="max-w-3xl mx-auto">
            <span className="inline-block bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold">
              Our values
            </span>

            <h2 className="mt-5 text-3xl md:text-4xl font-extrabold text-gray-900">
              The values that <br className="hidden md:inline" /> drive what we do
            </h2>

            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              These core principles guide every part of our work — from customer care 
              to service quality — ensuring Fixora remains a trusted choice for every home.
            </p>
          </div>

          {/* Values grid */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {values.map((v) => {
              const Icon = v.Icon;
              return (
                <div key={v.title} className="relative">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg">
                      <Icon className="text-white w-7 h-7" />
                    </div>
                  </div>

                  <div className="pt-12 bg-white rounded-2xl p-8 shadow border border-white min-h-[220px]">
                    <h3 className="text-lg font-semibold text-gray-900 text-center">
                      {v.title}
                    </h3>
                    <p className="mt-4 text-sm text-gray-500 text-center leading-relaxed">
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA button */}
          <div className="mt-14">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 bg-yellow-400 text-black font-semibold text-lg px-8 py-4 rounded-xl shadow transition-all duration-300 hover:translate-y-1 group"
            >
             Book a Service
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
