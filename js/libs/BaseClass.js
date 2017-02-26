class BaseClass {
  constructor(str){
    this.$dom = $(str);
    this.$dom.hide();
    this.init();
    this.isShow = false;
  }

  init(){

  }

  show(){
    this.$dom.show();
    $('body').scrollTop(0);
    this.isShow = true;
  }

  hide(){
    this.$dom.hide();
    this.isShow = false;
  }
}
module.exports = BaseClass;
