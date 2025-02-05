import "dotenv/config";

export const config = {
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  authOptions: {
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  },
};
