import SingleBook from "./SingleBook";
import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import RightSection from "./RIghtSection";

const BookList = ({ books }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(false);
  const [bookComments, setBookComments] = useState(undefined);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
    }
  };

  const handleBookClick = function (book) {
    setSelected(book.asin === selected ? selected : book.asin);
    console.log("cliccato: ", book.asin, selected);
    getBookComments(book);
    // setBookComment(book);
  };

  let filteredBooks = [];
  if (searchTerm !== "") {
    filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else {
    filteredBooks.push(...books);
  }

  const getBookComments = async function ({ asin }) {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${asin}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNjljNWY2ZTNkZDAwMTQ5NWU0NjUiLCJpYXQiOjE2OTgzMjY5ODEsImV4cCI6MTY5OTUzNjU4MX0.zhKwKRo5Y-CAYexH6vgdyvWmMId_znCHZlW7hGmH7I4"
          }
        }
      );
      if (response.ok) {
        const data = await response.json();
        setBookComments(data);
      } else {
        throw new Error("ERRORE NELLA FETCH");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setBookComment = async function ({ asin }) {
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/`,
        {
          method: "POST",
          body: JSON.stringify({
            comment: "TRALLALLERO TRALLALLA",
            rate: "5",
            elementId: asin
          }),
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTNhNjljNWY2ZTNkZDAwMTQ5NWU0NjUiLCJpYXQiOjE2OTgzMjY5ODEsImV4cCI6MTY5OTUzNjU4MX0.zhKwKRo5Y-CAYexH6vgdyvWmMId_znCHZlW7hGmH7I4",
            "Content-type": "application/json"
          }
        }
      );
      if (response.ok) {
        // const data = await response.json();
        // setBookComments(data);
      } else {
        throw new Error("ERRORE NELLA FETCH");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(filteredBooks.length);
  return (
    <div className="d-flex flex-column gap-3 align-items-center">
      <input
        type="text"
        onKeyDown={handleSearch}
        placeholder="Cerca un libro"
      ></input>
      <div className="d-flex">
        <Col xs={10}>
          <Row xs={1} sm={2} md={4} xl={6} lg={5} className="pe-5 gy-3">
            {filteredBooks.map((book) => (
              <SingleBook
                book={book}
                key={book.asin}
                isSelected={book.asin === selected}
                onClick={() => handleBookClick(book)}
                bookCommentState={() => {
                  getBookComments(book);
                }}
              />
            ))}
          </Row>
        </Col>
        <Col xs={2} className="">
          <Row className="sticky-top vh-100">
            <RightSection bookComments={bookComments} />
          </Row>
        </Col>
      </div>
    </div>
  );
};

export default BookList;
