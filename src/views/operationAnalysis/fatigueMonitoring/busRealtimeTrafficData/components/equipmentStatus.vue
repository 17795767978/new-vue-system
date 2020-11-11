<template>
  <div class="equipment-status">
    <ul>
      <li v-for="item in equipmentData" :key="item.id">
        <span>{{item.name}}</span>
        <span v-if="item.id === 0">
          <span :class="item.status === -1 ? 'error' : item.status === 0 ? 'stand' : item.status === 2 ? 'loading' : 'normal'"></span>
          <span class="statusMsg">{{(item.status === -1 && '故障') || (item.status === 0 && '待机') || (item.status === 2 && '充电') || '完成'}}</span>
        </span>
        <span v-if="item.id === 1">
          <span :class="item.status === -1 ? 'error' : item.status === 0 ? 'stand' : item.status === 2 ? 'loading' : 'normal'"></span>
          <span class="statusMsg">{{(item.status === -1 && '故障') || (item.status === 0 && '待机') || (item.status === 2 && '充电') || '完成'}}</span>
        </span>
        <span v-if="item.id === 2">
          <span :class="(item.status === 1 && 'normal') || (item.status === 2 && 'loading') || (item.status === 3 && 'stand') || (item.status === 4 && 'stand') || (item.status === 14 && 'error') || 'error'"></span>
          <span class="statusMsg">{{(item.status === 1 && '耗电') || (item.status === 2 && '发电') || (item.status === 3 && '关闭') || (item.status === 4 && '准备') || (item.status === 14 && '异常') || '无效'}}</span>
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
          status: 0 // -1 红色 0 黄色 1 绿色 2 充电中
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
  .loading {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #2FCD6C;
    vertical-align: middle;
    margin-right: 6px;
    -webkit-animation: myAnimation 1s infinite;
    animation: myAnimation 1s infinite
  }
  @-webkit-keyframes myAnimation {
    0% {
      opacity: 0;
      filter: alpha(opacity=0)
    }
    100% {
      opacity: 1;
      filter: alpha(opacity=100)
    }
  }

  @keyframes myAnimation {
    0% {
      opacity: 0;
      filter: alpha(opacity=0)
    }
    100% {
      opacity: 1;
      filter: alpha(opacity=100)
    }
  }
  .statusMsg {
    vertical-align: middle;
  }
</style>
