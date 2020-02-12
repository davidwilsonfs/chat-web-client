import signinTemplate from './signin.html';

export default function routes($stateProvider) {
  ('ngInject');
  $stateProvider.state('authLayout.signin', {
    url: '/signin',
    template: signinTemplate,
    controller: 'SigninController',
    controllerAs: 'signinCtrl',
  });
}
