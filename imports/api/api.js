import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

export const EmojiPins = new Mongo.Collection('emoji_pins')
export const EmojiMessages = new Mongo.Collection('emoji_messages')

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('emoji_pins', function EmojiPinsPublication() {
    return EmojiPins.find()
  })

  Meteor.publish("filter_pins", function FilterPinsPublication(userID){
    var userId = this.userId
    return EmojiPins.find({owner: {$ne: userID}})
  })
  Meteor.publish("logged_in_users", function LoggedInUsersPublication(){
    return Meteor.users.find({_id: {$ne: this.userId}}, {fields: {profile: 1}})
  });
  Meteor.publish('emoji_messages', function EmojiMessagesPublication() {
    return EmojiMessages.find({receiverId: this.userId})
  })

}

Meteor.methods({
  'emoji_pins.insert'(userId,emojiId, latitude, longitude) {



    // Make sure the user is logged in before inserting a task
    // if (! this.userId) {
    //  throw new Meteor.Error('not-authorized');
    //}
    let d = new Date()
    let timestamp = d.getTime();

    EmojiPins.insert({
      owner: userId,
      emojiId,
      createdAt: timestamp,
      latitude,
      longitude
    });
  },
  'emoji_pins.remove'(pinId) {
    check(pinId, String);

    EmojiPins.remove(pinId);
  },
  'emoji_messages.insert'(senderId, emojiId, receiverId) {

    // Make sure the user is logged in before inserting a task
    // if (! this.userId) {
    //  throw new Meteor.Error('not-authorized');
    //}

    EmojiMessages.insert({
      sender: senderId,
      emojiId,
      createdAt: new Date(),
      receiverId,
      read: false
    });
  },
  'emoji_messages.markAsread'(emojiMessageId) {
    check(emojiMessageId, String)

    EmojiMessages.update(emojiMessageId, { $set: { read: setChecked } });

  },
  'emoji_pins.start_pinremovetimer'() {
    Meteor.setInterval(() => {
      let date = new Date()
      let currenttime = date.getTime();

      EmojiPins.remove({
        createdAt: { $lt: currenttime - 15000}
      })
    }, 3000);
  }
});
