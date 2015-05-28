'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:OrganizationManagerCtrl
 * @description
 * # OrganizationManagerCtrl
 * Controller of the webApp
 */
Site.controller('OrganizationManagerCtrl', ['$scope', '$state', '$location', '$stateParams', '$q', 'OrganizationSrv', 'DeptSrv', 'MajorSrv', function ($scope, $state, $location, $stateParams, $q, OrganizationSrv, DeptSrv, MajorSrv) {
  console.log('OrganizationManagerCtrl');

  var orgId = $stateParams.orgId;
  var path = $location.path();
  var userId = $scope.userData.id;

  $scope.orgId = orgId;
  $scope.newDepts = undefined;

  if (path.indexOf('org-map-manager') > 0) {

    $scope.checkAllMajors = function () {
      $scope.selectedAll = !$scope.selectedAll;
      angular.forEach($scope.orgDeptMajors, function (item) {
        item.selected = $scope.selectedAll;
      });
    };

    $scope.deleteMajors = function () {
      var promiseArray = [];
      var orgDeptMajors = _.filter($scope.orgDeptMajors, {'selected': true});
      _.forEach(orgDeptMajors, function (item) {
        promiseArray.push(MajorSrv.deleteOneMajorFromOrgDept(item.id));
      });
      $q.all(promiseArray)
        .then(function (responseArray) {
          if (responseArray.length == orgDeptMajors.length) {
            $scope.orgDeptMajors = _.xor($scope.orgDeptMajors, orgDeptMajors);
          }
        })
    };

    $scope.deleteDept = function (deptOrgId) {
      MajorSrv.getAllMajorsByOrgDeptId(deptOrgId)
        .then(function (res) {
          if (res.ack == 'success') {
            if (res.data.length > 0) {
              alert('不能删除！');
            } else {
              DeptSrv.deleteOneDeptFromOrg(deptOrgId)
            }
          }
        })
        .then(function (res) {
          if (res.ack == 'success') {
            $scope.getAllDeptsByOrgId(orgId);
          }
        });
    };

    $scope.showMajors = function (orgDeptId) {
      $scope.orgDeptId = orgDeptId;
      MajorSrv.getAllMajorsByOrgDeptId(orgDeptId)
        .then(function (res) {
          $scope.rowCollectionMajor = res.data;
          $scope.orgDeptMajors = [].concat($scope.rowCollectionMajor);
        });
    };

    $scope.getAllDeptsByOrgId = function (orgId) {
      DeptSrv.getAllDeptsByOrgId(orgId)
        .then(function (res) {
          if (res.ack == 'success') {
            $scope.orgDepts = res.data;

            // default get first majors
            if (res.data.length > 0) {
              var orgDeptMajor = res.data[0];
              $scope.showMajors(orgDeptMajor.id);
            }
          }//if
        });
    };

    if (orgId) {
      $scope.getAllDeptsByOrgId(orgId);
    }

  }// if org-map-manager > 0

  if (path.indexOf('org-map-dept') > 0) {

    var promiseArray = [];
    promiseArray.push(DeptSrv.getAllDepts());
    promiseArray.push(DeptSrv.getAllDeptsByOrgId(orgId));
    $q.all(promiseArray)
      .then(function (responseArray) {
        if (responseArray.length == 2) {
          var allOrgDepts = [];
          var allDepts = [];
          var temp1 = responseArray[0];
          var temp2 = responseArray[1];
          if (temp2.ack == 'success' && temp2.data.length > 0) {
            _.forEach(temp2.data, function (item) {
              allOrgDepts.push(item.department);
            });
          }
          if (temp1.ack == 'success' && temp1.data.length > 0) {
            allDepts = temp1.data;
          }
          $scope.availableDepts = _.filter(allDepts, function (item) {
            return !_.some(allOrgDepts, item)
          });
        }
      });

    $scope.addDepts = function () {
      promiseArray = [];
      _.forEach($scope.newDepts, function (item) {
        var obj = {deptId: item, orgId: orgId, operId: userId};
        promiseArray.push(DeptSrv.insertOneDeptToOrg(obj));
      });
      $q.all(promiseArray)
        .then(function (responseArray) {
          if (responseArray.length == promiseArray.length) {
            $state.go('super-admin.org-map-manager', {id: userId, orgId: orgId});
          }
        });
    };
  }

  // org-map-major
  if (path.indexOf('org-map-major') > 0) {

    var orgDeptId = $stateParams.orgDeptId;
    $scope.orgId = undefined;

    var promiseArray = [];
    DeptSrv.getDeptByOrgDeptId(orgDeptId)
      .then(function (dept) {
        if (dept.ack == 'success') {
          $scope.orgId = dept.data[0].organization.id;
          return MajorSrv.getMajorsByDeptId(dept.data[0].id);
        }
      })
      .then(function (majors) {
        MajorSrv.getAllMajorsByOrgDeptId(orgDeptId)
          .then(function (selectedMajors) {
            var allDeptMajors = [];
            var allMajors = [];
            if (selectedMajors.ack == 'success' && selectedMajors.data.length > 0) {
              _.forEach(selectedMajors.data, function (item) {
                allDeptMajors.push(item.major);
              });
            }
            if (majors.ack == 'success' && majors.data.length > 0) {
              allMajors = majors.data;
            }
            $scope.availableMajors = _.filter(allMajors, function (item) {
              return !_.some(allDeptMajors, item)
            });
          });
      });

    $scope.addMajors = function () {
      promiseArray = [];
      _.forEach($scope.newMajors, function (item) {
        var obj = {majorId: item, deptOrgId: orgDeptId, operId: userId};
        promiseArray.push(MajorSrv.insertOneMajorToOrgDept(obj));
      });
      $q.all(promiseArray)
        .then(function (responseArray) {
          if (responseArray.length == promiseArray.length) {
            $state.go('super-admin.org-map-manager', {id: userId, orgId: $scope.orgId});
          }
        });
    };
  }// end org-map-major

  // org-tree-detail
  if (path.indexOf('org-tree-detail') > 0) {
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

    $scope.dataTree = [];
    DeptSrv.getAllDeptsByOrgId(orgId)
      .then(function (depts) {
        if (depts.ack == 'success' && depts.data.length > 0) {
          promiseArray = [];
          _.forEach(depts.data, function (item) {
            promiseArray.push(MajorSrv.getAllMajorsByOrgDeptId(item.id));
          });

          $q.all(promiseArray)
            .then(function (responseArray) {
              if (responseArray.length == promiseArray.length) {
                for (var i = 0; i < depts.data.length; i++) {
                  var majors = _.pluck(responseArray[i].data, 'major');
                  var obj = {name: depts.data[i].department.name, children: majors};
                  $scope.dataTree.push(obj);
                }
              }
            });
        }
      });


  }// end org-tree-detail

  if (orgId) {
    OrganizationSrv.getOrganizationById(orgId)
      .then(function (res) {
        if (res.ack == 'success') {
          var organization = res.data[0];
          $scope.organization = organization;
        }
      });
  }

}]);
