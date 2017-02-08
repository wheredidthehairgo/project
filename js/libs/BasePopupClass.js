class BasePopupClass extends BaseClass{
  constructor(str){
    super(str);
  }

  show(){
    // super.show()
    this.$dom.fadeInUp();
  }

  hide(){
    // super.hide()
    this.$dom.fadeOutDown();
    // this.$dom.hide();
  }
}
module.exports = BasePopupClass;
