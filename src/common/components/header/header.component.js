import template from './header.html';

export const HeaderComponent = {
  template: template,
  controller: class HeaderController {
    constructor($location, SessionService, EventsService) {
      'ngInject';
      this.$location = $location;
      this.sessionService = SessionService;
      this.eventsService = EventsService;
    }

    signup() {
      this.sessionService.clear();
      this.$location.path('/signin');
    }
  },
};
