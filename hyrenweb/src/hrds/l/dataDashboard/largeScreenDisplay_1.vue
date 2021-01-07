<template>

    <div id="largeScreenDisplay_1">
        <!--<body style="overflow: hidden">-->
        <div id="header">
            <h3 class="header-title">大屏展示</h3>
            <div class="header-info header-info-r">日期：<span id="nowDate">{{today}}</span></div>
        </div>

        <div id="container">
            <!--<div id="flexCon">-->
            <el-row>
                <el-col id="id_1" :span="span_1">
                    <div class="chart-wrapper">
                        <h3 class="chart-title">{{chart1_title}}</h3>
                        <div id="Chart1"></div>
                    </div>
                </el-col>
                <el-col id="id_2" :span="span_1">
                    <div class="chart-wrapper">
                        <h3 class="chart-title">{{chart2_title}}</h3>
                        <div id="Chart2"></div>
                    </div>
                </el-col>
                <el-col id="id_3" :span="span_1">
                    <div class="chart-wrapper">
                        <h3 class="chart-title">{{chart3_title}}</h3>
                        <div id="Chart3"></div>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col id="id_4" :span="span_2">
                    <div class="chart-wrapper">
                        <h3 class="chart-title">{{chart4_title}}</h3>
                        <div id="Chart4"></div>
                    </div>

                </el-col>
                <el-col id="id_5" :span="span_2">
                    <div class="chart-wrapper">
                        <h3 class="chart-title">{{chart5_title}}</h3>
                        <div id="Chart5"></div>
                    </div>
                </el-col>
                <el-col id="id_6" :span="span_2">
                    <div class="chart-wrapper">
                        <h3 class="chart-title">{{chart6_title}}</h3>
                        <div id="Chart6"></div>
                    </div>
                </el-col>
            </el-row>

        </div>
        <!--</div>-->
        <footer id="footer"></footer>
        <!--</body>-->
    </div>

</template>

