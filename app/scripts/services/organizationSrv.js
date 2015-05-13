Site.factory('organizationSrv', ['$http', '$filter', 'ConfigConst', function ($http, $filter, ConfigConst) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();

  return {

    // insert organization
    insertOrganization: function (data) {
      return $http
        .post(ConfigConst.urls.api + 'organizations', data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update organization
    updateOrganization: function (orgId, data) {
      return $http
        .put(ConfigConst.urls.api + 'organizations/' + orgId, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete organization
    deleteOrganization: function (orgId) {
      return $http
        .delete(ConfigConst.urls.api + 'organizations/' + orgId, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one organization by id
    getOrganizationById: function (orgId) {
      return $http
        .get(ConfigConst.urls.api + 'organizations/' + orgId, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get all organizations
    getAllOrganizations: function () {
      return $http
        .get(ConfigConst.urls.api + 'organizations', {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
