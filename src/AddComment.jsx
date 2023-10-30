import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";

const AddComment = function ({ book, bookCommentState }) {
  console.log(bookCommentState);
  const [commentData, setCommentData] = useState({ elementId: book.asin });
  const handleInputChange = function (key, value) {
    setCommentData({ ...commentData, [key]: value });
  };
  const handleFormSubmit = async function (e) {
    e.preventDefault();
    if (commentData.elementId && commentData.comment && commentData.rate) {
      try {
        const response = await fetch(
          `https://striveschool-api.herokuapp.com/api/comments/`,
          {
            method: "POST",
            body: JSON.stringify(commentData),
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNjljNWY2ZTNkZDAwMTQ5NWU0NjUiLCJpYXQiOjE2OTgzMjY5ODEsImV4cCI6MTY5OTUzNjU4MX0.zhKwKRo5Y-CAYexH6vgdyvWmMId_znCHZlW7hGmH7I4",
              "Content-type": "application/json"
            }
          }
        );
        if (response.ok) {
          bookCommentState(book);
          window.location.href = "#comments";
          console.log("commento postato");
        } else {
          throw new Error("ERRORE NELLA FETCH");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(commentData);
    }
  };
  return (
    <Form className="px-3 pt-2 bg-light" onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3" controlId="comment">
        <Form.Label>Commento:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter comment"
          onChange={(e) => {
            handleInputChange("comment", e.target.value);
          }}
        />
        <Form.Text className="text-muted">
          Il tuo commento sarà pubblico
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="rate">
        <Form.Label>Valutazione (da 1 a 5):</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter rating"
          onChange={(e) => {
            handleInputChange("rate", e.target.value);
          }}
        />
        <Form.Text className="text-muted">Quanto ti è piaciuto?</Form.Text>
      </Form.Group>
      <Button variant="success" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddComment;
