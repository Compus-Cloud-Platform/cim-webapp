'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MajorCtrl
 * @description
 * # MajorCtrl
 * Controller of the webApp
 */
Site.controller('MajorCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'MajorSrv', 'DeptSrv', function ($scope, $state, $location, $stateParams, $q, MajorSrv, DeptSrv) {
  console.log('MajorCtrl');

  var majorId = $stateParams.majorId;
  var path = $location.path();
  var userId = $scope.userData.id;

  if (path.indexOf('major-list') > 0) {
    getAllMajors();
  }

  //
  if (majorId) {
    MajorSrv.getMajorById(majorId)
      .then(function (res) {
        if (res.ack == 'success') {
          var major = res.data[0];
          major.createDate = moment().format('LLLL');
          $scope.major = major;
        }
      });
  }

  $scope.checkAll = function () {
    $scope.selectedAll = !$scope.selectedAll;
    angular.forEach($scope.majors, function (item) {
      item.selected = $scope.selectedAll;
    });
  };

  $scope.deleteItems = function () {
    var promiseArray = [];
    var majors = _.filter($scope.majors, {'selected': true});
    _.forEach(majors, function (item) {
      promiseArray.push(MajorSrv.deleteMajor(item.id));
    });
    $q.all(promiseArray)
      .then(function (responseArray) {
        if (responseArray.length == majors.length) {
          $scope.majors = _.xor($scope.majors, majors);
        }
      })
  };

  // create
  $scope.create = function () {
    var major = $scope.form;
    major.operId = userId;//TODO
    MajorSrv.insertMajor(major)
      .then(function (res) {
        if (res.ack == 'success') {
          var majorId = res.data.id;
          $state.go('super-admin.major-detail', {id: userId, majorId: majorId});
        }
      });
  };

  // update
  $scope.update = function (majorId) {
    var major = _.pick($scope.major, ['name', 'code', 'phone', 'fax', 'address', 'webSite', 'description']);
    MajorSrv.updateMajor(majorId, major)
      .then(function (res) {
        if (res.ack == 'success') {
          $state.go('super-admin.major-detail', {id: userId, majorId: majorId});
        }
      });
  };

  // Delete
  $scope.delete = function (majorId) {
    MajorSrv.deleteMajor(majorId)
      .then(function (res) {
        if (res.ack == 'success') {
          var b = res.data;
          $state.go('super-admin.major-list', {id: userId});
        }
      });
  };

  function getAllMajors() {
    MajorSrv.getAllMajors()
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.rowCollection = res.data;
          $scope.majors = [].concat($scope.rowCollection);
          // default sort column
          $scope.getters = {
            name: function (value) {
              //this will sort by the length of the first name string
              return value.name.length;
            }
          };
        }//if
      });
  };

  DeptSrv.getAllDepts()
    .then(function (res) {
      if (res.ack == 'success') {
        $scope.availableDepts = res.data;
        $scope.selectedDept = $scope.availableDepts[0];
      }//if
    });

}]);
