export default class ZnTouch {
  constructor(options) {
    const { el } = options
    this.el = el || document
    this.startPoint = null
    this.currentPoint = null
    this.preProint = null
    this.distance = {}
    this.events = {}
    this.uid = 0
    this.documentHandler = []
    this.init()
  }
  fnId(fn) {
    return (fn.__id = fn.__id || this.uid++)
  }
  init() {
    console.log('------this.el', this.el)
    this.el.addEventListener('touchstart', this.onTouchStart.bind(this))
  }
  trigger(type, ev) {
    const eventHandlers = this.events[type] || []
    eventHandlers.forEach(fn => {
      if (fn) {
        fn.call(this.el, ev)
      }
    })
  }
  on(type, fn) {
    if (!this.events[type]) {
      this.events[type] = []
    }
    this.events[type].push(fn)
  }
  onTouchStart(ev) {
    this.distance.startTime = Date.now()
    this.prevPoint = { ...this.currentPoint }
    this.currentPoint = this.startPoint = ev.touches[0]
    if (this.documentHandler.indexOf(this.fnId(this.onTouchMove)) === -1) {
      document.addEventListener('touchmove', this.onTouchMove.bind(this))
      this.documentHandler.push(this.fnId(this.onTouchMove))
    }
    if (this.documentHandler.indexOf(this.fnId(this.onTouchEnd)) === -1) {
      document.addEventListener('touchend', this.onTouchEnd.bind(this))
      this.documentHandler.push(this.fnId(this.onTouchEnd))
    }
  }
  onTouchEnd(ev) {
    this.currentPoint = ev.touches[0]
    const intervalTime = Date.now() - this.distance.startTime
    const { x, y } = this.distance
    const h = (intervalTime < 250 && Math.abs(x) > 20) || Math.abs(x) > 80
    const v = (intervalTime < 250 && Math.abs(y) > 20) || Math.abs(y) > 80
    const isHorizontal = Math.abs(x) / Math.abs(y) > 1
    const isLeft = x < 0
    const isUp = y < 0
    console.log('------intervalTime', intervalTime)
    if (intervalTime < 250 && (isNaN(parseInt(x)) || (Math.abs(x) < 10 && Math.abs(y) < 10))) {
      if (ev.target === this.el) {
        this.trigger('tap', ev)
      }
    }
    if (intervalTime > 250 && (isNaN(parseInt(x)) || (Math.abs(x) < 10 && Math.abs(y) < 10))) {
      this.trigger('longtap', ev)
    }
    if (isHorizontal && h) {
      if (ev.target === this.el) {
        this.trigger(isLeft ? 'swipeLeft' : 'swipeRight', ev)
      }
    }
    if (!isHorizontal && v) {
      if (ev.target === this.el) {
        this.trigger(isUp ? 'swipeUp' : 'swipeDown', ev)
      }
    }
    document.removeEventListener('touchmove', onTouchMove)
    document.removeEventListener('touchmove', onTouchEnd)
    console.log('-----remove done')
  }
  onTouchMove(ev) {
    this.prevPoint = { ...this.currentPoint }
    this.currentPoint = ev.touches[0]
    this.distance.x = this.currentPoint.clientX - this.startPoint.clientX
    this.distance.y = this.currentPoint.clientY - this.startPoint.clientY
  }
}
