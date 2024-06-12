// import mongoose from "mongoose";
// const { Schema, model, models } = mongoose;

// const orderSchema = new  mongoose.Schema(
//     {
//         products: [
//             {
//                 type:mongoose.ObjectId,
//                 ref: "products"
//             }
//         ],
//         payment: {},
//         buyer : {
//             type: mongoose.ObjectId,
//             ref:"users"
//         },
//         status: {
//             type: String,
//             default: "Not process",
//             enum: ["Not process", "Processing", "Shipped", "Delivered","Cancel"],

//         },
//     },
//     { timestamps: true}
// );
// const Order = models || model("Order", orderSchema)
// export default Order;

import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const orderSchema = new Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"],
    },
  },
  { timestamps: true }
);

// Check if the model already exists before defining it
const Order = models.Order || model("Order", orderSchema);

export default Order;