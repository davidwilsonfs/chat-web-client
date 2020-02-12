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
    }

    $onInit() {
      this.isSender = false;

      const { username: currentUsername } = this.usersService.getUser();
      const { user } = this.message;
      const { username: usernameSender, urlImage } = user;
      this.urlImage = urlImage;
      if (currentUsername === usernameSender) {
        this.isSender = true;
      }
    }
  },
};
