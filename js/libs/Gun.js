module.exports={
    reset(str){
        $(str).css('backgroundPositionY', 0);
    },

    starmove(str, value, i, fn){
            let total=100*18-100*value;
            $(str).animate({
                backgroundPositionY: total+'%'
                //现在圈数为6
            },{
                duration: 3000+i*2000,
                easing:"linear",
                complete:fn
                });   
    }
}