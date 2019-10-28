<template>
<div class="index1001">
        <lo-header @addEvent="addSucess"></lo-header>
        <data-sheetmain @addEvent="addSucess" :data="dataIndexAll.dataSourceAndAgentCount"></data-sheetmain>
        <data-manage :data="dataIndexAll.dataAudit"></data-manage>
        <authority-management @addEvent="addSucess" :data="dataIndexAll.dataSourceRelationDep"></authority-management>
</div>
</template>

<script>
import * as functionAll from "./datasource";
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
            this.getIndexData();
        },
        getIndexData() {
            functionAll.getIndexDataAll().then(res => {
                if (res.code == 200) {
                    this.dataIndexAll = res.data;
                }
            });
        }
    },
    // 获取首页数据
    created() {
        this.getIndexData();
    }
};
</script>

<style scoped>
.index1001{
    padding-left: 53px;
    padding-right: 53px;
}
</style>
