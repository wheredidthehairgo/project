class PopupTest extends BasePopupClass{
  constructor(str){
    super(str);

  }


  init(){
    super.init();
    this.$dom.find('.box').on('tap', () => {
      this.hide();
    });
    this.$dom.find('.close').on('tap',()=>{
      this.hide();
    })
    this.$dom.find('.btn').on('tap',()=>{
      this.hide();
    })
  }


}
module.exports = PopupTest;
