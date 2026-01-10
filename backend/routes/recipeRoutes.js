const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe")
const auth = require("../middleware/auth");

// PUBLIC – get all recipes
router.get("/", async (req, res) => {
  const recipes = await Recipe.find().populate("user", "name");
  res.json(recipes);
});

// PUBLIC – get one recipe
router.get("/:id", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.json(recipe);
});

// CREATE – logged in user only
// router.post("/", auth, async (req, res) => {
//   try {
//     const recipe = new Recipe({
//       ...req.body,
//       user: req.user.id
//     });

//     await recipe.save();
//     res.status(201).json(recipe);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });
router.post("/", auth, async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      user: req.user   // ✅ FIX
    });

    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


// UPDATE – owner only
// router.put("/:id", auth, async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.id);

//     console.log("recipe.user:", recipe.user.toString());
// console.log("req.user:", req.user);
// console.log("req.user.id:", req.user.id);

   

//     if (!recipe)
//       return res.status(404).json({ msg: "Recipe not found" });

//     // FIXED: compare recipe.user to req.user.id
//     if (recipe.user.toString() !== req.user.id)
//       return res.status(401).json({ msg: "Not authorized" });

//     const { _id, __v, user, ...safeData } = req.body;

//     const updated = await Recipe.findByIdAndUpdate(
//       req.params.id,
//       safeData,
//       { new: true, runValidators: true }
      
//     );

//     res.json(updated);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: err.message });
//   }

 

// });
router.put("/:id", auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe)
      return res.status(404).json({ msg: "Recipe not found" });

    // ✅ FIXED comparison
    if (recipe.user.toString() !== req.user)
      return res.status(401).json({ msg: "Not authorized" });

    const { _id, __v, user, ...safeData } = req.body;

    const updated = await Recipe.findByIdAndUpdate(
      req.params.id,
      safeData,
      { new: true, runValidators: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// DELETE – owner only
// router.delete("/:id", auth, async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.id);

//     if (!recipe)
//       return res.status(404).json({ msg: "Recipe not found" });

//     // FIXED: compare recipe.user to req.user.id
//     if (recipe.user.toString() !== req.user.id)
//       return res.status(401).json({ msg: "Not authorized" });

//     await recipe.deleteOne();
//     res.json({ msg: "Recipe deleted" });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

router.delete("/:id", auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe)
      return res.status(404).json({ msg: "Recipe not found" });

    // ✅ FIXED comparison
    if (recipe.user.toString() !== req.user)
      return res.status(401).json({ msg: "Not authorized" });

    await recipe.deleteOne();
    res.json({ msg: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


module.exports = router;




