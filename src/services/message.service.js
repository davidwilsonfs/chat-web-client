export class MessageService {
  constructor($http, EndPoints, SocketEvent, ChannelsService, UsersService) {
    ('ngInject');

    this.$http = $http;
    this.SocketEvent = SocketEvent;
    this.EndPoints = EndPoints;
    this.ChannelsService = ChannelsService;
    this.UsersService = UsersService;
  }

  getMessagesByChannel() {
    const channel = this.ChannelsService.activeChannel;
    const user = this.UsersService.user;

    return this.$http({
      method: 'get',
      url: `${this.EndPoints.MESSAGES}/channel/${channel.name}/${user.createdAt}`,
    });
  }
}
