'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:OrganizationCtrl
 * @description
 * # OrganizationCtrl
 * Controller of the webApp
 */
Site.controller('OrganizationCtrl', ['$scope', '$state','$location', '$stateParams', 'organizationSrv', function ($scope, $state, $location, $stateParams, organizationSrv) {
  console.log('OrganizationCtrl');

  var orgId = $stateParams.orgId;
  var path = $location.path();

  if (path.indexOf('org-list') > 0) {
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

  //
  if (orgId) {
    organizationSrv.getOrganizationById(orgId)
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.organization = res.data[0];
        }
      });
  }

}]);
