/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	global.BaseClass = __webpack_require__(1);
	global.BasePopupClass = __webpack_require__(2);
	global.Util = __webpack_require__(3);
	global.ViewAdapt = __webpack_require__(4);
	global.Config = __webpack_require__(5);
	global.TipManager = __webpack_require__(6);
	global.View = {};
	global.Popup = {};
	global.Data = {};
	
	var Loading = __webpack_require__(7);
	
	
	var HomeTest = __webpack_require__(8);
	var lastPage = __webpack_require__(9);
	var Warning = __webpack_require__(10);
	var PopupTest = __webpack_require__(11);
	
	function initUI() {
	  View.loading = new Loading('.loading');
	  View.home = new HomeTest('.start');
	  View.lastPage = new lastPage('.last_page');
	  View.warning = new Warning('.warning');
	  Popup.popup = new PopupTest('.question');
	  console.log('initUI');
	  initData();
	  changecolor();
	}
	
	function initData() {
	  console.log('initData');
	  View.loading.preload(function (loaded, total) {
	    if (loaded == total) {
	      View.loading.hide();
	      $('.main').show();
	      View.home.show();
	    } else {
	      View.loading.show();
	    }
	  });
	
	  global.data = [{ title: 1, describe: '1包子铺已进入稳定盈利期，做出一番事业的时机到了。英明如你，开始融资吧：', qa: '交通中心东直门，全年外来人口穿梭不断', qb: '交通中心东直门，全年外来人口穿梭不断', qc: '交通中心东直门，全年外来人口穿梭不断' }, { title: 2, describe: '2包子铺已进入稳定盈利期，做出一番事业的时机到了。英明如你，开始融资吧：', qa: '交通中心东直门，全年外来人口穿梭不断', qb: '交通中心东直门，全年外来人口穿梭不断', qc: '交通中心东直门，全年外来人口穿梭不断' }, { title: 3, describe: '3包子铺已进入稳定盈利期，做出一番事业的时机到了。英明如你，开始融资吧：', qa: '交通中心东直门，全年外来人口穿梭不断', qb: '交通中心东直门，全年外来人口穿梭不断', qc: '交通中心东直门，全年外来人口穿梭不断' }];
	  global.num = 0;
	}
	function changecolor() {
	  setInterval(function () {
	    var color = parseInt(Math.random() * 4095).toString(16);
	    $('.main').css("background-color", '#' + color);
	  }, 5000);
	}
	initUI();
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BaseClass = function () {
	  function BaseClass(str) {
	    _classCallCheck(this, BaseClass);
	
	    this.$dom = $(str);
	    this.$dom.hide();
	    this.init();
	  }
	
	  _createClass(BaseClass, [{
	    key: "init",
	    value: function init() {}
	  }, {
	    key: "show",
	    value: function show() {
	      this.$dom.show();
	    }
	  }, {
	    key: "hide",
	    value: function hide() {
	      this.$dom.hide();
	    }
	  }]);
	
	  return BaseClass;
	}();
	
	module.exports = BaseClass;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BasePopupClass = function (_BaseClass) {
	  _inherits(BasePopupClass, _BaseClass);
	
	  function BasePopupClass(str) {
	    _classCallCheck(this, BasePopupClass);
	
	    return _possibleConstructorReturn(this, (BasePopupClass.__proto__ || Object.getPrototypeOf(BasePopupClass)).call(this, str));
	  }
	
	  _createClass(BasePopupClass, [{
	    key: "show",
	    value: function show() {
	      this.$dom.fadeInUp();
	    }
	  }, {
	    key: "hide",
	    value: function hide() {
	      this.$dom.hide();
	    }
	  }]);
	
	  return BasePopupClass;
	}(BaseClass);
	
	module.exports = BasePopupClass;

