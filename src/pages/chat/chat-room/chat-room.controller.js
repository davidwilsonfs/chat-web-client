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

    this._typing = false;
    this.message = {};
    this.messages = [];
    this.typingTimeout = 1000;
    this.lastTypingTime = 0;

    console.log(roomId);

    this.eventsService.switchRoom(roomId);
    this.channelsService.joinChannel(roomId);

    this.currentUser = this.usersService.getUser();
    this.channel = this.channelsService.activeChannel;

    // this.$rootScope.$on('$locationChangeSuccess', event => {
    //   if (this.$location.$$url === '/home') {
    //     this.leaveRoom();
    //   }
    // });

    this.scopeEvents();
  }

  scopeEvents() {
    this.$scope.$on('UserJoined', (event, data) => {
      this.users = data;
    });

    this.$scope.$on('NewMessage', (event, data) => {
      console.log(data);
      this.messages = data.data;
    });
  }

  leaveRoom() {
    this.channelsService.joinChannel('general');
    this.eventsService.switchRoom('general');
    this.$location.path('/home');
  }

  //   getIsTyping() {
  //     return this._typing;
  //   }

  //   setIsTyping(newState) {
  //     if (this.getIsTyping() !== newState) {
  //       this._typing = newState;
  //       if (newState) {
  //         this.eventsService.sendTypingNotification();
  //       } else {
  //         this.eventsService.sendStopTypingNotification();
  //       }
  //     }
  //   }

  messageIsValid(messageText) {
    return messageText.length > 0;
  }

  //   didReachTypingTimeout(timeDifference, timeout, isTyping) {
  //     return timeDifference >= timeout && isTyping;
  //   }

  send() {
    if (this.messageIsValid(this.message.text)) {
      //   this.isTyping = false;

      this.eventsService.sendMessage(this.message.text);
      this.message = {};
    }
  }

  //   _checkTyping() {
  //     const typingTimer = new Date().getTime();
  //     const duration = typingTimer - this.lastTypingTime;

  //     if (this.didReachTypingTimeout(duration, this.typingTimeout, this.getIsTyping())) {
  //       this.setIsTyping(false);
  //     }
  //   }

  //   textBoxDidUpdate() {
  //     this.isTyping = true;
  //     this.lastTypingTime = new Date().getTime();
  //     setTimeout(() => {
  //       this._checkTyping();
  //     }, this.typingTimeout);
  //   }

  // isActive(aChannel) {
  //   return this.channel.id === aChannel.id;
  // }

  // toggleChannel(channel) {
  //   this.channelsServices.setChannelForChannelID(channel.id);
  // }
}