<script>
    import * as functionAll from "./dataDashboard";
    import * as validator from "@/utils/js/validator";
    import * as generatepic from "../generatePic/generatePic";
    import * as drawLine from "../generatePic/line";
    import * as drawBarChart from "../generatePic/barChart";
    import * as drawStackingBarChart from "../generatePic/stackingBarChart";
    import * as drawPolarBarChart from "../generatePic/polarBarChart";
    import * as drawPieChart from "../generatePic/pieChart";
    import * as drawScatterChart from "../generatePic/scatterChart";
    import * as drawBlChart from "../generatePic/blChart";
    import * as drawBlSimpleChart from "../generatePic/blSimpleChart";
    import * as drawTreeMapChart from "../generatePic/treeMapChart";
    import * as drawMapChart from "../generatePic/mapChart";

    export default {
        data() {
            return {
                today: "",
                height: '',
                chart1_title: "chart1_title",
                chart2_title: "chart2_title",
                chart3_title: "chart3_title",
                chart4_title: "chart4_title",
                chart5_title: "chart5_title",
                chart6_title: "chart6_title",
                span_1: 8,
                span_2: 8,
                // dashboard_id: this.$route.query.dashboard_id,
                dashboard_id: "783357897965887488",
                component_id_list: [],
                option_list: [],

            }
        },
        created() {
            this.height = window.innerHeight * 0.35
            this.$nextTick(() => {
                $('#Chart1').attr('style', 'height:' + this.height + 'px')
                $('#Chart2').attr('style', 'height:' + this.height + 'px')
                $('#Chart3').attr('style', 'height:' + this.height + 'px')
                $('#Chart4').attr('style', 'height:' + this.height + 'px')
                $('#Chart5').attr('style', 'height:' + this.height + 'px')
                $('#Chart6').attr('style', 'height:' + this.height + 'px')
                $('#largeScreenDisplay_1').attr('style', 'height:' + (window.innerHeight - 75) + 'px')
            });
            window.addEventListener('resize', () => {
                $('#largeScreenDisplay_1').attr('style', 'height:' + (window.innerHeight - 75) + 'px')
            });
            this.option_list = [];
            this.component_id_list = [];
            this.$nextTick(() => {
                functionAll.getComponentByDashboardId({
                    dashboard_id: this.dashboard_id
                }).then(res => {
                    this.getToday();
                    //拿到了component_id_list
                    this.component_id_list = res.data;
                    //判空
                    if (this.component_id_list.length == 0) {
                        this.$Msg.customizTitle('未选择组件', 'error');
                        return;
                    }
                    //判断个数是否大于6个
                    if (this.component_id_list.length > 6) {
                        this.$Msg.customizTitle('选择的组件过多（大于6）', 'error');
                        return;
                    }
                    //遍历每一个id，组成option
                    this.component_id_list.forEach(item => {
                        var option = this.init(item);
                        this.option_list.push(option);
                    });
                    //调整布局
                    this.changeLayOut();
                    //将组件放入没有隐藏起来的模块中
                    var j = 0;
                    for (var i = 1; i <= 6; i++) {
                        //如果是true 表示隐藏起来了 跳过
                        if ($("#id_" + i).is(":hidden")) {
                            continue;
                        }
                        var ChartOpt = this.option_list[j];
                        const Chart = echarts.init(document.getElementById("Chart" + i), "shine");
                        Chart.setOption(ChartOpt);
                        window.addEventListener('resize', () => {
                            this.height = window.innerHeight * 0.35;
                            $('#Chart' + i).attr('style', 'height:' + this.height + 'px')
                            Chart.resize();
                        });
                        j++;
                    }
                });
            });
        },
        mounted() {

        },
        methods: {
            //隐藏方法
            hideID(ID) {
                $('#' + ID).hide();
            },
            changeLayOut() {
                if (this.option_list.length == 1) {
                    this.hideID("id_2");
                    this.hideID("id_3");
                    this.hideID("id_4");
                    this.hideID("id_5");
                    this.hideID("id_6");
                    this.span_1 = 24;
                } else if (this.option_list.length == 2) {
                    this.hideID("id_3");
                    this.hideID("id_4");
                    this.hideID("id_5");
                    this.hideID("id_6");
                    this.span_1 = 12;
                } else if (this.option_list.length == 3) {
                    this.hideID("id_3");
                    this.hideID("id_5");
                    this.hideID("id_6");
                    this.span_1 = 12;
                    this.span_2 = 24;
                } else if (this.option_list.length == 4) {
                    this.hideID("id_3");
                    this.hideID("id_6");
                    this.span_1 = 12;
                    this.span_2 = 12;
                } else if (this.option_list.length == 5) {
                    this.hideID("id_6");
                    this.span_1 = 8;
                    this.span_2 = 12;
                } else if (this.option_list.length == 6) {
                    this.span_1 = 8;
                    this.span_2 = 8;
                }
            },
            init2(component_id) {
                var data = [
                    {
                        "order": 1,
                        "stock_code": "601398",
                        "stock_name": "工商银行",
                        "market_capitalization": 14451.21
                    },
                    {
                        "order": 2,
                        "stock_code": "601857",
                        "stock_name": "中国石油",
                        "market_capitalization": 13148.07
                    },
                    {
                        "order": 3,
                        "stock_code": "601288",
                        "stock_name": "农业银行",
                        "market_capitalization": 11620.49
                    },
                    {
                        "order": 4,
                        "stock_code": "601988",
                        "stock_name": "中国银行",
                        "market_capitalization": 7608.64
                    },
                    {
                        "order": 5,
                        "stock_code": "601318",
                        "stock_name": "中国平安",
                        "market_capitalization": 7004.4
                    },
                    {
                        "order": 6,
                        "stock_code": "600519",
                        "stock_name": "贵州茅台",
                        "market_capitalization": 6934.21
                    },
                    {
                        "order": 7,
                        "stock_code": "600028",
                        "stock_name": "中国石化",
                        "market_capitalization": 5905.48
                    },
                    {
                        "order": 8,
                        "stock_code": "600036",
                        "stock_name": "招商银行",
                        "market_capitalization": 5891.63
                    },
                    {
                        "order": 9,
                        "stock_code": "601628",
                        "stock_name": "中国人寿",
                        "market_capitalization": 4583.26
                    },
                    {
                        "order": 10,
                        "stock_code": "601088",
                        "stock_name": "中国神华",
                        "market_capitalization": 3298.21
                    }
                ]
                const xData = [];
                const yData = [];
                for (let i in data) {
                    xData.push(data[i].market_capitalization);
                    yData.push(data[i].stock_name);
                }
                const ChartOpt = {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            type: "shadow"
                        },
                    },
                    grid: {
                        top: 10,
                        bottom: 10,
                        left: 60
                    },
                    xAxis: {
                        show: false,
                        type: "value"
                    },
                    yAxis: {
                        type: "category",
                        inverse: true,
                        axisLine: {show: false},
                        axisTick: {show: false},
                        axisLabel: {
                            fontSize: 12,
                            color: "#b0c2f9"
                        },
                        data: yData
                    },
                    series: [{
                        name: "市价总值排行",
                        type: "bar",
                        barCategoryGap: "60%",
                        label: {
                            show: true,
                            position: "right",
                            fontSize: 12,
                            color: "#188df0",
                            emphasis: {
                                color: "#e6b600"
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 1, 1, 1,
                                    [
                                        {offset: 0, color: '#b0c2f9'},
                                        {offset: 0.5, color: '#188df0'},
                                        {offset: 1, color: '#185bff'}
                                    ]
                                )
                            },
                            emphasis: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 1, 1, 1,
                                    [
                                        {offset: 0, color: '#b0c2f9'},
                                        {offset: 0.7, color: '#e6b600'},
                                        {offset: 1, color: '#ceac09'}
                                    ]
                                )
                            }
                        },
                        data: xData
                    }]
                };
                return ChartOpt;
            },
            //TODO
            init(component_id) {
                var item = this.getVisualComponentInfoById(component_id);

            },
            //初始化公共内容
            initproperty(item) {
                var result = {};
                // 初始化标题属性
                generatepic.initTitleStyle(item.auto_comp_sum.chart_theme, item.titleFont, result);
                //设置图上每个节点的显示情况
                generatepic.initLabelOption(item.echartsLabel, result);
                // 初始化轴配置信息
                generatepic.initAxisStyle(item.axisStyle, item.xAxis, item.yAxis, item.xAxisLine, item.xAxisLabel, item.yAxisLine, item.yAxisLabel, result);
                // 初始化图例信息
                generatepic.initLengendStyle(item.legendStyle, result);
                // result.background = this.auto_comp_sum.background
                return result;
            },
            //获取今日日期
            getToday() {
                const now = new Date();
                const year = now.getFullYear();
                const month = now.getMonth() + 1;
                const day = now.getDate();
                this.today = year + "年" + month + "月" + day + "日";
            },
            //拿到组件信息
            getVisualComponentInfoById(component_id) {
                var item = {};
                functionAll.getVisualComponentInfoById({
                    component_id: component_id
                }).then(res => {
                    debugger;
                    if (res && res.success) {
                        item.auto_comp_sum = res.data.compSum;
                        item.echart_type = res.data.compSum.chart_type;
                        if (res.data.xAxisCol != '' && res.data.xAxisCol != undefined && res.data.xAxisCol.length != 0) {
                            var xColumns = [];
                            res.data.xAxisCol.forEach((item) => {
                                xColumns.push(item.nameAll)
                            })
                            item.xColumns = xColumns
                        }
                        if (res.data.yAxisCol != '' && res.data.yAxisCol != undefined && res.data.yAxisCol.length != 0) {
                            var yColumns = [];
                            res.data.yAxisCol.forEach((item) => {
                                yColumns.push(item.nameAll)
                            })
                            item.yColumns = yColumns
                        }
                        //titleFont
                        if (res.data.titleFontInfo != '' && res.data.titleFontInfo != undefined && JSON.stringify(res.data.titleFontInfo) != '{}') {
                            item.titleFont = res.data.titleFontInfo;
                        }
                        //axisStyle
                        if (res.data.axisFontInfo != '' && res.data.axisFontInfo != undefined && JSON.stringify(res.data.axisFontInfo) != '{}') {
                            item.axisStyle = res.data.axisFontInfo;
                        }
                        //xAxis
                        if (res.data.xAxisInfo != '' && res.data.xAxisInfo != undefined && JSON.stringify(res.data.xAxisInfo) != '{}') {
                            item.xAxis = res.data.xAxisInfo[0];
                        }
                        //yAxis
                        if (res.data.yAxisInfo != '' && res.data.yAxisInfo != undefined && JSON.stringify(res.data.yAxisInfo) != '{}') {
                            item.yAxis = res.data.yAxisInfo[0];
                        }
                        //xAxisLine
                        if (res.data.xAxisLine != '' && res.data.xAxisLine != undefined && JSON.stringify(res.data.xAxisLine) != '{}') {
                            item.xAxisLine = res.data.xAxisLine;
                        }
                        //yAxisLine
                        if (res.data.yAxisLine != '' && res.data.yAxisLine != undefined && JSON.stringify(res.data.yAxisLine) != '{}') {
                            item.yAxisLine = res.data.yAxisLine;
                        }
                        //xAxisLabel
                        if (res.data.xAxisLabel != '' && res.data.xAxisLabel != undefined && JSON.stringify(res.data.xAxisLabel) != '{}') {
                            item.xAxisLabel = res.data.xAxisLabel;
                        }
                        //yAxisLabel
                        if (res.data.yAxisLabel != '' && res.data.yAxisLabel != undefined && JSON.stringify(res.data.yAxisLabel) != '{}') {
                            item.yAxisLabel = res.data.yAxisLabel;
                        }
                        //legendStyle
                        if (res.data.legendInfo != '' && res.data.legendInfo != undefined && JSON.stringify(res.data.legendInfo) != '{}') {
                            item.legendStyle = res.data.legendInfo;
                        }
                        //echartsLabel
                        if (res.data.textLabel != '' && res.data.textLabel != undefined && JSON.stringify(res.data.textLabel) != '{}') {
                            item.echartsLabel = res.data.textLabel;
                        }
                        debugger;
                        functionAll.getChartShow({
                            exe_sql: item.auto_comp_sum.exe_sql,
                            x_columns: item.xColumns,
                            y_columns: item.yColumns,
                            chart_type: item.echart_type,
                        }).then(res => {
                            if (item.echart_type == 'line') { //折线图
                                var result = this.initproperty(item);
                                var option = drawLine.drawLine(result, res.data);
                                return option;
                            } else if (item.echart_type == 'bar') { //标准柱状图
                                var result = this.initproperty(item);
                                var option = drawBarChart.drawBarChart(result, res.data);
                                return option;
                            } else if (item.echart_type == 'stackingbar') { //堆叠柱状图
                                var result = this.initproperty(item);
                                var option = drawStackingBarChart.drawStackingBarChart(result, res.data);
                                return option;
                            } else if (item.echart_type == "polarbar") { //极坐标堆叠柱状图
                                var result = this.initproperty(item);
                                var option = drawPolarBarChart.drawPolarBarChart(result, res.data);
                                return option;
                            } else if (item.echart_type == "pie" || item.echart_type == "huanpie" || item.echart_type == "fasanpie") { // 饼图、环饼、发散饼
                                var result = this.initproperty(item);
                                var option = drawPieChart.drawPieChart(result, res.data);
                                return option;
                            } else if (item.echart_type == "scatter") { // 标准散点图
                                var result = this.initproperty(item);
                                var option = drawScatterChart.drawScatterChart(result, res.data);
                                return option;
                            } else if (item.echart_type == "bl") { // 柱状折线混合图
                                var result = this.initproperty(item);
                                var option = drawBlChart.drawBlChart(result, res.data);
                                return option;
                            } else if (item.echart_type == "blsimple") { // 柱状折线混合图-简单
                                var result = this.initproperty(item);
                                var option = drawBlSimpleChart.drawBlSimpleChart(result, res.data);
                                return option;
                            } else if (item.echart_type == "treemap") { // 矩形树图
                                var result = this.initproperty(item);
                                var option = drawTreeMapChart.drawTreeMapChart(result, res.data, this.echartsLabel, this.auto_comp_sum);
                                return option;
                                // } else if (item.echart_type == "map") { // 地图
                                //     //定义全国省份的数组
                                //     var provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin',
                                //         'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan',
                                //         'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang',
                                //         'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing',
                                //         'xianggang', 'aomen', 'taiwan'
                                //     ];
                                //     var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江',
                                //         '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南',
                                //         '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾'
                                //     ];
                                //     for (var l = 0; l < provincesText.length; l++) {
                                //         if (this.seriesStyle.provincename == provincesText[l]) {
                                //             //显示对应省份的方法
                                //             this.showProvince(provinces[l], provincesText[l])
                                //             break;
                                //         }
                                //     }
                                //     var result = this.initproperty(item);
                                //     var option = drawMapChart.drawMapChart(result, res.data, this.seriesStyle);
                                //     return option;
                            }
                        })
                    }
                });
            },


        },
    }
</script>
<style scoped>
    @import './css/largeScreenDisplay_1.css';
</style>
