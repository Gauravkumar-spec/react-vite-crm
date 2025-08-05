// // components/RequireAuth.jsx
// import { useEffect, useMemo } from "react";
// import { useLocation } from "react-router-dom";
// import { useMsal, useIsAuthenticated } from "@azure/msal-react";
// import { InteractionStatus, InteractionRequiredAuthError } from "@azure/msal-browser";
// import { loginRequest } from "../authConfig";

// export default function RequireAuth({ children }) {
//   const { instance, accounts, inProgress } = useMsal();
//   const isAuthenticated = useIsAuthenticated();
//   const location = useLocation();

//   // Keep track of desired return path
//   const returnTo = useMemo(
//     () => location.pathname + location.search + location.hash,
//     [location]
//   );

//   // Ensure active account
//   useEffect(() => {
//     const active = instance.getActiveAccount();
//     if (!active && accounts.length > 0) {
//       instance.setActiveAccount(accounts[0]);
//     }
//   }, [accounts, instance]);

//   // Try silent SSO -> then interactive redirect
//   useEffect(() => {
//     if (inProgress !== InteractionStatus.None) return;

//     if (!isAuthenticated) {
//       instance
//         .ssoSilent({ ...loginRequest, redirectUri: window.location.origin + "/redirect" })
//         .catch((error) => {
//           if (error instanceof InteractionRequiredAuthError) {
//             instance.loginRedirect({
//               ...loginRequest,
//               redirectUri: window.location.origin + "/redirect",
//               state: JSON.stringify({ returnTo }),
//             });
//           } else {
//             console.error("Silent SSO error:", error);
//           }
//         });
//     }
//   }, [inProgress, isAuthenticated, instance, returnTo]);

//   if (inProgress !== InteractionStatus.None) {
//     return <div className="p-8">Checking your session…</div>;
//   }

//   return isAuthenticated ? children : null;
// }


// components/RequireAuth.jsx
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { InteractionStatus, InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";

export default function RequireAuth({ children }) {
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  const returnTo = useMemo(
    () => location.pathname + location.search + location.hash,
    [location]
  );

  // Set active account
  useEffect(() => {
    const active = instance.getActiveAccount();
    if (!active && accounts.length > 0) {
      instance.setActiveAccount(accounts[0]);
    }
  }, [accounts, instance]);

  // Handle authentication
  useEffect(() => {
    if (inProgress !== InteractionStatus.None) return;
    if (isAuthenticated) return;

    // Skip silent SSO and go directly to interactive login
    // This avoids iframe issues with B2C + Google
    console.log("Starting interactive login...");
    instance.loginRedirect({
      ...loginRequest,
      state: JSON.stringify({ returnTo }),
    }).catch((error) => {
      console.error("Login redirect error:", error);
    });
  }, [inProgress, isAuthenticated, instance, returnTo]);

  if (inProgress !== InteractionStatus.None) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Authenticating...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : null;
}
