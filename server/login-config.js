import { Accounts } from 'meteor/accounts-base';
import { ServiceConfiguration } from 'meteor/service-configuration';
import { HTTP } from 'meteor/http'
import 'bas-meteor-facebook-login';


// Remove previous configurations
ServiceConfiguration.configurations.remove(
  { service: 'facebook' }
)
ServiceConfiguration.configurations.remove(
  { service: 'google' }
)

// Add new facebook configuration (Emojination Test App)
ServiceConfiguration.configurations.upsert(
  { service: 'facebook' },
  {
    $set: {
      //loginStyle: "popup",
      appId: Meteor.settings.private.oAuth.facebook.appId,
      secret: Meteor.settings.private.oAuth.facebook.secret
    }
  }
);

// Add new google configuration
ServiceConfiguration.configurations.upsert(
  { service: 'google' },
  {
    $set: {
      //loginStyle: "popup",
      clientId: Meteor.settings.private.oAuth.google.clientId,
      secret: Meteor.settings.private.oAuth.google.secret
    }
  }
);


// Add email and profile picture URL to the user during facebook and google login
Accounts.onCreateUser((options, user) => {

  if (user.services.facebook) {
    user.emails = [{ address: user.services.facebook.email, verified: true }];

    if (options.profile) {
      options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";

      user.profile = {
        name: options.profile.name,
        picture: options.profile.picture
      }
      //user.profile.picture = options.profile.picture;
      //user.profile = options.profile;

    }

    return user;

  }

  else if (user.services.google) {

    if (options.profile) {

      options.profile.picture = user.services.google.picture;

      // TODO: Add contacts to user profile?.
      //options.profile.contacts = ;

      //user.profile = options.profile;

      user.profile = {
        name: options.profile.name,
        picture: options.profile.picture
      }


    }

    return user;

  }

  //user.services.password
  else {

    user.profile = options.profile || {};

    user.profile.picture = "https://images.pexels.com/photos/672706/pexels-photo-672706.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
    user.profile.name = user.username;

    return user;

  }


});




