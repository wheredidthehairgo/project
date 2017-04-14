/**
 * @Author: yingzhou xu
 * @Date:   2017-04-14T11:15:01+08:00
 * @Email:  dyyz1993@qq.com
 * @Filename: BasePopupClass.js
 * @Last modified by:   yingzhou xu
 * @Last modified time: 2017-04-14T15:11:03+08:00
 */


class BasePopupClass extends BaseClass{
  constructor(str){
    super(str);
    ViewAdapt.push(str + ' .wrap', 640 / 1008, false);
  }

  show(){
    // super.show()
    this.$dom.fadeInUp();
  }

  hide(){
    // super.hide()
    this.$dom.fadeOutDown();
    // this.$dom.hide();
  }
}
module.exports = BasePopupClass;
