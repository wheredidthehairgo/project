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
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	global.Util = __webpack_require__(1);
	global.BaseClass = __webpack_require__(2);
	global.BasePopupClass = __webpack_require__(3);
	global.ViewAdapt = __webpack_require__(4);
	global.Config = __webpack_require__(5);
	global.Clipboard = __webpack_require__(6);
	global.TipManager = __webpack_require__(14);
	global.shareApi = __webpack_require__(15);
	global.Gun = __webpack_require__(16);
	global.View = {};
	global.Popup = {};
	global.Data = {};
	
	var Loading = __webpack_require__(17);
	
	global.View.loading = new Loading();
	
	var Home = __webpack_require__(18);
	var Follow = __webpack_require__(19);
	var Ljq = __webpack_require__(20);
	var Iqy = __webpack_require__(21);
	var Ip7 = __webpack_require__(22);
	var Popups = __webpack_require__(23);
	var Share = __webpack_require__(24);
	var PrizeLjq = __webpack_require__(25);
	var PrizeIqy = __webpack_require__(26);
	var PrizeIp7 = __webpack_require__(27);
	
	var isLoaded = false;
	
	var isInitNet = false;
	
	global.View.loading.preLoadingJS(function () {
	  global.shareApi.auth(init);
	});
	
	function init(userInfo) {
	  audio();
	  Config.userInfo = userInfo;
	  global.shareApi.init();
	  initUI();
	  initUserInfo(Config.userInfo);
	  try {
	    dataSDK.pushUserInfo(userInfo);
	  } catch (e) {}
	
	  global.View.loading.preload(function () {
	    isLoaded = true;
	
	    complete();
	  });
	}
	
	function initUI() {
	  console.log('initUI');
	  $('.page, .popup, #main-bg').height($(window).innerHeight());
	  global.View.myPage = new global.BaseClass('.page');
	  global.View.follow = new Follow('.follow');
	  global.View.myHome = new Home('.home');
	  global.View.ljq = new Ljq('.lijianquan');
	  global.View.iqy = new Iqy('.iqiyi');
	  global.View.ip7 = new Ip7('.iphone');
	  global.Popup.popup = new global.BasePopupClass('.panel');
	  global.Popup.rule = new Popups('.rule');
	  global.Popup.share = new Share('.share');
	  global.Popup.tips = new Popups('.tips');
	  global.Popup.prizeIp7 = new PrizeIp7('.prize-ip7');
	  global.Popup.prizeIqy = new PrizeIqy('.prize-iqy');
	  global.Popup.prizeLjq = new PrizeLjq('.prize-ljq');
	}
	
	function complete() {
	  console.log('complete');
	  if (isInitNet && isLoaded) {
	    main();
	  }
	}
	
	function main() {
	  global.View.loading.hide();
	  if (Config.userInfo.subscribe === 0) {
	    global.View.myHome.hide();
	    global.View.follow.show();
	    return;
	  }
	  checkout(data);
	}
	
	function initUserInfo(userInfo) {
	  console.log(Config.server + 'add/');
	  $.post(Config.server + 'add/', {
	    openid: userInfo.openid,
	    nickname: userInfo.nickname,
	    headimg: userInfo.headimgurl,
	    sex: userInfo.sex,
	    province: userInfo.province,
	    city: userInfo.city,
	    country: userInfo.country
	  }, function (json) {
	    global.data = json.data;
	    isInitNet = true;
	
	    complete();
	  });
	}
	
	function checkout() {
	  console.log('提交用户信息成功!');
	  var data = global.data;
	  Config.user_id = typeof data === 'number' ? data : data.user_id;
	  if (!data.mobile) {
	    global.View.myHome.show();
	
	    switch (data.gift_id) {
	      case 1:
	        global.Popup.prizeIp7.show();break;
	      case 2:
	        global.Popup.prizeIqy.show();break;
	      case 3:
	        global.View.myHome.hide();global.View.ljq.show();break;
	    }
	    if (data.chance) {
	      Config.chance = data.chance;
	    }
	  } else if (data.mobile) {
	    global.View.myHome.hide();
	
	    switch (data.gift_id) {
	      case 1:
	        global.View.ip7.show();break;
	      case 2:
	        Config.ticket_id = data.ticket;global.View.iqy.show();break;
	      case 3:
	        global.View.ljq.show();break;
	    }
	  }
	}
	
	function audio() {
	  var audio = document.getElementById('audio');
	  document.addEventListener('WeixinJSBridgeReady', function () {
	    audio.play();
	  }, false);
	  audio.play();
	  $('body').one('tap', function () {
	    if (audio.paused) {
	      audio.play();
	    }
	  });
	  $('#music_off').click(function () {
	    if (audio.paused) {
	      audio.play();
	      $('#music').show();
	      $('#music_off').css('animation', 'RotateIn 1.5s linear infinite');
	      return;
	    }
	    audio.pause();
	    $('#music').hide();
	    $('#music_off').css('animation', 'none');
	  });
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	
	
	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.randomNum = function (Min, Max) {
	  var Range = Max - Min;
	  var Rand = Math.random();
	  return Min + Math.round(Rand * Range);
	};
	
	exports.getOption = function (key) {
	  var search = window.location.search;
	  if (search === '') {
	    return '';
	  }
	  search = search.slice(1);
	  var searchArr = search.split('&');
	  for (var i = 0; i < searchArr.length; i++) {
	    var arr = searchArr[i].split('=');
	    if (arr[0] === key) {
	      return arr[1];
	    }
	  }
	  return '';
	};
	
	exports.loadImg = function () {
	  var resources = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	  var $onLoadComplete = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	  var $onLoadProgress = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	  var $onLoadTarget = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	
	  var total = resources.length;
	  var loaded = 0;
	  if (total === 0) {
	    $onLoadComplete && $onLoadComplete.call($onLoadTarget);
	    return;
	  }
	  $.each(resources, function (index, src) {
	    var img = null;
	    if ((typeof src === 'undefined' ? 'undefined' : _typeof(src)) === 'object') {
	      img = src;
	    } else {
	      img = new window.Image();
	      img.src = src;
	    }
	    if (img.complete) {
	      loaded += 1;
	      if (loaded === total) {
	        $onLoadComplete && $onLoadComplete.call($onLoadTarget);
	      } else {
	        $onLoadProgress && $onLoadProgress.call($onLoadTarget, loaded, total);
	      }
	    } else {
	      img.onload = function () {
	        loaded += 1;
	        img.onload = null;
	        if (loaded === total) {
	          $onLoadComplete && $onLoadComplete.call($onLoadTarget);
	        } else {
	          $onLoadProgress && $onLoadProgress.call($onLoadTarget, loaded, total);
	        }
	      };
	    }
	    if (!total) {
	      $onLoadComplete && $onLoadComplete.call($onLoadTarget);
	    }
	  });
	};
	
	exports.setPhoto = function ($wrap, $photo, url) {
	  var ratio = parseInt($wrap.width() / $wrap.height() * 100, 10);
	  $photo[0].onload = function () {
	    $photo.css({ width: 'auto', height: 'auto' });
	    var ratioPhoto = parseInt($photo.width() / $photo.height() * 100, 10);
	    if (ratioPhoto === 100 || ratioPhoto > ratio) {
	      $photo.css({ width: '100%', height: 'auto' });
	    } else {
	      $photo.css({ width: 'auto', height: '100%' });
	    }
	  };
	  $photo.attr({ src: url });
	};
	
	if (typeof Object.assign !== 'function') {
	  Object.assign = function (target) {
	    if (target == null) {
	      throw new TypeError('Cannot convert undefined or null to object');
	    }
	
	    var target2 = Object(target);
	    for (var index = 1; index < arguments.length; index++) {
	      var source = arguments[index];
	      if (source != null) {
	        for (var key in source) {
	          if (Object.prototype.hasOwnProperty.call(source, key)) {
	            target2[key] = source[key];
	          }
	        }
	      }
	    }
	    return target2;
	  };
	}
	
	$.fn.extend({
	  animateCss: function animateCss(animationName, cb) {
	    var _this = this;
	
	    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	    this.addClass('animated ' + animationName).one(animationEnd, function () {
	      _this.removeClass('animated ' + animationName);
	      if (cb) {
	        cb();
	      }
	    });
	    return this;
	  },
	  fadeIn: function fadeIn() {
	    this.show();
	    this.animateCss('fadeIn');
	  },
	  fadeOut: function fadeOut() {
	    var _this2 = this;
	
	    this.animateCss('fadeOut', function () {
	      _this2.hide();
	    });
	  },
	  fadeInUp: function fadeInUp() {
	    this.show();
	    this.find('.mask').animateCss('fadeIn').next().animateCss('fadeInUpBig');
	  },
	  fadeOutDown: function fadeOutDown(cb) {
	    var _this3 = this;
	
	    this.find('.mask').animateCss('fadeOut').next().animateCss('fadeOutDownBig', function () {
	      _this3.hide();
	      if (cb) {
	        cb();
	      }
	    });
	  },
	  showInfo: function showInfo() {
	    this.show().animateCss('fadeInDown');
	  },
	  hideInfo: function hideInfo() {
	    var _this4 = this;
	
	    this.animateCss('fadeOutUp', function () {
	      _this4.html('');
	      _this4.hide();
	    });
	  }
	});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BaseClass = function () {
	  function BaseClass(str) {
	    _classCallCheck(this, BaseClass);
	
	    this.$dom = $(str);
	    this.$dom.hide();
	    this.init();
	    this.isShow = false;
	  }
	
	  _createClass(BaseClass, [{
	    key: 'init',
	    value: function init() {}
	  }, {
	    key: 'show',
	    value: function show() {
	      this.$dom.show();
	      $('body').scrollTop(0);
	      this.isShow = true;
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      this.$dom.hide();
	      this.isShow = false;
	    }
	  }]);
	
	  return BaseClass;
	}();
	
	module.exports = BaseClass;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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
	      this.$dom.fadeOutDown();
	    }
	  }]);
	
	  return BasePopupClass;
	}(BaseClass);
	
	module.exports = BasePopupClass;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';
	
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
	      $(item[0]).css({ 'marginLeft': marginL });
	    }
	  });
	}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	
	
	'use strict';
	
	var pre = 'tiger';
	module.exports = {
	  debug: true,
	  id: null,
	  super_name: pre,
	  appid: 'wx26be12d215d3d8cb',
	  storageName: 'libai_userInfo_version_322_s11',
	
	  userInfo: {
	    openid: 'test179',
	    nickname: 'kuku',
	    sex: '1',
	    province: '广东',
	    city: '广州',
	    country: '中国',
	    headimgurl: 'http://wx.qlogo.cn/mmopen/Xmnun9Io49TNwrKPL4SnYq7p5QkMaztSrxxJHWC3twTdYX7Ur39KeiczZeEUBUB3dwIcd49Xpe7w3sSxTXI0aCQ/0',
	    subscribe: 1
	  },
	
	  host: 'http://100jc.net/tigerGame/public/h5',
	
	  server: 'http://100jc.net/tigerGame/tiger/',
	
	  shareUrl: 'http://toupiao.91iot.net/'
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(7), __webpack_require__(9), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, require('./clipboard-action'), require('tiny-emitter'), require('good-listener'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, global.clipboardAction, global.tinyEmitter, global.goodListener);
	        global.clipboard = mod.exports;
	    }
	})(undefined, function (module, _clipboardAction, _tinyEmitter, _goodListener) {
	    'use strict';
	
	    var _clipboardAction2 = _interopRequireDefault(_clipboardAction);
	
	    var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);
	
	    var _goodListener2 = _interopRequireDefault(_goodListener);
	
	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }
	
	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }
	
	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }
	
	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();
	
	    function _possibleConstructorReturn(self, call) {
	        if (!self) {
	            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	        }
	
	        return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	    }
	
	    function _inherits(subClass, superClass) {
	        if (typeof superClass !== "function" && superClass !== null) {
	            throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	        }
	
	        subClass.prototype = Object.create(superClass && superClass.prototype, {
	            constructor: {
	                value: subClass,
	                enumerable: false,
	                writable: true,
	                configurable: true
	            }
	        });
	        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	    }
	
	    var Clipboard = function (_Emitter) {
	        _inherits(Clipboard, _Emitter);
	
	        function Clipboard(trigger, options) {
	            _classCallCheck(this, Clipboard);
	
	            var _this = _possibleConstructorReturn(this, (Clipboard.__proto__ || Object.getPrototypeOf(Clipboard)).call(this));
	
	            _this.resolveOptions(options);
	            _this.listenClick(trigger);
	            return _this;
	        }
	
	        _createClass(Clipboard, [{
	            key: 'resolveOptions',
	            value: function resolveOptions() {
	                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	                this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
	                this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
	                this.text = typeof options.text === 'function' ? options.text : this.defaultText;
	            }
	        }, {
	            key: 'listenClick',
	            value: function listenClick(trigger) {
	                var _this2 = this;
	
	                this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
	                    return _this2.onClick(e);
	                });
	            }
	        }, {
	            key: 'onClick',
	            value: function onClick(e) {
	                var trigger = e.delegateTarget || e.currentTarget;
	
	                if (this.clipboardAction) {
	                    this.clipboardAction = null;
	                }
	
	                this.clipboardAction = new _clipboardAction2.default({
	                    action: this.action(trigger),
	                    target: this.target(trigger),
	                    text: this.text(trigger),
	                    trigger: trigger,
	                    emitter: this
	                });
	            }
	        }, {
	            key: 'defaultAction',
	            value: function defaultAction(trigger) {
	                return getAttributeValue('action', trigger);
	            }
	        }, {
	            key: 'defaultTarget',
	            value: function defaultTarget(trigger) {
	                var selector = getAttributeValue('target', trigger);
	
	                if (selector) {
	                    return document.querySelector(selector);
	                }
	            }
	        }, {
	            key: 'defaultText',
	            value: function defaultText(trigger) {
	                return getAttributeValue('text', trigger);
	            }
	        }, {
	            key: 'destroy',
	            value: function destroy() {
	                this.listener.destroy();
	
	                if (this.clipboardAction) {
	                    this.clipboardAction.destroy();
	                    this.clipboardAction = null;
	                }
	            }
	        }], [{
	            key: 'isSupported',
	            value: function isSupported() {
	                var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['copy', 'cut'];
	
	                var actions = typeof action === 'string' ? [action] : action;
	                var support = !!document.queryCommandSupported;
	
	                actions.forEach(function (action) {
	                    support = support && !!document.queryCommandSupported(action);
	                });
	
	                return support;
	            }
	        }]);
	
	        return Clipboard;
	    }(_tinyEmitter2.default);
	
	    function getAttributeValue(suffix, element) {
	        var attribute = 'data-clipboard-' + suffix;
	
	        if (!element.hasAttribute(attribute)) {
	            return;
	        }
	
	        return element.getAttribute(attribute);
	    }
	
	    module.exports = Clipboard;
	});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	(function (global, factory) {
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== "undefined") {
	        factory(module, require('select'));
	    } else {
	        var mod = {
	            exports: {}
	        };
	        factory(mod, global.select);
	        global.clipboardAction = mod.exports;
	    }
	})(undefined, function (module, _select) {
	    'use strict';
	
	    var _select2 = _interopRequireDefault(_select);
	
	    function _interopRequireDefault(obj) {
	        return obj && obj.__esModule ? obj : {
	            default: obj
	        };
	    }
	
	    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	        return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	    } : function (obj) {
	        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	    };
	
	    function _classCallCheck(instance, Constructor) {
	        if (!(instance instanceof Constructor)) {
	            throw new TypeError("Cannot call a class as a function");
	        }
	    }
	
	    var _createClass = function () {
	        function defineProperties(target, props) {
	            for (var i = 0; i < props.length; i++) {
	                var descriptor = props[i];
	                descriptor.enumerable = descriptor.enumerable || false;
	                descriptor.configurable = true;
	                if ("value" in descriptor) descriptor.writable = true;
	                Object.defineProperty(target, descriptor.key, descriptor);
	            }
	        }
	
	        return function (Constructor, protoProps, staticProps) {
	            if (protoProps) defineProperties(Constructor.prototype, protoProps);
	            if (staticProps) defineProperties(Constructor, staticProps);
	            return Constructor;
	        };
	    }();
	
	    var ClipboardAction = function () {
	        function ClipboardAction(options) {
	            _classCallCheck(this, ClipboardAction);
	
	            this.resolveOptions(options);
	            this.initSelection();
	        }
	
	        _createClass(ClipboardAction, [{
	            key: 'resolveOptions',
	            value: function resolveOptions() {
	                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	                this.action = options.action;
	                this.emitter = options.emitter;
	                this.target = options.target;
	                this.text = options.text;
	                this.trigger = options.trigger;
	
	                this.selectedText = '';
	            }
	        }, {
	            key: 'initSelection',
	            value: function initSelection() {
	                if (this.text) {
	                    this.selectFake();
	                } else if (this.target) {
	                    this.selectTarget();
	                }
	            }
	        }, {
	            key: 'selectFake',
	            value: function selectFake() {
	                var _this = this;
	
	                var isRTL = document.documentElement.getAttribute('dir') == 'rtl';
	
	                this.removeFake();
	
	                this.fakeHandlerCallback = function () {
	                    return _this.removeFake();
	                };
	                this.fakeHandler = document.body.addEventListener('click', this.fakeHandlerCallback) || true;
	
	                this.fakeElem = document.createElement('textarea');
	
	                this.fakeElem.style.fontSize = '12pt';
	
	                this.fakeElem.style.border = '0';
	                this.fakeElem.style.padding = '0';
	                this.fakeElem.style.margin = '0';
	
	                this.fakeElem.style.position = 'absolute';
	                this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
	
	                var yPosition = window.pageYOffset || document.documentElement.scrollTop;
	                this.fakeElem.style.top = yPosition + 'px';
	
	                this.fakeElem.setAttribute('readonly', '');
	                this.fakeElem.value = this.text;
	
	                document.body.appendChild(this.fakeElem);
	
	                this.selectedText = (0, _select2.default)(this.fakeElem);
	                this.copyText();
	            }
	        }, {
	            key: 'removeFake',
	            value: function removeFake() {
	                if (this.fakeHandler) {
	                    document.body.removeEventListener('click', this.fakeHandlerCallback);
	                    this.fakeHandler = null;
	                    this.fakeHandlerCallback = null;
	                }
	
	                if (this.fakeElem) {
	                    document.body.removeChild(this.fakeElem);
	                    this.fakeElem = null;
	                }
	            }
	        }, {
	            key: 'selectTarget',
	            value: function selectTarget() {
	                this.selectedText = (0, _select2.default)(this.target);
	                this.copyText();
	            }
	        }, {
	            key: 'copyText',
	            value: function copyText() {
	                var succeeded = void 0;
	
	                try {
	                    succeeded = document.execCommand(this.action);
	                } catch (err) {
	                    succeeded = false;
	                }
	
	                this.handleResult(succeeded);
	            }
	        }, {
	            key: 'handleResult',
	            value: function handleResult(succeeded) {
	                this.emitter.emit(succeeded ? 'success' : 'error', {
	                    action: this.action,
	                    text: this.selectedText,
	                    trigger: this.trigger,
	                    clearSelection: this.clearSelection.bind(this)
	                });
	            }
	        }, {
	            key: 'clearSelection',
	            value: function clearSelection() {
	                if (this.target) {
	                    this.target.blur();
	                }
	
	                window.getSelection().removeAllRanges();
	            }
	        }, {
	            key: 'destroy',
	            value: function destroy() {
	                this.removeFake();
	            }
	        }, {
	            key: 'action',
	            set: function set() {
	                var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'copy';
	
	                this._action = action;
	
	                if (this._action !== 'copy' && this._action !== 'cut') {
	                    throw new Error('Invalid "action" value, use either "copy" or "cut"');
	                }
	            },
	            get: function get() {
	                return this._action;
	            }
	        }, {
	            key: 'target',
	            set: function set(target) {
	                if (target !== undefined) {
	                    if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
	                        if (this.action === 'copy' && target.hasAttribute('disabled')) {
	                            throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
	                        }
	
	                        if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
	                            throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
	                        }
	
	                        this._target = target;
	                    } else {
	                        throw new Error('Invalid "target" value, use a valid Element');
	                    }
	                }
	            },
	            get: function get() {
	                return this._target;
	            }
	        }]);
	
	        return ClipboardAction;
	    }();
	
	    module.exports = ClipboardAction;
	});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';
	
	function select(element) {
	    var selectedText;
	
	    if (element.nodeName === 'SELECT') {
	        element.focus();
	
	        selectedText = element.value;
	    } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
	        var isReadOnly = element.hasAttribute('readonly');
	
	        if (!isReadOnly) {
	            element.setAttribute('readonly', '');
	        }
	
	        element.select();
	        element.setSelectionRange(0, element.value.length);
	
	        if (!isReadOnly) {
	            element.removeAttribute('readonly');
	        }
	
	        selectedText = element.value;
	    } else {
	        if (element.hasAttribute('contenteditable')) {
	            element.focus();
	        }
	
	        var selection = window.getSelection();
	        var range = document.createRange();
	
	        range.selectNodeContents(element);
	        selection.removeAllRanges();
	        selection.addRange(range);
	
	        selectedText = selection.toString();
	    }
	
	    return selectedText;
	}
	
	module.exports = select;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";
	
	function E() {}
	
	E.prototype = {
	  on: function on(name, callback, ctx) {
	    var e = this.e || (this.e = {});
	
	    (e[name] || (e[name] = [])).push({
	      fn: callback,
	      ctx: ctx
	    });
	
	    return this;
	  },
	
	  once: function once(name, callback, ctx) {
	    var self = this;
	    function listener() {
	      self.off(name, listener);
	      callback.apply(ctx, arguments);
	    };
	
	    listener._ = callback;
	    return this.on(name, listener, ctx);
	  },
	
	  emit: function emit(name) {
	    var data = [].slice.call(arguments, 1);
	    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
	    var i = 0;
	    var len = evtArr.length;
	
	    for (i; i < len; i++) {
	      evtArr[i].fn.apply(evtArr[i].ctx, data);
	    }
	
	    return this;
	  },
	
	  off: function off(name, callback) {
	    var e = this.e || (this.e = {});
	    var evts = e[name];
	    var liveEvents = [];
	
	    if (evts && callback) {
	      for (var i = 0, len = evts.length; i < len; i++) {
	        if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
	      }
	    }
	
	    liveEvents.length ? e[name] = liveEvents : delete e[name];
	
	    return this;
	  }
	};
	
	module.exports = E;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var is = __webpack_require__(11);
	var delegate = __webpack_require__(12);
	
	function listen(target, type, callback) {
	    if (!target && !type && !callback) {
	        throw new Error('Missing required arguments');
	    }
	
	    if (!is.string(type)) {
	        throw new TypeError('Second argument must be a String');
	    }
	
	    if (!is.fn(callback)) {
	        throw new TypeError('Third argument must be a Function');
	    }
	
	    if (is.node(target)) {
	        return listenNode(target, type, callback);
	    } else if (is.nodeList(target)) {
	        return listenNodeList(target, type, callback);
	    } else if (is.string(target)) {
	        return listenSelector(target, type, callback);
	    } else {
	        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
	    }
	}
	
	function listenNode(node, type, callback) {
	    node.addEventListener(type, callback);
	
	    return {
	        destroy: function destroy() {
	            node.removeEventListener(type, callback);
	        }
	    };
	}
	
	function listenNodeList(nodeList, type, callback) {
	    Array.prototype.forEach.call(nodeList, function (node) {
	        node.addEventListener(type, callback);
	    });
	
	    return {
	        destroy: function destroy() {
	            Array.prototype.forEach.call(nodeList, function (node) {
	                node.removeEventListener(type, callback);
	            });
	        }
	    };
	}
	
	function listenSelector(selector, type, callback) {
	    return delegate(document.body, selector, type, callback);
	}
	
	module.exports = listen;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict';
	
	exports.node = function (value) {
	  return value !== undefined && value instanceof HTMLElement && value.nodeType === 1;
	};
	
	exports.nodeList = function (value) {
	  var type = Object.prototype.toString.call(value);
	
	  return value !== undefined && (type === '[object NodeList]' || type === '[object HTMLCollection]') && 'length' in value && (value.length === 0 || exports.node(value[0]));
	};
	
	exports.string = function (value) {
	  return typeof value === 'string' || value instanceof String;
	};
	
	exports.fn = function (value) {
	  var type = Object.prototype.toString.call(value);
	
	  return type === '[object Function]';
	};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var closest = __webpack_require__(13);
	
	function delegate(element, selector, type, callback, useCapture) {
	    var listenerFn = listener.apply(this, arguments);
	
	    element.addEventListener(type, listenerFn, useCapture);
	
	    return {
	        destroy: function destroy() {
	            element.removeEventListener(type, listenerFn, useCapture);
	        }
	    };
	}
	
	function listener(element, selector, type, callback) {
	    return function (e) {
	        e.delegateTarget = closest(e.target, selector);
	
	        if (e.delegateTarget) {
	            callback.call(element, e);
	        }
	    };
	}
	
	module.exports = delegate;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	'use strict';
	
	var DOCUMENT_NODE_TYPE = 9;
	
	if (typeof Element !== 'undefined' && !Element.prototype.matches) {
	    var proto = Element.prototype;
	
	    proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
	}
	
	function closest(element, selector) {
	    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
	        if (element.matches(selector)) return element;
	        element = element.parentNode;
	    }
	}
	
	module.exports = closest;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

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
	    value: function loading() {
	      var percent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var text = arguments[1];
	
	      _loading.find('.progress-bar').css({ width: percent + '%' });
	      _loading.find('.text').html(text);
	    }
	  }, {
	    key: 'loadingShow',
	    value: function loadingShow() {
	      _loading.show();
	      _loading.find('.progress-bar').css({ width: '0%' });
	    }
	  }, {
	    key: 'netLoadingShow',
	    value: function netLoadingShow() {
	      $('.net-loading').show();
	    }
	  }, {
	    key: 'netLoadingHide',
	    value: function netLoadingHide() {
	      $('.net-loading').hide();
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
	  }, {
	    key: 'loadImgShow',
	    value: function loadImgShow() {
	      $('.loading-img').show();
	    }
	  }, {
	    key: 'loadImgHide',
	    value: function loadImgHide() {
	      $('.loading-img').hide();
	    }
	  }]);
	
	  return TipManager;
	}();
	
	module.exports = TipManager;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	'use strict';
	
	var wechat = new Wechat(Config.appid);
	var TITLE = '疯狂摇摇乐';
	var DESC = '晓明baby邀你一起玩游戏！壕礼等你拿，100%中奖！';
	var IMGURL = Config.host + '/resources/img/icon.jpg';
	var LINK = dealUrl(wechat.filter(['code', 'id'], { share: 'share' }));
	
	function dealUrl(url) {
	  try {
	    return dataSDK.dealUrl(url);
	  } catch (e) {
	    return url;
	  }
	}
	
	exports.init = function () {
	  wechat.config();
	  exports.share();
	};
	
	exports.share = function () {
	  var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : TITLE;
	  var desc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DESC;
	  var link = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : LINK;
	  var imgUrl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : IMGURL;
	
	  wechat.shareFriend({
	    appmessageTitle: title,
	    appmessageDesc: desc,
	    link: link,
	    imgUrl: imgUrl
	  }, function () {
	    try {
	      dataSDK.share('friend');
	    } catch (e) {}
	  });
	  wechat.shareTimeline({
	    timelineTitle: title,
	    link: link,
	    imgUrl: imgUrl
	  }, function () {
	    try {
	      dataSDK.share('timeline');
	    } catch (e) {}
	  });
	};
	
	exports.auth = function (cb) {
	  if (Config.debug && Util.getOption('debug')) {
	    cb(Config.userInfo);
	  } else if (window.localStorage.getItem(Config.storageName)) {
	    var _userInfo = JSON.parse(window.localStorage.getItem(Config.storageName));
	
	    wechat.getSubscribe(_userInfo.openid, function (err, res) {
	      if (err) {
	        return alert(err);
	      }
	      _userInfo.subscribe = res.subscribe;
	      window.localStorage.setItem(Config.storageName, JSON.stringify(_userInfo));
	      cb(_userInfo);
	    });
	  } else if (wechat.getQuery('code')) {
	    wechat.ready(function () {
	      wechat.getUserInfo(function (err, res) {
	        if (err) {
	          return wechat.goAuth('snsapi_userinfo', 'STATE', wechat.filter());
	        }
	        console.log(res);
	        wechat.getSubscribe(res.openid, function (err, res2) {
	          if (err) {
	            return alert(err);
	          }
	          res.subscribe = res2.subscribe;
	          window.localStorage.setItem(Config.storageName, JSON.stringify(res));
	          cb(res);
	        });
	      });
	    });
	  } else {
	    wechat.goAuth('snsapi_userinfo', 'STATE', wechat.filter());
	  }
	};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	'use strict';
	
	module.exports = {
	    reset: function reset(str) {
	        $(str).css('backgroundPositionY', 0);
	    },
	    starmove: function starmove(str, value, i, fn) {
	        var total = -(100 * 45 - 100 * value);
	        var now = value * 100;
	        $(str).animate({
	            backgroundPositionY: total + '%'
	        }, {
	            duration: 3000 + i * 1000,
	            easing: "swing",
	            complete: function complete() {
	                $(str).css('backgroundPositionY', now + '%');
	                fn();
	            }
	        });
	    }
	};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Loading = function () {
	  function Loading() {
	    _classCallCheck(this, Loading);
	
	    this.init();
	  }
	
	  _createClass(Loading, [{
	    key: 'init',
	    value: function init() {
	      $('.pre-loading-js').show();
	      $('.loading-img').hide();
	      $('.loading-net').hide();
	    }
	  }, {
	    key: 'preLoadingJS',
	    value: function preLoadingJS(cb) {
	      var onload = false,
	          loadImg = false;
	      window.onload = function () {
	        onload = true;
	        callBack();
	      };
	      Util.loadImg([], function () {
	        loadImg = true;
	        callBack();
	      }, null, null);
	      function callBack() {
	        if (onload && loadImg) {
	          $('.pre-loading-js').hide();
	          cb();
	        }
	      }
	    }
	  }, {
	    key: 'preload',
	    value: function preload(cb) {
	      $('.loading-img').show();
	      Util.loadImg($('img'), cb, null, null);
	    }
	  }, {
	    key: 'hide',
	    value: function hide() {
	      $('.loading-img').hide();
	    }
	  }, {
	    key: 'netLoadingShow',
	    value: function netLoadingShow() {
	      $('.loading-net').show();
	    }
	  }, {
	    key: 'netLoadingHide',
	    value: function netLoadingHide() {
	      $('.loading-net').hide();
	    }
	  }]);
	
	  return Loading;
	}();
	
	module.exports = Loading;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Home = function (_BaseClass) {
	    _inherits(Home, _BaseClass);
	
	    function Home(str) {
	        _classCallCheck(this, Home);
	
	        return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, str));
	    }
	
	    _createClass(Home, [{
	        key: "init",
	        value: function init() {
	            _get(Home.prototype.__proto__ || Object.getPrototypeOf(Home.prototype), "init", this).call(this);
	            ViewAdapt.push('.home.page', 342 / 523);
	            this.numBox = this.$dom.find(".laohuji-container");
	            this.num = $(this.numBox).find(".laohuji-part");
	            this.btn = this.$dom.find(".play-btn");
	            this.height = $(this.num).innerHeight();
	            this.count = 0;
	            this.isBegin = false;
	            this.run();
	            this.showlist();
	            this.$dom.find('.rule-btn').on('tap', function () {
	                global.Popup.rule.show();
	            });
	            this.$dom.find('.share-btn').on('tap', function () {
	                global.Popup.share.show();
	            });
	        }
	    }, {
	        key: "run",
	        value: function run() {
	            var _this2 = this;
	
	            this.value = [];
	
	            $(this.btn).on("click", function () {
	                try {
	                    dataSDK.btnClick('button1', '抽奖');
	                } catch (e) {}
	                if (_this2.isBegin) return false;
	                $.ajax({
	                    type: 'put',
	                    url: Config.server.concat('lottery/', Config.user_id)
	                }).done(function (json) {
	                    if (json.code == 1003) {
	                        global.Popup.tips.show();
	                        return;
	                    } else {
	                        _this2.gift = json.data.gift_id;
	                        _this2.isBegin = true;
	
	                        var myvalue = parseInt(Math.random() * 3);
	                        $.each(_this2.num, function (i, n) {
	                            _this2.value[i] = myvalue;
	                            var value = _this2.value[i];
	                            Gun.reset(n);
	                            Gun.starmove(n, value, i, _this2.jugde.bind(_this2));
	                        });
	                    }
	                });
	            });
	        }
	    }, {
	        key: "jugde",
	        value: function jugde() {
	            var _this3 = this;
	
	            this.count++;
	            if (this.count == 3) {
	                setTimeout(function () {
	                    switch (_this3.gift) {
	                        case 1:
	                            global.Popup.prizeIp7.show();break;
	                        case 2:
	                            global.Popup.prizeIqy.show();break;
	                        case 3:
	                            global.View.myHome.hide();global.View.ljq.show();break;
	                    }
	                    _this3.isBegin = false;
	                    _this3.count = 0;
	                }, 4000);
	            }
	        }
	    }, {
	        key: "showlist",
	        value: function showlist() {
	            $.get(Config.server + 'list/', function (json) {
	                var data = json.data[0];
	                var index = 0;
	                var gift = void 0;
	                setInterval(function () {
	                    if (data[index].gift_id) {
	                        switch (data[index].gift_id) {
	                            case 1:
	                                gift = 'Iphone7';break;
	                            case 2:
	                                gift = '爱奇艺会员';break;
	                            case 3:
	                                gift = '立减券';break;
	                        }
	                        $('.prize-content div').html("\u4E2D\u5956\u540D\u5355\uFF1A" + data[index].nickname + "\u83B7\u5F97" + gift);
	                    } else {
	                        return;
	                    }
	                    index++;
	                    index = index >= data.length ? 0 : index;
	                }, 3000);
	            });
	        }
	    }]);
	
	    return Home;
	}(BaseClass);
	
	module.exports = Home;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Follow = function (_BaseClass) {
	  _inherits(Follow, _BaseClass);
	
	  function Follow(str) {
	    _classCallCheck(this, Follow);
	
	    return _possibleConstructorReturn(this, (Follow.__proto__ || Object.getPrototypeOf(Follow)).call(this, str));
	  }
	
	  _createClass(Follow, [{
	    key: 'init',
	    value: function init() {
	      ViewAdapt.push('.follow.page', 640 / 900);
	    }
	  }]);
	
	  return Follow;
	}(BaseClass);
	
	module.exports = Follow;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Ljq = function (_BaseClass) {
	    _inherits(Ljq, _BaseClass);
	
	    function Ljq(str) {
	        _classCallCheck(this, Ljq);
	
	        ViewAdapt.push('.lijianquan', 342 / 523);
	        return _possibleConstructorReturn(this, (Ljq.__proto__ || Object.getPrototypeOf(Ljq)).call(this, str));
	    }
	
	    _createClass(Ljq, [{
	        key: 'init',
	        value: function init() {
	            _get(Ljq.prototype.__proto__ || Object.getPrototypeOf(Ljq.prototype), 'init', this).call(this);
	            this.$dom.find('#btn-exchange').on('tap', function () {
	                try {
	                    dataSDK.btnClick('button3', '跳转到立白券兑换处');
	                } catch (e) {}
	                window.location.href = 'http://55952265.m.weimob.com/vshop/55952265/Coupon/CouponTemplate?CouponTemplateNo=46513317281e465e8fb928e2dd8427f8';
	            });
	        }
	    }]);
	
	    return Ljq;
	}(BaseClass);
	
	module.exports = Ljq;

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Iqy = function (_BaseClass) {
	    _inherits(Iqy, _BaseClass);
	
	    function Iqy(str) {
	        _classCallCheck(this, Iqy);
	
	        ViewAdapt.push('.iqiyi', 342 / 523);
	        return _possibleConstructorReturn(this, (Iqy.__proto__ || Object.getPrototypeOf(Iqy)).call(this, str));
	    }
	
	    _createClass(Iqy, [{
	        key: 'init',
	        value: function init() {
	            _get(Iqy.prototype.__proto__ || Object.getPrototypeOf(Iqy.prototype), 'init', this).call(this);
	            this.$dom.find('#btn-exchange').on('tap', function () {
	                try {
	                    dataSDK.btnClick('button2', '跳转到爱奇艺');
	                } catch (e) {}
	                window.location.href = 'http://vip.iqiyi.com/jihuoma.html';
	            });
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            _get(Iqy.prototype.__proto__ || Object.getPrototypeOf(Iqy.prototype), 'show', this).call(this);
	            this.$dom.find('#copy-content').text(Config.ticket_id);
	            var id = this.$dom.find('#copy-content').text();
	            this.$dom.find('#btn-copy').on('tap', function () {
	                TipManager.show("请手动复制");
	            });
	        }
	    }]);
	
	    return Iqy;
	}(BaseClass);
	
	module.exports = Iqy;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Ip7 = function (_BaseClass) {
	    _inherits(Ip7, _BaseClass);
	
	    function Ip7(str) {
	        _classCallCheck(this, Ip7);
	
	        ViewAdapt.push('.iphone', 342 / 523);
	        return _possibleConstructorReturn(this, (Ip7.__proto__ || Object.getPrototypeOf(Ip7)).call(this, str));
	    }
	
	    _createClass(Ip7, [{
	        key: 'init',
	        value: function init() {
	            _get(Ip7.prototype.__proto__ || Object.getPrototypeOf(Ip7.prototype), 'init', this).call(this);
	        }
	    }]);
	
	    return Ip7;
	}(BaseClass);
	
	module.exports = Ip7;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Popups = function (_BasePopupClass) {
	  _inherits(Popups, _BasePopupClass);
	
	  function Popups(str) {
	    _classCallCheck(this, Popups);
	
	    return _possibleConstructorReturn(this, (Popups.__proto__ || Object.getPrototypeOf(Popups)).call(this, str));
	  }
	
	  _createClass(Popups, [{
	    key: 'init',
	    value: function init() {
	      var _this2 = this;
	
	      _get(Popups.prototype.__proto__ || Object.getPrototypeOf(Popups.prototype), 'init', this).call(this);
	      this.$dom.find('.close').on('tap', function () {
	        _this2.hide();
	      });
	      this.$dom.find('#btn-confirm').on('tap', function () {
	        _this2.hide();
	      });
	    }
	  }]);
	
	  return Popups;
	}(BasePopupClass);
	
	module.exports = Popups;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Share = function (_BasePopupClass) {
	  _inherits(Share, _BasePopupClass);
	
	  function Share(str) {
	    _classCallCheck(this, Share);
	
	    return _possibleConstructorReturn(this, (Share.__proto__ || Object.getPrototypeOf(Share)).call(this, str));
	  }
	
	  _createClass(Share, [{
	    key: 'init',
	    value: function init() {
	      var _this2 = this;
	
	      this.$dom.on('tap', function () {
	        _this2.hide();
	      });
	    }
	  }]);
	
	  return Share;
	}(BasePopupClass);
	
	module.exports = Share;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PrizeLjq = function (_BasePopupClass) {
	  _inherits(PrizeLjq, _BasePopupClass);
	
	  function PrizeLjq(str) {
	    _classCallCheck(this, PrizeLjq);
	
	    return _possibleConstructorReturn(this, (PrizeLjq.__proto__ || Object.getPrototypeOf(PrizeLjq)).call(this, str));
	  }
	
	  _createClass(PrizeLjq, [{
	    key: 'init',
	    value: function init() {
	      _get(PrizeLjq.prototype.__proto__ || Object.getPrototypeOf(PrizeLjq.prototype), 'init', this).call(this);
	      this.isLoad = false;
	      var self = this;
	      this.$dom.find('.btn-identify').on('tap', function () {
	        if (self.isLoad) {
	          return false;
	        }
	        var phone = self.$dom.find("#input-phone").val();
	        if (phone === "") {
	          TipManager.show("手机号不能为空");
	        } else if (!/^\d{11}$/i.test(String(phone))) {
	          TipManager.show("手机号格式错误");
	        } else {
	          var id = Config.user_id;
	          $.ajax({
	            type: 'put',
	            url: Config.server.concat('code/', id, '/', phone)
	          }).done(function (json) {
	            if (json.code === 0) {
	              self.setTime();
	            } else if (json.code === 1) {
	              TipManager.show("发送失败");
	            }
	          });
	        }
	      });
	      this.$dom.find('#btn-submit').on('tap', function () {
	        var phone = self.$dom.find("#input-phone").val();
	        var check = self.$dom.find("#input-check").val();
	        if (phone === "") {
	          TipManager.show("手机号不能为空");
	        } else if (!/^\d{11}$/i.test(String(phone))) {
	          TipManager.show("手机号格式错误");
	        } else if (check === '') {
	          TipManager.show("没有输入验证码");
	        } else {
	          var myid = Config.user_id;
	          $.ajax({
	            type: 'put',
	            url: Config.server.concat('check/', myid, '/', phone, '/', check)
	          }).done(function (json) {
	            if (json.code === 0) {
	              TipManager.show("验证成功");
	              global.View.myHome.hide();
	              global.View.ljq.show();
	              self.hide();
	            } else if (json.code === 1) {
	              TipManager.show("发送失败");
	            }
	          });
	        }
	      });
	    }
	  }, {
	    key: 'setTime',
	    value: function setTime() {
	      var _this2 = this;
	
	      this.$dom.find(".btn-identify span").text("60秒后重试");
	      var timer = 59;
	      var time = setInterval(function () {
	        if (timer <= 0) {
	          _this2.$dom.find(".btn-identify span").text("发送验证码");
	          clearInterval(time);
	          return;
	        } else {
	          _this2.$dom.find(".btn-identify span").text(timer + "秒后重试");
	          _this2.isLoad = true;
	          timer--;
	        }
	      }, 1000);
	    }
	  }]);
	
	  return PrizeLjq;
	}(BasePopupClass);
	
	module.exports = PrizeLjq;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PrizeIqy = function (_BasePopupClass) {
	  _inherits(PrizeIqy, _BasePopupClass);
	
	  function PrizeIqy(str) {
	    _classCallCheck(this, PrizeIqy);
	
	    return _possibleConstructorReturn(this, (PrizeIqy.__proto__ || Object.getPrototypeOf(PrizeIqy)).call(this, str));
	  }
	
	  _createClass(PrizeIqy, [{
	    key: 'init',
	    value: function init() {
	      _get(PrizeIqy.prototype.__proto__ || Object.getPrototypeOf(PrizeIqy.prototype), 'init', this).call(this);
	      this.isLoad = false;
	      var self = this;
	      this.$dom.find('.btn-identify').on('tap', function () {
	        try {
	          dataSDK.btnClick('button6', '爱奇艺验证');
	        } catch (e) {}
	        if (self.isLoad) {
	          return false;
	        };
	        var phone = self.$dom.find("#input-phone").val();
	        if (phone === "") {
	          TipManager.show("手机号不能为空");
	        } else if (!/^\d{11}$/i.test(String(phone))) {
	          TipManager.show("手机号格式错误");
	        } else {
	          var id = Config.user_id;
	          $.ajax({
	            type: 'put',
	            url: Config.server.concat('code/', id, '/', phone)
	          }).done(function (json) {
	            if (json.code === 0) {
	              self.setTime();
	            } else if (json.code === 1) {
	              TipManager.show("发送失败");
	            }
	          });
	        }
	      });
	      this.$dom.find('#btn-submit').on('tap', function () {
	        try {
	          dataSDK.btnClick('button7', '爱奇艺提交');
	        } catch (e) {}
	        var phone = self.$dom.find("#input-phone").val();
	        var check = self.$dom.find("#input-check").val();
	        if (phone === "") {
	          TipManager.show("手机号不能为空");
	        } else if (!/^\d{11}$/i.test(String(phone))) {
	          TipManager.show("手机号格式错误");
	        } else if (check === '') {
	          TipManager.show("没有输入验证码");
	        } else {
	          var myid = Config.user_id;
	          $.ajax({
	            type: 'put',
	            url: Config.server.concat('check/', myid, '/', phone, '/', check)
	          }).done(function (json) {
	            if (json.code === 0) {
	              var data = json.data;
	              console.log(data);
	              Config.ticket_id = data.ticket_id;
	              TipManager.show("验证成功");
	              global.View.myHome.hide();
	              global.View.iqy.show();
	              self.hide();
	            } else if (json.code === 1006 || json.code === 1) {
	              TipManager.show("没有爱奇艺码");
	            }
	          });
	        }
	      });
	    }
	  }, {
	    key: 'setTime',
	    value: function setTime() {
	      var _this2 = this;
	
	      this.$dom.find(".btn-identify span").text("60秒后重试");
	      var timer = 59;
	      var time = setInterval(function () {
	        if (timer <= 0) {
	          _this2.$dom.find(".btn-identify span").text("发送验证码");
	          clearInterval(time);
	          return;
	        } else {
	          _this2.$dom.find(".btn-identify span").text(timer + "秒后重试");
	          _this2.isLoad = true;
	          timer--;
	        }
	      }, 1000);
	    }
	  }]);
	
	  return PrizeIqy;
	}(BasePopupClass);
	
	module.exports = PrizeIqy;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PrizeIp7 = function (_BasePopupClass) {
	  _inherits(PrizeIp7, _BasePopupClass);
	
	  function PrizeIp7(str) {
	    _classCallCheck(this, PrizeIp7);
	
	    return _possibleConstructorReturn(this, (PrizeIp7.__proto__ || Object.getPrototypeOf(PrizeIp7)).call(this, str));
	  }
	
	  _createClass(PrizeIp7, [{
	    key: 'init',
	    value: function init() {
	      _get(PrizeIp7.prototype.__proto__ || Object.getPrototypeOf(PrizeIp7.prototype), 'init', this).call(this);
	      this.isLoad = false;
	      var self = this;
	      this.$dom.find('#btn-check').on('tap', function () {
	        self.$dom.find('#show1').hide();
	        self.$dom.find('#show2').show();
	      });
	      this.$dom.find('.btn-identify').on('tap', function () {
	        try {
	          dataSDK.btnClick('button4', 'Iphone7验证');
	        } catch (e) {}
	        if (self.isLoad) {
	          return false;
	        };
	        var phone = self.$dom.find("#input-phone").val();
	        if (phone === "") {
	          TipManager.show("手机号不能为空");
	          return;
	        } else if (!/^\d{11}$/i.test(String(phone))) {
	          TipManager.show("手机号格式错误");
	          return;
	        } else {
	          var id = Config.user_id;
	          $.ajax({
	            type: 'put',
	            url: Config.server.concat('code/', id, '/', phone)
	          }).done(function (json) {
	            if (json.code === 0) {
	              self.setTime();
	            }
	          });
	        }
	      });
	      this.$dom.find('#btn-submit').on('tap', function () {
	        try {
	          dataSDK.btnClick('button5', 'Iphone7提交名单');
	        } catch (e) {}
	        var phone = self.$dom.find("#input-phone").val();
	        var check = self.$dom.find("#input-check").val();
	        var myname = self.$dom.find("#input-name").val();
	        var myaddress = self.$dom.find("#input-address").val();
	        if (myname === '') {
	          TipManager.show('名字不能为空');
	          return;
	        } else if (myaddress === '') {
	          TipManager.show('地址不能为空');
	          return;
	        } else if (phone === "") {
	          TipManager.show("手机号不能为空");
	          return;
	        } else if (!/^\d{11}$/i.test(String(phone))) {
	          TipManager.show("手机号格式错误");
	          return;
	        } else if (check === '') {
	          TipManager.show("没有输入验证码");
	          return;
	        } else {
	          var myid = Config.user_id;
	          $.ajax({
	            type: 'put',
	            url: Config.server.concat('check/', myid, '/', phone, '/', check),
	            data: {
	              address: myaddress,
	              realname: myname
	            }
	          }).done(function (json) {
	            if (json.code === 0) {
	              TipManager.show("验证成功");
	              global.View.myHome.hide();
	              global.View.ip7.show();
	              self.hide();
	            } else if (json.code === 1) {
	              TipManager.show("发送失败");
	            }
	          });
	        }
	      });
	    }
	  }, {
	    key: 'setTime',
	    value: function setTime() {
	      var _this2 = this;
	
	      this.$dom.find(".btn-identify span").text("60秒后重试");
	      var timer = 59;
	      var time = setInterval(function () {
	        if (timer <= 0) {
	          _this2.$dom.find(".btn-identify span").text("发送验证码");
	          clearInterval(time);
	          return;
	        } else {
	          _this2.$dom.find(".btn-identify span").text(timer + "秒后重试");
	          _this2.isLoad = true;
	          timer--;
	        }
	      }, 1000);
	    }
	  }]);
	
	  return PrizeIp7;
	}(BasePopupClass);
	
	module.exports = PrizeIp7;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map