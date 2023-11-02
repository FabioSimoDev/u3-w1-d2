import { Col } from "react-bootstrap";
import CommentArea from "./CommentArea";

const RightSection = function ({
  bookComments,
  bookCommentState,
  selectedBook
}) {
  return (
    <Col className="h-100 flex-grow-1">
      <CommentArea
        bookComments={bookComments}
        bookCommentState={bookCommentState}
        selectedBook={selectedBook}
      />
    </Col>
  );
};

export default RightSection;
