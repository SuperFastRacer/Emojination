import React, { Component } from "react";
import { withHistory, Link } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";
import PropTypes from "prop-types";
import "./signup.scss";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    let name = document.getElementById("signup-name").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;

    Accounts.createUser(
      { email: email, username: name, password: password },
      err => {
        if (err) {
          this.setState({
            error: err.reason
          });
        } else {
          this.props.history.push("/");
        }
      }
    );
  };

  render() {
    const error = this.state.error;
    return (
      <div className="signup-container">
        <div className="signup-header">
          <h1 className="">Sign up</h1>
        </div>

        <form
          id="login-form"
          className="login-form"
          onSubmit={this.handleSubmit}
        >
          <div className="center input">
            <input
              type="text"
              id="signup-name"
              className=""
              placeholder="name"
            />
          </div>
          <div className="center input">
            <input
              type="email"
              id="signup-email"
              className=""
              placeholder="email"
            />
          </div>
          <div className="center input">
            <input
              type="password"
              id="signup-password"
              className=""
              placeholder="password"
            />
          </div>

          {error.length > 0 ? (
            <div className="center error-message">{error}</div>
          ) : (
            ""
          )}

          <div className="center">
            <input
              type="submit"
              id="login-button"
              className="waves-effect waves-light btn signup-btn"
              value="Sign Up"
            />
          </div>
          <div className="center">
            <p>
              Already have an account? Login <Link to="/login">here</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
