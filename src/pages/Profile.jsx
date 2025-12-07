import React, { useEffect, useState, useRef } from "react";
import client from "../api/client";
import { useNavigate } from "react-router-dom";

const PRIMARY_YELLOW = "#FFCE51";
const ACCENT_PALE = "#E9F4FF";
const BG_LIGHT = "#fbfdff";
const PANEL_BG = "rgba(241, 248, 255, 0.85)";
const PANEL_BORDER = "#e6eff9";

function FavoriteCard({ p, onRemove }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="p-4 flex items-start gap-4">
        <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center flex-shrink-0">
          {p.avatar ? (
            <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
          ) : (
            <div className="text-lg font-semibold text-slate-500">{(p.name || "U").charAt(0)}</div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start">
            <div className="min-w-0">
              <div className="text-sm font-medium text-slate-900 truncate">{p.name}</div>
              <div className="text-xs text-slate-500 mt-1 truncate">{(p.categories || []).slice(0, 2).join(", ") || p.location?.city || "Provider"}</div>
            </div>

            {p.rating !== undefined && p.rating !== null && (
              <div className="ml-3 flex-shrink-0 text-yellow-500 font-semibold text-sm">
                {Number(p.rating).toFixed(1)} <span aria-hidden>★</span>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2">
            {/* remove button kept on the right */}
            <div className="ml-auto">
              <button
                onClick={() => onRemove(p._id)}
                className="px-3 py-2 rounded-md text-sm border text-red-600"
                style={{ borderColor: "rgba(239,68,68,0.12)" }}
                aria-label={`Remove ${p.name} from favorites`}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  // favorites
  const [favorites, setFavorites] = useState([]);
  const [favoritesLoading, setFavoritesLoading] = useState(true);

  // profile
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showProviderConfirm, setShowProviderConfirm] = useState(false);

  // delete account
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();

  // form for edit
  const [form, setForm] = useState({
    avatarFile: null,
    avatarPreview: "",
    phone: "",
    bio: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    categories: [],
  });
  const [categoryText, setCategoryText] = useState("");

  const fileInputRef = useRef();
  const categoryInputRef = useRef();

  // load profile
  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await client.get("/profile/me");
        if (!mounted) return;
        const u = res.data.user;
        setUser(u);
        const loc = u.location || {};
        setForm({
          avatarFile: null,
          avatarPreview: u.avatar || "",
          phone: u.phone || "",
          bio: u.bio || "",
          address: loc.address || "",
          city: loc.city || "",
          state: loc.state || "",
          country: loc.country || "",
          postalCode: loc.postalCode || "",
          categories: u.categories || [],
        });
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  // load favorites (separate so it can refresh independently)
  useEffect(() => {
    let mounted = true;
    async function loadFavorites() {
      setFavoritesLoading(true);
      try {
        const res = await client.get("/profile/favorites");
        if (!mounted) return;
        setFavorites(res.data.favorites || []);
      } catch (err) {
        console.error("load favorites failed", err);
        setFavorites([]);
      } finally {
        if (mounted) setFavoritesLoading(false);
      }
    }
    loadFavorites();
    return () => (mounted = false);
  }, []);

  // helpers for favorites
  async function removeFavoriteFromList(providerId) {
    const ok = window.confirm("Remove this provider from your favorites?");
    if (!ok) return;
    try {
      await client.delete(`/profile/favorites/${providerId}`);
      setFavorites((s) => s.filter((p) => String(p._id) !== String(providerId)));
    } catch (err) {
      console.error("remove favorite failed", err);
      alert(err?.response?.data?.message || "Failed to remove favorite");
    }
  }

  // lock body scroll when edit panel open
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    if (openEdit) document.body.style.overflow = "hidden";
    else document.body.style.overflow = prevOverflow || "";
    return () => {
      document.body.style.overflow = prevOverflow || "";
    };
  }, [openEdit]);

  function handleAvatarFile(file) {
    if (!file) {
      setForm((f) => ({ ...f, avatarFile: null, avatarPreview: "" }));
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setForm((f) => ({ ...f, avatarFile: file, avatarPreview: e.target.result }));
    };
    reader.readAsDataURL(file);
  }

  function startEdit() {
    if (!user) return;
    const loc = user.location || {};
    setForm({
      avatarFile: null,
      avatarPreview: user.avatar || "",
      phone: user.phone || "",
      bio: user.bio || "",
      address: loc.address || "",
      city: loc.city || "",
      state: loc.state || "",
      country: loc.country || "",
      postalCode: loc.postalCode || "",
      categories: user.categories || [],
    });
    setCategoryText("");
    setOpenEdit(true);
  }

  function addCategoryTag(tag) {
    const t = String(tag || "").trim();
    if (!t) return;
    setForm((s) => ({ ...s, categories: Array.from(new Set([...s.categories, t])) }));
  }
  function removeCategoryTag(tag) {
    setForm((s) => ({ ...s, categories: s.categories.filter((c) => c !== tag) }));
  }

  async function handleSave(e) {
    e?.preventDefault?.();
    setSaving(true);
    try {
      let avatarUrl = form.avatarPreview;

      // 1. Upload new avatar if file selected
      if (form.avatarFile) {
        const formData = new FormData();
        formData.append("avatar", form.avatarFile);

        // You might need to adjust client to handle multipart/form-data correctly if it doesn't auto-detect
        // axios usually handles it if you pass FormData.
        const uploadRes = await client.post("/profile/me/avatar", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        avatarUrl = uploadRes.data.avatar;
      }

      // 2. Update profile details
      const payload = {
        avatar: avatarUrl,
        phone: form.phone,
        bio: form.bio,
        location: {
          address: form.address,
          city: form.city,
          state: form.state,
          country: form.country,
          postalCode: form.postalCode,
        },
      };
      if (user && user.role === "provider") payload.categories = form.categories;

      const res = await client.put("/profile/me", payload);
      setUser(res.data.user);
      setOpenEdit(false);
      setForm((f) => ({ ...f, categories: res.data.user.categories || [], avatarFile: null, avatarPreview: res.data.user.avatar }));
      setCategoryText("");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to save profile");
    } finally {
      setSaving(false);
    }
  }

  async function confirmRequestProvider() {
    try {
      await client.post("/profile/request-provider");
      alert("Requested provider role — reload to see changes.");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Request failed");
    } finally {
      setShowProviderConfirm(false);
    }
  }

  async function handleDeleteAccount() {
    setShowDeleteConfirm(true);
  }

  async function performDeleteAccount() {
    setDeleting(true);
    try {
      await client.delete("/profile/me");
      window.location.href = "/";
    } catch (err) {
      console.error("delete account failed", err);
      alert(err?.response?.data?.message || "Failed to delete account");
      setShowDeleteConfirm(false);
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div style={{ background: BG_LIGHT }} className="min-h-[320px]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="h-40 rounded-lg bg-gray-100 animate-pulse" />
        </div>
      </div>
    );
  }

  if (!user) return <div className="p-6 text-center text-red-600">Profile not found</div>;

  const isProvider = user.role === "provider";

  return (
    <>
      <div style={{ background: BG_LIGHT }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* header */}
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Your profile</h1>
              <p className="text-sm text-slate-500 mt-2">Keep your details up-to-date so customers and providers can connect.</p>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => navigate("/hire")} className="px-4 py-2 rounded-md border text-sm text-slate-700 shadow-sm" style={{ borderColor: ACCENT_PALE }}>
                Find professionals
              </button>

              {user.role !== "provider" && (
                <div className="relative">
                  <button onClick={() => setShowProviderConfirm((s) => !s)} className="px-4 py-2 rounded-md border text-sm shadow-sm" style={{ borderColor: ACCENT_PALE }}>
                    Become a provider
                  </button>

                  {showProviderConfirm && (
                    <div className="absolute right-0 mt-2 w-72 bg-white/95 border rounded-md shadow-lg p-3 z-20">
                      <div className="text-sm text-slate-700">Request to become a provider? This will switch your role to <b>provider</b> (verification pending).</div>
                      <div className="mt-3 flex justify-end gap-2">
                        <button onClick={() => setShowProviderConfirm(false)} className="px-3 py-1 rounded-md border text-sm">Cancel</button>
                        <button onClick={confirmRequestProvider} className="px-3 py-1 rounded-md font-semibold" style={{ background: PRIMARY_YELLOW, color: "#111827" }}>Confirm</button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button onClick={startEdit} className="px-4 py-2 rounded-md font-semibold shadow-sm" style={{ background: PRIMARY_YELLOW, color: "#111827" }}>
                Edit profile
              </button>

              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 rounded-md font-semibold shadow-sm"
                style={{ background: "#fef2f2", color: "#b91c1c", border: "1px solid rgba(220, 38, 38, 0.08)" }}
              >
                Delete profile
              </button>
            </div>
          </div>

          {/* profile panel */}
          <div className="rounded-2xl p-6 mb-8" style={{ background: PANEL_BG, border: `1px solid ${PANEL_BORDER}`, backdropFilter: "saturate(140%) blur(6px)" }}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              <div className="lg:col-span-1 flex items-center lg:items-start">
                <div className="relative">
                  <div className="w-32 h-32 rounded-xl overflow-hidden shadow-xl flex items-center justify-center" style={{ background: "#FDE68A" }}>
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-4xl font-bold text-white">{(user.name || "U").charAt(0).toUpperCase()}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="text-2xl md:text-3xl font-extrabold text-slate-900">{user.name}</div>
                    <div className="text-sm text-slate-500 mt-1">{user.email}</div>

                    <div className="mt-4 flex items-center gap-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/90 border text-sm" style={{ borderColor: ACCENT_PALE }}>
                        Role: <b className="ml-1">{user.role}</b>
                      </span>

                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm ${user.profileCompleted ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-800"}`}>
                        {user.profileCompleted ? "Profile complete" : "Profile incomplete"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <div className="text-xs text-slate-500">Last active</div>
                      <div className="text-sm font-semibold text-slate-700">{user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "—"}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-xs text-slate-500">Member since</div>
                      <div className="text-sm font-semibold text-slate-700">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/60" />

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-slate-500">Phone</div>
                    <div className="mt-2 text-slate-700">{user.phone || <span className="text-slate-400">Not provided</span>}</div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500">Location</div>
                    <div className="mt-2 text-slate-700">
                      {user.location ? (
                        <>
                          {user.location.address && <div>{user.location.address}</div>}
                          <div>{user.location.city ? `${user.location.city}${user.location.state ? ", " + user.location.state : ""}` : ""}</div>
                          <div>{user.location.postalCode || ""} {user.location.country || ""}</div>
                        </>
                      ) : (
                        <span className="text-slate-400">Not provided</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500">About</div>
                    <div className="mt-2 text-slate-700">{user.bio || <span className="text-slate-400">No bio yet</span>}</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xs text-slate-500">Categories</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(user.categories || []).length === 0 ? (
                      <span className="text-slate-400 text-sm">No categories added</span>
                    ) : (
                      (user.categories || []).map((c) => (
                        <span key={c} className="px-3 py-1 rounded-md text-sm bg-white/90 border" style={{ borderColor: ACCENT_PALE }}>{c}</span>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Favorites section - styled */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-slate-500">Favorites</div>
                <h2 className="text-2xl font-semibold text-slate-900">Providers you favourited</h2>
              </div>

              <div className="flex items-center gap-3">
                {!favoritesLoading && favorites.length > 0 && (
                  <div className="text-sm text-slate-500">{favorites.length} saved</div>
                )}
              </div>
            </div>

            <div>
              {favoritesLoading ? (
                <div className="rounded-lg p-6 bg-white/80 border" style={{ borderColor: ACCENT_PALE }}>
                  <div className="text-sm text-slate-500">Loading favorites…</div>
                </div>
              ) : favorites.length === 0 ? (
                <div className="rounded-lg p-8 bg-white/90 border flex items-center gap-4" style={{ borderColor: ACCENT_PALE }}>
                  <div className="w-14 h-14 rounded-md bg-yellow-50 flex items-center justify-center text-xl font-semibold text-yellow-600">⭐</div>
                  <div>
                    <div className="text-sm text-slate-700 font-medium">No favourites yet</div>
                    <div className="text-xs text-slate-400 mt-1">Browse providers and tap the heart to save your favourites for quick access.</div>
                  </div>
                  <div className="ml-auto">
                    <button onClick={() => navigate("/hire")} className="px-3 py-2 rounded-md font-semibold" style={{ background: PRIMARY_YELLOW, color: "#111827" }}>
                      Find providers
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {favorites.map((p) => (
                    <FavoriteCard key={p._id} p={p} onRemove={removeFavoriteFromList} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Slide-over edit panel */}
      <div className={`fixed inset-0 z-50 ${openEdit ? "" : "pointer-events-none"}`} aria-hidden={!openEdit}>
        <div
          onClick={() => setOpenEdit(false)}
          className={`absolute inset-0 bg-black/30 transition-opacity ${openEdit ? "opacity-100" : "opacity-0"}`}
        />

        <aside
          className={`absolute right-0 top-0 h-full w-full sm:w-[520px] bg-white shadow-2xl transform transition-transform ${openEdit ? "translate-x-0" : "translate-x-full"}`}
          style={{ overflowY: "auto", WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div>
              <h3 className="text-lg font-semibold">Edit profile</h3>
              <p className="text-sm text-slate-500">Update contact, bio, avatar & categories</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setOpenEdit(false)} className="text-sm px-3 py-2 rounded-md border">Close</button>
              <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-md font-semibold" style={{ background: PRIMARY_YELLOW, color: "#111827" }}>
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

          <div className="p-6 overflow-auto h-full">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                {form.avatarPreview ? (
                  <img src={form.avatarPreview} alt="avatar preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-2xl font-semibold text-slate-500">{(user.name || "U").charAt(0)}</div>
                )}
              </div>

              <div className="flex-1">
                <div className="text-sm text-slate-700 font-medium">Profile picture</div>
                <div className="text-xs text-slate-500 mt-1">Upload a square image for best results</div>

                <div className="mt-3 flex gap-2">
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      handleAvatarFile(f);
                    }} />
                  <button onClick={() => fileInputRef.current?.click()} className="px-3 py-2 rounded-md border text-sm">Choose file</button>
                  <button onClick={() => { setForm((s) => ({ ...s, avatarFile: null, avatarPreview: "" })); fileInputRef.current.value = null; }} className="px-3 py-2 rounded-md border text-sm">Remove</button>
                </div>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Phone</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1 block w-full border rounded-md px-3 py-2" placeholder="+91XXXXXXXXXX" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Short bio</label>
                <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="mt-1 block w-full border rounded-md px-3 py-2" rows={4} />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Address</label>
                <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="mt-1 block w-full border rounded-md px-3 py-2" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700">City</label>
                  <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="mt-1 block w-full border rounded-md px-3 py-2" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">State</label>
                  <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="mt-1 block w-full border rounded-md px-3 py-2" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Postal Code</label>
                  <input value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} className="mt-1 block w-full border rounded-md px-3 py-2" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Country</label>
                <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="mt-1 block w-full border rounded-md px-3 py-2" />
              </div>

              {isProvider && (
                <div>
                  <label className="block text-sm font-medium text-slate-700">Categories (skills)</label>
                  <div className="mt-2">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {(form.categories || []).map((c) => (
                        <div key={c} className="px-3 py-1 rounded-md bg-white border flex items-center gap-2 text-sm" style={{ borderColor: ACCENT_PALE }}>
                          <span>{c}</span>
                          <button type="button" onClick={() => removeCategoryTag(c)} className="text-xs text-slate-500">×</button>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <input ref={categoryInputRef} value={categoryText} onChange={(e) => setCategoryText(e.target.value)} placeholder="Add category and press Enter" className="flex-1 min-w-[140px] border rounded-md px-3 py-2" onKeyDown={(e) => {
                        if (e.key === "Enter") { e.preventDefault(); const val = categoryText.trim(); if (!val) return; addCategoryTag(val); setCategoryText(""); }
                        else if (e.key === ",") { e.preventDefault(); const val = categoryText.replace(",", "").trim(); if (!val) return; addCategoryTag(val); setCategoryText(""); }
                      }} onBlur={() => { const val = categoryText.trim(); if (!val) return; addCategoryTag(val); setCategoryText(""); }} />

                      <button type="button" onClick={() => { const val = categoryText.trim(); if (!val) return; addCategoryTag(val); setCategoryText(""); categoryInputRef.current?.focus(); }} className="px-3 py-2 rounded-md border text-sm">Add</button>
                    </div>

                    <div className="text-xs text-slate-400 mt-1">Examples: Plumbing, Cleaning, Electrical, Carpentry</div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4">
                <button type="button" onClick={() => setOpenEdit(false)} className="px-3 py-2 rounded-md border text-sm">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 rounded-md font-semibold" style={{ background: PRIMARY_YELLOW, color: "#111827" }}>
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        </aside>
      </div>

      {/* DELETE confirmation modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
          <div onClick={() => setShowDeleteConfirm(false)} className="absolute inset-0 bg-black/40" />
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-10">
            <h3 className="text-lg font-semibold text-slate-900">Delete account</h3>
            <p className="mt-2 text-sm text-slate-700">This action <b>cannot</b> be undone. Your account and associated data will be permanently deleted.</p>

            <div className="mt-4 text-sm text-slate-500">
              Consider deactivating or contacting support if you're unsure. If your account has active bookings, services, or payments, deleting may orphan those records.
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setShowDeleteConfirm(false)} className="px-3 py-2 rounded-md border text-sm">Cancel</button>
              <button onClick={performDeleteAccount} disabled={deleting} className="px-3 py-2 rounded-md font-semibold" style={{ background: "#f87171", color: "#fff" }}>
                {deleting ? "Deleting…" : "Delete account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
