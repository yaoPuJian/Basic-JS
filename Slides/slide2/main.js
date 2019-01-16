let $buttons = $('#buttonWrapper > button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0

makeFakeSlides()
init()
bindEvents()

$(next).on('click', function() {
	goToSlides(current + 1)
})
$(previous).on('click', function() {
	goToSlides(current -1)
})

let timer = setInterval(function() {
	goToSlides(current + 1)}, 2000)

$('.container').on('mouseenter', function(){
	window.clearInterval(timer)
}).on('mouseleave', function(){
	timer = setInterval(function() {
	goToSlides(current + 1)}, 2000)
})

function init(){
	$slides.css({transform: 'translateX(-400px)'})
}

function makeFakeSlides(){
	let $firstCopy = $images.eq(0).clone(true)
	let $lastCopy = $images.eq($images.length - 1).clone(true)

	$slides.append($firstCopy)
	$slides.prepend($lastCopy)
}

function bindEvents() {
	$('#buttonWrapper').on('click', 'button', function(e){
		let $button = $(e.currentTarget)
		let index = $button.index()
		goToSlides(index)
	})
}

function goToSlides(index){
	if(index > $buttons.length - 1) {
		index = 0
	}else if(index < 0) {
		index = $buttons.length - 1
	}
	console.log('current', 'index')
	console.log(current, index)
	if(current === $buttons.length - 1 && index === 0){
		//最后一张到第一张
		$slides.css({transform: `translateX(${-($buttons.length + 1) * 400}px)`}).one(
			'transitionend', function(){
				$slides.hide().offset()
				$slides.css({transform: `translateX(${-(index + 1) * 400}px)`}).show()
			})

	}else if(index === $buttons.length - 1 && current === 0){
		//第一张到最后一张
		$slides.css({transform: 'translateX(0px)'}).one(
			'transitionend', function(){
				$slides.hide().offset()
				$slides.css({transform: `translateX(${-(index + 1) * 400}px)`}).show()
			})
	}else{
		$slides.css({transform:`translateX(${-(index + 1) * 400}px)`})
	}
	current = index	
}


// 	$buttons.eq(0).on('click', function(){
// 		if(current == 2){
// 			console.log('说明你是从最后一张到第一张')
// 			$slides.css({transform: 'translateX(-1600px)'}).one(
// 				'transitionend', function(){
// 					$slides.hide().offset()
// 					$slides.css({transform: 'translateX(-400px)'}).show()
// 					current = 0
// 				})
// 		}else{
// 			$slides.css({transform: 'translateX(-400px)'})
// 			current = 0
// 		}
// 	})
// 	$buttons.eq(1).on('click', function(){
// 		console.log(current)
// 		$slides.css({transform: 'translateX(-800px)'})
// 		current = 1
// 	})
// 	$buttons.eq(2).on('click', function(){
// 		if(current == 0) {
// 			console.log('说明你是从第一张到最后一张')
// 			$slides.css({transform: 'translateX(0px)'}).one(
// 				'transitionend', function(){
// 					$slides.hide().offset()
// 					$slides.css({transform: 'translateX(-1200px)'}).show()
// 					current = 2
// 				})
// 		}else{
// 			$slides.css({transform: 'translateX(-1200px)'})
// 			current = 2
// 		}
// 	})
// }

