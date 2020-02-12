import { UserCardComponent } from './user-card.component';
import './user-card.scss';

export const UserCardModule = angular
  .module('app.UserCard', [])
  .component('appUserCard', UserCardComponent).name;
