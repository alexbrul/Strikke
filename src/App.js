import React, { Component } from "react";
import "./default.scss";
import Header from "./components/header";
import Homepage from "./pages/homepage/Homepage";
import {Switch, Route} from "react-router-dom";
import Registration from "./pages/registration";

//layouts:
import MainLayout from "./layouts/MainLayout"

function App() {
  return (
      <div className="App">
        <Switch>
        <Route exact path="/" render={() => (
          <MainLayout>
            <Homepage/>
          </MainLayout>
        )} />
        <Route path="/registration" render={() => (
          <MainLayout>
            <Registration/>
          </MainLayout>
        )} />
        </Switch>
      </div>
  );
}

export default App;
