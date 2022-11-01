import "./App.css";
import React from "react";
import Container from "@mui/material/Container";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestionCategory from "./pages/QuestionCategory";
import Questions from "./pages/Questions";

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<QuestionCategory></QuestionCategory>}
          ></Route>
          <Route
            path="/q/:cat/:dif/:no"
            element={<Questions></Questions>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
