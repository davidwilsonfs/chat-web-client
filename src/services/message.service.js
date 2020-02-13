export class MessageService {
  constructor($http, EndPoints, UsersService, ExceptionService) {
    ('ngInject');

    this.$http = $http;
    this.EndPoints = EndPoints;
    this.UsersService = UsersService;
    this.exceptionService = ExceptionService;
  }

  getMessagesByChannel() {
    const { username } = this.UsersService.user;

    return this.$http({
      method: 'get',
      url: `${this.EndPoints.MESSAGES}/user/${username}`,
    }).catch(this.exceptionService.catcher);
  }
}
