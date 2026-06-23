import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import './addnew.css';

function Addnew() {
  const navigate = useNavigate();


  const [newReceipe, setNewReceipe] = useState({
    name: '',
    ingredients: [],
    instructions: [],
    cuisine: '',
    tags: [],
    rating: 0,
    image: ''
  });

  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState('');

  // ⭐ TAGS — Add tag when ENTER is pressed
  const handleTagAdd = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      setNewReceipe({
        ...newReceipe,
        tags: [...newReceipe.tags, tagInput.trim()]
      });
      setTagInput("");
    }
  };

  // ⭐ RATING
  const handleRating = (rate) => {
    setNewReceipe({ ...newReceipe, rating: rate });
  };

  // ⭐ SUBMIT FORM

  const addNewData = async (e) => {
  e.preventDefault();

  if (!newReceipe.name || !newReceipe.ingredients.length || !newReceipe.instructions.length) {
    setError("Please fill all required fields!");
    return;
  }

  setError("");

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to add a recipe!");
      return;
    }

    const res = await axios.post(
      "https://recipebook-backend-kj8t.onrender.com/recipes",
      newReceipe,
      {
        headers: {
          "Content-Type": "application/json",
       "x-auth-token": token
        }
      }
    );

    console.log("Recipe added:", res.data);
    setError("");
    setNewReceipe({
      name: "",
      ingredients: [],
      instructions: [],
      cuisine: "",
      tags: [],
      rating: 0,
      image: ""
    });
    setTagInput("");
    alert("Recipe added successfully!");

  } catch (err) {
    if (err.response?.status === 401) {
      setError("Unauthorized: Please log in to add a recipe.");
    } else if (err.response) {
      setError(`Error ${err.response.status}: ${err.response.data.message || "Server error"}`);
    } else if (err.request) {
      setError("No response from server. Please try again later.");
    } else {
      setError("An unexpected error occurred: " + err.message);
    }
    console.error(err);
  }
};

  


  return (
    <div className="add-container">

      <Card className="shadow-lg p-4 add-card">
        <h2 className="text-center mb-4">Add New Recipe</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={addNewData}>

          {/* NAME */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Name *</Form.Label>
            <Col sm="9">
              <Form.Control 
                type="text"
                placeholder="Recipe name"
                onChange={(e) =>
                  setNewReceipe({ ...newReceipe, name: e.target.value })
                }
              />
            </Col>
          </Form.Group>

          {/* INGREDIENTS */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Ingredients *</Form.Label>
            <Col sm="9">
              <Form.Control 
                as="textarea"
                rows={3}
                placeholder="One ingredient per line"
                onChange={(e) =>
                  setNewReceipe({
                    ...newReceipe,
                    ingredients: e.target.value.split("\n")
                  })
                }
              />
            </Col>
          </Form.Group>

          {/* INSTRUCTIONS */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Instructions *</Form.Label>
            <Col sm="9">
              <Form.Control 
                as="textarea"
                rows={3}
                placeholder="One step per line"
                onChange={(e) =>
                  setNewReceipe({
                    ...newReceipe,
                    instructions: e.target.value.split("\n")
                  })
                }
              />
            </Col>
          </Form.Group>

          {/* CUISINE */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Cuisine</Form.Label>
            <Col sm="9">
              <Form.Select
                onChange={(e) =>
                  setNewReceipe({ ...newReceipe, cuisine: e.target.value })
                }
              >
                <option>Select cuisine</option>
                <option>Indian</option>
                <option>Italian</option>
                <option>Chinese</option>
                <option>Mexican</option>
                <option>Thai</option>
              </Form.Select>
            </Col>
          </Form.Group>

          {/* TAGS */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Tags</Form.Label>
            <Col sm="9">
              <Form.Control 
                type="text"
                placeholder="Type tag & press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagAdd}
              />

              <div className="tag-box mt-2">
                {newReceipe.tags.map((tag, index) => (
                  <span key={index} className="tag-chip">{tag}</span>
                ))}
              </div>
            </Col>
          </Form.Group>

          {/* RATING */}
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Rating</Form.Label>
            <Col sm="9">
              <div className="stars">
                {[1,2,3,4,5].map(num => (
                  <span
                    key={num}
                    className={num <= newReceipe.rating ? "star filled" : "star"}
                    onClick={() => handleRating(num)}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* <div style={{ fontSize: "24px", cursor: "pointer" }}>
  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      onClick={() => setRating(star)}
      style={{
        color: star <= rating ? "#f5b50a" : "#ccc"
      }}
    >
      ★
    </span>
  ))}
</div> */}
            </Col>
          </Form.Group>

          {/* IMAGE URL */}
          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm="3">Image URL *</Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Paste image URL (e.g., https://i.imgur.com/abc.jpg)"
                onChange={(e) =>
                  setNewReceipe({ ...newReceipe, image: e.target.value })
                }
              />

              {newReceipe.image && (
                <img
                  src={newReceipe.image}
                  alt="preview"
                  className="preview-img mt-3"
                />
              )}
            </Col>
          </Form.Group>

          {/* BUTTON */}
          <div className="text-center">
            <Button type="submit" className="w-50 btn-lg" variant="primary">
              Add Recipe
            </Button>
          </div>
         


        </Form>
      </Card>

    </div>
  );
}

export default Addnew;

