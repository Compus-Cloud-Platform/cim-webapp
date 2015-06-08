Site.factory('CourseGroupSrv', ['$http', '$filter', 'ConfigConst', function ($http, $filter, ConfigConst) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();

  return {

    // insert course Group
    insertCourseGroup: function (data) {
      return $http
        .post(ConfigConst.urls.api + 'teacher-course-groups', data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update course Group
    updateCourseGroup: function (groupId, data) {
      return $http
        .put(ConfigConst.urls.api + 'teacher-course-groups/' + groupId, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete course Group
    deleteCourseGroup: function (groupId) {
      return $http
        .delete(ConfigConst.urls.api + 'teacher-course-groups/' + groupId, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one course group by id
    getCourseGroupById: function (groupId) {
      return $http
        .get(ConfigConst.urls.api + 'teacher-course-groups/' + groupId, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get course groups by teacher course id
    getCourseGroupsByTeacherCourseId: function (id) {
      return $http
        .get(ConfigConst.urls.api + 'teacher-course-groups/teacher-course-id/' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // insert course Group
    insertStudentCourseGroup: function (data) {
      return $http
        .post(ConfigConst.urls.api + 'student-course-groups', data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update course Group
    updateStudentCourseGroup: function (studentId, data) {
      return $http
        .put(ConfigConst.urls.api + 'student-course-groups/' + studentId, data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete course Group
    deleteStudentCourseGroup: function (studentId) {
      return $http
        .delete(ConfigConst.urls.api + 'student-course-groups/' + studentId, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one course group by id
    getStudentCourseGroupById: function (studentId) {
      return $http
        .get(ConfigConst.urls.api + 'student-course-groups/' + studentId, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get course groups by teacher course id
    getStudentCourseGroupsByTeacherCourseGroupId: function (id) {
      return $http
        .get(ConfigConst.urls.api + 'student-course-groups/teacher-course-group-id/' + id, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
