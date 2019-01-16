$(clickMe).on('click', function() {
  if(popover.style.display === 'block'){
    $(popover).hide()
  }else{
    $(popover).show()
  }
  console.log('show')
  setTimeout(function() {
    $(wrapper).on('click', false)
    $(document).one('click', function(){
      $(popover).hide()
    })
  }, 0)
})