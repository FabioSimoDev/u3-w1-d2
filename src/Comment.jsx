import { Container, Row, Col } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

const Comment = function (comment) {
  return (
    <Col className="d-flex">
      <Col lg={2}>
        <Icon.PersonFill />
      </Col>
      <Col style={{ borderLeft: "1px solid black", paddingLeft: "10px" }}>
        {comment.comment}
      </Col>
    </Col>
  );
};

export default Comment;
