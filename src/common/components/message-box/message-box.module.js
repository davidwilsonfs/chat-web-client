import { BoxMessageComponent } from './message-box.component';
import './message-box.scss';

export const BoxMessageModule = angular
  .module('app.boxMessage', [])
  .component('appMessageBox', BoxMessageComponent).name;
