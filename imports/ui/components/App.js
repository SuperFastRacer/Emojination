import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasData: false,
    };
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
      </div>
    );
  }
}
