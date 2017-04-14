/**
 * @Author: yingzhou xu
 * @Date:   2017-04-14T11:15:01+08:00
 * @Email:  dyyz1993@qq.com
 * @Filename: ViewAdapt.js
 * @Last modified by:   yingzhou xu
 * @Last modified time: 2017-04-14T15:04:45+08:00
 */


// ["对象",比例]
const arr = [];

// 需要缩放的容器，需要缩放的最小比例
exports.push = function (str, needRatio, ismove = true){
  arr.push([ str, needRatio, ismove ]);
  resize();
};

function resize(){
  const wW = window.innerWidth;
  const wH = window.innerHeight;
  // 可以设配的比例
  const wRatio = wW / wH;
  arr.forEach((item) => {
    if(wRatio > item[1]){
      const w = item[1] * wH;
      const marginL = (wW - w) / 2;
      $(item[0]).width(w);
      if(item[2]){
        $(item[0]).css({ 'marginLeft': marginL });
      }
    }
  });

}
exports.resizeFonfSize = (needRatio) => {
  const w = $(window).innerWidth();
  const h = $(window).innerHeight();
  if((w / h) / needRatio > 1){
    $('html').css('fontSize', `${ 16 / ((w / h) / needRatio) }px`);
  }
};
