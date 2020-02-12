import httpInterceptor from './interceptors/http.interceptor';

export default function routes($locationProvider, $urlRouterProvider, $httpProvider) {
  ('ngInject');
  $urlRouterProvider.otherwise('/signin');
  $httpProvider.interceptors.push(httpInterceptor);
}
