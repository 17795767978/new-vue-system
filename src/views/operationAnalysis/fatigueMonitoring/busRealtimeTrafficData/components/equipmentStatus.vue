<template>
  <div class="equipment-status">
    <ul>
      <li v-for="item in equipmentData" :key="item.id">
        <span>{{item.name}}</span>
        <span>
          <span :class="item.status === -1 ? 'error' : item.status === 0 ? 'stand' : 'normal'"></span>
          <span class="statusMsg">{{(item.status === -1 && '异常') || (item.status === 0 && '待机') || '正常'}}</span>
        </span>
      </li>
      <li>
        <span>电机转速</span>
        <span>{{loopSpeed}} r/min</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    loopSpeed: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  methods: {
    setData (id, status) {
      let data = this.equipmentData[id]
      data['status'] = status
      this.$set(this.equipmentData, id, data)
    }
  },
  data () {
    return {
      equipmentData: [
        {
          name: '驱动系统状态',
          id: 0,
          status: 0 // -1 红色 0 黄色 1 绿色
        },
        {
          name: '充电状态',
          id: 1,
          status: 0
        },
        {
          name: '电机状态',
          id: 2,
          status: 1
        }
      ]
    }
  }
}
</script>
<style scoped>
  .equipment-status {
    width: 70%;
    margin-top: 20px;
  }
  .equipment-status ul {
    width: 100%;
    padding: 0;
    margin: 0;
  }
  .equipment-status ul li {
    padding: 6px;
    width: 100%;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #B1B4B6;
    border-bottom: 1px solid #18303F;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .error {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: red;
    vertical-align: middle;
    margin-right: 6px;
  }
  .stand {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #F8DC59;
    vertical-align: middle;
    margin-right: 6px;
  }
  .normal {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #2FCD6C;
    vertical-align: middle;
    margin-right: 6px;
  }
  .statusMsg {
    vertical-align: middle;
  }
</style>
