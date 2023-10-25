import { Card, Col } from "react-bootstrap";
import "./SingleBook.css";

const SingleBook = ({ book, isSelected, onClick }) => {
  return (
    // <Row xs={1} sm={2} md={4} xl={6} lg={5}>
    <Col>
      <Card className={isSelected ? "selected-book" : ""} onClick={onClick}>
        <Card.Img variant="top" src={book.img} alt={`Cover of ${book.title}`} />
        <Card.Body>
          <Card.Title>{book.title}</Card.Title>
          <Card.Title>{book.price + "$"}</Card.Title>
          <Card.Text>{book.category}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
    // </Row>
  );
};

export default SingleBook;
