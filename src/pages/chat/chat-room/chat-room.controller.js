export class ChatRoomController {
  constructor(
    EventsService,
    ChannelsService,
    $rootScope,
    $scope,
    UsersService,
    $transition$,
    $location
  ) {
    ('ngInject');
    this.channelsService = ChannelsService;
    this.$scope = $scope;
    this.usersService = UsersService;
    this.eventsService = EventsService;
    this.$transition$ = $transition$;
    this.$location = $location;
    this.$rootScope = $rootScope;
  }

  $onInit() {
    const { roomId } = this.$transition$.params();

    this.users = [];

    this.eventsService.switchRoom(roomId);
    this.channelsService.joinChannel(roomId);

    this.currentUser = this.usersService.getUser();
    this.channel = this.channelsService.activeChannel;

    this.scopeEvents();
  }

  scopeEvents() {
    this.$scope.$on('UserJoined', (event, data) => {
      this.users = data;
    });
  }

  leaveRoom() {
    this.channelsService.joinChannel('general');
    this.eventsService.switchRoom('general');
    this.$location.path('/home');
  }
}
