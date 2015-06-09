Site.factory('ClubSrv', ['$http', '$filter', 'ConfigConst', '$cookieStore', function ($http, $filter, ConfigConst, $cookieStore) {
  "use strict";

  // get the existing session so we have the security token
//  var existingSession = LocalSessionService.getValidSession();
  var user = $cookieStore.get('user');

  return {

    // insert club
    insertClub: function (data) {
      return $http
        .post(ConfigConst.urls.api + 'clubs', data, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // update club
    updateClub: function (clubId, data) {
      return $http
        .put(ConfigConst.urls.api + 'clubs/' + clubId, data, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // delete club
    deleteClub: function (clubId) {
      return $http
        .delete(ConfigConst.urls.api + 'clubs/' + clubId, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get one club by id
    getClubById: function (clubId) {
      return $http
        .get(ConfigConst.urls.api + 'clubs/' + clubId, {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    },

    // get all clubs
    getAllClubs: function () {
      return $http
        .get(ConfigConst.urls.api + 'clubs', {headers: {id: user.loginId}})
        .then(function (res) {
          return res.data;
        }, function (err) {
          return err;
        });
    }
  }
}]);
