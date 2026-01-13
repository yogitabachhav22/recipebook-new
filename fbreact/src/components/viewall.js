


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import './viewall.css';

function Viewall() {
  const [receipes, setRecepies] = useState([]);

  useEffect(() => {
    // axios.get("http://localhost:5000/recipes")
    axios.get("https://recipebook-backend-kj8t.onrender.com/recipes")
    
      .then(res => setRecepies(res.data))
      .catch(err => console.log(err));
  }, []);

  const addnewdata = () => {
    axios.post("https://recipebook-backend-kj8t.onrender.com/recipes", {
      name: "Dummy Recipe",
      image: "https://via.placeholder.com/300",
      tags: ["Sample"],
      ingredients: ["Ingredient 1", "Ingredient 2"],
      instructions: ["Step 1", "Step 2"],
      rating: 4,
      cuisine: "Indian"
    })
      .then(res => setRecepies([...receipes, res.data]))
      .catch(err => console.error("Error:", err));
  };

  return (
    <>
      <h1  className="viewall-title" style={{ textAlign: "center", marginTop: "20px" }}>
        View all recipes
      </h1>

      <div id="container-fluid">
        {receipes?.map(receipe => (
          <Card className="recipe-card" key={receipe._id}>
            <Card.Img
              variant="top"
              src={receipe.image}
              className="recipe-img"
            />

            <Card.Body>
              <Card.Title>{receipe.name}</Card.Title>

              {receipe.tags?.map(tag => (
                <Button
                  key={tag}
                  size="sm"
                  style={{ marginRight: "6px", marginBottom: "5px" }}
                >
                  {tag}
                </Button>
              ))}

              <h5 className="mt-2">
                Rating: <Badge bg="warning">{receipe.rating}</Badge>
              </h5>

              <Button className="mt-2" variant="light">
                <Link to={"/receipedetail/" + receipe._id}>
                  View Instructions
                </Link>
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* <div style={{ textAlign: "center" }}>
        <Button onClick={addnewdata}>Add dummy data</Button>
      </div> */}
    </>
  );
}

export default Viewall;

