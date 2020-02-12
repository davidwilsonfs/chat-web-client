import routes from './chat.router';
import { ChatController } from './chat.controller';
import { AppChatRoom } from './chat-room/chat-room.module.js';
import './chat.scss';

export const AppChat = angular
  .module('app.chat', [AppChatRoom])
  .controller('ChatController', ChatController)
  .config(routes).name;
