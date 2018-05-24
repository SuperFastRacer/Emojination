import React from 'react';
import PropTypes from 'prop-types';

import './userslist.module.scss';
class UsersListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  handleClick = () => {
    //call the prop function that comes from App.js that sends the message to the user that was clicked on.

    this.props.onSendMessage(this.props.user._id)
  }
  render() {
    //map messages, if any, to span tags containing the message
    const messages = this.props.userMessages?
      this.props.userMessages.map(message => {
        return (
          <span key={message._id}>{message.emojiId}</span>
        )
      })
      :
      ""
    return (
      <div onClick={this.handleClick}className="userslist_item">
        <img src={this.props.user.profile.picture}/>
        <span>{this.props.user.profile.name}</span>
        {messages}
      </div>
    );
  }
}
export default UsersListItem;
