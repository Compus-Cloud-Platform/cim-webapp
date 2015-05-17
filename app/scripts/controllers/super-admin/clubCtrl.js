'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:ClubCtrl
 * @description
 * # ClubCtrl
 * Controller of the webApp
 */
Site.controller('ClubCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'ClubSrv', function ($scope, $state, $location, $stateParams, $q, ClubSrv) {
  console.log('ClubCtrl');

  var clubId = $stateParams.clubId;
  var path = $location.path();
  var userId = $scope.userData.id;

  if (path.indexOf('club-list') > 0) {
    getAllOrgs();
  }

  //
  if (clubId) {
    ClubSrv.getClubById(clubId)
      .then(function (res) {
        if (res.ack == 'success') {
          var club = res.data[0];
          club.createDate = moment().format('LLLL');
          $scope.club = club;
        }
      });
  }

  $scope.checkAll = function () {
    $scope.selectedAll = !$scope.selectedAll;
    angular.forEach($scope.clubs, function (item) {
      item.selected = $scope.selectedAll;
    });
  };

  $scope.deleteItems = function () {
    var promiseArray = [];
    var clubs = _.filter($scope.clubs, {'selected': true});
    _.forEach(clubs, function (item) {
      promiseArray.push(ClubSrv.deleteClub(item.id));
    });
    $q.all(promiseArray)
      .then(function (responseArray) {
        if (responseArray.length == clubs.length) {
          $scope.clubs = _.xor($scope.clubs, clubs);
        }
      })
  };

  // create
  $scope.create = function () {
    var club = $scope.form;
    club.operId = userId;//TODO
    ClubSrv.insertClub(club)
      .then(function (res) {
        if (res.ack == 'success') {
          var clubId = res.data.id;
          $state.go('super-admin.club-detail', {id: userId, clubId: clubId});
        }
      });
  };

  // update
  $scope.update = function (clubId) {
    var club = _.pick($scope.club, ['name', 'code', 'phone', 'fax', 'address', 'webSite', 'description']);
    ClubSrv.updateClub(clubId, club)
      .then(function (res) {
        if (res.ack == 'success') {
          $state.go('super-admin.club-detail', {id: userId, clubId: clubId});
        }
      });
  };

  // Delete
  $scope.delete = function (clubId) {
    ClubSrv.deleteClub(clubId)
      .then(function (res) {
        if (res.ack == 'success') {
          var b = res.data;
          $state.go('super-admin.club-list', {id: userId});
        }
      });
  };

  function getAllOrgs() {
    ClubSrv.getAllClubs()
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.clubs = res.data;
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
