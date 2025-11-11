import React, { useEffect, useRef, useState } from "react";
import client from "../api/client.js";



const TestimonialsSection = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollerRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await client.get("/testimonials");
        console.log(data);
        if (mounted) setItems(data.testimonials || []);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const scrollRight = () => {
    scrollerRef.current?.scrollBy({ left: 500, behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-start justify-between gap-6">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-500">
              Testimonials
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight max-w-2xl">
              What people say <br className="hidden sm:block" />
              about our services
            </h2>
          </div>
        </div>

        <div className="relative mt-8 md:mt-10">
          <div
            ref={scrollerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none"
          >
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="min-w-[420px] max-w-[420px] rounded-2xl"
                  style={{ backgroundColor: "rgba(87, 174, 244, 0.2)", padding: "1.5rem" }}
                >
                  <div className="h-5 w-3/4 bg-white/50 rounded mb-3" />
                  <div className="h-5 w-5/6 bg-white/40 rounded mb-3" />
                  <div className="h-5 w-2/3 bg-white/30 rounded mb-6" />
                </div>
              ))
            ) : (
              items.map((t) => (
                <article
                  key={t._id}
                  className="min-w-[420px] max-w-[420px] snap-start rounded-2xl"
                  style={{
                    backgroundColor: "rgba(87, 174, 244, 0.2)",
                    padding: "1.75rem",
                  }}
                >
                  <p className="text-lg md:text-xl font-semibold text-gray-900 leading-snug">
                    “{t.message}”
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">{t.name}</span>
                      {t.city && (
                        <span className="text-gray-700 text-sm">{t.city}</span>
                      )}
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          <button
            onClick={scrollRight}
            className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 
                        w-12 h-12 rounded-full bg-gray-900 text-white items-center justify-center 
                        hover:bg-black transition transform hover:scale-110 duration-300 ease-in-out"
            aria-label="Next testimonials"
            >
            →
            </button>

        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
