const Category = require("../models/category");
const Food = require("../models/food");

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
  const name = req.body?.name?.trim();
  if (!name) {
    return res.status(400).json({ message: "Category name шаардлагатай" });
  }

  try {
    const newCat = await Category.create({ name });
    res.json(newCat);
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(400).json({ message: "Category already exists" });
    }
    res.status(500).json({ error: err });
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    await Food.deleteMany({ category: req.params.id });
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
