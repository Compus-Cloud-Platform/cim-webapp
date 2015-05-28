Site.factory('MajorSrv', ['$http', '$filter', 'ConfigConst', function ($http, $filter, ConfigConst) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();

  return {

    // insert major
    insertMajor: function (data) {
      return $http
        .post(ConfigConst.urls.api + 'majors', data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update major
    updateMajor: function (majorId, data) {
      return $http
        .put(ConfigConst.urls.api + 'majors/' + majorId, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete major
    deleteMajor: function (majorId) {
      return $http
        .delete(ConfigConst.urls.api + 'majors/' + majorId, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one major by id
    getMajorById: function (majorId) {
      return $http
        .get(ConfigConst.urls.api + 'majors/' + majorId, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get all majors
    getAllMajors: function () {
      return $http
        .get(ConfigConst.urls.api + 'majors', {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get all majors by dept id
    getMajorsByDeptId: function (deptId) {
      return $http
        .get(ConfigConst.urls.api + 'majors/dept-id/' + deptId, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get all majors by org-dept id
    getAllMajorsByOrgDeptId: function (orgDeptId) {
      return $http
        .get(ConfigConst.urls.api + 'organization-department-majors/detp-org-id/' + orgDeptId, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // insert major into one org dept
    insertOneMajorToOrgDept: function (data) {
      return $http
        .post(ConfigConst.urls.api + 'organization-department-majors', data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete one major from org dept
    deleteOneMajorFromOrgDept: function (orgDeptMajorId) {
      return $http
        .delete(ConfigConst.urls.api + 'organization-department-majors/' + orgDeptMajorId, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
