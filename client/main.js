import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from '../imports/redux/reducers'

import App from '../imports/ui/components/App.js'

const store = createStore(rootReducer)

Meteor.startup(() => {
  render(
    <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
  );
});
