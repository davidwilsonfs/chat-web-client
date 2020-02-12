import authLayoutTemplate from './auth-layout.html';

export default function routes($stateProvider) {
  ('ngInject');
  $stateProvider.state('authLayout', {
    template: authLayoutTemplate,
  });
}
