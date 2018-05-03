import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Modal from './Modal';

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
          <h1>Todo List</h1>
        </header>

        <ul>
          <li>Hello</li>
        </ul>

        <button onClick={this.toggleModal}>
          Open the modal
        </button>
        <Modal show={this.state.isOpen}
        onClose={this.toggleModal}>
          Here is some content to the modal
        </Modal>
      </div>
    );
  }
}
