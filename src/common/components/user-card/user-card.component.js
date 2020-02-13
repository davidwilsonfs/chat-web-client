import template from './user-card.html';

export const UserCardComponent = {
  bindings: {
    user: '<',
  },
  template,
  controller: class UserCardController {
    constructor() {
      'ngInject';
    }

    $onInit() {}
  },
};
