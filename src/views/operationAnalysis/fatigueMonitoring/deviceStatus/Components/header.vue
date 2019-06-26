<template>
  <div class="header">
    <el-form :inline="true" size="mini" :model="formInline" class="form-inline">
      <el-form-item label="选择机构">
        <el-select class="font-style" v-model="formInline.orgUuid" placeholder="请选择">
          <el-option
            v-for="item in comOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择线路">
        <el-select class="font-style" multiple
            collapse-tags filterable v-model="formInline.lineUuid" placeholder="请选择">
          <el-option
            v-for="item in lineOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="warning" @click="onclear">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
// import moment from 'moment';
export default {
  data () {
    return {
      formInline: {
        lineUuid: [],
        orgUuid: ''
      },
      comOptions: [],
      lineOptions: []
    }
  },
  created () {
  },
  mounted () {
    this.$store.dispatch('getLineList').then(res => {
      this.lineOptions = res
    })
    this.$store.dispatch('getComList').then(res => {
      this.comOptions = res
    })
  },
  watch: {
    'formInline.orgUuid': {
      handler (newValue) {
        this.formInline.lineUuid = []
        let orgId = newValue === '1' ? '' : newValue
        this.$api['wholeInformation.getLine']({
          lineId: '',
          lineName: '',
          orgId: orgId
        }).then(res => {
          let list = []
          res.forEach(item => {
            list.push({
              label: item.lineName,
              value: item.lineUuid
            })
          })
          this.lineOptions = list
        })
      }
    }
  },
  methods: {
    onSubmit () {
      this.$emit('selectConfig', this.formInline)
    },
    onclear () {
      this.formInline = {
        lineUuid: [],
        orgUuid: ''
      }
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  border-bottom: 1px solid #eee;
  padding: 20px 20px;
  box-sizing: border-box;
  box-shadow: 0 1px 10px rgba(0,0,0, 0.5);
  .form-inline {
   height: 38px;
   .font-style {
     width: 200px;
   }
  }
}
</style>
