// // authConfig.js
// const tenant = "omniaautomation";
// const policy = "B2C_1_omnia-auth"; // B2C policy names are case-sensitive; your casing looks fine.
// const domain = `${tenant}.onmicrosoft.com`;
// const host = `${tenant}.b2clogin.com`;

// export const msalConfig = {
//   auth: {
//     clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
//     authority: `https://${host}/${domain}/${policy}`, // Good for B2C user flows
//     knownAuthorities: [host], // Must be the bare domain, no protocol
//     redirectUri: "http://localhost:3000/redirect", // MUST exist as a route and in Azure app registration
//     postLogoutRedirectUri: "http://localhost:3000/",
//     navigateToLoginRequestUrl: false,
//   },
//   cache: {
//     cacheLocation: "sessionStorage",
//     storeAuthStateInCookie: true, // helps with older browsers/ITP
//   },
// };

// export const loginRequest = {
//   scopes: ["openid", "profile", "offline_access"], // Add API scopes here later if needed
// };


// authConfig.js
export const msalConfig = {
  auth: {
    clientId: "e385a3ac-13ef-4b63-bd3d-889c0cb07708",
    authority: "https://omniaautomation.b2clogin.com/omniaautomation.onmicrosoft.com/B2C_1_omnia-auth",
    knownAuthorities: ["omniaautomation.b2clogin.com"],
    redirectUri: "http://localhost:3000/redirect",
    postLogoutRedirectUri: "http://localhost:3000/",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false, // Changed to false for localhost
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (!containsPii) console.log(message);
      },
      logLevel: 3,
    },
    // Add these iframe configurations
    iframeHashTimeout: 10000,
    loadFrameTimeout: 10000,
    // Disable silent requests if they're causing issues
    allowNativeBroker: false,
  },
};

export const loginRequest = {
  scopes: ["openid", "profile"],
  // Remove offline_access if not needed, it can cause issues with B2C
  prompt: "select_account", // This helps with Google sign-in
};

