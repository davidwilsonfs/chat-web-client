import template from './message-box.html';

export const BoxMessageComponent = {
  bindings: {
    message: '<',
  },
  template,
  controller: class BoxMessageController {
    constructor(UsersService) {
      'ngInject';
      this.usersService = UsersService;
      this.username = '';
      this.urlImage = null;
    }

    $onInit() {
      this.isSender = false;

      const { username: currentUsername } = this.usersService.getUser();
      const { user } = this.message;

      if (user) {
        const { username: usernameSender, urlImage } = user;
        this.username = usernameSender;
        this.urlImage = urlImage;
        if (currentUsername === usernameSender) {
          this.isSender = true;
        }
      }
    }
  },
};
