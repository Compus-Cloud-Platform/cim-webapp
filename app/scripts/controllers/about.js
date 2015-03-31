'use strict';

/**
 * @ngdoc function
 * @name cimWebappApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the cimWebappApp
 */
angular.module('Site')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
