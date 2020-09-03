import api from '@/plugins/api.js'
import moment from 'moment'

const globalMixin = {
  data: function () {
    return {
      startTime: 0,
      endTime: 0,
      durations: 0
    }
  },
  created () {
    this.startTime = moment().valueOf()
  },
  activated () {
    this.startTime = moment().valueOf()
  },
  deactivated () {
    let name = this.$route.meta.title
    this.endTime = moment().valueOf()
    this.durations = this.endTime - this.startTime
    this._getDurations({
      userId: sessionStorage.getItem('id'),
      accessPageName: name,
      accessDuration: this.durations
    })
  },
  beforeDestroy () {
    let name = this.$route.meta.title
    this.endTime = moment().valueOf()
    this.durations = this.endTime - this.startTime
    this._getDurations({
      userId: sessionStorage.getItem('id'),
      accessPageName: name,
      accessDuration: this.durations
    })
  },
  methods: {
    _getDurations (params) {
      api['wholeInformation.getDurations'](params).then(res => {
        this.startTime = 0
        this.endTime = 0
        this.durations = 0
      })
    }
  }
}

export default globalMixin
