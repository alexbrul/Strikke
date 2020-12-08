import React, { Component } from "react";
import "./styles.scss";
import Buttons from "../../components/forms/Button";
import { signInWithGoogle } from "../../firebase/utils";

class SignIn extends Component {

  handleSubmit = async (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="signIn">
        <div className="wrap">
          <h2>Login</h2>
          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
              <div className="sosialSignIn">
                <div className="row">
                  <Buttons onClick={signInWithGoogle}>
                    Sign in with Google
                  </Buttons>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
