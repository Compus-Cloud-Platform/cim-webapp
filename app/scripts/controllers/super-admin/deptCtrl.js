'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:DeptCtrl
 * @description
 * # DeptCtrl
 * Controller of the webApp
 */
Site.controller('DeptCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'DeptSrv', function ($scope, $state, $location, $stateParams, $q, DeptSrv) {
  console.log('DeptCtrl');

  var deptId = $stateParams.deptId;
  var path = $location.path();
  var userId = $scope.userData.id;

  if (path.indexOf('dept-list') > 0) {
    getAllDepts();
  }

  //
  if (deptId) {
    DeptSrv.getDeptById(deptId)
      .then(function (res) {
        if (res.ack == 'success') {
          var dept = res.data[0];
          dept.createDate = moment().format('LLLL');
          $scope.dept = dept;
        }
      });
  }

  $scope.checkAll = function () {
    $scope.selectedAll = !$scope.selectedAll;
    angular.forEach($scope.depts, function (item) {
      item.selected = $scope.selectedAll;
    });
  };

  $scope.deleteItems = function () {
    var promiseArray = [];
    var depts = _.filter($scope.depts, {'selected': true});
    _.forEach(depts, function (item) {
      promiseArray.push(DeptSrv.deleteDept(item.id));
    });
    $q.all(promiseArray)
      .then(function (responseArray) {
        if (responseArray.length == depts.length) {
          $scope.depts = _.xor($scope.depts, depts);
        }
      })
  };

  // create
  $scope.create = function () {
    var dept = $scope.form;
    dept.operId = userId;//TODO
    DeptSrv.insertDept(dept)
      .then(function (res) {
        if (res.ack == 'success') {
          var deptId = res.data.id;
          $state.go('super-admin.dept-detail', {id: userId, deptId: deptId});
        }
      });
  };

  // update
  $scope.update = function (deptId) {
    var dept = _.pick($scope.dept, ['name', 'code', 'phone', 'fax', 'address', 'webSite', 'description']);
    DeptSrv.updateDept(deptId, dept)
      .then(function (res) {
        if (res.ack == 'success') {
          $state.go('super-admin.dept-detail', {id: userId, deptId: deptId});
        }
      });
  };

  // Delete
  $scope.delete = function (deptId) {
    DeptSrv.deleteDept(deptId)
      .then(function (res) {
        if (res.ack == 'success') {
          var b = res.data;
          $state.go('super-admin.dept-list', {id: userId});
        }
      });
  };

  $scope.displayedCollection = [];
  function getAllDepts() {
    DeptSrv.getAllDepts()
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.rowCollection = res.data;
          $scope.depts = [].concat($scope.rowCollection);

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
