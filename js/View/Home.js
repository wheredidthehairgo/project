class Home extends BaseClass {
  constructor(str) {
    super(str);

  }

  init() {
    super.init();
    ViewAdapt.push('.home.page',342/523);
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
        // let hei = this.height;
        $(this.btn).on("click", () => {
            try { dataSDK.btnClick('button1','抽奖'); } catch (e) {}
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
                    let myvalue = this.gift;
                    $.each(this.num, (i, n) => {
                        this.value[i] = 3;
                        let value = this.value[i];
                        Gun.reset(n);
                        Gun.starmove(n, value, i, this.jugde.bind(this));
                    })
                }
                
            });
            
        })
    }

    jugde() {
        this.count++;
        console.log(this.gift);
        if (this.count == 3) {
            setTimeout(()=>{
                switch(this.gift){
                    case 1: global.Popup.prizeIp7.show(); break;
                    case 2: global.Popup.prizeIqy.show(); break;
                    case 3: global.View.myHome.hide(); global.View.ljq.show(); break;
                }
                this.isBegin = false;
                this.count = 0
            },4000)
        }
    }

    showlist(){
        $.get(Config.server+'list/', (json)=>{
            let data=json.data[0];
            let index = 0 ;
            let gift;
            setInterval(()=>{  
                if(data[index].gift_id){
                    switch(data[index].gift_id){
                        case 1: gift='Iphone7'; break;
                        case 2: gift='爱奇艺会员'; break;
                        case 3: gift='立减券'; break;
                    }
                    $('.prize-content div').html(`中奖名单：${data[index].nickname}获得${gift}`);
                }else {
                    return ;
                }
                index++;    
                index=(index>=data.length)?0:index;
            },3000);
            
            // $.each(data, (i,n)=>{})
        })
    }


}
module.exports = Home;
