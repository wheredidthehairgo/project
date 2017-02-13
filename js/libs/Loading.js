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
//  this.$dom.fadeOut();
this.$dom.hide();
  }
    
	 show(){
//	   this.$dom.fadeIn();
this.$dom.show();
	 }

}

module.exports = Loading;
