export default function handleRoutingErrors($state, $location, OnAfterRefreshService) {
  ('ngInject');
  $state.defaultErrorHandler(function(error) {
    // if (rejection === 'Not Authenticated') {
    $location.path('/signin');
    // }
  });
}
