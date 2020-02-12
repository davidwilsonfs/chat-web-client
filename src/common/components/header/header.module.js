import { HeaderComponent } from './header.component';

export const HeaderModule = angular.module('app.header', []).component('appHeader', HeaderComponent)
  .name;
