'use strict';

/**
 * @ngdoc function
 * @name cimWebappApp.controller:TeacherHomeCtrl
 * @description
 * # TeacherHomeCtrl
 * Controller of the cimWebappApp
 */
Site.controller('TeacherHomeCtrl', function ($scope) {
  $scope.resourceSummary = [
    {name:"个人教材", count: "1"},
    {name:"共享教材", count: "11"},
    {name:"学校试卷", count: "13"},
    {name:"个人影音", count: "41"},
    {name:"共享视频", count: "13"}
  ];
  $scope.courseSummary = [
    {name:"离散数学", code: "12345"},
    {name:"网络技术", code: "12345"},
    {name:"数据机构", code: "12345"}
  ];

});
