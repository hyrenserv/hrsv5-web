<template>
<div class="systemResource">
    <el-row><span class="spanDeatil">系统资源情况</span></el-row>
    <el-row class="span10">系统资源</el-row>
    <el-row>
        <VeLine :data="chartdataChartOne" :extend="chartExtendChartOne"></VeLine>
    </el-row>
    <el-row>
        <span class="spanDeatil">系统当前占用资源</span>
        <el-row>
            <el-table stripe :data="departmentalList" border size="medium">
                <el-table-column prop="dep_name" label="资源类型" align="center"></el-table-column>
                <el-table-column prop="dep_name" label="系统名称" align="center"></el-table-column>
                <el-table-column prop="dep_name" label="作业名称	" align="center"></el-table-column>
                <el-table-column prop="dep_name" label="占用资源数" align="center"></el-table-column>
                <el-table-column prop="dep_name" label="开始时间" align="center"></el-table-column>
                <el-table-column label="状态" align="center" width="160">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="dialogFormVisibleUpdate = true;handleEdit(scope.$index, scope.row);">编辑</el-button>
                        <el-button size="mini" type="danger" @click="delteThisData(scope.row.dep_id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </el-row>
</div>
</template>

<script>
import VeLine from 'v-charts/lib/histogram.common';
import * as functionAll from "./systemResource";
export default {
    components: {
        VeLine
    },
    data() {
        return {
            chartdataChartOne: {
                columns: ['resource_type', '总资源', '空闲资源', '使用资源'],
                rows: []
            },
            chartExtendChartOne: {
                series: {
                    //柱子宽度
                    barWidth: 50,
                    label: {
                        show: true,
                        position: "top"
                    }
                }
            },
        };

    },
    mounted() {
        this.monitorSystemResourceInfo();
    },
    methods: {
        monitorSystemResourceInfo() {
            functionAll.monitorSystemResourceInfo({
                etl_sys_cd: this.$route.query.etl_sys_cd
            }).then((res) => {
                res.data.etlResourceList.forEach((item) => {
                    item['总资源'] = item.resource_max;
                    item['空闲资源'] = item.free;
                    item['使用资源'] = item.resource_used
                })
                this.chartdataChartOne.rows = res.data.etlResourceList;
            })
        },
    }

};
</script>

<style scoped>
.systemResource .span10 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 20px;
}

.systemResource .spanDeatil {
    display: inline-block;
    margin-bottom: 16px;
}
</style>
