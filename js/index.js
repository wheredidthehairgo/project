 global.Util = require('./libs/Util');
 global.BaseClass = require('./libs/BaseClass');
 global.BasePopupClass = require('./libs/BasePopupClass');
 global.ViewAdapt = require('./libs/ViewAdapt');
 global.Config = require('./Config');
 global.TipManager = require('./libs/TipManager');
 global.shareApi = require('./libs/ShareApi');
 global.View = {};
 global.Popup = {};
 global.Data = {};

 const Loading = require('./libs/Loading');
// 示例对象
 global.View.loading = new Loading();

 const HomeTest = require('./View/HomeTest');


 const PopupTest = require('./Popup/PopupTest');


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
   try {
     dataSDK.pushUserInfo(userInfo);
   } catch (e) {}

   global.View.loading.preload((loaded, total) => {
     const percent = Math.floor(loaded / total * 100);
     $('.loading').find('.bar').css({ width: percent + '%' });
     $('.loading').find('.text').html(`${ percent }% loading...`);
     if (loaded === total) {
       isLoaded = true;
        // 暂时放在这里
       isInitNet = true;
        // initData();
       complete();
     }
   });
 }

// 初始化UI
 function initUI() {
   console.log('initUI');
   global.View.homeTest = new HomeTest('.home');
   global.Popup.popup = new PopupTest('.popup');
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
   $('.main').show();
   global.View.loading.hide();
   global.View.homeTest.show();
   global.Popup.popup.show();
 }
