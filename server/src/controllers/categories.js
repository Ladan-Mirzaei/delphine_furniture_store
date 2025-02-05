import Category from "../models/Category.js";

// Alle Kategorien abrufen
export const getAllCategories = async (req, res) => {
  try {
    await db.connect();
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
