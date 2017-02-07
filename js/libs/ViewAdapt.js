let initW = 640;
let initH = 1008;
let ratio = initW/initH;
let needRatio = 284/427;
let arr = [];//["对象",比例]

exports.push = function(str,needRatio){
  arr.push([str,needRatio])
  resize();
}

function resize(){
  let wW = window.innerWidth;
  let wH = window.innerHeight;
  //可以设配的比例
  let wRatio = wW/wH;
  arr.forEach((item)=>{
    if(wRatio>item[1]){
      let w = item[1]*wH;
      let marginL = (wW-w)/2;
      $(item[0]).width(w);
      $(item[0]).css({"marginLeft":marginL});
    }
  })
}
window.onresize = function(){
  resize();
}
