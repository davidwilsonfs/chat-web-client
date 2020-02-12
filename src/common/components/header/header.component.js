import template from './header.html';

export const HeaderComponent = {
  template: template,
  controller: class HeaderController {
    constructor($location, SessionService) {
      'ngInject';
      this.$location = $location;
      this.sessionService = SessionService;
    }

    signup() {
      this.sessionService.clear();
      this.$location.path('/signin');
    }
  },
};
