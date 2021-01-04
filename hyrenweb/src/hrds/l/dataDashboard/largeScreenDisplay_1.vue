<template>
    <div id="largeScreenDisplay_1">
        <div id="header">
            <h3 class="header-title">上市公司全景概览</h3>
            <div class="header-info header-info-r">日期：<span id="nowDate">{{today}}</span></div>
        </div>
        <footer id="footer"></footer>

        <div id="container">
            <div id="flexCon">
                <div class="flex-row">
                    <div class="flex-cell flex-cell-l">
                        <div class="chart-wrapper">
                            <h3 class="chart-title">市价总值排行Top10</h3>
                            <div id="rankChart"
                                 style="width:100%; height: 440px; margin-bottom: 25px"></div>
                        </div>
                    </div>
                    <div id="id2" class="flex-cell flex-cell-l">
                    </div>
                    <div id="id3" class="flex-cell flex-cell-l">
                    </div>
                </div>
                <div class="flex-row">
                    <div class="flex-cell flex-cell-c">
                        <div class="chart-wrapper">
                            <h3 class="chart-title">市价总值排行Top10</h3>
                            <div id="rankChart2"
                                 style="width:100%; height: 440px; margin-bottom: 25px"></div>
                        </div>
                    </div>
                    <div class="flex-cell flex-cell-r">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                today: "",
            }
        },
        mounted() {
            this.getToday();
            $("#id2").hide();
            $("#id3").hide();
            const rankChart = echarts.init(document.getElementById("rankChart"), "shine");
            const rankChart2 = echarts.init(document.getElementById("rankChart2"), "shine");

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
            const rankChartOpt = {
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
            rankChart.setOption(rankChartOpt);
            rankChart2.setOption(rankChartOpt);

            window.addEventListener('resize', () => {
                rankChart.resize();
                rankChart2.resize();
            });
        },
        methods: {
            getToday(){
                const now = new Date();
                const year = now.getFullYear();
                const month = now.getMonth()+1;
                const day = now.getDate();
                this.today = year+"年"+month+"月"+day+"日";
            },
        },
    }
</script>
<style scoped>
    @import './css/largeScreenDisplay_1.css';
</style>
