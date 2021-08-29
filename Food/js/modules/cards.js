const cards = function () {
    class MenuCard {
        constructor(src, alt, title, descp, price, perent, ...classes) {
            this.src = src,
            this.alt = alt,
            this.title = title,
            this.descp = descp,
            this.price = price,
            this.perent = document.querySelector(perent),
            this.classes = classes,
            this.chengeUAH();
        }

        chengeUAH() {
            this.price = this.price * 27;
        }

        render() {
          const  element = document.createElement('div');
          this.element = 'menu__item';
          if (this.classes.length === 0) {
              element.classList.add(this.element);
          } else {
              this.classes.forEach (classesName => element.classList.add(classesName));
          }

            element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descp}</div></div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            `

            this.perent.append(element);
        }
    }


    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            });
        })
}

export default cards;