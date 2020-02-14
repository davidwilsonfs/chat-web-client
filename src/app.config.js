import httpInterceptor from './interceptors/http.interceptor';

export default function routes(NotificationProvider, $urlRouterProvider, $httpProvider) {
  ('ngInject');
  $urlRouterProvider.otherwise('/signin');
  $httpProvider.interceptors.push(httpInterceptor);
  NotificationProvider.setOptions({
    delay: 4000,
    positionX: 'right',
    positionY: 'bottom',
  });
}
