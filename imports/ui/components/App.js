import { Meteor } from "meteor/meteor";
import { withHistory } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";

import Map from "./Map";
import UserLocation from "./UserLocation";
import { GeolocationProps, geolocation } from "react-geolocation";
import Loading from "./Loading.js";

import { EmojiMessages } from "../../api/api.js";
import { EmojiPins } from "../../api/api.js";
import Modal from "./Modal/Modal";
import EmojiKeyboard from "./emojiKeyboard/emojiKeyboard";

import "./Topbar.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receiverId: "",
      emojiMapPins: this.props.emojiPins ? this.props.emojiPins : "",
      unreadMessages: this.props.emojiMessages ? this.props.emojiMessages : "",
      isAuthenticated: Meteor.userId() !== null,
      hasData: false,
      isOpen: false,
      coords: undefined,
      emoji: '🔵'
    };

    this.sendMessageToServer = this.sendMessageToServer.bind(this)
    this.setEmojiToSend = this.setEmojiToSend.bind(this)
    this.logout = this.logout.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.renderTopbar = this.renderTopbar.bind(this)
    this.getCoords = this.getCoords.bind(this)
    this.renderMap = this.renderMap.bind(this)

    this.getCoords();
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

  renderMap(coords) {
    return this.state.coords ?
    (<Map mapCoords={this.state.coords} emoji={this.state.emoji} emojiPins={this.props.emojiPins}/>)
    :
    <Loading/>;

  }

  getEmoji = clickedEmoji =>  {

  }


  fetchPermissions() {
    return new Promise((resolve, reject) => {
      if(Meteor.isCordova) {
        cordova.plugins.diagnostic.getLocationAuthorizationStatus(function(status){
          switch(status){
            case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
              console.log("Permission not requested");
              break;
            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
              console.log("Permission granted");
              break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED:
              console.log("Permission denied");
              break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
              console.log("Permission permanently denied");
              break;
            }
          }, function(error){
            console.error(error);
          });
          resolve('hi')
      }
      else {
        resolve('not a mobile device')
      }

    })
  }

  fetchCoords() {
    function onError(error) {
      alert("code: " + error.code + "\n" + "message: " + error.message + "\n");
    }
    let fetchedCoords = null;

    var options = { enableHighAccuracy: true, maximumAge: 100, timeout: 60000 };
    return new Promise((resolve, reject) => {
      if (Meteor.isCordova) {
        cordova.plugins.diagnostic.requestLocationAuthorization(
          function(status) {
            switch (status) {
              case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                console.log("Permission not requested");
                break;
              case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                console.log("Permission granted");
                navigator.geolocation.getCurrentPosition(
                  resolve,
                  onError,
                  options
                );
                break;
              case cordova.plugins.diagnostic.permissionStatus.DENIED:
                console.log("Permission denied");
                break;
              case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                console.log("Permission permanently denied");
                break;
            }
          },
          function(error) {
            console.error(error);
          }
        );
      } else {
        navigator.geolocation.getCurrentPosition(resolve, onError, options);
      }
    });
  }

  async getCoords() {
    const coords = await this.fetchCoords();
    console.log("coords found:", coords);
    this.setState(previousState => {
      return { coords: coords };
    });
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
  setEmojiToSend(emoji) {
    //set selectedEmoji state
    console.log('My coords are: '+ this.state.coords.coords.latitude + 'and ' + this.state.coords.coords.longitude)
    Meteor.call('emoji_pins.insert', this.props.currentUser, emoji, this.state.coords.coords.latitude, this.state.coords.coords.longitude)
    console.log(emoji);
    //this.setState({emoji: emoji});
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

  toggleModal() {
    console.log(this.state.isOpen);
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  renderTopbar() {
    return (
      <ul className="topBar">
        <li onClick={this.toggleModal}>
          <img className={"profile"} src="/profile_icon.png" alt="Profile" />
        </li>
        <li>
          <img className={"addFriend"} src="/add_friend.png" alt="add friend" />
        </li>
        <li>
          <img className={"send"} src="/send.png" alt="Send" />
        </li>
      </ul>
    );
  }

  render() {
    return (
      <div>
        {Meteor.user() ? (
          <div className="appContainer">
            {this.renderMap()}
            <header>{this.renderTopbar()}</header>
            {this.state.isOpen ? (
              <Modal onClose={this.toggleModal} onLogout={this.logout}>
                <h2>{this.props.currentUser.profile.name}</h2>
                <img src={this.props.currentUser.profile.picture} />
              </Modal>
            ) : (
              ""
            )}

            <EmojiKeyboard onEmojiClick={this.setEmojiToSend}/>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default withTracker(() => {
  Meteor.subscribe("emoji_pins");
  Meteor.subscribe("emoji_messages");
  return {
    emojiPins: EmojiPins.find({owner: { $ne: Meteor.userId() } }).fetch(),
    emojiMessages: EmojiMessages.find({ read: false }).fetch(), //TODO: add filtering so that only messages belonging to the user are fetched.
    currentUser: Meteor.userId()
  };
})(App);
