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