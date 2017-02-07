// const $ = require('jquery');

class Loading extends BaseClass{

  constructor(str) {
    super(str);
  }

  preload(cb) {
    var $img = $("img");
    var loaded = 0;
    var total = $img.length;
    $img.each(function (i) {
      if (this.complete) {
        loaded++;
        cb(loaded, total);
      } else {
        this.onload = function () {
          loaded++;
          cb(loaded, total);
          this.onload = null;
        }
      }
    })
    if (!total) {
      cb(loaded, total);
    }
  }

  hide() {
    this.$dom.fadeOut();
  }
  //
  // show(){
  //   this.$dom.fadeIn();
  // }

}

module.exports = Loading;
