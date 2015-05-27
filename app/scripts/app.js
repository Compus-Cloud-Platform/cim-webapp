'use strict';

/**
 * @ngdoc overview
 * @name webApp
 * @description
 * # webApp
 *
 * Main module of the application.
 */
var Site = angular.module('Site', [
  'ngAnimate',
  'ngRoute',
  'ngSanitize',
  'ngCookies',
  'ui.router',
  'smart-table',
  "treeControl"
]);

Site.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      "use strict";

      $stateProvider
        .state('admin', {abstract: true, url: '/admin/:id', templateUrl: 'views/wrap.html'})
        .state('admin.home', {url: '', templateUrl: 'views/admin/home.html'})
        .state('admin.teacher', {url: '/teacher-manager', templateUrl: 'views/admin/teacher.manager.html'})
        .state('admin.student', {url: '/student-manager', templateUrl: 'views/admin/student.manager.html'})
        .state('admin.school', {url: '/school-manager', templateUrl: 'views/admin/school.manager.html'})
        .state('admin.class', {url: '/class-manager', templateUrl: 'views/admin/class.manager.html'})
        .state('admin.textbook', {url: '/textbook-manager', templateUrl: 'views/admin/textbook.manager.html'})
        .state('admin.chapter', {url: '/chapter-manager', templateUrl: 'views/admin/chapter.manager.html'})
        .state('admin.class-textbook', {url: '/class-textbook', templateUrl: 'views/admin/class.textbook.relation.html'})
        .state('admin.teacher-class', {url: '/teacher-class', templateUrl: 'views/admin/teacher.class.relation.html'})
        .state('admin.video', {url: '/video-manager', templateUrl: 'views/admin/video.manager.html'})
        .state('admin.upload', {url: '/video-upload', templateUrl: 'views/admin/video.upload.html'})
        .state('admin.player', {url: '/video-player/:id', templateUrl: 'views/admin/video.player.html'})
        .state('admin.profile', {url: '/profile', templateUrl: 'views/admin/profile.html'})
        .state('teacher', {abstract: true, url: '/teacher/:id', templateUrl: 'views/wrap.html'})
        .state('teacher.home', {url: '', templateUrl: 'views/teacher/home.html'})
        .state('teacher.course-manager', {url: '/course-manager', templateUrl: 'views/teacher/course.manager.html'})
        .state('teacher.course-group', {url: '/course-group', templateUrl: 'views/teacher/course.group.html'})
        .state('teacher.group-manager', {url: '/group-manager', templateUrl: 'views/teacher/group.manager.html'})
        .state('teacher.name-edit', {url: '/name-edit', templateUrl: 'views/teacher/name.edit.html'})
        .state('teacher.paper-personage', {url: '/paper-personage', templateUrl: 'views/teacher/paper.personage.html'})
        .state('teacher.seat-edit', {url: '/seat-edit', templateUrl: 'views/teacher/seat.edit.html'})
        .state('teacher.student-add', {url: '/student-add', templateUrl: 'views/teacher/student.add.html'})
        .state('teacher.textbook-manager', {url: '/textbook-manager', templateUrl: 'views/teacher/textbook.manager.html'})
        .state('teacher.textbook-share', {url: '/textbook-share', templateUrl: 'views/teacher/textbook.share.html'})
        .state('teacher.video-home', {url: '/video-home', templateUrl: 'views/teacher/video.home.html'})
        .state('teacher.video-player', {url: '/video-player/:id', templateUrl: 'views/teacher/video.player.html'})
        .state('teacher.resource-upload', {url: '/resource-upload', templateUrl: 'views/teacher/resource.upload.html'})
        .state('student', {abstract: true, url: '/student/:id', templateUrl: 'views/wrap.html'})
        .state('student.home', {url: '', templateUrl: 'views/student/home.html'})
        .state('super-admin', {abstract: true, url: '/super-admin/:id', templateUrl: 'views/wrap.html'})
        .state('super-admin.home', {url: '', templateUrl: 'views/super-admin/home.html'})
        .state('super-admin.org-list', {url: '/org-list', templateUrl: 'views/super-admin/org-list.html'})
        .state('super-admin.org-detail', {url: '/org-detail/:orgId', templateUrl: 'views/super-admin/org-detail.html'})
        .state('super-admin.org-add', {url: '/org-add', templateUrl: 'views/super-admin/org-add.html'})
        .state('super-admin.org-edit', {url: '/org-edit/:orgId', templateUrl: 'views/super-admin/org-edit.html'})
        .state('super-admin.position-list', {url: '/position-list', templateUrl: 'views/super-admin/position-list.html'})
        .state('super-admin.position-detail', {url: '/position-detail/:posId', templateUrl: 'views/super-admin/position-detail.html'})
        .state('super-admin.position-add', {url: '/position-add', templateUrl: 'views/super-admin/position-add.html'})
        .state('super-admin.position-edit', {url: '/position-edit/:posId', templateUrl: 'views/super-admin/position-edit.html'})
        .state('super-admin.user-list', {url: '/user-list', templateUrl: 'views/super-admin/user-list.html'})
        .state('super-admin.user-detail', {url: '/user-detail/:uId', templateUrl: 'views/super-admin/user-detail.html'})
        .state('super-admin.user-add', {url: '/user-add', templateUrl: 'views/super-admin/user-add.html'})
        .state('super-admin.user-edit', {url: '/user-edit/:uId', templateUrl: 'views/super-admin/user-edit.html'})
        .state('super-admin.dept-list', {url: '/dept-list', templateUrl: 'views/super-admin/dept-list.html'})
        .state('super-admin.dept-detail', {url: '/dept-detail/:deptId', templateUrl: 'views/super-admin/dept-detail.html'})
        .state('super-admin.dept-add', {url: '/dept-add', templateUrl: 'views/super-admin/dept-add.html'})
        .state('super-admin.dept-edit', {url: '/dept-edit/:deptId', templateUrl: 'views/super-admin/dept-edit.html'})
        .state('super-admin.major-list', {url: '/major-list', templateUrl: 'views/super-admin/major-list.html'})
        .state('super-admin.major-detail', {url: '/major-detail/:majorId', templateUrl: 'views/super-admin/major-detail.html'})
        .state('super-admin.major-add', {url: '/major-add', templateUrl: 'views/super-admin/major-add.html'})
        .state('super-admin.major-edit', {url: '/major-edit/:majorId', templateUrl: 'views/super-admin/major-edit.html'})
        .state('super-admin.course-list', {url: '/course-list', templateUrl: 'views/super-admin/course-list.html'})
        .state('super-admin.course-detail', {url: '/course-detail/:courseId', templateUrl: 'views/super-admin/course-detail.html'})
        .state('super-admin.course-add', {url: '/course-add', templateUrl: 'views/super-admin/course-add.html'})
        .state('super-admin.course-edit', {url: '/course-edit/:courseId', templateUrl: 'views/super-admin/course-edit.html'})
        .state('super-admin.role-list', {url: '/role-list', templateUrl: 'views/super-admin/role-list.html'})
        .state('super-admin.role-detail', {url: '/role-detail/:roleId', templateUrl: 'views/super-admin/role-detail.html'})
        .state('super-admin.role-add', {url: '/role-add', templateUrl: 'views/super-admin/role-add.html'})
        .state('super-admin.role-edit', {url: '/role-edit/:roleId', templateUrl: 'views/super-admin/role-edit.html'})
        .state('super-admin.permission-list', {url: '/permission-list', templateUrl: 'views/super-admin/permission-list.html'})
        .state('super-admin.permission-detail', {url: '/permission-detail/:permissionId', templateUrl: 'views/super-admin/permission-detail.html'})
        .state('super-admin.permission-add', {url: '/permission-add', templateUrl: 'views/super-admin/permission-add.html'})
        .state('super-admin.permission-edit', {url: '/permission-edit/:permissionId', templateUrl: 'views/super-admin/permission-edit.html'})

        .state('super-admin.org-tree-detail', {url: '/org-tree-detail/:orgId', templateUrl: 'views/super-admin/org-tree-detail.html'})
        .state('super-admin.org-tree-add', {url: '/org-tree-add', templateUrl: 'views/super-admin/org-tree-add.html'})

        .state('super-admin.org-map-manager', {url: '/org-map-manager/:orgId', templateUrl: 'views/super-admin/org-map-manager.html'})
        .state('super-admin.org-map-dept', {url: '/org-map-dept/:orgId', templateUrl: 'views/super-admin/org-map-dept.html'})

        .state('login', {url: '/login', templateUrl: 'views/login.html', controller: 'LoginCtrl'});
      $urlRouterProvider.otherwise('/login');

    }]);
