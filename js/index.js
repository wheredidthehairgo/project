global.BaseClass = require('./libs/BaseClass');
global.BasePopupClass = require('./libs/BasePopupClass');
global.Util = require('./libs/Util');
global.ViewAdapt = require('./libs/ViewAdapt');
global.Config = require('./Config');

global.View = {};
global.Popup = {};
global.Data = {};

const Loading = require('./libs/Loading');
//示例对象
const TipManager = require('./libs/TipManager');

const HomeTest = require('./View/HomeTest');
const PopupTest = require('./Popup/PopupTest');


//初始化UI
function initUI(){
  View.loading = new Loading();
  View.home = new HomeTest('.home');
  Popup.popup = new PopupTest('.popup');

  console.log('initUI')
  initData();
}


//初始化数据
function initData(){
  console.log('initData')
  $('.main').show();
  View.home.show();


}

initUI();
