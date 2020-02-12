import chatTemplate from './chat.html';
import chatRoomTemplate from './chat-room/chat-room.html';

export default function routes($stateProvider) {
  ('ngInject');
  $stateProvider
    .state('homeLayout.chat', {
      url: '/home',
      template: chatTemplate,
      controller: 'ChatController',
      controllerAs: 'chatCtrl',
    })
    .state('homeLayout.chatRoom', {
      url: '/home/:roomId',
      template: chatRoomTemplate,
      controller: 'ChatRoomController',
      controllerAs: 'chatRoomCtrl',
    });
}
