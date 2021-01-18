<template>
    <div class="cellView-container">
        <span class="cellView-title" :class="skinType === 0 ? 'whiteSkin-title' : 'blackSkin-title'">{{cellData.name}}</span>
        <div :style="{height: cellData.allCol === false ? '100px': ''}">
            <!-- <table v-if="cellData.allCol === true">
                <tr v-for="(item, index) in colors" :key="index">
                   <td :style="{ backgroundColor: tdData, borderRadius: '6px' }" v-for="(tdData, tdIndex) in item" :key="tdIndex"></td>
                </tr>
            </table> -->
            <table class="dataTable">
                <tr v-for="(item, index) in cellTrData" :key="index">
                    <td :style="{ backgroundColor: tdData.bgColor, width: tdData.width ? `${tdData.width}px`: '', borderRadius: '6px' }" :colspan="tdData.colspan" class="blackSkinTd"  v-for="(tdData, tdIndex) in item" :key="tdIndex">
                        <div :style="{ backgroundColor: tdData.bgColor, width: tdData.width ? `${tdData.width}px` : '100%', borderRadius: '6px' }" @click="toPage(tdData)">
                            <img :src="tdData.icon"/>
                            {{tdData.name}}
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>

/**
 * @description 宫格样式组件
 * @method plumLi
 * @date 2020/03/23
 */
export default {
  name: 'CellView',
  props: {
    cellData: Object,
    skinType: Number
  },
  methods: {
    toPage (data) {
      this.$emit('onChangeCard', data)
    }
  },
  mounted () {
    this.cellTrData = this.cellData.child
  },
  data () {
    return {
      cellTrData: [],
      noData: [],
      colors: [
        [
          '#8CC600',
          '#3389E1',
          '#009CAD',
          '#A5039B'
        ], [
          '#00A500',
          '#009CAD',
          '#ED8307',
          '#0A59BF'
        ], [

          '#8CC600',
          '#3389E1',
          '#009CAD',
          '#A5039B'
        ], [
          '#00A500',
          '#009CAD',
          '#ED8307',
          '#0A59BF'
        ], [
          '#8CC600',
          '#3389E1',
          '#009CAD',
          '#A5039B'
        ]
      ]
    }
  }
}
</script>
<style scoped>
    /* .cellView-container {
        width: 30%;
    } */
    .cellView-title {
        margin-left: 10px;
        font-size: 1vw;
        font-weight: bold;
        margin-bottom: 6px;
    }
    .blackSkin-title {
       color: #ffffff;
    }
    .whiteSkin-title {
       color: #000000;
    }
    .cellView-container table {
        border-spacing: 20px;
        margin-top: 20px;
    }
    .cellView-container table tr td {
        width: 130px;
        height: 78px;
        position: relative;
    }
    .cellView-container table tr td div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        justify-content: center;
        font-size: 12px;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        transition: .3s cubic-bezier(.5,0,0,1.3);
    }
    .cellView-container .dataTable>tr>td>div:hover {
        z-index: 3000;
        transform: scale(1.2);
        box-shadow: 0 0 10px 2px rgba(0,0,0,.4);
        opacity: 1;
         cursor: pointer;
    }
    .cellView-container table tr td img {
        width: 50px;
        padding-bottom: 4px;
    }
    .cellView-container table tr td.blackSkinTd {
        color: #ffffff;
    }
    /* .cellView-container div {
        width: 510px;
        height: 442px;
        position: relative;
    } */
    /* .cellView-container div table:nth-child(1) {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
    } */
    /* .cellView-container div table:nth-child(2) {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 200;
    } */
</style>
