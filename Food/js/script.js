'use strict';


        import  calc from './modules/calculate';
        import  cards from './modules/cards';
        import  forms from './modules/forms';
        import  modal from './modules/modal';
        import  slider from'./modules/slider';
        import  tabs from './modules/tabs';
        import  timer from './modules/timer';
        
window.addEventListener('DOMContentLoaded', () => {

    const dedline = '2023-01-01';
    

    calc();
    cards();
    forms();
    modal('.modal', '[data-modal]');
    slider({
        content: '.offer__slider',
        slide: '.offer__slide',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        inner: '.offer__slider-inner'
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', dedline);
})