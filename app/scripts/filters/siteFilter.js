'use strict';

Site.filter('eYN', function () {
  return function (value) {
    if (value === 'true' || value === true) {
      return 'Yes'
    } else {
      return 'No';
    }
  };
});

Site.filter('termMap', function () {
    return function (value) {
      var temp = "";
      switch (value) {
        case '1':
          temp = '上学期';
          break;
        case '2':
          temp = '下学期';
          break;
        case '3':
          temp = '上下学期';
          break;
        default:
          temp = null;
          break;
      }
      return(temp);
    }
  });