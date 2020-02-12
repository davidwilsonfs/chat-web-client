import routes from './signin.router';
import { SigninController } from './signin.controller';
import './signin.scss';

export const AppSignin = angular
  .module('app.signin', [])
  .config(routes)
  .controller('SigninController', SigninController).name;
