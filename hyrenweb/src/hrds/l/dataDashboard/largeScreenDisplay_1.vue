<template>

    <div id="largeScreenDisplay_1">
        <!--<body style="overflow: hidden">-->
        <div id="header">
            <h3 class="header-title">{{dashboard_name}}</h3>
            <div class="header-info header-info-r">日期：<span id="nowDate">{{today}}</span></div>
        </div>

        <div id="container">
            <!--<div id="flexCon">-->
            <el-row>
                <el-col id="id_1" :span="span_1">
                    <div class="chart-wrapper">
                        <div id="Chart1"></div>
                    </div>
                </el-col>
                <el-col id="id_2" :span="span_1">
                    <div class="chart-wrapper">
                        <div id="Chart2"></div>
                    </div>
                </el-col>
                <el-col id="id_3" :span="span_1">
                    <div class="chart-wrapper">
                        <div id="Chart3"></div>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col id="id_4" :span="span_2">
                    <div class="chart-wrapper">
                        <div id="Chart4"></div>
                    </div>

                </el-col>
                <el-col id="id_5" :span="span_2">
                    <div class="chart-wrapper">
                        <div id="Chart5"></div>
                    </div>
                </el-col>
                <el-col id="id_6" :span="span_2">
                    <div class="chart-wrapper">
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
                span_1: 8,
                span_2: 8,
                dashboard_id: this.$route.query.dashboard_id,
                dashboard_name: this.$route.query.dashboard_name,
            }
        },
        created() {
            this.height = window.innerHeight * 0.35;
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
            this.getToday();
            this.integration();
        },
        mounted() {

        },
        methods: {
            async integration() {
                var component_id_list = await this.getComponentList();
                await this.changeLayOut(component_id_list);
                await this.formCompoent(component_id_list);
            },
            async getComponentList() {
                var component_id_list = [];
                functionAll.getComponentByDashboardId({
                    dashboard_id: this.dashboard_id
                }).then(res => {
                    //拿到了component_id_list
                    component_id_list = res.data;
                    //判空
                    if (component_id_list.length == 0) {
                        this.$Msg.customizTitle('未选择组件', 'error');
                        return;
                    }
                    //判断个数是否大于6个
                    if (component_id_list.length > 6) {
                        this.$Msg.customizTitle('选择的组件过多（大于6）', 'error');
                        return;
                    }
                });
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(component_id_list);
                    }, 2000)
                })
            },
            async formCompoent(component_id_list) {
                //将组件放入没有隐藏起来的模块中
                var j = 0;
                for (var i = 1; i <= 6; i++) {
                    //如果是true 表示隐藏起来了 跳过
                    if ($("#id_" + i).is(":hidden")) {
                        continue;
                    }
                    var option = await this.init(component_id_list[j]);
                    // var option = await this.init3();
                    console.log(JSON.stringify(option));
                    const Chart = echarts.init(document.getElementById("Chart" + i), "shine");
                    Chart.setOption(option);
                    window.addEventListener('resize', () => {
                        this.height = window.innerHeight * 0.35;
                        $('#Chart' + i).attr('style', 'height:' + this.height + 'px')
                        Chart.resize();
                    });
                    j++;
                }
            },
            //隐藏方法
            hideID(ID) {
                $('#' + ID).hide();
            },
            changeLayOut(component_id_list) {
                if (component_id_list.length == 1) {
                    this.hideID("id_2");
                    this.hideID("id_3");
                    this.hideID("id_4");
                    this.hideID("id_5");
                    this.hideID("id_6");
                    this.span_1 = 24;
                } else if (component_id_list.length == 2) {
                    this.hideID("id_3");
                    this.hideID("id_4");
                    this.hideID("id_5");
                    this.hideID("id_6");
                    this.span_1 = 12;
                } else if (component_id_list.length == 3) {
                    this.hideID("id_3");
                    this.hideID("id_5");
                    this.hideID("id_6");
                    this.span_1 = 12;
                    this.span_2 = 24;
                } else if (component_id_list.length == 4) {
                    this.hideID("id_3");
                    this.hideID("id_6");
                    this.span_1 = 12;
                    this.span_2 = 12;
                } else if (component_id_list.length == 5) {
                    this.hideID("id_6");
                    this.span_1 = 8;
                    this.span_2 = 12;
                } else if (component_id_list.length == 6) {
                    this.span_1 = 8;
                    this.span_2 = 8;
                }
            },
            async improveoption(option) {
                option.title.backgroundColor = "transparent";
                option.legend.backgroundColor = "transparent";
                option.legend.textStyle.color = "#b0c2f9";
                option.title.textStyle.color = "#3f44ff";
                if (option.xAxis instanceof Array) {
                    for (var i = 0; i < option.xAxis.length; i++) {
                        option.xAxis[i].nameTextStyle.color = "#3f44ff";
                        option.xAxis[i].nameTextStyle.backgroundColor = "transparent";
                        option.xAxis[i].axisLine.lineStyle.color = "#b0c2f9";
                    }
                } else {
                    option.xAxis.nameTextStyle.color = "#3f44ff";
                    option.xAxis.nameTextStyle.backgroundColor = "transparent";
                    option.xAxis.axisLine.lineStyle.color = "#b0c2f9";
                }
                if (option.yAxis instanceof Array) {
                    for (var i = 0; i < option.yAxis.length; i++) {
                        option.yAxis[i].nameTextStyle.color = "#3f44ff";
                        option.yAxis[i].nameTextStyle.backgroundColor = "transparent";
                        option.yAxis[i].axisLine.lineStyle.color = "#b0c2f9";
                    }
                } else {
                    option.yAxis.nameTextStyle.color = "#3f44ff";
                    option.yAxis.nameTextStyle.backgroundColor = "transparent";
                    option.yAxis.axisLine.lineStyle.color = "#b0c2f9";
                }
                return option;
            },
            init3() {
                var data = {
                    "title": {
                        "text": "折线图",
                        "x": "center",
                        "y": "top",
                        // "backgroundColor":"#ffffff",
                        "backgroundColor": "transparent",
                        "borderColor": "#ffffff",
                        "borderWidth": 0,
                        "borderRadius": 0,
                        "textStyle": {
                            "color": "#3f44ff",
                            "fontFamily": "Arial",
                            "fontSize": 24,
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "lineHeight": 40
                        }
                    },
                    "legend": {
                        "type": "plain",
                        "show": true,
                        "tooltip": true,
                        "left": "10",
                        "top": "0",
                        "right": "0",
                        "bottom": "0",
                        "width": "0",
                        "height": "0",
                        "orient": "horizontal",
                        "align": "auto",
                        "padding": 5,
                        "itemGap": 10,
                        "itemWidth": 25,
                        "itemHeight": 14,
                        "inactiveColor": "#000000",
                        "backgroundColor": "transparent",
                        "borderColor": "#ffffff",
                        "borderWidth": 0,
                        "interval": 100,
                        "intervalnumber": 4,
                        "data": [
                            "i_current_price"
                        ],
                        textStyle: {
                            color: "#b0c2f9"
                        },
                    },
                    "grid": {
                        "left": "5%",
                        "right": "10%",
                        "bottom": "3%",
                        "containLabel": true
                    },
                    "xAxis": [
                        {
                            "type": "category",
                            "boundaryGap": false,
                            "data": [
                                "6",
                                "1",
                                "6",
                                "5",
                                "6",
                                "9",
                                "8",
                                "6",
                                "1",
                                "2",
                                "6",
                                "4",
                                "4",
                                "8",
                                "1",
                                "3",
                                "5",
                                "7",
                                "8",
                                "7",
                                "2",
                                "5",
                                "6",
                                "3",
                                "2",
                                "9",
                                "9",
                                "1",
                                "3",
                                "9",
                                "4",
                                "10",
                                "5",
                                "9",
                                "10",
                                "7",
                                "10",
                                "9",
                                "8",
                                "9",
                                "6",
                                "9",
                                "3",
                                "3",
                                "3",
                                "7",
                                "10",
                                "10",
                                "2",
                                "8",
                                "5",
                                "10",
                                "3",
                                "4",
                                "4",
                                "10",
                                "2",
                                "3",
                                "2",
                                "8",
                                "9",
                                "3",
                                "2",
                                "6",
                                "10",
                                "3",
                                "1",
                                "3",
                                "5",
                                "10",
                                "1",
                                "9",
                                "5",
                                "10",
                                "7",
                                "8",
                                "1",
                                "3"
                            ],
                            "nameTextStyle": {
                                "color": "#3f44ff",
                                "lineHeight": 0,
                                "fontFamily": "Arial",
                                "fontSize": 12,
                                "align": "center",
                                "backgroundColor": "transparent",
                                "borderColor": "#ffffff",
                                "fontStyle": "normal",
                                "fontWeight": "normal",
                                "borderWidth": 0,
                                "borderRadius": 0,
                                "verticalAlign": "middle"
                            },
                            "axisLine": {
                                "show": true,
                                "onZero": true,
                                lineStyle: {color: "#b0c2f9"}
                            },
                            "axisLabel": {
                                "show": true,
                                "inside": false,
                                "rotate": 0,
                                "margin": 10
                            },
                            "name": "x轴",
                            "position": "bottom",
                            "show": true,
                            "axisoOffset": 0,
                            "nameLocation": "end",
                            "nameRotate": 0,
                            "nameGap": 15
                        }
                    ],
                    "yAxis": {
                        "type": "value",
                        "nameTextStyle": {
                            "color": "#3f44ff",
                            "lineHeight": 0,
                            "fontFamily": "Arial",
                            "fontSize": 12,
                            "align": "center",
                            "backgroundColor": "transparent",
                            "borderColor": "#000000",
                            "fontStyle": "normal",
                            "fontWeight": "normal",
                            "borderWidth": 0,
                            "borderRadius": 0,
                            "verticalAlign": "middle"
                        },
                        "axisLine": {
                            "show": true,
                            "onZero": true,
                            lineStyle: {color: "#b0c2f9"}
                        },
                        "axisLabel": {
                            "show": true,
                            "inside": false,
                            "rotate": 0,
                            "margin": 20
                        },
                        "name": "y轴",
                        "position": "left",
                        "show": true,
                        "axisoOffset": 0,
                        "nameLocation": "end",
                        "nameRotate": 0,
                        "nameGap": 15
                    },
                    "series": [
                        {
                            "data": [
                                "86.00",
                                "91.42",
                                "98.66",
                                "96.31",
                                "94.12",
                                "84.29",
                                "95.10",
                                "78.10",
                                "90.90",
                                "90.93",
                                "98.44",
                                "90.04",
                                "94.88",
                                "82.37",
                                "81.39",
                                "98.30",
                                "88.29",
                                "87.61",
                                "82.11",
                                "92.53",
                                "87.37",
                                "93.11",
                                "91.44",
                                "81.00",
                                "85.66",
                                "90.72",
                                "88.02",
                                "91.40",
                                "87.27",
                                "80.59",
                                "94.89",
                                "86.80",
                                "90.44",
                                "84.79",
                                "92.12",
                                "91.27",
                                "95.00",
                                "99.89",
                                "84.32",
                                "78.25",
                                "97.23",
                                "99.41",
                                "96.82",
                                "79.91",
                                "85.05",
                                "79.19",
                                "81.03",
                                "79.14",
                                "89.59",
                                "76.51",
                                "89.74",
                                "82.99",
                                "88.79",
                                "89.69",
                                "77.09",
                                "84.62",
                                "90.41",
                                "76.16",
                                "81.80",
                                "80.53",
                                "88.22",
                                "88.24",
                                "77.55",
                                "88.03",
                                "91.34",
                                "89.85",
                                "79.33",
                                "95.32",
                                "82.09",
                                "88.71",
                                "80.21",
                                "79.28",
                                "94.81",
                                "94.27",
                                "83.99",
                                "95.42",
                                "95.05",
                                "81.35"
                            ],
                            "name": "i_current_price",
                            "type": "line",
                            "label": {
                                "normal": {
                                    "show": true,
                                    "position": "top",
                                    "formatter": "{b} {c}"
                                }
                            }
                        }
                    ]
                }
                return data;
            },
            async init(component_id) {
                var item = await this.getVisualComponentInfoById(component_id);
                var option = await this.getOption(item);
                option = await this.improveoption(option);
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(option);
                    }, 2000)
                })
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

                    item.auto_comp_sum = res.data.compSum;
                    item.echart_type = res.data.compSum.chart_type;
                    if (res.data.xAxisCol != '' && res.data.xAxisCol != undefined && res.data.xAxisCol.length != 0) {
                        var xColumns = [];
                        res.data.xAxisCol.forEach((item) => {
                            xColumns.push(item.column_name)
                        })
                        item.xColumns = xColumns
                    }
                    if (res.data.yAxisCol != '' && res.data.yAxisCol != undefined && res.data.yAxisCol.length != 0) {
                        var yColumns = [];
                        res.data.yAxisCol.forEach((item) => {
                            yColumns.push(item.column_name)
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
                });
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(item);
                    }, 2000)
                })
            },
            async getOption(item) {
                // var item = this.item;
                var option = {};
                var result = await this.initproperty(item);
                functionAll.getChartShow({
                    exe_sql: item.auto_comp_sum.exe_sql,
                    x_columns: item.xColumns,
                    y_columns: item.yColumns,
                    chart_type: item.echart_type,
                }).then(res => {
                    if (item.echart_type == 'line') { //折线图
                        option = drawLine.drawLine(result, res.data);
                    } else if (item.echart_type == 'bar') { //标准柱状图
                        option = drawBarChart.drawBarChart(result, res.data);
                    } else if (item.echart_type == 'stackingbar') { //堆叠柱状图
                        option = drawStackingBarChart.drawStackingBarChart(result, res.data);
                    } else if (item.echart_type == "polarbar") { //极坐标堆叠柱状图
                        option = drawPolarBarChart.drawPolarBarChart(result, res.data);
                    } else if (item.echart_type == "pie" || item.echart_type == "huanpie" || item.echart_type == "fasanpie") { // 饼图、环饼、发散饼
                        option = drawPieChart.drawPieChart(result, res.data);
                    } else if (item.echart_type == "scatter") { // 标准散点图
                        option = drawScatterChart.drawScatterChart(result, res.data);
                    } else if (item.echart_type == "bl") { // 柱状折线混合图
                        option = drawBlChart.drawBlChart(result, res.data);
                    } else if (item.echart_type == "blsimple") { // 柱状折线混合图-简单
                        option = drawBlSimpleChart.drawBlSimpleChart(result, res.data);
                    } else if (item.echart_type == "treemap") { // 矩形树图
                        option = drawTreeMapChart.drawTreeMapChart(result, res.data, this.echartsLabel, this.auto_comp_sum);
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
                        //     
                        //     var option = drawMapChart.drawMapChart(result, res.data, this.seriesStyle);
                        //     option = option;
                    }
                })
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(option);
                    }, 2000)
                })
            }
        },
    }
</script>
<style scoped>
    @import './css/largeScreenDisplay_1.css';
</style>
