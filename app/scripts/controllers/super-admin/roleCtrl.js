'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:RoleCtrl
 * @description
 * # RoleCtrl
 * Controller of the webApp
 */
Site.controller('RoleCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'RoleSrv', function ($scope, $state, $location, $stateParams, $q, RoleSrv) {
  console.log('RoleCtrl');

  var roleId = $stateParams.roleId;
  var path = $location.path();
  var userId = $scope.userData.id;

  if (path.indexOf('role-list') > 0) {
    getAllOrgs();
  }

  //
  if (roleId) {
    RoleSrv.getRoleById(roleId)
      .then(function (res) {
        if (res.ack == 'success') {
          var role = res.data[0];
          role.createDate = moment().format('LLLL');
          $scope.role = role;
        }
      });
  }

  $scope.checkAll = function () {
    $scope.selectedAll = !$scope.selectedAll;
    angular.forEach($scope.roles, function (item) {
      item.selected = $scope.selectedAll;
    });
  };

  $scope.deleteItems = function () {
    var promiseArray = [];
    var roles = _.filter($scope.roles, {'selected': true});
    _.forEach(roles, function (item) {
      promiseArray.push(RoleSrv.deleteRole(item.id));
    });
    $q.all(promiseArray)
      .then(function (responseArray) {
        if (responseArray.length == roles.length) {
          $scope.roles = _.xor($scope.roles, roles);
        }
      })
  };

  // create
  $scope.create = function () {
    var role = $scope.form;
    role.operId = userId;//TODO
    RoleSrv.insertRole(role)
      .then(function (res) {
        if (res.ack == 'success') {
          var roleId = res.data.id;
          $state.go('super-admin.role-detail', {id: userId, roleId: roleId});
        }
      });
  };

  // update
  $scope.update = function (roleId) {
    var role = _.pick($scope.role, ['name', 'code', 'phone', 'fax', 'address', 'webSite', 'description']);
    RoleSrv.updateRole(roleId, role)
      .then(function (res) {
        if (res.ack == 'success') {
          $state.go('super-admin.role-detail', {id: userId, roleId: roleId});
        }
      });
  };

  // Delete
  $scope.delete = function (roleId) {
    RoleSrv.deleteRole(roleId)
      .then(function (res) {
        if (res.ack == 'success') {
          var b = res.data;
          $state.go('super-admin.role-list', {id: userId});
        }
      });
  };

  function getAllOrgs() {
    RoleSrv.getAllRoles()
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.roles = res.data;
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
