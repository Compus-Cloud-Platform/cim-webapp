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

//  $scope.studentsByGroup = [
//    {
//      groupId: 0,
//      groupName: '未分组',
//      students: [
//        {sitNum: 8, name: 'xxxx', identity: '08521', sex: 1, id: '900017'},
//        {sitNum: 9, name: 'jjj', identity: '08521', sex: 1, id: '900018'},
//        {sitNum: 10, name: 'kkk', identity: '08521', sex: 1, id: '900019'}
//      ]
//    },
//    {
//      groupId: 1,
//      groupName: '第一组',
//      students: [
//        {sitNum: 1, name: 'Renard', identity: '08521', sex: 1, id: '90001'},
//        {sitNum: 2, name: 'aaaa', identity: '08521', sex: 1, id: '900011'},
//        {sitNum: 6, name: 'eeeeeee', identity: '08521', sex: 1, id: '900015'},
//        {sitNum: 7, name: 'ffffffff', identity: '08521', sex: 1, id: '900016'}
//      ]
//    },
//    {
//      groupId: 2,
//      groupName: '第二组',
//      students: [
//        {sitNum: 3, name: 'bbbb', identity: '08521', sex: 1, id: '900012'},
//        {sitNum: 4, name: 'cccc', identity: '08521', sex: 1, id: '900013'},
//        {sitNum: 5, name: 'dddddd', identity: '08521', sex: 1, id: '900014'}
//      ]
//    }
//  ];

  CourseSrv.getStudentsByTeacherCourseId(teacherCourseId)
    .then(function (res) {
      if (res.ack == 'success') {
        $scope.rowCollection = res.data;
        $scope.studentsByCourse = res.data;

        // get no group
        $scope.availableGroupStudents = _.filter($scope.studentsByCourse, function (item) {
          return item.teacherCourseGroupId == null;
        });
      }
    });

  //$scope.availableGroupStudents = $scope.studentsByGroup[0].students;

//  $scope.groupsByCourse = [
//    {id: -1, name: '未分组'},
//    {id: 1, name: '第一组'},
//    {id: 2, name: '第二组'}
//  ];
  CourseGroupSrv.getCourseGroupsByTeacherCourseId(teacherCourseId)
    .then(function (res) {
      if (res.ack == 'success') {
        $scope.groupsByCourse = res.data;
        $scope.groupsByCourse.unshift({id: -1, name: '未分组'});

        $scope.selectedGroup = $scope.groupsByCourse[0];
        $scope.selectedMoveGroup = $scope.groupsByCourse[0];
        $scope.selectedGroupStudents = [];
      }
    });

  $scope.changeSelectedGroupStudents = function () {
    var selected = $scope.selectedGroup;
    CourseGroupSrv.getStudentCourseGroupsByTeacherCourseGroupId(selected.id)
      .then(function (res) {
        if (res.ack == 'success') {
          $scope.selectedGroupStudents = res.data;
        }
      });
  };

//  $scope.changeSelectedGroupStudents = function () {
//    var selected = $scope.selectedGroup;
//    var group = _.find($scope.studentsByGroup, function (obj) {
//      return obj.groupId == selected.id;
//    });
//    if (typeof group != 'undefined') {
//      $scope.selectedGroupStudents = group.students;
//    } else {
//      var idx = $scope.studentsByGroup.length - 1;
//      var gidx = $scope.groupsByCourse.length;
//      if (idx >= gidx) {
//        $scope.selectedGroupStudents = $scope.studentsByGroup[idx].students;
//      } else {
//        $scope.selectedGroupStudents = [];
//      }
//
//    }
//
//
//  };


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
            CourseGroupSrv.getCourseGroupById(groupId)
              .then(function (res) {
                if (res.ack == 'success') {
                  $scope.selectedGroup = res.data[0];
                }
              });
            CourseGroupSrv.getCourseGroupsByTeacherCourseId(teacherCourseId)
              .then(function (res) {
                if (res.ack == 'success') {
                  $scope.groupsByCourse = res.data;
                  $scope.groupsByCourse.unshift({id: -1, name: '未分组'});
                }
              });
            var promiseArray = [];
            angular.forEach(items, function (item) {
              promiseArray.push(CourseSrv.updateStudentInfoForCourse(item.id, {teacherCourseGroupId: groupId}));
              promiseArray.push(CourseGroupSrv.insertStudentCourseGroup({studentId:item.user.id, teacherCourseGroupId: groupId}));
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
        if(negative == null) {
          obj.teacherCourseGroupId = $scope.selectedGroup.id;
          promiseArray.push(CourseGroupSrv.insertStudentCourseGroup({studentId:item.user.id, teacherCourseGroupId: $scope.selectedGroup.id}));
        }else{
          obj.teacherCourseGroupId = null;
          promiseArray.push(CourseGroupSrv.deleteStudentCourseGroup(1)); //TODO
        }
        promiseArray.push(CourseSrv.updateStudentInfoForCourse(item.id, obj));

      });
      $q.all(promiseArray)
        .then(function (responseArray) {
          if (responseArray.length == promiseArray.length) {
            alert('success');
          }
        });
    }

//    var id = $scope.selectedGroup.id;
//    if (id != -1) {
//      angular.forEach($scope.studentsByGroup, function (item) {
//        if (item.groupId == id) {
//          item.students = to;
//        }
//      });
//    } else {
//      var newId = $scope.groupsByCourse.length;
//      var name = 'new';
//      var group = {
//        groupId: newId,
//        groupName: name,
//        students: to
//      };
//      $scope.studentsByGroup.push(group);
//    }
  }

}]);
