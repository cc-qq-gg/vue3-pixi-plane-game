import { COOL_DOWN_DELAY } from '../constant';

export function intersectRect(r1, r2) {
  // console.log('r1', r1.x, r1.y, 'r2', r2.x, r2.y)
  return !(
    r1.width + r1.x < r2.x
    || r1.height + r1.y < r2.y
    || r1.x > r2.x + r2.width
    || r1.y > r2.y + r2.height
  )
}
export function throttle(func, delay = COOL_DOWN_DELAY, immediate = true) {
  let timer
  return function (...args) {

    if (timer) return

    if (immediate) {
      func.apply(null, args)
      immediate = false
    } else {
      timer = setTimeout(() => {
        func.apply(null, args)
        timer = null
      }, delay)
    }

  }
}