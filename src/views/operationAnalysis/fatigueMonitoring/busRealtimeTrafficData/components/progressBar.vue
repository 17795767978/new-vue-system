<template>
  <div class="progress-con">
    <span class="progressBar" v-for="item in boxNum" :key="item" :style="{backgroundColor: noDataColor}"></span>
    <span class="progressNum" :style="{color: dataColor}">{{dataNum}}</span>
    <div class="progressDataBar">
      <span class="progressBar" v-for="item in dataNumBox" :key="item" :style="{backgroundColor: dataColor}"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'progressBar',
  props: {
    boxNum: {
      type: Array,
      default: () => {
        return [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
      }
    },
    noDataColor: {
      type: String,
      default: '#374633'
    },
    dataColor: {
      type: String,
      default: '#F8DC59'
    },
    dataNum: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  watch: {
    dataNum (val) {
      this.setData(val)
    }
  },
  methods: {
    setData (val = 0) {
      this.dataNumBox = []
      this.boxNum.forEach(item => {
        if (val >= item) {
          this.dataNumBox.push(item)
        }
      })
    }
  },
  mounted () {
    this.setData(this.dataNum)
  },
  data () {
    return {
      dataNumBox: []
    }
  }
}
</script>
<style scoped>
  .progressBar {
    display: inline-block;
    width: 6px;
    height: 20px;
    margin-left: 2px;
    border-radius: 2px;
    vertical-align: middle;
  }
  .progressNum {
    vertical-align: middle;
    font-weight: 600;
    font-size: 18px;
    margin-left: 4px;
  }
  .progress-con {
    position: relative;
  }
  .progressDataBar {
    position: absolute;
    top: 2px;
    left: 0;
  }
</style>
