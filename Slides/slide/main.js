
let n

function init() {
	n = 0
	$(`.images > img:nth-child(${n+1})`).addClass('current')
		.siblings().addClass('enter')
}

function mod(n) {
	return n % 3 + 1 //n = 1 2 3
}

function makeCurrent($node) {
	return $node.removeClass('enter leave').addClass('current') //不写return会返回undefined
}

function makeLeave($node) {
	return $node.removeClass('enter current').addClass('leave')
}

function makeEnter($node) {
	return $node.removeClass('current leave').addClass('enter')
}

function getImage(n) {
	return $(`.images > img:nth-child(${mod(n)})`) //`ES6模板字符串`
}

init()

setInterval(() => {
	makeLeave(getImage(n)).one('transitionend', (e) => { //one和on的区别是监听动作出现时命令只执行一次，后续再次出现监听的动作时命令不会再次执行
		makeEnter($(e.currentTarget))
		})
	makeCurrent(getImage(n + 1))
	n += 1
}, 2000)
