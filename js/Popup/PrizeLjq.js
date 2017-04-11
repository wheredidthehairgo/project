class PrizeLjq extends BasePopupClass{
  constructor(str){
    super(str);

  }


   init(){
    super.init();
    this.isLoad = false;
    let self=this;
    this.$dom.find('.btn-identify').on('tap',function(){
      if (self.isLoad){return false;} 
      let phone=self.$dom.find("#input-phone").val();
      if(phone === ""){
        alert("手机号不能为空");
      } else if(!/^\d{11}$/i.test(String(phone))) {
        alert("手机号格式错误");
      } else {
        let id=Config.user_id;
        $.ajax({
          type:'put',
          url: Config.server.concat('code/', id, '/', phone)
        }).done((json)=>{
          if(json.code===0){
            alert("发送成功");
            self.setTime();
            
          } else if(json.code===1){
            alert("发送失败");
          }
        })
      }
    })
    this.$dom.find('#btn-submit').on('tap',function(){
      let phone=self.$dom.find("#input-phone").val();
      let check=self.$dom.find("#input-check").val();
      if(phone === ""){
        alert("手机号不能为空");
      } else if(!/^\d{11}$/i.test(String(phone))) {
        alert("手机号格式错误");
      } else if(check === ''){
        alert("没有输入验证码");
      } else {
        let myid=Config.user_id;
        $.ajax({
          type:'put',
          url: Config.server.concat('check/', myid, '/', phone, '/', check)
        }).done((json)=>{
          if(json.code===0){
            alert("验证成功");
            global.View.myHome.hide();
            global.View.ljq.show();
            self.hide();
          } else if(json.code===1){
            alert("发送失败");
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
module.exports = PrizeLjq;