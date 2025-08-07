// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { getSession, refreshSession } from "../services/Auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load session on mount
  useEffect(() => {
    const sessionIdFromUrl =
      new URLSearchParams(window.location.search).get("sessionId");
    const stored = sessionStorage.getItem("sessionId");
    const sessionId = sessionIdFromUrl || stored;

    if (!sessionId) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const data = await getSession(sessionId);
        sessionStorage.setItem("sessionId", sessionId);
        sessionStorage.setItem("token", data?.accessToken);
        setSession({ ...data, sessionId });
      } catch {
        setSession(null);
        sessionStorage.removeItem("sessionId");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Refresh token
  const refreshToken = async () => {
    const currentId = session?.sessionId || sessionStorage.getItem("sessionId");
    if (!currentId) return null;

    try {
      const data = await refreshSession(currentId);
      setSession(prev => ({ ...(prev || {}), ...data, sessionId: currentId }));
      return data;
    } catch (error) {
      console.error("[Frontend] Token refresh failed:", error);
      if (error.response?.status === 401) {
        console.warn("[Frontend] Session expired during refresh. Logging out...");
        await handleLogout();
      }
      return null;
    }
  };

  // Auto-refresh before expiry
  useEffect(() => {
    if (!session?.sessionId) return;

    const REFRESH_INTERVAL = 50 * 60 * 1000; // 50 minutes
    const id = setInterval(() => {
      refreshToken();
    }, REFRESH_INTERVAL);

    return () => clearInterval(id);
  }, [session?.sessionId]);

  // Logout
  const handleLogout = async () => {
    const currentId = session?.sessionId || sessionStorage.getItem("sessionId");
    if (!currentId) {
      setSession(null);
      sessionStorage.clear();
      return;
    }

    try {
      await axios.get(`/api/AuthLogout?sessionId=${currentId}`);
    } catch (error) {
      console.error("[Frontend] Logout failed:", error);
    } finally {
      setSession(null);
      setTimeout(() => {
        sessionStorage.clear();
      }, 500);
    }
  };

  const value = useMemo(
    () => ({ session, loading, refreshToken, setSession, handleLogout }),
    [session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (ctx === null) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
