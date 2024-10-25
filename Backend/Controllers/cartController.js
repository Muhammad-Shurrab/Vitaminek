const Cart = require("../models/Cart");
const Product = require("../Models/Product");

exports.addToCart = async (req, res) => {
  const userId = req.user.id; // Assuming authentication
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId === productId
      );
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        cart.items[itemIndex] = productItem;
      } else {
        cart.items.push({
          productId: productId,
          name: product.title,
          quantity: quantity,
          price: product.price,
        });
      }
      cart.bill += product.price * quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      const newCart = await Cart.create({
        userId,
        items: [
          { productId, name: product.title, quantity, price: product.price },
        ],
        bill: product.price * quantity,
      });
      res.status(201).json(newCart);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex > -1) {
      let productItem = cart.items[itemIndex];
      cart.bill -= productItem.price * productItem.quantity;
      cart.items.splice(itemIndex, 1);
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.viewCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
