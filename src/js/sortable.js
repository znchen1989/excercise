var listEle = document.getElementById('list')
function init() {
  var listArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
  var fragMent = document.createDocumentFragment()
  listArr.forEach(item => {
    var li = document.createElement('li')
    li.innerHTML = item
    fragMent.appendChild(li)
  })
  listEle.appendChild(fragMent)
}
init()
function getInsertBeforTarget(targetH, bottomY) {
  var liList = [].slice.call(listEle.children)
  var purList = liList.filter(item => item.style.position !== 'absolute')
  var result = purList.filter(item => {
    var itemTop = item.offsetTop
    var itemHeight = item.offsetHeight
    // console.log('-------it', itemTop)
    // console.log('-------bottomY', bottomY)
    // console.log('-------itemTop + itemHeight', itemTop + itemHeight)
    return itemTop < bottomY && itemTop + itemHeight > bottomY
  })
  return (result && result[0]) || purList[purList.length - 1]
}
listEle.addEventListener('mousedown', function(e) {
  var target = e.target
  var insertTarget = null
  var originPosition = target.style.position
  if (target.tagName === 'LI') {
    var targetH = target.offsetHeight
    // var disX = e.clientX - target.offsetLeft
    var disY = e.clientY - target.offsetTop
    target.style.cursor = 'move'
    // target.style.left = target.offsetLeft + 'px';
    // target.style.top = target.offsetTop + 'px';

    document.addEventListener('mousemove', moveFn)
    function moveFn(event) {
      var listH = listEle.clientHeight
      target.style.position = 'absolute'
      target.style.opacity = 0.6
      // var currentX = event.clientX - disX
      var currentY = event.clientY - disY
      // console.log('-----currentY', currentY)
      if (currentY > -targetH && currentY < listH) {
        target.style.left = 0 + 'px'
        target.style.top = currentY + 'px'
        var bottomYTop = target.offsetTop
        var bottomY = target.offsetTop + targetH
        insertTarget = getInsertBeforTarget(targetH, bottomY)
      }
    }
    function upFn() {
      if (insertTarget) {
        // console.log('-----insertTarget', insertTarget)
        target.style.position = originPosition
        target.style.opacity = 1
        target.parentNode.insertBefore(target, insertTarget)
        insertTarget = null
      }
      // console.log('-----release')
      document.removeEventListener('mousemove', moveFn)
      document.removeEventListener('mouseup', upFn)
      target.style.cursor = 'default'
    }
    document.addEventListener('mouseup', upFn)
  }
})
