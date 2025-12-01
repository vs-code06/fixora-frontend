// src/components/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Navigation() {
  const { user, logout } = useAuth();
  const [openMobile, setOpenMobile] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const loc = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    setOpenMobile(false);
    setOpenProfile(false);
  }, [loc.pathname]);

  useEffect(() => {
    document.body.style.overflow = openMobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openMobile]);

  useEffect(() => {
    function onDoc(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const linkClasses = ({ isActive }) =>
    isActive
      ? "font-semibold text-slate-900"
      : "text-slate-600 hover:text-slate-900 transition";

  function handleLogout() {
    setOpenProfile(false);
    logout();
    navigate("/");
  }

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-16">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#2563EB" }}>
                <span className="text-lg font-bold text-white">F</span>
              </div>
              <span className="text-lg font-bold text-slate-800">Fixora</span>
            </Link>

            {/* desktop nav links */}
            <div className="hidden md:flex items-center gap-6">
              <NavLink to="/about" className={linkClasses}>About</NavLink>
              <NavLink to="/services" className={linkClasses}>Services</NavLink>
              <NavLink to="/hire" className={linkClasses}>Hire Professionals</NavLink>
              <NavLink to="/contact" className={linkClasses}>Contact</NavLink>
            </div>
          </div>

          {/* right: actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              {!user ? (
                <>
                  <NavLink
                    to="/login"
                    className="border border-gray-300 px-6 py-2 rounded-md text-slate-900 font-medium text-sm hover:bg-gray-100 hover:shadow-sm transition-all"
                  >
                    Log in
                  </NavLink>

                  <NavLink
                    to="/signup"
                    className="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all"
                  >
                    Sign up
                  </NavLink>
                </>
              ) : (
                <>
                  {/* Profile pill */}
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setOpenProfile((s) => !s)}
                      className="inline-flex items-center gap-3 px-3 py-1 rounded-full border shadow-sm hover:shadow-md transition"
                      aria-haspopup="true"
                      aria-expanded={openProfile}
                    >
                      {/* avatar */}
                      <div className="w-8 h-8 rounded-md overflow-hidden bg-yellow-400 flex items-center justify-center text-sm font-semibold text-white">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                          (user.name || "U").charAt(0).toUpperCase()
                        )}
                      </div>

                      <div className="text-sm text-slate-700 hidden sm:block">
                        <div className="leading-4">Hi, <b>{user.name.split(" ")[0]}</b></div>
                        <div className="text-xs text-slate-400">Account</div>
                      </div>

                      <svg className={`w-4 h-4 text-slate-500 transition-transform ${openProfile ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.708a.75.75 0 111.06 1.061l-4.24 4.243a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                      </svg>
                    </button>

                    {/* dropdown */}
                    <div
                      className={`absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border py-2 z-40 transition-opacity ${openProfile ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                      role="menu"
                      aria-hidden={!openProfile}
                    >
                      <Link to="/profile" onClick={() => setOpenProfile(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-gray-50">Profile</Link>
                      {user.role === "provider" && (
                        <Link to="/dashboard" onClick={() => setOpenProfile(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-gray-50">Provider dashboard</Link>
                      )}
                      <Link to="/bookings" onClick={() => setOpenProfile(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-gray-50">Bookings</Link>
                      <div className="border-t my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-gray-50"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* mobile hamburger */}
            <button
              aria-label={openMobile ? "Close menu" : "Open menu"}
              aria-expanded={openMobile}
              onClick={() => setOpenMobile((s) => !s)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {openMobile ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-[max-height,opacity] duration-300 ease-in-out ${openMobile ? "max-h-[720px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"} overflow-hidden`}
      >
        <div className="px-4 pt-4 pb-6 border-t bg-white">
          <div className="flex flex-col gap-3">
            {user && (
              <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-50">
                <div className="w-10 h-10 rounded-md overflow-hidden bg-yellow-400 flex items-center justify-center text-white font-semibold">
                  {user.avatar ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" /> : (user.name || "U").charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-800">{user.name}</div>
                  <div className="text-xs text-slate-500">{user.email}</div>
                </div>
                <button onClick={() => navigate("/profile")} className="px-3 py-1 rounded-full border text-sm">Profile</button>
              </div>
            )}

            <NavLink to="/" className={({ isActive }) => `${isActive ? "font-semibold text-slate-900" : "text-slate-700"} block px-3 py-2 rounded-md`}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => `${isActive ? "font-semibold text-slate-900" : "text-slate-700"} block px-3 py-2 rounded-md`}>About</NavLink>
            <NavLink to="/services" className={({ isActive }) => `${isActive ? "font-semibold text-slate-900" : "text-slate-700"} block px-3 py-2 rounded-md`}>Services</NavLink>
            <NavLink to="/hire" className={({ isActive }) => `${isActive ? "font-semibold text-slate-900" : "text-slate-700"} block px-3 py-2 rounded-md`}>Hire Professionals</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `${isActive ? "font-semibold text-slate-900" : "text-slate-700"} block px-3 py-2 rounded-md`}>Contact</NavLink>
          </div>

          <div className="mt-4 border-t pt-4">
            {!user ? (
              <div className="flex flex-col gap-3">
                <NavLink
                  to="/login"
                  className="text-center px-6 py-2 rounded-md border border-gray-300 text-slate-900 font-medium hover:bg-gray-100 hover:shadow-sm transition-all"
                >
                  Log in
                </NavLink>

                <NavLink
                  to="/signup"
                  className="text-center px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm hover:shadow-md transition-all"
                >
                  Sign up
                </NavLink>

              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <NavLink to="/bookings" className="text-sm px-3 py-2 rounded-md hover:bg-gray-50">Bookings</NavLink>
                {user.role === "provider" && <NavLink to="/dashboard" className="text-sm px-3 py-2 rounded-md hover:bg-gray-50">Provider dashboard</NavLink>}
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 rounded-md border hover:bg-gray-50 text-sm text-slate-700"
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
