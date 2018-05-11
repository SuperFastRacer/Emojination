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
  Meteor.publish('emoji_messages', function EmojiMessagesPublication() {
    return EmojiMessages.find()
  })
}

Meteor.methods({
  'emoji_pins.insert'(userId,emojiId, latitude, longitude) {

    check(emojiId, String);

    // Make sure the user is logged in before inserting a task
    // if (! this.userId) {
    //  throw new Meteor.Error('not-authorized');
    //}

    EmojiPins.insert({
      userId,
      emojiId,
      createdAt: new Date(),
      latitude,
      longitude
    });
  },
  'emoji_pins.remove'(pinId) {
    check(pinId, String);

    EmojiPins.remove(pinId);
  },
  'emoji_messages.insert'(emojiId, receiverId) {

    check(emojiId, String);

    // Make sure the user is logged in before inserting a task
    // if (! this.userId) {
    //  throw new Meteor.Error('not-authorized');
    //}

    EmojiMessages.insert({
      emojiId,
      createdAt: new Date(),
      receiverId,
      read: false
    });
  },
  'emoji_messages.markAsread'(emojiMessageId) {
    check(emojiMessageId, String)

    EmojiMessages.update(emojiMessageId, { $set: { read: setChecked } });

  }
});
