let debug = true;

exports.add = function (option){
  option.success = option.success || function(){};
  if(debug){

  }else{
    $.ajax(option);
  }
}
