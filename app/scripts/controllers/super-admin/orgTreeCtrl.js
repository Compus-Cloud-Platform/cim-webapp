'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:OrgTreeCtrl
 * @description
 * # OrgTreeCtrl
 * Controller of the webApp
 */
Site.controller('OrgTreeCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'OrganizationSrv', 'DeptSrv', 'MajorSrv', function ($scope, $state, $location, $stateParams, $q, OrganizationSrv, DeptSrv, MajorSrv) {
  console.log('OrgTreeCtrl');

  var orgId = $stateParams.orgId;
  var userId = $scope.userData.id;

  //
  if (orgId) {
    OrganizationSrv.getOrganizationById(orgId)
      .then(function (res) {
        if (res.ack == 'success') {
          var organization = res.data[0];
          $scope.organization = organization;
        }
      });

    DeptSrv.getAllDeptsByOrgId(orgId)
      .then(function (res) {
        if (res.ack == 'success') {
          var orgDepts = res.data;
          
        }
      });

  }

  $scope.buttonClick = function (event, node) {
    console.log(111);
    event.stopPropagation();
  };

  $scope.treeOptions = {
    nodeChildren: "children",
    dirSelectable: false,
    injectClasses: {
      ul: "a1",
      li: "a2",
      liSelected: "a7",
      iExpanded: "a3",
      iCollapsed: "a4",
      iLeaf: "a5",
      label: "a6",
      labelSelected: "a8"
    }
  };
  $scope.dataForTheTree =
    [
      { "name": "交通大学",
        "share": true,
        "children": [
          { "name": "计算机系",
            "share": true,
            "children": []
          },
          { "name": "历史系",
            "share": false,
            "children": [
              { "name": "考古专业",
                "share": true,
                "children": [
                  { "name": "听力资料111", "share": true, "children": [] },
                  { "name": "听力资料22222", "share": true, "children": [] }
                ]
              },
              { "name": "民俗社会学专业",
                "share": true,
                "children": []
              }
            ]}
        ]}
    ];
  $scope.availableGroupStudents = [
    {id: 1, name: "111111", code: "11111", description: "11111"},
    {id: 2, name: "222", code: "11111", description: "11111"},
    {id: 3, name: "333", code: "11111", description: "11111"},
    {id: 4, name: "444", code: "11111", description: "11111"}
  ];

  DeptSrv.getAllDepts()
    .then(function (res) {
      if (res.ack == 'success') {
        $scope.depts = res.data;

        //TODO filter already checked depts
      }//if
    });

  MajorSrv.getAllMajors()
    .then(function (res) {
      if (res.ack == 'success') {
        $scope.majors = res.data;

        //TODO filter already checked majors
      }//if
    });

}]);
