window.addEventListener('DOMContentLoaded', () => {

    const point = document.querySelector('.point');

    const calcPointOffset = (x, y) => {
        point.style.transform = `translate(${x}px, ${y}px)`;
    }

    window.addEventListener('mousemove', (e) => {
        calcPointOffset(e.pageX, e.pageY);
    })

})