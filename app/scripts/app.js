'use strict';

/**
 * @ngdoc overview
 * @name cimWebappApp
 * @description
 * # cimWebappApp
 *
 * Main module of the application.
 */
var Site = angular.module('Site', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ui.router',
  'smart-table',
  "com.2fdevs.videogular"
]);

Site.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      "use strict";

      $stateProvider
        .state('teacher', {url: '/teacher/:id', templateUrl: 'views/teacher/home.html'})
        .state('teacher-course', {url: '/teacher/:id/course-manager', templateUrl: 'views/teacher/course.manager.html'})
        .state('teacher-course-group', {url: '/teacher/:id/course-group', templateUrl: 'views/teacher/course.group.html'})
        .state('teacher-name-edit', {url: '/teacher/:id/name-edit', templateUrl: 'views/teacher/name.edit.html'})
        .state('teacher-seat-edit', {url: '/teacher/:id/seat-edit', templateUrl: 'views/teacher/seat.edit.html'})
        .state('teacher-student-add', {url: '/teacher/:id/student-add', templateUrl: 'views/teacher/student.add.html'})
        .state('teacher.video', {url: '/video-home', templateUrl: 'views/teacher/video.home.html', controller: 'VideoHomeCtrl'})
        .state('teacher.videodetail', {url: '/video-detail', templateUrl: 'views/teacher/video.detail.html', controller: 'VideoHomeCtrl'})
        .state('teacher.group', {url: '/group-manager', templateUrl: 'views/teacher/group.manager.html', controller: 'GroupManagerCtrl'})

        .state('login', {url: '/login', templateUrl: 'views/login.html', controller: 'LoginCtrl'});
      $urlRouterProvider.otherwise('/login');

    }]);
