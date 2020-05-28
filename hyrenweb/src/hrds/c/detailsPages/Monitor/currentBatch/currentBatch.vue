<template>
<div class="currentBatch">
    <el-row>
        <el-col :span="8">
            <el-row class="span10">批量运行状态</el-row>
            <el-row class="span10">批量日期:{{this.dayDate}}</el-row>
            <div id="leftChart" style="width: 100%;height:400px;"></div>
        </el-col>
        <el-col :span="16">
            <el-row class="span10">系统运行状态</el-row>
            <el-row class="span10">批量日期:{{this.dayDate}}</el-row>
            <div id="rightChart" style="width: 100%;height:400px;"></div>
        </el-col>
    </el-row>
    <el-row v-if="showOrhidden">
        <el-row class="span10">任务:{{this.task}}</el-row>
        <el-row class="span10">批量日期:{{this.dayDate}}</el-row>
    </el-row>
    <highcharts v-show="showOrhidden" :options="chartOptions"></highcharts>

</div>
</template>

<script>
import * as functionAll from "./currentBatch";
import Highcahrts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(Highcahrts);
import {
    Chart
} from 'highcharts-vue'
import * as fixedAll from "@/utils/js/fileOperations";
export default {
    components: {
        highcharts: Chart
    },
    data() {
        return {
            dayDate: '',
            task: '',
            batchState: {},
            sysState: [],
            showOrhidden: false,
            chartOptions: {
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
            },
            timer: ''
        };
    },
    mounted() {
        this.monitorCurrentBatchInfo();
        this.monitorCurrentBatchInfoByTask();
        this.setFor();
    },
    beforeDestroy() {
        // 关闭定时器
        clearInterval(this.timer);
    },
    methods: {
        // 轮询
        setFor() {
            let that = this;
            this.timer = setInterval(() => {
                setTimeout(() => {
                    that.monitorCurrentBatchInfo();
                    that.monitorCurrentBatchInfoByTask();
                }, 0);
            }, 10000);
        },
        // 系统运行状态数据
        monitorCurrentBatchInfo() {
            functionAll.monitorCurrentBatchInfo({
                etl_sys_cd: this.$route.query.etl_sys_cd
            }).then((res) => {
                let that = this;
                this.batchState = res.data;
                this.dayDate = fixedAll.dateFormat(res.data.curr_bath_date);
                let chart = Highcahrts.chart('leftChart', {
                    chart: {
                        type: 'column',
                    },
                    credits: {
                        enabled: false
                    },
                    exporting: {
                        enabled: false
                    },
                    legend: {
                        enabled: false
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: ['挂起', '等待', '运行', '暂停', '错误', '完成']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: '<div class="EdbeSubTitle">' + '作业数量' + '<div/>'
                        },
                        labels: {
                            formatter: function () {
                                return this.value;
                            }
                        },
                        gridLineWidth: 1,
                        gridLineColor: 'gray'
                    },
                    tooltip: {
                        crosshairs: true,
                        pointFormat: '<span style="color:{series.color}">{series.name}</span>：' +
                            '<b>{point.y}</b>',
                    },
                    plotOptions: {
                        column: {
                            animation: false,
                            dataLabels: {
                                enabled: true,
                                formatter: function () {
                                    return this.y;
                                }
                            },
                            colorByPoint: true
                        }
                    },
                    series: [{
                        name: '作业数量',
                        data: [{
                                y: parseInt(this.batchState.pending),
                                color: "#90B1D8"
                            },
                            {
                                y: parseInt(this.batchState.waiting),
                                color: "#00FFFF"
                            },
                            {
                                y: parseInt(this.batchState.runing),
                                color: "#90EE7E"
                            },
                            {
                                y: parseInt(this.batchState.suspension),
                                color: "#F7A35C"
                            },
                            {
                                y: parseInt(this.batchState.error),
                                color: "#FF7474"
                            },
                            {
                                y: parseInt(this.batchState.done),
                                color: "#2B908F"
                            }
                        ]
                    }]
                })
            })
        },
        // 监控当前批量状态
        monitorCurrentBatchInfoByTask() {
            functionAll.monitorCurrentBatchInfoByTask({
                etl_sys_cd: this.$route.query.etl_sys_cd
            }).then((res) => {
                this.sysState = res.data;
                let sub_sys_cd = [];
                let name = [];
                let runingNum = [];
                let doneNum = [];
                let errorNum = [];
                let pendingNum = [];
                let waitingNum = [];
                let suspensionNum = [];
                for (let i in this.sysState) {
                    sub_sys_cd.push(this.sysState[i].sub_sys_cd);
                    name.push(this.sysState[i].sub_sys_desc);
                    runingNum.push(parseInt(this.sysState[i].runing));
                    doneNum.push(parseInt(this.sysState[i].done));
                    errorNum.push(parseInt(this.sysState[i].error));
                    pendingNum.push(parseInt(this.sysState[i].pending));
                    waitingNum.push(parseInt(this.sysState[i].waiting));
                    suspensionNum.push(parseInt(this.sysState[i].suspension));
                }
                let that = this;
                let chart = Highcahrts.chart('rightChart', {
                    chart: {
                        type: 'column'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: ''
                    },
                    exporting: {
                        enabled: false
                    },
                    xAxis: {
                        title: {
                            text: this.value,
                        },
                        categories: name,
                        labels: {
                            rotation: -45,
                            formatter: function () {
                                var val;
                                if (this.value.length > 8) {
                                    val = this.value.substring(0, 6) + '...'
                                } else {
                                    val = this.value
                                }
                                return val;
                            }
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: ''
                        }
                    },
                    tooltip: {
                        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                        shared: true,
                        followPointer: true,
                        crosshairs: true
                    },
                    plotOptions: {
                        column: {
                            animation: false,
                            plotOptions: true,
                            enableMouseTracking: true,
                            stacking: 'percent',
                            events: {
                                click: function (event) {
                                    that.task = event.point.category;
                                    let id = that.changeParamas(event.point.category)
                                    that.searchMonitorJobStateBySubCd(id);
                                }
                            }
                        }
                    },
                    series: [{
                        name: '挂起',
                        color: "#90B1D8",
                        data: pendingNum
                    }, {
                        name: '等待',
                        color: "#00FFFF",
                        data: waitingNum
                    }, {
                        name: '运行',
                        color: "#90EE7E",
                        data: runingNum
                    }, {
                        name: '暂停',
                        color: "#F7A35C",
                        data: suspensionNum
                    }, {
                        name: '错误',
                        color: "#FF7474",
                        data: errorNum
                    }, {
                        name: '完成',
                        color: "#2B908F",
                        data: doneNum
                    }]
                })

            })
        },

        // 改变传参
        changeParamas(val) {
            this.sysState.forEach(item => {
                if (val == item.sub_sys_desc) {
                    val = item.sub_sys_cd;
                }
            })
            return val;
        },
        // 监控当前系统运行任务下的作业信息
        searchMonitorJobStateBySubCd(val) {
            let that = this;
            functionAll.searchMonitorJobStateBySubCd({
                etl_sys_cd: this.$route.query.etl_sys_cd,
                sub_sys_cd: val,
                curr_bath_date: this.dayDate.replace(/-/g, "")
            }).then(res => {
                if (res && res.success) {
                    // 数据处理成图标需要的格式
                    let time = [];
                    let colorsArray = [];
                    let sysName = [];
                    let status = [];
                    let startTime = [];
                    let endTime = [];
                    let start = 0;
                    let end = 0;
                    let arry = res.data;
                    let height = 140 + arry.length * 30;
                    let date = new Date().valueOf() + 8 * 60 * 60 * 1000;
                    for (let index = 0; index < arry.length; index++) {
                        sysName[index] = arry[index].etl_job;
                        status[index] = arry[index].job_disp_status;
                        let curr_st_time = arry[index]['curr_st_time']
                        let curr_end_time = arry[index]['curr_end_time']
                        // 挂起：
                        if (arry[index]['job_disp_status'] == "P") {
                            colorsArray[index] = '#90B1D8';
                            start = date;
                            end = date;
                        }
                        // 等待
                        if (arry[index]['job_disp_status'] == "W") {
                            colorsArray[index] = '#00FFFF';
                            start = date;
                            end = date;
                        }
                        // 暂停
                        if (arry[index]['job_disp_status'] == "S") {
                            colorsArray[index] = '#F7A35C';
                            startTime[index] = this.dateToMill(curr_st_time);
                            endTime[index] = this.dateToMill(curr_end_time);
                            start = startTime[index];
                            end = start;
                        }

                        // 错误
                        if (arry[index]['job_disp_status'] == "E") {
                            colorsArray[index] = '#FF7474';
                            startTime[index] = this.dateToMill(curr_st_time);
                            endTime[index] = this.dateToMill(curr_end_time);
                            start = startTime[index];
                            end = start;
                        }
                        // 运行时长：
                        if (arry[index]['job_disp_status'] == "R") {
                            colorsArray[index] = '#90EE7E';
                            startTime[index] = this.dateToMill(curr_st_time);
                            start = startTime[index];
                            end = date;
                        }
                        // 完成
                        if (arry[index]['job_disp_status'] == "D") {
                            startTime[index] = (this.dateToMill(curr_st_time));
                            endTime[index] = (this.dateToMill(curr_end_time));
                            colorsArray[index] = '#2B908F';
                            // 是否虚拟作业
                            if (startTime[index] > endTime[index]) {
                                startTime[index] = endTime[index];
                            }
                            start = startTime[index];
                            end = endTime[index];
                        }
                        time[index] = [start, end];
                        let that = this;
                        this.chartOptions = {
                            // 数据提示框
                            tooltip: {
                                crosshairs: true,
                                useHTML: true,
                                formatter: function () {
                                    var index = 0;
                                    for (var i = 0; i < sysName.length; i++) {
                                        if (this.x == sysName[i]) {
                                            index = i;
                                            var start = Highcahrts.dateFormat('%Y-%m-%d %H:%M:%S', startTime[index]);
                                            var end = Highcahrts.dateFormat('%Y-%m-%d %H:%M:%S', endTime[index]);
                                            if (status[index] == "P") {
                                                return this.x + '<br/>' + '状态' + ':' + '挂起';
                                            } else if (status[index] == "W") {
                                                return this.x + '<br/>' + '状态' + ':' + '等待';
                                            } else if (status[index] == "S") {
                                                return this.x + '<br/>' + '状态' + ':' + '暂停' + '<br/>' + '开始时间' + start + '<br/>' + '结束时间' + end;
                                            } else if (status[index] == "E") {
                                                return this.x + '<br/>' + '状态' + ':' + '错误' + '<br/>' + '开始时间' + start + '<br/>' + '结束时间' + end;
                                            } else if (status[index] == "D") {
                                                return this.x + '<br/>' + '状态' + ':' + '完成' + '<br/>' + '开始时间' + start + '<br/>' + '结束时间' + end;
                                            } else if (status[index] == "R") {
                                                return this.x + '<br/>' + '状态' + ':' + '运行' + '<br/>' + '开始时间' + start + '<br/>' + '至' +
                                                    Highcahrts.dateFormat('%Y-%m-%d %H:%M:%S', new Date().getTime() + 8 * 60 * 60 * 1000);
                                            }
                                        }

                                    }
                                }
                            },
                            chart: {
                                type: 'columnrange',
                                inverted: true,
                                height: height
                            },
                            credits: {
                                enabled: false
                            },
                            title: {
                                text: ''
                            },
                            exporting: {
                                enabled: false
                            },
                            xAxis: {
                                categories: sysName,
                                tickColor: 'gray',
                                gridLineWidth: 1,
                                gridLineColor: 'gray',
                                tickmarkPlacement: 'on',
                            },
                            yAxis: {
                                type: 'datetime',
                                title: {
                                    text: ''
                                },
                                gridLineWidth: 0,
                                labels: {
                                    rotation: -45,
                                    overflow: 'justify',
                                    useHTML: true,
                                    formatter: function () {
                                        var date = new Date(this.value);
                                        var hours = date.getUTCHours();
                                        var minutes = date.getUTCMinutes();
                                        var seconds = date.getUTCSeconds();
                                        if (this.isFirst) {
                                            return '<div class="EdbeSubTitle">' + Highcahrts.dateFormat('%m-%d %H:%M', this.value) + '<div/>';
                                        } else if (hours == 0 && minutes == 0 && seconds == 0) {
                                            return '<div class="EdbeSubTitle">' + Highcahrts.dateFormat('%m-%d %H:%M', this.value) + '<div/>';
                                        } else {
                                            return '<div class="EdbeSubTitle">' + Highcahrts.dateFormat('%H:%M:%S', this.value) + '<div/>';
                                        }
                                    }
                                }
                            },
                            // 数据点
                            plotOptions: {
                                columnrange: {
                                    colorByPoint: true,
                                    pointPadding: 1,
                                    borderWidth: 0,
                                    pointWidth: 8,
                                    showCheckbox: true
                                },
                                series: {
                                    minPointLength: 15,
                                    cursor: 'pointer',
                                    point: {
                                        events: {
                                            plotOptions: true,
                                            enableMouseTracking: true,
                                            click: function () {
                                                let etlJobName = this.category;
                                                that.$emit('viewIn', '/currentJob', '当前作业');
                                                that.$router.push({
                                                    name: 'currentJob',
                                                    query: {
                                                        etl_job: etlJobName,
                                                        etl_sys_cd: that.$route.query.etl_sys_cd,
                                                        name: '/currentJob',
                                                        dec: that.$Base64.encode('当前作业')
                                                    }
                                                });
                                            }
                                        }
                                    }
                                },
                            },
                            // 图例
                            legend: {
                                enabled: false,
                            },
                            series: [{
                                data: time,
                                colors: colorsArray
                            }]

                        }
                    }
                    this.showOrhidden = true;
                }
            })
        },
        // 毫秒数
        dateToMill(date) {
            date = date.replace(/\s*/g, "");
            let year = date.substring(0, 4);
            let month = date.substring(4, 6);
            let day = date.substring(6, 8);
            let timeh = date.substring(8, 10);
            let timem = date.substring(10, 12)
            let times = date.substring(12, 14)
            let dates = year + "-" + month + "-" + day + " " + timeh + ":" + timem + ":" + times;
            date = dates;
            date = (new Date(date)).getTime() + 8 * 60 * 60 * 1000; //得到毫秒数
            return date;
        },
        edwColor(arry) {
            var color = ['#c23531', '#90EE7E', '#19d4ae'];
            if (typeof (arry) == "string") {
                if (arry == "E") {
                    return color[0];
                    //除了错误和已完成其余都是一个颜色
                } else if (arry == "R") {
                    return color[1];
                } else if (arry == "W") {
                    return color[1];
                } else if (arry == "P") {
                    return color[1];
                } else if (arry == "S") {
                    return color[1];
                } else if (arry == "D") {
                    return color[2];
                }
            }
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
