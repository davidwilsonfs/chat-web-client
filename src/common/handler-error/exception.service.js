export class ExceptionService {
  constructor($q, toaster) {
    ('ngInject');
    this.$q = $q;
    this.toaster = toaster;

    this.catcher = error => {
      const { errorType, message } = error.data;
      this.toaster.error(errorType, message);
    };
  }
}
