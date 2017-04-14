/**
 * @Author: yingzhou xu
 * @Date:   2017-04-14T11:15:01+08:00
 * @Email:  dyyz1993@qq.com
 * @Filename: Ljq.js
 * @Last modified by:   yingzhou xu
 * @Last modified time: 2017-04-14T17:29:31+08:00
 */


class Ljq extends BaseClass {
  constructor(str){
    ViewAdapt.push('.lijianquan', 342 / 523);
    super(str);
  }
  init() {
    super.init();
    this.$dom.find('#btn-exchange').on('tap', () => {
      try { dataSDK.btnClick('button3', '跳转到立白券兑换处'); } catch (e) {}
      window.location.href = `http://55952265.m.weimob.com/vshop/55952265/Coupon/CouponTemplate?CouponTemplateNo=f7d9176c6a9c413a907af95327104be1`;
    });
  }
}
module.exports = Ljq;
