class HomeTest extends BaseClass{
  constructor(str){
    super(str);

  }

  init(){
    super.init();
    const self = this;
    this.$dom.find('.start_btn').on('tap', () => {
      Popup.popup.show();
      self.hide();
    });

//  this.$dom.find('.sure2-btn').on('tap',()=>{
//    TipManager.show("hhhh");
//    // Popup.popup.show();
//  });
//
//  this.$dom.find('.sure3-btn').on('tap',()=>{
//    // Popup.popup.show();
//  });
  }
}
module.exports = HomeTest;
