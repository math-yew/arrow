// totHeight = window.screen.availHeight;
// totWidth = window.screen.availWidth;



let docHeight = document.documentElement.scrollHeight;
let previous = 0;
console.log(document.documentElement.scrollTop);
setTimeout(function () {
  window.scrollTo(0, document.documentElement.scrollTop);
},20);
$(window).on('scroll', function() {
  var winScroll = $(this).scrollTop();

  let shifting = -Math.cos(winScroll/50);
  let z = (previous > shifting) ? 1 : -1;
  previous = shifting;

  $('.circle').css({
    'transform': 'translate(' + -150 *shifting + '%,' + 200 * shifting + '%) scale('+(1+.5*(1-Math.abs(shifting))*z)+')',
    'z-index': z*10,

  });

  if(winScroll > 100){
    $('body').css({'background-color':'rgb('+255*winScroll/docHeight+',255,0)'});
  }

  // console.log($('.circle').first().position().top);
});
