export class ChatController {
  constructor(EventsService, ChannelsService, $scope, UsersService) {
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
    this._typing = false;
    this.message = {};
    this.messages = [];

    this.typingTimeout = 1000;
    this.lastTypingTime = 0;

    // this.usersService.getExistingUsersRequest().then(res => {
    //   this.users = res.data;
    // });

    // this.channelsService.getChannels().then(res => {
    //   console.log('comum request');
    //   console.log(res.data);
    //   this.channels = res.data;
    // });

    this.currentUser = this.usersService.getUser();

    this.scopeEvents();
  }

  scopeEvents() {
    this.$scope.$on('UserJoined', (event, data) => {
      this.users = data;
    });

    this.$scope.$on('UpdateRooms', (event, data) => {
      console.log(data);
      this.channels = data;
    });

    this.$scope.$on('NewMessage', (event, data) => {
      this.messages = data.data;
    });
  }

  registerChannel() {
    this.channelsService
      .registerChannel({ alias: this.newChannel })
      .then(() => this.eventsService.emitChange())
      .catch(error => console.log(error));
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
    console.log(this.message);
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
