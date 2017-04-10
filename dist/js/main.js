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
	
	global.Util = __webpack_require__(1);
	global.BaseClass = __webpack_require__(2);
	global.BasePopupClass = __webpack_require__(3);
	global.ViewAdapt = __webpack_require__(4);
	global.Config = __webpack_require__(5);
	global.TipManager = __webpack_require__(6);
	global.shareApi = __webpack_require__(7);
	global.Gun = __webpack_require__(8);
	global.View = {};
	global.Popup = {};
	global.Data = {};
	
	var Loading = __webpack_require__(9);
	
	global.View.loading = new Loading();
	
	var Home = __webpack_require__(10);
	
	var Popups = __webpack_require__(11);
	
	var isLoaded = false;
	
	var isInitNet = false;
	
	global.View.loading.preLoadingJS(function () {
	  global.shareApi.auth(init);
	});
	
	function init(userInfo) {
	
	  Config.userInfo = userInfo;
	  global.shareApi.init();
	  initUI();
	  try {
	    dataSDK.pushUserInfo(userInfo);
	  } catch (e) {}
	
	  global.View.loading.preload(function () {
	    isLoaded = true;
	
	    isInitNet = true;
	
	    complete();
	  });
	}
	
	function initUI() {
	  console.log('initUI');
	  global.View.homeTest = new Home('.home');
	  global.Popup.popup = new Popups('.panel');
	  global.Popup.rule = new Popups('.rule');
	  global.Popup.share = new Popups('.share');
	}
	
	function complete() {
	  console.log('complete');
	  if (isInitNet && isLoaded) {
	    main();
	  }
	}
	
	function main() {
	  $('.main').show();
	  global.View.loading.hide();
	  global.View.homeTest.show();
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports) {

	
	
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

/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ },
/* 3 */
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
	      this.$dom.fadeOutDown();
	    }
	  }]);
	
	  return BasePopupClass;
	}(BaseClass);
	
	module.exports = BasePopupClass;

/***/ },
/* 4 */
/***/ function(module, exports) {

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
	window.onresize = function () {
	  resize();
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	
	
	'use strict';
	
	var pre = 'gd';
	module.exports = {
	  debug: true,
	  id: null,
	  super_name: pre,
	  appid: 'wx26be12d215d3d8cb',
	  storageName: 'libai_userInfo_version_322_s11',
	
	  userInfo: {
	    openid: 'test23222522222',
	    nickname: 'AA朱伟杰',
	    sex: '1',
	    province: '广东',
	    city: '广州',
	    country: '中国',
	    headimgurl: 'http://wx.qlogo.cn/mmopen/Xmnun9Io49TNwrKPL4SnYq7p5QkMaztSrxxJHWC3twTdYX7Ur39KeiczZeEUBUB3dwIcd49Xpe7w3sSxTXI0aCQ/0',
	    subscribe: 0
	  },
	
	  host: 'http://100jc.net/goddess/public/h5_' + pre,
	
	  server: 'http://100jc.net/goddess/' + pre,
	
	  qiniu: 'http://up.qiniu.com',
	
	  shareUrl: 'http://toupiao.91iot.net/'
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

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	var wechat = new Wechat(Config.appid);
	var TITLE = '标题';
	var DESC = '描述';
	var IMGURL = Config.host + '/resources/img/icon.jpg';
	var LINK = Config.shareUrl + '?url=' + encodeURIComponent(dealUrl(wechat.filter(['code', 'id'], { share: 'share' })));
	
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

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	    reset: function reset(str) {
	        $(str).css('backgroundPositionY', 0);
	    },
	    starmove: function starmove(str, value, hei, i, fn) {
	        $(str).animate({
	            backgroundPositionY: hei * 18 - hei * value
	        }, {
	            duration: 3000 + i * 2000,
	            easing: "linear",
	            complete: fn
	        });
	    }
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

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

/***/ },
/* 10 */
/***/ function(module, exports) {

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
	            this.numBox = this.$dom.find(".laohuji-container");
	            this.num = $(this.numBox).find(".laohuji-part");
	            this.btn = this.$dom.find(".play-btn");
	            this.height = $(this.num).innerHeight();
	            this.count = 0;
	            this.isBegin = false;
	            this.run();
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
	            var hei = this.height;
	            $(this.btn).on("click", function () {
	                if (_this2.isBegin) return false;
	                _this2.isBegin = true;
	                $.each(_this2.num, function (i, n) {
	                    _this2.value[i] = parseInt(Math.random() * 3);
	                    var value = _this2.value[i];
	                    Gun.reset(n);
	                    Gun.starmove(n, value, hei, i, _this2.jugde.bind(_this2));
	                });
	            });
	        }
	    }, {
	        key: "jugde",
	        value: function jugde() {
	            this.count++;
	            if (this.count == 3) {
	                if (this.value[0] == this.value[1] && this.value[2] == this.value[1]) {
	                    alert("恭喜中奖");
	                } else {
	                    alert("很遗憾，没有中奖");
	                }
	                this.isBegin = false;
	                this.count = 0;
	            }
	        }
	    }]);
	
	    return Home;
	}(BaseClass);
	
	module.exports = Home;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 11 */
/***/ function(module, exports) {

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
	      this.$dom.find('.btn').on('tap', function () {
	        _this2.hide();
	      });
	    }
	  }]);
	
	  return Popups;
	}(BasePopupClass);
	
	module.exports = Popups;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map