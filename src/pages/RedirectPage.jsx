// src/pages/RedirectPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";

export default function RedirectPage() {
  const { inProgress, instance } = useMsal();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        if (inProgress === InteractionStatus.None) {
          // Handle the redirect response
          const response = await instance.handleRedirectPromise();
          
          if (response) {
            console.log("Authentication successful:", response);
            
            // Get the return path from state
            let returnTo = "/";
            if (response.state) {
              try {
                const state = JSON.parse(response.state);
                returnTo = state.returnTo || "/";
              } catch (e) {
                console.warn("Could not parse state:", e);
              }
            }
            
            // Navigate to the intended destination
            navigate(returnTo, { replace: true });
          } else {
            // No response means we're still processing or there was an error
            const urlParams = new URLSearchParams(window.location.search);
            const error = urlParams.get('error');
            const errorDescription = urlParams.get('error_description');
            
            if (error) {
              setError(`${error}: ${errorDescription}`);
            } else {
              // No error, no response - redirect to home
              navigate("/", { replace: true });
            }
          }
        }
      } catch (err) {
        console.error("Error handling redirect:", err);
        setError(err.message);
      }
    };

    // Small delay to ensure MSAL is ready
    const timer = setTimeout(handleRedirect, 100);
    return () => clearTimeout(timer);
  }, [inProgress, instance, navigate]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Authentication Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => navigate("/", { replace: true })}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Processing sign-in...</p>
      </div>
    </div>
  );
}