export default function httpInterceptor($q, SessionService, SessionKey) {
  ('ngInject');

  return {
    request: request => {
      const token = SessionService.getToken(SessionKey.KEY);

      if (token) {
        request.headers['Authorization'] = token;
      }

      return request || $q.when(request);
    },
    response: response => {
      return response || $q.when(response);
    },
    responseError: response => {
      return $q.reject(response);
    },
  };
}
