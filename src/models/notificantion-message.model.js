export class NotificationMessage extends Message {
  constructor(text) {
    const systemUser = { name: 'System' };
    super(text, systemUser);
  }

  get isNotification() {
    return true;
  }

  get isUserMessage() {
    return false;
  }

  get type() {
    return 'notification';
  }
}
