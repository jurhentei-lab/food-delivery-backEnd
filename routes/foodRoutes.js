const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");

// GET /dish
router.get("/", foodController.getFoods);

// POST /dish
router.post("/", foodController.addFood);

// PUT /dish/:id
router.put("/:id", foodController.updateFood);

// DELETE /dish/:id
router.delete("/:id", foodController.deleteFood);

module.exports = router;
