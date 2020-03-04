<template>
<div class="table" v-loading="isLoading">
  <div style="width: 48%;margin-right: 2%;">
    <h2 class="left-table-title">驾驶员行为监测报警</h2>
    <div class="left-table">
      <div class="table-col-first">
        <div class="table-dispose" :style="{height: disposeHeight, lineHeight: disposeHeight}">主配</div>
        <div class="dispose-total">共计</div>
        <div class="table-select-dispose" :style="{height: selectHeight, lineHeight: selectHeight}">选配</div>
        <div class="select-dispose-total">共计</div>
        <div class="alldispose-total">总计</div>
      </div>
      <div class="table-alarmType">
        <div class="col-title">项目</div>
        <div v-for="item in colDisposeData" :key="item.plvalue" class="dispose-alarm-type-group">{{item.pldisplay}}</div>
        <div class="col-title no-right-border"></div>
        <div class="select-alarm-type-group" v-for="item in colSelectData"
          :key="item.value"
        >
        {{item.label}}
        </div>
        <div class="col-title no-border"></div>
        <div class="col-title no-border"></div>
      </div>
      <div class="table-grade-group">
        <div class="col-title">级别</div>
        <div v-for="item in colDisposeData" :key="item.plvalue" class="dispose-grade-group">
          <div class="grade-item">
            一级
          </div>
          <div class="grade-item border">
            二级
          </div>
          <div class="grade-item">
            合计
          </div>
        </div>
        <div class="col-title"></div>
        <div class="select-grade-group" v-for="item in colSelectData"
          :key="item.value"
        >
          <div class="grade-item border">
            一级
          </div>
          <div class="grade-item border">
            二级
          </div>
          <div class="grade-item">
            合计
          </div>
        </div>
        <div class="col-title no-border"></div>
        <div class="col-title no-bottom"></div>
      </div>
      <div class="alarm-num-group">
        <div class="col-title">次数</div>
        <div v-for="item in colDisposeData" :key="item.plvalue" class="dispose-grade-group">
          <div class="grade-item" style="font-size: 0.8vw">
            {{item.level && datas[item.level[0]]}}
          </div>
          <div class="grade-item border" style="font-size: 0.8vw">
            {{item.level && datas[item.level[2]]}}
          </div>
          <div class="grade-item" style="font-size: 0.8vw">
            {{item.level && datas[item.level[0]] + datas[item.level[2]]}}
            <!-- {{item.level && getTotal(datas[item.level[0]], datas[item.level[2]])}} -->
          </div>
        </div>
        <div class="col-title" style="font-size: 0.8vw">{{disposeNumTotal}}</div>
        <div class="select-grade-group" v-for="item in colSelectData"
          :key="item.value"
        >
          <div class="grade-item border">
          </div>
          <div class="grade-item border">
          </div>
          <div class="grade-item">
          </div>
        </div>
        <div class="col-title"></div>
        <div class="col-title no-bottom" style="font-size: 0.8vw">{{disposeNumTotal}}</div>
      </div>
      <div class="car-num-group">
        <div class="col-title">车台数</div>
        <div v-for="item in colDisposeData" :key="item.value" class="dispose-grade-group">
          <div class="grade-item" style="font-size: 0.8vw">
            {{item.level && datas[item.level[1]]}}
          </div>
          <div class="grade-item border" style="font-size: 0.8vw">
            {{item.level && datas[item.level[3]]}}
          </div>
          <div class="grade-item" style="font-size: 0.8vw">
            {{item.level && datas[item.level[1]] + datas[item.level[3]]}}
          </div>
        </div>
        <div class="col-title" style="font-size: 0.8vw">{{disposeCountTotal}}</div>
        <div class="select-grade-group" v-for="item in colSelectData"
          :key="item.value"
        >
          <div class="grade-item border">
          </div>
          <div class="grade-item border">
          </div>
          <div class="grade-item">
          </div>
        </div>
        <div class="col-title"></div>
        <div class="col-title no-bottom" style="font-size: 0.8vw">{{disposeCountTotal}}</div>
      </div>
    </div>
  </div>
  <div style="width: 48%;margin-left: 2%;">
    <h2 class="left-table-title">驾驶员辅助功能</h2>
    <div class="left-table">
      <div class="table-col-first">
        <div class="table-dispose" :style="{height: assistColumnDataHeight, lineHeight: assistColumnDataHeight}">主配</div>
        <div class="dispose-total">共计</div>
        <div class="table-select-dispose" :style="{height: selectHeight, lineHeight: selectHeight}">选配</div>
        <div class="select-dispose-total">共计</div>
        <div class="alldispose-total">总计</div>
      </div>
      <div class="table-alarmType">
        <div class="col-title">项目</div>
        <div v-for="item in assistColumnData" :key="item.plvalue" class="dispose-alarm-type-group">{{item.pldisplay}}</div>
        <div class="col-title no-right-border"></div>
        <div class="select-alarm-type-group" v-for="item in colSelectData"
          :key="item.value"
        >
        {{item.label}}
        </div>
        <div class="col-title no-border"></div>
        <div class="col-title no-border"></div>
      </div>
      <div class="table-grade-group">
        <div class="col-title">级别</div>
        <div v-for="item in assistColumnData" :key="item.plvalue" class="dispose-grade-group">
          <div class="grade-item">
            一级
          </div>
          <div class="grade-item border">
            二级
          </div>
          <div class="grade-item">
            合计
          </div>
        </div>
        <div class="col-title"></div>
        <div class="select-grade-group" v-for="item in colSelectData"
          :key="item.value"
        >
          <div class="grade-item border">
            一级
          </div>
          <div class="grade-item border">
            二级
          </div>
          <div class="grade-item">
            合计
          </div>
        </div>
        <div class="col-title no-border"></div>
        <div class="col-title no-bottom"></div>
      </div>
      <div class="alarm-num-group">
        <div class="col-title">次数</div>
        <div v-for="item in assistColumnData" :key="item.plvalue" class="dispose-grade-group">
          <div class="grade-item" style="font-size: 0.8vw">
            {{item.level && datas[item.level[0]]}}
          </div>
          <div class="grade-item border" style="font-size: 0.8vw">
            {{item.level && datas[item.level[2]]}}
          </div>
          <div class="grade-item" style="font-size: 0.8vw">
            {{item.level && datas[item.level[0]] + datas[item.level[2]]}}
            <!-- {{item.level && getTotal(datas[item.level[0]], datas[item.level[2]])}} -->
          </div>
        </div>
        <div class="col-title" style="font-size: 0.8vw">{{assistNumTotal}}</div>
        <div class="select-grade-group" v-for="item in colSelectData"
          :key="item.value"
        >
          <div class="grade-item border">
          </div>
          <div class="grade-item border">
          </div>
          <div class="grade-item">
          </div>
        </div>
        <div class="col-title"></div>
        <div class="col-title no-bottom" style="font-size: 0.8vw">{{assistNumTotal}}</div>
      </div>
      <div class="car-num-group">
        <div class="col-title">车台数</div>
        <div v-for="item in assistColumnData" :key="item.plvalue" class="dispose-grade-group">
          <div class="grade-item" style="font-size: 0.8vw">
            {{item.level && datas[item.level[1]]}}
          </div>
          <div class="grade-item border" style="font-size: 0.8vw">
            {{item.level && datas[item.level[3]]}}
          </div>
          <div class="grade-item" style="font-size: 0.8vw">
            {{item.level && datas[item.level[1]] + datas[item.level[3]]}}
          </div>
        </div>
        <div class="col-title" style="font-size: 0.8vw">{{assistCountTotal}}</div>
        <div class="select-grade-group" v-for="item in colSelectData"
          :key="item.value"
        >
          <div class="grade-item border">
          </div>
          <div class="grade-item border">
          </div>
          <div class="grade-item">
          </div>
        </div>
        <div class="col-title"></div>
        <div class="col-title no-bottom" style="font-size: 0.8vw">{{assistCountTotal}}</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  props: {
    selectData: {
      type: Object
    }
  },
  data () {
    return {
      disposeHeight: '',
      selectHeight: '',
      assistColumnDataHeight: '',
      isLoading: false,
      disposeNumTotal: 0,
      disposeCountTotal: 0,
      assistNumTotal: 0,
      assistCountTotal: 0,
      datas: {},
      colDisposeData: [
        {
          label: '打哈欠',
          value: 'SMOKING'
        },
        {
          label: '接打手持电话',
          value: 'TIRED1'
        },
        {
          label: '疲劳驾驶',
          value: 'TIRED2'
        },
        {
          label: '疲劳驾驶',
          value: 'TIRED3'
        },
        {
          label: '疲劳驾驶',
          value: 'TIRED4'
        },
        {
          label: '疲劳驾驶',
          value: 'TIRED5'
        },
        {
          label: '疲劳驾驶',
          value: 'TIRED6'
        },
        {
          label: '疲劳驾驶',
          value: 'TIRED7'
        },
        {
          label: '疲劳驾驶',
          value: 'TIRED8'
        },
        {
          label: '疲劳驾驶',
          value: 'TIRED9'
        }
      ],
      colSelectData: [
        {
          label: '---',
          value: 'TIRED12'
        },
        {
          label: '---',
          value: 'TIRED13'
        },
        {
          label: '---',
          value: 'TIRED14'
        }
      ],
      assistColumnData: [
        {
          label: '打哈欠',
          value: 'SMOKING'
        },
        {
          label: '接打手持电话',
          value: 'TIRED1'
        },
        {
          label: '疲劳驾驶',
          value: 'TIRED2'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['formData', 'userId'])
  },
  created () {
    const warnDate = moment().format('YYYY-MM-DD')
    this._getAlarmUploadReportDay({
      orgId: this.userId === '1' ? '' : this.userId,
      warnDate
    })
  },
  mounted () {
    this.disposeHeight = `${3 * 3 * this.colDisposeData.length + 3}vh`
    this.selectHeight = `${3 * 3 * this.colSelectData.length}vh`
    this.assistColumnDataHeight = `${3 * 3 * this.assistColumnDataHeight.length + 3}vh`
  },
  watch: {
    selectData: {
      deep: true,
      handler (newV) {
        this._getAlarmUploadReportDay({
          orgId: newV.orgId === '1' ? '' : newV.orgId,
          warnDate: moment(newV.dataCurrent).format('YYYY-MM-DD')
        })
      }
    }
  },
  methods: {
    _getAlarmUploadReportDay (params) {
      this.disposeNumTotal = 0
      this.disposeCountTotal = 0
      this.assistNumTotal = 0
      this.assistCountTotal = 0
      this.isLoading = true
      this.$api['tiredMonitoring.getAlarmUploadReportDay'](params).then(res => {
        this.isLoading = false
        this.colDisposeData = res.alarmColumnData
        this.assistColumnData = res.assistColumnData
        this.datas = res.data[0]
        this.disposeHeight = `${3 * 3 * this.colDisposeData.length + 3}vh`
        this.assistColumnDataHeight = `${3 * 3 * this.assistColumnData.length + 3}vh`
        this.getTotal(res.alarmColumnData, res.data[0], res.assistColumnData)
      })
    },
    getTotal (leftCol, data, rightCol) {
      // 左侧所有key
      let leftColArr = []
      // 右侧所有KEY
      let rightColArr = []
      // 左侧次数的集合
      let newLeftNumArr = []
      // 左侧台数的集合
      let newLeftCountArr = []
      // 右侧次数的集合
      let newRightNumArr = []
      // 右侧台数数的集合
      let newRightCountArr = []
      leftCol.forEach(item => {
        leftColArr.push(...item.level)
      })
      rightCol.forEach(item => {
        rightColArr.push(...item.level)
      })
      leftColArr.forEach(item => {
        if (item.indexOf('First') + 5 === item.length || item.indexOf('Second') + 6 === item.length) {
          newLeftNumArr.push(item)
        } else {
          newLeftCountArr.push(item)
        }
      })
      rightColArr.forEach(item => {
        if (item.indexOf('First') + 5 === item.length || item.indexOf('Second') + 6 === item.length) {
          newRightNumArr.push(item)
        } else {
          newRightCountArr.push(item)
        }
      })
      // 左侧所有的次数
      newLeftNumArr.forEach(item => {
        this.disposeNumTotal += Number(data[item])
      })
      // 左侧所有的车台数
      newLeftCountArr.forEach(item => {
        this.disposeCountTotal += Number(data[item])
      })
      // 右侧的所有次数
      newRightNumArr.forEach(item => {
        this.assistNumTotal += Number(data[item])
      })
      // 右侧的所有车台数
      newRightCountArr.forEach(item => {
        this.assistCountTotal += Number(data[item])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  height: 75vh;
  // overflow: scroll;
  display: flex;
  .left-table-title {
    width: 100%;
    text-align: center;
    line-height: 1.2;
    font-size: 1.5vw;
  }
  .left-table {
    width: 100%;
    height: 65vh;
    border: 1px solid #eee;
    border-right: hidden;
    box-sizing: border-box;
    overflow-y: scroll;
    display: flex;
    .table-col-first {
      width: 15%;
      .table-dispose, .table-select-dispose {
        width: 100%;
        border-right: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
        box-sizing: border-box;
        text-align: center;
      }
      .dispose-total,
      .select-dispose-total
      {
        width: 400%;
        height: 3vh;
        text-align: center;
        line-height: 3vh;
        border: 1px solid #ebeef5;
        border-left: hidden;
        border-top: hidden;
        box-sizing: border-box;
      }
      .alldispose-total {
        width: 400%;
        height: 3vh;
        text-align: center;
        box-sizing:border-box;
        line-height: 3vh;
      }
    }
    .table-alarmType {
      width: 25%;
      .col-title {
        width: 100%;
        height: 3vh;
        line-height: 3vh;
        text-align: center;
        box-sizing: border-box;
        border-right: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
      }
      .no-border {
        border-bottom: hidden;
        border-right: hidden;
      }
      .no-right-border {
        border-right: hidden;
      }
      .dispose-alarm-type-group {
        width: 100%;
        height: 9vh;
        line-height: 9vh;
        text-align: center;
        box-sizing: border-box;
        border-right: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
      }
      .select-alarm-type-group {
        width: 100%;
        height: 9vh;
        line-height: 9vh;
        text-align: center;
        box-sizing: border-box;
        border-right: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
      }
    }
    .table-grade-group, .alarm-num-group, .car-num-group  {
      width: 20%;
      .col-title {
        width: 100%;
        height: 3vh;
        line-height: 3vh;
        text-align: center;
        box-sizing: border-box;
        border-right: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
      }
      .no-bottom {
        border-bottom: hidden;
      }
      .no-border {
        border-bottom: hidden;
        border-right: hidden;
      }
      .dispose-grade-group{
        width: 100%;
        height: 9vh;
        line-height: 9vh;
        text-align: center;
        box-sizing: border-box;
        border-right: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
        .grade-item {
          width: 100%;
          height: 3vh;
          line-height: 3vh;
        }
        .border {
          border-top: 1px solid #ebeef5;
          border-bottom: 1px solid #ebeef5;
        }
      }
      .select-grade-group {
        width: 100%;
        height: 9vh;
        line-height: 9vh;
        text-align: center;
        box-sizing: border-box;
        border-right: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
        .grade-item {
          width: 100%;
          height: 3vh;
          line-height: 3vh;
        }
        .border {
          border-bottom: 1px solid #ebeef5;
        }
      }
    }
  }
}
</style>
