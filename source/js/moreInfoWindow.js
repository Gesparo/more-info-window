var moreInfoWindow = (function () {
  var infoWindow = $('.more-info-window'),
      catalogBlock = infoWindow.find('.more-info-window__content-block'),
      closeButton = infoWindow.find('.more-info-window__close'),
      content = infoWindow.find('.more-info-window__content'),
      overlay = $('.overlay-background'),
      initStatus = false;

  var init = function () {
    if( false === initStatus )
    {
      initStatus = true;

      _addCloseModalEventListener();

      $('html, body').css('overflow', 'hidden');

      _showOverlayBackground();
      _showWindow();
    }
  };

  var load = function (id) {
    content.load('more.html #' + id, function () {
      _createScrollbar();
    });
  };

  var loadCatalog = function (number, completeFunction) {
    catalogBlock.addClass('more-info-window_catalog');

    content.load('catalog.html #catalog' + number, completeFunction);
  };

  var destroy = function () {
    _setDefault();
  };

  var _createScrollbar = function () {
    catalogBlock.mCustomScrollbar({
      theme : 'light',
      scrollInertia : 400
    });
  };

  var _setDefault = function () {
    _removeCloseModalEventListener();

    _hideOverlayBackground();
    _hideWindow();

    catalogBlock.removeClass('more-info-window_catalog');

    content.html('Загрузка...');

    initStatus = false;

    $('html, body').css('overflow', 'visible');
  };

  var _removeCloseModalEventListener = function () {
    closeButton.off('click', _setDefault);
  };

  var _addCloseModalEventListener = function () {
    closeButton.on('click', _setDefault);
  };

  var _hideOverlayBackground = function () {
    overlay.css({
      opacity: "0",
      visibility: "hidden"
    });
  };

  var _showOverlayBackground = function () {
    overlay.css({
      opacity: "1",
      visibility: "visible"
    });
  };

  var _showWindow = function () {
    infoWindow.fadeIn();
  };

  var _hideWindow = function () {
    infoWindow.fadeOut(150);
  };

  return {
    init : init,
    load : load,
    destroy : destroy,
    loadCatalog : loadCatalog
  }
})();
