'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:PermissionCtrl
 * @description
 * # PermissionCtrl
 * Controller of the webApp
 */
Site.controller('PermissionCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'PermissionSrv', function ($scope, $state, $location, $stateParams, $q, PermissionSrv) {
  console.log('PermissionCtrl');

  var permissionId = $stateParams.permissionId;
  var path = $location.path();
  var userId = $scope.userData.id;

  if (path.indexOf('permission-list') > 0) {
    getAllOrgs();
  }

  //
  if (permissionId) {
    PermissionSrv.getPermissionById(permissionId)
      .then(function (res) {
        if (res.ack == 'success') {
          var permission = res.data[0];
          permission.createDate = moment().format('LLLL');
          $scope.permission = permission;
        }
      });
  }

  $scope.checkAll = function () {
    $scope.selectedAll = !$scope.selectedAll;
    angular.forEach($scope.permissions, function (item) {
      item.selected = $scope.selectedAll;
    });
  };

  $scope.deleteItems = function () {
    var promiseArray = [];
    var permissions = _.filter($scope.permissions, {'selected': true});
    _.forEach(permissions, function (item) {
      promiseArray.push(PermissionSrv.deletePermission(item.id));
    });
    $q.all(promiseArray)
      .then(function (responseArray) {
        if (responseArray.length == permissions.length) {
          $scope.permissions = _.xor($scope.permissions, permissions);
        }
      })
  };

  // create
  $scope.create = function () {
    var permission = $scope.form;
    permission.operId = userId;//TODO
    PermissionSrv.insertPermission(permission)
      .then(function (res) {
        if (res.ack == 'success') {
          var permissionId = res.data.id;
          $state.go('super-admin.permission-detail', {id: userId, permissionId: permissionId});
        }
      });
  };

  // update
  $scope.update = function (permissionId) {
    var permission = _.pick($scope.permission, ['name', 'code', 'phone', 'fax', 'address', 'webSite', 'description']);
    PermissionSrv.updatePermission(permissionId, permission)
      .then(function (res) {
        if (res.ack == 'success') {
          $state.go('super-admin.permission-detail', {id: userId, permissionId: permissionId});
        }
      });
  };

  // Delete
  $scope.delete = function (permissionId) {
    PermissionSrv.deletePermission(permissionId)
      .then(function (res) {
        if (res.ack == 'success') {
          var b = res.data;
          $state.go('super-admin.permission-list', {id: userId});
        }
      });
  };

  function getAllOrgs() {
    PermissionSrv.getAllPermissions()
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.permissions = res.data;
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
