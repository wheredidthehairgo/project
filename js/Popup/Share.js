class Share extends BasePopupClass{
  constructor(str){
    super(str);

  }
  init(){
    this.$dom.on('tap', ()=>{
      this.hide();
    })
  }
}
module.exports = Share;