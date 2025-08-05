// components/ProtectedRoute.jsx - Enhanced with better logic
import { useEffect, useState } from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";

function ProtectedRoute({ children }) {
  const { instance, inProgress, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [debugInfo, setDebugInfo] = useState([]);

  const addDebug = (message) => {
    console.log(`ProtectedRoute: ${message}`);
    if (process.env.NODE_ENV === 'development') {
      setDebugInfo(prev => [...prev.slice(-5), `${new Date().toLocaleTimeString()}: ${message}`]);
    }
  };

  useEffect(() => {
    addDebug(`Status check - inProgress: ${inProgress}, isAuthenticated: ${isAuthenticated}, accounts: ${accounts.length}`);
    
    // Set active account if we have accounts but no active account
    if (accounts.length > 0 && !instance.getActiveAccount()) {
      addDebug(`Setting active account: ${accounts[0].username}`);
      instance.setActiveAccount(accounts[0]);
    }
    
    // Only trigger login if interaction is complete and user is not authenticated
    if (inProgress === InteractionStatus.None && !isAuthenticated && accounts.length === 0) {
      addDebug("User not authenticated, starting login flow...");
      
      instance.loginRedirect({
        scopes: ["openid", "profile"],
        prompt: "select_account"
      }).catch(error => {
        addDebug(`Login redirect error: ${error.message}`);
        console.error("Login redirect failed:", error);
      });
    }
  }, [inProgress, isAuthenticated, accounts, instance]);

  // Show loading while MSAL is processing
  if (inProgress !== InteractionStatus.None) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700 mb-2">Checking authentication...</p>
          <p className="text-sm text-gray-500">Status: {inProgress}</p>
          
          {/* Debug info in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-3 bg-gray-100 rounded text-left text-xs">
              <h3 className="font-semibold mb-2">Debug Info:</h3>
              {debugInfo.map((info, index) => (
                <div key={index} className="text-gray-600">{info}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show loading while waiting for authentication result
  if (!isAuthenticated && accounts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  // If authenticated, render the protected content
  if (isAuthenticated) {
    return children;
  }

  // Fallback loading state
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-700">Loading...</p>
      </div>
    </div>
  );
}

export default ProtectedRoute;