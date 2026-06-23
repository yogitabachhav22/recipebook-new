import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Auth.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://recipebook-backend-kj8t.onrender.com/auth/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Welcome Back 👋</h2>
        <p className="auth-subtitle">Login to your YouChef account</p>

        {error && <div className="auth-error">{error}</div>}

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          autoComplete="current-password"
          required
        />

        <button type="submit">Login</button>

        <p className="auth-footer">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/signup")}>Signup</span>
        </p>
      </form>
    </div>
  );
}

export default Login;

