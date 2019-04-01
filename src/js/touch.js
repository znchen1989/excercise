import ZnTouch from './lib/ZnTouch'

const touchTarget = new ZnTouch({ el: document.querySelector('.drag-container') })
touchTarget.on('tap', function() {
  console.log('-------fire tap')
})
touchTarget.on('longtap', function() {
  console.log('-------fire long tap')
})

touchTarget.on('swipeLeft', function() {
  console.log('-------swipeLeft')
})
touchTarget.on('swipeDown', function() {
  console.log('-------swipeDown')
})
