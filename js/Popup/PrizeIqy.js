class PrizeIqy extends BasePopupClass{
  constructor(str){
    super(str);

  }


 init(){
    super.init();
    this.isLoad = false;
    let self=this;
    this.$dom.find('.btn-identify').on('tap',function(){
      try { dataSDK.btnClick('button6','爱奇艺验证'); } catch (e) {} 
      if (self.isLoad) {return false};
      let phone=self.$dom.find("#input-phone").val();
      if(phone === ""){
        TipManager.show("手机号不能为空");
      } else if(!/^\d{11}$/i.test(String(phone))) {
        TipManager.show("手机号格式错误");
      } else {
        let id=Config.user_id;
        $.ajax({
          type:'put',
          url: Config.server.concat('code/', id, '/', phone)
        })
        .done((json)=>{
          if(json.code===0){
            self.setTime();
            
          } else if(json.code===1){
            TipManager.show("发送失败");
          }
        })
      }
    })
    this.$dom.find('#btn-submit').on('tap',function(){
      try { dataSDK.btnClick('button7','爱奇艺提交'); } catch (e) {}     
      let phone=self.$dom.find("#input-phone").val();
      let check=self.$dom.find("#input-check").val();
      if(phone === ""){
        TipManager.show("手机号不能为空");
      } else if(!/^\d{11}$/i.test(String(phone))) {
        TipManager.show("手机号格式错误");
      } else if(check === ''){
        TipManager.show("没有输入验证码");
      } else {
        let myid=Config.user_id;
        $.ajax({
          type:'put',
          url: Config.server.concat('check/', myid, '/', phone, '/', check)
        }).done((json)=>{
          if(json.code===0){
            let data=json.data;
            console.log(data);
            Config.ticket_id=data.ticket_id;
            TipManager.show("验证成功");
            global.View.myHome.hide();
            global.View.iqy.show();
            self.hide();
          } else if(json.code===1006||json.code===1){
            TipManager.show("没有爱奇艺码");
          }
        })
      }
      
    })
  }

   setTime(){
    this.$dom.find(".btn-identify span").text("60秒后重试");
    var timer = 59;
    let time = setInterval(()=>{
      if(timer <=0 ){
        this.$dom.find(".btn-identify span").text("发送验证码");
        clearInterval(time);
        return;
      }else{
        this.$dom.find(".btn-identify span").text(timer+"秒后重试");
        this.isLoad=true;
        timer--;
      }
    },1000)
  }

}
module.exports = PrizeIqy;