class PrizeIp7 extends BasePopupClass{
  constructor(str){
    super(str);

  }


  init(){
    super.init();
    this.isLoad = false;
    let self=this;
    this.$dom.find('#btn-check').on('tap', function(){
      self.$dom.find('#show1').hide();
      self.$dom.find('#show2').show();
    })
    this.$dom.find('.btn-identify').on('tap',function(){
      try { dataSDK.btnClick('button4','Iphone7验证'); } catch (e) {}     
      if (self.isLoad) {return false};
      let phone=self.$dom.find("#input-phone").val();
      if(phone === ""){
        TipManager.show("手机号不能为空");
        return ;
      } else if(!/^\d{11}$/i.test(String(phone))) {
        TipManager.show("手机号格式错误");
        return ;
      } else {
        let id=Config.user_id;
        $.ajax({
          type:'put',
          url: Config.server.concat('code/', id, '/', phone)
        })
        .done((json)=>{
          if(json.code===0){
            self.setTime(); 
          }
        })
      }
    })
    this.$dom.find('#btn-submit').on('tap',function(){
      try { dataSDK.btnClick('button5','Iphone7提交名单'); } catch (e) {}     
      let phone=self.$dom.find("#input-phone").val();
      let check=self.$dom.find("#input-check").val();
      let myname=self.$dom.find("#input-name").val();
      let myaddress=self.$dom.find("#input-address").val();
      if(myname === ''){
        TipManager.show('名字不能为空');
        return ;
      } else if(myaddress === ''){
        TipManager.show('地址不能为空');
        return ;
      } else if(phone === ""){
        TipManager.show("手机号不能为空");
        return ;
      } else if(!/^\d{11}$/i.test(String(phone))) {
        TipManager.show("手机号格式错误");
        return ;
      } else if(check === ''){
        TipManager.show("没有输入验证码");
        return ;
      }
       else {
        let myid=Config.user_id;
        $.ajax({
          type:'put',
          url: Config.server.concat('check/', myid, '/', phone, '/', check),
          data:{
            address: myaddress,
            realname: myname
          }
        }).done((json)=>{
          if(json.code===0){
            TipManager.show("验证成功");
            global.View.myHome.hide();
            global.View.ip7.show();
            self.hide();
            
          } else if(json.code===1){
            TipManager.show("发送失败");
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
module.exports = PrizeIp7;