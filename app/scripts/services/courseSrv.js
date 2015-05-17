Site.factory('CourseSrv', ['$http', '$filter', 'ConfigConst', function ($http, $filter, ConfigConst) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();

  return {

    // insert course
    insertCourse: function (data) {
      return $http
        .post(ConfigConst.urls.api + 'courses', data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update course
    updateCourse: function (courseId, data) {
      return $http
        .put(ConfigConst.urls.api + 'courses/' + courseId, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete course
    deleteCourse: function (courseId) {
      return $http
        .delete(ConfigConst.urls.api + 'courses/' + courseId, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one course by id
    getCourseById: function (courseId) {
      return $http
        .get(ConfigConst.urls.api + 'courses/' + courseId, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get all courses
    getAllCourses: function () {
      return $http
        .get(ConfigConst.urls.api + 'courses', {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
