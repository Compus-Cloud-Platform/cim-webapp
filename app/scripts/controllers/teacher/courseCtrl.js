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

  $scope.checkAuth();

  $scope.studentsByGroup = [
    {
      groupId: 0,
      groupName: '未分组',
      students: [
        {sitNum: 8, name: 'xxxx', identity: '08521', sex: 1, id: '900017'},
        {sitNum: 9, name: 'jjj', identity: '08521', sex: 1, id: '900018'},
        {sitNum: 10, name: 'kkk', identity: '08521', sex: 1, id: '900019'}
      ]
    },
    {
      groupId: 1,
      groupName: '第一组',
      students: [
        {sitNum: 1, name: 'Renard', identity: '08521', sex: 1, id: '90001'},
        {sitNum: 2, name: 'aaaa', identity: '08521', sex: 1, id: '900011'},
        {sitNum: 6, name: 'eeeeeee', identity: '08521', sex: 1, id: '900015'},
        {sitNum: 7, name: 'ffffffff', identity: '08521', sex: 1, id: '900016'}
      ]
    },
    {
      groupId: 2,
      groupName: '第二组',
      students: [
        {sitNum: 3, name: 'bbbb', identity: '08521', sex: 1, id: '900012'},
        {sitNum: 4, name: 'cccc', identity: '08521', sex: 1, id: '900013'},
        {sitNum: 5, name: 'dddddd', identity: '08521', sex: 1, id: '900014'}
      ]
    }
  ];

  $scope.studentsByCourse = [
    {sitNum: 1, name: 'Renard', identity: '08521', sex: 1, id: '90001', groupId: 1, groupName: '第1组'},
    {sitNum: 2, name: 'aaaa', identity: '08521', sex: 1, id: '900011', groupId: 1, groupName: '第1组'},
    {sitNum: 3, name: 'bbbb', identity: '08521', sex: 1, id: '900012', groupId: 2, groupName: '第2组'},
    {sitNum: 4, name: 'cccc', identity: '08521', sex: 1, id: '900013', groupId: 2, groupName: '第2组'},
    {sitNum: 5, name: 'dddddd', identity: '08521', sex: 1, id: '900014', groupId: 2, groupName: '第2组'},
    {sitNum: 6, name: 'eeeeeee', identity: '08521', sex: 1, id: '900015', groupId: 1, groupName: '第1组'},
    {sitNum: 7, name: 'ffffffff', identity: '08521', sex: 1, id: '900016', groupId: 1, groupName: '第1组'},
    {sitNum: 8, name: 'xxxx', identity: '08521', sex: 1, id: '900017'},
    {sitNum: 9, name: 'jjj', identity: '08521', sex: 1, id: '900018'},
    {sitNum: 10, name: 'kkk', identity: '08521', sex: 1, id: '900019'}
  ];

  $scope.availableGroupStudents = $scope.studentsByGroup[0].students;

  $scope.groupsByCourse = [
    {id: -1, name: '未分组'},
    {id: 1, name: '第一组'},
    {id: 2, name: '第二组'}
  ];
  $scope.selectedGroup = $scope.groupsByCourse[0];
  $scope.selectedMoveGroup = $scope.groupsByCourse[0];
  $scope.selectedGroupStudents = [];


  $scope.availableGrades = ['2011', '2012', '2013', '2014', '2015'];
  $scope.availableCourses = ['平面设计', '计算机网络', '音乐', '历史', '英语'];

  $scope.changeSelectedGroupStudents = function () {
    var selected = $scope.selectedGroup;
    var group = _.find($scope.studentsByGroup, function (obj) {
      return obj.groupId == selected.id;
    });
    if (typeof group != 'undefined') {
      $scope.selectedGroupStudents = group.students;
    } else {
      var idx = $scope.studentsByGroup.length - 1;
      var gidx = $scope.groupsByCourse.length;
      if (idx >= gidx) {
        $scope.selectedGroupStudents = $scope.studentsByGroup[idx].students;
      } else {
        $scope.selectedGroupStudents = [];
      }

    }


  };


  $scope.checkAll = function () {
    if ($scope.checkedAll) {
      $scope.checkedAll = true;
    } else {
      $scope.checkedAll = false;
    }
    angular.forEach($scope.studentsByCourse, function (item) {
      item.checked = $scope.checkedAll;
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
    if (typeof negative == 'undefined') {
      refreshModel(to);
    } else {
      refreshModel(from);
    }
  };

  $scope.moveAll = function (from, to, negative) {

    console.log('Move all  From:: ' + from + ' To:: ' + to);
    //Here from is returned as blank and to as undefined

    angular.forEach(from, function (item) {
      to.push(item);
    });
    from.length = 0;
    if (typeof negative == 'undefined') {
      refreshModel(to);
    } else {
      refreshModel(from);
    }
  };

  function refreshModel(to) {
    var id = $scope.selectedGroup.id;
    if (id != -1) {
      angular.forEach($scope.studentsByGroup, function (item) {
        if (item.groupId == id) {
          item.students = to;
        }
      });
    } else {
      var newId = $scope.groupsByCourse.length;
      var name = 'new';
      var group = {
        groupId: newId,
        groupName: name,
        students: to
      };
      $scope.studentsByGroup.push(group);
    }
  }

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

}]);
