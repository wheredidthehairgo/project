 global.Util = require('./libs/Util');
 global.BaseClass = require('./libs/BaseClass');
 global.BasePopupClass = require('./libs/BasePopupClass');
 global.ViewAdapt = require('./libs/ViewAdapt');
 global.Config = require('./Config');
 global.Clipboard = require('Clipboard');
 global.TipManager = require('./libs/TipManager');
 global.shareApi = require('./libs/ShareApi');
 global.Gun=require('./libs/Gun');
 global.View = {};
 global.Popup = {};
 global.Data = {};

 const Loading = require('./libs/Loading');
// 示例对象
 global.View.loading = new Loading();

 const Home = require('./View/Home');
 const Follow = require('./View/Follow');
 const Ljq = require('./View/Ljq');
 const Iqy = require('./View/Iqy');
 const Ip7 = require('./View/Ip7');
 const Popups = require('./Popup/Popups');
 const Share = require('./Popup/Share');
 const PrizeLjq = require('./Popup/PrizeLjq');
 const PrizeIqy = require('./Popup/PrizeIqy');
 const PrizeIp7 = require('./Popup/PrizeIp7');


// 加载
 let isLoaded = false;
// 网络加载
 let isInitNet = false;

// 主要是加载js的loading
 global.View.loading.preLoadingJS(function () {
  // 微信授权
   global.shareApi.auth(init);
 });


// 初始化,入口
 function init(userInfo) {

   Config.userInfo = userInfo;
   global.shareApi.init();
   initUI();
   initUserInfo(Config.userInfo);
   try {
     dataSDK.pushUserInfo(userInfo);
   } catch (e) {}

   global.View.loading.preload(() => {     
       isLoaded = true;
        // 暂时放在这里
        // initData();
       complete();
     }
   );
 }

// 初始化UI
 function initUI() {
   console.log('initUI');
   $('.page, .popup, #main-bg').height($(window).innerHeight());
   global.View.myPage = new (global.BaseClass)('.page');
   global.View.follow =new Follow('.follow');
   global.View.myHome = new Home('.home');
   global.View.ljq=new Ljq('.lijianquan');
   global.View.iqy=new Iqy('.iqiyi');
   global.View.ip7=new Ip7('.iphone');
   global.Popup.popup = new (global.BasePopupClass)('.panel');
   global.Popup.rule = new Popups('.rule');
   global.Popup.share= new Share('.share');
   global.Popup.tips= new Popups('.tips');
   global.Popup.prizeIp7=new PrizeIp7('.prize-ip7');
   global.Popup.prizeIqy=new PrizeIqy('.prize-iqy');
   global.Popup.prizeLjq=new PrizeLjq('.prize-ljq');
 }


// 加载完成
 function complete() {
   console.log('complete');
   if (isInitNet && isLoaded) {
     main();
   }
 }

// 初始化数据
 function main() {
  //  $('.main').show();
   global.View.loading.hide();
   if(Config.userInfo.subscribe === 0){    //如果用户尚未关注公众号
      global.View.myHome.hide();
      global.View.follow.show();
      return ;
  }
   checkout(data);
   
  }

function initUserInfo(userInfo){
  console.log(Config.server + 'add/');
    $.post(Config.server + 'add/', {
        openid: userInfo.openid,
        nickname: userInfo.nickname,
        headimg: userInfo.headimgurl,
        sex: userInfo.sex,
        province: userInfo.province,
        city: userInfo.city,
        country: userInfo.country
    }, (json)=>{
        global.data = json.data;
      isInitNet = true;
        // initData();
       complete();
      
    });//$.post 结束
}

function checkout (){
console.log('提交用户信息成功!');
        let data=global.data ;
        Config.user_id = (typeof(data) == "number")?data:data.user_id;
        if(!data.mobile){
            global.View.myHome.show(); 
            audio();
            switch(data.gift_id){
              case 1: global.Popup.prizeIp7.show(); break;
              case 2: global.Popup.prizeIqy.show(); break;
              case 3: global.View.myHome.hide();global.View.ljq.show(); break;
            }
            if(data.chance) {
              Config.chance=data.chance;
            }  
        }else if(data.mobile){
          global.View.myHome.hide();
          audio();
          switch(data.gift_id){
              case 1: global.View.ip7.show(); break;
              case 2: Config.ticket_id=data.ticket; global.View.iqy.show(); break;
              case 3: global.View.ljq.show(); break;
            }
        }
}

function audio(){
    var audio = document.getElementById("audio");
    audio.play();
		$('#music_off').click(function() {
			if(audio.paused) {
				audio.play();
				$("#music").show();
				$("#music_off").css("animation", "RotateIn 1.5s linear infinite")
				return;
			}
			audio.pause();
			$("#music").hide()
			$("#music_off").css("animation", "none")
    })
}