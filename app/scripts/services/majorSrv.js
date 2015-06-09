Site.factory('MajorSrv', ['$http', '$filter', 'ConfigConst', '$cookieStore', function ($http, $filter, ConfigConst, $cookieStore) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();
  var user = $cookieStore.get('user');

  return {

    // insert major
    insertMajor: function (data) {
      return $http
        .post(ConfigConst.urls.api + 'majors', data, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update major
    updateMajor: function (majorId, data) {
      return $http
        .put(ConfigConst.urls.api + 'majors/' + majorId, data, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete major
    deleteMajor: function (majorId) {
      return $http
        .delete(ConfigConst.urls.api + 'majors/' + majorId, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one major by id
    getMajorById: function (majorId) {
      return $http
        .get(ConfigConst.urls.api + 'majors/' + majorId, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get all majors
    getAllMajors: function () {
      return $http
        .get(ConfigConst.urls.api + 'majors', {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get all majors by dept id
    getMajorsByDeptId: function (deptId) {
      return $http
        .get(ConfigConst.urls.api + 'majors/dept-id/' + deptId, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get all majors by org-dept id
    getAllMajorsByOrgDeptId: function (orgDeptId) {
      return $http
        .get(ConfigConst.urls.api + 'organization-department-majors/detp-org-id/' + orgDeptId, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // insert major into one org dept
    insertOneMajorToOrgDept: function (data) {
      return $http
        .post(ConfigConst.urls.api + 'organization-department-majors', data, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete one major from org dept
    deleteOneMajorFromOrgDept: function (orgDeptMajorId) {
      return $http
        .delete(ConfigConst.urls.api + 'organization-department-majors/' + orgDeptMajorId, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
