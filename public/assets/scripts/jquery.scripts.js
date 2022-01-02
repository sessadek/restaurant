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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigkKXtcclxuICB2YXIgYXBwO1xyXG4gIGFwcCA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAvLyB0aGlzLl9maXhlZEhlYWRlcigpO1xyXG4gICAgICAvLyB0aGlzLl92YWxpZGF0aW9uSlMoKTtcclxuICAgICAgLy8gdGhpcy5fbGluZUhlaWdodCgpO1xyXG4gICAgICAvLyB0aGlzLl9mYWRlVXBMb2FkKCk7XHJcbiAgICAgIC8vIHRoaXMuX3NsaWRlcigpO1xyXG4gICAgICAvLyB0aGlzLl9jbGlja0J5SGFzaCgpO1xyXG4gICAgICAvLyB0aGlzLl9maXhlZENvbnRhY3QoKTtcclxuICAgICAgLy8gdGhpcy5faW5wdXQoKTtcclxuICAgICAgdGhpcy5fc21vb3RoU2Nyb2xsKCk7XHJcbiAgICB9LFxyXG4gICAgX3Ntb290aFNjcm9sbDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICQoJ1tocmVmXj1cIiNcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICQoXCJodG1sLCBib2R5XCIpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICAgIHNjcm9sbFRvcDogJCgkKHRoaXMpLmF0dHIoXCJocmVmXCIpKS5vZmZzZXQoKS50b3BcclxuICAgICAgICAgICAgfSwgMTAwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgX2lucHV0OiBmdW5jdGlvbigpIHtcclxuICAgICAgJCgnLmZvcm0tY29udHJvbCcpLmZvY3VzKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRwYXJlbnQgPSAkKHRoaXMpLnBhcmVudCgnLmZvcm0tZ3JvdXAnKTtcclxuICAgICAgICAkcGFyZW50LmFkZENsYXNzKCdoYXMtZm9jdXMnKTtcclxuICAgICAgfSkuYmx1cihmdW5jdGlvbigpIHtcclxuICAgICAgICAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoJy5mb3JtLWdyb3VwJyk7XHJcbiAgICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gXCJcIikge1xyXG4gICAgICAgICAgJHBhcmVudC5yZW1vdmVDbGFzcygnaGFzLWZvY3VzJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBfZml4ZWRDb250YWN0OiBmdW5jdGlvbigpIHtcclxuICAgICAgJCgnLmJ0bi1jb250YWN0LWZpeGVkJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkcGFyZW50ID0gJCh0aGlzKS5wYXJlbnQoJy5maXhlZC1jb250YWN0Jyk7XHJcbiAgICAgICAgJHBhcmVudC50b2dnbGVDbGFzcygnaXMtc2hvdycpO1xyXG5cclxuICAgICAgICBcclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgfSxcclxuICAgIF9mYWRlVXBMb2FkOiBmdW5jdGlvbigpIHtcclxuICAgICAgJCh3aW5kb3cpLm9uKCdsb2FkIHNjcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciAkZmFkZVVwRWxlbWVudHMgPSAkKCcuYi1wcm9mb25kLCAuYi1hY3R1YWxpdGUsIC5iLXByb2R1Y3QnKTtcclxuICAgICAgICB2YXIgJHRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICBpZiAoJGZhZGVVcEVsZW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgJGZhZGVVcEVsZW1lbnRzLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsKSB7XHJcbiAgICAgICAgICAgIHZhciAkdG9wRWxlbWVudCA9ICQodGhpcykub2Zmc2V0KCkudG9wIC0gKCQod2luZG93KS5vdXRlckhlaWdodCgpIC8gMS41KTtcclxuICAgICAgICAgICAgaWYgKCR0b3AgPj0gJHRvcEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hbmltYXRlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgIH0sXHJcbiAgICBfc2xpZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgaWYoJCgnLnNsaWRlci10ZXN0aW1vbmlhbF9faXRlbScpLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAkKCcuc2xpZGVyLXRlc3RpbW9uaWFsJykuc2xpY2soe1xyXG4gICAgICAgICAgZG90czogZmFsc2UsXHJcbiAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgYXV0b3BsYXk6IHRydWUsXHJcbiAgICAgICAgICBhdXRvcGxheVNwZWVkOiAxNTAwMCxcclxuICAgICAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGlmICgkKCcuc2xpZGVyTnVtYmVyLWJ5T25lLS1pdGVtJykubGVuZ3RoKSB7XHJcbiAgICAgICAgdmFyICRzbGlkZXJPbmUgPSAkKCcuc2xpZGVyTnVtYmVyLWJ5T25lJyk7XHJcbiAgICAgICAgJHNsaWRlck9uZS5zbGljayh7XHJcbiAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxyXG4gICAgICAgICAgZG90czogdHJ1ZSxcclxuICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgICAgc3BlZWQ6IDMwMCxcclxuICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcclxuICAgICAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlLFxyXG4gICAgICAgICAgZmFkZTogZmFsc2VcclxuICAgICAgICB9KTsgXHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICBcclxuICAgICAgdmFyICRvcHRpb25TbGlja011bHRpcGxlID0ge1xyXG4gICAgICAgIGluZmluaXRlOiB0cnVlLFxyXG4gICAgICAgIGRvdHM6IGZhbHNlLFxyXG4gICAgICAgIGFycm93czogdHJ1ZSxcclxuICAgICAgICBzbGlkZXNUb1Nob3c6IDYsXHJcbiAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgICAgICAgcmVzcG9uc2l2ZTogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBicmVha3BvaW50OiAxMjAxLFxyXG4gICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMyxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgYnJlYWtwb2ludDogODAxLFxyXG4gICAgICAgICAgICBzZXR0aW5nczoge1xyXG4gICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMixcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfTtcclxuICAgICAgaWYoJCgnLnNsaWRlci1yZWZlcmVuY2VzJykubGVuZ3RoKSB7XHJcbiAgICAgICAgJCgnLnNsaWRlci1yZWZlcmVuY2VzJykuc2xpY2soJG9wdGlvblNsaWNrTXVsdGlwbGUpO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBcclxuICAgIH0sXHJcbiAgICBfY2xpY2tCeUhhc2g6IGZ1bmN0aW9uKCkge1xyXG4gICAgICBcclxuICAgICAgJCh3aW5kb3cpLm9uKCdsb2FkIHNjcm9sbCByZXNpemUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgJGhlYWRlckhlaWdodCA9ICQoJ2hlYWRlcicpLm91dGVySGVpZ2h0KHRydWUpO1xyXG4gICAgICB9KTtcclxuICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ2FbaHJlZl49XCIjXCJdJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGlmKCQodGhpcykuYXR0cihcImhyZWZcIikgIT0gJyMnKSB7XHJcbiAgICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKCQodGhpcykuYXR0cihcImhyZWZcIikpLm9mZnNldCgpLnRvcCAtICRoZWFkZXJIZWlnaHRcclxuICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgX2NhbGN1bExpbmVIZWlnaHQ6IGZ1bmN0aW9uKCRjaWJsZUFyZ3VtZW50KSB7XHJcbiAgICAgIHZhciAkY2libGUgPSAkKCRjaWJsZUFyZ3VtZW50KTtcclxuICAgICAgJC5lYWNoKCRjaWJsZSwgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHZhciAkbGggPSAocGFyc2VGbG9hdCgkKHZhbHVlKS5maW5kKCcucCcpLmNzcygnbGluZS1oZWlnaHQnKSkgKiAzKTtcclxuICAgICAgICB2YXIgJGggPSAkKHZhbHVlKS5pbm5lckhlaWdodCgpO1xyXG4gICAgICAgIGlmICgkaCA+ICRsaCkge1xyXG4gICAgICAgICAgJCh2YWx1ZSkuYXBwZW5kKCc8c3Bhbj4gWy4uLl08L3NwYW4+Jyk7XHJcbiAgICAgICAgICAkKHZhbHVlKS5jc3MoeydoZWlnaHQnOiAkbGggLSAyfSkuYWRkQ2xhc3MoJ2lzLWhpZGRlbicpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKHZhbHVlKS5vbignY2xpY2snLCAnc3BhbicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCRjaWJsZUFyZ3VtZW50KS50b2dnbGVDbGFzcygnaXMtaGlkZGVuJyk7XHJcbiAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgX2xpbmVIZWlnaHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAvLyB0aGlzIG1ldGhvZCBuZWVkIF9jYWxjdWxMaW5lSGVpZ2h0IGZ1bmN0aW9uXHJcbiAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA8IDgwMSkge1xyXG4gICAgICAgIHRoaXMuX2NhbGN1bExpbmVIZWlnaHQoJy50ZXh0LWxpbmVIZWlnaHQnKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIF9maXhlZEhlYWRlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICQoJ2hlYWRlcicpLm9uKCdzaG93LmJzLmNvbGxhcHNlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaXMtY2xpcHBlZCcpO1xyXG4gICAgICB9KTtcclxuICAgICAgJCgnaGVhZGVyJykub24oJ2hpZGUuYnMuY29sbGFwc2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKCdpcy1jbGlwcGVkJyk7XHJcbiAgICAgICAgJCgnLm5hdi1saW5rLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5uZXh0KCcubmF2LWl0ZW1fX3dyYXBwZXInKS5zbGlkZVVwKCk7XHJcbiAgICAgICAgJCgnLm5hdi1pdGVtX19kcm9wRG93biA+IGEuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLm5leHQoJ3VsJykuc2xpZGVVcCgpO1xyXG4gICAgICB9KTtcclxuICAgICAgJCh3aW5kb3cpLm9uKCdsb2FkIHNjcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICRoZWFkZXJIZWlnaHQgPSAkKCdoZWFkZXInKS5vdXRlckhlaWdodCh0cnVlKTtcclxuICAgICAgICAkKCdib2R5JykuY3NzKCdwYWRkaW5nLXRvcCcsICRoZWFkZXJIZWlnaHQpO1xyXG4gICAgICAgIGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAwKSB7XHJcbiAgICAgICAgICAkKCdoZWFkZXInKS5hZGRDbGFzcygnaXMtc3RpY2t5Jyk7XHJcbiAgICAgICAgICBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJCgnaGVhZGVyJykucmVtb3ZlQ2xhc3MoJ2lzLXN0aWNreScpO1xyXG4gICAgICAgICAgJCgnYm9keScpLmNzcygncGFkZGluZy10b3AnLCAnJyk7XHJcbiAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIF92YWxpZGF0aW9uSlM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAkLnZhbGlkYXRvci5hZGRNZXRob2QoXCJjdXN0b21lbWFpbFwiLCBcclxuICAgICAgICBmdW5jdGlvbih2YWx1ZSwgZWxlbWVudCkge1xyXG4gICAgICAgICAgcmV0dXJuIC9eXFx3KyhbLSsuJ11cXHcrKSpAXFx3KyhbLS5dXFx3KykqXFwuXFx3KyhbLS5dXFx3KykqJC8udGVzdCh2YWx1ZSk7XHJcbiAgICAgICAgfSwgJ1ZldWlsbGV6IGZvdXJuaXIgdW5lIGFkcmVzc2Ugw6lsZWN0cm9uaXF1ZSB2YWxpZGUuJyk7XHJcblxyXG4gICAgICAkLnZhbGlkYXRvci5hZGRNZXRob2QoJ2ZpbGVzaXplJywgZnVuY3Rpb24gKHZhbHVlLCBlbGVtZW50LCBwYXJhbSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbmFsKGVsZW1lbnQpIHx8IChlbGVtZW50LmZpbGVzWzBdLnNpemUgPD0gcGFyYW0pXHJcbiAgICAgIH0sICdMYSB0YWlsbGUgZHUgZmljaGllciBkb2l0IMOqdHJlIGluZsOpcmlldXJlIMOgIHswfScpO1xyXG5cclxuICAgICAgXHJcbiAgICAgIGlmICgkKCcjZm9ybS1uZXdzbGV0dGVyJykubGVuZ3RoKSB7XHJcbiAgICAgICAgJCgnI2Zvcm0tbmV3c2xldHRlcicpLnZhbGlkYXRlKHtcclxuICAgICAgICAgIHJ1bGVzOiB7XHJcbiAgICAgICAgICAgIFwiZW1haWxcIjoge1xyXG4gICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICdjdXN0b21lbWFpbCc6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjaGVjay1uZXdzbGV0dGVyLWZvcm1cIjogJ3JlcXVpcmVkJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGhpZ2hsaWdodDogZnVuY3Rpb24oZWxlbWVudCwgZXJyb3JDbGFzcywgdmFsaWRDbGFzcykge1xyXG4gICAgICAgICAgICAkKGVsZW1lbnQpLnBhcmVudHMoJy5mb3JtLWdyb3VwJykuYWRkQ2xhc3MoZXJyb3JDbGFzcykucmVtb3ZlQ2xhc3ModmFsaWRDbGFzcyk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdW5oaWdobGlnaHQ6IGZ1bmN0aW9uKGVsZW1lbnQsIGVycm9yQ2xhc3MsIHZhbGlkQ2xhc3MpIHtcclxuICAgICAgICAgICAgJChlbGVtZW50KS5wYXJlbnRzKCcuZm9ybS1ncm91cCcpLnJlbW92ZUNsYXNzKGVycm9yQ2xhc3MpLmFkZENsYXNzKHZhbGlkQ2xhc3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG5cclxuICAgICAgaWYgKCQoJyNjb250YWN0LWZvcm0nKS5sZW5ndGgpIHtcclxuICAgICAgICAkKCcjY29udGFjdC1mb3JtJykudmFsaWRhdGUoe1xyXG4gICAgICAgICAgcnVsZXM6IHtcclxuICAgICAgICAgICAgXCJub21cIjogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICBcIm1haWxcIjoge1xyXG4gICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICdjdXN0b21lbWFpbCc6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgXCJjaGVja0NvbnRhY3RGb3JtXCI6ICdyZXF1aXJlZCdcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBoaWdobGlnaHQ6IGZ1bmN0aW9uKGVsZW1lbnQsIGVycm9yQ2xhc3MsIHZhbGlkQ2xhc3MpIHtcclxuICAgICAgICAgICAgJChlbGVtZW50KS5wYXJlbnRzKCcuZm9ybS1ncm91cCcpLmFkZENsYXNzKGVycm9yQ2xhc3MpLnJlbW92ZUNsYXNzKHZhbGlkQ2xhc3MpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHVuaGlnaGxpZ2h0OiBmdW5jdGlvbihlbGVtZW50LCBlcnJvckNsYXNzLCB2YWxpZENsYXNzKSB7XHJcbiAgICAgICAgICAgICQoZWxlbWVudCkucGFyZW50cygnLmZvcm0tZ3JvdXAnKS5yZW1vdmVDbGFzcyhlcnJvckNsYXNzKS5hZGRDbGFzcyh2YWxpZENsYXNzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCQoJyNjb250YWN0LWZpeGVkLWZvcm0nKS5sZW5ndGgpIHtcclxuICAgICAgICAkKCcjY29udGFjdC1maXhlZC1mb3JtJykudmFsaWRhdGUoe1xyXG4gICAgICAgICAgcnVsZXM6IHtcclxuICAgICAgICAgICAgXCJub21cIjogXCJyZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICBcIm1haWxcIjoge1xyXG4gICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICdjdXN0b21lbWFpbCc6IHRydWVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlXCI6IFwicmVxdWlyZWRcIixcclxuICAgICAgICAgICAgXCJjaGVja0NvbnRhY3RGaXhlZEZvcm1cIjogJ3JlcXVpcmVkJ1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGhpZ2hsaWdodDogZnVuY3Rpb24oZWxlbWVudCwgZXJyb3JDbGFzcywgdmFsaWRDbGFzcykge1xyXG4gICAgICAgICAgICAkKGVsZW1lbnQpLnBhcmVudHMoJy5mb3JtLWdyb3VwJykuYWRkQ2xhc3MoZXJyb3JDbGFzcykucmVtb3ZlQ2xhc3ModmFsaWRDbGFzcyk7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdW5oaWdobGlnaHQ6IGZ1bmN0aW9uKGVsZW1lbnQsIGVycm9yQ2xhc3MsIHZhbGlkQ2xhc3MpIHtcclxuICAgICAgICAgICAgJChlbGVtZW50KS5wYXJlbnRzKCcuZm9ybS1ncm91cCcpLnJlbW92ZUNsYXNzKGVycm9yQ2xhc3MpLmFkZENsYXNzKHZhbGlkQ2xhc3MpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgYXBwLmluaXQoKTtcclxuXHJcblxyXG59KGpRdWVyeSkpOyJdLCJmaWxlIjoianF1ZXJ5LnNjcmlwdHMuanMifQ==
