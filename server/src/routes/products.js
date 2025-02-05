import { Router } from "express";
import {
  productDetails,
  bestSellingProducts,
  filterProducts,
  getAvailableColors,
  getAvailableMaterials,
} from "../controllers/products.js";

const router = Router();

router.get("/bestSelling", bestSellingProducts);
router.get("/", filterProducts);
router.get("/colors", getAvailableColors);
router.get("/materials", getAvailableMaterials);
router.get("/:productId", productDetails);

export default router;
