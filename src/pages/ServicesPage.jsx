import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import client from "../api/client";

import {
  LuWrench,
  LuPaintRoller,
  LuZap,
  LuDroplet,
  LuHammer,
  LuDrill,
} from "react-icons/lu";

const ICON_MAP = {
  LuWrench,
  LuPaintRoller,
  LuZap,
  LuDroplet,
  LuHammer,
  LuDrill,
};


const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
  
    const fetchServices = async () => {
      try {
        const { data } = await client.get("/services");
        console.log("services:", data);
  
        if (mounted) {
          const formatted = data.map((s) => ({
            ...s,
            Icon: ICON_MAP[s.icon] || null, 
          }));
  
          setServices(formatted);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };
  
    fetchServices();
  
    return () => {
      mounted = false;
    };
  }, []); // runs once
   // runs once when component loads

  return (
    <main className="pt-12 pb-20">
      {/* Top hero band */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="rounded-[18px] bg-blue-50 overflow-hidden p-12 md:p-16 relative">
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-600">
            Our services
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-gray-900 max-w-3xl leading-tight">
            Explore our wide <br className="hidden md:inline" /> range of services
          </h1>

          <p className="mt-4 text-gray-600 max-w-2xl">
            From small repairs to full installations — our certified, vetted technicians
            cover plumbing, electrical, carpentry, appliances and more.
          </p>

          <div className="mt-8">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 text-gray-900 font-semibold px-6 py-3 shadow-sm transition-all duration-300 hover:translate-y-1 group"
            >
              Book a Service
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <svg
            className="absolute right-0 bottom-0 opacity-60 w-64 h-64 md:w-96 md:h-96 pointer-events-none"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" stroke="#56B7FF" strokeWidth="6" d="M0 150 C 50 200, 150 100, 200 150" />
          </svg>
        </div>
      </section>

      {/* Service Cards */}
      <section className="max-w-7xl mx-auto px-6 mt-16 space-y-12">

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-500 text-lg py-10">
            Loading services…
          </div>
        )}

        {/* Render services */}
        {!loading &&
          services.map((s, idx) => (
            <ServiceCard
              key={s.slug}
              title={s.title}
              desc={s.desc}
              image={s.image}
              reverse={idx % 2 === 1}
              to={`/services/${s.slug}`}
              Icon={s.Icon}  
            />
          ))}

        <div className="flex justify-center mt-6">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 text-gray-900 font-semibold px-8 py-3 shadow-sm transition-all duration-300 hover:translate-y-1 group"
          >
            Contact service
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
