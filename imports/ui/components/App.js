import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Modal from './Modal/Modal';
import './Topbar.scss';
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasData: false,
      isOpen: false,
    };
  }
  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  renderTopbar(){
    return(<ul className="topBar">
      <li className="topList" onClick={this.toggleModal} >
        <img className={"profile"} src="/profile_icon.png" alt="Profile"/>
      </li>
      <li className="topList">
          <img className={"addFriend"} src="/add_friend.png" alt="add friend"/>
      </li>
      <li className="topList">
          <img className={"send"} src="/send.png" alt="Send"/>
      </li>
    </ul>);
  }

  render() {
    return (
      <div className="container">
        <header>
          {this.renderTopbar()}
        </header>
        <Modal show={this.state.isOpen}
        onClose={this.toggleModal}>
          <h2>Namn Namnsson</h2>
          <img src={"https://www.w3schools.com/images/w3schools_green.jpg"} />
        </Modal>
      </div>
    );
  }
}
