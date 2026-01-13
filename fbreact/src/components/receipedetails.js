

import React , { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import './receipedetails.css'
import Button from 'react-bootstrap/Button'
import { Container, Row, Col, Badge, Card } from 'react-bootstrap'

function Receipedetails() {

  const [receipe, setReceipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
  axios.get(`https://recipebook-backend-kj8t.onrender.com/recipes/${id}`)
    .then(res => setReceipe(res.data))
    .catch(err => console.error("Error:", err));
}, [id]);


  // useEffect(() => {
  //   axios.get(`http://localhost:5000/recipes/${id}`)
  //     .then(res => {
  //       setReceipe(res.data);
  //     });
  // }, [id]);

  if (!receipe) return <h2>Loading...</h2>;

  return (
    <Container className="mt-4">

      {/* TITLE + BUTTONS */}
      <Row className="mb-3">
        <Col>
          <h1 className='text-center'>{receipe.name}</h1>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col className='d-flex justify-content-center'>
          <Button variant="secondary" as={Link} to="/" className="me-3">
            ⬅ Back to All Recipes
          </Button>

          <Button variant="warning" as={Link} to={`/updatereceipe/${id}`}>
            ✏ Update Recipe
          </Button>
        </Col>
      </Row>

      {/* IMAGE + DETAILS */}
      <Row className="mt-3">

        <Col md={6} className="text-center">
          <Card className="shadow-sm p-3">
            <Card.Img 
              src={receipe.image} 
              alt={receipe.name}
              style={{ borderRadius: "8px", maxHeight: "350px", objectFit: "cover" }}
            />
          </Card>
        </Col>

        <Col md={6}>
          <h4>Tags:</h4>
          {receipe.tags?.map((tag, index) => (
            <Badge key={index} bg="primary" className="me-2 mb-2">
              {tag}
            </Badge>
          ))}

          <h4 className="mt-4">Rating:</h4>
          <Badge bg="warning" text="dark" style={{ fontSize: "18px" }}>
            ⭐ {receipe.rating}
          </Badge>

          <h4 className="mt-4">Cuisine:</h4>
          <p>{receipe.cuisine || "Not specified"}</p>
        </Col>
      </Row>

      {/* INGREDIENTS */}
      {/* <Row className="mt-4">
        <Col>
          <h3>🧂 Ingredients</h3>
          <ul>
            {receipe.ingredients?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Col>
      </Row> */}

      {/* <ul>
  {typeof receipe.ingredients === "string"
    ? receipe.ingredients.split(",").map((item, index) => (
        <li key={index}>{item.trim()}</li>
      ))
    : receipe.ingredients?.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
</ul> */}
<h3>🧂 Ingredients</h3>
<ul>
  {(Array.isArray(receipe.ingredients)
    ? receipe.ingredients
    : receipe.ingredients?.split(",")
  )?.map((item, idx) => (
    <li key={idx}>{item.trim()}</li>
  ))}
</ul>




      {/* INSTRUCTIONS
      <Row className="mt-4 mb-5">
        <Col>
          <h3>👨‍🍳 Steps / Instructions</h3>
          <ol>
            {receipe.instructions?.map((step, index) => (
              <li key={index} style={{ marginBottom: "8px" }}>{step}</li>
            ))}
          </ol>
        </Col>
      </Row> */}

      <Row className="mt-4 mb-5">
  <Col>
    {/* <h3>👨‍🍳 Steps / Instructions</h3>

    <ol>
      {typeof receipe.instructions === "string"
        ? receipe.instructions.split(",").map((step, index) => (
            <li key={index} style={{ marginBottom: "8px" }}>
              {step.trim()}
            </li>
          ))
        : receipe.instructions?.map((step, index) => (
            <li key={index} style={{ marginBottom: "8px" }}>
              {step}
            </li>
          ))}
    </ol> */}
    <h3>👨‍🍳 Steps / Instructions</h3>
<ol>
  {(Array.isArray(receipe.instructions)
    ? receipe.instructions
    : receipe.instructions?.split(",")
  )?.map((step, idx) => (
    <li key={idx}>{step.trim()}</li>
  ))}
</ol>
  </Col>
</Row>


    </Container>
  );
}

export default Receipedetails;
