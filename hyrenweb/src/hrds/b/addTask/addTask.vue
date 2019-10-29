<template>
  <div>
    <el-steps :active="active" finish-status="success" align-center style="margin: 15px 0;">
      <el-step title="步骤 1" description="配置源DB属性"></el-step>
      <el-step title="步骤 2" description="定义表抽取属性"></el-step>
      <el-step title="步骤 3" description="定义清洗规则"></el-step>
      <el-step title="步骤 4" description="定义卸数文件"></el-step>
      <el-step title="步骤 5" description="定义存储目的地"></el-step>
      <el-step title="步骤 6" description="定义启动方式"></el-step>
    </el-steps>
    <div>
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="数据采集" name="first">
            <dataAcquisition></dataAcquisition>
        </el-tab-pane>
        <el-tab-pane label="贴源登记" name="second">
            <sourceRegistration></sourceRegistration>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-button style="margin-top: 12px;margin-top: 12px;float: right;margin: 15px;" @click="next">下一步</el-button>
  </div>
</template>
<script>
import dataAcquisition from './dataAcquisition'
import sourceRegistration from './sourceRegistration'
export default {
    components:{
     'dataAcquisition':dataAcquisition,
     'sourceRegistration':sourceRegistration
    },
  data() {
    return {
      active: 0,
      activeName: "first"
    };
  },

  methods: {
    next() {
      if (this.active++ > 4) this.active = 0;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style scoped>
</style>