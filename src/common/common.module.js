import uirouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import 'ngstorage';
import 'angular-animate';
import { FooterModule } from './components/footer/footer.module';
import { HeaderModule } from './components/header/header.module';
import { BoxMessageModule } from './components/message-box/message-box.module';
import { ChannelCardModule } from './components/channel-card/channel-card.module';
import { UserCardModule } from './components/user-card/user-card.module';
import { CarrouselModule } from './components/corrousel/carrousel.module';
import { ChatBoxModule } from './components/chat-box/chat-box.module';
import { ErrorhandlerModule } from './handler-error/handler-error.module';

export const CommonModule = angular
  .module('app.commmon', [
    uirouter,
    'ngStorage',
    'ngAnimate',
    ngResource,
    FooterModule,
    HeaderModule,
    ChannelCardModule,
    BoxMessageModule,
    UserCardModule,
    CarrouselModule,
    ChatBoxModule,
    ErrorhandlerModule,
  ])
  .constant('SocketEvent', {
    ADD_USER: 'addUser',
    USER_JOINED: 'userjoined',
    UPDATE_ROOMS: 'updateRooms',
    ADD_ROOM: 'addRoom',
    NOTIFICATION: 'notificationEvent',
    NEW_MESSAGE: 'newMessage',
    CHAT_MESSAGE: 'chatMessage',
    USER_LEFT: 'userLeft',
    USER_TYPING: 'userTyping',
    USER_STOPPED_TYPING: 'stopTyping',
    NOTIFY_TYPING_EVENT: 'notifyTypingEvent',
    RECONNECT: 'reconnect',
    REFRESH_PAGE: 'refreshPage',
    UPDATE_DATA_AFTER_REFRESH: 'updateDataRefresh',
    SWITCH_ROOM_EVENT: 'switchRoom',
  })
  .constant('SessionKey', {
    KEY: 'userData',
  })
  .constant('Websocket', {
    URL: 'ws://localhost:8986',
  })
  .constant('EndPoints', {
    USERS: 'http://localhost:8986/api/users', //pegar endpoint da variavel de ambiente
    CHANNELS: 'http://localhost:8986/api/channels',
    MESSAGES: 'http://localhost:8986/api/messages',
    IMAGES: 'http://localhost:8986/api/images',
  }).name;
