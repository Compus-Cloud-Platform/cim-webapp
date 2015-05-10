'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:StudentHomeCtrl
 * @description
 * # StudentHomeCtrl
 * Controller of the webApp
 */
Site.controller('StudentHomeCtrl', function ($scope) {
  console.log('StudentHomeCtrl');

  $scope.paperList = [
    {name: "期中测验", course: "英语", teacher: "共享教材", time: "20150-04-09"},
    {name: "期中测验", course: "英语", teacher: "共享教材", time: "20150-04-09"},
    {name: "期中测验", course: "英语", teacher: "共享教材", time: "20150-04-09"},
    {name: "期中测验", course: "英语", teacher: "共享教材", time: "20150-04-09"},
    {name: "期中测验", course: "英语", teacher: "共享教材", time: "20150-04-09"},
    {name: "期中测验", course: "英语", teacher: "共享教材", time: "20150-04-09"},
    {name: "期中测验", course: "英语", teacher: "共享教材", time: "20150-04-09"},
    {name: "期中测验", course: "英语", teacher: "共享教材", time: "20150-04-09"},
    {name: "期中测验", course: "英语", teacher: "共享教材", time: "20150-04-09"},
    {name: "期中测验", course: "英语", teacher: "共享教材", time: "20150-04-09"}
  ];

});
