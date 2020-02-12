export class AuthService {
  constructor($q, SessionService, SessionKey) {
    ('ngInject');
    this.SessionKey = SessionKey;
    this.SessionService = SessionService;
    this.$q = $q;
  }

  authenticate() {
    const isAuthenticated = this.SessionService.getToken(this.SessionKey.KEY);
    if (isAuthenticated) {
      //If authenticated, return anything you want, probably a user object
      return true;
    } else {
      //Else send a rejection
      return this.$q.reject('Not Authenticated');
    }
  }
}
