// src/pages/ServiceDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import client from "../api/client";
import { default as Service1 } from "../assets/service-1.jpg";
import { default as Service2 } from "../assets/service-2.jpg";
import { default as Service3 } from "../assets/service-3.jpg";
import { default as Service4 } from "../assets/service-4.jpg";
import { default as Service5 } from "../assets/service-5.jpg";
import { default as Service6 } from "../assets/service-6.jpg";
import { default as BottomImg } from "../assets/servicebottom.jpg";
import { LuChevronLeft, LuZap } from "react-icons/lu";

const brand = {
  accent: "#1A386A",
  primary: "#FFCE51",
  neutral700: "#586272",
};

export default function ServiceDetails() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        try {
          const res = await client.get(`/services/${slug}`);
          if (!mounted) return;
          if (res?.data) {
            setService(res.data);
            setLoading(false);
            return;
          }
        } catch (e) {
          // fallback to list
        }

        const res2 = await client.get("/services");
        if (!mounted) return;
        const found = (res2.data || []).find((s) => s.slug === slug);
        if (found) setService(found);
        else setError("Service not found");
      } catch (err) {
        console.error("fetch service:", err);
        if (mounted) setError("Failed to load service");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [slug]);

  const pickImage = (s) => {
    const map = {
      "service-1": Service1,
      "service-2": Service2,
      "service-3": Service3,
      "service-4": Service4,
      "service-5": Service5,
      "service-6": Service6,
    };
    if (!s) return map["service-1"];
    const img = s.image || s.imageUrl || s.imagePath || "";
    if (img && (img.startsWith("http") || img.startsWith("/"))) return img;
    if (map[s.slug]) return map[s.slug];
    if (s.image && map[s.image]) return map[s.image];
    return Object.values(map)[Math.abs(String(s.title || s.slug).split("").reduce((a, c) => a + c.charCodeAt(0), 0)) % 6];
  };

  if (loading) {
    return <div className="max-w-6xl mx-auto p-6 text-center text-gray-600">Loading service…</div>;
  }

  if (error || !service) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold" style={{ color: brand.accent }}>
          {error || "Service not found"}
        </h2>
        <p className="mt-3 text-sm text-gray-600">Try browsing other services.</p>
        <div className="mt-6">
          <Link to="/services" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border" style={{ borderColor: "#E6EEF9", color: brand.accent }}>
            Back to services
          </Link>
        </div>
      </div>
    );
  }

  const image = pickImage(service);

  // fallback long content and features (keeps page rich when backend is minimal)
  const longContent = service.longDesc
    ? (Array.isArray(service.longDesc) ? service.longDesc : [service.longDesc])
    : [
        "Our experienced technicians handle every job with care and professionalism. We start with a detailed inspection to diagnose the issue, explain the problem in plain language, and propose the most cost-effective and long-lasting solution.",
        "We only use quality parts and follow safety-first practices. For electrical work this includes isolating circuits, testing loads, and verifying connections. For plumbing this means checking seals, testing water pressure, and ensuring leak-free finishes.",
        "Typical scope of work includes a site survey, a written estimate when required, the repair or installation with minimal disruption, and a final quality check. We stand behind our work with a service warranty — if anything goes wrong after the job, we’ll come back and make it right.",
      ];

  const features = Array.isArray(service.features) && service.features.length > 0
    ? service.features
    : [
        { title: "Certified technicians", desc: "Trained, background-checked professionals who follow safety protocols." },
        { title: "Transparent pricing", desc: "Clear estimates with no hidden fees; we explain cost breakdowns." },
        { title: "Quality parts", desc: "We use branded parts and materials for lasting repairs." },
      ];

  return (
    <main className="max-w-6xl mx-auto p-6">
      {/* HERO BAND */}
      <section className="relative rounded-2xl overflow-hidden">
        <div className="hidden md:block">
          <div className="relative">
            <img src={image} alt={service.title} className="w-full h-[420px] lg:h-[520px] object-cover rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-transparent rounded-2xl" />
            <div className="absolute left-8 top-12 md:left-16 md:top-16 max-w-2xl text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight drop-shadow">
                {service.title}
              </h1>
              <p className="mt-3 text-sm md:text-base max-w-xl leading-relaxed drop-shadow">
                {service.desc || "Professional, reliable and safe — our certified technicians handle it all."}
              </p>
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <img src={image} alt={service.title} className="w-full h-56 object-cover rounded-2xl" />
          <div className="mt-4 px-2">
            <h1 className="text-2xl font-extrabold text-gray-900">{service.title}</h1>
            <p className="mt-2 text-sm text-gray-600">{service.desc}</p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative -mt-7 z-10">
            <div className="w-16 h-16 md:w-16 md:h-16 rounded-full bg-yellow-400 border-4 border-white flex items-center justify-center shadow-lg">
              <LuZap className="text-black text-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* LEFT: text */}
          <div className="order-2 md:order-1">
            <h2 className="text-2xl md:text-3xl font-extrabold" style={{ color: brand.accent }}>
              Experts in {service.title.toLowerCase()}
            </h2>

            <div className="mt-4 text-gray-700 max-w-prose space-y-4">
              {longContent.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold" style={{ color: brand.accent }}>What we include</h3>
              <ul className="mt-4 space-y-3">
                {features.map((f, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-md bg-yellow-400 flex items-center justify-center font-semibold text-black">{i + 1}</div>
                    <div>
                      <div className="font-semibold text-gray-900">{f.title}</div>
                      <div className="text-sm text-gray-600">{f.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* NO contact/book buttons here per request */}
          </div>

          {/* RIGHT: big rounded image card */}
          <div className="order-1 md:order-2">
            <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100">
              <img src={image} alt={service.title} className="w-full h-64 md:h-80 object-cover" />
            </div>

            {/* small CTA note removed as requested */}
          </div>
        </div>
      </section>

      {/* BOTTOM SITE-WIDE CTA BAND (replace existing band with this) */}
        <section className="mt-40 relative"> 
            <div className="relative bg-[#1e325c] rounded-2xl overflow-hidden p-6 md:p-12 flex flex-col md:flex-row items-center">

            <div className="w-full md:w-[55%] md:ml-[45%] text-white relative z-20">
                <h2 className="text-3xl md:text-4xl font-extrabold leading-snug">
                Get a budget today <br />for your <span className="text-[#f3c545]">new project!</span>
                </h2>

                <p className="mt-4 text-white/90 max-w-md">
                Need help estimating the cost of your next project? Get a fast and accurate budget from our experts. We provide transparent pricing and high-quality service every step of the way.
                </p>

                <button className="mt-8 bg-[#f3c545] text-black font-semibold px-6 py-3 rounded-lg shadow hover:translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2">
                Get a quote →
                </button>
            </div>
            </div>
            <div
            className="absolute left-0 md:left-8 z-30 pointer-events-none"
            style={{
                top: "-92px",
                height: "114%",    
                display: "flex",
                alignItems: "flex-end",           
            }}
            >
            <img
                src={BottomImg}
                alt="Worker holding drill"          
                className="h-[320px] md:h-[480px] object-contain"
                style={{
                transform: "translateY(40px)",   
                }}
            />
            </div>

            <style jsx>{`
            @media (max-width: 767px) {
                /* bring the image down on mobile so it doesn't overlap the section above */
                div[style] { top: -48px !important; }
                div[style] img { transform: translateY(18px) !important; height: 240px !important; }
            }
            `}</style>
        </section>
    </main>
  );
}
