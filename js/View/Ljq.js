class Ljq extends BaseClass {
    constructor(str){
        ViewAdapt.push('.lijianquan',342/523);
        super(str);
    }
    init() {
        super.init();
        this.$dom.find('#btn-exchange').on('tap',()=>{
            try { dataSDK.btnClick('button3','跳转到立白券兑换处'); } catch (e) {}
            window.location.href=`http://55952265.m.weimob.com/vshop/55952265/Coupon/CouponTemplate?CouponTemplateNo=46513317281e465e8fb928e2dd8427f8`;
        })
    }
}
module.exports = Ljq;