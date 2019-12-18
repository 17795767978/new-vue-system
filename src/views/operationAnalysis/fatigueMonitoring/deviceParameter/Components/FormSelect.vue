<template>
    <el-form-item :label="label" :prop="prop" :rules="rules">
      <el-select v-model="myValue" :placeholder="placeholder" @change="change">
        <el-option v-for="item in selectData" :key="item.id" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'deviceForm',
  props: {
    selectData: {
      type: Array
    },
    prop: {
      type: String
    },
    placeholder: {
      type: String
    },
    label: {
      type: String
    },
    value: {
      type: String
    },
    rules: [Object, Array]
  },
  data () {
    return {
      myValue: ''
    }
  },
  components: {
  },
  created () {
  },
  mounted () {
    this.myValue = this.value
  },
  watch: {
  },
  methods: {
    change () {
      this.$emit('input', this.myValue)
    }
  }
}
</script>
