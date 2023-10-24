import React from "react";
import { Container } from "react-bootstrap";
import MyNav from "./MyNav";
import Welcome from "./Welcome";
import AllTheBooks from "./AllTheBooks";
import MyFooter from "./MyFooter";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <MyNav />
      <Container>
        <Welcome />
        <AllTheBooks genre="history" />
      </Container>
      <MyFooter />
    </div>
  );
}

export default App;
