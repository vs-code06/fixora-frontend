import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative mt-20 mb-8">
      <div className="relative z-20">
        <div className="max-w-5xl mx-auto px-6"> 
          <div className="bg-yellow-400 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 px-6 md:px-10 py-5 md:py-6 -mb-10">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center md:text-left">
              Get special pricing for your new project
            </h3>
            <div className="flex items-center gap-3">
              <Link
                to="/quote"
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-2xl bg-gray-900 text-white font-semibold
                  px-6 md:px-7 lg:px-8 py-3 md:py-3.5
                  hover:bg-gray-800
                  transition-all duration-300 ease-in-out
                  transform hover:translate-y-1 group
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

              {/* More About Us Button */}
              <Link
                to="/about"
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-2xl border-2 border-gray-900 text-gray-900 font-semibold
                  bg-transparent
                  px-6 md:px-7 lg:px-8 py-3 md:py-3.5
                  hover:bg-gray-900 hover:text-white
                  transition-all duration-300 ease-in-out
                  transform hover:translate-y-1 group
                "
              >
                More about us
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer card */}
      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative rounded-3xl bg-[#183155] text-white/90 px-6 md:px-10 pt-16 md:pt-20 pb-10 md:pb-12 shadow-xl">

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* Services */}
              <div>
                <h4 className="font-semibold text-white mb-4">Services</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li><Link to="/services/plumbing" className="hover:text-yellow-400 transition">Plumbing</Link></li>
                  <li><Link to="/services/electrical" className="hover:text-yellow-400 transition">Electrical</Link></li>
                  <li><Link to="/services/maintenance" className="hover:text-yellow-400 transition">Home maintenance</Link></li>
                  <li><Link to="/services/installation" className="hover:text-yellow-400 transition">Installations</Link></li>
                  <li><Link to="/services/emergency" className="hover:text-yellow-400 transition">Emergency repairs</Link></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-semibold text-white mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li><Link to="/about" className="hover:text-yellow-400 transition">About us</Link></li>
                  <li><Link to="/pricing" className="hover:text-yellow-400 transition">Pricing</Link></li>
                  <li><Link to="/careers" className="hover:text-yellow-400 transition">Careers</Link></li>
                  <li><Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-semibold text-white mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-white/80">
                  <li><Link to="/how-it-works" className="hover:text-yellow-400 transition">How it works</Link></li>
                  <li><Link to="/faq" className="hover:text-yellow-400 transition">FAQ</Link></li>
                  <li><Link to="/terms" className="hover:text-yellow-400 transition">Terms & Conditions</Link></li>
                  <li><Link to="/privacy" className="hover:text-yellow-400 transition">Privacy Policy</Link></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold text-white mb-4">Contact</h4>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="text-white/70">Phone</div>
                    <a href="tel:+1123456789" className="text-white font-semibold hover:text-yellow-400 transition">
                      (+1) 123 456 789
                    </a>
                  </div>
                  <div>
                    <div className="text-white/70">Email</div>
                    <a href="mailto:services@fixora.com" className="text-white font-semibold hover:text-yellow-400 transition">
                      services@fixora.com
                    </a>
                  </div>
                  <div>
                    <div className="text-white/70">Hours</div>
                    <p className="text-white/80">Mon–Sat: 8:00 AM – 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center">
                  <span className="text-white font-bold">F</span>
                </div>
                <span className="font-semibold">Fixora</span>
              </div>
              <p className="text-xs text-white/60">
                Copyright © {new Date().getFullYear()} Fixora — All rights reserved
              </p>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
