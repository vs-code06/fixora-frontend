import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../api/client";


export default function HireCard({ provider: propProvider, service, onHire }) {
  const provider = propProvider || (service && service.provider) || {};
  const providerId = provider._id || provider.id || provider.providerId || null;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [provFull, setProvFull] = useState(provider || null);
  const [loadingProv, setLoadingProv] = useState(false);
  const [error, setError] = useState("");
  const [favLoading, setFavLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // const triggerRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    // check favorite status (silent fail if not authed)
    let mounted = true;
    async function checkFav() {
      if (!providerId) return;
      try {
        const res = await client.get(`/profile/favorites/check/${providerId}`);
        if (!mounted) return;
        setIsFavorited(!!res.data?.favorited);
      } catch (err) {
        // ignore
      }
    }
    checkFav();
    return () => (mounted = false);
  }, [providerId]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevTouch = document.body.style.touchAction;
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = prevOverflow || "";
      document.body.style.touchAction = prevTouch || "";
    }
    return () => {
      document.body.style.overflow = prevOverflow || "";
      document.body.style.touchAction = prevTouch || "";
    };
  }, [open]);

  // fetch provider details when modal opens if needed
  useEffect(() => {
    let mounted = true;
    async function fetchProvider() {
      if (!open) return;
      if (!providerId) {
        setError("Provider id missing");
        return;
      }

      const looksComplete = provFull && (provFull.bio || (provFull.categories && provFull.categories.length));
      if (looksComplete) return;

      setLoadingProv(true);
      setError("");
      try {
        // note: if your axios baseURL is "/api" adjust path accordingly
        const res = await client.get(`/providers/${providerId}`);
        if (!mounted) return;
        const payload = res.data?.provider || res.data || null;
        setProvFull(payload);
      } catch (err) {
        console.error("fetch provider failed", err);
        setError(err?.response?.data?.message || "Failed to load provider");
      } finally {
        if (mounted) setLoadingProv(false);
      }
    }

    fetchProvider();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, providerId]);

  async function toggleFavorite(e) {
    e?.stopPropagation?.();
    if (!providerId) return;
    setFavLoading(true);

    try {
      if (isFavorited) {
        await client.delete(`/profile/favorites/${providerId}`);
        setIsFavorited(false);
      } else {
        await client.post(`/profile/favorites/${providerId}`);
        setIsFavorited(true);
      }
    } catch (err) {
      console.error("favorite toggle failed", err);
      alert(err?.response?.data?.message || "Failed to update favorites");
    } finally {
      setFavLoading(false);
    }
  }

  function handleHire() {
    if (onHire) return onHire(provider);
    navigate(`/profile/${providerId || ""}`);
  }

  // keep visuals consistent with ProviderCard: hero area, avatar, name/cats, rating, action buttons
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {/* hero / image area */}
        <div className="h-40 bg-gray-100 overflow-hidden" />
        <div className="p-4">
          <div className="flex items-center gap-3">
            {/* avatar */}
            <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
              {provider.avatar ? (
                <img src={provider.avatar} alt={provider.name} className="w-full h-full object-cover" />
              ) : (
                <div
                  className="flex items-center justify-center h-full text-sm font-medium text-white"
                  style={{ background: "#FDE68A" }}
                >
                  {(provider.name || "U").charAt(0)}
                </div>
              )}
            </div>

            {/* name + categories */}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-slate-800 truncate">{provider.name || provider.title || "Unnamed"}</div>
              <div className="text-xs text-slate-500 truncate">{(provider.categories || []).slice(0, 2).join(", ")}</div>
            </div>

            {/* rating + favorite (kept compact like your previous design) */}
            <div className="flex items-center gap-3">
              <div className="text-sm font-semibold text-slate-800">{provider.rating ? Number(provider.rating).toFixed(1) : "—"}</div>
              <div className="text-xs text-slate-500">({provider.reviewsCount || 0} reviews)</div>

              {/* favorite icon */}
              <button
                onClick={toggleFavorite}
                disabled={favLoading}
                title={isFavorited ? "Remove from favorites" : "Add to favorites"}
                className="ml-2 inline-flex items-center justify-center p-2 rounded-md border hover:bg-gray-50"
                style={{ width: 36, height: 36 }}
                aria-pressed={isFavorited}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={isFavorited ? "#ef4444" : "none"} stroke={isFavorited ? "#ef4444" : "#374151"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20.8 4.6c-1.5-1.7-4-1.9-5.6-.5L12 7 8.8 4.1C7.2 2.7 4.6 2.9 3.1 4.6 1.5 6.4 1.6 9.1 3.2 10.8l7.3 7.5c.4.4 1.1.4 1.5 0l7.3-7.5c1.6-1.8 1.7-4.5.5-6.2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* short description */}
          { (service && service.shortDesc) || provider.shortDesc || provider.bio ? (
            <p className="mt-3 text-sm text-gray-600 line-clamp-2">{service?.shortDesc || provider.bio || provider.shortDesc}</p>
          ) : null }

          {/* actions */}
          <div className="mt-3 flex items-center justify-end gap-2">
            <button
              onClick={() => {
                setOpen(true);
              }}
              className="px-3 py-1 rounded-md border text-sm"
            >
              View profile
            </button>

            <button
              onClick={handleHire}
              className="ml-2 px-3 py-1 rounded-md bg-yellow-400 text-sm font-semibold"
            >
              Hire
            </button>
          </div>
        </div>
      </div>

      {/* profile modal (kept from original HireCard) */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`provider-name-${providerId || provider.name}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div onClick={() => setOpen(false)} className="absolute inset-0 bg-black/40" />

          <div
            className="relative w-full sm:max-w-2xl max-h-[90vh] overflow-auto bg-white rounded-lg shadow-2xl z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between px-5 py-4 border-b sticky top-0 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  {provFull?.avatar ? (
                    <img src={provFull.avatar} alt={provFull.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-lg font-bold text-gray-600">{(provFull?.name || provider.name || "U").charAt(0).toUpperCase()}</div>
                  )}
                </div>

                <div>
                  <div id={`provider-name-${providerId || provider.name}`} className="font-semibold text-lg text-slate-900">
                    {provFull?.name || provider.name || "Unnamed provider"}
                  </div>
                  <div className="text-xs text-slate-500">{(provFull?.categories || provider.categories || []).join(", ")}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-sm text-yellow-500 font-semibold mr-2">{provider.rating ?? "—"} ★</div>
                <button ref={closeBtnRef} onClick={() => setOpen(false)} className="px-3 py-1 rounded-md border text-sm" aria-label="Close profile">
                  Close
                </button>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {loadingProv ? (
                <div className="text-center py-8">Loading profile…</div>
              ) : error ? (
                <div className="text-center text-red-600 py-6">{error}</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-1 rounded-md overflow-hidden bg-gray-50">
                    {provider.heroImage || provider.cover || provider.avatar ? (
                      <img src={provider.heroImage || provider.cover || provider.avatar} alt={provider.name} className="w-full h-48 object-cover" />
                    ) : (
                      <div className="h-48 flex items-center justify-center text-sm text-gray-400">No image</div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <div className="text-sm text-slate-500">About provider</div>
                    <div className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{provFull?.bio || provider.bio || "No bio provided."}</div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {(provFull?.categories || provider.categories || []).map((c) => (
                        <span key={c} className="px-2 py-1 rounded-md bg-gray-100 text-xs text-slate-700 border">{c}</span>
                      ))}
                    </div>

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs text-slate-500">Location</div>
                        <div className="text-sm text-slate-700">{provFull?.location?.city || provider.location?.city || provFull?.location?.address || provider.location?.address || "Not specified"}</div>
                      </div>

                      <div>
                        <div className="text-xs text-slate-500">Contact</div>
                        <div className="text-sm text-slate-700">{provFull?.phone || provider.phone || "Not provided"}</div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      <button onClick={handleHire} className="px-4 py-2 rounded-md font-semibold" style={{ background: "#FFCE51", color: "#111827" }}>
                        Hire
                      </button>


                      <button onClick={() => setOpen(false)} className="px-3 py-2 rounded-md border text-sm ml-auto">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes pop { from { transform: translateY(8px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }`}</style>
    </>
  );
}
