import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Discount from "../models/Discount.js";
import Cart from "../models/Cart.js";
import { products } from "../data/products.js";
import { categories } from "../data/categories.js";
// import { cart } from "../data/carts.js";

import db from "./db-connect.js";

export async function initDb() {
  await db.connect();

  // ------category-----------------------
  await Category.deleteMany({});
  await Category.insertMany(categories);

  await Cart.deleteMany({});
  // await Cart.insertMany(cart);

  // ------Product-----------------------
  await Product.deleteMany({});
  await Product.insertMany(products);

  process.exit(0);
}

await initDb();
