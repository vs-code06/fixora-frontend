import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import client from "../api/client";

export default function ProviderProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await client.get(`/api/providers/${id}`);
        if (!mounted) return;
        const payload = res.data?.provider || res.data || null;
        setProvider(payload);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load provider");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div className="p-6">Loading provider…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!provider) return <div className="p-6">Provider not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button className="mb-4 text-sm underline" onClick={() => navigate(-1)}>← Back</button>

      <div className="flex gap-6 items-start">
        <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
          {provider.avatar ? (
            <img src={provider.avatar} alt={provider.name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-3xl font-semibold text-gray-500">{(provider.name || "U").charAt(0).toUpperCase()}</div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-2xl font-bold">{provider.name}</h1>
          <div className="text-sm text-slate-500 mt-1">
            {(provider.categories || []).join(", ")}
            {provider.location?.city ? ` · ${provider.location.city}` : ""}
          </div>

          <div className="mt-4 text-gray-700 whitespace-pre-wrap">
            {provider.bio || "No bio provided."}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-slate-500">Contact</div>
              <div className="text-sm text-slate-700">{provider.phone || "Not provided"}</div>
            </div>

            <div>
              <div className="text-xs text-slate-500">Ratings</div>
              <div className="text-sm text-slate-700">{provider.rating ?? "—"} ★ ({provider.reviewsCount ?? 0})</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
