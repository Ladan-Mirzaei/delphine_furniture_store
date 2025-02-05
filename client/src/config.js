export const config = {
  auth0: {
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  },
};
