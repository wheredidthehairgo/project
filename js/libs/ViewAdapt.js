
// ["对象",比例]
const arr = [];

// 需要缩放的容器，需要缩放的最小比例
exports.push = function (str, needRatio){
  arr.push([ str, needRatio ]);
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
      $(item[0]).css({ 'marginLeft': marginL });
    }
  });
}
window.onresize = function (){
  resize();
};
