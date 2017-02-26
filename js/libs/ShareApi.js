const wechat = new Wechat(Config.appid);
const TITLE = '寻找佛山最美女神';
const DESC = '唯有美丽与立白壕礼不可辜负';
const IMGURL = Config.host + `/resources/img/icon_${Config.super_name}.jpg`;
const LINK = `${Config.shareUrl}?url=${encodeURIComponent(dataSDK.dealUrl(wechat.filter(['code','id'],{share:'share'})))}`;

exports.init = function(){
  wechat.config();
  exports.share();
}

exports.share= function(title = TITLE,desc = DESC,link = LINK,imgUrl=IMGURL){
  wechat.shareFriend({
    appmessageTitle: title,
    appmessageDesc: desc,
    link: link,
    imgUrl: imgUrl
  }, function () {
    try {  dataSDK.share('friend');} catch (e) {}
    // alert('friend');
  })
  wechat.shareTimeline({
    timelineTitle: title,
    link: link,
    imgUrl: imgUrl
  }, function () {
    try {dataSDK.share('timeline');} catch (e) {}
  })
}

exports.auth = function(cb){
  if (Config.debug) {
    //调试模式
    cb(Config.userInfo);
  } else if (window.localStorage.getItem(Config.storageName)) {
    let _userInfo = JSON.parse(window.localStorage.getItem(Config.storageName));
    // console.log(res);
    wechat.getSubscribe(_userInfo.openid, function (err, res) {
      if (err) return alert(err);
      _userInfo.subscribe = res.subscribe;
      window.localStorage.setItem(Config.storageName, JSON.stringify(_userInfo));
      cb(_userInfo);
    })
  } else if (wechat.getQuery('code')) {
    //授权模式
    wechat.ready(function () {
      //用户数据在服务器获取
      // $.post(`${Config.server}/god_voter/`,{code:Util.getOption('code')},(res)=>{
      //   if(res.errorinfo){
      //       return wechat.goAuth('snsapi_userinfo', 'STATE', wechat.filter());
      //   }
      //   let data = res.data;
      //
      //   wechat.getSubscribe(res.data.openid, function (err, res2) {
      //     if (err) return alert(err);
      //     data.subscribe = res2.subscribe;
      //     window.localStorage.setItem(Config.storageName, JSON.stringify(data));
      //     cb(data);
      //   })
      //
      // })
      //用户数据在前端提交上去
      wechat.getUserInfo(function (err, res) {
        if (err) return wechat.goAuth('snsapi_userinfo', 'STATE', wechat.filter());
        console.log(res);
        wechat.getSubscribe(res.openid, function (err, res2) {
          if (err) return alert(err);
          res.subscribe = res2.subscribe;
          window.localStorage.setItem(Config.storageName, JSON.stringify(res));
          cb(res);
        })
      });
    })
  } else {
    wechat.goAuth('snsapi_userinfo', 'STATE', wechat.filter());
  }
}
