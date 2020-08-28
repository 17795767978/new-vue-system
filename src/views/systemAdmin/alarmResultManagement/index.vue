<template>
  <div class="alarm-result">
    <div class="table-wrapper">
      <tableWrapper></tableWrapper>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import tableWrapper from './Components/content'
// import mixinsTime from '@/mixins/global/'
// import moment from 'moment';
export default {
  name: 'alarmResult',
  // mixins: [mixinsTime],
  data () {
    return {
    }
  },
  components: {
    tableWrapper
  },
  mounted () {
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.table-wrapper {
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
}
</style>
