import template from './user-card.html';

export const UserCardComponent = {
  bindings: {
    user: '<',
  },
  template,
  controller: class UserCardController {
    constructor(UsersService) {
      'ngInject';
      this.usersService = UsersService;
    }

    $onInit() {
      console.log(this.user);
    }
  },
};
