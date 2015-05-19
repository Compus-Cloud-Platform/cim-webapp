'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:OrgTreeCtrl
 * @description
 * # OrgTreeCtrl
 * Controller of the webApp
 */
Site.controller('OrgTreeCtrl', function ($scope) {
  console.log('OrgTreeCtrl');

  $scope.buttonClick = function(event, node) {
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

});
