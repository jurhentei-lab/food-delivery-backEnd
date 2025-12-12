const Category = require("../models/category");

module.exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
    console.log("categories", categories);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports.createCategory = async (req, res) => {
  console.log(req.body)
  try {
    const newCat = await Category.create({ name: req.body.name });
    res.json(newCat);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
