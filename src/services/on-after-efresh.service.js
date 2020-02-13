export class OnAfterRefreshService {
  constructor(SessionService, SocketEvent, SessionKey, socket) {
    ('ngInject');
    this.SessionKey = SessionKey;
    this.sessionService = SessionService;
    this.socket = socket;
    this.SocketEvent = SocketEvent;

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
