import { ChatBoxComponent } from './chat-box.component';
import './chat-box.scss';

export const ChatBoxModule = angular
  .module('app.ChatBox', [])
  .component('appChatBox', ChatBoxComponent).name;
