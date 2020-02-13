export class NotificationsService {
  constructor() {
    ('ngInject');
  }

  send(data) {
    const opt = {
      body: data.text,
      icon: data.icon,
    };
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
      const notification = new Notification(`${data.room} notify !`, opt);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function(permission) {
        if (permission === 'granted') {
          const notification = new Notification(text, opt);
        }
      });
    }
  }
}
