<template>
<div class="historyJob">
    <div class="title">搜索条件</div>
    <el-form :model="form" ref="form" class="demo-form-inline" :inline="true" label-width="100px">
        <el-col :span="12">
            <el-form-item label="作业名称">
                <el-input v-model="form.etl_job" placeholder="作业名称" size="small"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="开始批量日期">
                <el-date-picker v-model="form.start_date" @change="changevalue1" type="date" placeholder="开始批量日期" size="small">
                </el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="24">
            <el-form-item label="结束批量日期">
                <el-date-picker v-model="form.end_date" @change="changevalue2" type="date" placeholder="结束批量日期" size="small">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search" size="small">搜索</el-button>
            </el-form-item>
        </el-col>
    </el-form>
    <div>
        <span>信息详情</span>
    </div>
    <div id="container" :style="{width: '100%', height: '420px'}"></div>
    <el-table stripe :data="departmentalList" border size="medium">
        <el-table-column prop="sub_sys_cd" label="系统名称" align="center"></el-table-column>
        <el-table-column prop="etl_job" label="作业名称" align="center"></el-table-column>
        <el-table-column prop="curr_bath_date" label="批量日期	" align="center"></el-table-column>
        <el-table-column prop="curr_st_time" label="开始时间" align="center"></el-table-column>
        <el-table-column prop="curr_end_time" label="结束时间" align="center"></el-table-column>
        <el-table-column prop="job_disp_status" label="状态" align="center"></el-table-column>
        <el-table-column label="日志" align="center"> <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-edit" title="编辑" type="primary" @click="handleEdit(scope.$index, scope.row)">
                </el-button>
            </template></el-table-column>
    </el-table>
</div>
</template>

