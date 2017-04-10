class Home extends BaseClass {
  constructor(str) {
    super(str);

  }

  init() {
    super.init();
    this.numBox = this.$dom.find(".laohuji-container");
    this.num = $(this.numBox).find(".laohuji-part");
    this.btn = this.$dom.find(".play-btn");
    this.height = $(this.num).innerHeight();
    this.count = 0;
    this.isBegin = false;
    this.run();
    this.$dom.find('.rule-btn').on('tap', () => {
      global.Popup.rule.show();
    });
    this.$dom.find('.share-btn').on('tap', () => {
      global.Popup.share.show();
    })
  }

  run() {
        this.value = [];
        let hei = this.height;
        $(this.btn).on("click", () => {
            if (this.isBegin) return false;
            this.isBegin = true;
            $.each(this.num, (i, n) => {
                this.value[i] = parseInt(Math.random() * 3);
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
module.exports = Home;
