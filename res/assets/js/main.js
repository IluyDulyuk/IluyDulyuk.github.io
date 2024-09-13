window.addEventListener('DOMContentLoaded', () => {

    const media = window.matchMedia('(max-width: 1397px)');

    const imageSliders = document.querySelectorAll('.image-slider .swiper');

    if(imageSliders.length > 0) {

        imageSliders.forEach(item => {

            let imageSlider = item;
            let id = imageSlider.getAttribute('data-id');

            let imageSwiper = new Swiper(imageSlider, {
                slidesPerView: 'auto',
                // centeredSlides: true,
                spaceBetween: 36,
                navigation: {
                    prevEl: `.image-slider__arrow--prev.${id}`,
                    nextEl: `.image-slider__arrow--next.${id}`,
                },
            });

        })

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

    const projectContentSlider = document.querySelector('.project-content__slider .swiper');

    if(projectContentSlider) {

        const projectContentSwiper = new Swiper(projectContentSlider, {
            slidesPerView: 1,
            spaceBetween: 64,
            pagination: {
                el: ".project-content__pagination",
                clickable: true,
            },
            breakpoints: {
                1397: {
                    slidesPerView: 2,
                }
            }
        });
    }


    // header

    const mobileMenu = document.querySelector('.header-mobile');
    const gum = document.querySelector('.header__gum');
    const close = document.querySelector('.header-mobile-close');

    const toggleMobileMenu = () => {
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    gum.addEventListener('click', () => {
        toggleMobileMenu();
    })

    close.addEventListener('click', () => {
        toggleMobileMenu();
    })

    document.addEventListener('keydown', (e) => {
        if(e.key == 'Escape') {
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    })

    // tax

    const taxList = document.querySelectorAll('.tax ul a');

    if(taxList.length > 0) {

        const button = document.querySelector('.tax button');

        if(taxList.length < 6) {
            button.style.display = 'none';
        } else {
            taxList.forEach((item, i) => {
                if(i > 4) {
                    item.classList.add('none');
                }
            })


            button.addEventListener('click', () => {

                taxList.forEach((item, i) => {
                    item.classList.remove('none');
                })

                button.style.display = 'none';
            })
        }

    }


    // selections

    const selections = document.querySelectorAll('.filters__selection');

    if(selections.length > 0) {

        const removeAllActive = () => {
            selections.forEach(item => {

                item.querySelector('ul').classList.remove('active');
            })
        }

        selections.forEach(item => {

            const trigger = item.querySelector('h3');
            const ul = item.querySelector('ul');
            const input = item.querySelector('input');
            const p = item.querySelector('p');
            const span = item.querySelector('span');
            const label = item.querySelector('label');

            trigger.addEventListener('click', () => {

                if(ul.classList.contains('active')) {
                    removeAllActive();
                } else {
                    removeAllActive();
                    ul.classList.add('active')

                    window.addEventListener('click', (e) => {
                        // console.log(e.target)
                        // if(e.target) {
                        //     console.log('click')
                        //     // removeAllActive();
                        // }
                    })
                }
            })
        })
    }

    // filters

    const filters = document.querySelector('.filters__selections');
    const filterTrigger = document.querySelector('.filters__trigger');
    const filterClose = document.querySelector('.filters__close');

    if(filters) {
        const toggleFilters = () => {
            filters.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        }

        filterTrigger.addEventListener('click', () => {
            toggleFilters();
        })

        filterClose.addEventListener('click', () => {
            toggleFilters();
        })

        document.addEventListener('keydown', (e) => {
            if(e.key == 'Escape') {
                filters.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        })
    }

    // product card

    const productCardSlider = document.querySelector('.product-card__gallery .swiper');

    if(productCardSlider) {

        const thumbs = document.querySelector('.product-card__thumbs .swiper');

        const thumbsSwiper = new Swiper(thumbs, {
            slidesPerView: 'auto',
            spaceBetween: 10,
            freeMode: true,
            mousewheel: true,

            breakpoints: {
                1397: {
                    direction: "vertical",
                }
            }
        });

        const productCardSwiper = new Swiper(productCardSlider, {
            slidesPerView: 1,
            thumbs: {
                swiper: thumbsSwiper,
            }
        });
    }

})
