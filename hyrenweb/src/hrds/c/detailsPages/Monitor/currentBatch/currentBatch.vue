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
    <el-row v-if="showOrhidden">
        <el-row class="span10">任务:{{this.task}}</el-row>
        <el-row class="span10">批量日期:{{this.dayDate}}</el-row>
        <ve-bar :data="chartdataChartThree" :extend="chartExtendChartThree" :settings="chartSettings" :events="chartEventsInfo"></ve-bar>
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
                self.task = e.name;
                self.showOrhidden = true;
                let id = self.changeParamas(e.name)
                self.searchMonitorJobStateBySubCd(id);
            }
        }
        this.chartEventsInfo = {
            click: function (e) {
                self.task = e.name;
                self.$emit('viewIn', '/currentJob','当前作业');
                self.$router.push({
                    name: 'currentJob',
                    query: {
                        etl_job: e.name,
                        etl_sys_cd: self.$route.query.etl_sys_cd
                    }
                });
            }
        }
        return {
            chartdataChartOne: {
                columns: ['sub_sys_desc', '挂起', '等待', '错误', '暂停', '运行', '完成'],
                rows: []
            },
            chartdataChartTwo: {
                columns: ['sub_sys_desc', '挂起', '等待', '错误', '暂停', '运行', '完成'],
                rows: []
            },
            chartdataChartThree: {
                columns: ['etl_job', '挂起', '等待', '错误', '暂停', '运行', '完成'],
                rows: []
            },
            dayDate: '',
            task: '',
            showOrhidden: false,
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
            },
            chartExtendChartThree: {
                series: {
                    //柱子宽度
                    barWidth: 10
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
                    item['挂起'] = item.pending;
                    item['等待'] = item.waiting;
                    item['运行'] = item.runing;
                    item['暂停'] = item.suspension;
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
        // 改变传参
        changeParamas(val) {
            this.chartdataChartTwo.rows.forEach(item => {
                if (val == item.sub_sys_desc) {
                    val = item.sub_sys_cd;
                }
            })
            return val;
        },
        // 监控当前系统运行任务下的作业信息
        searchMonitorJobStateBySubCd(val) {
            functionAll.searchMonitorJobStateBySubCd({
                etl_sys_cd: this.$route.query.etl_sys_cd,
                sub_sys_cd: val,
                curr_bath_date: this.dayDate
            }).then(res => {
                let arr = res.data;
                // 数组去重
                for (let i = 0; i < arr.length; i++) {
                    arr[i].count = 1
                    for (let j = i + 1; j < arr.length; j++) {
                        if (arr[i].etl_job == arr[j].etl_job) {
                            //第一个等同于第二个，splice方法删除第二个
                            arr[i].count++;
                            arr.splice(j, 1);
                            j--;
                        }
                    }
                }
                // 数据处理
                arr.forEach(item => {
                    if (item.job_disp_status == "D") {
                        item['完成'] = item.count;
                    } else if (item.job_disp_status == "E") {
                        item['错误'] = item.count;
                    } else if (item.job_disp_status == "P") {
                        item['挂起'] = item.count;
                    } else if (item.job_disp_status == "R") {
                        item['运行'] = item.count;
                    } else if (item.job_disp_status == "S") {
                        item['停止'] = item.count;
                    } else if (item.job_disp_status == "W") {
                        item['等待'] = item.count;
                    }
                })
                this.chartdataChartThree.rows = arr;

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
