const wechat = new Wechat(Config.appid);
const TITLE = '标题';
const DESC = '描述';
const IMGURL = Config.host + `/resources/img/icon.jpg`;
const LINK = `${ Config.shareUrl }?url=${ encodeURIComponent(dealUrl(wechat.filter([ 'code', 'id' ], { share: 'share' }))) }`;

// 处理不加载婓波的异常
function dealUrl(url) {
  try {
    return dataSDK.dealUrl(url);
  } catch (e) {
    return url;
  }
}


exports.init = function () {
  wechat.config();
  exports.share();
};

exports.share = function (title = TITLE, desc = DESC, link = LINK, imgUrl = IMGURL) {
  wechat.shareFriend({
    appmessageTitle: title,
    appmessageDesc: desc,
    link,
    imgUrl,
  }, function () {
    try { dataSDK.share('friend'); } catch (e) {}
    // alert('friend');
  });
  wechat.shareTimeline({
    timelineTitle: title,
    link,
    imgUrl,
  }, function () {
    try { dataSDK.share('timeline'); } catch (e) {}
  });
};

exports.auth = function (cb) {
  if (Config.debug && Util.getOption('debug')) {
    // 调试模式
    cb(Config.userInfo);
  } else if (window.localStorage.getItem(Config.storageName)) {
    const _userInfo = JSON.parse(window.localStorage.getItem(Config.storageName));
    // console.log(res);
    wechat.getSubscribe(_userInfo.openid, function (err, res) {
      if (err) { return alert(err); }
      _userInfo.subscribe = res.subscribe;
      window.localStorage.setItem(Config.storageName, JSON.stringify(_userInfo));
      cb(_userInfo);
    });
  } else if (wechat.getQuery('code')) {
    // 授权模式
    wechat.ready(function () {
      // 用户数据在服务器获取
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
      // 用户数据在前端提交上去
      wechat.getUserInfo(function (err, res) {
        if (err) { return wechat.goAuth('snsapi_userinfo', 'STATE', wechat.filter()); }
        console.log(res);
        wechat.getSubscribe(res.openid, function (err, res2) {
          if (err) { return alert(err); }
          res.subscribe = res2.subscribe;
          window.localStorage.setItem(Config.storageName, JSON.stringify(res));
          cb(res);
        });
      });
    });
  } else {
    wechat.goAuth('snsapi_userinfo', 'STATE', wechat.filter());
  }
};
