import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Meteor } from "meteor/meteor";

// components
import Signup from "../../ui/components/Signup/Signup.js";
import Login from "../../ui/components/Login/Login.js";
import App from "../../ui/components/App.js";

const authenticate = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: "/login",
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

export const renderRoutes = () => (
  <BrowserRouter>
    <div>
      <Route exact path="/" component={App} onEnter={authenticate} />
      <Route name="login" path="/login" component={Login} />
      <Route name="signup" path="/signup" component={Signup} />
    </div>
  </BrowserRouter>
);

//export default renderRoutes;
