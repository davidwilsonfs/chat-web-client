import template from './channel-card.html';

export const ChannelCardComponent = {
  bindings: {
    channel: '<',
  },
  template,
  controller: class ChannelCardController {
    constructor($location) {
      'ngInject';
      this.$location = $location;
    }

    $onInit() {
      const { alias, amountUsers } = this.channel;

      this.alias = alias;
      this.amountUsers = amountUsers;
    }

    joinRoom() {
      this.$location.path(`/home/${this.channel.alias}`);
    }
  },
};
