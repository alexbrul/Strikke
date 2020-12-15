import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./styles.scss";
import Buttons from "../forms/Button";
import FormInput from "../forms/FormInput";
import AuthWrapper from "../AuthWrapper";
import { auth } from "../../firebase/utils";

const initialState = {
  email: "",
  errors: "",
};

class EmailPassword extends Component {
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
  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { email } = this.state;

      const config = {
        url: "http://localhost:3000/login",
      };

      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          this.props.history.push("/login");
          console.log("this works");
        })
        .catch(() => {
          const error = ["Vi kan ikke finne epostadressen din"];
          this.setState({
            errors: error,
          });
        });
    } catch (errors) {
      console.log(errors);
    }
  };

  render() {
    const { email, errors } = this.state;

    return (
      <div className="main">
        <AuthWrapper headline="Resett passord">
          {errors.length > 0 && (
            <ul>
              {errors.map((e, index) => {
                return <li key={index}> {e} </li>;
              })}
            </ul>
          )}

          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
              <FormInput
                type="email"
                name="email"
                value={email}
                placeholder="Epost-adresse"
                onChange={this.handleChange}
              />
              <Buttons type="submit">Send nytt passord</Buttons>
            </form>
          </div>
        </AuthWrapper>
      </div>
    );
  }
}
export default withRouter(EmailPassword);
