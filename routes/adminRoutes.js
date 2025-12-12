require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/admin", adminRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
