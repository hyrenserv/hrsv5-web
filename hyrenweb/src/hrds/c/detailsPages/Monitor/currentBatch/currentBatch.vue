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
    </el-row>
    <div id="container" :style="{width: '100%', height: 'auto'}"></div>

</div>
</template>

<script>
import VeLine from 'v-charts/lib/histogram.common';
import * as functionAll from "./currentBatch";
import Highcahrts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(Highcahrts);
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
        let self = this;
        this.chartEvents = {
            click: function (e) {
                self.task = e.name;
                self.showOrhidden = true;
                let id = self.changeParamas(e.name)
                self.searchMonitorJobStateBySubCd(id);
            }
        }
        return {
            chartdataChartOne: {
                columns: ['sub_sys_desc', '完成', '等待', '错误', '暂停', '运行', '挂起'],
                rows: []
            },
            chartdataChartTwo: {
                columns: ['sub_sys_desc', '完成', '等待', '错误', '暂停', '运行', '挂起'],
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
            let that = this;
            functionAll.searchMonitorJobStateBySubCd({
                etl_sys_cd: this.$route.query.etl_sys_cd,
                sub_sys_cd: val,
                curr_bath_date: this.dayDate
            }).then(res => {
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
                let date = new Date().valueOf() + 8 * 60 * 60 * 1000;
                for (let index = 0; index < arry.length; index++) {
                    sysName[index] = arry[index].etl_job;
                    status[index] = arry[index].job_disp_status;
                    let curr_st_time = arry[index]['curr_st_time']
                    let curr_end_time = arry[index]['curr_end_time']
                    // 挂起：
                    if (arry[index]['job_disp_status'] == "P") {
                        colorsArray[index] = '#c4b4e4';
                        start = date;
                        end = date;
                    }
                    // 等待
                    if (arry[index]['job_disp_status'] == "W") {
                        colorsArray[index] = '#5ab1ef';
                        start = date;
                        end = date;
                    }
                    // 暂停
                    if (arry[index]['job_disp_status'] == "S") {
                        colorsArray[index] = '#ffb980';
                        startTime[index] = this.dateToMill(curr_st_time);
                        endTime[index] = this.dateToMill(curr_end_time);
                        start = startTime[index];
                        end = start;
                    }

                    // 错误
                    if (arry[index]['job_disp_status'] == "E") {
                        colorsArray[index] = '#c23531';
                        startTime[index] = this.dateToMill(curr_st_time);
                        endTime[index] = this.dateToMill(curr_end_time);
                        start = startTime[index];
                        end = start;
                    }
                    // 运行时长：
                    if (arry[index]['job_disp_status'] == "R") {
                        colorsArray[index] = '#0067a6';
                        startTime[index] = this.dateToMill(curr_st_time);
                        start = startTime[index];
                        end = date;
                    }
                    // 完成
                    if (arry[index]['job_disp_status'] == "D") {
                        startTime[index] = (this.dateToMill(curr_st_time));
                        endTime[index] = (this.dateToMill(curr_end_time));
                        colorsArray[index] = '#19d4ae';
                        // 是否虚拟作业
                        if (startTime[index] > endTime[index]) {
                            startTime[index] = endTime[index];
                        }
                        start = startTime[index];
                        end = endTime[index];
                    }
                    time[index] = [start, end];
                    this.getChartInfo(sysName,startTime,status,endTime,time,colorsArray);
                }

            })
        },
        // 获得图表信息
        getChartInfo(sysName,startTime,status,endTime,time,colorsArray) {
            let that = this;
            var chart = Highcahrts.chart('container', {
                chart: {
                    type: 'columnrange',
                    inverted: true,
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
                    tickmarkPlacement: 'on'
                },
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
                                    return this.x + '<br/>' + '状态' + ':' + '挂机' + '<br/>' + '开始时间' + '<br/>' + '结束时间';
                                } else if (status[index] == "W") {
                                    return this.x + '<br/>' + '状态' + ':' + '等待' + '<br/>' + '开始时间' + '<br/>' + '结束时间';
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
                yAxis: {
                    type: 'datetime',
                    title: {
                        text: ''
                    },
                    gridLineWidth: 0,
                    labels: {
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
                                            name:'/currentJob',
                                            dec:that.$Base64.encode('当前作业')
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

            })
        },
        // 毫秒数
        dateToMill(date) {
            date = date.replace(new RegExp("-", "gm"), "/");
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
