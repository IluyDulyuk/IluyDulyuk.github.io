function click_basket() {
	const basket = {
		wrapper: document.querySelector('.wrapper'),
		work: document.querySelectorAll('.work'),
		work_basket: document.querySelector('.basket__container-product'),
		work_order: document.querySelector('.basket__container-order'),
		basket: document.querySelector('.container__basket'),
		basket_form: document.querySelector('.basket'),
		item1: document.getElementById('item1-hide-show-id'),
		item2: document.getElementById('item2-hide-show-id'),
		modal: document.querySelector('.modal-form'),
		button: {
			basket: document.querySelectorAll('.account__elem1'),
			checkout: document.querySelector('.checkout__order'),
			outcome: document.querySelector('.outcome__order'),
			hide_show: document.getElementById('btn-hide-show'),
			modal_exit: document.querySelector('.modal-form__img'),
		},
		active() {
			this.wrapper.style.justifyContent = 'flex-start'
			this.basket.classList.toggle('container__no-active')
			this.work_order.classList.add('basket__no-active')
			this.work_basket.classList.remove('basket__no-active')
			this.modal.classList.add('basket__no-active')
			this.basket_form.classList.remove('basket__no-active')
			this.work.forEach(el => {
				el.classList.toggle('container__no-active')
			})
			window.scrollTo(0, 0)
		},
		active_checkout() {
			this.work_basket.classList.add('basket__no-active')
			this.work_order.classList.remove('basket__no-active')
			this.hide_show(1)
		},
		active_modal() {
			this.wrapper.style.justifyContent = 'space-between'
			this.modal.classList.remove('basket__no-active')
			if (window.innerWidth > 768) {
				this.basket_form.classList.remove('basket__no-active')
			} else {
				this.basket_form.classList.add('basket__no-active')
			}
			window.scrollTo(0, 0)
		},
		hide_show(index) {
			switch (index) {
				// case 0:
				// 	this.item1.classList.add('basket__no-active')
				// 	this.button.hide_show.classList.add('basket__no-active')
				// 	this.item2.classList.remove('basket__no-active')
				// 	break
				case 1:
					if (window.innerWidth > 768) {
						this.item1.classList.remove('basket__no-active')
						this.button.hide_show.classList.add('basket__no-active')
						this.item2.classList.remove('basket__no-active')
					} else {
						this.item1.classList.remove('basket__no-active')
						this.button.hide_show.classList.remove('basket__no-active')
						this.item2.classList.add('basket__no-active')
					}
					break
				default:
					break
			}
			window.scrollTo(0, 0)
		},
		active_outcome() {
			this.active_modal()
		},
	}
	class render_basket {
		render() {
			basket.button.basket.forEach(el => {
				el.addEventListener('click', function () {
					basket.active()
				})
			})
			basket.button.checkout.addEventListener('click', function () {
				basket.active_checkout()
			})
			basket.button.hide_show.addEventListener('click', function () {
				basket.hide_show(0)
			})
			basket.button.outcome.addEventListener('click', function () {
				basket.active_outcome()
				// products.renew()
			})
			basket.button.modal_exit.addEventListener('click', function () {
				basket.active()
			})
		}
	}
	const page_basket = new render_basket()
	page_basket.render()
}
function click_PS5() {
	const ps5 = {
		img: {
			0: 'img/container/playstation_5_dualsense1.png',
			1: 'img/container/playstation-5-digital-edition.png',
		},
		ps5__price: {
			0: document.querySelector('.ps5__price-item'),
			1: '49 990p-',
			2: '40 990p-',
		},
		ps5_img: document.querySelector('.ps5'),
		text: {
			all: document.querySelectorAll('.ps5__text'),
			text1: document.querySelectorAll('.ps5__text1'),
			text2: document.querySelectorAll('.ps5__text2'),
		},
		button: {
			all: document.querySelectorAll('.ps5__nav-el'),
			left: document.querySelector('.ps5__nav-left'),
			right: document.querySelector('.ps5__nav-right'),
			ps5__btn1: document.querySelector('.ps5__btn1-active'),
			ps5__btn2: document.querySelector('.ps5__btn2-active'),
		},
		active(elem1, elem2) {
			this.button.all.forEach(elem => {
				elem != elem1
					? elem.classList.remove('ps5__nav-active')
					: elem.classList.add('ps5__nav-active')
			})
			for (let key = 0; key < this.text.all.length; key++) {
				this.text.all[key].classList.add('ps5__text-active')
				if (key >= this.text.all.length - 1) {
					elem2.forEach(elem => {
						elem.classList.remove('ps5__text-active')
					})
				}
			}
		},
	}
	class render_PS5 {
		render() {
			ps5.button.left.addEventListener('click', function () {
				ps5.active(ps5.button.left, ps5.text.text1)
				ps5.ps5_img.style.backgroundImage = 'url(' + ps5.img[0] + ')'
				ps5.button.ps5__btn1.classList.toggle('container__no-active')
				ps5.button.ps5__btn2.classList.toggle('container__no-active')
				ps5.ps5__price[0].innerHTML = ps5.ps5__price[1]
			})
			ps5.button.right.addEventListener('click', function () {
				ps5.active(ps5.button.right, ps5.text.text2)
				ps5.ps5_img.style.backgroundImage = 'url(' + ps5.img[1] + ')'
				ps5.button.ps5__btn1.classList.toggle('container__no-active')
				ps5.button.ps5__btn2.classList.toggle('container__no-active')
				ps5.ps5__price[0].innerHTML = ps5.ps5__price[2]
			})
		}
	}
	const page_PS5 = new render_PS5()
	page_PS5.render()
}
function buy() {
	class render_products {
		render() {
			products.product.forEach(elem => {
				elem.button.forEach(el => {
					el.addEventListener('click', function () {
						let ok = true
						products.ul_del.querySelectorAll('li').forEach(el => {
							if (el.id === `ul_del${elem.id}`) {
								let number = document.getElementById(
									'p_number' + elem.id
								).innerHTML
								elem.number = parseInt(number) + 1
								document.getElementById('p_number' + elem.id).innerHTML =
									elem.number
								ok = false
							}
						})
						if (ok != false) {
							products.pos = parseInt(products.pos) + 1
							elem.number = parseInt(elem.number) + 1
							products.ul_name.innerHTML += `
						<li class='product__li' id='ul_name${elem.id}'><img class='product__img' src='${elem.img}'>
							<p class='product__text product__text-item1'>${elem.name}</p>
						</li>
						`
							products.ul_name_outcome.innerHTML += `
						<li class='outcome__li' id='ul_name_outcome${elem.id}'>							
							<p class='product__text product__text-item1'>${elem.name}</p>
						</li>
						`
							products.ul_number.innerHTML += `
						<li class='product__li' id='ul_number${elem.id}'>
							<div class='product__number-div'>
								<span class='product__minus-pluse' id='product__minus${elem.id}' onclick='products.num(${elem.id},-1)'>-</span>
									<p class='product__text product__text-item1' id='p_number${elem.id}'>${elem.number}</p>
								<span class='product__minus-pluse' id='product__pluse${elem.id}' onclick='products.num(${elem.id},1)'>+</span>
							</div>
						</li>
						`
							products.ul_total.innerHTML += `
						<li class='product__li' id='ul_total${elem.id}'>
							<p class='product__text product__text-item1' id='p_total${elem.id}'>${elem.price}&#8381</p>
						</li>
						`
							products.ul_total_outcome.innerHTML += `
						<li class='outcome__li' id='ul_total_outcome${elem.id}'>
							<p class='product__text product__text-item1' id='p_total_outcome${elem.id}'>${elem.price}&#8381</p>
						</li>
						`
							products.ul_del.innerHTML += `
						<li class='product__li' id='ul_del${elem.id}' onclick='products.del(${elem.id})'>
							<span class='product__del-el'></span>
						</li>
						`
						}
						elem.price = parseFloat(elem.price) * elem.number
						// products.posic.innerHTML = products.pos
						products.num()
					})
				})
			})
		}
	}
	const page_products = new render_products()
	page_products.render()
}
const products = {
	ul_name: document.querySelector('.product__ul-name'),
	ul_name_outcome: document.querySelector('.outcome__ul-name'),
	ul_number: document.querySelector('.product__ul-number'),
	ul_total: document.querySelector('.product__ul-total'),
	ul_total_outcome: document.querySelector('.outcome__ul-total'),
	ul_del: document.querySelector('.product__ul-del'),
	product: [
		{
			id: 1,
			button: document.querySelectorAll('.btn1'),
			name: 'PlayStation 5',
			img: 'img/container/playstation_5_dualsense1.png',
			number: 0,
			price: 49990,
		},
		{
			id: 2,
			button: document.querySelectorAll('.btn2'),
			name: 'PlayStation 5 Digital Edition',
			img: 'img/container/playstation-5-digital-edition.png',
			number: 0,
			price: 40990,
		},
		{
			id: 3,
			button: document.querySelectorAll('.btn3'),
			name: 'Беспроводной контроллер DualSense&trade;',
			img: 'img/container/dualsense_big.png',
			number: 0,
			price: 5480,
		},
		{
			id: 4,
			button: document.querySelectorAll('.btn4'),
			name: 'ПДУ мультимедиа для PS5&trade;',
			img: 'img/container/dualsense_011-big.png',
			number: 0,
			price: 1990,
		},
		{
			id: 5,
			button: document.querySelectorAll('.btn5'),
			name: 'Зарядная станция DualSense&trade;',
			img: 'img/container/zaryad_big.png',
			number: 0,
			price: 2499,
		},
		{
			id: 6,
			button: document.querySelectorAll('.btn6'),
			name: 'HD камера',
			img: 'img/container/hd_big.png',
			number: 0,
			price: 4790,
		},
		{
			id: 7,
			button: document.querySelectorAll('.btn7'),
			name: 'Беспроводная гарнитура PULSE 3D&trade;',
			img: 'img/container/pulse_big.png',
			number: 0,
			price: 8490,
		},
	],
	del(id, click) {
		this.product.forEach(element => {
			if (id === element.id) {
				let el = document.getElementById('ul_del' + id)
				click != false
					? el.addEventListener('click', function () {
							products.del_render(element, id)
					  })
					: products.del_render(element, id)
			}
		})
	},
	del_render(element, id) {
		products.pos = products.pos - 1
		if (products.pos < 0) products.pos = 0
		products.posic.innerHTML = products.pos
		element.number = 0
		let arr = [
			'ul_name' + id,
			'ul_number' + id,
			'ul_total' + id,
			'ul_del' + id,
			'ul_name_outcome' + id,
			'ul_total_outcome' + id,
		]
		arr.forEach(elem => {
			let el = document.getElementById(elem)
			if (el) el.remove()
		})
		products.num()
	},
	num(id, counter) {
		let total = 0
		let summa = 0
		let key = 0
		this.summa = summa
		this.kol = 0
		this.product.forEach(element => {
			let elem
			key++
			if (id === element.id) {
				let el = document.getElementById('p_number' + id)
				element.number = parseInt(element.number) + parseInt(counter)
				if (element.number < 0) element.number = 0
				el.innerHTML = element.number
			}
			if (element) {
				total = parseInt(element.number) * parseFloat(element.price)
				elem = document.getElementById('p_total' + key)
				if (elem) elem.innerHTML = total + `&#8381`
				summa = summa + parseFloat(element.price) * parseInt(element.number)
			}
			this.kol = parseInt(this.kol) + parseInt(element.number)
			this.summa = summa
		})
		elem = document.querySelectorAll('.checkout__subtotal-namber')
		elem.forEach(e => {
			e.innerHTML = this.summa + `&#8381`
		})
		elem = this.checkout__price_el
		elem.forEach(e => {
			e.innerHTML = this.checkout__pricу + `&#8381`
		})
		this.kolich.innerHTML = this.kol
		this.radio()
	},
	kolich: document.querySelector('.account__kol'),
	// posic: document.querySelector('.account__elem2'),
	renew_btn: document.querySelector('.product__btn-renew'),
	summa: 0,
	kol: 0,
	pos: 0,
	checkout__radio: document.querySelectorAll('.checkout__radio-input'),
	checkout__price_el: document.querySelectorAll('.checkout__price'),
	checkout__pricу: 890,
	radio_button: {
		el1: document.getElementById('deliveryRadioId1'),
		el2: document.getElementById('deliveryRadioId2'),
		el3: document.getElementById('outcomeRadioId1'),
		el4: document.getElementById('outcomeRadioId2'),
	},
	radio() {
		this.radio_button.el1.checked
			? (document.getElementById('checkout__alltotalId').innerHTML =
					this.summa + `&#8381`)
			: (document.getElementById('checkout__alltotalId').innerHTML =
					this.summa + 890 + `&#8381`)
		this.radio_button.el2.checked
			? (document.getElementById('checkout__alltotalId').innerHTML =
				this.summa + `&#8381`)
			: (document.getElementById('checkout__alltotalId').innerHTML =
				this.summa + 850 + `&#8381`)
		this.radio_button.el3.checked
			? (document.getElementById('outcome__alltotalId').innerHTML =
					this.summa + `&#8381`)
			: (document.getElementById('outcome__alltotalId').innerHTML =
					this.summa + this.checkout__pricу + `&#8381`)
	},
	renew() {
		this.product.forEach(e => {
			this.del(e.id, false)
		})
	},
}
/*function hideHeader() {
	const scrollConst = {
		header_wrapper: document.querySelector('.header__wrapper'),
		padding_wrapper: document.querySelector('.wrapper'),
		lastScroll: 0,
		defaultOffset: 0,
	}
	class render_scroll {
		render() {
			let scrollPosition = () =>
				window.pageYOffset || document.documentElement.scrollTop
			window.addEventListener('scroll', () => {
				if (
					scrollPosition() > scrollConst.lastScroll &&
					scrollPosition() > scrollConst.defaultOffset
				) {
					scrollConst.header_wrapper.style.height = '50px'
					scrollConst.padding_wrapper.style.paddingTop = '50px'
				} else {
					scrollConst.header_wrapper.style.height = '114px'
					scrollConst.padding_wrapper.style.paddingTop = '114px'
				}
			})
		}
	}
	const page_scroll = new render_scroll()
	page_scroll.render()
}
*/

console.log('1')
