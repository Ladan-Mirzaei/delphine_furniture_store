import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);
export const Category = model("Category", categorySchema);
export default Category;
