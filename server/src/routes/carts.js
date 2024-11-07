import { Router } from "express";
import {
  getCart,
  addToCart,
  editCart,
  cartCount,
} from "../controllers/cart.js";

const router = Router();

router.get("/", getCart); // Fetches the current user's cart
router.post("/add", addToCart); // Adds an item to the user's cart
router.post("/edit", editCart);
router.get("/count", cartCount);

export default router;
