import { CarrouselComponent } from './carrousel.component';
import './carrousel.scss';

export const CarrouselModule = angular
  .module('app.carrousel', [])
  .component('appCarrousel', CarrouselComponent).name;
