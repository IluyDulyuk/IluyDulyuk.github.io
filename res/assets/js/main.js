window.addEventListener('DOMContentLoaded', () => {

    const media = window.matchMedia('(max-width: 1397px)');

    const imageSlider = document.querySelector('.image-slider .swiper');

    if(imageSlider) {

        const imageSwiper = new Swiper(imageSlider, {
            slidesPerView: 'auto',
            spaceBetween: 36,
        });
    }

    const productsSliders = document.querySelectorAll('.products-slider .swiper');

    if(productsSliders.length > 0) {

        productsSliders.forEach(item => {

            let productsSlider = item;
            let id = productsSlider.getAttribute('data-id');

            let productsSwiper = new Swiper(productsSlider, {
                slidesPerView: 'auto',
                spaceBetween: 36,
                navigation: {
                    prevEl: `.products-slider__arrow--prev.${id}`,
                    nextEl: `.products-slider__arrow--next.${id}`,
                }
            });

            if(media.matches) {
                productsSwiper.disable();
            } else {
                productsSwiper.enable();
            }

            window.addEventListener('resize', () => {
                if(media.matches) {
                    productsSwiper.disable();
                } else {
                    productsSwiper.enable();
                }
            })

        })

    }

    const collSlider = document.querySelector('.coll-slider .swiper');

    if(collSlider) {

        const collSwiper = new Swiper(collSlider, {
            slidesPerView: 1,
            spaceBetween: 24,
            navigation: {
                prevEl: `.coll-slider__arrow--prev`,
                nextEl: `.coll-slider__arrow--next`,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },

            breakpoints: {
                1397: {
                    slidesPerView: 2,
                }
            }
        });
    }

})