<script>
import * as functionAll from "./historyJob";
import Highcahrts from 'highcharts'
export default {
    data() {
        return {
            form: {
                etl_job: '',
                start_date: '',
                end_date: '',
                isHistoryBatch: '',
                etl_sys_cd: this.$route.query.etl_sys_cd,
            },
            departmentalList: [],
            curr_bath_dates: [],
            use_times: [],
            curr_st_times: [],
            curr_end_times: []
        };
    },
    mounted() {
        // 通过传参判断是哪种途径
        if (this.$route.query.etl_job) {
            this.form.start_date = this.$route.query.start_date;
            this.form.etl_job = this.$route.query.etl_job;
            this.form.isHistoryBatch = 1;
            this.monitorHistoryJobInfo();
        } else {
            this.form.isHistoryBatch = '';
        }
    },
    methods: {
        //查询历史作业
        monitorHistoryJobInfo() {
            let self = this;
            functionAll.monitorHistoryJobInfo(self.form).then(res => {
                this.departmentalList = res.data;
                for (let i = 0; i < res.data.length; i++) {
                    let sty = self.formatterLong24HH(res.data[i].curr_st_time);
                    // 开始时间数据
                    let startpiont = {
                        name: res.data[i].etl_job,
                        xs: res.data[i].curr_bath_date,
                        tooltipData: res.data[i].curr_st_time,
                        flag: "st", //开始时间标志
                        y: sty
                    };
                    let sdate = new Date(res.data[i].curr_st_time)
                    let edate = new Date(res.data[i].curr_end_time)
                    // 获得所用时间差
                    let entime = self.subTime(sdate, edate);
                    // 使用时间数据
                    let useTimePoint = {
                        name: res.data[i].etl_job,
                        xs: res.data[i].curr_bath_date,
                        tooltipData: entime,
                        y: entime
                    };
                    let ety = sty + entime;
                    // 结束时间数据
                    let endpiont = {
                        name: res.data[i].etl_job,
                        xs: res.data[i].curr_bath_date,
                        tooltipData: res.data[i].curr_end_time,
                        flag: "et", //结束时间标志
                        y: ety
                    };
                    if (entime == 0) {
                        startpiont.color = 'red';
                        endpiont.color = 'red';
                    }
                    // 赋值
                    self.curr_bath_dates[i] = res.data[i].curr_bath_date;
                    self.use_times[i] = useTimePoint;
                    self.curr_st_times[i] = startpiont;
                    self.curr_end_times[i] = endpiont;
                }
                Highcahrts.chart('container', {
                    title: {
                        text: '作业明细'
                    },
                    exporting: {
                        enabled: false
                    },
                    xAxis: {
                        labels: {
                            formatter: function () {
                                return self.formatterDate(self.curr_bath_dates[this.value]);
                            }
                        },
                        tickInterval: 1
                    },
                    yAxis: [{
                        lineWidth: 1,
                        labels: {
                            overflow: 'justify',
                            formatter: function () {
                                return self.get24H(this.value);
                            }
                        },
                        title: {
                            text: '开始时间-结束时间',
                        },
                        gridLineWidth: 0
                    }, {
                        labels: {
                            overflow: 'justify',
                            formatter: function () {
                                return self.get24H(this.value);
                            }
                        },
                        title: {
                            text: '所用时间',
                        },
                        opposite: true
                    }],
                    tooltip: {
                        shared: true,
                        formatter: function () {
                            let str = "";
                            if (this.points.length != 0) {
                                str += '作业名称' + ':' + this.points[0]['key'] + "<br>";
                                str += '批量日期' + ':' + self.formatterDate(this.points[0].point.xs) + "<br>";
                            }
                            for (var index = 0; index < this.points.length; index++) {
                                if (this.points[index].series.name == '所用时间') {
                                    str += this.points[index].series.name + "：" +
                                        self.get24H(this.points[index].point.tooltipData) + "<br>";
                                } else {
                                    str += this.points[index].series.name + "：" +
                                        self.formatterDate(this.points[index].point.tooltipData, "YYYY-MM-DD HH:MM:SS") + "<br>";
                                }

                            }
                            return str;
                        },
                    },
                    plotOptions: {},
                    series: [{
                        type: 'column',
                        name: '所用时间',
                        yAxis: 1,
                        data: self.use_times,
                        color: "#91c7ae",

                    }, {
                        type: 'spline',
                        name: '开始时间',
                        data: self.curr_st_times,
                        color: "#00FA9A",

                    }, {
                        type: 'spline',
                        name: '结束时间',
                        data: self.curr_end_times,
                        color: "#c23531",
                    }]
                });
            })
        },
        // 点击按钮查询
        search() {
            this.monitorHistoryJobInfo();
        },
        //更改时间格式
        changeTime(val) {
            if (val != null) {
                function changeData(num) {
                    return num > 9 ? (num + "") : ("0" + num);
                };
                let Date = (val.getFullYear() + '-' + changeData((val.getMonth() + 1)) + '-' + changeData(val.getDate()));
                return Date;
            }

        },
        changevalue1(val) {
            this.form.start_date = this.changeTime(val);
        },
        changevalue2(val) {
            this.form.end_date = this.changeTime(val);
        },
        // 格式化日期
        formatterDate: function (value, type) {
            if (typeof (value) == 'string') {
                return value;
            }
            if (isNaN(value)) {
                return "";
            }
            let str = "";
            let d = new Date(value);
            str += d.getFullYear() + "-";

            let YYYY = d.getFullYear();
            //let MM = d.getMonth();
            let DD = d.getDate();
            let HH = d.getHours();
            let MM = d.getMinutes();
            let SS = d.getMinutes();

            if ((d.getMonth() + 1) < 10) {
                str += "0";
            };
            str += (d.getMonth() + 1) + '-';
            if (d.getDate() < 10) {
                str += "0";
            }
            str += d.getDate() + " ";
            var time = "";

            time += d.getHours() + ":";
            if (d.getMinutes() < 10) {
                time += "0";
            }
            time += d.getMinutes() + ":";
            if (d.getSeconds() < 10) {
                time += "0";
            }
            time += d.getSeconds();

            if (type == 'YYYY-MM-DD HH:MM:SS') {
                str += time;
            }
            if (type == 'HH:MM:SS') {
                str = time;
            }

            return str;
        },
        get24H: function (value) {
            if (isNaN(value)) {
                return "";
            }
            if (value < 0) {
                return 0;
            }
            var flag = true;
            let hh = 0;
            let mm = 0;
            let ss = 0;
            while (flag) {
                if ((hh + 1) * 3600 * 1000 > value) {
                    flag = false;
                    value = value - hh * 3600 * 1000;
                } else {
                    hh++;
                }
            }
            var flag = true;
            while (flag) {
                if ((mm + 1) * 60 * 1000 > value) {
                    flag = false;
                    value = value - mm * 60 * 1000;
                } else {
                    mm++;
                }
            }
            var flag = true;
            while (flag) {
                if ((ss + 1) * 1000 > value) {
                    flag = false;
                    value = value - ss * 3600 * 1000;
                } else {
                    ss++;
                }
            }

            let str = "";
            if (hh < 10) {
                str += "0"
            }
            str += hh + ":";
            if (mm < 10) {
                str += "0"
            }
            str += mm + ":";

            if (ss < 10) {
                str += "0"
            }
            str += ss;
            return str;
        },
        // 毫秒数转换
        formatterLong24HH: function (value) {
            let str = 0;
            let datetime = new Date(value);

            let HH = datetime.getHours();
            let MM = datetime.getMinutes();
            let SS = datetime.getMinutes();
            str += SS * 1000;
            str += MM * 60 * 1000;
            str += HH * 60 * 60 * 1000;

            return str;
        },
        // 所用时间数据处理
        subTime: function (value, value1) {
            if (isNaN(value1) || typeof (value1) == 'undefined') {
                return 0;
            }
            if (value1 < value) {
                return 0;
            }
            return value1 - value;
        },
    }

};
</script>

<style scoped>
.historyJob .title {
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: 600;
}

.historyJob span {
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: 600;
}
</style>
