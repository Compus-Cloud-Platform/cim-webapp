Site.factory('PositionSrv', ['$http', '$filter', 'ConfigConst', function ($http, $filter, ConfigConst) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();

  return {

    // insert position
    insertPosition: function (data) {
      return $http
        .post(ConfigConst.urls.api + 'positions', data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update position
    updatePosition: function (id, data) {
      return $http
        .put(ConfigConst.urls.api + 'positions/' + id, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete position
    deletePosition: function (id) {
      return $http
        .delete(ConfigConst.urls.api + 'positions/' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one position by id
    getPositionById: function (id) {
      return $http
        .get(ConfigConst.urls.api + 'positions/' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get all positions
    getAllPositions: function () {
      return $http
        .get(ConfigConst.urls.api + 'positions', {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
