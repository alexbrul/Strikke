import React, { Component } from "react";
import {Link} from "react-router-dom"
import "./styles.scss";
import Buttons from "../../components/forms/Button";
import FormInput from "../../components/forms/FormInput";
import { signInWithGoogle, auth } from "../../firebase/utils";
import AuthWrapper from "../AuthWrapper";

const initialState = {
  email: "",
  password: "",
  errors: "",
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { email, password } = this.state;
    return (
      <AuthWrapper headline="Logg inn">
        <form onSubmit={this.handleSubmit}>
          <div className="userpass">
            <div className="row">
              <FormInput
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                handleChange={this.handleChange}
              />
            </div>
            <div className="row">
              <FormInput
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                handleChange={this.handleChange}
              />
            </div>
            <div className="row">
              <div className="regularSignIn">
                <Buttons type="submit"> Login </Buttons>
              </div>
            </div>
          </div>
          <div className="socialSignIn">
            <div className="row">
              <Buttons onClick={signInWithGoogle}>Sign in with Google</Buttons>
            </div>
          </div>
          <div className="links">
            <Link to="/recovery"> Reset Password</Link>
          </div>
        </form>
      </AuthWrapper>
    );
  }
}

export default SignIn;
