import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

class App extends Component {

  constructor(props){
    super(props);
    this.state = this.getMeteorData();
    this.logout = this.logout.bind(this);
  }

  getMeteorData(){
    return { isAuthenticated: Meteor.userId() !== null };
  }

  componentWillMount(){
    if (!this.state.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (!this.state.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  logout(e){
    e.preventDefault();
    Meteor.logout( (err) => {
        if (err) {
            console.log( 'logout error: ' + err.reason );
        } else {
            this.props.history.push('/login');
        }
    });
  }

  render()  {
    return (
      <div>
        <div className="container">
          <h2 className="text-center">
            {Meteor.user() ? 'Welcome, ' + this.props.currentUser.profile.name : ''}
          </h2>

          {Meteor.user() ? <img className="profile-picture" src={this.props.currentUser.profile.picture}/> : ''} 

          <a href="#" className="waves-effect waves-light btn" onClick={this.logout}>Logout</a>
        </div>
      </div>

    )
  }
}

export default withTracker(() => {

  return {
    currentUser: Meteor.user(),
  };
})(App);