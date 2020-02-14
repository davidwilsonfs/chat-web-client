import { User } from '../models/user.model';

export class UsersService {
  constructor(
    $http,
    $rootScope,
    ExceptionService,
    SocketEvent,
    SessionService,
    SessionKey,
    EndPoints
  ) {
    ('ngInject');
    this.$rootScope = $rootScope;
    this.SocketEvent = SocketEvent;
    this.SessionService = SessionService;
    this.exceptionService = ExceptionService;
    this.SessionKey = SessionKey;
    this.$http = $http;
    this.EndPoints = EndPoints;
    this.activeUsers = [];
    this.user = {};
    this.hasDownloadUsers = false;
  }

  randomID(length) {
    length = length || 5;
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  isAvaliableUser(username) {
    return this.$http({
      method: 'get',
      url: `${this.EndPoints.USERS}/available/${username}`,
    }).catch(this.exceptionService.catcher);
  }

  registerUser(data) {
    return this.$http({
      method: 'post',
      url: `${this.EndPoints.USERS}/join`,
      data,
    }).catch(this.exceptionService.catcher);
  }

  getExistingUsersRequest() {
    return this.$http({ method: 'get', url: `${this.EndPoints.USERS}` });
  }

  getUser() {
    return this.user;
  }

  setUserAfterRefresh(user) {
    const { username, urlImage, token, expiresIn, createdAt, dateInChannel } = user;
    this.user = new User(username, token, expiresIn, urlImage, createdAt, dateInChannel);
  }

  setUserAndStorage(user, credentials) {
    const { expiresIn, token } = credentials;
    const { username, urlImage } = user;

    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);

    this.user = new User(username, token, expirationDate, urlImage);

    this.SessionService.save(this.SessionKey.KEY, this.user);
  }

  autoSignin() {
    const userData = this.SessionService.get(this.SessionKey.KEY);
    if (!userData) {
      return;
    }
  }
}
