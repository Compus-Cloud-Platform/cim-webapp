'use strict';

/**
 * @ngdoc function
 * @name cimWebappApp.controller:CourseGroupCtrl
 * @description
 * # CourseGroupCtrl
 * Controller of the cimWebappApp
 */
Site.controller('CourseGroupCtrl', ['$scope', '$filter', function ($scope, $filter) {
  $scope.students = [
    {sitNum: 1, name: 'Renard', identity: '08521', sex: 1, id: '90001', groupId: 1, groupName: '第1组'},
    {sitNum: 2, name: 'aaaa', identity: '08521', sex: 1, id: '900011', groupId: 1, groupName: '第1组'},
    {sitNum: 3, name: 'bbbb', identity: '08521', sex: 1, id: '900012', groupId: 2, groupName: '第2组'},
    {sitNum: 4, name: 'cccc', identity: '08521', sex: 1, id: '900013', groupId: 2, groupName: '第2组'},
    {sitNum: 5, name: 'dddddd', identity: '08521', sex: 1, id: '900014', groupId: 2, groupName: '第2组'},
    {sitNum: 6, name: 'eeeeeee', identity: '08521', sex: 1, id: '900015', groupId: 1, groupName: '第1组'},
    {sitNum: 7, name: 'ffffffff', identity: '08521', sex: 1, id: '900016', groupId: 1, groupName: '第1组'}
  ];
  $scope.list1 = [];
  $scope.list2 = [];
  $scope.list3 = [];
  $scope.list4 = [];

  $scope.list5 = [
    { 'title': 'Item 1', 'drag': true },
    { 'title': 'Item 2', 'drag': true },
    { 'title': 'Item 3', 'drag': true },
    { 'title': 'Item 4', 'drag': true },
    { 'title': 'Item 5', 'drag': true },
    { 'title': 'Item 6', 'drag': true },
    { 'title': 'Item 7', 'drag': true },
    { 'title': 'Item 8', 'drag': true }
  ];

}]);
