const Product = require("../Models/Product");

const createProduct = async (req, res) => {
  const {
    traderId,
    title,
    description,
    price,
    brand,
    category,
    photos,
    flavour,
    size,
  } = req.body;
  try {
    const newProduct = new Product({
      traderId,
      title,
      description,
      price,
      brand,
      category,
      photos,
      flavour,
      size,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const { category, page = 1, limit = 9 } = req.query;
    const filters = category ? { category } : {};

    const products = await Product.find(filters)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductsById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createProduct, getProducts, getProductsById };
