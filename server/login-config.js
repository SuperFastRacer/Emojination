import { Accounts } from "meteor/accounts-base";
import { ServiceConfiguration } from "meteor/service-configuration";
import { isNullOrUndefined } from "util";

// Remove previous configurations
ServiceConfiguration.configurations.remove({ service: "facebook" });
ServiceConfiguration.configurations.remove({ service: "google" });

// Configure oauth
const oauthConfig = Meteor.settings.private;

if (isNullOrUndefined(oauthConfig)) {
  console.warn(
    "No API keys found in Meteor.settings. Define API configurations in settings.json to run app with social login."
  );
} else {
  // Add new facebook configuration (Emojination Test App)
  ServiceConfiguration.configurations.upsert(
    { service: "facebook" },
    {
      $set: {
        loginStyle: oauthConfig.oauth.facebook.loginStyle,
        appId: oauthConfig.oauth.facebook.appId,
        secret: oauthConfig.oauth.facebook.secret
      }
    }
  );

  // Add new google configuration
  ServiceConfiguration.configurations.upsert(
    { service: "google" },
    {
      $set: {
        loginStyle: oauthConfig.oauth.google.loginStyle,
        clientId: oauthConfig.oauth.google.clientId,
        secret: oauthConfig.oauth.google.secret
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
