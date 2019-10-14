<template>
  <div class="index1001">
    <el-container>
      <el-header height="50px">Header</el-header>
      <el-container>
        <el-aside width="50px">Aside</el-aside>
        <el-main>
          <lo-header @addEvent="addSucess"></lo-header>
          <data-sheetmain  @addEvent="addSucess" :data="dataIndexAll.dataSourceAndAgentCount"></data-sheetmain>
          <data-manage :data="dataIndexAll.dataAudit"></data-manage>
          <authority-management @addEvent="addSucess" :data="dataIndexAll.dataSourceRelationDep"></authority-management>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import * as functionAll from "@/hrds/api/b/loginNum1001/loginNum1001";
import Loheader from "./Loheader";
import dataSheetmain from "./dataSheetmain";
import dataManage from "./dataManage";
import authorityManagement from "./authorityManagement";

export default {
  name: "index1001",
  components: {
    "lo-header": Loheader,
    "data-sheetmain": dataSheetmain,
    "data-manage": dataManage,
    "authority-management": authorityManagement
  },
  data() {
    return {
      dataIndexAll: {}
    };
  },
  methods: {
    addSucess() {
      functionAll.getIndexDataAll().then(res => {
        if (res.code == 200) {
          this.dataIndexAll = res.data;
        }
      });
    }
  },
  // 获取首页数据
  created() {
    functionAll.getIndexDataAll().then(res => {
      if (res.code == 200) {
        this.dataIndexAll = res.data;
        console.log(res.data.dataSourceRelationDep)
      }
    });
  }
};
</script>

<style scoped>
.index1001 .el-header {
  background: #7cb1de;
}
.index1001 .el-aside {
  background: #7cb1de;
}
.index1001 .el-main {
  padding-left: 74px;
  padding-right: 74px;
}
</style>