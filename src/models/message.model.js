export class Message {
  constructor(text, user, channel) {
    this.text = text;
    this.user = user;
    // if (createdAt === undefined) {
    //   this.createdAt = new Date();
    // }

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
