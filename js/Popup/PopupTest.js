class PopupTest extends BasePopupClass{
  constructor(str){
    super(str);

  }


  init(){
    super.init();
    this.$dom.find('.box').on('tap', () => {
      this.hide();
    });
  }


}
module.exports = PopupTest;
