'use strict';

/**
 * @ngdoc function
 * @name cimWebappApp.controller:CourseManagerCtrl
 * @description
 * # CourseManagerCtrl
 * Controller of the cimWebappApp
 */
Site.controller('CourseManagerCtrl', ['$scope', '$filter', function ($scope, $filter) {
  $scope.rowCollection = [
    {sitNum: 1, name: 'Renard', identity: '08521', sex: 1, id: '90001', groupId: 1, groupName: '第1组'},
    {sitNum: 2, name: 'aaaa', identity: '08521', sex: 1, id: '900011', groupId: 1, groupName: '第1组'},
    {sitNum: 3, name: 'bbbb', identity: '08521', sex: 1, id: '900012', groupId: 2, groupName: '第2组'},
    {sitNum: 4, name: 'cccc', identity: '08521', sex: 1, id: '900013', groupId: 2, groupName: '第2组'},
    {sitNum: 5, name: 'dddddd', identity: '08521', sex: 1, id: '900014', groupId: 2, groupName: '第2组'},
    {sitNum: 6, name: 'eeeeeee', identity: '08521', sex: 1, id: '900015', groupId: 1, groupName: '第1组'},
    {sitNum: 7, name: 'ffffffff', identity: '08521', sex: 1, id: '900016', groupId: 1, groupName: '第1组'}
  ];

  $scope.getters={
    firstName: function (value) {
      //this will sort by the length of the first name string
      return value.firstName.length;
    }
  }

  $scope.checkAll = function () {
    if ($scope.selectedAll) {
      $scope.selectedAll = true;
    } else {
      $scope.selectedAll = false;
    }
    angular.forEach($scope.rowCollection, function (item) {
      item.Selected = $scope.selectedAll;
    });

  };
}]);

Site.directive('csSelect', function () {
  return {
    require: '^stTable',
    template: '<input type="checkbox"/>',
    scope: {
      row: '=csSelect'
    },
    link: function (scope, element, attr, ctrl) {

      element.bind('change', function (evt) {
        scope.$apply(function () {
          ctrl.select(scope.row, 'multiple');
        });
      });

      scope.$watch('row.isSelected', function (newValue, oldValue) {
        if (newValue === true) {
          element.parent().addClass('st-selected');
        } else {
          element.parent().removeClass('st-selected');
        }
      });
    }
  };
});
