import routes from './home-layout.router';
import './home-layout.scss';

export const HomeLayoutModule = angular.module('app.home-layout', []).config(routes).name;
