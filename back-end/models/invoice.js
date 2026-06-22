import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer"
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },

        quantity: Number,

        price: Number
      }
    ],

    totalAmount: Number
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Invoice",
  invoiceSchema
);