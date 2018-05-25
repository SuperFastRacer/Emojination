import React from 'react';
import PropTypes from 'prop-types';

import { Spring } from 'react-spring'
import './userslist.module.scss';

class IncomingMessage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Spring from={{ opacity: 0, fontSize: 20 }} to={{ opacity: 1, fontSize: 40 }} config={{tension: 180, friction: 12}}>
        {styles => <span className="incoming_message" style={styles}>{this.props.message}</span>}
      </Spring>
    )
  }
}
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
    return (
      <div onClick={this.handleClick}className="userslist_item">
        <div className="image_container"><img src={this.props.user.profile.picture}/></div>
        <span>{this.props.user.profile.name}</span>
        {/*this.props.userMessages?
          this.props.userMessages.map(message => {
            return (
              <IncomingMessage key={message._id} message={message.emojiId} />
            )
          })
          :
          ""*/}
      </div>
    );
  }
}
export default UsersListItem;
