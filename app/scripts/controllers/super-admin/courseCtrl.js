'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:CourseCtrl
 * @description
 * # CourseCtrl
 * Controller of the webApp
 */
Site.controller('CourseCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'CourseSrv', function ($scope, $state, $location, $stateParams, $q, CourseSrv) {
  console.log('CourseCtrl');

  if(!$scope.userData) {
    $state.go('login');
    return;
  }

  var courseId = $stateParams.courseId;
  var path = $location.path();
  var userId = $scope.userData.id;

  if (path.indexOf('course-list') > 0) {
    getAllCourses();
  }

  //
  if (courseId) {
    CourseSrv.getCourseById(courseId)
      .then(function (res) {
        if (res.ack == 'success') {
          var course = res.data[0];
          course.createDate = moment().format('LLLL');
          $scope.course = course;
        }
      });
  }

  $scope.checkAll = function () {
    $scope.selectedAll = !$scope.selectedAll;
    angular.forEach($scope.courses, function (item) {
      item.selected = $scope.selectedAll;
    });
  };

  $scope.deleteItems = function () {
    var promiseArray = [];
    var courses = _.filter($scope.courses, {'selected': true});
    _.forEach(courses, function (item) {
      promiseArray.push(CourseSrv.deleteCourse(item.id));
    });
    $q.all(promiseArray)
      .then(function (responseArray) {
        if (responseArray.length == courses.length) {
          $scope.courses = _.xor($scope.courses, courses);
        }
      })
  };

  // create
  $scope.create = function () {
    var course = $scope.form;
    course.operId = userId;//TODO
    CourseSrv.insertCourse(course)
      .then(function (res) {
        if (res.ack == 'success') {
          var courseId = res.data.id;
          $state.go('super-admin.course-detail', {id: userId, courseId: courseId});
        }
      });
  };

  // update
  $scope.update = function (courseId) {
    var course = _.pick($scope.course, ['name', 'code', 'phone', 'fax', 'address', 'webSite', 'description']);
    CourseSrv.updateCourse(courseId, course)
      .then(function (res) {
        if (res.ack == 'success') {
          $state.go('super-admin.course-detail', {id: userId, courseId: courseId});
        }
      });
  };

  // Delete
  $scope.delete = function (courseId) {
    CourseSrv.deleteCourse(courseId)
      .then(function (res) {
        if (res.ack == 'success') {
          var b = res.data;
          $state.go('super-admin.course-list', {id: userId});
        }
      });
  };

  function getAllCourses() {
    CourseSrv.getAllCourses()
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.rowCollection = res.data;
          $scope.courses = [].concat($scope.rowCollection);
          // default sort column
          $scope.getters = {
            name: function (value) {
              //this will sort by the length of the first name string
              return value.name.length;
            }
          };
        }//if
      });
  }

}]);
