'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the webApp
 */
Site.controller('HeaderCtrl', ['$scope', 'AuthSrv', '$state', function ($scope, AuthSrv, $state) {
  console.log("HeaderCtrl");

  //position: teacher, superAdmin, admin, student
  $scope.userData = {id: "1", name: "ruigao", password: "19851012", position: "superAdmin"};

  $scope.checkAuth = function () {
    console.log('test auth');
  };


  var teacherArray = [
    {
      name: "影音资源平台",
      subList: [
        {name: "影音首页", link: "teacher.video-home"},
        {name: "课程影音历程", link: "teacher.video-home"},
        {name: "个人影音管理", link: "teacher.video-home"},
        {name: "共享视频资源", link: "teacher.video-home"},
        {name: "视频上传", link: "teacher.resource-upload`"}
      ]
    },
    {
      name: "课程与群组管理",
      subList: [
        {name: "课程管理", link: "teacher.course-manager"},
        {name: "教师群组", link: "teacher.course-manager"}
      ]
    },
    {
      name: "教学资源",
      subList: [
        {name: "教材管理", link: "teacher.textbook-manager"},
        {name: "教材分享区", link: "teacher.textbook-share"},
        {name: "个人试卷", link: "teacher.paper-personage"},
        {name: "学校试卷中心", link: "teacher.textbook-manager"}
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
  ];

  var superAdminArray = [
    {
      name: "组织机构管理",
      subList: [
        {name: "组织机构列表", link: "super-admin.org-list"},
        {name: "新增组织机构", link: "super-admin.org-add"}
      ]
    },
    {
      name: "用户管理",
      subList: [
        {name: "用户列表", link: "super-admin.user-list"},
        {name: "新增用户", link: "super-admin.user-add"},
        {name: "职位列表", link: "super-admin.position-list"},
        {name: "新增职位", link: "super-admin.position-add"}
      ]
    },
    {
      name: "部门管理",
      subList: [
        {name: "部门列表", link: "super-admin.dept-list"},
        {name: "新增部门", link: "super-admin.dept-add"},
        {name: "专业列表", link: "super-admin.major-list"},
        {name: "新增专业", link: "super-admin.major-add"}
      ]
    },
    {
      name: "课程管理",
      subList: [
        {name: "课程列表", link: "super-admin.course-list"},
        {name: "新增课程", link: "super-admin.course-add"}
      ]
    },
    {
      name: "权限管理",
      subList: [
        {name: "角色列表", link: "super-admin.role-list"},
        {name: "新增角色", link: "super-admin.role-add"},
        {name: "权限列表", link: "super-admin.permission-list"},
        {name: "新增权限", link: "super-admin.permission-add"}
      ]
    }
  ];
  var studentArray = [];
  var adminArray = [];

  var initLayout = function () {
    var user = $scope.userData;
    switch (user.position) {
      case 'teacher':
        $scope.positionDisplayed = '老师';
        $scope.positionPath = 'teacher.home';
        $scope.headerArray = teacherArray;
        break;
      case 'student':
        $scope.positionDisplayed = '学生';
        $scope.positionPath = 'student.home';
        $scope.headerArray = studentArray;
        break;
      case 'admin':
        $scope.positionDisplayed = '管理员';
        $scope.positionPath = 'admin.home';
        $scope.headerArray = adminArray;
        break;
      case 'superAdmin':
        $scope.positionDisplayed = '系统管理员';
        $scope.positionPath = 'super-admin.home';
        $scope.headerArray = superAdminArray;
        break;
    }
  };

  $scope.profile = [
    {name: "公布栏", link: "teacher.video"},
    {name: "行事历", link: "teacher.video"},
    {name: "电子字条", link: "teacher.video"},
    {name: "网络硬盘", link: "teacher.video"},
    {name: "个人信息管理", link: "teacher.video"},
    {name: "注销系统", link: "login"}
  ];

  // left slide bar
  $scope.resourceSummary = [
    {name: "个人教材", count: "1"},
    {name: "共享教材", count: "11"},
    {name: "学校试卷", count: "13"},
    {name: "个人影音", count: "41"},
    {name: "共享视频", count: "13"}
  ];
  $scope.courseSummary = [
    {name: "离散数学", code: "12345"},
    {name: "网络技术", code: "12345"},
    {name: "数据机构", code: "12345"}
  ];

  /*
   ** initialize layout
   */
  initLayout();


}]);
