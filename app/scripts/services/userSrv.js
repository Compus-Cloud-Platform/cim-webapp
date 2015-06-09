Site.factory('UserSrv', ['$http', '$filter', 'ConfigConst', '$cookieStore', function ($http, $filter, ConfigConst,$cookieStore) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();
  var user = $cookieStore.get('user');

  return {

    // insert user
    insertUser: function (data) {
      return $http
        .post(ConfigConst.urls.api + 'users', data, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update user
    updateUser: function (id, data) {
      return $http
        .put(ConfigConst.urls.api + 'users/' + id, data, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete user
    deleteUser: function (id) {
      return $http
        .delete(ConfigConst.urls.api + 'users/' + id, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one user by id
    getUserById: function (id) {
      return $http
        .get(ConfigConst.urls.api + 'users/' + id, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get all users
    getAllUsers: function () {
      return $http
        .get(ConfigConst.urls.api + 'users', {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get org users by position id
    getOrgUsersByPositionId: function (posId, orgId) {
      return $http
        .get(ConfigConst.urls.api + 'users/position-id/' + posId + '/org-id/' + orgId + '/0/1000', {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
