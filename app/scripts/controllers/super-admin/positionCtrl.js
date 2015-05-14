'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:PositionCtrl
 * @description
 * # PositionCtrl
 * Controller of the webApp
 */
Site.controller('PositionCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'PositionSrv', function ($scope, $state, $location, $stateParams, $q, PositionSrv) {
  console.log('PositionCtrl');

  var posId = $stateParams.posId;
  var path = $location.path();
  var userId = $scope.userData.id;

  if (path.indexOf('position-list') > 0) {
    getAllPositions();
  }

  //
  if (posId) {
    PositionSrv.getPositionById(posId)
      .then(function (res) {
        if (res.ack == 'success') {
          var position = res.data[0];
          position.createDate = moment().format('LLLL');
          $scope.position = position;
        }
      });
  }

  $scope.checkAll = function () {
    $scope.selectedAll = !$scope.selectedAll;
    angular.forEach($scope.positions, function (item) {
      item.selected = $scope.selectedAll;
    });
  };

  $scope.deleteItems = function () {
    var promiseArray = [];
    var positions = _.filter($scope.positions, {'selected': true});
    _.forEach(positions, function (item) {
      promiseArray.push(PositionSrv.deletePosition(item.id));
    });
    $q.all(promiseArray)
      .then(function (responseArray) {
        if (responseArray.length == positions.length) {
          $scope.positions = _.xor($scope.positions, positions);
        }
      })
  };

  // create
  $scope.create = function () {
    var position = $scope.form;
    position.operId = userId;//TODO
    PositionSrv.insertPosition(position)
      .then(function (res) {
        if (res.ack == 'success') {
          var posId = res.data.id;
          $state.go('super-admin.position-detail', {id: userId, posId: posId});
        }
      });
  };

  // update
  $scope.update = function (posId) {
    var position = _.pick($scope.position, ['name', 'description']);
    PositionSrv.updatePosition(posId, position)
      .then(function (res) {
        if (res.ack == 'success') {
          $state.go('super-admin.position-detail', {id: userId, posId: posId});
        }
      });
  };

  // Delete
  $scope.delete = function (posId) {
    PositionSrv.deletePosition(posId)
      .then(function (res) {
        if (res.ack == 'success') {
          var b = res.data;
          $state.go('super-admin.position-list', {id: userId});
        }
      });
  };

  function getAllPositions() {
    PositionSrv.getAllPositions()
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.positions = res.data;
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
