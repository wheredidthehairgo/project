global.BaseClass = require('./libs/BaseClass');
global.BasePopupClass = require('./libs/BasePopupClass');
global.Util = require('./libs/Util');
global.ViewAdapt = require('./libs/ViewAdapt');
global.Config = require('./Config');
global.TipManager = require('./libs/TipManager');
global.View = {};
global.Popup = {};
global.Data = {};

const Loading = require('./libs/Loading');
//示例对象


const HomeTest = require('./View/HomeTest');
const lastPage = require('./View/lastPage');
const Warning = require('./View/Warning');
const PopupTest = require('./Popup/PopupTest');


//初始化UI
function initUI(){
  View.loading = new Loading('.loading');
  View.home = new HomeTest('.start');
  View.lastPage = new lastPage('.last_page');
  View.warning = new Warning('.warning');
  Popup.popup = new PopupTest('.question');
  console.log('initUI')
  initData();
  changecolor();
}


//初始化数据
function initData(){
  console.log('initData')
  View.loading.preload((loaded,total)=>{
  	if(loaded==total){
		View.loading.hide();
		$('.main').show();
			View.home.show();		
  	}else{
		View.loading.show();
  	}
  });
  
//	View.lastPage.show();
//	View.warning.show();
	global.data = [{title:1,describe:'1包子铺已进入稳定盈利期，做出一番事业的时机到了。英明如你，开始融资吧：',qa:'交通中心东直门，全年外来人口穿梭不断',qb:'交通中心东直门，全年外来人口穿梭不断',qc:'交通中心东直门，全年外来人口穿梭不断'},
	{title:2,describe:'2包子铺已进入稳定盈利期，做出一番事业的时机到了。英明如你，开始融资吧：',qa:'交通中心东直门，全年外来人口穿梭不断',qb:'交通中心东直门，全年外来人口穿梭不断',qc:'交通中心东直门，全年外来人口穿梭不断'},
	{title:3,describe:'3包子铺已进入稳定盈利期，做出一番事业的时机到了。英明如你，开始融资吧：',qa:'交通中心东直门，全年外来人口穿梭不断',qb:'交通中心东直门，全年外来人口穿梭不断',qc:'交通中心东直门，全年外来人口穿梭不断'},
	];
	global.num=0;
	

}
function changecolor(){
	setInterval(function(){
		var color =  parseInt(Math.random() * 4095).toString(16);  //取随机颜色6位16进制！
		$('.main').css("background-color",'#'+color);
	
	},5000);
}
initUI();
