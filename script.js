// totHeight = window.screen.availHeight;
// totWidth = window.screen.availWidth;



let docHeight = document.documentElement.scrollHeight;
let previous = 0;
let winWidth;
let winHeight;
console.log(document.documentElement.scrollTop);
setTimeout(function () {
  winWidth = $(window).width();
  winHeight = $(window).height();
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


  // $(".safe").on("click",function(){ console.log("SAFE"); });
  // $(".safe").on("click",()=> $("#imageDiv").remove());


});

let lastPosition;
function category(cat,tar){
  let e = $("#"+cat);
  let arr = e.attr("class").split(/\s+/);
  if(arr.indexOf("category") > -1){
    if(tar.split(" ").indexOf("pic") == -1 && tar.split(" ").indexOf("safe") == -1){
      if(arr.indexOf("display") > -1){
        $('body').css({'position': 'relative'});
        e.empty();
        e.text(cat.toUpperCase());
        e.removeClass("display");
        window.scrollTo(0, lastPosition);
      } else {
        lastPosition = document.documentElement.scrollTop;
        e.empty();
        e.addClass("display");
        $("#templates #gallery").clone().appendTo("#"+cat);
        setTimeout(()=> $('body').css({'position': 'fixed'}),500);
        let picsArr;
        if(cat == "religious") picsArr = ["calm","bountiful","carry","veil","baby","portrait","smile"];
        if(cat == "nature") picsArr = ["butterfly","hum","frog","sun","lamb","turtle"];
        if(cat == "abstract") picsArr = ["blob","brynbow","explode","loss","ugly","foot","scrapers","grandpa"];
        for (var i = 0; i < picsArr.length; i++) {
          let className = picsArr[i];
          $("#templates #pic").clone().addClass(className).attr("id",className).appendTo("#"+cat+" #pics");
        }
      }
    }
  }
}

function removeImage(){
  $("#imageDiv").remove();
}

function enlarge(pic){
  let p = $("."+pic);
  let arr = p.attr("class").split(/\s+/);
  let width;
  let height;

  if(arr.indexOf("enlarge") > -1){
    p.removeClass("enlarge");
    width = "55vh";
    height = "45vh";
    $("#imageDiv").remove();
  } else {
    // p.addClass("enlarge");
    let url = p.css('background-image').match(/(\'|\").+(\'|\")/)[0].replace(/\"/g,"").replace(/\'/g,"");
    let img = $("<img>").attr("src",url).attr("id","tempImg").addClass("safe");
    let div = $('<div style="width:100%;height:100%;z-index:35;position:fixed;" id="imageDiv"></div>');
    div.addClass("safe").attr("onclick","removeImage()");
    let white = $('<div style="width:100%;height:100%;background-color:#000;position:absolute;opacity:.9;"></div>').addClass("safe");
    white.appendTo(div);
    img.appendTo(div);
    div.appendTo(".display")[0];
    let imageWidth = img.width();
    let imageHeight = img.height();

    let wRatio = winWidth/winHeight;
    let iRatio = imageWidth/imageHeight;

    if(wRatio < iRatio){
      width = "90vw";
      height = "auto";
    } else{
      width = "auto";
      height = "90vh";
    }
  }
  $("#tempImg").css({'width':width,'height':height})
}
