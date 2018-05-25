import { withHistory, Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import React, { Component } from "react";

import "./login.module.scss";
import emojiJSON from "../../resources/emoji.json";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
    this.handlePasswordLogin = this.handlePasswordLogin.bind(this);
  }

  handlePasswordLogin = e => {
    e.preventDefault();
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;
    Meteor.loginWithPassword(email, password, err => {
      if (err) {
        this.setState({
          error: err.reason
        });
      } else {
        this.props.history.push("/");
      }
    });
  };

  handleGoogleLogin = e => {
    e.preventDefault();
    Meteor.loginWithGoogle(
      { requestPermissions: ["email", "profile"], requestOfflineToken: true },
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

  handleFacebookLogin = e => {
    e.preventDefault();
    Meteor.loginWithFacebook(
      {
        requestPermissions: ["email", "public_profile" /*, 'user_friends'*/],
        requestOfflineToken: true
      },
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

  getRandomEmoji = () => {
    const keys = Object.keys(emojiJSON);
    let random_key = keys[Math.floor(Math.random() * keys.length)];
    return emojiJSON[random_key].symbol;
  };

  renderBackgroundAnimation = () => {
    // Inspired by https://codepen.io/JonasBadalic/pen/cwEtH

    var self = this;

    this.getRandomEmoji;
    var canvas = document.getElementById("container");

    var ctx = canvas.getContext("2d");

    var ww = $(window).width();
    var wh = $(window).height();
    canvas.width = ww;
    canvas.height = wh;
    var partCount = 30;
    var emojis = [];

    function emoji() {
      this.x = randomInt(0, ww);
      this.y = randomInt(0, wh);
      this.emoji = self.getRandomEmoji();
      this.fontSize = randomInt(24, 62);
      ize = randomInt(30, 64);
      this.color = "rgba(255,255,255,0." + this.fontSize + ")";

      //this.opacity = self.setOpacity();
      this.direction = {
        x: -1 + Math.random() * 2,
        y: -1 + Math.random() * 2
      };
      this.vx = 0.3 * Math.random();
      this.vy = 0.3 * Math.random();
      //this.radius = randomInt(2, 3);
      this.float = function() {
        this.x += this.vx * this.direction.x;
        this.y += this.vy * this.direction.y;
      };
      this.changeDirection = function(axis) {
        this.direction[axis] *= -1;
      };
      this.boundaryCheck = function() {
        if (this.x >= ww) {
          this.x = ww;
          this.changeDirection("x");
        } else if (this.x <= 0) {
          this.x = 0;
          this.changeDirection("x");
        }
        if (this.y >= wh) {
          this.y = wh;
          this.changeDirection("y");
        } else if (this.y <= 0) {
          this.y = 0;
          this.changeDirection("y");
        }
      };
      this.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = (255, 255, 255, 0.5); //this.color;
        //ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        ctx.font = this.fontSize + "px Arial"; //
        ctx.fillText(this.emoji, this.x, this.y); //

        ctx.fill();
      };
    }
    function clearCanvas() {
      //cloneCtx.clearRect(0, 0, ww, wh);
      ctx.clearRect(0, 0, ww, wh);
    }
    function createEmojis() {
      for (i = 0; i < partCount; i++) {
        var p = new emoji();
        emojis.push(p);
      }
    }
    function drawEmojis() {
      for (i = 0; i < emojis.length; i++) {
        p = emojis[i];
        p.draw();
      }
    }
    function updateEmojis() {
      for (var i = emojis.length - 1; i >= 0; i--) {
        p = emojis[i];
        p.float();
        p.boundaryCheck();
      }
    }
    createEmojis();
    drawEmojis();
    function animateEmojis() {
      clearCanvas();
      drawEmojis();
      updateEmojis();
      requestAnimationFrame(animateEmojis);
    }
    requestAnimationFrame(animateEmojis);

    $(window).on("resize", function() {
      ww = $(window).width();
      wh = $(window).height();
      canvas.width = ww;
      canvas.height = wh;
      clearCanvas();
      emojis = [];
      createEmojis();
      drawEmojis();
    });
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function velocityInt(min, max) {
      return Math.random() * (max - min + 1) + min;
    }
  };

  componentDidMount() {
    this.renderBackgroundAnimation();
  }
  render() {
    const error = this.state.error;
    return (
      <div className="login-container">
        <canvas className="container" id="container" role="main" />

        <div className="login-header">
          {/*<h1 className="">Login</h1>*/}
          <img src="Emojination_logo.svg" alt="text" />
        </div>

        <div className="social-media-container">
          <div className="google-btn" onClick={this.handleGoogleLogin}>
            <p>Login with </p>
            <img className="google-logo" src="/Google_logo.png" alt="Google" />
          </div>
          <div className="facebook-btn" onClick={this.handleFacebookLogin}>
            <p>Login with</p>
            <img
              className="facebook-logo"
              src="/Facebook_logo.svg"
              alt="Facebook"
            />
          </div>
        </div>

        <form
          id="login-form"
          className="login-form"
          onSubmit={this.handlePasswordLogin}
        >
          <div className="center input">
            <input
              type="email"
              id="login-email"
              className=""
              placeholder="email"
            />
          </div>
          <div className="center input">
            <input
              type="password"
              id="login-password"
              className=""
              placeholder="password"
            />
          </div>

          {error !== "" ? (
            <div className="center error-message">Error: {error}</div>
          ) : (
            ""
          )}
          <button
            type="submit"
            id="login-button"
            value="Log In"
            className="btn waves-effect waves-light login-btn"
          >
            Log in
          </button>
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
