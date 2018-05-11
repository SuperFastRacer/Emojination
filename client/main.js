import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'

import App from '../imports/ui/components/App.js'

import '../imports/api/api.js'

Meteor.startup(() => {



  render(
    <App />,
  document.getElementById('root')
  );
});
