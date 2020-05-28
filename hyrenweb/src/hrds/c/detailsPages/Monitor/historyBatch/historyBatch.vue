<template>
<div class="historyBatch">
    <div class="title">搜索条件</div>
    <el-row class="elRowdate">
        <span> 日期筛选</span>&nbsp
        <el-date-picker size="mini" v-model="datePickerValue" type="date" format="yyyy-MM-dd" value-format="yyyyMMdd" placeholder="跑批日期">
        </el-date-picker>
        <el-button type="primary" @click="search" size="mini">搜索</el-button>
    </el-row>
    <el-divider></el-divider>
    <div class="titles">历史信息</div>
    <el-row>
        <el-row class="span10">系统批量</el-row>
        <el-row class="span10">批量日期:{{this.dayDate}}</el-row>
        <highcharts :options="chartOptions"></highcharts>
    </el-row>
    <el-row v-if="showOrhidden">
        <el-row class="span10">任务:{{this.task}}</el-row>
        <el-row class="span10">批量日期:{{this.dayDate}}</el-row>
    </el-row>
    <highcharts v-show="showOrhidden" :options="chartOptionbottom"></highcharts>
</div>
</template>

<script>
import * as functionAll from "./historyBatch";
import Highcahrts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(Highcahrts);
import * as fixedAll from "@/utils/js/fileOperations";
import {
    Chart
} from 'highcharts-vue'
export default {
    components: {
        highcharts: Chart
    },
    data() {
        return {
            datePickerValue: "",
            start: '',
            end: '',
            dayDate: '',
            task: '',
            showOrhidden: false,
            dataALL: [],
            chartOptions: {
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
            },
            chartOptionbottom: {
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
            }
        };

    },
    methods: {
        // 获取历史批量详情
        monitorHistoryBatchInfo(val) {
            functionAll.monitorHistoryBatchInfo({
                etl_sys_cd: this.$route.query.etl_sys_cd,
                curr_bath_date: val
            }).then((res) => {
                let arry = res.data;
                this.dataALL = arry;
                let time = [];
                let colorsArray = [];
                let sysName = [];
                let startTime = [];
                let endTime = [];
                let start = 0;
                let end = 0;
                let bathData = '';
                let leng = arry.length;
                this.dayDate = fixedAll.dateFormat(arry[0].curr_bath_date);
                for (let index = 0; index < leng; index++) {
                    let status = [];
                    status.push(arry[index]['E']);
                    status.push(arry[index]['S']);
                    status.push(arry[index]['R']);
                    status.push(arry[index]['W']);
                    status.push(arry[index]['P']);
                    status.push(arry[index]['D']);
                    var color = this.edwColor(status);
                    sysName[index] = arry[index]['desc_sys'];
                    startTime[index] = this.dateToMill(arry[index]['curr_st_time']);
                    endTime[index] = this.dateToMill(arry[index]['curr_end_time']);
                    colorsArray[index] = '#2B908F';
                    start = startTime[index];
                    end = endTime[index];
                    var obj = {
                        sysName: arry[index]['sub_sys_cd'],
                        low: this.dateToMill(arry[index]['curr_st_time']),
                        high: this.dateToMill(arry[index]['curr_end_time']),
                        y: this.dateToMill(arry[index]['curr_st_time']),
                        color: color,
                        bathData: arry[index]['curr_bath_date']
                    };
                    time[index] = obj;
                }
                let heights = 200 + leng * 30;
                let that = this;
                this.chartOptions = {
                    chart: {
                        type: 'columnrange',
                        inverted: true, // 反转,
                        height: heights
                    },
                    credits: {
                        enabled: false
                    },
                    exporting: {
                        enabled: false
                    },
                    title: {
                        useHTML: true,
                        text: ''
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
                            text: '<div class="EdbeSubTitle">' + '系统运行时间' + '<div/>'
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
                    //数据提示框
                    tooltip: {
                        crosshairs: true,
                        useHTML: true,
                        formatter: function () {
                            var index = 0;
                            for (var i = 0; i < sysName.length; i++) {
                                if (this.x == sysName[i]) {
                                    index = i;
                                }
                                var start = Highcahrts.dateFormat('%Y-%m-%d %H:%M:%S', startTime[index]);
                                var end = Highcahrts.dateFormat('%Y-%m-%d %H:%M:%S', endTime[index]);
                                return '系统名称' + this.x + '<br/>' + '开始时间' + start + '<br/>' + '结束时间' + end;
                            }
                        }
                    },

                    //数据点
                    plotOptions: {
                        columnrange: {
                            colorByPoint: true,
                            colors: colorsArray,
                            pointPadding: 1,
                            borderWidth: 0,
                            pointWidth: 10,
                            showCheckbox: true
                        },
                        series: {
                            minPointLength: 15,
                            cursor: 'pointer',
                            point: {
                                events: {
                                    plotOptions: true,
                                    enableMouseTracking: true,
                                    click: function (event) {
                                        that.task = event.point.category;
                                        let value = that.changeParamas(event.point.category);
                                        // 获取数据
                                        that.searchMonitorHisBatchJobBySubCd(value, that.dayDate);
                                    }
                                }
                            }
                        },
                    },
                    legend: {
                        enabled: false,
                    },
                    series: [{
                        data: time
                    }]
                }
            })
        },
        // 获取日期对应数据和历史批量
        search() {
            let val = this.datePickerValue;
            if (val != null) {
                this.monitorHistoryBatchInfo(val)
            }
        },
        // 获取历史批量详情对应的数据
        searchMonitorHisBatchJobBySubCd(val, val2) {
            let that = this;
            functionAll.searchMonitorHisBatchJobBySubCd({
                etl_sys_cd: this.$route.query.etl_sys_cd,
                sub_sys_cd: val,
                curr_bath_date: val2.replace(/-/g, "")
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
                        colorsArray[index] = '#90B1D8';
                        start = date;
                        end = date;
                    }
                    // 等待
                    if (arry[index]['job_disp_status'] == "W") {
                        colorsArray[index] = '#C3FFGF';
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
                }
                let heightbottom = 200 + arry.length * 30;
                // 获得图表信息
                let that = this;
                this.chartOptionbottom = {
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
                        height: heightbottom
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
                        tickmarkPlacement: 'on'
                    },
                    yAxis: {
                        type: 'datetime',
                        title: {
                            text: '<div class="EdbeSubTitle">' + '作业运行时间' + '<div/>'
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
                            pointWidth: 10,
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
                                        that.$emit('viewIn', '/historyJob', '历史作业');
                                        that.$router.push({
                                            name: 'historyJob',
                                            query: {
                                                etl_job: etlJobName,
                                                etl_sys_cd: that.$route.query.etl_sys_cd,
                                                start_date: that.dayDate,
                                                name: '/historyJob',
                                                dec: that.$Base64.encode('历史作业')
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
                that.showOrhidden = true;
            })
        },
        // 改变传参
        changeParamas(val) {
            this.dataALL.forEach(item => {
                if (val == item.desc_sys) {
                    val = item.sub_sys_cd;
                }
            })
            return val;
        },
        // =====================
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
        //显示日期格式
        dateToMilldate(date) {
            date = date.replace(/\s*/g, "");
            let year = date.substring(0, 4);
            let month = date.substring(4, 6);
            let day = date.substring(6, 8);
            let timeh = date.substring(8, 10);
            let timem = date.substring(10, 12)
            let times = date.substring(12, 14)
            let dates = year + "-" + month + "-" + day + " " + timeh + ":" + timem + ":" + times;
            date = dates;
            return date;
        },
        edwColor(arry) {
            var color = ['#FF7474', '#90EE7E', '#2B908F'];
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
.historyBatch .title {
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: 600;
}

.historyBatch .elRowdate {
    margin-top: 16px;
}

.elRowdate span {
    color: #606266;
    font-size: 14px;
}

.historyBatch .titles {
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
