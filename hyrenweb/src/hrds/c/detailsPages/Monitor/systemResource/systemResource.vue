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
                <el-table-column prop="resource_type" label="资源类型" align="center"></el-table-column>
                <el-table-column prop="sub_sys_cd" label="系统名称" align="center"></el-table-column>
                <el-table-column prop="etl_job" label="作业名称	" align="center"></el-table-column>
                <el-table-column prop="resource_req" label="占用资源数" align="center"></el-table-column>
                <el-table-column prop="curr_st_time" label="开始时间" align="center"></el-table-column>
                <el-table-column prop="job_disp_status" label="状态" align="center"></el-table-column>
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
            departmentalList: [],
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
                let arr = res.data.jobRunList;
                arr.forEach(item => {
                    if (item.job_disp_status == "D") {
                        item.job_disp_status = '完成';
                    } else if (item.job_disp_status == "E") {
                        item.job_disp_status = '错误';
                    } else if (item.job_disp_status == "P") {
                        item.job_disp_status = '挂起';
                    } else if (item.job_disp_status == "R") {
                        item.job_disp_status = '运行';
                    } else if (item.job_disp_status == "S") {
                        item.job_disp_status = '停止';
                    } else if (item.job_disp_status == "W") {
                        item.job_disp_status = '等待';
                    }
                });
                this.departmentalList = arr;
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
