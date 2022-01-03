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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigkKXtcclxuICB2YXIgYXBwO1xyXG4gIGFwcCA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLl9zbW9vdGhTY3JvbGwoKTtcclxuICAgIH0sXHJcbiAgICBfc21vb3RoU2Nyb2xsOiBmdW5jdGlvbigpIHtcclxuICAgICAgJCgnW2hyZWZePVwiI1wiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICB2YXIgY3VycmVudCA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XHJcbiAgICAgICAgaWYoJCh0aGlzKS5oYXNDbGFzcygnbWVudS1pdGVtJykpIHtcclxuICAgICAgICAgIGlmKGN1cnJlbnQgPT0gJyN0b3V0Jykge1xyXG4gICAgICAgICAgICAkKCcuc2VjdGlvbi1pdGVtJykuc2hvdygpO1xyXG4gICAgICAgICAgICBjdXJyZW50ID0gJyMnKyQoJy5zZWN0aW9uLWl0ZW06Zmlyc3QnKS5hdHRyKCdpZCcpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjdXJyZW50KVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnLnNlY3Rpb24taXRlbScpLmhpZGUoKTtcclxuICAgICAgICAgICAgJChjdXJyZW50KS5zaG93KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBzY3JvbGxUb3A6ICQoY3VycmVudCkub2Zmc2V0KCkudG9wXHJcbiAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gIH07XHJcblxyXG4gIGFwcC5pbml0KCk7XHJcblxyXG5cclxufShqUXVlcnkpKTsiXSwiZmlsZSI6ImpxdWVyeS5zY3JpcHRzLmpzIn0=
