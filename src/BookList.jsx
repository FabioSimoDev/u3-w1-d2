import SingleBook from "./SingleBook";
import { Row } from "react-bootstrap";
import React, { useState } from "react";

const BookList = ({ books }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(false);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
    }
  };

  const handleBookClick = function (book) {
    setSelected(book.asin === selected ? null : book.asin);
  };

  let filteredBooks = [];
  if (searchTerm !== "") {
    filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else {
    filteredBooks.push(...books);
  }
  return (
    <div className="d-flex flex-column gap-3 align-items-center">
      <input type="text" onKeyDown={handleSearch}></input>
      <Row xs={1} sm={2} md={4} xl={6} lg={5}>
        {filteredBooks.map((book) => (
          <SingleBook
            book={book}
            key={book.asin}
            isSelected={book.asin === selected}
            onClick={() => handleBookClick(book)}
          />
        ))}
      </Row>
    </div>
  );
};

export default BookList;
