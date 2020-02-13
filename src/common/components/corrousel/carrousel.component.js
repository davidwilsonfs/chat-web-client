import template from './carrousel.html';

export const CarrouselComponent = {
  bindings: {
    imageSelected: '=',
  },
  template,
  controller: class CarrouselController {
    constructor(ImagesService) {
      'ngInject';
      this.imagesService = ImagesService;
    }

    $onInit() {
      this.counter = 0;
      this.imageChoiced = null;
      this.images = [];
      this.imagesService.getAvatarImages(30).then(res => {
        const { data } = res;
        this.images = data;
        this.changeEvent();
      });
    }

    next() {
      this.counter = (this.counter + 1) % 31;

      this.changeEvent();
    }

    prev() {
      this.counter = this.counter - 1;

      this.counter = this.counter === -1 ? 30 : this.counter;

      this.changeEvent();
    }

    changeEvent() {
      this.imageSelected = this.images[this.counter];
    }
  },
};
