import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    material: { type: String, required: true },
    color: { type: String, required: true },
    available: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
export const Product = model("Product", productSchema);
export default Product;
