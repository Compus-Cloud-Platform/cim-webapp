'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:AdminHomeCtrl
 * @description
 * # AdminHomeCtrl
 * Controller of the webApp
 */
Site.controller('AdminHomeCtrl', function ($scope) {
  console.log('AdminHomeCtrl');

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
