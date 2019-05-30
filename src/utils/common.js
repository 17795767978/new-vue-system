import moment from 'moment'
/**
 * COMMON UTILS
 * Author: Vicco Wang
 * Date: 2018.06.25
 */

/**
  *
  * assert(a === b, "yes , they are the same!")
  *
  * asser(turlyFunc(), "test a function")
  *
  */
export function assert (expression, message) {
  if (expression) {
    return message
  }
}

export function getGreetingTime () {
  const now = parseInt(moment().format('HH'))
  let dayTime = ''
  if (now < 12) dayTime = '早上'
  else if (now >= 12 && now < 18) dayTime = '下午'
  else if (now >= 18 && now <= 23) dayTime = '晚上'
  else dayTime = ''
  return dayTime
}
