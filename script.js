// totHeight = window.screen.availHeight;
// totWidth = window.screen.availWidth;



let docHeight = document.documentElement.scrollHeight;
let previous = 0;
console.log(document.documentElement.scrollTop);
setTimeout(function () {
  let winHeight = document.documentElement.innerHeight;
  let position = document.documentElement.scrollTop;
  let move = (position < docHeight - winHeight) ? 1 : -1;
  window.scrollTo(0, position + move);
  window.scrollTo(0, position);
},20);
$(window).on('scroll', function() {
  var winScroll = $(this).scrollTop();

  let winHeight = $(this).innerHeight();
  let scrollLength = docHeight-winHeight;

  let shifting = -Math.cos(winScroll/50);
  let z = (previous > shifting) ? 1 : -1;
  previous = shifting;

  $('.circle').css({
    'transform': 'translate(' + -150 *shifting + '%,' + 200 * shifting + '%) scale('+(1+.5*(1-Math.abs(shifting))*z)+')',
    'z-index': z*10
  });

  if(winScroll > 100){
    $('body').css({'background-color':'rgb('+255*winScroll/scrollLength+',255,0)'});
  }

  $('.pattern').css({
    'top': -winScroll/20+'px'
  });

  console.log("SCROLL: "+winScroll);
  // console.log($('.expand').position().top);

  $('.p1').css({
    'opacity': fade(200,500,"start",.9)
  });

  $('.p2').css({
    'opacity': fade(200,500,"end",.9)
  });

  if(winScroll > $('.e1').position().top - winHeight * .7 && winScroll < $('.e1').position().top - winHeight * .3){
    $('.e1').addClass("expanded");
    $('.e1').removeClass("expand");
    let started = $('.e1').position().top - winHeight * .95;
    console.log("start: " + started);
    console.log("end: " + $('.e1').position().top + winHeight * .25);
  }else{
    $('.e1').addClass("expand");
    $('.e1').removeClass("expanded");
    console.log("false");
  }

  let bool = winScroll < $('.e1').position().top + winHeight * .25;
  console.log(winHeight * .25);
  console.log("bool: " + bool);

  function fade(enter,exit,startend,max){
    let op;
    if(startend == "end") op = winScroll/(exit-enter) - enter/(exit-enter);
    if(startend == "start") op = winScroll/(enter-exit) - exit/(enter-exit);
      op = (op < max) ? op : max;
      op = (op < 0) ? 0 : op;
      return op;
  }



});
