Site.constant('ConfigConst', (function () {
  "use strict";

  var _version = "0.0.1";
  var _build = "2015-05-04";
  var _env = 'dev';  //DEV or PRD

  var _devURLs = {
    api: 'http://localhost:9000/services/cim-services/rest/v1/',
    baseUrl: 'http://localhost:8068/'
  };

  var _prdURLs = {
    api: 'http://localhost',
    baseUrl: 'http://localhost'
  };

  return {
    appVersion: _version,
    build: _build,
    urls: (_env == 'dev') ? _devURLs : _prdURLs
  }
})());

