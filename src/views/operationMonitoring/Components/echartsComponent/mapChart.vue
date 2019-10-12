<template>
  <div style="width: 100%;height: 100%;">
    <mapChart
     :isHotMap="false"
     :isSearchLine="true"
     :isCarsDetail="true"
     :isLineMap="false"
     :isSelect="false"
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
