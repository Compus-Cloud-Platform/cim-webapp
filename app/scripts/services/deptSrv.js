Site.factory('DeptSrv', ['$http', '$filter', 'ConfigConst', function ($http, $filter, ConfigConst) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();

  return {

    // insert dept
    insertDept: function (data) {
      return $http
        .post(ConfigConst.urls.api + 'departments', data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update dept
    updateDept: function (deptId, data) {
      return $http
        .put(ConfigConst.urls.api + 'departments/' + deptId, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete dept
    deleteDept: function (deptId) {
      return $http
        .delete(ConfigConst.urls.api + 'departments/' + deptId, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one dept by id
    getDeptById: function (deptId) {
      return $http
        .get(ConfigConst.urls.api + 'departments/' + deptId, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get all depts
    getAllDepts: function () {
      return $http
        .get(ConfigConst.urls.api + 'departments', {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
