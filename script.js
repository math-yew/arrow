// totHeight = window.screen.availHeight;
// totWidth = window.screen.availWidth;

$(window).on('scroll', function() {
  var winScroll = $(this).scrollTop();

  $('.circle').css({
    'transform': 'translate(-' + winScroll / 2 + '%)'
  });
});
