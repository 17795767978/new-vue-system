<template>
<div>
  <el-table :data="tableData" border element-loading-text="拼命加载中" @selection-change="handleSelectionChange">
        <el-table-column
          v-if="!isDeviceParameter"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          v-for="(th, key) in tableKey"
          :key="key"
          :prop="th.prop"
          :label="th.label"
          :fixed="th.fixed"
          :formatter="th.formatter"
          :min-width="th.width"
          :align="th.align"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
          <el-button v-if="th.label === '操作'" @click="handleClick(scope.row)" type="primary" size="small">详情</el-button>
          <div v-else-if="th.prop === 'taskCreateTime'">
            {{scope.row.taskCreateTime | timestampToTime}}
          </div>
          <div v-else-if="th.prop === 'taskStatus'">
            {{scope.row.taskStatus | handleType('status')}}
          </div>
          <div v-else>
            <span>{{ scope.row[th.prop] }}</span>
          </div>
          </template>
        </el-table-column>
      </el-table>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      multipleSelection: []
    }
  },
  props: {
    tableData: {
      type: Array,
      default: function () {
        return []
      }
    },
    isDeviceParameter: {
      type: Boolean
    },
    tableKey: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    handleClick (item) {
      this.$emit('handleClick', item)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.$emit('handleSelectionChange', this.multipleSelection)
    },
  }
}
</script>
