(function() {
  'use strict';

  $('.presentation_policy-link').on('click', function (e) {
    e.preventDefault();

    moreInfoWindow.init();
    moreInfoWindow.load('policy');
  })
})();