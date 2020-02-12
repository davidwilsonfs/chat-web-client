import homeLayoutTemplate from './home-layout.html';

export default function routes($stateProvider) {
  ('ngInject');
  $stateProvider.state('homeLayout', {
    template: homeLayoutTemplate,
    resolve: {
      access: function(AuthService) {
        return AuthService.authenticate();
      },
    },
  });
}
