<template>
  <el-form :model="form" :rules="rules" ref="ruleForm">
    <el-form-item label="拍照分辨率" prop="pResolution">
      <el-select v-model="formData.pResolution" placeholder="请选择">
        <el-option label="高级" value="1"></el-option>
        <el-option label="中级" value="2"></el-option>
        <el-option label="低级" value="3"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="视频分辨率" prop="vResolution">
      <el-select v-model="formData.vResolution" placeholder="请选择">
        <el-option label="高级" value="1"></el-option>
        <el-option label="中级" value="2"></el-option>
        <el-option label="低级" value="3"></el-option>
      </el-select>
    </el-form-item>
    <el-tree
    :data="formTreeData"
    ref="tree"
    show-checkbox
    node-key="id"
    :default-checked-keys="formDefaultTreeData"
    :props="formDefaultProps">
  </el-tree>
  </el-form>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'deviceForm',
  props: {
    treeData: {
      type: Array
    },
    defaultProps: {
      type: Object
    },
    defaultTreeData: {
      type: Array
    },
    form: {
      type: Object
    }
  },
  data () {
    return {
      formData: {
        pResolution: '',
        vResolution: ''
      },
      activeName: 'DSM',
      trigger: 'change',
      rules: {
        pResolution: [
          { type: 'string', required: true, message: '请选择一个拍照分辨率', trigger: 'change' }
        ],
        vResolution: [
          { type: 'string', required: true, message: '请选择一个视频分辨率', trigger: 'change' }
        ]
      },
      dialogFormVisible: false,
      formTreeData: [],
      formDefaultProps: {
        children: 'children',
        label: 'label'
      },
      formDefaultTreeData: []
    }
  },
  components: {
  },
  created () {
    this.formData = Object.assign({}, this.form)
    this.formTreeData = Object.assign([], this.treeData)
    this.formDefaultTreeData = Object.assign([], this.defaultTreeData)
    this.formDefaultProps = Object.assign({}, this.defaultProps)
  },
  mounted () {
  },
  updated () {
    this.$refs['ruleForm'].clearValidate()
  },
  watch: {
  },
  methods: {
  }
}
</script>
