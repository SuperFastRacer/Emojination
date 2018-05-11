import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { withHistory } from "react-router-dom";
import PropTypes from "prop-types";

import { EmojiPins } from '../../api/api.js'
import { EmojiMessages } from '../../api/api.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getMeteorData();
    this.logout = this.logout.bind(this);

    this.state = {
      emojiToSend: "",
      receiverId: "",
      emojiMapPins: this.props.emojiPins ? this.props.emojiPins : "",
      unreadMessages: this.props.emojiMessages ? this.props.emojiMessages : ""
    };

    this.sendMessageToServer = this.sendMessageToServer.bind(this)
  }

  getMeteorData() {
    return { isAuthenticated: Meteor.userId() !== null };
  }

  componentWillMount() {
    if (!this.state.isAuthenticated) {
      this.props.history.push("/login");
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (!this.state.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  //standard lifecyclemethod for react
  /*getDerivedStateFromProps(nextProps,prevState) {
    // do something with Emojimessage prop
    /*/

  // will be passed down to child component(contact list)
  sendMessageToServer(receiverId) {
    // do something
    // Meteor.call('emoji_messages.insert', this.state.emojiToSend, receiverId)
    // Meteor.call('emoji_pins.insert', this.props.currentUser, this.state.emojiToSend, latitude, longitude)
  }

  // will be called inside sendMessageToServer()
  setSenderContact() {
    //set sender contact
  }

  // will be passed down to child component (emoji keyboard)
  setEmojiToSend(emojiCode) {
    //set selectedEmoji state

  }

  unsetEmojiToSend() {
    // unset selectedEmoji state
  }

  logout(e) {
    e.preventDefault();
    Meteor.logout(err => {
      if (err) {
        console.log("logout error: " + err.reason);
      } else {
        this.props.history.push("/login");
      }
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <h2 className="text-center">
            {Meteor.user()
              ? "Welcome, " + this.props.currentUser.profile.name
              : ""}
          </h2>
          {Meteor.user() ? (
            <img
              className="profile-picture"
              src={this.props.currentUser.profile.picture}
            />
          ) : (
            ""
          )}
          <a
            href="#"
            className="waves-effect waves-light btn"
            onClick={this.logout}
          >
            Logout
          </a>
        </div>
      </div>
    );
  }
}
export default withTracker(() => {
  Meteor.subscribe('emoji_pins');
  Meteor.subscribe('emoji_messages');
  return {
    emojiPins: EmojiPins.find({}).fetch(), //TODO: add filtering by userId
    emojiMessages: EmojiMessages.find({read: false} ).fetch(), //TODO: add filtering so that only messages belonging to the user are fetched.
    currentUser: Meteor.user()
  };
})(App);
