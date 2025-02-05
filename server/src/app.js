import cors from "cors";
import express, { json } from "express";
import productRoute from "./routes/products.js";
import categoryRoutes from "./routes/categories.js";
import cartRoutes from "./routes/carts.js";
import { auth } from "express-oauth2-jwt-bearer";
import { config } from "./config.js";
import { addUserInfo, addUserId } from "./middlewares/index.js";
import Product from "./models/Product.js";
import { db } from "./util/db-connect.js";

const PORT = process.env.PORT || 3000;
const app = express();
const authConfig = { ...config.authOptions, authRequired: false };
console.debug("authConfig", authConfig);
const jwtCheck = auth(authConfig);

app.use(cors());
app.use(json());
app.use(jwtCheck);
app.use(addUserId);

app.get("/", async (req, res) => {
  res.json({ successfull: true });
});

app.use("/products", productRoute);
app.use("/", categoryRoutes);
app.use("/cart", cartRoutes);

app.listen(PORT, () => {
  console.log("api running on port " + PORT);
});
