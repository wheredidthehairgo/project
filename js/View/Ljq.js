class Ljq extends BaseClass {
    constructor(str){
        super(str);
    }
    init() {
        super.init();
        ViewAdapt.push('.lijianquan',640/900);
        $('.lijianquan').height($(window).innerHeight());
        this.$dom.find('#btn-exchange').on('tap',()=>{
            window.location.href=`http://55952265.m.weimob.com/vshop/55952265/Coupon/CouponTemplate?CouponTemplateNo=46513317281e465e8fb928e2dd8427f8`;
        })
    }
}
module.exports = Ljq;