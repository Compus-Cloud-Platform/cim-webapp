Site.factory('PermissionSrv', ['$http', '$filter', 'ConfigConst', function ($http, $filter, ConfigConst) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();

  return {

    // insert permission
    insertPermission: function (data) {
      return $http
        .post(ConfigConst.urls.api + 'permissions', data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update permission
    updatePermission: function (permissionId, data) {
      return $http
        .put(ConfigConst.urls.api + 'permissions/' + permissionId, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete permission
    deletePermission: function (permissionId) {
      return $http
        .delete(ConfigConst.urls.api + 'permissions/' + permissionId, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one permission by id
    getPermissionById: function (permissionId) {
      return $http
        .get(ConfigConst.urls.api + 'permissions/' + permissionId, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get all permissions
    getAllPermissions: function () {
      return $http
        .get(ConfigConst.urls.api + 'permissions', {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
