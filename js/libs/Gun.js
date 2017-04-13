module.exports={
    reset(str){
        $(str).css('backgroundPositionY', 0);
    },

    starmove(str, value, i, fn){
            let total=-(100*45-100*value);
            let now=value*100
            $(str).animate({
                backgroundPositionY: total+'%'
                //现在圈数为15
            },{
                duration: 3000+i*1000,
                easing:"swing",
                complete:(()=>{
                    $(str).css('backgroundPositionY', now+'%');
                    fn();
                })
                });   
    }


}