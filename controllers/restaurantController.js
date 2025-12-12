const Restaurant = require("../models/Restaurant");

exports.addRestaurant = async (req, res) => {
  const rest = await Restaurant.create(req.body);
  res.json(rest);
};

exports.getRestaurants = async (req, res) => {
  const data = await Restaurant.find();
  res.json(data);
};

exports.updateRestaurant = async (req, res) => {
  const updated = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteRestaurant = async (req, res) => {
  await Restaurant.findByIdAndDelete(req.params.id);
  res.json({ message: "Restaurant deleted" });
};
