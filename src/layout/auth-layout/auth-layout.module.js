import routes from './auth-layout.router';
import './auth-layout.scss';

export const AuthLayoutModule = angular.module('app.auth-layout', []).config(routes).name;
