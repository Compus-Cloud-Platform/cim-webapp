Site.factory('CourseSrv', ['$http', '$filter', 'ConfigConst', '$cookieStore', function ($http, $filter, ConfigConst, $cookieStore) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();
  var user = $cookieStore.get('user');

  return {

    // insert course
    insertCourse: function (data) {
      return $http
        .post(ConfigConst.urls.api + 'courses', data, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update course
    updateCourse: function (courseId, data) {
      return $http
        .put(ConfigConst.urls.api + 'courses/' + courseId, data, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete course
    deleteCourse: function (courseId) {
      return $http
        .delete(ConfigConst.urls.api + 'courses/' + courseId, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one course by id
    getCourseById: function (courseId) {
      return $http
        .get(ConfigConst.urls.api + 'courses/' + courseId, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get all courses
    getAllCourses: function () {
      return $http
        .get(ConfigConst.urls.api + 'courses', {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // insert teacher course
    insertTeacherCourse: function (data) {
      return $http
        .post(ConfigConst.urls.api + 'teacher-courses', data, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete teacher course
    deleteTeacherCourse: function (teacherCourseId) {
      return $http
        .delete(ConfigConst.urls.api + 'teacher-courses/' + teacherCourseId, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one course by id
    getCoursesByTeacherId: function (teacherId) {
      return $http
        .get(ConfigConst.urls.api + 'teacher-courses/login-id/' + teacherId, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // insert a student to course
    insertStudentToCourse: function (data) {
      return $http
        .post(ConfigConst.urls.api + 'student-courses', data, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update student info
    updateStudentInfoForCourse: function (studentCourseId, data) {
      return $http
        .put(ConfigConst.urls.api + 'student-courses/' + studentCourseId, data, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete a student from course
    deleteStudentFromCourse: function (studentCourseId) {
      return $http
        .delete(ConfigConst.urls.api + 'student-courses/' + studentCourseId, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get students by teacher course id
    getStudentsByTeacherCourseId: function (teacherCourseId) {
      return $http
        .get(ConfigConst.urls.api + 'student-courses/teacher-course-id/' + teacherCourseId, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get students by teacher course group id
    getStudentsByTeacherCourseGroupId: function (teacherCourseGroupId) {
      return $http
        .get(ConfigConst.urls.api + 'student-courses/teacher-course-group-id/' + teacherCourseGroupId, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get courses by student id
    getCoursesByStudentId: function (studentId) {
      return $http
        .get(ConfigConst.urls.api + 'student-courses/login-id/' + studentId, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
