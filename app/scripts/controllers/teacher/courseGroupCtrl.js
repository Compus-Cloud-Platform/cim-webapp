'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:CourseGroupCtrl
 * @description
 * # CourseGroupCtrl
 * Controller of the webApp
 */
Site.controller('CourseGroupCtrl', ['$scope', '$filter', '$location', '$state', '$stateParams', '$q', 'CourseSrv', 'CourseGroupSrv', function ($scope, $filter, $location, $state, $stateParams, $q, CourseSrv, CourseGroupSrv) {
  console.log("CourseGroupCtrl");

  var path = $location.path();
  var userId = $scope.userData.id;
  var teacherCourseId = $stateParams.teacherCourseId;

  CourseGroupSrv.getCourseGroupsByTeacherCourseId(teacherCourseId)
    .then(function (res) {
      if (res.ack == 'success') {
        $scope.groupsByCourse = res.data;
        $scope.groupsByCourse.unshift({id: 0, name: '未分组'});

        $scope.selectedGroup = $scope.groupsByCourse[0];
        $scope.selectedMoveGroup = $scope.groupsByCourse[0];
        $scope.selectedGroupStudents = [];
      }
    });

  $scope.changeSelectedGroupStudents = function () {
    var selected = $scope.selectedGroup;
    CourseSrv.getStudentsByTeacherCourseGroupId(selected.id)
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.selectedGroupStudents = res.data;
        }
      });
  };

  $scope.changeGroup = function () {
    var promiseArray = [];
    var students = _.filter($scope.studentsByCourse, function (item) {
      return item.selected;
    });
    angular.forEach(students, function (item) {
      promiseArray.push(CourseSrv.updateStudentInfoForCourse(item.id, {teacherCourseGroupId: $scope.selectedMoveGroup.id}));
    });
    $q.all(promiseArray)
      .then(function (responseArray) {
        if (responseArray.length == promiseArray.length) {
          getStudentsByTeacherCourseId();
        }
      });

  };


  $scope.checkAll = function () {
    angular.forEach($scope.studentsByCourse, function (item) {
      item.selected = !$scope.checkedAll;
    });

  };

  // group page

  /*
   ** negative: default is undefined, or else is reverse direction
   */
  $scope.moveItems = function (items, from, to, negative) {

    if (_.isObject(items) && !_.isArray(items)) {
      items = [items];
    }
    angular.forEach(items, function (item) {
      var idx = from.indexOf(item);
      if (idx != -1) {
        from.splice(idx, 1);
        to.push(item);
      }
    });
    refreshModel(items);
  };

  $scope.moveAll = function (from, to, negative) {

    console.log('Move all  From:: ' + from + ' To:: ' + to);
    //Here from is returned as blank and to as undefined

    angular.forEach(from, function (item) {
      to.push(item);
    });
    refreshModel(from);
    from.length = 0;
  };

  function refreshModel(items) {

    if ($scope.selectedGroup.id == -1) {
      var group = {name: $scope.newGroupName, teacherCourseId: teacherCourseId};
      CourseGroupSrv.insertCourseGroup(group)
        .then(function (res) {
          if (res.ack == 'success') {
            var groupId = res.data.id;
            CourseGroupSrv.getCourseGroupsByTeacherCourseId(teacherCourseId)
              .then(function (res) {
                if (res.ack == 'success') {
                  $scope.groupsByCourse = res.data;
                  $scope.groupsByCourse.unshift({id: 0, name: '未分组'});
                  $scope.selectedGroup = _.find($scope.groupsByCourse, function (item) {
                    return item.id == groupId;
                  });
                }
              });
            var promiseArray = [];
            angular.forEach(items, function (item) {
              promiseArray.push(CourseSrv.updateStudentInfoForCourse(item.id, {teacherCourseGroupId: groupId}));
//              promiseArray.push(CourseGroupSrv.insertStudentCourseGroup({studentId:item.user.id, teacherCourseGroupId: groupId}));
            });
            $q.all(promiseArray)
              .then(function (responseArray) {
                if (responseArray.length == promiseArray.length) {
                  alert('success');
                }
              });
          }//end insert group
        });

    } else {
      var negative = items[0].teacherCourseGroupId;
      var promiseArray = [];
      var obj = {};
      angular.forEach(items, function (item) {
        if (!negative) {
          obj.teacherCourseGroupId = $scope.selectedGroup.id;
//          promiseArray.push(CourseGroupSrv.insertStudentCourseGroup({studentId:item.user.id, teacherCourseGroupId: $scope.selectedGroup.id}));
        } else {
          obj.teacherCourseGroupId = 0;
//          promiseArray.push(CourseGroupSrv.deleteStudentCourseGroup(1)); //TODO
        }
        promiseArray.push(CourseSrv.updateStudentInfoForCourse(item.id, obj));

      });
      $q.all(promiseArray)
        .then(function (responseArray) {
          if (responseArray.length == promiseArray.length) {
            getStudentsByTeacherCourseId();
          }
        });
    }
  }

  function getStudentsByTeacherCourseId() {
    CourseSrv.getStudentsByTeacherCourseId(teacherCourseId)
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.rowCollection = res.data;
          $scope.studentsByCourse = res.data;

          // get no group
          $scope.availableGroupStudents = _.filter($scope.studentsByCourse, function (item) {
            return !item.teacherCourseGroupId;
          });
        }
      });
  }

  //init
  getStudentsByTeacherCourseId();

}]);
