/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

// import { LogLevel } from '@azure/msal-browser';

/**
 * Enter here the user flows and custom policies for your B2C application
 * To learn more about user flows, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */
export const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1_susi_v2",
    },
    authorities: {
        signUpSignIn: {
            authority: `https://login.microsoftonline.com/${process.env.REACT_APP_MSAL_AUTHORITY || ""}`,
        },
    },
    authorityDomain: "https://login.microsoftonline.com",
};

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
    auth: {
        // This is the ONLY mandatory field that you need to supply.
        clientId: process.env.REACT_APP_MSAL_CLIENT_ID || "",
        // Choose SUSI as your default authority.
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
        // You must register this URI on Azure Portal/App Registration.
        // Defaults to window.location.origin
        redirectUri: process.env.REACT_APP_MSAL_REDIRECT_URI || "",
        postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
        // If "true", will navigate back to the original request location before processing the auth code response.
        navigateToLoginRequestUrl: true,
    },
    cache: {
        cacheLocation: "sessionStorage", // Configures cache location.
        storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            // Logs for debugging, uncomment if needed for development
            // loggerCallback: (level, message, containsPii) => {
            //   if (containsPii) {
            //     return;
            //   }
            // switch (level) {
            //   case LogLevel.Error:
            //     console.error(message);
            //     return;
            //   case LogLevel.Info:
            //     console.info(message);
            //     return;
            //   case LogLevel.Verbose:
            //     console.debug(message);
            //     return;
            //   case LogLevel.Warning:
            //     console.warn(message);
            //     break;
            //   default:
            // }
            // },
        },
    },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: [process.env.REACT_APP_MSAL_SCOPES || ""],
};
