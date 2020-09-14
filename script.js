// totHeight = window.screen.availHeight;
// totWidth = window.screen.availWidth;

let previous = 0;
$(window).on('scroll', function() {
  var winScroll = $(this).scrollTop();

  let shifting = -Math.cos(winScroll/20);
  let z = (previous > shifting) ? 10 : -10;
  previous = shifting;

  $('.circle').css({
    'transform': 'translate(' + -150 *shifting + '%,' + 200 * shifting + '%)',
    'z-index': z
  });
});
