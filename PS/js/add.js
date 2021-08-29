const add = {
	url: {
		script: ['js/functions.js', 'js/main.js'],
		css: [
			'css/main.css',
			'css/media.css',
			'css/header.css',
			'css/container.css',
			'css/basket.css',
		],
	},
	addScript(url) {
		let script = document.createElement('script')
		script.type = 'text/javascript'
		script.src = url
		document.head.appendChild(script)
	},
	delScript(url) {
		let el = document.querySelector('[src="' + url + '"]')
		if (el) el.parentNode.removeChild(el)
	},
	addCss(url) {
		let style = document.createElement('link')
		style.rel = 'stylesheet'
		style.type = 'text/css'
		style.href = url
		document.head.appendChild(style)
	},
	delCss(url) {
		let el = document.querySelector('[href="' + url + '"]')
		if (el) el.parentNode.removeChild(el)
	},
	create: {
		script() {
			add.url.script.forEach(url => {
				add.addScript(url)
			})
		},
		css() {
			add.url.css.forEach(url => {
				add.addCss(url)
			})
		},
	},
}
add.create.script()
add.create.css()

