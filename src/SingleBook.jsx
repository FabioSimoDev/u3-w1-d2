import { Card, Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./SingleBook.css";
import AddComment from "./AddComment";
import ContextMenu from "./ContextMenu";

const SingleBook = ({
  book,
  isSelected,
  onClick,
  bookCommentState,
  onContextMenu,
  contextMenuOpen,
  bookActive,
  contentMenuX,
  contentMenuY,
  menuKey
}) => {
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
        className={
          isSelected ? "selected-book position-relative" : "position-relative"
        }
        onClick={(e) => {
          if (!e.target.classList.contains("item")) {
            onClick();
          }
        }}
        onContextMenu={onContextMenu}
        id={book.asin}
        role="button"
      >
        {contextMenuOpen && bookActive === book.asin && (
          <ContextMenu
            posY={contentMenuY}
            posX={contentMenuX}
            options={{
              Compra: () => console.log("Comprato!"),
              Recensisci: () => window.location.assign("#comments"),
              "Altre info": () =>
                console.log(
                  "non ho ancora programmato questa funzione, ti aspetti troppo."
                )
            }}
            key={menuKey}
          />
        )}
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
