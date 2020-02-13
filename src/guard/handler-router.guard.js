export default function handleRoutingErrors($state, $location, OnAfterRefreshService) {
  ('ngInject');
  $state.defaultErrorHandler(function(error) {
    $location.path('/signin');
  });
}
