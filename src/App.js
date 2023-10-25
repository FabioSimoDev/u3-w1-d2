import React, { useState } from "react";
import { Container } from "react-bootstrap";
import MyNav from "./MyNav";
import SelectGenre from "./SelectGenre";
import Welcome from "./Welcome";
import BookList from "./BookList";
import MyFooter from "./MyFooter";
import "bootstrap/dist/css/bootstrap.min.css";
import scifi from "./books/scifi.json";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("history");
  const handleGenreSelection = (_genre) => {
    setSelectedGenre(_genre);
    console.log(_genre);
  };
  return (
    <div>
      <Container>
        <MyNav />
        <Welcome />
        <SelectGenre onSelectGenre={handleGenreSelection} />
        <BookList books={scifi} genre={selectedGenre} />
        <MyFooter />
      </Container>
    </div>
  );
}

export default App;
