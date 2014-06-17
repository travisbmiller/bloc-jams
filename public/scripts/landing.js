$(document).ready(function(){
  
  $('.hero-content h3').click(function(){

    var self = this;
    
    subText = $(self).text();
    
    $(self).text(subText + "!");
  
  });

  
  var onHoverAction = function(event){
    
    var self = this;
   
    $(self).animate({'margin-top': '10px'});
  
  };

  
  var onHoverOffAction = function(event){
  
    var self = this;
  
    $(self).animate({'margin-top': '0px'});
  
  };

  
  $('.selling-points .point').hover(onHoverAction, onHoverOffAction);

});