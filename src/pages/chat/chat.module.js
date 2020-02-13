import routes from './chat.router';
import { AppChatGeneral } from './chat-general/chat-general.module';
import { AppChatRoom } from './chat-room/chat-room.module.js';

export const AppChat = angular.module('app.chat', [AppChatGeneral, AppChatRoom]).config(routes)
  .name;
