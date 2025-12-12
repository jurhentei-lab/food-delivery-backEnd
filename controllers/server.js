const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const categoryRouter = require("./routes/categoryRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// DB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/nomnom")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/categories", categoryRouter);

app.listen(999, () => {
  console.log("Server running on port 999");
});
