Site.factory('OrganizationSrv', ['$http', '$filter', 'ConfigConst', '$cookieStore', function ($http, $filter, ConfigConst, $cookieStore) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();
  var user = $cookieStore.get('user');

  return {

    // insert organization
    insertOrganization: function (data) {
      return $http
        .post(ConfigConst.urls.api + 'organizations', data, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update organization
    updateOrganization: function (orgId, data) {
      return $http
        .put(ConfigConst.urls.api + 'organizations/' + orgId, data, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete organization
    deleteOrganization: function (orgId) {
      return $http
        .delete(ConfigConst.urls.api + 'organizations/' + orgId, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one organization by id
    getOrganizationById: function (orgId) {
      return $http
        .get(ConfigConst.urls.api + 'organizations/' + orgId, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get all organizations
    getAllOrganizations: function () {
      return $http
        .get(ConfigConst.urls.api + 'organizations', {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
