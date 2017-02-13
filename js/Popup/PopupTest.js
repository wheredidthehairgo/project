class PopupTest extends BasePopupClass{
  constructor(str){
    super(str);

    this.$dom.find('.describe').on('click',()=>{
    	num = parseInt(this.$dom.attr("number"));
    	var text = 1200;
    	this.show_money('+'+text);
    	var total = this.$dom.find('.total').html();
    	console.log(total);
    	this.$dom.find('.total').html(parseInt(total)+parseInt(text));
    	if(num<3){
    		num++;

    		this.question(num);
    		return;
    	}
    	return;
    });
  }
  last_choose(){
  	this.$dom.find(".q_last").on('click',()=>{
    
    		this.hide();
    		View.lastPage.show();
    })
  }
  show_money(text){
    const $dom = $(`<div class="add_money">${text}</div>`);
      this.$dom.append($dom);
      $dom.showInfo();
      setTimeout(function () {
        $dom.hideInfo();
      }, 1000);
  }
	question(title){
		if(title ==3){
			this.$dom.find('.describe').attr("class","q_last");
			this.last_choose();
		}
		this.hide();
		var message = '${message}'+'<p>第'+'${title}'+'题</p>';
		var temp = message.replace('${message}',data[title-1].describe).replace('${title}',data[title-1].title);
		this.$dom.find('.message').html(temp);
		this.$dom.find('.choose_text_a').html(data[title-1].qa);
		this.$dom.find('.choose_text_b').html(data[title-1].qb);
		this.$dom.find('.choose_text_c').html(data[title-1].qc);
		
		this.$dom.attr("number",num);
		this.show();
	}

  init(){
    super.init();
  }

	

}
module.exports = PopupTest;
