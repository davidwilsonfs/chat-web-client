import chatGeneralTemplate from './chat-general/chat-general.html';
import chatRoomTemplate from './chat-room/chat-room.html';

export default function routes($stateProvider) {
  ('ngInject');
  $stateProvider
    .state('homeLayout.chat', {
      url: '/home',
      template: chatGeneralTemplate,
      controller: 'ChatGeneralController',
      controllerAs: 'chatCtrl',
    })
    .state('homeLayout.chatRoom', {
      url: '/home/:roomId',
      template: chatRoomTemplate,
      controller: 'ChatRoomController',
      controllerAs: 'chatRoomCtrl',
    });
}
