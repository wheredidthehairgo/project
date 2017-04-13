class Iqy extends BaseClass {
    constructor(str){
        ViewAdapt.push('.iqiyi',342/523);
        super(str);
    }
    init() {
        super.init();
        this.$dom.find('#btn-exchange').on('tap',()=>{
            window.location.href=`http://vip.iqiyi.com/jihuoma.html`;
        })
    }

    show(){
        super.show();
        this.$dom.find('#copy-content').text(Config.ticket_id);
        let id=this.$dom.find('#copy-content').text();
        this.$dom.find('#btn-copy').on('tap', ()=>{
            TipManager.show("请手动复制");
        })
    
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