class Ip7 extends BaseClass {
    constructor(str){
        super(str);
    }
    init() {
        super.init();
        ViewAdapt.push('.iphone',640/900);
    }
}
module.exports = Ip7;