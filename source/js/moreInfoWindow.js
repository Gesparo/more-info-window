/**
 * Show modal window with information
 *
 * dependency :
 *  - jquery
 *  - malihu-custom-scrollbar-plugin
 * @author Gesparo
 * @link https://github.com/Gesparo/more-info-window
 * @version 1.0
 * @type {{init, load, destroy, loadCatalog}}
 */
var moreInfoWindow = (function () {
  var mainClassName = 'more-info-window',
      jqueryMainClassName = '.' + mainClassName,
      infoWindow = $(jqueryMainClassName),
      catalogBlock = infoWindow.find('.more-info-window__content-block'),
      closeButton = infoWindow.find('.more-info-window__close'),
      content = infoWindow.find('.more-info-window__content'),
      overlay = $('.overlay-background'),
      initStatus = false;

  var init = function (options) {
    if( !('undefined' === typeof options) && !('undefined' === typeof options.theme) )
    {
      _themeManager.init(mainClassName);
      _themeManager.setTheme( options.theme );
    }

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

  /**
   * Theme manager
   *
   * @type object
   * @private
   */
  var _themeManager = {
    /**
     * Store list of all available themes
     * @type object
     */
    listOfThemes : [
      'light'
    ],

    /**
     * Store name of window class
     */
    windowClassName : '',

    /**
     * Store window object
     */
    window : null,

    /**
     * It's like constructor
     */
    init : function (windowClassName) {
      this.windowClassName = windowClassName;

      var jqueryWindowClassName = '.' + windowClassName;

      this.window = $(jqueryWindowClassName);
    },

    /**
     * Check if it's valid theme
     *
     * @param themeName
     * @returns {boolean}
     */
    isValidTheme : function (themeName) {
      return this.listOfThemes.indexOf(themeName.toLowerCase()) !== -1;
    },

    /**
     * Set new theme
     *
     * @param theme
     * @returns {boolean}
     */
    setTheme : function (theme) {
      var userTheme = theme.toLowerCase();

      if( !this.isValidTheme(userTheme) )
      {
        return false;
      }

      var themeClassName = this._getThemeFullName(userTheme);

      if( this.window.hasClass(themeClassName) )
      {
        return true;
      }

      this.window.addClass(themeClassName);

      return true;
    },

    /**
     * Remove theme if exists
     *
     * @param theme
     * @returns {boolean}
     */
    removeTheme : function (theme) {
      var userTheme = theme.toLowerCase();

      var themeClassName = this._getThemeFullName(userTheme);

      if( !this.window.hasClass(themeClassName) )
      {
        return true;
      }

      this.window.removeClass(themeClassName);

      return true;
    },

    /**
     * Get theme full name
     *
     * @param theme
     * @returns {string}
     * @private
     */
    _getThemeFullName : function (theme) {
      return this.windowClassName + '_theme-' + theme;
    }
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
