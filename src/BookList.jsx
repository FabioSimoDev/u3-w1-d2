import SingleBook from "./SingleBook";
import { Row } from "react-bootstrap";

const BookList = ({ books }) => {
  return (
    <Row xs={1} sm={2} md={4} xl={6} lg={5}>
      {books.map((book) => (
        <SingleBook book={book} />
      ))}
    </Row>
  );
};

export default BookList;
