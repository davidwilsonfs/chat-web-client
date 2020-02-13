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
      return true;
    } else {
      return this.$q.reject('Not Authenticated');
    }
  }
}
