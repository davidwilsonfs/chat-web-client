export class SigninController {
  constructor(UsersService, ChannelsService, EventsService, $location) {
    ('ngInject');
    this.usersService = UsersService;
    this.channelsService = ChannelsService;
    this.eventsService = EventsService;
    this.$location = $location;
  }

  $onInit() {
    this.username = '';
    this.imageSelected = '';
  }

  attemptToLogin(obj) {
    this.usersService
      .registerUser(obj)
      .then(res => {
        const { data } = res;
        this.signin(obj, data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  signin(user, credential) {
    const { username } = user;

    this.usersService.setUserAndStorage(user, credential);
    this.channelsService.joinChannel('general');
    this.$location.path('/home');
    this.eventsService.addUser(username);
  }

  submit(isValid) {
    const { username, imageSelected } = this;
    const obj = {
      username,
      urlImage: imageSelected,
    };
    this.attemptToLogin(obj);
  }
}
