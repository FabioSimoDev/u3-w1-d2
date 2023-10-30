import { Col } from "react-bootstrap";
import CommentArea from "./CommentArea";

const RightSection = function ({ bookComments }) {
  return (
    <Col className="h-100">
      <CommentArea bookComments={bookComments} />
    </Col>
  );
};

export default RightSection;
