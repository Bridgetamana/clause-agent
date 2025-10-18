export const auth0Config = {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    redirectUri: import.meta.env.VITE_AUTH0_REDIRECT_URI || "http://localhost:5173",
    useRefreshTokens: true,
    useFormData: true,
    cacheLocation: "localstorage",
    authorizationParams: {
        redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI || "http://localhost:5173",
        scope: "openid profile email",
    },
};
