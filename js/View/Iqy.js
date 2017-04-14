/**
 * @Author: yingzhou xu
 * @Date:   2017-04-14T11:15:01+08:00
 * @Email:  dyyz1993@qq.com
 * @Filename: Iqy.js
 * @Last modified by:   yingzhou xu
 * @Last modified time: 2017-04-14T16:02:26+08:00
 */


class Iqy extends BaseClass {
  constructor(str){
    ViewAdapt.push('.iqiyi', 342 / 523);
    super(str);
  }
  init() {
    super.init();
    this.$dom.find('#btn-exchange').on('tap', () => {
      try { dataSDK.btnClick('button2', '跳转到爱奇艺'); } catch (e) {}
      window.location.href = `http://vip.iqiyi.com/jihuoma.html`;
    });
  }

  show(){
    super.show();
    this.$dom.find('#copy-content').text(Config.ticket_id);
    const id = this.$dom.find('#copy-content').text();
    this.$dom.find('#btn-copy').on('tap', () => {
      TipManager.show('复制成功,如失败请手动复制!');
      Util.copySelectedRange(document.querySelector('#copy-content'));
    });

        // var clipboard = new (global.Clipboard)('#btn-copy');

        // clipboard.on('success', function(e) {
        //     alert('复制成功')
        //     console.info('Action:', e.action);
        //     console.info('Text:', e.text);
        //     console.info('Trigger:', e.trigger);


        // });

        // clipboard.on('error', function(e) {
        //     alert('复制失败，请手动操作')
        //     console.error('Action:', e.action);
        //     console.error('Trigger:', e.trigger);
        // });
  }
}
module.exports = Iqy;
