import { Card, Col } from "react-bootstrap";

const SingleBook = ({ book }) => {
  return (
    // <Row xs={1} sm={2} md={4} xl={6} lg={5}>
    <Col key={book.asin}>
      <Card>
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
