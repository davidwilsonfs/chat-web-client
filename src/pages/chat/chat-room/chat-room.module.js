import { ChatRoomController } from './chat-room.controller';
import './chat-room.scss';

export const AppChatRoom = angular
  .module('app.chat-room', [])
  .controller('ChatRoomController', ChatRoomController).name;
