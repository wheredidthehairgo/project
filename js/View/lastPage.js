class lastPage extends BaseClass{
  constructor(str){
    super(str);

  }

  init(){
    super.init();
    let self = this;
    this.$dom.find('.restart_btn').on('tap',()=>{
      View.home.show();
      self.hide();
    });

    this.$dom.find('.buy_btn').on('tap',()=>{
      View.warning.show();
       self.hide();
    });
  }
}
module.exports = lastPage;