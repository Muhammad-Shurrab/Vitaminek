const Order = require("../models/Order");
const Cart = require("../models/Cart");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createOrder = async (req, res) => {
  try {
    const {
      paymentMethod,
      deliveryAddress,
      orderItems,
      totalAmount,
      taxPrice,
    } = req.body;

    const order = await Order.create({
      user: req.user._id, // Assuming you have user authentication middleware
      orderItems,
      totalAmount,
      taxPrice,
      paymentMethod,
      deliveryAddress,
      isPaid: paymentMethod === "cash_on_delivery" ? false : false,
    });

    // Clear the user's cart after order creation
    await Cart.findOneAndUpdate(
      { user: req.user._id },
      { items: [], totalPrice: 0 }
    );

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.processStripePayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalAmount * 100), // Stripe expects amounts in cents
      currency: "usd",
      metadata: { orderId: order._id.toString() },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
