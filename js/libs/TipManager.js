
let _instance;
const loading = $('.tip.uploading');
const uploaded = $('.tip.uploaded');
class TipManager{
  static getInstance(){
    if(!_instance){
      _instance = new TipManager();
    }
    return _instance;
  }
  // 文本提示
  static show(text){
    const $dom = $(`<div class="info">${ text }</div>`);
    $('.main').append($dom);
    $dom.showInfo();
    setTimeout(function () {
      $dom.hideInfo();
    }, 2500);
  }

  //
  static loading(percent = 0, text){
    loading.find('.progress-bar').css({ width: percent + '%' });
    loading.find('.text').html(text);
  }

  static loadingShow(){
    loading.show();
    loading.find('.progress-bar').css({ width: '0%' });
  }

  // 网络提示
  static netLoadingShow(){
    $('.net-loading').show();
  }
  static netLoadingHide(){
    $('.net-loading').hide();
  }

  static loadingHide(){
    loading.hide();
  }

  static uploadedShow(){
    uploaded.fadeIn();
  }

  static uploadedHide(){
    uploaded.fadeOut();
  }

  // 等待图片加载完毕
  static loadImgShow(){
    $('.loading-img').show();

  }
  static loadImgHide(){
    $('.loading-img').hide();
  }

}
module.exports = TipManager;
