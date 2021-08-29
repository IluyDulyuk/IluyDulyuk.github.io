'use strict'

window.addEventListener('DOMContentLoaded', () => {

	// Header

	if (+document.documentElement.clientWidth > 550) {
		const header = document.querySelector('.header__wrapper');

		const changeHeaderHeight = (px) => {
			header.style.height = `${px}px`;
		}

		window.addEventListener('scroll', () => {
			if(window.pageYOffset > 0) {
				changeHeaderHeight(50);
			} else {
				changeHeaderHeight(114);
			}
		})
	}

	// Изменение кнопки

	const buyBtns = document.querySelectorAll('.buy-btn');

	buyBtns.forEach(item => {
		item.addEventListener('click', () => {
			item.textContent = 'В корзине';
		})
	})

	// Маска

	var phoneSelector = document.querySelector('.phone-input');

	var im = new Inputmask("+7-(999)-999-99-99");
	im.mask(phoneSelector);

	// Проверка полей

	const formBlocks = document.querySelectorAll('.details__forma'),
		  btn = document.querySelector('.outcome__order'),
		  btn2 = document.querySelector('.next'),
		  spinner = document.querySelector('.spinner');
	
	const item1 = document.querySelector('.item__1'),
		  item2 = document.querySelector('.item__2');

	console.log(item1)


	if(+document.documentElement.clientWidth <= 768) {
		btn2.addEventListener('click', () => {
			let countCheck = 0;
		formBlocks.forEach(item => {
			const input = item.querySelector('input'),
				  span = item.querySelector('span');

			if(!input.value) {
				span.classList.remove('basket__no-active')
				span.classList.add('basket__active')
			} else {
				span.classList.add('basket__no-active')
				span.classList.remove('basket__active')
				countCheck = +countCheck + 1;
			}
		})
		console.log(countCheck)
		if(countCheck == 9) {
			item1.classList.add('basket__no-active')
			item2.classList.remove('basket__no-active')
		} else {
			
		}
		})
	} else {
		btn.addEventListener('click', () => {
			let countCheck = 0;
			formBlocks.forEach(item => {
				const input = item.querySelector('input'),
					  span = item.querySelector('span');
	
				if(!input.value) {
					span.classList.remove('basket__no-active')
					span.classList.add('basket__active')
				} else {
					span.classList.add('basket__no-active')
					span.classList.remove('basket__active')
					countCheck = +countCheck + 1;
				}
			})
			console.log(countCheck)
			if(countCheck == 9) {
				const p = btn.querySelector('p');
				p.textContent = 'Оформляем заказ';
				spinner.classList.add('active')
				setTimeout(() => {
					const check3 = document.getElementById('outcomeRadioId1'),
							check4 = document.getElementById('outcomeRadioId2'),
						  check5 = document.getElementById('paymentRadioId1'),
						  total2 = document.getElementById('outcome__alltotalId');
					if(check3.checked && check5.checked) {
						p.textContent = `Заказ оформлен, оплатить 850₽`
						spinner.classList.remove('active')
					} else if(check4.checked && check5.checked) {
						p.textContent = `Заказ оформлен, оплатить 890₽` 
						spinner.classList.remove('active')
					} else {
						p.textContent = `Заказ оформлен, оплатить ${total2.textContent}` 
						spinner.classList.remove('active')
					}
				}, 5000);
			} else {
				
			}
		})
	}


})

// Сумма 

const check1 = document.getElementById('deliveryRadioId1'),
	  check2 = document.getElementById('deliveryRadioId2'),
	  check3 = document.getElementById('outcomeRadioId1'),
	  check4 = document.getElementById('outcomeRadioId2'),
	  subtotal = document.querySelector('.checkout__subtotal-namber');
let   total = document.getElementById('checkout__alltotalId'),
	  total2 = document.getElementById('outcome__alltotalId');

check1.addEventListener('click', () => {
	const subtotalNumber = subtotal.textContent.split('');
	let subtotalNoR = subtotalNumber.splice(0, +subtotalNumber.length - 1)
	let newTotal = subtotalNoR.join('')
	total.innerHTML = +newTotal + 850 + `&#8381`;
})
check2.addEventListener('click', () => {
	const subtotalNumber = subtotal.textContent.split('');
	let subtotalNoR = subtotalNumber.splice(0, +subtotalNumber.length - 1)
	let newTotal = subtotalNoR.join('')
	total.innerHTML = +newTotal + 890 + `&#8381`;
})
check3.addEventListener('click', () => {
	const subtotalNumber = subtotal.textContent.split('');
	let subtotalNoR = subtotalNumber.splice(0, +subtotalNumber.length - 1)
	let newTotal = subtotalNoR.join('')
	total2.innerHTML = +newTotal + 850 + `&#8381`;
})
check4.addEventListener('click', () => {
	const subtotalNumber = subtotal.textContent.split('');
	let subtotalNoR = subtotalNumber.splice(0, +subtotalNumber.length - 1)
	let newTotal = subtotalNoR.join('')
	total2.innerHTML = +newTotal + 890 + `&#8381`;
})

// Письмо

// const btnBuy = document.querySelector('.outcome__order')

// btnBuy.addEventListener('click', () => {
// 	const Data = {
// 		name: document.querySelector('.details__name').value,
// 		surname: document.querySelector('.details__surname').value,
// 		phone: document.querySelector('.details__fon').value,
// 		mail: document.querySelector('.details__email').value,
// 		country: document.querySelector('.details__country').value,
// 		city: document.querySelector('.details__locality').value,
// 		place: document.querySelector('.details__region').value,
// 		address: document.querySelector('.details__address').value,
// 		index: document.querySelector('.details__index').value,
// 	}

// 	console.log(JSON.stringify(Data))

// 	fetch('../php/mail.php', {
// 		method: 'POST',
// 		body: JSON.stringify(Data)
// 	})
// })

// Сумма в header

const BuyBtn1 = document.querySelector('.btn-1'),
	  BuyBtn2 = document.querySelector('.btn-2'),
	  BuyBtn3 = document.querySelector('.btn-3'),
	  BuyBtn4 = document.querySelector('.btn-4'),
	  BuyBtn5 = document.querySelector('.btn-5'),
	  BuyBtn6 = document.querySelector('.btn-6'),
	  BuyBtn7 = document.querySelector('.btn-7'),
	  sumSpan = document.querySelector('.account__elem2');


const calcSum = (price, btn) => {
	btn.addEventListener('click', () => {
		sumSpan.innerHTML = `${+sumSpan.textContent + +price}`;
	})
}

calcSum(49990, BuyBtn1);
calcSum(40990, BuyBtn2);
calcSum(5480, BuyBtn3);
calcSum(1990, BuyBtn4);
calcSum(2499, BuyBtn5);
calcSum(4790, BuyBtn6);
calcSum(8490, BuyBtn7);