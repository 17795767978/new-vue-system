<template>
  <el-table
    :data="tableData"
    height="70vh"
    size="mini"
    style="width: 100%">
    <el-table-column
      type="index"
      align="center"
      label="序号"
      width="80">
    </el-table-column>
    <el-table-column
      prop="date"
      align="center"
      label="日期"
      width="120">
    </el-table-column>
    <el-table-column
      prop="date"
      align="center"
      label="时间"
      width="100">
    </el-table-column>
    <el-table-column
      prop="date"
      align="center"
      label="车牌号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="date"
      align="center"
      label="司机"
      width="100">
    </el-table-column>
    <el-table-column
      prop="date"
      align="center"
      label="线路"
      width="80">
    </el-table-column>
    <el-table-column
      prop="date"
      align="center"
      label="总站"
      width="120">
    </el-table-column>
    <el-table-column label="驾驶行为监测报警" align="center">
      <el-table-column align="center" v-for="item in tableAlarmTypeTitle" :key="item.value" :label="item.label">
        <el-table-column align="center" label="一级" :prop="item.level[0]"></el-table-column>
        <el-table-column align="center" label="二级" :prop="item.level[1]"></el-table-column>
      </el-table-column>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data () {
    return {
      tableAlarmTypeTitle: [
        {
          label: '抽烟',
          value: 'SMOKING',
          level: ['smokeFirst', 'smokeSecond']
        },
        {
          label: '疲劳驾驶',
          value: 'TIRED',
          level: ['tiredFirst', 'tiredSecond']
        },
        {
          label: '超速报警',
          value: 'OVERSPEED',
          level: ['overSpeedFirst', 'overSpeedSecond']
        }
      ],
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          smokeFirst: '0',
          smokeSecond: '1',
          tiredFirst: '0',
          tiredSecond: '1',
          overSpeedFirst: '0',
          overSpeedSecond: '1',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          smokeFirst: '0',
          smokeSecond: '1',
          tiredFirst: '0',
          tiredSecond: '1',
          overSpeedFirst: '0',
          overSpeedSecond: '1',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          smokeFirst: '0',
          smokeSecond: '1',
          tiredFirst: '0',
          tiredSecond: '1',
          overSpeedFirst: '0',
          overSpeedSecond: '1',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          smokeFirst: '0',
          smokeSecond: '1',
          tiredFirst: '0',
          tiredSecond: '1',
          overSpeedFirst: '0',
          overSpeedSecond: '1',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          smokeFirst: '0',
          smokeSecond: '1',
          tiredFirst: '0',
          tiredSecond: '1',
          overSpeedFirst: '0',
          overSpeedSecond: '1',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          smokeFirst: '0',
          smokeSecond: '1',
          tiredFirst: '0',
          tiredSecond: '1',
          overSpeedFirst: '0',
          overSpeedSecond: '1',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          smokeFirst: '0',
          smokeSecond: '1',
          tiredFirst: '0',
          tiredSecond: '1',
          overSpeedFirst: '0',
          overSpeedSecond: '1',
          zip: 200333
        }
      ]
    }
  }
}
</script>

<style>

</style>
