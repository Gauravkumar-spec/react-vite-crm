// components/RedirectHandler.jsx - Enhanced with debugging
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";

function RedirectHandler() {
  const { instance, inProgress, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const [debugInfo, setDebugInfo] = useState([]);
  const [error, setError] = useState(null);

  const addDebug = (message) => {
    console.log(message);
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    addDebug(`RedirectHandler mounted`);
    addDebug(`inProgress: ${inProgress}`);
    addDebug(`isAuthenticated: ${isAuthenticated}`);
    addDebug(`accounts length: ${accounts.length}`);
    addDebug(`current URL: ${window.location.href}`);
    
    // Check URL parameters for errors
    const urlParams = new URLSearchParams(window.location.search);
    const urlHash = window.location.hash;
    
    addDebug(`URL params: ${urlParams.toString()}`);
    addDebug(`URL hash: ${urlHash}`);
    
    const error = urlParams.get('error');
    const errorDescription = urlParams.get('error_description');
    const code = urlParams.get('code');
    
    if (error) {
      const errorMsg = `Authentication error: ${error} - ${errorDescription || 'No description'}`;
      addDebug(errorMsg);
      setError(errorMsg);
      return;
    }
    
    if (code) {
      addDebug(`Authorization code received: ${code.substring(0, 20)}...`);
    }

    const handleRedirect = async () => {
      try {
        if (inProgress === InteractionStatus.None) {
          addDebug("Interaction status is None, handling redirect...");
          
          // Try to handle redirect promise
          const response = await instance.handleRedirectPromise();
          
          if (response) {
            addDebug(`Redirect response received for user: ${response.account?.username}`);
            addDebug(`Account ID: ${response.account?.homeAccountId}`);
            
            // Set active account
            instance.setActiveAccount(response.account);
            
            // Small delay to ensure state updates
            setTimeout(() => {
              addDebug("Navigating to dashboard...");
              navigate("/", { replace: true });
            }, 500);
          } else {
            addDebug("No redirect response, checking authentication status...");
            
            // Check if already authenticated
            if (isAuthenticated && accounts.length > 0) {
              addDebug("Already authenticated, navigating to dashboard...");
              navigate("/", { replace: true });
            } else {
              // Wait a bit more for potential delayed response
              setTimeout(() => {
                if (!isAuthenticated) {
                  addDebug("Still not authenticated after wait, redirecting to login...");
                  instance.loginRedirect({
                    scopes: ["openid", "profile"],
                    prompt: "select_account"
                  });
                }
              }, 2000);
            }
          }
        } else {
          addDebug(`Still in progress: ${inProgress}, waiting...`);
        }
      } catch (err) {
        const errorMsg = `Error handling redirect: ${err.message}`;
        addDebug(errorMsg);
        setError(errorMsg);
        console.error("Redirect handling error:", err);
      }
    };

    // Small delay to ensure MSAL is ready
    const timer = setTimeout(handleRedirect, 100);
    
    return () => clearTimeout(timer);
  }, [inProgress, isAuthenticated, accounts, instance, navigate]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Authentication Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button 
            onClick={() => {
              setError(null);
              navigate("/", { replace: true });
            }}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Return to Home
          </button>
          
          {/* Debug info in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-700 mb-2">Processing authentication...</p>
        <p className="text-sm text-gray-500">Status: {inProgress}</p>
        
        {/* Debug info in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-3 bg-gray-100 rounded text-left text-xs max-h-40 overflow-y-auto">
            <h3 className="font-semibold mb-2">Debug Info:</h3>
            {debugInfo.map((info, index) => (
              <div key={index} className="text-gray-600 mb-1">{info}</div>
            ))}
          </div>
        )}
        
        {/* Manual navigation button for debugging */}
        {process.env.NODE_ENV === 'development' && (
          <button 
            onClick={() => navigate("/", { replace: true })}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            Force Navigate to Dashboard
          </button>
        )}
      </div>
    </div>
  );
}

export default RedirectHandler;