describe('ChannelCardComponent', () => {
  beforeEach(angular.mock.module('app.ChannelCard'));

  let sut;

  beforeEach(
    angular.mock.inject(($rootScope, $componentController) => {
      const $scope = $rootScope.$new();
      sut = $componentController('appChannelCard', { $scope });
    })
  );

  describe('Channel Card component', () => {
    it('should be defined', () => {
      expect(sut).toBeDefined();
    });
  });
});
