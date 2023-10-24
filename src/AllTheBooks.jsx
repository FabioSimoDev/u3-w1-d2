import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import fantasy from "./books/fantasy.json";
import history from "./books/history.json";
import horror from "./books/horror.json";
import romance from "./books/romance.json";
import scifi from "./books/scifi.json";

const AllTheBooks = ({ genre }) => {
  let genreToUse = [];

  if (genre === "fantasy") {
    genreToUse.push(...fantasy);
  } else if (genre === "horror") {
    genreToUse.push(...horror);
  } else if (genre === "romance") {
    genreToUse.push(...romance);
  } else if (genre === "history") {
    genreToUse.push(...history);
  } else if (genre === "scifi") {
    genreToUse.push(...scifi);
  }
  return (
    <div>
      <h2>All Books</h2>
      <Row xs={1} sm={2} md={4} xl={6} lg={5}>
        {genreToUse.map((book) => (
          <Col key={book.asin}>
            <Card>
              <Card.Img
                variant="top"
                src={book.img}
                alt={`Cover of ${book.title}`}
              />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Title>{book.price + "$"}</Card.Title>
                <Card.Text>{book.category}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AllTheBooks;
