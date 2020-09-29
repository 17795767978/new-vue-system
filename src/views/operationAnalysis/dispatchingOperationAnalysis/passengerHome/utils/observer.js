import moment from 'moment'
class Observer {
  constructor () {
    this.timeStart = 6
    this.timeNow = 6
    this.timeEnd = 23
    this.timeDiff = 0
    this.hourArr = []
  }
  initHourArr () {
    const time = moment().format('HH')
    for (let i = 0; i < time - 6 + 1; i++) {
      this.hourArr.push(i + 6)
    }
  }
  changeTimeNow (time) {
    let arr = []
    if (time === this.timeNow) {
      return
    }
    this.timeNow = time
    if (this.timeNow === this.timeStart) {
      return
    }
    if (this.timeEnd < this.timeNow) {
      this.hourArr = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
      return
    }
    this.timeDiff = this.timeNow - this.timeStart
    for (let i = 0; i < this.timeDiff + 1; i++) {
      arr.push(i + this.timeStart)
    }
    this.hourArr = arr
  }
  assemble () {
    let arr = []
    this.hourArr.forEach(item => {
      arr.push({
        isHighLight: false,
        value: item
      })
    })
    arr[0].isHighLight = true
    return arr
  }
  clearTimer () {
    this.timeStart = 6
    this.timeEnd = 23
    this.timeDiff = 0
    this.hourArr = [6]
  }
}

export default Observer
