import React from "react";
import { Link } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";

import {
    LuWrench,
    LuPaintRoller,
    LuZap,
    LuDroplet,   
    LuHammer,    
    LuDrill      
  } from "react-icons/lu";
  

import svcImg1 from "../assets/service-1.jpg";
import svcImg2 from "../assets/service-2.jpg";
import svcImg3 from "../assets/service-3.jpg";
import svcImg4 from "../assets/service-4.jpg";
import svcImg5 from "../assets/service-5.jpg";
import svcImg6 from "../assets/service-6.jpg";

const services = [
    {
      id: "general-repairs",
      title: "General Repairs",
      desc:
        "Quick fixes for doors, hinges, small installs and everyday household repairs.",
      image: svcImg1,
      Icon: LuWrench,
    },
    {
      id: "painting",
      title: "Painting and decorating",
      desc:
        "Interior & exterior painting: prep, primer, finish coats and touch-ups.",
      image: svcImg2,
      Icon: LuPaintRoller,
    },
    {
      id: "electrical",
      title: "Electrical repairs",
      desc:
        "Socket & switch replacement, appliance wiring, safety checks by certified pros.",
      image: svcImg3,
      Icon: LuZap,
    },
    {
      id: "plumbing",
      title: "Plumbing repairs",
      desc:
        "Leak detection, pipe repairs, mixer & geyser installation and drain unblocking.",
      image: svcImg4,
      Icon: LuDroplet,
    },
    {
      id: "carpentry",
      title: "Carpentry services",
      desc:
        "Door, shelf and cabinet installations, custom carpentry and small woodwork projects.",
      image: svcImg5,
      Icon: LuHammer,
    },
    {
      id: "furniture",
      title: "Furniture assembly",
      desc:
        "Fast, careful furniture assembly from flat-pack deliveries or onsite builds.",
      image: svcImg6,
      Icon: LuDrill,
    },
  ];
  
  

const ServicesPage = () => {
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
                className="
                    inline-flex items-center gap-2 
                    rounded-lg bg-yellow-400 text-gray-900 font-semibold 
                    px-6 py-3 shadow-sm 
                    transition-all duration-300 ease-in-out 
                    hover:translate-y-1 
                    group
                "
                aria-label="Get a quote"
                >
                Book a Service 
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* decorative curve (optional) */}
          <svg
            className="absolute right-0 bottom-0 opacity-60 w-64 h-64 md:w-96 md:h-96 pointer-events-none"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke="#56B7FF"
              strokeWidth="6"
              d="M0 150 C 50 200, 150 100, 200 150"
            />
          </svg>
        </div>
      </section>

      {/* Services list */}
      <section className="max-w-7xl mx-auto px-6 mt-16 space-y-12">
        {services.map((s, idx) => (
          <ServiceCard
            key={s.id}
            title={s.title}
            desc={s.desc}
            image={s.image}
            reverse={idx % 2 === 1} // alternate sides
            to={`/services/${s.id}`}
            Icon={s.Icon}
          />
        ))}

        {/* Bottom CTA centered */}
        <div className="flex justify-center mt-6">
            <Link
                to="/contact"
                className="
                    inline-flex items-center gap-2 
                    rounded-lg bg-yellow-400 text-gray-900 font-semibold 
                    px-8 py-3 shadow-sm 
                    transition-all duration-300 ease-in-out 
                    hover:translate-y-1 
                    group
                "
                >
                Contact service
                <span 
                    aria-hidden 
                    className="transition-transform duration-300 group-hover:translate-x-1"
                >
                    →
                </span>
            </Link>

        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
