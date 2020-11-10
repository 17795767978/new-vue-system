<template>
  <div class="indi-light">
    <div>
      <span v-for="(item, index) in getDataTop" :key="index" :style="{background: `url(../assets/${index}.png)`}">
        <img :title="item.name" :src="setIcon(item, item.status, index)"/>
      </span>
    </div>
    <div>
      <span v-for="(item, index) in getDataBot" :key="index" :style="{background: `url(../assets/${index}.png)`}">
        <img :title="item.name" :src="setIcon(item, item.status, index + 10)"/>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    getDataTop () {
      return this.formatData(this.indiData)[0]
    },
    getDataBot () {
      return this.formatData(this.indiData)[1]
    }
  },
  methods: {
    setIcon (item, status, index) {
      if (item.status === -1) {
        return require(`../assets/${index}.png`)
      }
      if (item.status === 0) {
        return require(`../assets/${index}_red.png`)
      }
      if (item.status === 1) {
        return require(`../assets/${index}_green.png`)
      }
    },
    formatData (data) {
      var arr = []
      for (var i = 0; i < data.length; i += 10) {
        arr.push(data.slice(i, i + 10))
      }
      return arr
    }
  },
  data () {
    return {
      indiData: [
        {
          name: '图标1',
          id: 0,
          status: -1 // -1 灰色 0 红色 1绿色
        },
        {
          name: '图标1',
          id: 1,
          status: -1
        },
        {
          name: '图标1',
          id: 2,
          status: -1
        },
        {
          name: '图标1',
          id: 3,
          status: -1
        },
        {
          name: '图标1',
          id: 4,
          status: -1
        },
        {
          name: '图标1',
          id: 5,
          status: -1
        },
        {
          name: '图标1',
          id: 6,
          status: -1
        },
        {
          name: '图标1',
          id: 7,
          status: -1
        },
        {
          name: '图标1',
          id: 8,
          status: -1
        },
        {
          name: '图标1',
          id: 9,
          status: -1
        },
        {
          name: '图标1',
          id: 10,
          status: -1
        },
        {
          name: '图标1',
          id: 11,
          status: -1
        },
        {
          name: '图标1',
          id: 12,
          status: -1
        },
        {
          name: '图标1',
          id: 13,
          status: -1
        },
        {
          name: '图标1',
          id: 14,
          status: -1
        },
        {
          name: '图标1',
          id: 15,
          status: -1
        },
        {
          name: '图标1',
          id: 16,
          status: -1
        },
        {
          name: '图标1',
          id: 17,
          status: -1
        },
        {
          name: '图标1',
          id: 18,
          status: -1
        },
        {
          name: '图标1',
          id: 19,
          status: -1
        },
        {
          name: '图标1',
          id: 20,
          status: -1
        }
      ]
    }
  }
}
</script>
<style scoped>
  .indi-light {
    width: 90%;
    background-color: #0E2A40;
    opacity: 0.8;
    border-radius: 8px;
    padding: 10px;
  }
  .indi-light div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .indi-light div span {
    display: inline-block;
    width: 30px;
    height: 32px;
    margin: 4px;
    border: 1px dashed #fff;
    box-sizing: border-box;
  }
  .indi-light img {
    width: 100%;
    height: 100%;
  }
</style>
