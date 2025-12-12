const express = require("express");

const { getCategories, createCategory, deleteCategory } = require("../controllers/categoryController");

const categoryRouter = express.Router();


categoryRouter.get("/", getCategories);
categoryRouter.post("/", createCategory);
categoryRouter.delete("/:id", deleteCategory);

module.exports = categoryRouter;
