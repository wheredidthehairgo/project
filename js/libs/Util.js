/**
 * Created by Weijie Zhu on 2016/11/29.
 */

'use strict';

exports.randomNum = function (Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return (Min + Math.round(Rand * Range));
}

exports.getOption  = function (key){
    var search = location.search;
    if(search=="")return "";
    search=search.slice(1);
    var searchArr = search.split('&');
    for(var i = 0 ; i<searchArr.length;i++){
      var arr = searchArr[i].split('=');
      if(arr[0]==key)
        return arr[1];
    }
    return "";
  }



exports.setPhoto = function ($wrap, $photo, url) {
  const ratio = parseInt($wrap.width() / $wrap.height() * 100);
  $photo[0].onload = function () {
    $photo.css({width: 'auto', height: 'auto'});
    const ratioPhoto = parseInt($photo.width() / $photo.height() * 100);
    if (ratioPhoto === 100 || ratioPhoto > ratio) {
      $photo.css({width: '90%', height: 'auto'});
    } else {
      $photo.css({width: 'auto', height: '90%'});
    }
  }
  $photo.attr({src: url});
}

//安卓微信不支持assgin；
if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
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


$(function(){
  $.fn.animateCss = function (animationName, cb) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    this.addClass('animated ' + animationName).one(animationEnd, ()=> {
      this.removeClass('animated ' + animationName);
      if (cb) cb();
    });
    return this;
  };

  $.fn.fadeIn = function () {
    this.show();
    this.animateCss('fadeIn');
  };

  $.fn.fadeOut = function () {
    this.animateCss('fadeOut',()=>{
      this.hide();
    });
  };
  $.fn.fadeInUp = function () {
    this.show();
    this.find('.mask').animateCss('fadeIn').next().animateCss('fadeInUpBig');
  };

  // $.fn.fadeInUp=function () {
  //   this.show();
  //   this.find('.mask').animateCss('fadeIn').next().animateCss('fadeInUpBig');
  // },

  $.fn.fadeOutDown = function (cb) {
    this.find('.mask').animateCss('fadeOut').next().animateCss('fadeOutDownBig', ()=> {
      this.hide();
      if (cb) cb();
    });
  };


  $.fn.showInfo = function () {
    this.show().animateCss('fadeInDown');
  };

  $.fn.hideInfo = function () {
    this.animateCss('fadeOutUp', ()=> {
      this.html('');
      this.hide();
    });
  }


})
