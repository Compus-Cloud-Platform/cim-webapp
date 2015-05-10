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

        .state('login', {url: '/login', templateUrl: 'views/login.html', controller: 'LoginCtrl'});
      $urlRouterProvider.otherwise('/login');

    }]);
