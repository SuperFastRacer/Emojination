import { Accounts } from "meteor/accounts-base";
import { ServiceConfiguration } from "meteor/service-configuration";

// Remove previous configurations
ServiceConfiguration.configurations.remove({ service: "facebook" });
ServiceConfiguration.configurations.remove({ service: "google" });

// Configure oauth
const oauthConfig = Meteor.settings.private.oauth;

if (!oauthConfig) {
  console.warn(
    "No Meteor.settings.oauth. Define API configurations in settings.json"
  );
} else {
  // Add new facebook configuration (Emojination Test App)
  ServiceConfiguration.configurations.upsert(
    { service: "facebook" },
    {
      $set: {
        loginStyle: oauthConfig.facebook.loginStyle,
        appId: oauthConfig.facebook.appId,
        secret: oauthConfig.facebook.secret
      }
    }
  );

  // Add new google configuration
  ServiceConfiguration.configurations.upsert(
    { service: "google" },
    {
      $set: {
        loginStyle: oauthConfig.google.loginStyle,
        clientId: oauthConfig.google.clientId,
        secret: oauthConfig.google.secret
      }
    }
  );
}

// Add email and profile picture URL to the user during facebook and google login
Accounts.onCreateUser((options, user) => {
  // Handle user creation from Facebook
  if (user.services.facebook) {
    user.emails = [{ address: user.services.facebook.email, verified: true }];

    if (options.profile) {
      options.profile.picture =
        "http://graph.facebook.com/" +
        user.services.facebook.id +
        "/picture/?type=large";

      user.profile = {
        name: options.profile.name,
        picture: options.profile.picture
      };
    }
    return user;
  }

  //Handle user creation from Google
  else if (user.services.google) {
    if (options.profile) {
      options.profile.picture = user.services.google.picture;

      user.profile = {
        name: options.profile.name,
        picture: options.profile.picture
      };
    }
    return user;
  }

  //user.services.password
  else {
    //user.profile = options.profile || {};

    user.profile = {
      picture:
        "https://images.pexels.com/photos/672706/pexels-photo-672706.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      name: user.username
    };
    //user.profile.name = user.username;

    return user;
  }
});
