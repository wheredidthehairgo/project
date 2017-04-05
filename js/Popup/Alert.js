
// 弹窗
class Alert extends BasePopupClass{
  constructor(str){
    super(str);

  }


  init(){
    super.init();
    this.callBack = null;
    this.$dom.find('.box').on('tap', () => {
      this.hide();
      this.callBack && this.callBack();
    });

    this.$dom.find('.btn').on('tap', () => {
      this.hide();
      this.callBack && this.callBack();
      try { dataSDK.btnClick(`alert`, '确认'); } catch (e) { }
    });
  }

  show({ title, content, callBack }){
    super.show();
    this.$dom.find('.title').html(title);
    this.$dom.find('.content').html(content);
    this.callBack = callBack;
  }


}
module.exports = Alert;
