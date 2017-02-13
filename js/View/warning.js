class lastPage extends BaseClass{
  constructor(str){
    super(str);

  }

  init(){
    super.init();
    let self = this;
    this.$dom.find('.describe').on('tap',()=>{
      View.home.show();
      self.hide();
    });

  }
}
module.exports = lastPage;