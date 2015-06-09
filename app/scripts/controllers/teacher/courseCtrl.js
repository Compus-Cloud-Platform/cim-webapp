'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:CourseManagerCtrl
 * @description
 * # CourseManagerCtrl
 * Controller of the webApp
 */
Site.controller('CourseManagerCtrl', ['$scope', '$filter', '$location', '$state', '$stateParams', '$q', 'CourseSrv', 'UserSrv', function ($scope, $filter, $location, $state, $stateParams, $q, CourseSrv, UserSrv) {
  console.log("CourseManagerCtrl");

  var path = $location.path();
  var userId = $scope.userData.id;

  if (path.indexOf('course-manager') > 0) {
    CourseSrv.getCoursesByTeacherId(userId)
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.rowCollection = res.data;
          $scope.teacherCourses = [].concat($scope.rowCollection);
        }//if
      });

    $scope.deleteTeacherCourse = function (teacherCourseId) {
      CourseSrv.getStudentsByTeacherCourseId(teacherCourseId)
        .then(function (res) {
          if (res.ack == 'success') {
            if (res.data.length > 0) {
              alert('不能删除！');
              return;
            } else {
              CourseSrv.deleteTeacherCourse(teacherCourseId)
                .then(function (res) {
                  if (res && res.ack == 'success') {
                    var remainTeacherCourses = _.filter($scope.teacherCourses, function (item) {
                      return item.id != teacherCourseId;
                    });
                    $scope.rowCollection = remainTeacherCourses;
                    $scope.teacherCourses = [].concat($scope.rowCollection);
                  }
                })
            }
          }
        });
    };
  }

  if (path.indexOf('course-add') > 0) {
    CourseSrv.getAllCourses()
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.allCourses = res.data;
        }
      });

    $scope.schoolYears = [
      {id: '2014', name: '2014'},
      {id: '2015', name: '2015'},
      {id: '2016', name: '2016'},
      {id: '2017', name: '2017'}
    ];

    $scope.terms = [
      {id: 1, name: '上学期'},
      {id: 2, name: '下学期'},
      {id: 3, name: '上下学期'}
    ];

    // create
    $scope.create = function () {
      var course = $scope.form;
      course.loginId = userId;
      course.operId = userId;//TODO
      CourseSrv.insertTeacherCourse(course)
        .then(function (res) {
          if (res.ack == 'success') {
            var courseId = res.data.id;
            $state.go('teacher.course-manager', {id: userId});
          }
        });
    };
  } //end course-add

  if (path.indexOf('student-course') > 0) {
    $scope.teacherCourseId = $stateParams.teacherCourseId;

    CourseSrv.getStudentsByTeacherCourseId($scope.teacherCourseId)
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.rowCollection = res.data;
          $scope.studentsByCourse = res.data;
        }
      });

    $scope.checkAll = function () {
      $scope.selectedAll = !$scope.selectedAll;
      angular.forEach($scope.studentsByCourse, function (item) {
        item.selected = $scope.selectedAll;
      });
    };

    $scope.deleteItems = function () {
      var promiseArray = [];
      var students = _.filter($scope.studentsByCourse, {'selected': true});
      _.forEach(students, function (item) {
        promiseArray.push(CourseSrv.deleteStudentFromCourse(item.id));
        // TODO delete group map
      });
      $q.all(promiseArray)
        .then(function (responseArray) {
          if (responseArray.length == students.length) {
            $scope.studentsByCourse = _.xor($scope.studentsByCourse, students);
          }
        })
    };

  }

  if (path.indexOf('student-add') > 0) {
    $scope.teacherCourseId = $stateParams.teacherCourseId;
    var positionId = 11; // student
    var promiseArray = [];
    promiseArray.push(CourseSrv.getStudentsByTeacherCourseId($scope.teacherCourseId));
    promiseArray.push(UserSrv.getOrgUsersByPositionId(positionId, 1));
    $q.all(promiseArray)
      .then(function (res) {
        if (res.length == promiseArray.length) {
          if (res[0].ack == 'success') {
            var users = _.pluck(res[0].data, 'user');
          }
          if (res[1].ack == 'success') {
            var allUsers = res[1].data;
          }
          var remainedUsers = _.filter(allUsers, function (item) {
            return !_.some(users, item)
          });
          $scope.rowCollection = remainedUsers;
          $scope.availableStudents = remainedUsers;
        }
      });
    // create
    $scope.create = function () {
      var newStudents = $scope.newStudents;
      var promiseArray = [];
      _.forEach(newStudents, function (item) {
        var obj = {loginId: item, teacherCourseId: $scope.teacherCourseId, operId: userId };
        promiseArray.push(CourseSrv.insertStudentToCourse(obj));
      });
      $q.all(promiseArray)
        .then(function (responseArray) {
          if (responseArray.length == promiseArray.length) {
            $state.go('teacher.student-course', {id: userId, teacherCourseId: $scope.teacherCourseId});
          }
        });
    };
  }

  if (path.indexOf('seat-edit') > 0) {
    $scope.teacherCourseId = $stateParams.teacherCourseId;

    CourseSrv.getStudentsByTeacherCourseId($scope.teacherCourseId)
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.studentsByCourse = res.data;
        }
      });

    $scope.updateSeat = function () {
      var promiseArray = [];
      angular.forEach($scope.studentsByCourse, function (item) {
        promiseArray.push(CourseSrv.updateStudentInfoForCourse(item.id, {setnum: item.newSeat}));
      });
      $q.all(promiseArray)
        .then(function (responseArray) {
          if (responseArray.length == promiseArray.length) {
            alert('success');
          }
        });
    };
  }

}]);
