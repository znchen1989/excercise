var drag1 = document.getElementById('drag1')
var drop1 = document.getElementById('drop1')
var tagW = drag1.offsetWidth / 2
var tagH = drag1.offsetHeight / 2
console.log('-------issue111111')
drag1.addEventListener('mousedown', function mouseDownFn(e) {
  var startX = e.clientX
  var startY = e.clientY
  var disX = startX - drag1.offsetLeft
  var disY = startY - drag1.offsetTop
  var isCollide = false
  var dropValid = false
  var moveFn = function(event) {
    event.preventDefault()
    var currentX = event.clientX - disX
    var currentY = event.clientY - disY
    drag1.style.left = currentX + 'px'
    drag1.style.top = currentY + 'px'
    drag1.style.cursor = 'move'

    var x1 = drag1.offsetLeft
    var y1 = drag1.offsetTop
    var dragW = drag1.offsetWidth
    var dragH = drag1.offsetHeight

    var x2 = drop1.offsetLeft
    var y2 = drop1.offsetTop
    var dropW = drop1.offsetWidth
    var dropH = drop1.offsetHeight
    isCollide = !(x1 > x2 + dropW || y1 > y2 + dropH || x2 > x1 + dragW || y2 > y1 + dragH)
    if (isCollide) {
      drop1.style.backgroundColor = 'yellow'
      dropValid = !(x1 > x2 + dropW - tagW || y1 > y2 + dropH - tagH || x2 > x1 + dragW - tagW || y2 > y1 + dragH - tagH)
      console.log('-------dropValid', dropValid)
    } else {
      dropValid = false
      drop1.style.backgroundColor = 'blue'
    }
  }
  document.addEventListener('mousemove', moveFn)
  var upFn = function() {
    drag1.style.cursor = 'default'
    if (dropValid) {
      drag1.parentNode.removeChild(drag1)
      drop1.appendChild(drag1)
      drag1.style.position = 'static'
    }
    dropValid = false
    document.removeEventListener('mousemove', moveFn)
    document.removeEventListener('mouseup', upFn)
    // drag1.removeEventListener('mousedown', mouseDownFn)
  }
  document.addEventListener('mouseup', upFn)
})
