import { Message } from '../models/message.model';

export class EventsService {
  constructor(
    UsersService,
    MessageService,
    socket,
    $rootScope,
    $http,
    SocketEvent,
    EndPoints,
    ChannelsService,
    SessionService,
    SessionKey
  ) {
    this.userServices = UsersService;
    this.messageService = MessageService;
    this.sessionService = SessionService;
    this.socket = socket;
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.SocketEvent = SocketEvent;
    this.EndPoints = EndPoints;
    this.SessionKey = SessionKey;
    this.currentUser = this.userServices.getUser();
    // this.Notifications = Notifications;
    this.channelsService = ChannelsService;
    console.log('startou after refresh');
    this.registerSocketEvents();
  }

  registerSocketEvents() {
    const { socket, SocketEvent } = this;

    socket.on(SocketEvent.CHAT_MESSAGE, data => {
      console.log('aquiiii tambem mensagem');
      this.receiveMessage(data);
    });

    socket.on(SocketEvent.USER_JOINED, data => {
      this.userJoined(data);
    });

    socket.on(SocketEvent.UPDATE_ROOMS, data => {
      this.updateRooms(data);
    });

    socket.on(SocketEvent.UPDATE_DATA_AFTER_REFRESH, data => {
      this.updateData(data);
    });

    socket.on(SocketEvent.NOTIFICATION, data => {
      console.log('foii aquiiii ');
      console.log(data);
    });

    // socket.on(SocketEvent.USER_LEFT, function(data) {
    //   // this.userLeft(data);
    // });

    // socket.on(SocketEvent.USER_TYPING, function(data) {
    //   // this.userStartedTyping(data);
    // });

    // socket.on(SocketEvent.USER_STOPPED_TYPING, function(data) {
    //   // this.userStoppedTyping(data);
    // });

    socket.on(SocketEvent.RECONNECT, () => {
      this.reconnect();
    });
  }

  switchRoom(alias) {
    this.socket.emit(this.SocketEvent.SWITCH_ROOM_EVENT, alias);
  }

  emitChange() {
    this.socket.emit(this.SocketEvent.ADD_ROOM);
  }

  reconnect() {
    const { username } = this.sessionService.get(this.SessionKey.KEY);
    this.socket.emit(this.SocketEvent.REFRESH_PAGE, { username });
  }

  addUser(username) {
    this.socket.emit(this.SocketEvent.ADD_USER, { username });
  }

  // sendTypingNotification() {
  //   const data = {
  //     channel: this.channelsService.activeChannel.id,
  //     user: this.currentUser,
  //     type: 'user_typing', // TODO CONSTANTS
  //   };

  //   this.socket.emit(this.SocketEvent.USER_TYPING, data);
  // }

  // sendStopTypingNotification() {
  //   const data = {
  //     channel: this.channelsService.activeChannel.id,
  //     user: this.currentUser,
  //     type: 'user_stopped_typing',
  //   };
  //   this.socket.emit(this.SocketEvent.USER_STOPPED_TYPING, data);
  // }

  updateData(data) {
    const { user, channel } = data;
    const { _token: token, _expires_in: expiresIn } = this.sessionService.get(this.SessionKey.KEY);
    const { created_at: createdAt, dateInChannel, username } = user;

    const updatedUser = {
      username,
      token,
      expiresIn,
      createdAt,
      dateInChannel,
    };

    this.userServices.setUserAfterRefresh(updatedUser);
    this.channelsService.joinChannel(channel);
    this.receiveMessage();
  }

  sendMessage(text) {
    const aMessage = new Message(text, this.userServices.user, this.channelsService.activeChannel);
    this.socket.emit(this.SocketEvent.NEW_MESSAGE, aMessage);
  }

  receiveMessage() {
    this.messageService.getMessagesByChannel().then(data => {
      this.$rootScope.$broadcast('NewMessage', data);
    });
  }

  // showNotification(text) {
  //   const message = new NotificationMessage(text);
  //   this.Channels.addMessageToChannelWithID(message);
  //   // this.Notifications.send(text);
  // }

  userJoined(joinedUser) {
    this.$rootScope.$broadcast('UserJoined', joinedUser);
    // const dmChannel = this.channelsService.createDMChannelForUser(joinedUser);
    // this.channelsService.addChannel(dmChannel);
    // const userJoinedMessage = data.username + ' joined';
    // this.showNotification(userJoinedMessage);
    // return true;
  }

  updateRooms(joinedRooms) {
    console.log('aquiiii');
    this.$rootScope.$broadcast('UpdateRooms', joinedRooms);
    // const dmChannel = this.channelsService.createDMChannelForUser(joinedUser);
    // this.channelsService.addChannel(dmChannel);
    // const userJoinedMessage = data.username + ' joined';
    // this.showNotification(userJoinedMessage);
    // return true;
  }

  // userLeft(data) {
  //   this.Users.removeUserWithUsername(data.username);
  //   const dmChannelID = DMChannel.idForUsernames(this.Users.user.name, data.username);
  //   this.Channels.removeChannelWithID(dmChannelID);
  //   const leftMessage = data.username + ' left';
  //   this.showNotification(leftMessage);
  // }

  // userStartedTyping(data) {
  //   const name = data.user.name;
  //   this.Channels.channels[data.channel].status = `${name} is typing...`;
  // }

  // userStoppedTyping(data) {
  //   this.Channels.channels[data.channel].status = '';
  // }
}
