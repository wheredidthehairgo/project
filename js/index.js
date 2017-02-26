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
//示例对象


const HomeTest = require('./View/HomeTest');



const PopupTest = require('./Popup/PopupTest');


// 加载
let isLoaded = false;
//网络加载
let isInitNet = false;


$(function(){
  //微信授权
  shareApi.auth(init);  
})


//初始化,入口
function init(userInfo){

  Config.userInfo = userInfo;
  shareApi.init();
  initUI();
    try {
      dataSDK.pushUserInfo(userInfo)
    } catch (e) {

    }
    //增加投票者
    // $.post(`${Config.server}/god_voter/`,Config.userInfo,({data,code})=>{})
    View.loading.preload((loaded, total)=>{
      let percent =  Math.floor( loaded/total *100);
      $('.loading').find('.bar').css({width: percent+'%'});
      $('.loading').find('.text').html(`${percent}% loading...`);
      if(loaded === total){
        isLoaded = true;
        //暂时放在这里
        isInitNet = true;
        // initData();
        complete();
      }
    })
}

//初始化UI
function initUI(){
  console.log('initUI');
  View.loading = new Loading('.loading');
  View.homeTest = new HomeTest('.home');
  Popup.popup = new PopupTest('.popup');
}


//加载完成
function complete(){

    console.log('complete')
  if(isInitNet && isLoaded){
    main();
  }
}

//初始化数据
function main(){
  // console.log('initData')
  $('.main').show();
  console.log($);
  View.loading.hide();
  View.homeTest.show();
  Popup.popup.show();
}
