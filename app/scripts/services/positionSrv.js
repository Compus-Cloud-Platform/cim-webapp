Site.factory('PositionSrv', ['$http', '$filter', 'ConfigConst', '$cookieStore', function ($http, $filter, ConfigConst, $cookieStore) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();
  var user = $cookieStore.get('user');

  return {

    // insert position
    insertPosition: function (data) {
      return $http
        .post(ConfigConst.urls.api + 'positions', data, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update position
    updatePosition: function (id, data) {
      return $http
        .put(ConfigConst.urls.api + 'positions/' + id, data, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete position
    deletePosition: function (id) {
      return $http
        .delete(ConfigConst.urls.api + 'positions/' + id, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one position by id
    getPositionById: function (id) {
      return $http
        .get(ConfigConst.urls.api + 'positions/' + id, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get all positions
    getAllPositions: function () {
      return $http
        .get(ConfigConst.urls.api + 'positions', {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
