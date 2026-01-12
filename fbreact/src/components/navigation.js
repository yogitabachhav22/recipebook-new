import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./navigation.css";

function Navigation() {
  const { user, logout, loading } = useContext(AuthContext); // ✅ get loading
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ IMPORTANT: wait until auth is resolved
  if (loading) {
    return null; // or spinner if you want
  }

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm py-3 nav-custom">
      <Container>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/" className="brand-text">
          🍽️ YouChef
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">

            {/* Public */}
            <Nav.Link as={Link} to="/" className="nav-item-custom">
              View All
            </Nav.Link>

            {/* Logged-in */}
            {user && (
              <>
                <Nav.Link as={Link} to="/dashboard" className="nav-item-custom">
                  My Recipes
                </Nav.Link>

                <Nav.Link as={Link} to="/addnew" className="nav-item-custom">
                  Add Recipe
                </Nav.Link>

                <Nav.Link onClick={handleLogout} className="nav-item-custom">
                  Logout
                </Nav.Link>
              </>
            )}

            {/* Logged-out */}
            {!user && (
              <>
                <Nav.Link as={Link} to="/login" className="nav-item-custom">
                  Login
                </Nav.Link>

                <Nav.Link as={Link} to="/signup" className="nav-item-custom">
                  Signup
                </Nav.Link>
              </>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
