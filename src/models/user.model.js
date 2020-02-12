export class User {
  constructor(
    username,
    token,
    _expires_in,
    urlImage,
    createdAt = new Date(),
    dateInChannel = new Date()
  ) {
    this.username = username;
    this.createdAt = createdAt;
    this.dateInChannel = dateInChannel;
    this.urlImage = urlImage;
    this._token = token;
    this._expires_in = _expires_in;
  }

  get token() {
    if (!this._expires_in || new Date() > this._expires_in) {
      return null;
    }

    return this._id_token;
  }
}
