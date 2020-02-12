import { ChannelCardComponent } from './channel-card.component';
import './channel-card.scss';

export const ChannelCardModule = angular
  .module('app.ChannelCard', [])
  .component('appChannelCard', ChannelCardComponent).name;
