import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Modal from './Modal/Modal';



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

  render() {
    return (
      <div className="container">
        <header>
        </header>

        <div onClick={this.toggleModal} className={"profile"}>
          <img src={"https://www.w3schools.com/images/w3schools_green.jpg"}/>
        </div>
        <Modal show={this.state.isOpen}
        onClose={this.toggleModal}>
          <h2>Namn Namnsson</h2>
          <img src={"https://www.w3schools.com/images/w3schools_green.jpg"} />
        </Modal>
      </div>
    );
  }
}
