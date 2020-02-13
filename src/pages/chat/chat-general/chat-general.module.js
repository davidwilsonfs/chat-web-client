import { ChatGeneralController } from './chat-general.controller';
import './chat-general.scss';

export const AppChatGeneral = angular
  .module('app.chat-general', [])
  .controller('ChatGeneralController', ChatGeneralController).name;
