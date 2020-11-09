<template>
  <div class="indi-light">
    <div>
      <span v-for="(item, index) in getDataTop" :key="index" :style="{background: `url(../assets/${index}.png)`}">
        <img :title="item.name" :src="require(`../assets/${index}.png`)"/>
      </span>
    </div>
    <div>
      <span v-for="(item, index) in getDataBot" :key="index" :style="{background: `url(../assets/${index}.png)`}">
        <img :title="item.name" :src="require(`../assets/${index + 10}.png`)"/>
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
          id: 0
        },
        {
          name: '图标1',
          id: 1
        },
        {
          name: '图标1',
          id: 2
        },
        {
          name: '图标1',
          id: 3
        },
        {
          name: '图标1',
          id: 4
        },
        {
          name: '图标1',
          id: 5
        },
        {
          name: '图标1',
          id: 6
        },
        {
          name: '图标1',
          id: 7
        },
        {
          name: '图标1',
          id: 8
        },
        {
          name: '图标1',
          id: 9
        },
        {
          name: '图标1',
          id: 10
        },
        {
          name: '图标1',
          id: 11
        },
        {
          name: '图标1',
          id: 12
        },
        {
          name: '图标1',
          id: 13
        },
        {
          name: '图标1',
          id: 14
        },
        {
          name: '图标1',
          id: 15
        },
        {
          name: '图标1',
          id: 16
        },
        {
          name: '图标1',
          id: 17
        },
        {
          name: '图标1',
          id: 18
        },
        {
          name: '图标1',
          id: 19
        },
        {
          name: '图标1',
          id: 20
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
