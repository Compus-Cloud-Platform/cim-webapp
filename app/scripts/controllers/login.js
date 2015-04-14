'use strict';

/**
 * @ngdoc function
 * @name cimWebappApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the cimWebappApp
 */
Site.controller('LoginCtrl',['$scope', 'AuthSrv', '$state', function ($scope, AuthSrv, $state) {

  $scope.login = function () {
    AuthSrv.login($scope.form.user, $scope.form.pass)
      .then(function (session) {
        var user = session.data;

        var redirectUrl = undefined;
        if (redirectUrl) {
          $location.path(redirectUrl);
        } else {
          $state.go('teacher.center',{id: user.userId});
        }
      })
      .catch(function () {
        $scope.loginFailed = true;
      })
      .finally(function () {
        $scope.loggingIn = false;
      });
  };
}]);
