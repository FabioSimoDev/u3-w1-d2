import { Col, Row, Container } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useState } from "react";
import ContextMenu from "./ContextMenu";

const CommentArea = function ({
  bookComments,
  bookCommentState,
  selectedBook
}) {
  const [contextMenuOpen, setContextMenu] = useState(false);
  const [contentMenuY, setContextMenuY] = useState(0);
  const [contentMenuX, setContextMenuX] = useState(0);
  const [commentActive, setCommentActive] = useState(null);
  const [menuKey, setMenuKey] = useState(0); //per forzare il re-render del menu ad ogni right-click.

  const getRatingStars = function (rateNum) {
    return Array.from({ length: rateNum }); //ritorna un array lungo quanto il ratings.
  };

  const handleContextMenu = function (event, comment) {
    if (contextMenuOpen) {
      //se il menu era già aperto e l'utente clicca di nuovo con il tasto destro senza aver prima chiuso il menu,
      //aumenta di uno la key, forzando react a renderizzare di nuovo il menu anzichè spostarlo e basta (cosi da far partire l'animazione)
      setMenuKey((prevKey) => prevKey + 1);
    }
    const containerRect = event.currentTarget.getBoundingClientRect(); //fabio, ci hai perso 3 ore. ricorda che si usa currentTarget perchè target è influenzato dai figli dell'elemento.
    const top = event.clientY - containerRect.top;
    const left = event.clientX - containerRect.left;
    event.preventDefault();
    setContextMenu(true);
    setContextMenuY(top);
    setContextMenuX(left);
    setCommentActive(comment._id);
  };

  const handleDeleteClick = async function () {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${commentActive}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNjljNWY2ZTNkZDAwMTQ5NWU0NjUiLCJpYXQiOjE2OTgzMjY5ODEsImV4cCI6MTY5OTUzNjU4MX0.zhKwKRo5Y-CAYexH6vgdyvWmMId_znCHZlW7hGmH7I4"
          }
        }
      );
      if (response.ok) {
        bookCommentState(selectedBook);
        console.log("eliminato.");
      } else {
        throw new Error("errore mentre eliminavo il commento.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      fluid
      className="bg-body-secondary h-100"
      id="comments"
      onClick={() => setContextMenu(false)}
    >
      <Row lg={1} className="gx-3 gy-3 py-3">
        {bookComments && bookComments.length > 0 && (
          <>
            <h5 className="text-center w-100 d-flex flex-column">
              Commenti:{" "}
              <small className="text-muted">
                <a href={`#${bookComments[0].elementId}`}>Torna al libro</a>
              </small>
            </h5>
          </>
        )}
        {bookComments && bookComments.length === 0 && (
          <h5 className="text-center w-100">
            Non ci sono commenti per questo libro.
          </h5>
        )}
        {bookComments &&
          bookComments.map((comment, index) => (
            <Col
              className="d-flex flex-shrink-1"
              key={index}
              onContextMenu={(event) => {
                handleContextMenu(event, comment);
              }}
            >
              <div
                className="d-flex w-100 py-2 position-relative"
                style={{ border: "1px solid black" }}
              >
                {contextMenuOpen && commentActive === comment._id && (
                  <ContextMenu
                    posY={contentMenuY}
                    posX={contentMenuX}
                    commentActive={commentActive}
                    bookCommentState={bookCommentState}
                    selectedBook={selectedBook}
                    options={{
                      Elimina: handleDeleteClick,
                      Suca: () => console.log("sucato"),
                      Boh: () =>
                        console.warn("NON CLICCARE QUESTE COSE INUTILI"),
                      ForseFunziona: () => console.log("yes")
                    }}
                    key={menuKey}
                  />
                )}
                <Col
                  lg={2}
                  className="flex-shrink-1 d-flex align-items-center justify-content-center"
                >
                  <Icon.PersonFill />
                </Col>
                <Col
                  style={{
                    borderLeft: "1px solid black",
                    paddingLeft: "10px"
                  }}
                  className="flex-shrink-1 d-flex flex-column text-truncate"
                >
                  <p
                    title={comment.comment}
                    className="fw-bold m-0 text-truncate"
                  >
                    {comment.comment}
                  </p>
                  <small className="my-2">{comment.author.split("@")[0]}</small>
                  <div>
                    {getRatingStars(comment.rate).map((undef, index) => (
                      <small key={index} className="text-warning">
                        <Icon.StarFill />
                      </small>
                    ))}
                  </div>
                </Col>
              </div>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default CommentArea;
