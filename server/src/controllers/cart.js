import Cart from "../models/Cart.js";
import { db } from "../util/db-connect.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const cart = await Cart.findOne({ userId }).populate(
      "products.productId",
      "name price image"
    );
    if (!cart) return res.json({ products: [] });

    res.json(cart);
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

export const cartCount = async (req, res) => {
  try {
    const userId = req.userId;
    await db.connect();

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.json({ cartCount: 0 });
    }

    const cartCount = cart.products.reduce((acc, cur) => {
      return acc + cur.amount;
    }, 0);

    res.json({ cartCount });
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};
// /**
//  * @api POST /cart/add
//  *{
//  *    "_id": 67289d112377a1ab51abcd40,
//  *    "sessionId":"123"
//  *    "amount":2
//  * }
//  */
export const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    await db.connect();
    const { _id, amount } = req.body;

    if (!_id || !amount || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const product = await Product.findById(_id);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }
    if (product.available < amount) {
      console.log(product.available, amount);

      return res.status(400).json({ message: "Not enough product available" });
    }
    product.available -= amount;
    await product.save();

    let cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      cart = new Cart({
        userId,
        products: [
          {
            productId: _id,
            date: Date.now(),
            amount: amount,
          },
        ],
      });
    } else {
      const existingProductIndex = cart.products.findIndex(
        (product) => product.productId.toString() === _id
      );
      if (existingProductIndex > -1) {
        cart.products[existingProductIndex].amount += amount;
      } else {
        cart.products.push({
          productId: _id,
          date: Date.now(),
          amount,
        });
      }
    }
    await cart.save();

    const cartCount = cart.products.reduce((acc, cur) => {
      return acc + cur.amount;
    }, 0);

    res.json({ cartCount });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server error" });
  }
};

export const editCart = async (req, res) => {
  try {
    const userId = req.userId;

    console.log(userId);
    await db.connect();
    const { _id, amount } = req.body;
    console.log("productIndex3", _id);

    if (!_id || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const product = await Product.findById(_id);
    console.log(product);

    if (product.available < amount) {
      return res.status(400).json({ message: "Not enough product available" });
    }
    // product.available -= amount;

    let cart = await Cart.findOne({ userId: userId });

    console.log(cart);
    const existingProductIndex = cart.products.findIndex(
      (product) => product.productId.toString() === _id
    );

    console.log(
      product.available,
      amount,
      cart.products[existingProductIndex].amount
    );
    product.available -= amount - cart.products[existingProductIndex].amount;
    if (existingProductIndex > -1) {
      cart.products[existingProductIndex].amount = amount;
    }

    await product.save();
    await cart.save();

    const cartCount = cart.products.reduce((acc, cur) => {
      return acc + cur.amount;
    }, 0);
    console.log({ cartCount });
    res.json({ cartCount });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal server error" });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id } = req.body;
    console.log("productIndex", _id);

    if (!userId || !_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    await db.connect();
    const cart = await Cart.findOne({ userId });

    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === _id
    );
    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in cart" });
    }
    // if (cart.products[productIndex].amount > 1) {
    //   cart.products[productIndex].amount -= 1;
    //   console.log("Updated amount:", productIndex.amount);
    // } else {
    cart.products.splice(productIndex, 1);
    // }
    await cart.save();
    const product = await Product.findById(_id);
    if (product) {
      product.available += cart.products[productIndex].amount;
      await product.save();
    }
    console.log("cart", cart);
    const cartCount = cart.products.reduce((acc, cur) => acc + cur.amount, 0);
    console.log("cartCount", cartCount);

    res.json({ cartCount });
  } catch (error) {
    console.error(error);
    res.json({ message: "Internal server error" });
  }
};
