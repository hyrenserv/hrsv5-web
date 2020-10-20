<template>
<div class='dataDashboardList'>
    <el-row class="elRows">
        <span>自主分析->数据仪表盘</span>
        <el-button type="primary" size='mini' class='creatPanelBtn' @click="creatPanel()">新建仪表盘</el-button>
    </el-row>
    <el-table size='medium' :data="dataDashboardList" border style="width: 100%;">
        <el-table-column label="序号" type="index" width="50" align="left"></el-table-column>
        <el-table-column label="仪表板名称" prop='dashboard_name' align="left" show-overflow-tooltip></el-table-column>
        <el-table-column label="仪表板描述" prop='dashboard_desc' align="left" show-overflow-tooltip></el-table-column>
        <el-table-column label="仪表盘发布状态" prop='dashboard_status' width="120px" align="left"></el-table-column>
        <el-table-column label="创建日期" prop='create_date' align="left"></el-table-column>
        <el-table-column label="最后更新日期" prop='last_update_date' align="left"></el-table-column>
        <el-table-column label="操作" align="left">
            <template slot-scope="scope">
                <el-button type="text" @click="releaseDashboardInfo(scope.row)">发布</el-button>
                <el-button type="text" @click="goToDashbaord(scope.row)">编辑</el-button>
                <el-button type="text" @click="deleteDashboardInfo(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import * as functionAll from "./dataDashboard";
import * as fixedAll from "@/utils/js/fileOperations";
export default {
    data() {
        return {
            dataDashboardList: [],
            options: [],
        }
    },
    mounted() {
        this.getCategoryItems();
        this.getDataDashboardInfo();
    },
    methods: {
        creatPanel() {
            this.$router.push({
                path: '/dataDashboard',
                query: {}
            })
        },
        // 获取代码项
        getCategoryItems() {
            functionAll.getCategoryItems({
                category: 'IsFlag'
            }).then(res => {
                this.options = res.data;
            })
        },
        //获取数据仪表盘首页数据展示
        getDataDashboardInfo() {
            functionAll.getDataDashboardInfo({}).then(res => {
                if (res && res.success) {
                    res.data.forEach(item => {
                        if (item.create_date && item.create_time) {
                            item.create_date = fixedAll.dateToMilldate(item.create_date + " " + item.create_time);
                        }
                        if (item.last_update_date && item.last_update_time) {
                            item.last_update_date = fixedAll.dateToMilldate(item.last_update_date + " " + item.last_update_time);
                        }
                        this.options.forEach(val => {
                            if (item.dashboard_status == val.code) {
                                item.dashboard_status = val.value;
                            }
                        })
                    })
                    this.dataDashboardList = res.data;
                }
            })
        },
        //数据仪表盘发布
        releaseDashboardInfo(row) {
            this.$confirm('确认发布仪表盘(' + row.dashboard_name + ')吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                functionAll.releaseDashboardInfo({
                    "dashboard_id": row.dashboard_id,
                    "dashboard_name": row.dashboard_name
                }).then(res => {
                    if (res && res.success) {
                        this.$Msg.customizTitle('发布成功，请到接口管理组件中配置权限', 'success');
                        this.getCategoryItems();
                        this.getDataDashboardInfo();
                    }
                })
            })
        },
        // 跳转仪表盘页面
        goToDashbaord(row) {
            this.$router.push({
                name: 'dataDashboard',
                query: {
                    dashboard_id: row.dashboard_id,
                    dashboard_name: row.dashboard_name
                }
            })
        },
        //数据仪表盘删除
        deleteDashboardInfo(row) {
            this.$confirm('确认删除仪表盘(' + row.dashboard_name + ')吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                functionAll.deleteDashboardInfo({
                    "dashboard_id": row.dashboard_id
                }).then(res => {
                    if (res && res.success) {
                        this.$Msg.customizTitle('删除成功', 'success');
                        this.getCategoryItems();
                        this.getDataDashboardInfo();
                    }
                })
            })
        },
    }
}
</script>

<style scoped>
.creatPanelBtn {
    float: right;
    margin: 0 10px 10px 0;
}
.elRows {
    height: 40px;
    line-height: 40px;
    width: 100%;
}
.el-row span {
    color: #2196f3;
    font-size: 18px;
}
.el-table-column{
    height: 49px;
}
</style>
