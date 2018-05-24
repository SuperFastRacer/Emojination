import React from 'react';
import PropTypes from 'prop-types';


import UsersListItem from "./UsersListItem";
import './userslist.module.scss';
class UsersList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    const userslist = this.props.users.map(userId => {

      //filter out messages that come from the specific user to be rendered in the map function
      const messagesFromUser = this.props.messages.filter(message => message.sender == userId._id)
      return (
        //return a user item that will contain the data about the user as well as messages sent from that user, if any.
        <UsersListItem key={userId._id} user={userId} onSendMessage={this.props.onSendMessage} userMessages={messagesFromUser? messagesFromUser : ""}/>
      )
    })
    return (
      <div className="userslist_backdrop">
        <div className="users_list_modal">
          {userslist}
          <div className={"footer"}>
            <div onClick={this.props.onClose} className={"close"}>
              <p className={"cross"}>X</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UsersList.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default UsersList;
