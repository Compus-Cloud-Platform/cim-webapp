'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:SuperAdminHomeCtrl
 * @description
 * # SuperAdminHomeCtrl
 * Controller of the webApp
 */
Site.controller('SuperAdminHomeCtrl', function ($scope) {
  console.log('SuperAdminHomeCtrl');

  if(!$scope.userData) {
    $state.go('login');
    return;
  }

  $scope.organizations = [
    {
      "operId": 1,
      "id": 1,
      "phone": "021-62932424",
      "fax": "021-62932424",
      "webSite": "http://www.sjtu.edu.cn/",
      "address": "上海市华山路1954号",
      "description": "上海交通大学是我国历史最悠久的高等学府之一，是教育部直属、教育部与上海市共建的全国重点大学.",
      "name": "1111上海交通大学",
      "code": "10248",
      "createDate": 1431360609000
    },
    {
      "operId": 2,
      "id": 2,
      "phone": "021-62932424",
      "fax": "021-62932424",
      "webSite": "http://www.sjtu.edu.cn/",
      "address": "上海市华山路1954号",
      "description": "上海交通大学是我国历史最悠久的高等学府之一，是教育部直属、教育部与上海市共建的全国重点大学.",
      "name": "上海交通大学",
      "code": "10243",
      "createDate": 1431360209000
    }
  ];

  $scope.getters = {
    firstName: function (value) {
      //this will sort by the length of the first name string
      return value.name.length;
    }
  };

  $scope.organization = {
    "operId": 1,
    "id": 1,
    "phone": "021-62932424",
    "fax": "021-62932424",
    "webSite": "http://www.sjtu.edu.cn/",
    "address": "上海市华山路1954号",
    "description": "上海交通大学是我国历史最悠久的高等学府之一，是教育部直属、教育部与上海市共建的全国重点大学.",
    "name": "1111上海交通大学",
    "code": "10248",
    "createDate": 1431360609000
  }

});
