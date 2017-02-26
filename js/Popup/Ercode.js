class Ercode extends BasePopupClass{
  constructor(str){
    super(str);

  }


  init(){
    super.init();
    this.callBack = null;
    this.$dom.find('.btn').on('tap',()=>{
      this.hide();
      this.callBack && this.callBack();
      try {dataSDK.btnClick(`btn-submit`, '确认');} catch (e) {  }
    })
  }

  show(type,fn){
    super.show();
  }



}
module.exports = Ercode;
