class Home extends BaseClass {
  constructor(str) {
    super(str);

  }

  init() {
    super.init();
    this.numBox = this.$dom.find(".laohuji-container");
    this.num = $(this.numBox).find(".laohuji-part");
    this.btn = this.$dom.find(".play-btn");
    this.height = $(this.num).innerHeight();
    this.count = 0;
    this.isBegin = false;
    this.run();
    this.showlist();
    this.$dom.find('.rule-btn').on('tap', () => {
      global.Popup.rule.show();
    });
    this.$dom.find('.share-btn').on('tap', () => {
      global.Popup.share.show();
    })
    
  }

  run() {
        this.value = [];
        let hei = this.height;
        $(this.btn).on("click", () => {
            if (this.isBegin) return false;
            $.ajax({
                type: 'put',
                url: Config.server.concat('lottery/',Config.user_id)
            }).done((json)=>{
                if(json.code==1003){
                    global.Popup.tips.show();
                    return ;
                }else{
                    this.gift = json.data.gift_id;
                    this.isBegin = true;
                    let myvalue = this.gift===1?this.gift===2?1:2:3
                    $.each(this.num, (i, n) => {
                        this.value[i] = myvalue;
                        let value = this.value[i];
                        Gun.reset(n);
                        Gun.starmove(n, value, hei, i, this.jugde.bind(this));
                    })
                }
                
            });
            
        })
    }

    jugde() {
        this.count++;
        console.log(this.gift);
        if (this.count == 3) {
            switch(this.gift){
                case 1: global.Popup.prizeIp7.show(); break;
                case 2: global.Popup.prizeIqy.show(); break;
                case 3: global.Popup.prizeLjq.show(); break;
            }
            this.isBegin = false;
            this.count = 0
        }
    }

    showlist(){
        $.get(Config.server+'list/', (json)=>{
            let data=json.data[0];
            let index = 0 ;
            let gift;
            setInterval(()=>{
                
                switch(data[index].gift_id){
                    case 1: gift='Iphone7'; break;
                    case 2: gift='爱奇艺会员'; break;
                    case 3: gift='立减券'; break;
                }
                $('.prize-content div').html(`中奖名单：${data[index].nickname}获得${gift}`);
                index++;    
            },3000);
            
            index>=data.length?0:index;
            // $.each(data, (i,n)=>{})
        })
    }


}
module.exports = Home;
