// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navigation() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [loc.pathname]);

  // prevent body scroll when mobile menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClasses = ({ isActive }) =>
    isActive
      ? "font-semibold text-gray-900"
      : "text-gray-600 hover:text-blue-600 transition";

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Left: logo + links */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-white">F</span>
              </div>
              <span className="text-lg font-bold text-gray-800">Fixora</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6">
              {/* <NavLink to="/" className={linkClasses}>
                Home
              </NavLink> */}

              <NavLink to="/about" className={linkClasses}>
                About
              </NavLink>

              <NavLink to="/services" className={linkClasses}>
                Services
              </NavLink>

              <NavLink to="/contact" className={linkClasses}>
                Contact
              </NavLink>
            </div>
          </div>

          {/* Right: auth + hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop auth buttons */}
            <div className="hidden md:flex items-center gap-3">
              {!user ? (
                <>
                  <NavLink
                    to="/login"
                    className="border border-gray-300 px-4 py-1.5 rounded-lg text-gray-900 hover:bg-gray-50 font-medium text-sm md:text-base"
                  >
                    Log in
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1.5 rounded-lg text-sm md:text-base"
                  >
                    Sign up →
                  </NavLink>
                </>
              ) : (
                <>
                  <span className="text-sm text-gray-700">Hi, <b>{user.name}</b></span>
                  <button
                    onClick={logout}
                    className="border px-4 py-1.5 rounded-lg hover:bg-gray-50 text-sm"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((s) => !s)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border border-transparent hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {open ? (
                  // X icon
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Hamburger icon
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (slide down) */}
      <div
        className={`md:hidden transition-[max-height,opacity] duration-300 ease-in-out origin-top ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        } overflow-hidden`}
      >
        <div className="px-4 pt-4 pb-6 border-t border-gray-100 bg-white">
          <div className="flex flex-col gap-3">
            <NavLink to="/" className={({isActive}) => `${isActive ? "font-semibold text-gray-900" : "text-gray-700"} block px-3 py-2 rounded-md`}>
              Home
            </NavLink>
            <NavLink to="/about" className={({isActive}) => `${isActive ? "font-semibold text-gray-900" : "text-gray-700"} block px-3 py-2 rounded-md`}>
              About
            </NavLink>
            <NavLink to="/services" className={({isActive}) => `${isActive ? "font-semibold text-gray-900" : "text-gray-700"} block px-3 py-2 rounded-md`}>
              Services
            </NavLink>
            <NavLink to="/contact" className={({isActive}) => `${isActive ? "font-semibold text-gray-900" : "text-gray-700"} block px-3 py-2 rounded-md`}>
              Contact
            </NavLink>
          </div>

          <div className="mt-4 border-t border-gray-100 pt-4">
            {!user ? (
              <div className="flex flex-col gap-3">
                <NavLink
                  to="/login"
                  className="block text-center px-4 py-2 rounded-md border border-gray-300 text-gray-900"
                >
                  Log in
                </NavLink>
                <NavLink
                  to="/signup"
                  className="block text-center px-4 py-2 rounded-md bg-blue-600 text-white font-semibold"
                >
                  Sign up →
                </NavLink>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="text-sm text-gray-700 text-center">Hi, <b>{user.name}</b></div>
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 rounded-md border hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
