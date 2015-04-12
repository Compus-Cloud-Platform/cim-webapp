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
  'ui.router'
]);

Site.config(
  function ($stateProvider, $urlRouterProvider) {
    "use strict";

    $stateProvider
      .state('teacher', {url: '/teacher/:id', templateUrl: 'views/teacher/center.html', controller: 'TeacherCenterCtrl'})
      .state('home', {url: '/home', templateUrl: 'views/home.html', controller: 'MainCtrl'})
      .state('login', {url: '/login', templateUrl: 'views/login.html', controller: 'LoginCtrl'})
      .state('about', {url: '/about', templateUrl: 'views/about.html', controller: 'AboutCtrl'});
    $urlRouterProvider.otherwise('/login');

  });
