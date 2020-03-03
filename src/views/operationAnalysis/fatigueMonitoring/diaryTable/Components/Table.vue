<template>
<div class="table">
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
        <div v-for="item in colDisposeData" :key="item.value" class="dispose-alarm-type-group">{{item.label}}</div>
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
        <div v-for="item in colDisposeData" :key="item.value" class="dispose-grade-group">
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
        <div v-for="item in colDisposeData" :key="item.value" class="dispose-grade-group">
          <div class="grade-item">
          </div>
          <div class="grade-item border">
          </div>
          <div class="grade-item">
          </div>
        </div>
        <div class="col-title"></div>
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
        <div class="col-title no-bottom"></div>
      </div>
      <div class="car-num-group">
        <div class="col-title">车台数</div>
        <div v-for="item in colDisposeData" :key="item.value" class="dispose-grade-group">
          <div class="grade-item">
          </div>
          <div class="grade-item border">
          </div>
          <div class="grade-item">
          </div>
        </div>
        <div class="col-title"></div>
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
        <div class="col-title no-bottom"></div>
      </div>
    </div>
  </div>
  <div style="width: 48%;margin-left: 2%;">
    <h2 class="left-table-title">驾驶员辅助功能</h2>
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
        <div v-for="item in colDisposeData" :key="item.value" class="dispose-alarm-type-group">{{item.label}}</div>
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
        <div v-for="item in colDisposeData" :key="item.value" class="dispose-grade-group">
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
        <div v-for="item in colDisposeData" :key="item.value" class="dispose-grade-group">
          <div class="grade-item">
          </div>
          <div class="grade-item border">
          </div>
          <div class="grade-item">
          </div>
        </div>
        <div class="col-title"></div>
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
        <div class="col-title no-bottom"></div>
      </div>
      <div class="car-num-group">
        <div class="col-title">车台数</div>
        <div v-for="item in colDisposeData" :key="item.value" class="dispose-grade-group">
          <div class="grade-item">
          </div>
          <div class="grade-item border">
          </div>
          <div class="grade-item">
          </div>
        </div>
        <div class="col-title"></div>
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
        <div class="col-title no-bottom"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      disposeHeight: '',
      selectHeight: '',
      colDisposeData: [
        {
          label: '抽烟',
          value: 'SMOKING',
          smokingNumFirst: '10',
          smokingSecL: '20'
        },
        {
          label: '疲劳驾驶',
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
          label: '疲劳驾驶',
          value: 'TIRED12'
        },
        {
          label: '疲劳驾驶',
          value: 'TIRED13'
        },
        {
          label: '疲劳驾驶',
          value: 'TIRED14'
        },
        {
          label: '疲劳驾驶',
          value: 'TIRED15'
        }
      ]
    }
  },
  mounted () {
    this.disposeHeight = `${3 * 3 * this.colDisposeData.length + 3}vh`
    this.selectHeight = `${3 * 3 * this.colSelectData.length}vh`
  },
  methods: {
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
    overflow: scroll;
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
