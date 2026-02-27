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

connectToDB.loadEnvFromFile?.();

const app = express();
const PORT = Number(process.env.PORT) || 999;
const allowedOriginPatterns = (process.env.CLIENT_URLS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const defaultLocalOrigins = [
  "http://localhost:*",
  "http://127.0.0.1:*",
  "https://*.vercel.app",
];

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const wildcardToRegex = (pattern) =>
  new RegExp(`^${escapeRegex(pattern).replace(/\\\*/g, ".*")}$`);

const compiledOriginRules = [...defaultLocalOrigins, ...allowedOriginPatterns].map((pattern) => ({
  pattern,
  regex: pattern.includes("*") ? wildcardToRegex(pattern) : null,
}));

const isOriginAllowed = (origin) =>
  compiledOriginRules.some(({ pattern, regex }) => (regex ? regex.test(origin) : pattern === origin));

const corsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server / curl requests without Origin header.
    if (!origin) return callback(null, true);

    if (isOriginAllowed(origin)) {
      return callback(null, true);
    }

    console.error(`CORS blocked for origin: ${origin}`);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

// CORS middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json({ limit: process.env.REQUEST_BODY_LIMIT || "10mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: process.env.REQUEST_BODY_LIMIT || "10mb",
  })
);

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

app.use((err, _req, res, next) => {
  if (err?.message?.startsWith("CORS blocked for origin:")) {
    return res.status(403).json({ message: err.message });
  }

  return next(err);
});
