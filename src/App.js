import React, { useState } from "react";
import { Container } from "react-bootstrap";
import MyNav from "./MyNav";
import SelectGenre from "./SelectGenre";
import Welcome from "./Welcome";
import BookList from "./BookList";
import MyFooter from "./MyFooter";
import "bootstrap/dist/css/bootstrap.min.css";
import scifi from "./books/scifi.json";
import fantasy from "./books/fantasy.json";
import { Row, Col } from "react-bootstrap";
import RightSection from "./RIghtSection";

function App() {
  const [selectedGenre, setSelectedGenre] = useState("history");
  const handleGenreSelection = (_genre) => {
    setSelectedGenre(_genre);
    console.log(_genre);
  };
  return (
    <div>
      <Container fluid className="">
        <MyNav />
        <Row className="px-5">
          <Welcome />
          <SelectGenre onSelectGenre={handleGenreSelection} />
          <BookList books={fantasy} genre={selectedGenre} />
          <MyFooter />
        </Row>
      </Container>
    </div>
  );
}

export default App;
