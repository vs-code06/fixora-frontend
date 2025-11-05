import React, { createContext, useContext, useEffect, useState } from "react";
import client from "../api/client";

const AuthCtx = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bootstrapping, setBootstrapping] = useState(true);

  // Check existing session on app load
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await client.get("/auth/me");
        if (mounted) setUser(data.user);
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setBootstrapping(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  const login = async (email, password) => {
    const { data } = await client.post("/auth/login", { email, password });
    setUser(data.user); // cookie already set by server
    return data.user;
  };

  const signup = async (name, email, password) => {
    const { data } = await client.post("/auth/signup", { name, email, password });
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    await client.post("/auth/logout");
    setUser(null);
  };

  const value = { user, setUser, login, signup, logout, bootstrapping };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};

export const useAuth = () => useContext(AuthCtx);
