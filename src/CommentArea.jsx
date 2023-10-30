import { Col, Row, Container } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

const CommentArea = function ({ bookComments }) {
  const getRatingStars = function (rateNum) {
    return Array.from({ length: rateNum }); //ritorna un array lungo quanto il ratings.
  };

  return (
    <Container fluid className="bg-body-secondary" id="comments">
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
            <Col className="d-flex flex-shrink-1" key={index}>
              <div
                className="d-flex w-100 py-2"
                style={{ border: "1px solid black" }}
              >
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
                  <p className="fw-bold m-0 text-truncate">{comment.comment}</p>
                  <small className="my-2">{comment.author.split("@")[0]}</small>
                  <div>
                    {getRatingStars(comment.rate).map(() => (
                      <small className="text-warning">
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
