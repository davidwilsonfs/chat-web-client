export class LoggerService {
  constructor(toaster) {
    ('ngInject');
    this.toaster = toaster;
  }

  info(message) {
    this.toaster.pop({
      type: 'info',
      body: message,
    });
  }

  error(message) {
    this.toaster.pop({
      type: 'error',
      body: message,
    });
  }
}
