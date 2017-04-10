module.exports = class {
    constructor(str) {
        this.$dom = $('#' + str);
        this.init();
    }

    init() {
        this.numBox = this.$dom.find(".num-box");
        this.num = $(this.numBox).find(".num");
        this.btn = this.$dom.find(".btn");
        this.height = parseInt($(this.num).css("height"))
        this.count = 0;
        this.isBegin = false;
        this.run();
    }

    run() {
        this.value = [];
        let hei = this.height;
        $(this.btn).on("click", () => {
            if (this.isBegin) return false;
            this.isBegin = true;
            $.each(this.num, (i, n) => {
                this.value[i] = parseInt(Math.random() * 10);
                let value = this.value[i];
                Gun.reset(n);
                Gun.starmove(n, value, hei, i, this.jugde.bind(this));
            })
        })
    }

    jugde() {
        this.count++;
        if (this.count == 3) {
            if (this.value[0] == this.value[1] && this.value[2] == this.value[1]) {
                alert("恭喜中奖");
            } else {
                alert("很遗憾，没有中奖");
            }
            this.isBegin = false;
            this.count = 0
        }
    }
}