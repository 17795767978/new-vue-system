<template>
  <div class="surveillance-video">
    <div class="select">
      <el-button class="button" v-for="item in channal" type="primary" :key="item.index" :plain="!item.isAct" @click="getChannal(item)">{{item.ch}}</el-button>
    </div>
    <div class="video-list">
      <div class="video-wrapper" v-for="(item, index) in urlList" :key="index">
        <videoWrapper  v-if="channal[index].isAct" :item="item" :dialogTableVisible='dialogTableVisible'></videoWrapper>
      </div>
    </div>
  </div>
</template>

<script>
import videoWrapper from './video'
const URL = 'http://61.157.184.120:12056/api/v1/basic/' // 宜宾
export default {
  props: {
    warnDetails: {
      type: Object
    },
    activeName: {
      type: String
    }
  },
  components: {
    videoWrapper
  },
  data () {
    return {
      channal: [
        { ch: '通道1', isAct: false, index: 0 },
        { ch: '通道2', isAct: false, index: 1 },
        { ch: '通道3', isAct: false, index: 2 },
        { ch: '通道4', isAct: false, index: 3 },
        { ch: '通道5', isAct: false, index: 4 },
        { ch: '通道6', isAct: false, index: 5 }
      ],
      dialogTableVisible: false,
      urlList: [1, 2, 3, 4, 5, 6],
      details: {}
    }
  },
  watch: {
    warnDetails: {
      deep: true,
      immediate: true,
      handler (newV) {
        this.handleMarkerClick()
      }
    },
    activeName (newV) {
      if (newV !== 'third') {
        this.channal = [
          { ch: '通道1', isAct: false, index: 0 },
          { ch: '通道2', isAct: false, index: 1 },
          { ch: '通道3', isAct: false, index: 2 },
          { ch: '通道4', isAct: false, index: 3 },
          { ch: '通道5', isAct: false, index: 4 },
          { ch: '通道6', isAct: false, index: 5 }
        ]
      }
    }
  },
  methods: {
    handleMarkerClick () {
      this._getKey()
    },
    getChannal (item) {
      item.isAct = !item.isAct
    },
    _getKey (res) {
      this.$jsonp(`${URL}key?username=admin&password=1985916`).then(json => {
        this.key = json.data.key === '' ? '' : json.data.key
        this._getVideoList(this.warnDetails.devRefId)
      })
    },
    _getVideoList (terid) {
      this.urlList = []
      return new Promise((resolve, reject) => {
        this.$jsonp(`${URL}live/port?key=${this.key}`).then(res => {
          for (let i = 1; i < 7; i++) {
            if (i < 4) {
              console.log(terid)
              this.$jsonp(`${URL}live/video?key=${this.key}&terid=${terid}&chl=${i}&audio=1&st=0&port=${res.data[0].port}`).then(res => {
                this.urlList.push(Object.assign({}, res.data, { ch: i, isAct: false }))
              })
            } else {
              console.log(terid)
              this.$jsonp(`${URL}live/video?key=${this.key}&terid=${terid}&chl=${i}&audio=1&st=0&port=${res.data[1].port}`).then(res => {
                this.urlList.push(Object.assign({}, res.data, { ch: i, isAct: false }))
              })
            }
          }
          setTimeout(() => {
            resolve(this.urlList)
          }, 1000)
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.surveillance-video {
  width: 100%;
  .select {
    padding: 1vh 0.5vw;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
    display: flex;
    justify-content: center;
    .button {
      width: 10%
    }
  }
  .video-list {
    margin-top: 5vh;
    width: 61%;
    height: 60vh;
    display: flex;
    flex-wrap: wrap;
    margin-left: 19.5%;
    justify-content: space-around;
    .video-wrapper {
      width: 33%;
      height: 29.5vh;
      background-color: #cccccc;
    }
  }
}
</style>
