var allButtons = $('#buttons > span');/*allButtons是DOM对象*/

for (let i = 0; i < allButtons.length; i++) {
  $(allButtons[i]).on('click', function(x) {
    var index = $(x.currentTarget).index()
    var distance = index * -200
    $('#images').css({
      transform: 'translate(' + distance + 'px)'
    })
    n = index
    activeButton(allButtons.eq(n));/*allButtons.eq(n)把DOM对象allButtons[n]封装成jQuery对象*/
  })
}

var n = 0;
var size = allButtons.length
// playSlide(n % size)

// var timeId = setTime()

// $('.window').on('mouseenter', function() {
//   window.clearInterval(timeId)
// })

// $('.window').on('mouseleave', function() {
//   timeId = setTime()
// })

// function setTime() {
//   return setInterval(() => {
//     n += 1
//     playSlide(n % size)
//   }, 1000)
// }

function playSlide(index) {
  allButtons.eq(index).trigger('click')
}

function activeButton($button) {
  $button
  .addClass('red')
  .siblings('.red').removeClass('red')
}
