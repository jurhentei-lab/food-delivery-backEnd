// const express = require("express");
// const connectToDB = require("./db");
// const cors = require("cors"); // ← Cors-г импортлох

// const app = express();

// // 🔹 CORS-г хамгийн эхэнд middleware болгон нэмэх
// app.use(
//   cors({
//     origin: "http://localhost:3000", // frontend порт
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

// // JSON body унших
// app.use(express.json());

// // MongoDB холболт
// connectToDB();

// // Routes
// const productRoutes = require("./routes/productRoutes");
// const userRoutes = require("./routes/userRoutes");

// app.use("/products", productRoutes);
// app.use("/users", userRoutes);

// // Сервер эхлүүлэх
// app.listen(999, () => console.log("Server running on port 999"));
const express = require("express");
const connectToDB = require("./db");
const cors = require("cors");

const app = express();
const PORT = Number(process.env.PORT) || 999;

// CORS middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const foodRoutes = require("./routes/foodRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/users", userRoutes);
app.use("/category", categoryRouter);
app.use("/dish", foodRoutes);
app.use("/api/orders", orderRoutes);

const startServer = async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Server startup failed:", err);
    process.exit(1);
  }
};

startServer();
