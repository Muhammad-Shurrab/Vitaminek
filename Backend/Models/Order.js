const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    paymentResult: {
      id: { type: String },
      status: { type: String },
      updated_time: { type: String },
      email_address: { type: String },
    },
    paymentMethod: {
      type: String,
      enum: ["credit_card", "paypal", "cash_on_delivery"],
      required: false,
    },
    deliveryAddress: {
      street: { type: String, required: false },
      city: { type: String, required: false },
      zip: { type: String, required: false },
      country: { type: String, required: false },
    },
    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },

    isDelivered: {
      type: Boolean,
    },

    paidAt: {
      type: Date,
    },

    deliverAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
module.exports = Order;
