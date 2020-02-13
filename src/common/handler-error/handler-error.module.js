// import config from './config';
import { LoggerService } from './logger.service';
import { ExceptionService } from './exception.service';
import toaster from 'angularjs-toaster';

export const ErrorhandlerModule = angular
  .module('Errorhandler', [toaster])
  //   .config(config)
  .service('LoggerService', LoggerService)
  .service('ExceptionService', ExceptionService).name;
