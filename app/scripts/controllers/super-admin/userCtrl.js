'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the webApp
 */
Site.controller('UserCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'UserSrv', function ($scope, $state, $location, $stateParams, $q, UserSrv) {
  console.log('UserCtrl');

  if(!$scope.userData) {
    $state.go('login');
    return;
  }

  var uId = $stateParams.uId;
  var path = $location.path();
  var userId = $scope.userData.id;

  if (path.indexOf('user-list') > 0) {
    getAllUsers();
  }

  //
  if (uId) {
    UserSrv.getUserById(uId)
      .then(function (res) {
        if (res.ack == 'success') {
          var user = res.data[0];
          user.createDate = moment().format('LLLL');
          $scope.user = user;
        }
      });
  }

  $scope.checkAll = function () {
    $scope.selectedAll = !$scope.selectedAll;
    angular.forEach($scope.users, function (item) {
      item.selected = $scope.selectedAll;
    });
  };

  $scope.deleteItems = function () {
    var promiseArray = [];
    var users = _.filter($scope.users, {'selected': true});
    _.forEach(users, function (item) {
      promiseArray.push(UserSrv.deleteUser(item.id));
    });
    $q.all(promiseArray)
      .then(function (responseArray) {
        if (responseArray.length == users.length) {
          $scope.users = _.xor($scope.users, users);
        }
      })
  };

  // create
  $scope.create = function () {
    var user = $scope.form;
    user.operId = userId;//TODO
    user.loginPassword = '123456';//TODO
    user.employDate = '2015-04-21 0:0:0';
    UserSrv.insertUser(user)
      .then(function (res) {
        if (res.ack == 'success') {
          var uId = res.data.id;
          $state.go('super-admin.user-detail', {id: userId, uId: uId});
        }
      });
  };

  // update
  $scope.update = function (uId) {
    var user = _.pick($scope.user, ['name', 'description']);
    UserSrv.updateUser(uId, user)
      .then(function (res) {
        if (res.ack == 'success') {
          $state.go('super-admin.user-detail', {id: userId, uId: uId});
        }
      });
  };

  // Delete
  $scope.delete = function (uId) {
    UserSrv.deleteUser(uId)
      .then(function (res) {
        if (res.ack == 'success') {
          var b = res.data;
          $state.go('super-admin.user-list', {id: userId});
        }
      });
  };

  function getAllUsers() {
    UserSrv.getAllUsers()
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.rowCollection = res.data;
          $scope.users = [].concat($scope.rowCollection);
          // default sort column
          $scope.getters = {
            name: function (value) {
              //this will sort by the length of the first name string
              return value.name.length;
            }
          };
        }//if
      });
  }

}]);
