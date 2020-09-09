<template>
  <div class="bottom-left-wrapper">
    <div  v-loading="loading" element-loading-background="rgba(255, 255, 255, 0)" style="height: 100%">
      <!-- <div v-for="(arrData, index) in diffArrData" :key="index"  @click="getIndex(index)"> -->
        <vueSeamless  class="scroll-wrapper" :class-option="allOptions" :data="alermData">
          <p class="list-font" v-for="(list, index) in alermData" :key="index">
            <span>{{list[0]}}：<span style="color: #eadf00;">{{list[1]}}</span></span>
          </p>
        </vueSeamless>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import vueSeamless from 'vue-seamless-scroll'
const TIME = 3 * 60 * 1000
export default {
  data () {
    return {
      config: '',
      loading: true,
      diffArrData: [],
      timer: null,
      timerOption: null,
      alermData: []
    }
  },
  computed: {
    allOptions () {
      return {
        hoverStop: true,
        step: 0.5
      }
    }
  },
  components: {
    vueSeamless
  },
  created () {
    let orgId = this.$store.getters.userId === '1' ? '' : this.$store.getters.userId
    this._badDrivingBehavior({
      orgId
    })
  },
  methods: {
    _badDrivingBehavior (params) {
      this.codeNum = 0
      this.$api['homeTired.getBadDrivingBehaviorTable'](params).then(res => {
        this.alermData = []
        this.diffArrData = []
        res.forEach(alert => {
          this.alermData.push(alert.split('：'))
        })
        // this.getNumberArry()
        this.loading = false
        let typeData = new Set(this.alermData.map(item => item[1]))
        this.alarmType = [...typeData]
        this.timer = setInterval(() => {
          this.codeNum += 1
          if (this.codeNum === 300) {
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
        this.timerOption = setTimeout(() => {
          this._badDrivingBehavior()
        }, TIME)
      }).catch(err => {
        clearTimeout(this.timerOption)
        this.loading = false
        this.$message.error(err.message)
      })
    },
    getNumberArry () {
      if (this.alermData.length > 20) {
        for (let i = 0; i < this.alermData.length; i += 20) {
          this.diffArrData[Math.floor(i / 20)] = this.alermData.slice(i, i + 20)
        }
      } else {
        this.diffArrData[0] = this.alermData
      }
    }
  },
  destroyed () {
    clearInterval(this.timerOption)
    this.timer = null
    this.timerOption = null
  }
}
</script>

<style lang="scss" scoped>
.bottom-left-wrapper {
  width:  100%;
  height: 100%;
  overflow: hidden;
  .scroll-wrapper {
    padding: 10px 10px;
    overflow: hidden;
    box-sizing: border-box;
  }
  .list-font {
    color: #fff;
    font-size: 12px;
    margin-top: 0;
    margin-bottom: 10px;
  }
}
</style>
