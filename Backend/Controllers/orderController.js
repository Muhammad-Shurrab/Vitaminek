const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.createOrder = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const newOrder = new Order({
      userId,
      items: cart.items,
      bill: cart.bill,
    });

    await newOrder.save();
    await Cart.findByIdAndDelete(cart._id);

    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
