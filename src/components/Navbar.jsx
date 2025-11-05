import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navigation = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Left side: Logo + Navigation Links */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">F</span>
              </div>
              <span className="text-xl font-bold text-gray-800">Fixora</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="font-semibold text-gray-900 hover:text-blue-600 transition"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                About
              </Link>
              <Link
                to="/services"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Services
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right side: Auth buttons */}
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="border border-gray-300 px-5 py-2 rounded-lg text-gray-900 hover:bg-gray-50 font-medium"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg"
                >
                  Sign up →
                </Link>
              </>
            ) : (
              <>
                <span className="text-sm text-gray-700">
                  Hi, <b>{user.name}</b>
                </span>
                <button
                  onClick={logout}
                  className="border px-4 py-2 rounded-lg hover:bg-gray-50"
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
