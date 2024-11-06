// import { model, Schema } from "mongoose";

// const cartSchema = new Schema(
//   {
//     // userId: {
//     //   type: Schema.Types.ObjectId,
//     //   ref: "User",
//     //   required: true,
//     // },
//     sessionId: { type: String },
//     products: [
//       {
//         productId: {
//           type: Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         date: { type: Date, default: Date.now },
//         amount: { type: Number, required: true },
//       },
//     ],
//   },
//   {
//     versionKey: false,
//   }
// );
// export const Cart = model("Cart", cartSchema);
// export default Cart;

//-------------------------
import { model, Schema } from "mongoose";

const cartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        amount: { type: Number, required: true },
      },
    ],
  },
  {
    versionKey: false,
  }
);

export const Cart = model("Cart", cartSchema);
export default Cart;
