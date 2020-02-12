export class OnAfterRefreshService {
  constructor($rootScope, $window, SessionService, SocketEvent, SessionKey, socket) {
    ('ngInject');
    this.SessionKey = SessionKey;
    this.sessionService = SessionService;
    this.socket = socket;
    this.SocketEvent = SocketEvent;

    $window.onbeforeunload = event => {
      // event.preventDefault();
      // console.log(event);
      // event.returnValue = '';
      // const returnValue = 'Do you really want to close?';
      // event.returnValue = returnValue;
      // return returnValue;
      // var event = $rootScope.$broadcast('onBeforeUnload', confirmation);
    };

    this.afterRefresh();
  }

  afterRefresh() {
    const token = this.sessionService.getToken(this.SessionKey.KEY);

    if (token) {
      const { username } = this.sessionService.get(this.SessionKey.KEY);
      this.socket.emit(this.SocketEvent.REFRESH_PAGE, { username });
    }
  }
}
