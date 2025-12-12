const Product = require("../models/Product");

// Бүх бүтээгдэхүүнийг авах
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // MongoDB-оос бүх өгөгдөл авах
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Бүтээгдэхүүн шинээр үүсгэх
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body); // body-гийн өгөгдлөөр шинэ объект үүсгэнэ
    const savedProduct = await product.save(); // DB-д хадгална
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Нэг бүтээгдэхүүнийг ID-аар авах
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Шинэчлэх
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // шинэчилсэн өгөгдлийг буцаана
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Устгах
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
