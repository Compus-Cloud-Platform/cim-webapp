Site.factory('RoleSrv', ['$http', '$filter', 'ConfigConst', '$cookieStore', function ($http, $filter, ConfigConst, $cookieStore) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();
  var user = $cookieStore.get('user');

  return {

    // insert role
    insertRole: function (data) {
      return $http
        .post(ConfigConst.urls.api + 'roles', data, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update role
    updateRole: function (roleId, data) {
      return $http
        .put(ConfigConst.urls.api + 'roles/' + roleId, data, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete role
    deleteRole: function (roleId) {
      return $http
        .delete(ConfigConst.urls.api + 'roles/' + roleId, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one role by id
    getRoleById: function (roleId) {
      return $http
        .get(ConfigConst.urls.api + 'roles/' + roleId, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get all roles
    getAllRoles: function () {
      return $http
        .get(ConfigConst.urls.api + 'roles', {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
