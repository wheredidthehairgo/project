
let _instance;
let loading = $('.tip.uploading');
let uploaded = $('.tip.uploaded');
class TipManager{
  static getInstance(){
    if(!_instance){
      _instance=new TipManager();
    }
    return _instance;
  }


  //文本提示
  static show(text){
    const $dom = $(`<div class="info">${text}</div>`);
      $('.main').append($dom);
      $dom.showInfo();
      setTimeout(function () {
        $dom.hideInfo();
      }, 2500);
  }

  //
  static loading(percent,text){
    loading.find('.progress-bar').css({width: percent + '%'});
    loading.find('.text').html(text);
  }
  static loadingShow(){
    loading.fadeIn();
    loading.find('.progress-bar').css({width: '0%'});
    // loading.fadeInUp();
  }

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
  static loadImgShow(arr,fn){
    $('.loading-img').show();

  }
  static loadImgHide(){
    $('.loading-img').hide();
  }

}
module.exports = TipManager;
