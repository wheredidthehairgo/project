module.exports={
    reset(str){
        $(str).css('backgroundPositionY', 0);
    },

    starmove(str, value, hei, i, fn){
            $(str).animate({
                backgroundPositionY: (hei*18) - (hei*value)
                //现在圈数为3
            },{
                duration: 3000+i*2000,
                easing:"linear",
                complete:fn
                });   
    }
}