import React, { Component } from "react"
import "./default.scss"
import Header from "./components/header/Header"
import Homepage from "./pages/homepage/Homepage"

function App() {
  return (
    <div className="App">
      <Header />
      <Homepage />
    </div>
   
  );
}

export default App;
