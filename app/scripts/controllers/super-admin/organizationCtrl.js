'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:OrganizationCtrl
 * @description
 * # OrganizationCtrl
 * Controller of the webApp
 */
Site.controller('OrganizationCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'organizationSrv', function ($scope, $state, $location, $stateParams, $q, organizationSrv) {
  console.log('OrganizationCtrl');

  var orgId = $stateParams.orgId;
  var path = $location.path();
  var userId = $scope.userData.id;

  if (path.indexOf('org-list') > 0) {
    getAllOrgs();
  }

  //
  if (orgId) {
    organizationSrv.getOrganizationById(orgId)
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.organization = res.data[0];
        }
      });
  }

  $scope.checkAll = function () {
    $scope.selectedAll = !$scope.selectedAll;
    angular.forEach($scope.organizations, function (item) {
      item.selected = $scope.selectedAll;
    });
  };

  $scope.deleteItems = function () {
    var promiseArray = [];
    var organizations = _.filter($scope.organizations, {'selected': true});
    _.forEach(organizations, function (item) {
      promiseArray.push(organizationSrv.deleteOrganization(item.id));
    });
    $q.all(promiseArray)
      .then(function (responseArray) {
        if (responseArray.length == organizations.length) {
          $scope.organizations = _.xor($scope.organizations, organizations);
        }
      })
  };

  // create
  $scope.create = function () {
    var organization = $scope.form;
    organization.operId = userId;//TODO
    organizationSrv.insertOrganization(organization)
      .then(function (res) {
        if (res.ack == 'success') {
          var orgId = res.data.id;
          $state.go('super-admin.org-detail', {id: userId, orgId: orgId});
        }
      });
  };

  // update
  $scope.update = function (orgId) {
    var organization = _.pick($scope.organization, ['name', 'code', 'phone', 'fax', 'address', 'webSite', 'description']);
    organizationSrv.updateOrganization(orgId, organization)
      .then(function (res) {
        if (res.ack == 'success') {
          $state.go('super-admin.org-detail', {id: userId, orgId: orgId});
        }
      });
  };

  // Delete
  $scope.delete = function (orgId) {
    organizationSrv.deleteOrganization(orgId)
      .then(function (res) {
        if (res.ack == 'success') {
          var b = res.data;
          $state.go('super-admin.org-list', {id: userId});
        }
      });
  };

  function getAllOrgs() {
    organizationSrv.getAllOrganizations()
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.organizations = res.data;
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
