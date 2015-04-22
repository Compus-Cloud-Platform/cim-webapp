'use strict';

/**
 * @ngdoc function
 * @name cimWebappApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the cimWebappApp
 */
Site.controller('HeaderCtrl', ['$scope', 'AuthSrv', '$state', function ($scope, AuthSrv, $state) {

  $scope.headerArray = [
    {
      name: "影音资源平台",
      subList: [
        {name: "影音首页", link: "teacher.video"},
        {name: "课程影音历程", link: "teacher.video"},
        {name: "个人影音管理", link: "teacher.video"},
        {name: "共享视频资源", link: "teacher.video"}
      ]
    },
    {
      name: "课程与群组管理",
      subList: [
        {name: "课程管理", link: "teacher.course"},
        {name: "教师群组", link: "teacher.group"}
      ]
    },
    {
      name: "教学资源",
      subList: [
        {name: "教材管理", link: "teacher.course"},
        {name: "教材分享区", link: "teacher.group"},
        {name: "个人试卷", link: "teacher.group"},
        {name: "学校试卷中心", link: "teacher.group"}
      ]
    },
    {
      name: "学习活动",
      subList: [
        {name: "线上作业", link: "teacher.course"},
        {name: "线上评量", link: "teacher.group"},
        {name: "班际智慧服务", link: "teacher.group"}
      ]
    },
    {
      name: "翻转课堂",
      subList: [
        {name: "自学进度管理", link: "teacher.course"},
        {name: "课程大纲管理", link: "teacher.group"}
      ]
    },
    {
      name: "纪录总览",
      subList: [
        {name: "学习历程", link: "teacher.course"},
        {name: "成绩管理", link: "teacher.group"},
        {name: "线上纪录", link: "teacher.group"}
      ]
    }
  ]

  $scope.profile = [
    {name: "公布栏", link: "teacher.video"},
    {name: "行事历", link: "teacher.video"},
    {name: "电子字条", link: "teacher.video"},
    {name: "网络硬盘", link: "teacher.video"},
    {name: "个人信息管理", link: "teacher.video"},
    {name: "注销系统", link: "teacher.video"}
  ]

}]);
