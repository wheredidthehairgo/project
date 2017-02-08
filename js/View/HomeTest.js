class HomeTest extends BaseClass{
  constructor(str){
    super(str);

  }

  init(){
    super.init();
    this.$dom.find('.sure-btn').on('tap',()=>{   
      Popup.popup.show();
    });
  }
}
module.exports = HomeTest;
