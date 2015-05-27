'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:OrganizationManagerCtrl
 * @description
 * # OrganizationManagerCtrl
 * Controller of the webApp
 */
Site.controller('OrganizationManagerCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'OrganizationSrv', 'DeptSrv', 'MajorSrv', function ($scope, $state, $location, $stateParams, $q, OrganizationSrv, DeptSrv, MajorSrv) {
  console.log('OrganizationManagerCtrl');

  var orgId = $stateParams.orgId;
  var path = $location.path();
  var userId = $scope.userData.id;

  $scope.orgId = orgId;

  if (path.indexOf('org-map-manager') > 0) {
    //
    if (orgId) {
      DeptSrv.getAllDeptsByOrgId(orgId)
        .then(function (res) {
          if (res.ack == 'success') {
            $scope.rowCollection = res.data;
            $scope.orgDepts = [].concat($scope.rowCollection);

            // default get first majors
            if (res.data.length > 0) {
              var orgDeptMajor = res.data[0];
              MajorSrv.getAllMajorsByOrgDeptId(orgDeptMajor.id)
                .then(function (response) {
                  $scope.rowCollectionMajor = response.data;
                  $scope.orgDeptMajors = [].concat($scope.rowCollectionMajor);
                });
            }
          }//if
        });
    }

    $scope.checkAllMajors = function () {
      $scope.selectedAll = !$scope.selectedAll;
      angular.forEach($scope.orgDeptMajors, function (item) {
        item.selected = $scope.selectedAll;
      });
    };

    $scope.deleteMajors = function () {
      var promiseArray = [];
      var orgDeptMajors = _.filter($scope.orgDeptMajors, {'selected': true});
      _.forEach(orgDeptMajors, function (item) {
        promiseArray.push(MajorSrv.deleteOneMajorFromOrgDept(item.id));
      });
      $q.all(promiseArray)
        .then(function (responseArray) {
          if (responseArray.length == orgDeptMajors.length) {
            $scope.orgDeptMajors = _.xor($scope.orgDeptMajors, orgDeptMajors);
          }
        })
    };

  }// if org-map-manager > 0

  if (path.indexOf('org-map-dept') > 0) {

    var promiseArray = [];
    promiseArray.push(DeptSrv.getAllDepts());
    promiseArray.push(DeptSrv.getAllDeptsByOrgId(orgId));
    $q.all(promiseArray)
      .then(function (responseArray) {
        if (responseArray.length == 2) {
          var allOrgDepts = [];
          var allDepts = [];
          var temp1 = responseArray[0];
          var temp2 = responseArray[1];
          if (temp2.ack == 'success' && temp2.data.length > 0) {
            _.forEach(temp2.data, function (item) {
              allOrgDepts.push(item.department);
            });
          }
          if (temp1.ack == 'success' && temp1.data.length > 0) {
            allDepts = temp1.data;
          }
          $scope.availableDepts = _.filter(allDepts, function (item) {
            return !_.some(allOrgDepts, item)
          });
        }
      });
  }

  if (orgId) {
    OrganizationSrv.getOrganizationById(orgId)
      .then(function (res) {
        if (res.ack == 'success') {
          var organization = res.data[0];
          $scope.organization = organization;
        }
      });
  }

}]);
