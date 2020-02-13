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
    SessionKey,
    NotificationsService
  ) {
    ('ngInject');
    this.userServices = UsersService;
    this.messageService = MessageService;
    this.sessionService = SessionService;
    this.socket = socket;
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.SocketEvent = SocketEvent;
    this.EndPoints = EndPoints;
    this.SessionKey = SessionKey;
    this.notificationsService = NotificationsService;
    this.channelsService = ChannelsService;
    this.currentUser = this.userServices.getUser();
    this.registerSocketEvents();
  }

  registerSocketEvents() {
    const { socket, SocketEvent } = this;

    socket.on(SocketEvent.CHAT_MESSAGE, data => {
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
      this.notificationsService.send(data);
    });

    socket.on(SocketEvent.USER_LEFT, function(data) {
      // this.userLeft(data);
    });

    socket.on(SocketEvent.NOTIFY_TYPING_EVENT, data => {
      this.typingNotificationEvent(data);
    });

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

  sendTypingNotification() {
    this.socket.emit(this.SocketEvent.USER_TYPING);
  }

  sendStopTypingNotification() {
    this.socket.emit(this.SocketEvent.USER_STOPPED_TYPING);
  }

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

  typingNotificationEvent(usersTyping) {
    this.$rootScope.$broadcast('TypingEvent', usersTyping);
  }

  userJoined(joinedUser) {
    this.$rootScope.$broadcast('UserJoined', joinedUser);
  }

  updateRooms(joinedRooms) {
    this.$rootScope.$broadcast('UpdateRooms', joinedRooms);
  }

  // userLeft(data) {
  //   this.Users.removeUserWithUsername(data.username);
  //   const dmChannelID = DMChannel.idForUsernames(this.Users.user.name, data.username);
  //   this.Channels.removeChannelWithID(dmChannelID);
  //   const leftMessage = data.username + ' left';
  //   this.showNotification(leftMessage);
  // }
}
