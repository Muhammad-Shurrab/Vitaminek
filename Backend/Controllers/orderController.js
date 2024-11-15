const Order = require("../Models/Order");

// Create Order
exports.createOrder = async (req, res) => {
  try {
    // Log the incoming request body
    const userId = req.user.id;
    console.log("Gojo", userId);

    const { products, totalAmount, paypalPaymentId, paypalOrderId } = req.body;

    // Check if any required fields are missing
    if (!products || !totalAmount || !paypalPaymentId || !paypalOrderId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const order = new Order({
      user: userId || "Guest",
      products: products || [],
      totalAmount: totalAmount || 0,
      paypalPaymentId,
      paypalOrderId,
    });

    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.error("Error creating order:", error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
};
// Fetch user orders
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).populate(
      "products.product"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
