// main.jsx - Updated to work with improved App structure
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

// Create MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

// Initialize MSAL
msalInstance.initialize().then(() => {
  // Handle the redirect promise
  return msalInstance.handleRedirectPromise();
}).then((response) => {
  // This will only run if a redirect was involved (e.g., after login)
  if (response !== null) {
    console.log("Authentication successful:", response);
    // Set the active account
    msalInstance.setActiveAccount(response.account);
  }
  
  // Render the app
  createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <App msalInstance={msalInstance} />
    </BrowserRouter>
  );
}).catch((error) => {
  console.error("MSAL initialization or redirect handling failed:", error);
  
  // Still render the app even if there's an error
  createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <App msalInstance={msalInstance} />
    </BrowserRouter>
  );
});