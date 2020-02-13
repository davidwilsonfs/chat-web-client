import angular from 'angular';
import { UsersService } from './users.service';
import { ChannelsService } from './channels.service';
import { EventsService } from './events.service';
import { MessageService } from './message.service';
import { SessionService } from './session.service';
import { AuthService } from './auth.service';
import { ImagesService } from './images.service';
import { NotificationsService } from './notifications.service';
import { OnAfterRefreshService } from './on-after-efresh.service';

export const CoreModule = angular
  .module('app.core', ['btford.socket-io'])
  .factory('socket', function(socketFactory, Websocket) {
    ('ngInject');
    const myIoSocket = io.connect(Websocket.URL);

    const mySocket = socketFactory({
      ioSocket: myIoSocket,
    });

    return mySocket;
  })
  .service('UsersService', UsersService)
  .service('ChannelsService', ChannelsService)
  .service('MessageService', MessageService)
  .service('EventsService', EventsService)
  .service('AuthService', AuthService)
  .service('OnAfterRefreshService', OnAfterRefreshService)
  .service('ImagesService', ImagesService)
  .service('NotificationsService', NotificationsService)
  .service('SessionService', SessionService).name;
