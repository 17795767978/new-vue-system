<template>
  <div style="width: 100%;height: 100%;">
    <mapChart
     :isHotMap="true"
     :isSearchLine="true"
     :isCarsDetail="true"
     :isLineMap="true"
     :isSelect="true"
     :isFlv="true"
    ></mapChart>
  </div>
</template>

<script>
import mapChart from '@/components/map/'
export default {
  components: {
    mapChart
  }
}
</script>

<style>

</style>
