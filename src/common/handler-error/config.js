export default function config($provide) {
  ('ngInject');
  $provide.decorator('$exceptionHandler', extendExceptionHandler);
}

function extendExceptionHandler($delegate, toaster) {
  ('ngInject');
  return function(exception, cause) {
    $delegate(exception, cause);
    var errorData = {
      exception: exception,
      cause: cause,
    };

    console.log(errorData);
    //log errors to remote web server
    //toaster.error(exception.msg, errorData);
  };
}
