import axios from "axios";

const API_BASE = "https://omniaai.azurewebsites.net/api";

export const login = () => {
  window.location.href = `${API_BASE}/AuthLogin`;
};

export const getSession = async (sessionId) => {
  const res = await axios.get(`${API_BASE}/AuthSession?sessionId=${sessionId}`, { withCredentials: true });
  return res.data;
};

export const refreshSession = async (sessionId) => {
  const res = await axios.get(`${API_BASE}/AuthRefresh?sessionId=${sessionId}`, { withCredentials: true });
  return res.data;
};

export const logout = () => {
  window.location.href = `${API_BASE}/AuthLogout`;
};