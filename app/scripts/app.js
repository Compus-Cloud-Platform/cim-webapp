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
      .state('home', {url: '/home', templateUrl: 'views/main.html', controller: 'MainCtrl'})
      .state('about', {url: '/about', templateUrl: 'views/about.html', controller: 'AboutCtrl'});
    $urlRouterProvider.otherwise('/home');

  });
