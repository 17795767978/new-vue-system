<template>
  <div class="login-log">
    <Search
      :isOrg='true'
      :isUser="true"
      :isDesc="true"
      :isIp="true"
      :isEmpty="true"
      :isDate="true"
      @configCheck="getSearch"
    />
    <div class="content">
      <div class="org">
        <Table :selectData="selectData"/>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/searchAlarm/'
import Table from './Components/table'
export default {
  name: 'loginLog',
  data () {
    return {
      selectData: {}
    }
  },
  components: {
    Search,
    Table
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    getSearch (data) {
      console.log(data)
      this.selectData = data
    }
  }
}
</script>

<style lang="scss" scoped>
.login-log {
  width: 100%;
  height: 75vh;
  .content {
    width: 100%;
    height: 71vh;
    padding: 2vh 2vw;
    box-sizing: border-box;
  }
}
</style>
