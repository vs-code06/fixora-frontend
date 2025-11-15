import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navigation = () => {
  const { user, logout } = useAuth();

  const linkClasses = ({ isActive }) =>
    isActive
      ? "font-semibold text-gray-900"
      : "text-gray-600 hover:text-blue-600 transition";

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-2.5 md:py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-white">F</span>
              </div>
              <span className="text-lg font-bold text-gray-800">Fixora</span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              
              <NavLink to="/" className={linkClasses}>
                Home
              </NavLink>

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

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
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
                <span className="text-sm text-gray-700">
                  Hi, <b>{user.name}</b>
                </span>
                <button
                  onClick={logout}
                  className="border px-4 py-1.5 rounded-lg hover:bg-gray-50 text-sm"
                >
                  Logout
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navigation;
