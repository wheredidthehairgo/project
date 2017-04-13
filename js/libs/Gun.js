module.exports={
    reset(str){
        $(str).css('backgroundPositionY', 0);
    },

    starmove(str, value, i, fn){
            let total=100*30-100*value;
            $(str).animate({
                backgroundPositionY: total+'%'
                //现在圈数为10
            },{
                duration: 3000+i*1000,
                easing:"swing",
                complete:fn
                });   
    }


}