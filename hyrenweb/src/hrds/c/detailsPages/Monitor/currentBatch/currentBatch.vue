<template>
<div class="currentBatch">
    <el-row>
        <el-col :span="10">
            <el-row class="span10">批量运行状态</el-row>
            <el-row class="span10">批量日期:{{this.dayDate}}</el-row>
            <VeLine :data="chartdataChartOne" :extend="chartExtendChartOne"></VeLine>
        </el-col>
        <el-col :span="14">
            <el-row class="span10">系统运行状态</el-row>
            <el-row class="span10">批量日期:{{this.dayDate}}</el-row>
            <VeLine :data="chartdataChartTwo" :extend="chartExtendChartTwo" :settings="chartSettings" :events="chartEvents"></VeLine>
        </el-col>
    </el-row>
    <el-row v-if="false">
         <el-row class="span10">系统运行状态</el-row>
            <el-row class="span10">批量日期:{{this.dayDate}}</el-row>
            <VeLine :data="chartdataChartTwo" :extend="chartExtendChartTwo" :settings="chartSettings" :events="chartEvents"></VeLine>
        </el-col>
    </el-row>
</div>
</template>

<script>
import VeLine from 'v-charts/lib/histogram.common';
import * as functionAll from "./currentBatch";
export default {
    components: {
        VeLine
    },
    data() {
        this.chartSettings = {
            stack: {
                '任务': ['挂起', '等待', '运行', '暂停', '错误', '完成']
            }
        }
        let self = this
        this.chartEvents = {
            click: function (e) {

            }
        }
        return {
            chartdataChartOne: {
                columns: ['sub_sys_desc', '挂起', '等待', '运行', '暂停', '错误', '完成'],
                rows: []
            },
            chartdataChartTwo: {
                columns: ['sub_sys_desc', '挂起', '等待', '运行', '暂停', '错误', '完成'],
                rows: []
            },
            dayDate: '',
            valueTime: '',
            chartExtendChartOne: {
                series: {
                    //柱子宽度
                    barWidth: 15
                }
            },
            chartExtendChartTwo: {
                series: {
                    //柱子宽度
                    barWidth: 80
                }
            }
        };
    },
    mounted() {
        this.monitorCurrentBatchInfo();
    },
    methods: {
        // 当前批量情况获取
        monitorCurrentBatchInfo() {
            functionAll.monitorCurrentBatchInfo({
                etl_sys_cd: this.$route.query.etl_sys_cd
            }).then((res) => {
                res.data.systemOperationStatus.forEach(item => {
                    item['挂起'] = item.suspension;
                    item['等待'] = item.waiting;
                    item['运行'] = item.runing;
                    item['暂停'] = item.pending;
                    item['错误'] = item.error;
                    item['完成'] = item.done;
                })
                this.dayDate = res.data.curr_bath_date;
                // 系统运行状态
                this.chartdataChartTwo.rows = res.data.systemOperationStatus;
                // 批量运行状态
                this.chartdataChartOne.rows = res.data.systemOperationStatus;
            })
        },
        // 所有的图标信息
        monitorAllProjectChartsData() {
            functionAll.monitorAllProjectChartsData().then((res) => {

            })
        },
       
    }
};
</script>

<style scoped>
.currentBatch .span10 {
    text-align: center;
    margin-bottom: 10px;
}

.currentBatch .span10:first-child {
    font-size: 20px;
}

.currentBatch .span10:nth-child(2) {
    font-size: 12px;
}


</style>
