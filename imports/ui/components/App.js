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
import UsersList from "./UsersList/UsersList";
import EmojiKeyboard from "./emojiKeyboard/emojiKeyboard";

import { Spring, Keyframes, animated } from 'react-spring'
import { TimingAnimation, Easing } from 'react-spring/dist/addons.cjs'

import "./Topbar.scss";

class IncomingMessage extends React.Component {
  constructor(props) {
    super(props)
  }
  handleunmount() {
    Meteor.call('emoji_messages.markAsread', this.props.messageId)
  }
  render() {
    let _this = this;
    return(
      <Keyframes
        native
        script={async next => {
          // None of this will cause React to render, the component renders only once :-)
            let a = Math.floor((Math.random() * 400) + 200)
            await next(Spring, {
              from: {bottom: 0, left:Math.floor((Math.random() * 400) + 30),  opacity: 0},
              to: { bottom: a , opacity: 1},
              config: {tension: 40, friction: 4}
            })
            await next(Spring, {
              to: { bottom: (a + 50), opacity: 0},
              config: {tension: 180, friction: 14}
            })
            _this.handleunmount()
            //await next(Spring, { to: { fontSize: 18 }, config: { easing: Easing.inout } })
          }
        }>
        {props => <animated.div className={"incoming_message"} style={{...props }}>
        <div className="imagecropper"><img src={this.props.sendingUser.profile.picture}/></div><span>{this.props.message}</span>
      </animated.div>}
      </Keyframes>
    )
  }
}

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
      isUsersListOpen: false,
      coords: undefined,
      emoji: '😂'
    };

    this.sendMessageToServer = this.sendMessageToServer.bind(this)
    this.setEmojiToSend = this.setEmojiToSend.bind(this)
    this.logout = this.logout.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.toggleUsersList = this.toggleUsersList.bind(this)
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
  sendMessageToServer(receivingUserId) {
    // do something
    //TODO: meybe change user and sender to be the full user object instead of just id(depends on how and where the messages will be displayed)
    Meteor.call('emoji_messages.insert', this.props.currentUser._id, this.state.emoji, receivingUserId)
    Meteor.call('emoji_pins.insert', this.props.currentUser._id, this.state.emoji, this.state.coords.coords.latitude, this.state.coords.coords.longitude)
  }

  // will be called inside sendMessageToServer()
  setSenderContact() {
    //set sender contact
  }

  // will be passed down to child component (emoji keyboard)
  setEmojiToSend(emoji) {
    //set selectedEmoji state
    //Meteor.call('emoji_pins.insert', this.props.currentUser._id, emoji, this.state.coords.coords.latitude, this.state.coords.coords.longitude)
    this.setState({emoji: emoji});
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
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  toggleUsersList() {
    this.setState({
      isUsersListOpen: !this.state.isUsersListOpen
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
        <li onClick={this.toggleUsersList}>
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
            {this.state.isOpen ?
              (<Modal onClose={this.toggleModal} onLogout={this.logout}>
                <h2>{this.props.currentUser.profile.name}</h2>
                <img src={this.props.currentUser.profile.picture} />
              </Modal>)
              :
              ("")
            }
            {this.state.isUsersListOpen ?
              (<UsersList onClose={this.toggleUsersList} users={this.props.usersList} onSendMessage={this.sendMessageToServer}/>)
              :
              ("")
            }

            <EmojiKeyboard onEmojiClick={this.setEmojiToSend}/>
            {this.props.emojiMessages?
              this.props.emojiMessages.map(message => {
                let sender = this.props.usersList.find(user => user._id == message.sender)
                return (
                  <IncomingMessage key={message._id} message={message.emojiId} messageId={message._id} sendingUser={sender}/>
                )
              })
              :
              ""}
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
  Meteor.subscribe("logged_in_users");
  return {
    emojiPins: EmojiPins.find({owner: { $ne: Meteor.userId() } }).fetch(),
    emojiMessages: EmojiMessages.find({receiverId: Meteor.userId() }).fetch(), //TODO: add filtering so that only messages belonging to the user are fetched.
    currentUser: Meteor.user(),
    usersList: Meteor.users.find({_id: { $ne: Meteor.userId() } }).fetch()
  };
})(App);
