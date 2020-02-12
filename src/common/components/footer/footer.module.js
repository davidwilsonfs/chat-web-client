import { FooterComponent } from './footer.component';
import './footer.scss';

export const FooterModule = angular.module('app.footer', []).component('appFooter', FooterComponent)
  .name;
