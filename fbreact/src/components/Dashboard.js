
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 
import "./Dashboard.css";



function Dashboard() {
  const [user, setUser] = useState(null);
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await axios.get("http://localhost:5000/auth/me", {
        headers: { "x-auth-token": token },
      });

      setUser(res.data);

      // 🔥 THIS LINE FIXES THE NAVBAR
      login(token);
    };

    fetchUser();
  }, [login]);

  const handleAddRecipe = () => {
    navigate("/addnew");
  };

  return (
    <div className="container mt-4">
      {user ? (
        <>
          <h1>Welcome, {user.name}!</h1>

          <button
            className="btn purple-btn mt-3"
            onClick={handleAddRecipe}
          >
            ➕ Add New Recipe
          </button>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default Dashboard;
