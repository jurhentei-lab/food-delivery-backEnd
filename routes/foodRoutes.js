const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");
const addDish = require("../controllers/addDish");

// GET /dish
router.get("/", foodController.getFoods);

// POST /dish
router.post("/", addDish);

// PUT /dish/:id
router.put("/:id", foodController.updateFood);

// DELETE /dish/:id
router.delete("/:id", foodController.deleteFood);

module.exports = router;
