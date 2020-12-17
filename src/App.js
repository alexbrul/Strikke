import React, { Component } from "react";
import "./default.scss";
import {connect} from "react-redux"
import Homepage from "./pages/homepage/Homepage";
import { Switch, Route, Redirect } from "react-router-dom";
import Registration from "./pages/registration";
import Login from "./pages/login";
import { auth, handleUserProfile } from "./firebase/utils";
import Recovery from "./pages/Recovery";
import {setCurrentUser} from "./redux/User/user.actions";

//layouts:
import MainLayout from "./layouts/MainLayout";


class App extends Component {


  authListener = null;

  //When auth is registered, it adds userdata to state
  componentDidMount() {
    const {setCurrentUser } = this.props;

    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          });
          })
        }
      setCurrentUser(userAuth); //will return null
    });
  }
  //to remove memory leaks
  componentWillUnmout() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <MainLayout>
                <Homepage />
              </MainLayout>
            )}
          />
          <Route
            path="/registration"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout >
                  <Registration />
                </MainLayout>
              )
            }
          />
          <Route
            path="/Login"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout >
                  <Login />
                </MainLayout>
              )
            }
          />
          <Route
            exact
            path="/Recovery"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout>
                  <Recovery />
                </MainLayout>
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
