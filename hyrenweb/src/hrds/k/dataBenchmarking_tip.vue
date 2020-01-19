<template>
    <el-tabs type="border-card">
  <el-tab-pane label="基础信息">
      <BasicInformation></BasicInformation>
  </el-tab-pane>
  <el-tab-pane label="代码配置">
      <CodeConfiguration></CodeConfiguration>
  </el-tab-pane>
  <el-tab-pane label="标准分类配置">
      <StandardClassConfiguration></StandardClassConfiguration>
  </el-tab-pane>
</el-tabs>
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