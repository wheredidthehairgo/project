let lastSelect = $('.tabbar-bottom .item-1 img');
let pre = 'resources/img/';
//
exports.selectIndex = function(index){

  //获取当前的index

  let  obj = $('.tabbar-bottom .item-'+index+' img');
  let lastname =  lastSelect.attr('data-name');
  let curname = obj.attr('data-name');

  // if( curname === lastname )return;



  lastSelect.attr('src',`${pre}icon-${lastname}.png`);

  obj.attr('src',`${pre}icon-${curname}-active.png`);

  lastSelect =obj;

}

exports.selectName = function(name){

}

exports.changeItem = function(index,name){

  $('.tabbar-bottom .item-'+index+' img').removeClass();
  $('.tabbar-bottom .item-'+index+' img').attr('data-name',name);
  $('.tabbar-bottom .item-'+index+' img').attr('src','resources/img/icon-'+name+'.png');
  $('.tabbar-bottom .item-'+index+' img').addClass(name);

}

exports.init = function(){
  $('.tabbar-bottom .tabbar-item ').on('tap',function(){
    let $obj = $(this).find('img');
    let lastname =  lastSelect.attr('data-name');
    let curname =  $obj.attr('data-name');

    // console.log($obj);
    if( lastname === curname &&curname!='home' )return ;
    lastSelect.attr('src',`${pre}icon-${lastname}.png`);
    View[lastname].hide();

    $obj.attr('src',`${pre}icon-${curname}-active.png`);
    View[curname].show();
    lastSelect = $obj;
    try {
      dataSDK.btnClick(`${curname}`, '选项卡');
    } catch (e) {

    }

  })
};
