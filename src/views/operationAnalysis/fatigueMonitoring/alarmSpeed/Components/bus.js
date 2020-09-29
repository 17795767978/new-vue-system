import Vue from 'vue'
export default new Vue({
  name: 'bus',
  data () {
    return {
      speed: '所有',
      value: '',
      name: '所有',
      warnTypesAll: []
    }
  },
  methods: {
    getAllWarnType () {
      this.$api['tiredMonitoring.getWarntypes']().then(res => {
        this.warnTypesAll = res
      })
    },
    findWarnType (warnName) {
      this.value = this.warnTypesAll.filter(item => item.value === warnName)[0].code
      this.name = warnName
    }
  }
})
