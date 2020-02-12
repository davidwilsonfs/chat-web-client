export class ImagesService {
  constructor($http, EndPoints) {
    ('ngInject');
    this.$http = $http;
    this.EndPoints = EndPoints;
  }

  getAvatarImages(amount) {
    return this.$http({ method: 'get', url: `${this.EndPoints.IMAGES}/${amount}` });
  }
}
