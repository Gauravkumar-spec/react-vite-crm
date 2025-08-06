import React, { createContext, useContext, useState, useEffect } from "react";
import { getSession, refreshSession } from "../services/Auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get("sessionId") || sessionStorage.getItem("sessionId");

    if (sessionId) {
      getSession(sessionId)
        .then((data) => {
          sessionStorage.setItem("sessionId", sessionId);
          setSession({ ...data, sessionId });
        })
        .catch(() => {
          setSession(null);
          sessionStorage.removeItem("sessionId");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const refreshToken = async () => {
    if (!session?.sessionId) return;
    const data = await refreshSession(session.sessionId);
    setSession((prev) => ({ ...prev, ...data }));
  };

  return (
    <AuthContext.Provider value={{ session, loading, refreshToken, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);