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
    _themeManager.init(mainClassName);

    if( !('undefined' === typeof options) && !('undefined' === typeof options.theme) )
    {
      _themeManager.setTheme( options.theme );
    }
    else
    {
      _themeManager.removeAllThemes();
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
    content.load('more.html #' + id);
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
     * Store window content block
     */
    windowContent : null,

    /**
     * Settings for scrollbar
     */
    scrollbarSettings : {
      theme : 'light',
      scrollInertia : 400
    },

    /**
     * It's like constructor
     */
    init : function (windowClassName) {
      this.windowClassName = windowClassName;

      var jqueryWindowClassName = '.' + windowClassName,
          window = $(jqueryWindowClassName);

      this.window = window;

      var jqueryContentClassName = '.' + windowClassName + '__content-block',
          windowContent = window.find(jqueryContentClassName);

      this.windowContent = windowContent;

      windowContent.mCustomScrollbar(this.scrollbarSettings);
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

      var scrollbarTheme = this._getScrollbarTheme(theme);

      if( this.scrollbarSettings.theme !== scrollbarTheme )
      {
        var newOptions = _clone( this.scrollbarSettings );

        newOptions.theme = scrollbarTheme;

        this._rebuildScrollbar( newOptions );
      }

      return true;
    },

    /**
     * Remove all themes
     *
     * @returns {boolean}
     */
    removeAllThemes : function () {
      for(var i = 0; i < this.listOfThemes.length; ++i)
      {
        this.removeTheme( this.listOfThemes[i] );
      }

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

      this._rebuildScrollbar( this.scrollbarSettings );

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
    },

    /**
     * Return theme for scrollbar
     *
     * @param theme
     * @returns {*}
     * @private
     */
    _getScrollbarTheme : function (theme) {
      var scrollbarTheme = 'light';

      switch (theme) {
        case 'light':
          scrollbarTheme = 'dark';
          break;

        default:
          break;
      }

      return scrollbarTheme;
    },

    /**
     * Rebuild scrollbar
     *
     * @param options
     * @returns {boolean}
     * @private
     */
    _rebuildScrollbar : function (options) {
      this.windowContent.mCustomScrollbar('destroy');

      this.windowContent.mCustomScrollbar(options);

      return true;
    }
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

  /**
   * Cloning objects
   *
   * @param obj
   * @returns {*}
   * @private
   */
  var _clone = function (obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null === obj || "object" !== typeof obj) return false;

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = _clone(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = _clone(obj[attr]);
      }
      return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
  };

  return {
    init : init,
    load : load,
    destroy : destroy,
    loadCatalog : loadCatalog
  }
})();
