export class ChatGeneralController {
  constructor(EventsService, ChannelsService, $scope, UsersService) {
    ('ngInject');
    this.channelsService = ChannelsService;
    this.$scope = $scope;
    this.usersService = UsersService;
    this.eventsService = EventsService;
  }

  $onInit() {
    this.newChannel = null;
    this.users = [];
    this.channels = [];
    this.channel = this.channelsService.activeChannel;

    this.currentUser = this.usersService.getUser();

    this.scopeEvents();
  }

  scopeEvents() {
    this.$scope.$on('UserJoined', (event, data) => {
      this.users = data;
    });

    this.$scope.$on('UpdateRooms', (event, data) => {
      this.channels = data;
    });
  }

  submit() {
    this.channelsService
      .registerChannel({ alias: this.newChannel })
      .then(() => this.eventsService.emitChange())
      .catch(error => console.log(error));
  }
}
