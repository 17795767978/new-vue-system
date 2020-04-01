<template>
  <div class="log-analysis">
    <div class="left-top">
      <dayLogCondition />
    </div>
    <div class="right-top">
      <CompanyCondition />
    </div>
    <div class="bottom">
      <PagesCondition />
    </div>
  </div>
</template>

<script>
import DayLogCondition from './Components/dayLogCondition'
import CompanyCondition from './Components/companyCondition'
import PagesCondition from './Components/pagesCondition'
export default {
  name: 'logAnalysis',
  components: {
    DayLogCondition,
    CompanyCondition,
    PagesCondition
  }
}
</script>

<style lang="scss" scoped>
.log-analysis {
  width: 95% !important;
  height: 85% !important;
  margin: 3% 2.5%;
  border: 1px solid #e5e5e5;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  .left-top {
    flex: 0 0 50%;
    height: 50%;
    border-right: 1px solid #e5e5e5;
    box-sizing: border-box;
  }
  .right-top {
    flex: 0 0 50%;
    height: 50%;
  }
  .bottom {
    flex: 0 0 100%;
    height: 50%;
    border-top: 1px solid #e5e5e5;
    box-sizing: border-box;
  }
}
</style>
