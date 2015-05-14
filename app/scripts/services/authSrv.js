Site.factory('AuthSrv', ['$http', '$filter', 'ConfigConst', function ($http, $filter, ConfigConst) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();

  return {

    /**
     * format encrpt data, then make rest call
     *
     * @param userIdOrToken
     * @param password
     */
    login: function (userIdOrToken, password) {
      var data = {userName: userIdOrToken, password: password};
      return $http
        .post(ConfigConst.urls.api + 'login', data, {headers: {}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
