// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/auth/signup', formData);
//       localStorage.setItem('token', res.data.token);
//       navigate('/dashboard');
//     } catch (err) {
//       alert(err.response.data.msg);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="name" placeholder="Name" onChange={handleChange} required />
//       <input name="email" placeholder="Email" onChange={handleChange} required />
//       <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//       <button type="submit">Signup</button>
//     </form>
//   );
// };

// export default Signup;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = e =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/auth/signup', formData);
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('user', JSON.stringify(res.data.user));
//       navigate('/dashboard');
//     } catch (err) {
//       alert(err.response?.data?.msg || 'Signup failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         name="name"
//         placeholder="Name"
//         value={formData.name}
//         onChange={handleChange}
//         required
//         autoComplete="name"
//       />
//       <input
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//         autoComplete="username"
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleChange}
//         required
//         autoComplete="current-password"
//       />
//       <button type="submit">Signup</button>
//     </form>
//   );
// };

// export default Signup;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = e =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/auth/signup', formData);

//       // Save token and user info
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('user', JSON.stringify(res.data.user));

//       navigate('/dashboard');
//     } catch (err) {
//       alert(err.response?.data?.msg || 'Signup failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         name="name"
//         placeholder="Name"
//         onChange={handleChange}
//         required
//         autoComplete="name"
//       />
//       <input
//         name="email"
//         placeholder="Email"
//         onChange={handleChange}
//         required
//         autoComplete="username"
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         onChange={handleChange}
//         required
//         autoComplete="current-password"
//       />
//       <button type="submit">Signup</button>
//     </form>
//   );
// };

// export default Signup;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Handle input changes
//   const handleChange = e =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   // Handle form submission
//   const handleSubmit = async e => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post('http://localhost:5000/auth/signup', formData);

//       // Save token and user info
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('user', JSON.stringify(res.data.user));

//       // Redirect to dashboard
//       navigate('/dashboard');
//     } catch (err) {
//       console.error('Signup error:', err);
//       alert(err.response?.data?.msg || err.response?.data?.error || 'Signup failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         name="name"
//         placeholder="Name"
//         value={formData.name}
//         onChange={handleChange}
//         required
//         autoComplete="name"
//       />
//       <input
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//         autoComplete="username"
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleChange}
//         required
//         autoComplete="current-password"
//       />
//       <button type="submit" disabled={loading}>
//         {loading ? 'Signing up...' : 'Signup'}
//       </button>
//     </form>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/signup",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.msg ||
          err.response?.data?.error ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create Account 🍽️</h2>
        <p className="auth-subtitle">Join YouChef and save your recipes</p>

        {error && <div className="auth-error">{error}</div>}

        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="username"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Signup"}
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;



