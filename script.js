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
    let colorValue = 255*winScroll/scrollLength;
    // $('body').css({'background-color':'rgb('+colorValue/3 + 170+',255,255)'});
  }

  $('.pattern').css({
    'top': -winScroll/20+'px'
  });

  console.log("SCROLL: "+winScroll);
  // console.log($('.expand').position().top);

  $('.p1').css({
    'opacity': fade(200,500,"start",.5)
  });

  $('.p2').css({
    'opacity': fade(200,500,"end",.5)
  });

  // expand('.e1','hidden','expanded', winScroll);
  // expand('.e2','hidden','expanded', winScroll);

  function expand(e, inactive, active, ws) {
    if(ws > $(e).position().top - winHeight * .8 && ws < $(e).position().top - winHeight*.2) {
      $(e).addClass(active);
      $(e).removeClass(inactive);
    } else {
      $(e).addClass(inactive);
      $(e).removeClass(active);
    }
  }

  function fade(enter,exit,startend,max){
    let op;
    if(startend == "end") op = winScroll/(exit-enter) - enter/(exit-enter);
    if(startend == "start") op = winScroll/(enter-exit) - exit/(enter-exit);
      op = (op < max) ? op : max;
      op = (op < 0) ? 0 : op;
      return op;
  }




});

function category(cat){
  let e = $("#"+cat);
  let arr = e.attr("class").split(/\s+/);
  if(arr.indexOf("category") > -1){
    if(arr.indexOf("display") > -1){
      e.empty();
      console.log("cat: " + cat.toUpperCase());
      e.text(cat.toUpperCase());
      e.removeClass("display");
    } else {
      e.empty();
      e.addClass("display");
      $("#templates #gallery").clone().appendTo("#"+cat);
      $("#templates #pic").clone().addClass("hum").appendTo("#"+cat+" #pics");
    }
  }
}
