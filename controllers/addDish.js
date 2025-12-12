// backend/addDish.js
const express = require("express");
const router = express.Router();
const Dish = require("../models/Dish"); // MongoDB Dish model

 
router.post("/", async (req, res) => {
  const { name, description, price, image, categoryId } = req.body;

  // Шаардлагатай талбаруудыг шалгах
  if (!name || !price || !categoryId) {
    return res.status(400).json({ message: "Name, price болон categoryId шаардлагатай!" });
  }

  try {
    const newDish = new Dish({
      name,
      description: description || "",
      price: Number(price),
      image: image || "",
      category: categoryId,
    });

    const savedDish = await newDish.save();
    return res.status(201).json(savedDish);
  } catch (err) {
    console.error("Add dish error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
