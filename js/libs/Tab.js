let lastSelect = $('.tabbar-bottom .item-1 img');
const pre = 'resources/img/';
const wechat = new Wechat(Config.appid);
const TITLE = '疯狂摇摇乐';
const DESC = '晓明baby邀你一起玩游戏！壕礼等你拿，100%中奖！';
const IMGURL = Config.host + `/resources/img/icon_${Config.super_name}.jpg`;
const LINK = dataSDK.dealUrl(wechat.filter(['code', 'id'], { share: 'share' }));
//

exports.share = function(title = TITLE, desc = DESC, link = LINK, imgUrl = IMGURL) {
        wechat.shareFriend({
            appmessageTitle: title,
            appmessageDesc: desc,
            link: link,
            imgUrl: imgUrl
        }, function() {
            try { dataSDK.share('friend'); } catch (e) {}
            // alert('friend');
        })
        wechat.shareTimeline({
            timelineTitle: title,
            link: link,
            imgUrl: imgUrl
        }, function() {
            try { dataSDK.share('timeline'); } catch (e) {}
        })
    }

exports.selectIndex = function (index){

  // 获取当前的index

  const obj = $('.tabbar-bottom .item-' + index + ' img');
  const lastname = lastSelect.attr('data-name');
  const curname = obj.attr('data-name');

  // if( curname === lastname )return;


  lastSelect.attr('src', `${ pre }icon-${ lastname }.png`);

  obj.attr('src', `${ pre }icon-${ curname }-active.png`);

  lastSelect = obj;

};

exports.changeItem = function (index, name){

  $('.tabbar-bottom .item-' + index + ' img').removeClass();
  $('.tabbar-bottom .item-' + index + ' img').attr('data-name', name);
  $('.tabbar-bottom .item-' + index + ' img').attr('src', 'resources/img/icon-' + name + '.png');
  $('.tabbar-bottom .item-' + index + ' img').addClass(name);

};

exports.init = function (){
  $('.tabbar-bottom .tabbar-item ').on('tap', function (){
    const $obj = $(this).find('img');
    const lastname = lastSelect.attr('data-name');
    const curname = $obj.attr('data-name');

    // console.log($obj);
    if(lastname === curname && curname !== 'home')return ;
    lastSelect.attr('src', `${ pre }icon-${ lastname }.png`);
    global.View[lastname].hide();

    $obj.attr('src', `${ pre }icon-${ curname }-active.png`);
    global.View[curname].show();
    lastSelect = $obj;
    try {
      dataSDK.btnClick(`${ curname }`, '选项卡');
    } catch (e) {

    }

  });
};
