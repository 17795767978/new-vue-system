<template>
  <div>
    <el-dialog :title="title" :visible.sync="isvisited">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isvisited = false">取 消</el-button>
        <el-button type="primary" @click="isvisited = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    parentsList: {
      type: Array
    }
  },
  inject: ['isAdd'],
  data () {
    return {
      isvisited: false,
      form: {
        name: '',
        region: '',
        formLabelWidth: '200px'
      }
    }
  },
  mounted () {
    console.log(this.isAdd)
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
</style>
