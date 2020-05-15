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
        <ve-bar :data="chartData" :extend="chartExtend" :events="chartEvents"></ve-bar>
    </el-row>
    <el-row v-if="showOrhidden">
        <el-row class="span10">任务:{{this.task}}</el-row>
        <el-row class="span10">批量日期:{{this.dayDate}}</el-row>
    </el-row>
    <div id="container" :style="{width: '100%', height: 'auto'}"></div>
</div>
</template>

<script>
import * as functionAll from "./historyBatch";
import Highcahrts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(Highcahrts);
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
    methods: {
        // 获取历史批量详情
        monitorHistoryBatchInfo(val) {
            functionAll.monitorHistoryBatchInfo({
                etl_sys_cd: this.$route.query.etl_sys_cd,
                curr_bath_date: val
            }).then((res) => {
                this.dateToMill(res.data[0].curr_end_time)
                let that = this;
                res.data.forEach((item, index) => {
                    item['信息详情'] = 1;
                    item['任务名称'] = item.desc_sys;
                    let year = item.curr_bath_date.substring(0, 4);
                    let month = item.curr_bath_date.substring(4, 6);
                    let day = item.curr_bath_date.substring(6, 9);
                    let date = year + "-" + month + "-" + day;
                    item.curr_st_time = this.dateToMilldate(item.curr_st_time);
                    item.curr_end_time = this.dateToMilldate(item.curr_end_time);
                    item.curr_bath_date = date;
                    that.dayDate = item.curr_bath_date;
                })
                this.chartData.rows = res.data;
            })
        },
        // 获取日期对应数据和历史批量
        search() {
            let val = this.datePickerValue;
            if (val != null) {
                this.monitorHistoryBatchInfo(val)
            } else {
                this.chartData.rows = [];
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
                }
                // 获得图表信息
                let that = this;
                var chart = Highcahrts.chart('container', {
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
                                        return this.x + '<br/>' + '状态' + ':' + '挂机';
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

                })
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
