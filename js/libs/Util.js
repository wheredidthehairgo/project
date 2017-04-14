/**
 * @Author: yingzhou xu
 * @Date:   2017-04-14T11:15:01+08:00
 * @Email:  dyyz1993@qq.com
 * @Filename: Util.js
 * @Last modified by:   yingzhou xu
 * @Last modified time: 2017-04-14T15:53:21+08:00
 */


/**
 * Created by Weijie Zhu on 2016/11/29.
 */

'use strict';
// 获取随机数
exports.randomNum = function (Min, Max) {
  const Range = Max - Min;
  const Rand = Math.random();
  return (Min + Math.round(Rand * Range));
};
exports.copySelectedRange = function (e) {
  const t = document.createRange();
  t.selectNodeContents(e);
  const n = document.getSelection();
  n.removeAllRanges(),
                n.addRange(t),
                document.execCommand('copy', !0);
};
exports.detectBrowserAccessClipboardSupport = function () {
  return document.queryCommandSupported('copy') == 1;
},
// 获取参数
exports.getOption = function (key) {
  let search = window.location.search;
  if (search === '') { return ''; }
  search = search.slice(1);
  const searchArr = search.split('&');
  for (let i = 0 ; i < searchArr.length;i++) {
    const arr = searchArr[i].split('=');
    if (arr[0] === key) { return arr[1]; }
  }
  return '';
};

  /**
   *  加载
   * @param {Array} resources 数组或者jquery数组
   * @param {Function} $onLoadComplete 完成的回调
   * @param {Function} $onLoadProgress (loaded , total) 进度回调
   * @param {Object} $onLoadTarget 作用域
   */
exports.loadImg = function (resources = [], $onLoadComplete = null, $onLoadProgress = null, $onLoadTarget = null) {
  const total = resources.length;
  let loaded = 0;
  if (total === 0) {
    $onLoadComplete && $onLoadComplete.call($onLoadTarget);
    return ;
  }
  $.each(resources, (index, src) => {
    let img = null;
    if (typeof src === 'object') {
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

/**
 * @param {String} $wrap  外框
 * @param {String} $photo 需要赋值的img
 * @param {String} url 图片的链接
 */
exports.setPhoto = function ($wrap, $photo, url) {
  const ratio = parseInt($wrap.width() / $wrap.height() * 100, 10);
  $photo[0].onload = function () {
    $photo.css({ width: 'auto', height: 'auto' });
    const ratioPhoto = parseInt($photo.width() / $photo.height() * 100, 10);
    if (ratioPhoto === 100 || ratioPhoto > ratio) {
      $photo.css({ width: '100%', height: 'auto' });
    } else {
      $photo.css({ width: 'auto', height: '100%' });
    }
  };
  $photo.attr({ src: url });
};

// 安卓微信不支持assgin；
if (typeof Object.assign !== 'function') {
  Object.assign = function (target) {
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    const target2 = Object(target);
    for (let index = 1; index < arguments.length; index++) {
      const source = arguments[index];
      if (source != null) {
        for (const key in source) {
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
  animateCss(animationName, cb) {
    const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    this.addClass('animated ' + animationName).one(animationEnd, () => {
      this.removeClass('animated ' + animationName);
      if (cb) { cb(); }
    });
    return this;
  },
  fadeIn() {
    this.show();
    this.animateCss('fadeIn');
  },

  fadeOut() {
    this.animateCss('fadeOut', () => {
      this.hide();
    });
  },
  fadeInUp() {
    this.show();
    this.find('.mask').animateCss('fadeIn').next().animateCss('fadeInUpBig');
  },
  fadeOutDown(cb) {
    this.find('.mask').animateCss('fadeOut').next().animateCss('fadeOutDownBig', () => {
      this.hide();
      if (cb) { cb(); }
    });
  },
  showInfo() {
    this.show().animateCss('fadeInDown');
  },
  hideInfo() {
    this.animateCss('fadeOutUp', () => {
      this.html('');
      this.hide();
    });
  },
});
