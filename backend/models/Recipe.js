

const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    cuisine: String,
    tags: [String],
    rating: Number,
    ingredients: [String],
    instructions: [String],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
