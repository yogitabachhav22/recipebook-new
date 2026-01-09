import axios from "axios";
import { useEffect, useState } from "react";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/recipes/my", {
        headers: { "x-auth-token": localStorage.getItem("token") }
      })
      .then(res => setRecipes(res.data));
  }, []);

  return (
    <div>
      <h2>My Recipes</h2>

      {recipes.length === 0 && <p>No recipes yet.</p>}

      {recipes.map(recipe => (
        <div key={recipe._id}>
          <h4>{recipe.title}</h4>
        </div>
      ))}
    </div>
  );
};

export default MyRecipes;
