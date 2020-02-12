export class SessionService {
  constructor($q) {
    ('ngInject');
  }

  save(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
    this.user = value;
  }

  get(key) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  getToken(key) {
    const userData = JSON.parse(sessionStorage.getItem(key));

    if (userData) {
      const { _expires_in, _token } = userData;

      if (new Date() < new Date(_expires_in)) {
        return _token;
      }
    }

    return null;
  }

  authenticate() {
    isAuthenticated = this.getToken;
    if (isAuthenticated) {
      //If authenticated, return anything you want, probably a user object
      return true;
    } else {
      //Else send a rejection
      return $q.reject('Not Authenticated');
    }
  }

  clear() {
    sessionStorage.clear();
  }
}