/***/ },
/* 3 */
/***/ function(module, exports) {

	
	
	'use strict';
	
	exports.randomNum = function (Min, Max) {
	  var Range = Max - Min;
	  var Rand = Math.random();
	  return Min + Math.round(Rand * Range);
	};
	
	exports.getOption = function (key) {
	  var search = location.search;
	  if (search == "") return "";
	  search = search.slice(1);
	  var searchArr = search.split('&');
	  for (var i = 0; i < searchArr.length; i++) {
	    var arr = searchArr[i].split('=');
	    if (arr[0] == key) return arr[1];
	  }
	  return "";
	};
	
	exports.setPhoto = function ($wrap, $photo, url) {
	  var ratio = parseInt($wrap.width() / $wrap.height() * 100);
	  $photo[0].onload = function () {
	    $photo.css({ width: 'auto', height: 'auto' });
	    var ratioPhoto = parseInt($photo.width() / $photo.height() * 100);
	    if (ratioPhoto === 100 || ratioPhoto > ratio) {
	      $photo.css({ width: '90%', height: 'auto' });
	    } else {
	      $photo.css({ width: 'auto', height: '90%' });
	    }
	  };
	  $photo.attr({ src: url });
	};
	
	if (typeof Object.assign != 'function') {
	  Object.assign = function (target) {
	    'use strict';
	
	    if (target == null) {
	      throw new TypeError('Cannot convert undefined or null to object');
	    }
	
	    target = Object(target);
	    for (var index = 1; index < arguments.length; index++) {
	      var source = arguments[index];
	      if (source != null) {
	        for (var key in source) {
	          if (Object.prototype.hasOwnProperty.call(source, key)) {
	            target[key] = source[key];
	          }
	        }
	      }
	    }
	    return target;
	  };
	}
	
	$(function () {
	  $.fn.animateCss = function (animationName, cb) {
	    var _this = this;
	
	    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	    this.addClass('animated ' + animationName).one(animationEnd, function () {
	      _this.removeClass('animated ' + animationName);
	      if (cb) cb();
	    });
	    return this;
	  };
	
	  $.fn.fadeIn = function () {
	    this.show();
	    this.animateCss('fadeIn');
	  };
	
	  $.fn.fadeOut = function () {
	    var _this2 = this;
	
	    this.animateCss('fadeOut', function () {
	      _this2.hide();
	    });
	  };
	  $.fn.fadeInUp = function () {
	    this.show();
	    this.find('.mask').animateCss('fadeIn').next().animateCss('fadeInUpBig');
	  };
	
	  $.fn.fadeOutDown = function (cb) {
	    var _this3 = this;
	
	    this.find('.mask').animateCss('fadeOut').next().animateCss('fadeOutDownBig', function () {
	      _this3.hide();
	      if (cb) cb();
	    });
	  };
	
	  $.fn.showInfo = function () {
	    this.show().animateCss('fadeInUp');
	  };
	
	  $.fn.hideInfo = function () {
	    var _this4 = this;
	
	    this.animateCss('fadeOutUp', function () {
	      _this4.html('');
	      _this4.hide();
	    });
	  };
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	var initW = 640;
	var initH = 1008;
	var ratio = initW / initH;
	var needRatio = 284 / 427;
	var arr = [];
	exports.push = function (str, needRatio) {
	  arr.push([str, needRatio]);
	  resize();
	};
	
	function resize() {
	  var wW = window.innerWidth;
	  var wH = window.innerHeight;
	
	  var wRatio = wW / wH;
	  arr.forEach(function (item) {
	    if (wRatio > item[1]) {
	      var w = item[1] * wH;
	      var marginL = (wW - w) / 2;
	      $(item[0]).width(w);
	      $(item[0]).css({ "marginLeft": marginL });
	    }
	  });
	}
	window.onresize = function () {
	  resize();
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	
	
	'use strict';
	
	module.exports = {
	  debug: false,
	  storageName: 'libai_userInfo_version_3_11',
	  userInfo: {
	    openid: 'oPOant400Kkhb6qilPXFfrAw6qBk',
	
	    nickname: 'AA朱伟杰',
	    sex: '1',
	    province: '广东',
	    city: '广州',
	    country: '中国',
	    headimgurl: 'http://wx.qlogo.cn/mmopen/Xmnun9Io49TNwrKPL4SnYq7p5QkMaztSrxxJHWC3twTdYX7Ur39KeiczZeEUBUB3dwIcd49Xpe7w3sSxTXI0aCQ/0',
	    subscribe: 1
	  },
	  drawnInfo: {},
	  host: 'http://100jc.net/fourticket/public/fourCard',
	  server: 'http://100jc.net/fourticket',
	
	  qiniu: 'http://up.qiniu.com'
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _instance = void 0;
	var _loading = $('.tip.uploading');
	var uploaded = $('.tip.uploaded');
	
	var TipManager = function () {
	  function TipManager() {
	    _classCallCheck(this, TipManager);
	  }
	
	  _createClass(TipManager, null, [{
	    key: 'getInstance',
	    value: function getInstance() {
	      if (!_instance) {
	        _instance = new TipManager();
	      }
	      return _instance;
	    }
	  }, {
	    key: 'show',
	    value: function show(text) {
	      var $dom = $('<div class="info">' + text + '</div>');
	      $('.main').append($dom);
	      $dom.showInfo();
	      setTimeout(function () {
	        $dom.hideInfo();
	      }, 2500);
	    }
	  }, {
	    key: 'loading',
	    value: function loading(percent, text) {
	      _loading.find('.progress-bar').css({ width: percent + '%' });
	      _loading.find('.text').html(text);
	    }
	  }, {
	    key: 'loadingShow',
	    value: function loadingShow() {
	      _loading.fadeIn();
	      _loading.find('.progress-bar').css({ width: '0%' });
	    }
	  }, {
	    key: 'loadingHide',
	    value: function loadingHide() {
	      _loading.hide();
	    }
	  }, {
	    key: 'uploadedShow',
	    value: function uploadedShow() {
	      uploaded.fadeIn();
	    }
	  }, {
	    key: 'uploadedHide',
	    value: function uploadedHide() {
	      uploaded.fadeOut();
	    }
	  }]);
	
	  return TipManager;
	}();
	
	module.exports = TipManager;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Loading = function (_BaseClass) {
	  _inherits(Loading, _BaseClass);
	
	  function Loading(str) {
	    _classCallCheck(this, Loading);
	
	    return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).call(this, str));
	  }
	
	  _createClass(Loading, [{
	    key: "preload",
	    value: function preload(cb) {
	      var $img = $("img");
	      var loaded = 0;
	      var total = $img.length;
	      $img.each(function (i) {
	        if (this.complete) {
	          loaded++;
	          cb(loaded, total);
	        } else {
	          this.onload = function () {
	            loaded++;
	            cb(loaded, total);
	            this.onload = null;
	          };
	        }
	      });
	      if (!total) {
	        cb(loaded, total);
	      }
	    }
	  }, {
	    key: "hide",
	    value: function hide() {
	      this.$dom.hide();
	    }
	  }, {
	    key: "show",
	    value: function show() {
	      this.$dom.show();
	    }
	  }]);
	
	  return Loading;
	}(BaseClass);
	
	module.exports = Loading;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var HomeTest = function (_BaseClass) {
	  _inherits(HomeTest, _BaseClass);
	
	  function HomeTest(str) {
	    _classCallCheck(this, HomeTest);
	
	    return _possibleConstructorReturn(this, (HomeTest.__proto__ || Object.getPrototypeOf(HomeTest)).call(this, str));
	  }
	
	  _createClass(HomeTest, [{
	    key: 'init',
	    value: function init() {
	      _get(HomeTest.prototype.__proto__ || Object.getPrototypeOf(HomeTest.prototype), 'init', this).call(this);
	      var self = this;
	      this.$dom.find('.start_btn').on('tap', function () {
	        Popup.popup.show();
	        self.hide();
	      });
	    }
	  }]);
	
	  return HomeTest;
	}(BaseClass);
	
	module.exports = HomeTest;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var lastPage = function (_BaseClass) {
	  _inherits(lastPage, _BaseClass);
	
	  function lastPage(str) {
	    _classCallCheck(this, lastPage);
	
	    return _possibleConstructorReturn(this, (lastPage.__proto__ || Object.getPrototypeOf(lastPage)).call(this, str));
	  }
	
	  _createClass(lastPage, [{
	    key: 'init',
	    value: function init() {
	      _get(lastPage.prototype.__proto__ || Object.getPrototypeOf(lastPage.prototype), 'init', this).call(this);
	      var self = this;
	      this.$dom.find('.restart_btn').on('tap', function () {
	        View.home.show();
	        self.hide();
	      });
	
	      this.$dom.find('.buy_btn').on('tap', function () {
	        View.warning.show();
	        self.hide();
	      });
	    }
	  }]);
	
	  return lastPage;
	}(BaseClass);
	
	module.exports = lastPage;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var lastPage = function (_BaseClass) {
	  _inherits(lastPage, _BaseClass);
	
	  function lastPage(str) {
	    _classCallCheck(this, lastPage);
	
	    return _possibleConstructorReturn(this, (lastPage.__proto__ || Object.getPrototypeOf(lastPage)).call(this, str));
	  }
	
	  _createClass(lastPage, [{
	    key: 'init',
	    value: function init() {
	      _get(lastPage.prototype.__proto__ || Object.getPrototypeOf(lastPage.prototype), 'init', this).call(this);
	      var self = this;
	      this.$dom.find('.describe').on('tap', function () {
	        View.home.show();
	        self.hide();
	      });
	    }
	  }]);
	
	  return lastPage;
	}(BaseClass);
	
	module.exports = lastPage;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PopupTest = function (_BasePopupClass) {
	  _inherits(PopupTest, _BasePopupClass);
	
	  function PopupTest(str) {
	    _classCallCheck(this, PopupTest);
	
	    var _this = _possibleConstructorReturn(this, (PopupTest.__proto__ || Object.getPrototypeOf(PopupTest)).call(this, str));
	
	    _this.$dom.find('.describe').on('click', function () {
	      num = parseInt(_this.$dom.attr("number"));
	      var text = 1200;
	      _this.show_money('+' + text);
	      var total = _this.$dom.find('.total').html();
	      console.log(total);
	      _this.$dom.find('.total').html(parseInt(total) + parseInt(text));
	      if (num < 3) {
	        num++;
	
	        _this.question(num);
	        return;
	      }
	      return;
	    });
	    return _this;
	  }
	
	  _createClass(PopupTest, [{
	    key: 'last_choose',
	    value: function last_choose() {
	      var _this2 = this;
	
	      this.$dom.find(".q_last").on('click', function () {
	
	        _this2.hide();
	        View.lastPage.show();
	      });
	    }
	  }, {
	    key: 'show_money',
	    value: function show_money(text) {
	      var $dom = $('<div class="add_money">' + text + '</div>');
	      this.$dom.append($dom);
	      $dom.showInfo();
	      setTimeout(function () {
	        $dom.hideInfo();
	      }, 1000);
	    }
	  }, {
	    key: 'question',
	    value: function question(title) {
	      if (title == 3) {
	        this.$dom.find('.describe').attr("class", "q_last");
	        this.last_choose();
	      }
	      this.hide();
	      var message = '${message}' + '<p>第' + '${title}' + '题</p>';
	      var temp = message.replace('${message}', data[title - 1].describe).replace('${title}', data[title - 1].title);
	      this.$dom.find('.message').html(temp);
	      this.$dom.find('.choose_text_a').html(data[title - 1].qa);
	      this.$dom.find('.choose_text_b').html(data[title - 1].qb);
	      this.$dom.find('.choose_text_c').html(data[title - 1].qc);
	
	      this.$dom.attr("number", num);
	      this.show();
	    }
	  }, {
	    key: 'init',
	    value: function init() {
	      _get(PopupTest.prototype.__proto__ || Object.getPrototypeOf(PopupTest.prototype), 'init', this).call(this);
	    }
	  }]);
	
	  return PopupTest;
	}(BasePopupClass);
	
	module.exports = PopupTest;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map