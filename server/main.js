import { Meteor } from 'meteor/meteor';

//import collections
import '../imports/api/api.js';

Meteor.startup(() => {
  WebApp.rawConnectHandlers.use(function(req, res, next) { res.setHeader("Access-Control-Allow-Origin", "*"); return next(); });
});


  /*
  Streamy.on('emoji', function(emojiId, receiverId, s) {
    console.log(emoji)
  })*/

/*
Meteor.methods({
  'broadcastEmojiPin'() {

  },
  'sendMessage'() {

  }
});
*/
