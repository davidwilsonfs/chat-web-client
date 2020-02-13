import { Channel } from '../models/channel.model';

export class ChannelsService {
  constructor($http, $rootScope, EndPoints, SocketEvent, ExceptionService) {
    ('ngInject');

    this.activeChannel = {};
    this.$rootScope = $rootScope;
    this.$http = $http;
    this.SocketEvent = SocketEvent;
    this.EndPoints = EndPoints;
    this.exceptionService = ExceptionService;
  }

  joinChannel(name) {
    this.activeChannel = new Channel(name, name);
  }

  hasChannelWithID(id) {
    return this.channels.hasOwnProperty(id);
  }

  setChannelForChannelID(channelID) {
    this.activeChannel = new Channel(channelID, channelID);
  }

  registerChannel(channel) {
    const { alias } = channel;
    return this.$http({
      method: 'post',
      url: `${this.EndPoints.CHANNELS}`,
      data: { alias },
    }).catch(this.exceptionService.catcher);
  }

  getChannels() {
    return this.$http({
      method: 'get',
      url: `${this.EndPoints.CHANNELS}`,
    }).catch(this.exceptionService.catcher);
  }

  getUsersByChannel(alias) {
    return this.$http({
      method: 'get',
      url: `${this.EndPoints.CHANNELS}/${alias}/users`,
    }).catch(this.exceptionService.catcher);
  }
}
