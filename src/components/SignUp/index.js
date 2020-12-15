import React, { Component } from "react";
import "./styles.scss";
import FormInput from "../forms/FormInput";
import Buttons from "../forms/Button";
import { auth, handleUserProfile } from "./../../firebase/utils";
import AuthWrapper from "./../AuthWrapper";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit = async event => {
    event.preventDefault();
    const {
      displayName,
      email,
      password,
      confirmPassword,
    } = this.state;

    if (password !== confirmPassword) {
      const err = ["Passordene er ikke like!"];
      this.setState({
        errors: err
      });
      return;
    }
    try{
      console.log("displayName1", displayName)
      const user = await auth.createUserWithEmailAndPassword(email, password);
      await handleUserProfile(user, { displayName })

      //resets the form when user registered
      this.setState({
        ...initialState
      });

    }catch(errorr){
      console.log(errorr);
    }
  };

  render() {
    const {
      displayName,
      email,
      password,
      confirmPassword,
      errors,
    } = this.state;

    return (
      <AuthWrapper headline="Registrer deg her:">
          {errors.length > 0 && (
            <ul>
              {errors.map((err, index) => {
                return (<li key={index}> {err}</li>);
              })}
            </ul>
          )}

          <div className="formWrap">
            <form onSubmit={this.handleFormSubmit}>
              <FormInput
                type="text"
                name="displayName"
                value={displayName}
                placeholder="Full Name"
                onChange={this.handleChange}
              />
              <FormInput
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={this.handleChange}
              />
              <FormInput
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={this.handleChange}
              />
              <FormInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm password"
                onChange={this.handleChange}
              />
              <Buttons type="submit"> Registrer </Buttons>
            </form>
          </div>
          </AuthWrapper>
    );
  }
}

export default SignUp;
