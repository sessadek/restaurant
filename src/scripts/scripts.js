(function($){
  var app;
  app = {
    init: function() {
      // this._fixedHeader();
      // this._validationJS();
      // this._lineHeight();
      // this._fadeUpLoad();
      // this._slider();
      // this._clickByHash();
      // this._fixedContact();
      // this._input();
      this._smoothScroll();
    },
    _smoothScroll: function() {
      $('[href^="#"]').on('click', function(e) {
          e.preventDefault();
            $("html, body").animate({
              scrollTop: $($(this).attr("href")).offset().top
            }, 1000);
        });
    },
    _input: function() {
      $('.form-control').focus(function() {
        $parent = $(this).parent('.form-group');
        $parent.addClass('has-focus');
      }).blur(function() {
        $parent = $(this).parent('.form-group');
        if ($(this).val() == "") {
          $parent.removeClass('has-focus');
        }
      });
    },
    _fixedContact: function() {
      $('.btn-contact-fixed').on('click', function(e) {
        e.preventDefault();
        $parent = $(this).parent('.fixed-contact');
        $parent.toggleClass('is-show');

        
      });
      
    },
    _fadeUpLoad: function() {
      $(window).on('load scroll', function() {
        var $fadeUpElements = $('.b-profond, .b-actualite, .b-product');
        var $top = $(window).scrollTop();
        if ($fadeUpElements.length) {
          $fadeUpElements.each(function(index, el) {
            var $topElement = $(this).offset().top - ($(window).outerHeight() / 1.5);
            if ($top >= $topElement) {
              $(this).addClass('is-animated');
            }
          });
        }
      });
      
    },
    _slider: function() {
      if($('.slider-testimonial__item').length > 1) {
        $('.slider-testimonial').slick({
          dots: false,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 15000,
          adaptiveHeight: true
        });
      }
      
      if ($('.sliderNumber-byOne--item').length) {
        var $sliderOne = $('.sliderNumber-byOne');
        $sliderOne.slick({
          arrows: false,
          dots: true,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          adaptiveHeight: true,
          fade: false
        }); 

      }

      
      var $optionSlickMultiple = {
        infinite: true,
        dots: false,
        arrows: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1201,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 801,
            settings: {
              slidesToShow: 2,
            }
          }
        ]
      };
      if($('.slider-references').length) {
        $('.slider-references').slick($optionSlickMultiple);
      }
      
      
    },
    _clickByHash: function() {
      
      $(window).on('load scroll resize', function() {
        var $headerHeight = $('header').outerHeight(true);
      });
      $(document).on('click', 'a[href^="#"]', function (e) {
        e.preventDefault();

        if($(this).attr("href") != '#') {
          $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - $headerHeight
          }, 1000);
        }
        
      });
    },
    _calculLineHeight: function($cibleArgument) {
      var $cible = $($cibleArgument);
      $.each($cible, function(key, value) {
        var $lh = (parseFloat($(value).find('.p').css('line-height')) * 3);
        var $h = $(value).innerHeight();
        if ($h > $lh) {
          $(value).append('<span> [...]</span>');
          $(value).css({'height': $lh - 2}).addClass('is-hidden');
        }
        $(value).on('click', 'span', function() {
          $(this).parents($cibleArgument).toggleClass('is-hidden');
          $(this).hide();
        });
      });
    },
    _lineHeight: function() {
      // this method need _calculLineHeight function
      if ($(window).width() < 801) {
        this._calculLineHeight('.text-lineHeight');
      }
    },
    _fixedHeader: function() {
      $('header').on('show.bs.collapse', function () {
        $(this).addClass('is-active');
        $('body').addClass('is-clipped');
      });
      $('header').on('hide.bs.collapse', function () {
        $(this).removeClass('is-active');
        $('body').removeClass('is-clipped');
        $('.nav-link.active').removeClass('active').next('.nav-item__wrapper').slideUp();
        $('.nav-item__dropDown > a.active').removeClass('active').next('ul').slideUp();
      });
      $(window).on('load scroll', function() {
        $headerHeight = $('header').outerHeight(true);
        $('body').css('padding-top', $headerHeight);
        if ($(window).scrollTop() > 0) {
          $('header').addClass('is-sticky');
          
        } else {
          $('header').removeClass('is-sticky');
          $('body').css('padding-top', '');
          
        }
      });
    },
    _validationJS: function() {
      $.validator.addMethod("customemail", 
        function(value, element) {
          return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        }, 'Veuillez fournir une adresse électronique valide.');

      $.validator.addMethod('filesize', function (value, element, param) {
        return this.optional(element) || (element.files[0].size <= param)
      }, 'La taille du fichier doit être inférieure à {0}');

      
      if ($('#form-newsletter').length) {
        $('#form-newsletter').validate({
          rules: {
            "email": {
              required: true,
              'customemail': true
            },
            "check-newsletter-form": 'required'
          },
          highlight: function(element, errorClass, validClass) {
            $(element).parents('.form-group').addClass(errorClass).removeClass(validClass);
          },
          unhighlight: function(element, errorClass, validClass) {
            $(element).parents('.form-group').removeClass(errorClass).addClass(validClass);
          }
        });
      }


      if ($('#contact-form').length) {
        $('#contact-form').validate({
          rules: {
            "nom": "required",
            "mail": {
              required: true,
              'customemail': true
            },
            "message": "required",
            "checkContactForm": 'required'
          },
          highlight: function(element, errorClass, validClass) {
            $(element).parents('.form-group').addClass(errorClass).removeClass(validClass);
          },
          unhighlight: function(element, errorClass, validClass) {
            $(element).parents('.form-group').removeClass(errorClass).addClass(validClass);
          }
        });
      }

      if ($('#contact-fixed-form').length) {
        $('#contact-fixed-form').validate({
          rules: {
            "nom": "required",
            "mail": {
              required: true,
              'customemail': true
            },
            "message": "required",
            "checkContactFixedForm": 'required'
          },
          highlight: function(element, errorClass, validClass) {
            $(element).parents('.form-group').addClass(errorClass).removeClass(validClass);
          },
          unhighlight: function(element, errorClass, validClass) {
            $(element).parents('.form-group').removeClass(errorClass).addClass(validClass);
          }
        });
      }
    }
  };

  app.init();


}(jQuery));