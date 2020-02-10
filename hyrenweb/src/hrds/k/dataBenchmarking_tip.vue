<template>
<div>
    <el-row><h4 class='el-icon-s-home' style='color: #2196f3;
    line-height: 30px;
    margin-top: 20px;
    padding-bottom: 10px;font-size: 18px;'>标准元管理</h4></el-row>
    <el-tabs type="border-card">
  <el-tab-pane label="基础信息">
      <BasicInformation></BasicInformation>
  </el-tab-pane>
  <el-tab-pane label="代码配置">
      <CodeConfiguration></CodeConfiguration>
  </el-tab-pane>
  <el-tab-pane label="标准分类配置">1112
      <StandardClassConfiguration></StandardClassConfiguration>
  </el-tab-pane>
</el-tabs>
</div>
    
</template>
<script>
import BasicInformation from "./dataBenchmarking_tip01";
import CodeConfiguration from "./dataBenchmarking_tip02";
import StandardClassConfiguration from "./dataBenchmarking_tip03";
export default {
    name:'dataBenchmarking_tip',
     components: {
        "BasicInformation": BasicInformation,
        "CodeConfiguration": CodeConfiguration,
        "StandardClassConfiguration": StandardClassConfiguration,
    },
}
</script>
<style scoped>

</style>