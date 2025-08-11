// src/App.jsx
import { useState, useMemo } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Listings from "./pages/Listings";
import Settings from "./pages/Settings";
import ListingList from "./pages/ListingList";
import Agents from "./pages/Agent";
import AgentList from "./pages/AgentList";
import Lead from "./pages/Lead";
import LeadList from "./pages/LeadList";
import DarkModeToggle from "./components/DarkModeToggle";
import Login from "./pages/Login";

import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function AppShell() {
  const location = useLocation();
  const { session } = useAuth();

  // Hide chrome (sidebar/toggle) on login route
  const isLoginRoute = useMemo(
    () => location.pathname === "/login" || location.pathname === "/",
    [location]
  );

  // Sidebar state only relevant when authenticated
  const [open, setOpen] = useState(false); // desktop expanded/collapsed
  const [mobileOpen, setMobileOpen] = useState(false); // mobile open/close

  // Tailwind: choose between fixed class names (no template in class)
  const marginClass = open ? "lg:ml-64" : "lg:ml-20";

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white min-h-screen flex">
      {/* Sidebar only when authed and not on login */}
      {session?.idToken && !isLoginRoute && (
        <Sidebar
          open={open}
          setOpen={setOpen}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      )}

      {/* Main content area */}
      <div
        className={[
          "flex-1 transition-[margin] duration-300 ml-20",
          session?.idToken && !isLoginRoute ? marginClass : "lg:ml-0",
        ].join(" ")}
        // inline fallback for browsers without Tailwind (optional)
        style={{
          marginLeft:
            session?.idToken && !isLoginRoute ? (open ? "16rem" : "5rem") : 0,
        }}
      >
        {session?.idToken && !isLoginRoute && (
          <div className="flex justify-end p-4">
            <DarkModeToggle />
          </div>
        )}

        {/* While auth status is resolving, you can render a splash (optional) */}
        {/* {loading && <div className="p-6">Checking session…</div>} */}

        <Routes>
          {/* Public route(s) */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/listings"
            element={
              <ProtectedRoute>
                <Listings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/listinglist"
            element={
              <ProtectedRoute>
                <ListingList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agent"
            element={
              <ProtectedRoute>
                <Agents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agentlist"
            element={
              <ProtectedRoute>
                <AgentList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lead"
            element={
              <ProtectedRoute>
                <Lead />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leadlist"
            element={
              <ProtectedRoute>
                <LeadList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  // If you already wrap <AuthProvider> in main.jsx, keep only <AppShell /> here.
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}
