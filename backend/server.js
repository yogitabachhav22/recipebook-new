// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// // Import routes
// const recipeRoutes = require("./routes/recipeRoutes");
// const authRoutes = require("./routes/auth"); 

// // Create express app  
// const app = express();



// // Middleware
// // app.use(cors());
// // app.use(express.json());

// // app.use(cors({ origin:  "https://recipebook-frontend-x9ew.onrender.com", credentials: true })); 
// // app.use(cors({
// //   origin: [
// //     "http://localhost:3000",
// //     "https://recipebook-frontend-x9ew.onrender.com"
// //   ],
// //   credentials: true
// // }));

// // app.use(cors({
// //   origin: process.env.CLIENT_URL,
// //   credentials: true
// // }));
// // app.use(express.json());

// const allowedOrigins = [
//   "http://localhost:3000",
//   process.env.CLIENT_URL
// ].filter(Boolean);

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.includes(origin)) {
//       return callback(null, true);
//     }

//     return callback(new Error("Not allowed by CORS"));
//   },
//   credentials: true
// }));

// // Connect to MongoDB
// mongoose
//   // .connect(process.env.MONGO_URI)
//   // .then(() => {
//   //   console.log("✔ MongoDB connected");
//   //   app.listen(5000, () => console.log("✔ Server running on port 5000"));
//   // })
//   // .catch((err) => console.log(err));
// const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✔ MongoDB connected");

//     app.listen(PORT, () => {
//       console.log(`✔ Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => console.log(err));


require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const recipeRoutes = require("./routes/recipeRoutes");
const authRoutes = require("./routes/auth");

const app = express();

console.log("CLIENT_URL =", process.env.CLIENT_URL);
console.log("MONGO_URI exists =", !!process.env.MONGO_URI);

// CORS
const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS blocked"));
  },
  credentials: true
}));

// IMPORTANT middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/recipes", recipeRoutes);

// MongoDB
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✔ MongoDB connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✔ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB error:", err);
  });






