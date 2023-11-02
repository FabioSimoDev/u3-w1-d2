import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import ContextMenu from "./ContextMenu";

const Comment = function (comment) {
  const [contextMenuOpen, setContextMenu] = useState(false);
  let contextMenuY = 0;
  let contextMenuX = 0;
  return (
    <>
      {contextMenuOpen && (
        <ContextMenu posY={contextMenuY} posX={contextMenuX} />
      )}
      <Col className="d-flex">
        <Col lg={2}>
          <Icon.PersonFill />
        </Col>
        <Col style={{ borderLeft: "1px solid black", paddingLeft: "10px" }}>
          {comment.comment}
        </Col>
      </Col>
    </>
  );
};

export default Comment;
