export class Message {
  constructor(text, user, channel) {
    this.text = text;
    this.user = user;
    this.channel = channel;
  }

  get type() {
    return 'message';
  }

  get isUserMessage() {
    return true;
  }

  setChannelID(channelID) {
    this.channel = channelID;
    return this;
  }
}
