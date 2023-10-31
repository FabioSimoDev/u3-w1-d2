import { Card, Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./SingleBook.css";
import AddComment from "./AddComment";

const SingleBook = ({ book, isSelected, onClick, bookCommentState }) => {
  const aspectRatio = 1.5;
  function resizeImage(img = undefined) {
    if (img) {
      const calculatedHeight = aspectRatio * img.clientWidth;
      img.style.height = `${calculatedHeight}px`;
    }
  }
  return (
    // <Row xs={1} sm={2} md={4} xl={6} lg={5}>
    <Col>
      <Card
        className={isSelected ? "selected-book" : ""}
        onClick={onClick}
        id={book.asin}
        role="button"
      >
        {isSelected && (
          <small className="w-100 text-center">
            <a href="#comments" className="text-black text-muted">
              Vai ai commenti
            </a>
          </small>
        )}
        {!isSelected && (
          <Card.Img
            variant="top"
            src={book.img}
            alt={`Cover of ${book.title}`}
            onLoad={(e) => resizeImage(e.target)}
          />
        )}
        {isSelected && (
          <AddComment book={book} bookCommentState={bookCommentState} />
        )}

        <Card.Body>
          <Card.Title className="text-truncate">{book.title}</Card.Title>
          <Card.Title>{book.price + "$"}</Card.Title>
          <Card.Text>{book.category}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
    // </Row>
  );
};

export default SingleBook;
