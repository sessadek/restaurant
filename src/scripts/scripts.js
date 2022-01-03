(function($){
  var app;
  app = {
    init: function() {
      this._smoothScroll();
    },
    _smoothScroll: function() {
      $('[href^="#"]').on('click', function(e) {
        var current = $(this).attr("href");
        if($(this).hasClass('menu-item')) {
          if(current == '#tout') {
            $('.section-item').show();
            current = '#'+$('.section-item:first').attr('id');
            console.log(current)
          } else {
            $('.section-item').hide();
            $(current).show();
          }
        }
        e.preventDefault();
          $("html, body").animate({
            scrollTop: $(current).offset().top
          }, 1000);
      });
    },
  };

  app.init();


}(jQuery));