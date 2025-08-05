// App.jsx - Updated with separate components
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { EventType } from "@azure/msal-browser";
import { MsalProvider, useMsal, useIsAuthenticated } from "@azure/msal-react";

// Your existing components
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

// New components
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectHandler from "./components/RedirectHandler";

// Custom Navigation Client
import { CustomNavigationClient } from "./utils/NavigationClient";

function App({ msalInstance }) {
  return (
    <ClientSideNavigation pca={msalInstance}>
      <MsalProvider instance={msalInstance}>
        <AppContent />
      </MsalProvider>
    </ClientSideNavigation>
  );
}

/**
 * Custom navigation client to integrate MSAL with React Router
 */
function ClientSideNavigation({ pca, children }) {
  const navigate = useNavigate();
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    try {
      const navigationClient = new CustomNavigationClient(navigate);
      pca.setNavigationClient(navigationClient);
      console.log("Navigation client set successfully");
    } catch (error) {
      console.error("Error setting navigation client:", error);
    }
    setFirstRender(false);
  }, [pca, navigate]);

  if (firstRender) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return children;
}

function AppContent() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Handle MSAL events
  useEffect(() => {
    const callbackId = instance.addEventCallback((event) => {
      console.log("MSAL Event:", event.eventType, event);
      
      if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
        console.log("Login successful, setting active account:", event.payload.account.username);
        instance.setActiveAccount(event.payload.account);
      }
      
      if (event.eventType === EventType.LOGIN_FAILURE) {
        console.error("Login failed:", event.payload);
      }
      
      if (event.eventType === EventType.LOGOUT_SUCCESS) {
        console.log("Logout successful");
        instance.setActiveAccount(null);
      }

      if (event.eventType === EventType.ACCOUNT_ADDED) {
        console.log("Account added:", event.payload);
      }
    });

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, [instance]);

  // Set active account if not set
  useEffect(() => {
    const accounts = instance.getAllAccounts();
    if (accounts.length > 0 && !instance.getActiveAccount()) {
      console.log("Setting active account from available accounts:", accounts[0].username);
      instance.setActiveAccount(accounts[0]);
    }
  }, [instance]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white min-h-screen flex">
      {isAuthenticated && (
        <Sidebar
          open={open}
          setOpen={setOpen}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      )}

      <div
        className={`
          flex-1 transition-all duration-300
          ${isAuthenticated ? (open ? 'ml-64' : 'ml-20') : 'ml-0'}
        `}
      >
        {isAuthenticated && (
          <div className="flex justify-end p-4">
            <DarkModeToggle />
          </div>
        )}

        <Routes>
          {/* Public route for redirect handling */}
          <Route path="/redirect" element={<RedirectHandler />} />
          
          {/* Protected routes */}
          <Route 
            path="/" 
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
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;