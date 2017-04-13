/**
 * Created by Weijie Zhu on 2016/11/29.
 */

'use strict';
const pre = 'tiger';
module.exports = {
  debug: true,
  id: null,
  super_name: pre,
  appid: 'wx26be12d215d3d8cb',
  storageName: 'libai_userInfo_version_322_s11',
  // 用户的数据
  userInfo: {
    // openid: 'oPOant400Kkhb6qilPXFfrAw6qBk',
    openid: 'test178',
    nickname: 'kuku',
    sex: '1',
    province: '广东',
    city: '广州',
    country: '中国',
    headimgurl: 'http://wx.qlogo.cn/mmopen/Xmnun9Io49TNwrKPL4SnYq7p5QkMaztSrxxJHWC3twTdYX7Ur39KeiczZeEUBUB3dwIcd49Xpe7w3sSxTXI0aCQ/0',
    subscribe: 1
  },
  // 当前H5的地址，主要为了ICON；
  // host: `http://100jc.net/goddess/public/h5_${pre}`,
  host: `http://100jc.net/tigerGame/public/h5`,
  // server: 'http://192.168.199.174:9960',
  // 服务器的地址
  server: 'http://100jc.net/tigerGame/tiger/',
  // server: 'http://127.0.0.1:9910',
  // 上传到七牛
  // qiniu: 'http://up.qiniu.com',
  // 需要代理的分享地址
  shareUrl: 'http://toupiao.91iot.net/',
};
