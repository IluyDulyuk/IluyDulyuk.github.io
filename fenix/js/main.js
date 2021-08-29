$(document).ready(function(){
    $('.offer-slider-wrapper').slick({
        fade: true,
        autoplay: true,
        prevArrow: $('.offer-prev'),
        nextArrow: $('.offer-next'),
        dots: true,
        responsive: [{
            breakpoint: 1175,
            settings: {
                arrows: false,
            }
        }]
    });
  });


