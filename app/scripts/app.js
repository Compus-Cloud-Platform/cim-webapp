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
  'smart-table'
]);

Site.config(
  [          '$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    "use strict";

    $stateProvider
      .state('teacher', {abstract: true, url: '/teacher/:id', templateUrl: 'views/teacher/home.html', controller: 'TeacherCenterCtrl'})
      .state('teacher.center', {url: '', templateUrl: 'views/teacher/center.html', controller: 'TeacherCenterCtrl'})
      .state('teacher.course', {url: '/course-manager', templateUrl: 'views/teacher/course.manager.html', controller: 'CourseManagerCtrl'})
      .state('teacher.group', {url: '/group-manager', templateUrl: 'views/teacher/group.manager.html', controller: 'GroupManagerCtrl'})
      .state('home', {url: '/home', templateUrl: 'views/home.html', controller: 'MainCtrl'})
      .state('login', {url: '/login', templateUrl: 'views/login.html', controller: 'LoginCtrl'})
      .state('about', {url: '/about', templateUrl: 'views/about.html', controller: 'AboutCtrl'});
    $urlRouterProvider.otherwise('/login');

  }]);
