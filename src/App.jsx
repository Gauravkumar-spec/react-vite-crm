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
  const { session, loading, isAuthenticated, isRefreshing } = useAuth();

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

  // Show loading state during initial auth check
  if (loading) {
    return (
      <div className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white min-h-screen flex">
      {/* Sidebar only when authenticated and not on login */}
      {isAuthenticated && !isLoginRoute && (
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
          "flex-1 transition-[margin] duration-300",
          isAuthenticated && !isLoginRoute ? marginClass : "ml-0",
        ].join(" ")}
        // inline fallback for browsers without Tailwind (optional)
        style={{
          marginLeft:
            isAuthenticated && !isLoginRoute ? (open ? "16rem" : "5rem") : 0,
        }}
      >
        {/* Header with dark mode toggle and refresh indicator */}
        {isAuthenticated && !isLoginRoute && (
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            {/* Token refresh indicator */}
            {isRefreshing && (
              <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-blue-500 mr-2"></div>
                Refreshing session...
              </div>
            )}
            
            {/* Spacer to push dark mode toggle to the right */}
            <div className="flex-1"></div>
            
            {/* Dark mode toggle */}
            <DarkModeToggle />
          </div>
        )}

        {/* Routes */}
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
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}