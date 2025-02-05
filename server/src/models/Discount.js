import { model, Schema } from "mongoose";

const discountSchema = new Schema(
  {
    name: { type: String, required: true },
    percentage: { type: Number, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
  },
  {
    versionKey: false,
  }
);
export const Discount = model("Discount", discountSchema);
export default Discount;
