<template>
<div class="historyBatch">
    <div class="title">搜索条件</div>
    <el-row class="elRowdate">
        日期筛选: <el-date-picker size="small" v-model="datePickerValue" type="date" placeholder="跑批日期">
        </el-date-picker>
        <el-button type="primary" @click="search" size="small">搜索</el-button>
    </el-row>
    <div class="titles">历史信息</div>
    <el-row>
        <el-row class="span10">系统批量</el-row>
        <el-row class="span10">批量日期:{{this.dayDate}}</el-row>
        <ve-bar :data="chartData" :extend="chartExtend" :events="chartEvents"></ve-bar>
    </el-row>
    <el-row v-if="showOrhidden">
        <el-row class="span10">任务:{{this.task}}</el-row>
        <el-row class="span10">批量日期:{{this.dayDate}}</el-row>
        <ve-bar :data="chartdataHistoryDeatil" :settings="chartSettings" :extend="chartExtendDeatil" :events="chartEventsInfo"></ve-bar>
    </el-row>
</div>
</template>

<script>
import * as functionAll from "./historyBatch";
export default {
    data() {
        let self = this;
        this.chartSettings = {
            stack: {
                '任务': ['挂起', '等待', '运行', '暂停', '错误', '完成']
            }
        }
        this.chartExtend = {
            series: {
                barWidth: 10
            },
            color: ['#00a9a2'],
            tooltip: {
                formatter: function (param) {
                    self.chartData.rows.forEach((item => {
                        if (param[0].name == item.desc_sys) {
                            self.start = item.curr_st_time;
                            self.end = item.curr_end_time;
                        }
                    }))
                    return [
                        '系统名称：' + param[0].name + '<br/>',
                        '开始时间: ' + self.start + '<br/>',
                        '结束时间: ' + self.end + '<br/>',
                    ].join('');
                }
            },
            xAxis: {
                // name: '系统运行时间',
                // nameLocation: 'center',
                axisLabel: {
                    show: false
                }
            },
            useUTC: true,
            yAxis: {

            }
        }
        this.chartExtendDeatil = {
            series: {
                barWidth: 10
            }
        }
        // 获取对应任务详情
        this.chartEvents = {
            click: function (e) {
                self.task = e.name;
                self.showOrhidden = true;
                let value = self.changeParamas(e.name);
                // 获取数据
                self.searchMonitorHisBatchJobBySubCd(value, self.dayDate);
            }
        }
        // 获取任务详情信息
        this.chartEventsInfo = {
            click: function (e) {
                self.$emit('viewIn', '/historyJob', '历史作业');
                self.$router.push({
                    name: 'historyJob',
                    query: {
                        etl_job: e.name,
                        etl_sys_cd: self.$route.query.etl_sys_cd,
                        start_date: self.dayDate
                    }
                });
            }
        }
        return {
            datePickerValue: "",
            chartData: {
                columns: ['任务名称', '信息详情'],
                rows: []
            },
            chartdataHistoryDeatil: {
                columns: ['etl_job', '完成', '等待', '错误', '暂停', '运行', '挂起'],
                rows: []
            },
            start: '',
            end: '',
            dayDate: '',
            task: '',
            showOrhidden: false
        };

    },
    created() {
        this.monitorHistoryBatchInfo('2019-12-12')
    },
    methods: {
        // 获取历史批量详情
        monitorHistoryBatchInfo(val) {
            functionAll.monitorHistoryBatchInfo({
                etl_sys_cd: this.$route.query.etl_sys_cd,
                curr_bath_date: val
            }).then((res) => {
                this.dateToMill(res.data[0].curr_end_time)
                let that = this;
                res.data.forEach(item => {
                    item['信息详情'] = 1;
                    item['任务名称'] = item.desc_sys;
                    that.dayDate = item.curr_bath_date;
                })
                this.chartData.rows = res.data;
            })
        },
        // 获取日期对应数据和历史批量
        search() {
            let val = this.datePickerValue;
            if (val != null) {
                function changeData(num) {
                    return num > 9 ? (num + "") : ("0" + num);
                };
                let Date = (val.getFullYear() + '-' + changeData((val.getMonth() + 1)) + '-' + changeData(val.getDate()));
                this.monitorHistoryBatchInfo(Date)
            } else {
                this.chartData.rows = [];
            }
        },
        // 获取历史批量详情对应的数据
        searchMonitorHisBatchJobBySubCd(val, val2) {
            functionAll.searchMonitorHisBatchJobBySubCd({
                etl_sys_cd: this.$route.query.etl_sys_cd,
                sub_sys_cd: val,
                curr_bath_date: val2
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
                this.chartdataHistoryDeatil.rows = arr;
            })
        },
        // 改变传参
        changeParamas(val) {
            this.chartData.rows.forEach(item => {
                if (val == item.desc_sys) {
                    val = item.sub_sys_cd;
                }
            })
            return val;
        },
        // =====================
        dateToMill(date) {
            date = date.replace(new RegExp("-", "gm"), "/");
            date = (new Date(date)).getTime() + 8 * 60 * 60 * 1000; //得到毫秒数
            console.log(date, 'i am date');
            return date;
        }
    }
};
</script>

<style scoped>
.historyBatch .title {
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: 600;
}

.historyBatch .elRowdate {
    margin-top: 16px;
}

.historyBatch .titles {
    margin-top: 20px;
    font-weight: 600;
}

.historyBatch .span10 {
    text-align: center;
    margin-bottom: 10px;
}

.historyBatch .span10:first-child {
    margin-top: 10px;
    font-size: 20px;
}

.historyBatch .span10:nth-child(2) {
    font-size: 12px;
}

.historyBatch .el-button {
    margin-left: 12px;
}
</style>
