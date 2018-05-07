import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'

import { renderRoutes } from '../imports/startup/client/routes.js'
import App from '../imports/ui/components/App.js'


import { BrowserRouter, Route, Switch } from 'react-router-dom'


Meteor.startup(() => {

    // Required for native facebook login (?)
    if(Meteor.isCordova && facebookConnectPlugin) { 
        facebookConnectPlugin.activateApp(function(success) 
         {console.log(success)},function(error) { console.log(error)} );
      }


    render(renderRoutes(), document.getElementById('root'));

});
