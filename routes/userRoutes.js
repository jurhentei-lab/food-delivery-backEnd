const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// ---------------- AUTH ROUTES ----------------
router.post("/signup", userController.createUser); // POST /users/signup
router.post("/login", userController.loginUser); // POST /users/login

// ---------------- USER CRUD ROUTES ----------------
router.get("/", userController.getAllUsers); // GET /users
router.get("/:id", userController.getUserById); // GET /users/:id
router.put("/:id", userController.updateUser); // PUT /users/:id
router.delete("/:id", userController.deleteUser); // DELETE /users/:id

module.exports = router;
