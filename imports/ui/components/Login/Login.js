import React, { Component } from 'react'
import { withHistory, Link } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types';
import { FB_API } from 'bas-meteor-facebook-login';
import './login.css'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({
          error: err.reason
        });
      } else {
        this.props.history.push('/');
      }
    });
  };


  handleGoogleLogin = (e) => {
    e.preventDefault();
   /* if (Meteor.isCordova) { // signIn through cordova
      Meteor.cordova_g_plus({
        cordova_g_plus: true,
        profile: ['email", "profile'],
        webClientId: Meteor.settings.public.oAuth.google.clientId
      }, (error) => {
        if (error) {
          // error handling code
          console.log('Error while logging in with google+ through cordova: ' + error.reason);
        }
        else {
          this.props.history.push('/');
        }
      });
    }*/
    // Sign in through web
   // else {
      Meteor.loginWithGoogle({ requestPermissions: ['email', 'profile'], requestOfflineToken: true }, (err) => {
        if (err) {
          this.setState({
            error: err.reason
          });
        } else {
          this.props.history.push('/');
        }
      });
    //}
  }


  handleFacebookLogin = (e) => {
    e.preventDefault();

    /*if (Meteor.isCordova) {
      //Log in with cordova
      // Login with Facebook
      FB_API.login((err) => {
        if (err) {
          this.setState({
            error: err.reason
          });

        } else {
          this.props.history.push('/');
        }
      });

    }

    // Sign in through web
    else {*/

      Meteor.loginWithFacebook({ requestPermissions: ['email', 'public_profile'/*, 'user_friends'*/], requestOfflineToken:true }, (err) => {
        if (err) {
          this.setState({
            error: err.reason
          });
        } else {
          this.props.history.push('/');
        }
      });
   // }
  }


  render() {
    const error = this.state.error;
    return (
      <div className="login-container">

        <div className="login-header">
          <h1 className="">Login</h1>
        </div>

        <div className="social-media-container">
          <div className="google-btn" onClick={this.handleGoogleLogin}><p>Google login</p></div>
          <div className="facebook-btn" onClick={this.handleFacebookLogin}><p>Facebook login</p></div>
        </div>


        <form id="login-form"
          className="login-form"
          onSubmit={this.handleSubmit}>
          <div className="center input">
            <input type="email"
              id="login-email"
              className=""
              placeholder="email" />
          </div>
          <div className="center input">
            <input type="password"
              id="login-password"
              className=""
              placeholder="password" />
          </div>

          {error !== '' ?
            <div className="center error-message">Error: {error}</div>
            : ''}
          <input type="submit"
            id="login-button"
            className="waves-effect waves-light btn login-btn"
            value="Login" />
          <div className="center">
            <p>
              Don't have an account? Register <Link to="/signup">here</Link>
            </p>
          </div>
        </form>
      </div>

    );
  }
}

export default Login;