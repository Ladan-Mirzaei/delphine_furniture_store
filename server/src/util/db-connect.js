import mongoose from "mongoose";
import { config } from "../config.js";

async function connect() {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  await mongoose.connect(config.MONGO_DB_URL);
}

export const db = { connect };

export default db;
