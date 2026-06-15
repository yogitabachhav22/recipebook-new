require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const recipeRoutes = require("./routes/recipeRoutes");
const authRoutes = require("./routes/auth"); 

// Create express app  
const app = express();



// Middleware
// app.use(cors());
// app.use(express.json());

// app.use(cors({ origin:  "https://recipebook-frontend-x9ew.onrender.com", credentials: true })); 
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://recipebook-frontend-x9ew.onrender.com"
  ],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/recipes", recipeRoutes);
app.use("/auth", authRoutes);

// Connect to MongoDB
mongoose
  // .connect(process.env.MONGO_URI)
  // .then(() => {
  //   console.log("✔ MongoDB connected");
  //   app.listen(5000, () => console.log("✔ Server running on port 5000"));
  // })
  // .catch((err) => console.log(err));
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✔ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`✔ Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));







