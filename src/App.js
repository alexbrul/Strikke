import React, { Component } from "react";
import "./default.scss";
import Homepage from "./pages/homepage/Homepage";
import {Switch, Route, Redirect} from "react-router-dom";
import Registration from "./pages/registration";
import Login from "./pages/login";
import { auth, handleUserProfile} from "./firebase/utils";

//layouts:
import MainLayout from "./layouts/MainLayout"

const initialState = {
  currentUser: null
};

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        });
      }
      this.setState({
        ...initialState
      })
     
    })
  }
  //to remove memory leaks
  componentWillUnmout() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="App">
        <Switch>
        <Route exact path="/" render={() => (
          <MainLayout currentUser={currentUser}>
            <Homepage/>
          </MainLayout>
        )} />
        <Route path="/registration" render={() => (
          <MainLayout currentUser={currentUser}>
            <Registration/>
          </MainLayout>
        )} />
        <Route path="/Login" 
        render={() => currentUser ? <Redirect to="/" /> : (
          <MainLayout currentUser={currentUser}>
            <Login/>
          </MainLayout>
        )} />
        </Switch>
      </div>
  );
  }
};

export default App;
