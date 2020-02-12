import { Channel } from '../models/channel.model';

export class ChannelsService {
  constructor($http, $rootScope, EndPoints, SocketEvent) {
    ('ngInject');

    this.activeChannel = {};
    this.$rootScope = $rootScope;
    this.$http = $http;
    this.SocketEvent = SocketEvent;
    this.EndPoints = EndPoints;
  }

  joinChannel(name) {
    this.activeChannel = new Channel(name, name);
  }

  hasChannelWithID(id) {
    return this.channels.hasOwnProperty(id);
  }

  setChannelForChannelID(channelID) {
    this.activeChannel = new Channel(channelID, channelID);
    // if (this.activeChannel) {
    //   this.activeChannel.markAsRead();
    // }
  }

  // createDMChannelForUser(user) {
  //   return new DMChannel(this.Users.getUser(), user);
  // }

  // addDMChannelsForUsers(users) {
  //   const self = this;
  //   users.forEach(user => {
  //     var userChannel = self.createDMChannelForUser(new User(user.name));
  //     // self.addChannel(userChannel);
  //   });
  // }

  registerChannel(channel) {
    const { alias } = channel;
    return this.$http({
      method: 'post',
      url: `${this.EndPoints.CHANNELS}`,
      data: { alias },
    });
  }

  getChannels() {
    return this.$http({
      method: 'get',
      url: `${this.EndPoints.CHANNELS}`,
    });
  }

  getUsersByChannel(alias) {
    return this.$http({
      method: 'get',
      url: `${this.EndPoints.CHANNELS}/${alias}/users`,
    });
  }

  // removeChannelWithID(channelID) {
  //   delete this.channels[channelID];
  //   for (var i = 0; i < this.channelCollection.length; i++) {
  //     if (this.channelCollection[i].id === channelID) {
  //       this.channelCollection.splice(i, 1);
  //       break;
  //     }
  //   }
  // }

  // addMessageToChannelWithID(message, channelID = this.activeChannel.id) {
  //   this.channels[channelID].addMessage(message);
  //   if (this.activeChannel.id !== channelID) {
  //     this.channels[channelID].unreadCount += 1;
  //   }
  // }
}
