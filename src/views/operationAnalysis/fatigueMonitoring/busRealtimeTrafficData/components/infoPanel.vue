<template>
  <div class="info-panel">
    <ul>
      <li v-for="(item, index) in infoData" :key="index">
        <div>{{item.name}}</div>
        <div>{{item.val}}</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  methods: {
    setData (id = 0, val = '0 度') {
      let data = this.infoData[id]
      data['val'] = val
      this.$set(this.infoData, id, data)
    }
  },
  data () {
    return {
      infoData: [
        {
          'name': '瞬间电耗',
          'val': '0.15 度',
          'id': 0
        }, {
          'name': '平均电耗',
          'val': '0.14 度',
          'id': 1
        }, {
          'name': '小计历程',
          'val': '0 KM',
          'id': 2
        }, {
          'name': '总里程',
          'val': '88764.70',
          'id': 3
        }, {
          'name': '总电耗',
          'val': '553307.12 度',
          'id': 4
        }
      ]
    }
  }
}
</script>
<style scoped>
  .info-panel {
    width: 94%;
    height: 140px;
    background: #0E2A40;
    opacity: 0.8;
  }
  .info-panel ul {
    padding: 0;
    margin: 0;
  }
  .info-panel ul li {
    padding: 6px 16px;
    margin: 0;
    display: flex;
    flex-direction: row;
    font-family: PingFang SC;
    font-weight: 400;
    color: #A6ABB0;
    font-size: 10px;
  }
  .info-panel ul li>div {
    flex: 1;
  }
</style>
