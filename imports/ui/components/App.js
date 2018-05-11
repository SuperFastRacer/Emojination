import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'

import { EmojiPins } from '../../api/api.js'
import { EmojiMessages } from '../../api/api.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emojiToSend: "",
      receiverId: "",
      emojiMapPins: this.props.emojiPins ? this.props.emojiPins : "",
      unreadMessages: this.props.emojiMessages ? this.props.emojiMessages : ""
    };

    this.sendMessageToServer = this.sendMessageToServer.bind(this)
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


  createMapPin() {
    Meteor.call('emoji_pins.insert', "defaultuser", "xff3d", 60.123,20.123);
  }
  testrenderPins() {
    let mapPins= this.props.emojiPins
    return mapPins.map((pin) => (
      <li key={pin._id}>{pin.emojiId}</li>
    ));
  }


  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>

        <ul>
          <li>Hello</li>
          {this.testrenderPins()}
        </ul>
        <button onClick={this.createMapPin}>add pin</button>
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
  };
})(App);
