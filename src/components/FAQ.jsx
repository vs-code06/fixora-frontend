// src/components/FAQ.jsx
import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import client from "../api/client";

const FALLBACK_ITEMS = [
  {
    q: "What is a handyman and what types of jobs can they help with?",
    a:
      "A handyman is a skilled professional who can assist with a wide range of home repair and maintenance tasks, from plumbing and electrical fixes to carpentry, painting, and general odd jobs. They provide convenient and reliable solutions for homeowners.",
  },
  {
    q: "What is the experience and training of your handyman team?",
    a:
      "Our technicians are certified and experienced in their trade. We run background checks, provide on-job training, and ensure every pro we send is insured and vetted.",
  },
  {
    q: "What are the most common services you offer as a handyman?",
    a:
      "Common services include plumbing repairs, electrical fixes, appliance installation, AC servicing, carpentry, taps and mixers installation, and more. See our services page for full offerings.",
  },
  {
    q: "What is your service area? Do you serve my location?",
    a:
      "We operate in multiple service zones. Enter your postcode in the booking/quote flow to check availability for your address.",
  },
];

function AccordionItem({ item, index, openIndex, setOpenIndex }) {
  const open = index === openIndex;
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px"); // measured height for animation

  useEffect(() => {
    // measure scrollHeight and set maxHeight for smooth transition
    if (contentRef.current) {
      if (open) {
        const measured = `${contentRef.current.scrollHeight}px`;
        setHeight(measured);
      } else {
        setHeight("0px");
      }
    }
  }, [open]);

  return (
    <div
      className="bg-white border rounded-2xl p-6 shadow-sm transition-transform duration-200 ease-out hover:scale-[0.985] hover:shadow-md"
      // small custom scale with Tailwind arbitrary value for subtle shrink
    >
      <button
        onClick={() => setOpenIndex(open ? null : index)}
        className="w-full flex items-center justify-between gap-4 text-left"
        aria-expanded={open}
        aria-controls={`faq-panel-${index}`}
      >
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900">{item.q}</h4>
        </div>

        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center bg-black text-white transform transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden
        >
          <FaChevronDown />
        </div>
      </button>

      {/* animated panel */}
      <div
        id={`faq-panel-${index}`}
        className="mt-4 text-gray-600 overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: height,
        }}
        aria-hidden={!open}
      >
        {/* the inner wrapper will be measured (padding preserved) */}
        <div
          ref={contentRef}
          className="py-1"
          style={{
            transform: open ? "translateY(0)" : "translateY(-6px)",
            opacity: open ? 1 : 0,
            transition: "opacity 220ms ease, transform 220ms ease",
            whiteSpace: "pre-wrap",
          }}
        >
          {item.a}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [items, setItems] = useState(FALLBACK_ITEMS);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const fetchFaqs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await client.get("/faqs");
        const raw = res?.data?.data ?? res?.data;
        if (!mounted) return;

        if (Array.isArray(raw) && raw.length) {
          setItems(
            raw.map((f, idx) => ({
              q: f.question ?? f.q ?? "Untitled question",
              a: f.answer ?? f.a ?? "No answer available",
              id: f._id ?? f.id ?? `fallback-${idx}`,
            }))
          );
        } else {
          setItems(FALLBACK_ITEMS);
        }
      } catch (err) {
        console.warn("FAQ load failed:", err);
        if (mounted) {
          setError("Unable to load FAQs — showing local content.");
          setItems(FALLBACK_ITEMS);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchFaqs();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="py-8">
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
          FAQs
        </span>
        <h3 className="mt-4 text-3xl font-extrabold">Frequent questions</h3>
        <p className="mt-2 text-gray-600">Common questions we get from customers.</p>
        {loading && <p className="mt-3 text-sm text-gray-500">Loading…</p>}
        {error && <p className="mt-3 text-sm text-yellow-700">{error}</p>}
      </div>

      <div className="mt-10 space-y-6 max-w-4xl mx-auto px-4">
        {items.map((item, i) => (
          <AccordionItem
            key={item.id ?? i}
            item={item}
            index={i}
            openIndex={openIndex}
            setOpenIndex={setOpenIndex}
          />
        ))}
      </div>
    </div>
  );
}
