const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const connectToDB = require("./db");
const Category = require("./models/category");
const Food = require("./models/food");
const User = require("./models/User");
connectToDB.loadEnvFromFile?.();

const seedData = {
  categories: ["Appetizers", "Salads", "Lunch Favorites", "Desserts"],
  foods: {
    Appetizers: [
      {
        name: "Crispy Chicken Bites",
        price: 9.9,
        description: "Crispy chicken bites with spicy mayo dip.",
        image:
          "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Garlic Shrimp",
        price: 12.5,
        description: "Pan-seared shrimp with garlic butter and herbs.",
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Loaded Nachos",
        price: 8.75,
        description: "Nachos with beef, cheese, jalapeno and salsa.",
        image:
          "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=900&q=80",
      },
    ],
    Salads: [
      {
        name: "Chicken Caesar Salad",
        price: 10.2,
        description: "Romaine, parmesan, grilled chicken and Caesar dressing.",
        image:
          "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Avocado Garden Salad",
        price: 9.4,
        description: "Fresh greens, tomato, cucumber and avocado slices.",
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Beetroot Orange Salad",
        price: 8.9,
        description: "Roasted beetroot with orange, feta and nuts.",
        image:
          "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=900&q=80",
      },
    ],
    "Lunch Favorites": [
      {
        name: "Grilled Chicken Rice",
        price: 13.9,
        description: "Juicy grilled chicken served with butter rice.",
        image:
          "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Beef Burrito Bowl",
        price: 12.8,
        description: "Seasoned beef, rice, beans and pico de gallo.",
        image:
          "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Teriyaki Salmon Plate",
        price: 15.4,
        description: "Salmon glazed with teriyaki sauce and vegetables.",
        image:
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
      },
    ],
    Desserts: [
      {
        name: "Chocolate Lava Cake",
        price: 6.9,
        description: "Warm lava cake with rich dark chocolate center.",
        image:
          "https://images.unsplash.com/photo-1617305855058-336d24456869?auto=format&fit=crop&w=900&q=80",
      },
      {
        name: "Berry Cheesecake",
        price: 7.2,
        description: "Creamy cheesecake topped with mixed berries.",
        image:
          "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
};

const ensureAdminUser = async () => {
  const email = String(process.env.ADMIN_EMAIL || "admin@nomnom.mn")
    .trim()
    .toLowerCase();
  const plainPassword = String(process.env.ADMIN_PASSWORD || "admin123");

  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`Admin user exists: ${email}`);
    return;
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  await User.create({
    email,
    password: hashedPassword,
    role: "admin",
  });

  console.log(`Admin user created: ${email} / ${plainPassword}`);
};

const runSeed = async () => {
  await connectToDB();

  if (String(process.env.RESET_DB || "").toLowerCase() === "true") {
    await Promise.all([Food.deleteMany({}), Category.deleteMany({})]);
    console.log("Food and categories reset complete");
  }

  const categoryMap = {};

  for (const catName of seedData.categories) {
    let category = await Category.findOne({ name: catName });
    if (!category) {
      category = await Category.create({ name: catName });
      console.log(`Category created: ${catName}`);
    }
    categoryMap[catName] = category;
  }

  for (const [catName, foods] of Object.entries(seedData.foods)) {
    const category = categoryMap[catName];
    if (!category) continue;

    for (const food of foods) {
      const existingFood = await Food.findOne({
        name: food.name,
        category: category._id,
      });

      if (!existingFood) {
        await Food.create({ ...food, category: category._id });
        console.log(`Food created: ${food.name} (${catName})`);
      }
    }
  }

  await ensureAdminUser();
  console.log("Seed complete");
};

runSeed()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
