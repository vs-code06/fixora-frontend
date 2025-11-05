import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (e) {
      setErr(e.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="flex justify-center px-4 py-16 md:py-20">
      {/* Card */}
      <div className="w-full max-w-md bg-blue-50 rounded-2xl shadow-md border border-blue-100 p-8 sm:p-10">
        {/* Icon */}
        <div className="mx-auto mb-6 flex items-center justify-center">
          <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🔒</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-center text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          Log in to your account
        </h1>
        <p className="mt-3 text-center text-sm text-gray-600">
        </p>

        {/* Form */}
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full h-11 rounded-lg bg-white border border-blue-100 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none px-4 text-gray-900"
              value={form.email}
              onChange={onChange}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full h-11 rounded-lg bg-white border border-blue-100 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none px-4 text-gray-900"
              value={form.password}
              onChange={onChange}
            />
          </div>

          {err && <p className="text-red-600 text-sm">{err}</p>}

          <button
            className="w-full h-11 rounded-lg bg-yellow-400 hover:bg-yellow-500 transition font-semibold text-gray-900"
          >
            Log in
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center space-y-2">
          <button
            type="button"
            className="text-sm text-gray-700 underline hover:text-gray-900"
          >
            Forgot your password?
          </button>
          <p className="text-sm text-gray-700">
            You don’t have an account?{" "}
            <Link to="/signup" className="font-semibold underline hover:text-gray-900">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
