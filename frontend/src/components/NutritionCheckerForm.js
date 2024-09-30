import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Table, Card, Alert } from "react-bootstrap";

const NutritionCheckerForm = () => {
  const [foodItem, setFoodItem] = useState("");
  const [nutritionResult, setNutritionResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearchNutrition = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(""); // Reset error message
    try {
      const response = await axios.get(
        `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(foodItem)}`,
        {
          headers: {
            "X-Api-Key": "WOO23cTA4ww2yrQ+otISmw==Z3Q2fFBcCTeE3OWj",
          },
        }
      );

      const data = response.data;

      if (data.items.length > 0) {
        setNutritionResult(data.items[0]);
      } else {
        setError("No nutrition information found for that food item.");
      }
    } catch (error) {
      console.error("Error fetching nutrition information:", error);
      setError("Error fetching nutrition information. Please try again.");
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="text-center">Nutrition Information Search</h2>
              <Form onSubmit={handleSearchNutrition}>
                <Form.Group controlId="foodItem">
                  <Form.Control
                    type="text"
                    value={foodItem}
                    onChange={(e) => setFoodItem(e.target.value)}
                    placeholder="Enter food item"
                    className="mb-3"
                  />
                </Form.Group>
                <Button variant="outline-success" type="submit" block>
                  Get Nutrition
                </Button>
              </Form>
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {nutritionResult && (
        <Row className="mt-4">
          <Col>
            <Card className="shadow-sm">
              <Card.Body>
                <h3 className="text-center">Nutrition Results for {nutritionResult.name}</h3>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Serving Size</th>
                      <th>Calories</th>
                      <th>Total Fat</th>
                      <th>Saturated Fat</th>
                      <th>Cholesterol</th>
                      <th>Sodium</th>
                      <th>Carbohydrates</th>
                      <th>Fiber</th>
                      <th>Sugar</th>
                      <th>Protein</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>100g</td>
                      <td>{nutritionResult.calories}</td>
                      <td>{nutritionResult.fat_total_g}g</td>
                      <td>{nutritionResult.fat_saturated_g}g</td>
                      <td>{nutritionResult.cholesterol_mg}mg</td>
                      <td>{nutritionResult.sodium_mg}mg</td>
                      <td>{nutritionResult.carbohydrates_total_g}g</td>
                      <td>{nutritionResult.fiber_g}g</td>
                      <td>{nutritionResult.sugar_g}g</td>
                      <td>{nutritionResult.protein_g}g</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default NutritionCheckerForm;
