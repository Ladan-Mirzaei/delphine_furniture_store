import Product from "../models/Product.js";
import { db } from "../util/db-connect.js";
import Category from "../models/Category.js";
import Cart from "../models/Cart.js";

// Best Selling Product
/**
 * @api GET /products/bestSelling
 *
 */
// export const bestSellingProducts = async (req, res) => {
//   try {
//     await db.connect();
//     const products = await Product.find()
//       .select("name price categoryId image")
//       .populate("categoryId", "name")
//       .limit(4);
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
/**
 * @api GET products/productId
 *
 */

export const bestSellingProducts = async (req, res) => {
  try {
    // 0. connect to db
    await db.connect();

    // 1. get all carts
    const carts = await Cart.find();

    // 2.  declare productCount
    const productCounts = {};

    // 3.  gets alls the products in the carts for each cart
    carts.forEach((cart) => {
      cart.products.forEach((item) => {
        const productId = item.productId.toString();
        if (productCounts[productId]) {
          productCounts[productId] += item.amount; // wenn produkt bereits existiert add amount
        } else {
          productCounts[productId] = item.amount; // sonst set amount
        }
      });
    });
    // console.log(Object.keys(productCounts).length);
    if (Object.keys(productCounts).length <= 3) {
      const products = await Product.find()
        .select("name price categoryId image")
        .populate("categoryId", "name")
        .limit(4);
      console.log("test", products);
      res.json(products);
    } else {
      // 4. sort products based on sales as arrays
      const sortedProducts = Object.entries(productCounts)
        .sort((a, b) => b[1] - a[1]) // array besteht aus productId und amount, compare amount hier
        .slice(0, 4); // wollen nur ersten 4

      // 5. call product drtails for top 4 products
      const bestSellingProductIds = sortedProducts.map(([productId]) =>
        Product.findById(productId)
          .select("name price categoryId image")
          .populate("categoryId", "name")
      );

      const bestSellingProducts = await Promise.all(bestSellingProductIds);

      res.json(bestSellingProducts);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// product details

export const productDetails = async (req, res) => {
  const { productId } = req.params;
  try {
    await db.connect();
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//FILTER CATEGORIES
export const filterProducts = async (req, res) => {
  const { category, minPrice, maxPrice, filter, color, material } = req.query; // Hole den Kategorie-Filter

  try {
    await db.connect();
    // Finde die categoryId durch den Namen der Kategorie
    const categoryDoc = category
      ? await Category.findOne({ name: category })
      : null;

    // Baue die Filterkriterien
    const filterCriteria = {};

    if (categoryDoc) {
      filterCriteria.categoryId = categoryDoc._id; // Filter nach categoryId
    }

    if (minPrice) {
      filterCriteria.price = {
        ...filterCriteria.price,
        $gte: Number(minPrice),
      };
    }
    if (maxPrice) {
      filterCriteria.price = {
        ...filterCriteria.price,
        $lte: Number(maxPrice),
      };
    }

    if (color) {
      filterCriteria.color = color;
    }

    if (material) {
      filterCriteria.material = material;
    }
    // Finde Produkte anhand der Filterkriterien
    const products = await Product.find(filterCriteria)
      .select("name price categoryId image")
      .populate("categoryId", "name");

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
};

// get all colors

export const getAvailableColors = async (req, res) => {
  try {
    const colors = await Product.distinct("color");
    res.json(colors);
  } catch (error) {
    console.error("Error fetching colors:", error);
    res.status(500).json({ error: error.message });
  }
};

// get all materials
export const getAvailableMaterials = async (req, res) => {
  try {
    const materials = await Product.distinct("material");
    res.json(materials);
  } catch (error) {
    console.error("Error fetching materials:", error);
    res.status(500).json({ error: error.message });
  }
};
