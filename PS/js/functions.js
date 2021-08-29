window.onload = function () {
	let arr = [click_basket(), click_PS5(), buy(), hideHeader()]
	let count = 0
	for (let key in arr) {
		wait(arr[key])
	}
	function wait(arr) {
		try {
			arr
		} catch (e) {
			count++
			if (count < 600) setTimeout(wait, 100)
			else console.log('Ошибка :' + e.message)
		}
	}
}
