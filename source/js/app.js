(function() {
  'use strict';

  $('#main-presentation').on('click', function (e) {
    e.preventDefault();

    moreInfoWindow.init();
    moreInfoWindow.load('policy');
  });

  $('#light-theme-presentation').on('click', function (e) {
    e.preventDefault();

    moreInfoWindow.init({theme : "light"});
    moreInfoWindow.load('policy');
  });
})();