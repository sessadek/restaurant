(function($){
    var app;
    
    
    app = {
      init: function() {
        this._smoothScroll()
      },
      _smoothScroll: function() {
        $('[href^="#"]').on('click', function(e) {
            e.preventDefault();
              $("html, body").animate({
                scrollTop: $($(this).attr("href")).offset().top
              }, 1000);
          });
      }
    };
  
    app.init();
  
  
  }(jQuery));
