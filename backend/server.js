require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const recipeRoutes = require("./routes/recipeRoutes");
const authRoutes = require("./routes/auth");

const app = express();

// Allowed frontend origins
const allowedOrigins = [
"http://localhost:3000",
"https://recipebook-frontend-x9ew.onrender.com"
];

// CORS

app.use(cors());
// app.use(
// cors({
// origin: function (origin, callback) {
// if (!origin) return callback(null, true);


//   if (allowedOrigins.includes(origin)) {
//     return callback(null, true);
//   }

//   return callback(new Error("Not allowed by CORS"));
// },
// credentials: true,


// })
// );

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/recipes", recipeRoutes);


app.get("/test", (req, res) => {
  res.send("Backend working");
});

// Health check route
app.get("/", (req, res) => {
res.send("RecipeBook Backend is running");
});

// MongoDB connection
const PORT = process.env.PORT || 5000;

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
console.log("✔ MongoDB connected");


app.listen(PORT, () => {
  console.log(`✔ Server running on port ${PORT}`);
});


})
.catch((err) => {
console.error("MongoDB connection error:", err);
});
