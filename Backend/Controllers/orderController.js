// controllers/orderController.js
const Order = require("../Models/Order");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user?.id; // Extract the `id` from `user` object
    const { items, bill } = req.body;

    console.log("Gojo", userId, items, bill);

    if (!userId || !items || items.length === 0 || !bill) {
      return res.status(400).json({ error: "Incomplete order data" });
    }

    res
      .status(201)
      .json({ message: "Order created successfully", order: savedOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Get orders for a specific user
exports.getUserOrders = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const orders = await Order.find({ userId }).sort({ date_added: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error retrieving user orders:", error);
    res.status(500).json({ error: "Failed to retrieve orders" });
  }
};
