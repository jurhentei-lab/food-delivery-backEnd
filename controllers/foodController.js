const Food = require("../models/food")

exports.addFood = async (req, res) => {
  const food = await Food.create(req.body);
  res.json(food);
};

exports.getFoods = async (req, res) => {
  const foods = await Food.find({ restaurantId: req.query.restaurantId });
  res.json(foods);
};

exports.updateFood = async (req, res) => {
  const updated = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteFood = async (req, res) => {
  await Food.findByIdAndDelete(req.params.id);
  res.json({ message: "Food deleted" });
};
