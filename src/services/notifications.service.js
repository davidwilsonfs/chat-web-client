export class NotificationsService {
  constructor(Notification) {
    ('ngInject');
    this.notification = Notification;
  }

  send(data) {
    const { text, icon, username } = data;

    this.notification.success({
      message: ` <img style="width: 60px"src="${icon}"> <span>${username}<span>`,
      title: text,
    });
  }
}
