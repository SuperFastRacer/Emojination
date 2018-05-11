import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import React from "react";

import { renderRoutes } from "../imports/startup/client/routes.js";
import App from "../imports/ui/components/App.js";

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById("root"));
});
