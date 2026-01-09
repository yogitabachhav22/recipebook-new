

import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./updatereceipe.css";

function Updatereceipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [newRecipe, setNewRecipe] = useState({});
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // 🔹 Fetch recipe
  useEffect(() => {
    axios
      .get(`http://localhost:5000/recipes/${id}`)
      .then((res) => {
        setNewRecipe(res.data);
        setTags(res.data.tags || []);
        setRating(res.data.rating || 0);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load recipe");
      });
  }, [id]);

  // 🔹 Update recipe
  const updatedata = (e) => {
    e.preventDefault();

    const updatedRecipe = {
      ...newRecipe,
      tags,
      rating,
    };

    axios
      .put(
        `http://localhost:5000/recipes/${id}`,
        updatedRecipe,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then(() => setShowModal(true))
      .catch((err) => {
        console.error(err);
        alert("Update failed");
      });
  };

  // 🔹 Delete recipe
  const deleteRecipe = () => {
    axios
      .delete(
        `http://localhost:5000/recipes/${id}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then(() => navigate("/"))
      .catch((err) => {
        console.error(err);
        alert("Delete failed");
      });
  };

  // 🔹 Add tag
  const addTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  // 🔹 Remove tag
  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <>
      <h1 className="text-center mt-4">Update Recipe</h1>

      <Form className="p-4" onSubmit={updatedata}>
        {/* NAME */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Name</Form.Label>
          <Col sm="10">
            <Form.Control
              value={newRecipe.name || ""}
              onChange={(e) =>
                setNewRecipe({ ...newRecipe, name: e.target.value })
              }
            />
          </Col>
        </Form.Group>

        {/* TAGS */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Tags</Form.Label>
          <Col sm="8">
            <Form.Control
              value={tagInput}
              placeholder="Add tag..."
              onChange={(e) => setTagInput(e.target.value)}
            />
          </Col>
          <Col sm="2">
            <Button onClick={addTag} variant="success">Add</Button>
          </Col>

          <Col sm="12" className="mt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                onClick={() => removeTag(tag)}
                style={{
                  background: "#17a2b8",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "20px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              >
                {tag} ✕
              </span>
            ))}
          </Col>
        </Form.Group>

        {/* RATING */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Rating</Form.Label>
          <Col sm="10">
            {[1,2,3,4,5].map((star) => (
              <FaStar
                key={star}
                size={30}
                color={star <= rating ? "gold" : "gray"}
                onClick={() => setRating(star)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </Col>
        </Form.Group>

        {/* INGREDIENTS */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Ingredients</Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea"
              rows={3}
              value={(newRecipe.ingredients || []).join("\n")}
              onChange={(e) =>
                setNewRecipe({
                  ...newRecipe,
                  ingredients: e.target.value.split("\n"),
                })
              }
            />
          </Col>
        </Form.Group>

        {/* INSTRUCTIONS */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Instructions</Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea"
              rows={4}
              value={(newRecipe.instructions || []).join("\n")}
              onChange={(e) =>
                setNewRecipe({
                  ...newRecipe,
                  instructions: e.target.value.split("\n"),
                })
              }
            />
          </Col>
        </Form.Group>

        {/* BUTTONS */}
        <div className="d-flex justify-content-between">
          <Button type="submit">Save Changes</Button>
          <Button variant="danger" onClick={deleteRecipe}>
            Delete Recipe
          </Button>
        </div>
      </Form>

      {/* SUCCESS MODAL */}
      <Modal show={showModal} onHide={() => navigate("/")}>
        <Modal.Header closeButton>
          <Modal.Title>Recipe Updated</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your recipe was updated successfully.</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => navigate("/")}>OK</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Updatereceipe;

