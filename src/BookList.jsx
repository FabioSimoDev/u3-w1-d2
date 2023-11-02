import SingleBook from "./SingleBook";
import { Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import RightSection from "./RIghtSection";
import { Fragment } from "react"; //serve per poter dare una key a fragment

const BookList = ({ books }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(false);
  const [bookComments, setBookComments] = useState(undefined);
  // contextMenu
  const [contextMenuOpen, setContextMenu] = useState(false); //aperto?
  const [contentMenuY, setContextMenuY] = useState(0); //posizione sull'asse Y
  const [contentMenuX, setContextMenuX] = useState(0); //posizione sull'asse X
  const [bookActive, setBookActive] = useState(null); //ID/asin libro cliccato (serve per le varie azioni del menu)
  const [menuKey, setMenuKey] = useState(0); //per forzare il re-render del menu ad ogni right-click.

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

  const handleContextMenu = function (event, book) {
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
    setBookActive(book.asin);
  };

  const getBookComments = async function (book) {
    /*se viene passato l'oggetto book, prende l'asin del libro accedendo alla proprietà, 
      se invece viene passato direttamente l'asin del libro, usa quello.
      il codice precedente era: const getBookComments = async function ({ asin }),
      ma dato che nel contextmenu non avevo accesso al singolo book ma solo all'asin del libro selezionato
      ho fatto questa modifica per evitare di dover modificare troppo il codice.*/
    if (book.asin) {
      book = book.asin;
    }
    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${book}`,
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

  console.log(filteredBooks.length);
  return (
    <div
      className="d-flex flex-column gap-3 align-items-center"
      onClick={() => setContextMenu(false)}
    >
      <input
        type="text"
        onKeyDown={handleSearch}
        placeholder="Cerca un libro"
      ></input>
      <div className="d-flex">
        <Col xs={10}>
          <Row xs={1} sm={2} md={4} xl={6} lg={5} className="pe-5 gy-3">
            {filteredBooks.map((book) => (
              <Fragment key={book.asin}>
                <SingleBook
                  book={book}
                  isSelected={book.asin === selected}
                  contextMenuOpen={contextMenuOpen}
                  contentMenuX={contentMenuX}
                  contentMenuY={contentMenuY}
                  menuKey={menuKey}
                  bookActive={bookActive}
                  onContextMenu={(event) => {
                    handleContextMenu(event, book);
                  }}
                  onClick={() => handleBookClick(book)}
                  bookCommentState={() => {
                    getBookComments(book);
                  }}
                />
              </Fragment>
            ))}
          </Row>
        </Col>
        <Col xs={2} className="">
          <Row className="sticky-top vh-100">
            <RightSection
              bookComments={bookComments}
              bookCommentState={() => {
                getBookComments(selected);
              }}
              selectedBook={selected}
            />
          </Row>
        </Col>
      </div>
    </div>
  );
};

export default BookList;
