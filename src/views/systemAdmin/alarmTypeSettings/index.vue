<template>
  <div class="table-wrapper-father">
    <el-table
      :data="tableData"
      border
      height="80vh"
      @expand-change="handlerChange"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="init-table">
            <ul class="wrapper">
              <li class="content">
                <el-row :gutter="24">
                  <el-col :span="22">
                    只和速度相关：
                    <!-- {{props.row}} -->
                    <el-input v-model="props.row.alarmTypeList[0].speedTwoS" style="width: 100px;" size="mini"></el-input>
                     =<
                    报警速度
                    <
                    <el-input v-model="props.row.alarmTypeList[0].speedTwoE" style="width: 100px;" size="mini"></el-input>
                    ,报警等级设置为二级；
                    <el-input v-model="props.row.alarmTypeList[0].speedOneS" style="width: 100px;" size="mini"></el-input>
                    <=
                    报警速度
                    <
                    <el-input v-model="props.row.alarmTypeList[0].speedOneE" style="width: 100px;" size="mini"></el-input>
                    ,报警等级设置为一级;
                  </el-col>
                  <el-col :span="1">
                    <el-button size="mini" type="success" @click="handlerSave(props.row.alarmTypeList[0], '1', props.row.plUuid)">保存</el-button>
                  </el-col>
                </el-row>
              </li>
              <li class="content border">
                <el-row :gutter="24">
                  <el-col :span="22">
                    只和报警频率相关：报警频率 >=
                    <el-input v-model="props.row.alarmTypeList[1].rateTwoE" style="width: 100px;" size="mini"></el-input>
                    次/分钟，报警等级设置为二级；
                    <el-input v-model="props.row.alarmTypeList[1].rateOneS" style="width: 100px;" size="mini"></el-input>
                    次/分钟 <= 报警频率<
                    <el-input v-model="props.row.alarmTypeList[1].rateOneE" style="width: 100px;" size="mini"></el-input>
                    次/分钟,报警等级设置为一级；
                  </el-col>
                  <el-col :span="1">
                    <el-button size="mini" type="success" @click="handlerSave(props.row.alarmTypeList[1], '2', props.row.plUuid)" >保存</el-button>
                  </el-col>
                </el-row>
              </li>
              <li class="content">
                <el-row :gutter="24">
                  <el-col :span="22">
                    和报警频率以及速度有关：
                    <el-input v-model="props.row.alarmTypeList[2].speedTwoS" style="width: 100px;" size="mini"></el-input>
                    =< 报警速度 <
                      <el-input v-model="props.row.alarmTypeList[2].speedTwoE" style="width: 100px;" size="mini"></el-input>
                      ，且
                      <el-input v-model="props.row.alarmTypeList[2].rateTwoS" style="width: 100px;" size="mini"></el-input>
                      次/分钟 <= 报警频率 <
                      <el-input v-model="props.row.alarmTypeList[2].rateTwoE" style="width: 100px;" size="mini"></el-input>
                      次/分钟，报警等级设置为二级；
                      <el-input v-model="props.row.alarmTypeList[2].speedOneS" style="width: 100px;" size="mini"></el-input>
                      =< 报警速度 <
                      <el-input v-model="props.row.alarmTypeList[2].speedOneE" style="width: 100px;" size="mini"></el-input>
                      ，且
                      <el-input v-model="props.row.alarmTypeList[2].rateOneS" style="width: 100px;" size="mini"></el-input>
                      次/分钟 <= 报警频率 <
                      <el-input v-model="props.row.alarmTypeList[2].rateOneE" style="width: 100px;" size="mini"></el-input>
                      次/分钟，报警等级设置为一级；
                  </el-col>
                  <el-col :span="1">
                    <el-button size="mini" type="success"  @click="handlerSave(props.row.alarmTypeList[2], '3', props.row.plUuid)">保存</el-button>
                  </el-col>
                </el-row>
              </li>
            </ul>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="plDisplay"
        align="center"
        label="报警类型">
      </el-table-column>
      <el-table-column
        prop="plValue"
        align="center"
        label="报警编码">
      </el-table-column>
      <el-table-column
        prop="plDisplay"
        align="center"
        label="报警状态">
        <template slot-scope="scope">
          {{scope.row.plIsvalid === '1' ? '启用' : '禁用'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="plSort"
        align="center"
        label="排序">
      </el-table-column>
      <el-table-column
        prop="name"
        label="操作"
        align="center"
        width="250">
        <template slot-scope="scope">
          <!-- <el-button
            @click.native.prevent="handlerEdit(scope.$index, scope.row)"
            type="primary"
            size="small">
            编辑
          </el-button> -->
          <el-button
            @click.native.prevent="handlerDelete(scope.row)"
            type="danger"
            size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'alarmTypeSettings',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this._getAlarmList()
  },
  methods: {
    _getAlarmList () {
      this.$api['tiredMonitoring.getWarnTypeList']({
        pageNum: 1,
        pageSize: 1000
      }).then(res => {
        this.tableData = res.list
        this.tableData.forEach(item => {
          item.alarmTypeList.push({
            speedOneS: null,
            speedOneE: null,
            rateOneS: null,
            rateOneE: null,
            levelTwo: null,
            speedTwoS: null,
            speedTwoE: null,
            rateTwoS: null,
            rateTwoE: null,
            atuuid: null
          })
          item.alarmTypeList.push({
            speedOneS: null,
            speedOneE: null,
            rateOneS: null,
            rateOneE: null,
            levelTwo: null,
            speedTwoS: null,
            speedTwoE: null,
            rateTwoS: null,
            rateTwoE: null,
            atUuid: null
          })
          item.alarmTypeList.push({
            speedOneS: null,
            speedOneE: null,
            rateOneS: null,
            rateOneE: null,
            levelTwo: null,
            speedTwoS: null,
            speedTwoE: null,
            rateTwoS: null,
            rateTwoE: null,
            atUuid: null
          })
        })
      })
    },
    handlerChange (row, rowAll) {
      if (rowAll.some(item => item.plUuid === row.plUuid)) {
        this.$api['tiredMonitoring.getAlarmTypesDetail']({ plUuid: row.plUuid, pageNum: 1, pageSize: 100 }).then(res => {
          // console.log(res)
          const currentData = res.list.filter(item => item.plUuid === row.plUuid)[0]
          this.tableData.forEach(val => {
            if (val.plUuid === currentData.plUuid) {
              if (currentData.alarmTypeList.length) {
                val.alarmTypeList = currentData.alarmTypeList
              } else {
                val.alarmTypeList.push({
                  speedOneS: null,
                  speedOneE: null,
                  rateOneS: null,
                  rateOneE: null,
                  levelTwo: null,
                  speedTwoS: null,
                  speedTwoE: null,
                  rateTwoS: null,
                  rateTwoE: null,
                  atUuid: null
                })
                val.alarmTypeList.push({
                  speedOneS: null,
                  speedOneE: null,
                  rateOneS: null,
                  rateOneE: null,
                  levelTwo: null,
                  speedTwoS: null,
                  speedTwoE: null,
                  rateTwoS: null,
                  rateTwoE: null,
                  atUuid: null
                })
                val.alarmTypeList.push({
                  speedOneS: null,
                  speedOneE: null,
                  rateOneS: null,
                  rateOneE: null,
                  levelTwo: null,
                  speedTwoS: null,
                  speedTwoE: null,
                  rateTwoS: null,
                  rateTwoE: null,
                  atUuid: null
                })
              }
            }
          })
        })
      }
    },
    handlerSave (row, type, plUuid) {
      this.$api['tiredMonitoring.addAlarmTypesDetail']({ ...row, ruleType: type, plUuid }).then(res => {
        // console.log(res)
        this.$message.success('操作成功')
      }).catch(() => {
        this.$message.error('操作失败')
      })
    },
    handlerDelete (row) {
      this.$api['tiredMonitoring.deleteAlarmTypesDetail']({
        plUuid: row.plUuid
      }).then(res => {
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message.error('删除失败')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-wrapper-father {
  width: 80%;
  padding: 5vh 1vw;
  margin: 0 auto;
  box-sizing: border-box;
  .init-table {
    width: 90%;
    margin: 0 auto;
    padding: 0vh 0;
    box-sizing: border-box;
    border: 1px solid #e5e5e5;
    .wrapper {
      width: 100%;
      .content {
        width: 100%;
        min-height: 5vh;
        // line-height: 5vh;
        padding: 1vh 1vw;
        box-sizing: border-box;
        &.border {
          border-top: 1px solid #e5e5e5;
          border-bottom: 1px solid #e5e5e5
        }
      }
    }
  }
}
</style>
