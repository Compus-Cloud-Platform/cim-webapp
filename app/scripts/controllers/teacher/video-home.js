'use strict';

/**
 * @ngdoc function
 * @name cimWebappApp.controller:VideoHomeCtrl
 * @description
 * # VideoHomeCtrl
 * Controller of the cimWebappApp
 */
Site.controller('VideoHomeCtrl', ['$scope', '$sce', function ($scope, $sce) {

  this.config = {
    preload: "none",
    sources: [
      {src: $sce.trustAsResourceUrl("http://localhost:9000/resource/videos/videogular.mp4"), type: "video/mp4"},
      {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
      {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
    ],
    tracks: [
      {
        src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
        kind: "subtitles",
        srclang: "en",
        label: "English",
        default: ""
      }
    ],
    theme: {
      url: "bower_components/videogular-themes-default/videogular.css"
    }
  };
}]);
