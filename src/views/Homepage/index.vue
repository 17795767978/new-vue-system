<template>
  <div class="dashboard-container cont-container">
    <el-row>
      <span class="main-title">大数据平台软件系统</span>
    </el-row>
    <el-row class="main-card" :gutter="50">
      <el-col style="margin-left: 50px;" :span="8">
        <h3 style="font-size: 20px;">运营监控</h3>
        <div class="tab-con">
        </div>
      </el-col>
      <el-col :span="7">
        <h3 style="font-size: 20px;">调度运营分析</h3>
        <div class="tab-ans">
          <el-row :gutter="24" style="margin-top: 20px;">
            <el-col :span="8" v-for="(item, index) in operationAnalysis" :key="index">
              <p style="text-align: center; font-size: 16px;">{{item.name}}</p>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="7">
        <el-card class="tab-ans" shadow="hover">
          <h3 style="font-size: 20px;">疲劳监测</h3>
          <el-row :gutter="24" style="margin-top: 20px;">
            <el-col :span="8" v-for="(item, index) in tiredContral" :key="index">
              <el-button class="ans-button" plain type="info">
                <i :class="item.icon" class="icon-item"></i>
              </el-button>
              <p style="text-align: center; font-size: 16px;">{{item.name}}</p>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Row, Col, Button, Card } from 'element-ui'
export default {
  name: 'Dashboard',
  data () {
    return {
      operationAnalysis: [
        { name: '客流高峰时刻分析', icon: 'el-icon-s-marketing' },
        { name: '车辆发车趟次时序图', icon: 'el-icon-sort-up' },
        { name: '区间满载率查询', icon: 'el-icon-document-checked' },
        { name: '线路站点登降量查询', icon: 'el-icon-folder-checked' },
        { name: '客流运力运量分析', icon: 'el-icon-s-unfold' },
        // { name: 'CAN总线数据实时监测', icon: 'el-icon-view' },
        // { name: '智能时刻表推荐', icon: 'el-icon-document-copy' },
        { name: '线路客流高峰断面分析', icon: 'el-icon-pie-chart' },
        // { name: '视频监控与报警中心', icon: 'el-icon-s-operation' },
        { name: '线路站间运行时间分析', icon: 'el-icon-time' }
      ],
      tiredContral: [
        { name: '报警中心', icon: 'el-icon-warning' },
        { name: '设备状态', icon: 'el-icon-s-management' },
        { name: '报警分析', icon: 'el-icon-data-analysis' },
        { name: '报警类型管理', icon: 'el-icon-s-grid' }
      ]
    }
  },
  components: {
    'el-row': Row,
    'el-col': Col,
    'el-button': Button,
    'el-card': Card
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container  {
  padding: 20px;
  box-sizing: border-box;
  .main-title {
    margin-top: 50px;
    font-size: 30px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-weight: bold;
    margin-bottom: 50px;
    margin-left: 50px;
    display: block;
  }
  .main-card {
    .tab-con {
      width: 500px;
      height: 400px;
      background-image: url(../../assets/images/yunying.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      color: #fff;
      background-color: #409EFF;
      .con-button {
        border: 3px solid #fff;
        display: block;
        margin: 0 auto;
        .icon  {
          font-size: 100px;
          color: #fff;
        }
      }
    }
    .tab-ans {
      width: 400px;
      height: 400px;
      color: #fff;
      background-color: #409EFF;
      .ans-button {
        border: 3px solid #fff;
        display: block;
        margin: 0 auto;
        .icon-item {
          font-size: 50px;
          color: #000;
        }
      }
    }
    .tab-ser {
      color: #fff;
      background: #E6A23C
    }
  }
}
</style>
