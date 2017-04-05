class Loading {
  constructor() {
    this.init();
  }

  init(){
    $('.pre-loading-js').show();
    $('.loading-img').hide();
    $('.loading-net').hide();

  }

  /**
   * 预加载js或者图片
   * @param {Function} cb 回调
   */
  preLoadingJS(cb){
    let onload = false,
      loadImg = false;
    window.onload = function (){
      onload = true;
      callBack();
    };
    Util.loadImg([], () => {
      loadImg = true;
      callBack();
    }, null, null);
    function callBack(){
      if(onload && loadImg){
        $('.pre-loading-js').hide();
        cb();
      }
    }
  }

  /**
   *
   * 加载完成
   * 第二次加载，主要加载资源
   * @param {Function} cb 回调函数
   */
  preload(cb) {
    $('.loading-img').show();
    Util.loadImg($('img'), null, cb, null);
  }

  hide(){
    $('.loading-img').hide();
  }


  // 网络加载页面
  netLoadingShow(){
    $('.loading-net').show();
  }
  netLoadingHide(){
    $('.loading-net').hide();
  }


}

module.exports = Loading;
