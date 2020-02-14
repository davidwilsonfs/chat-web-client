import template from './chat-box.html';

export const ChatBoxComponent = {
  bindings: {
    channel: '<',
  },
  template,
  controller: class ChatBoxController {
    constructor($scope, EventsService, UsersService) {
      'ngInject';
      this.$scope = $scope;
      this.eventsService = EventsService;
      this.usersService = UsersService;
    }

    $onInit() {
      this._typing = false;
      this.message = {};
      this.messages = [];
      this.typingTimeout = 2000;
      this.lastTypingTime = 0;
      this.usersTyping = '';

      this.scopeEvents();
    }

    scopeEvents() {
      this.$scope.$on('NewMessage', (event, data) => {
        this.messages = data.reverse();
      });

      this.$scope.$on('TypingEvent', (event, data) => {
        const user = this.usersService.getUser();

        this.usersTyping = data
          .filter(username => username !== user.username)
          .reduce((prev, next) => `${prev},${next} is typing`, '')
          .slice(1);
      });
    }

    setIsTyping(state) {
      this._typing = state;
    }

    getIsTyping() {
      return this._typing;
    }

    _checkTyping() {
      const typingTimer = new Date().getTime();
      const duration = typingTimer - this.lastTypingTime;

      if (this.didReachTypingTimeout(duration, this.typingTimeout, this.getIsTyping())) {
        this.setIsTyping(false);
        this.eventsService.sendStopTypingNotification();
      } else if (this.getIsTyping()) {
        this.textBoxDidUpdate();
      }
    }

    textBoxDidUpdate() {
      setTimeout(() => {
        this._checkTyping();
      }, this.typingTimeout);
    }

    whenTyping(event) {
      this.lastTypingTime = new Date().getTime();
      if (!this.getIsTyping()) {
        this.setIsTyping(true);
        this.textBoxDidUpdate();
        this.eventsService.sendTypingNotification();
      }
    }

    whenNotTyping(event) {
      if (this.getIsTyping()) {
        this.setIsTyping(false);

        this.eventsService.sendStopTypingNotification();
      }
    }

    messageIsValid(messageText) {
      if (messageText) {
        return messageText.length > 0;
      }

      return false;
    }

    didReachTypingTimeout(timeDifference, timeout, isTyping) {
      return timeDifference >= timeout && isTyping;
    }

    send() {
      this.setIsTyping(false);
      this.eventsService.sendStopTypingNotification();

      if (this.messageIsValid(this.message.text)) {
        this.eventsService.sendMessage(this.message.text);
        this.message = {};
      }
    }
  },
};
