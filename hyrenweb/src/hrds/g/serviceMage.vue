<template>
    <div>
        <!-- 接口首页展示 -->
        <el-row class="interfaceIndexRow" :gutter="20">
            <el-col :span="6">
                <router-link to="/userManage">
                    <el-button class="elButton" type="primary" icon="el-icon-user">
                        用户管理
                    </el-button>
                </router-link>
            </el-col>
            <el-col :span="6">
                <router-link to="/releaseManage">
                    <el-button class="elButton" type="warning" icon="el-icon-menu">
                        发布管理
                    </el-button>
                </router-link>
            </el-col>
            <el-col :span="6">
                <router-link to="/dataRangeManage">
                    <el-button class="elButton" type="success" icon="el-icon-s-data">
                        数据范围管理
                    </el-button>
                </router-link>
            </el-col>
            <el-col :span="6">
                <router-link to="/interfaceUseMonitor">
                    <el-button class="elButton" type="info" icon="el-icon-s-check">
                        接口使用监控
                    </el-button>
                </router-link>
            </el-col>
        </el-row>
        <div style="margin: 20px 0;"></div>
        <!--接口响应时间列表-->
        <el-row class="fontStyle">
            <span class="el-icon-time">接口响应时间图</span>
        </el-row>
        <!--接口响应时间图 -->
        <el-row id="myChart" style="height:500px;border: #e6e6e6 solid 1px"/>
    </div>
</template>
<script>
    import * as interfaceFunctionAll from "./serviceMage";

    export default {
        data() {
            return {
                max: [],
                min: [],
                avg: [],
                interface_name: [],
            }
        },
        mounted() {
            this.interfaceResponseTime();
        },
        methods: {
            interfaceResponseTime() {
                interfaceFunctionAll.interfaceResponseTime().then(res => {
                    if (res.data.length > 0) {
                        res.data.forEach(item => {
                            this.max.push(item.max);
                            this.min.push(item.min);
                            this.avg.push(Math.round(item.avg));
                            this.interface_name.push(item.interface_name);
                        });
                    }
                    // 基于准备好的dom，初始化echarts实例
                    let myChart = this.$echarts.init(document.getElementById('myChart'));
                    let option = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            },
                            enterable: true,
                            formatter: {
                                seriesName: 'name',
                                data: 'data'/* '{a0} : {c0}<br/>{a1} : {c1}<br/> {a2} : {c2}' */
                            }
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataView: {
                                    show: true,
                                    readOnly: false,
                                    title: '数据视图',
                                    lang: ['数据视图', '关闭', '刷新']
                                },
                                magicType: {
                                    show: true,
                                    type: ['line', 'bar'],
                                    title: {
                                        line: '切换为折线图',
                                        bar: '切换为柱状图'
                                    }
                                },
                                restore: {show: true, title: '还原'},
                                saveAsImage: {show: true, title: '保存为图片'}
                            }
                        },
                        title: {
                            text: '单位/ms',
                            x: 'left',
                            y: '5%',
                            textStyle: {
                                //字体粗细 'normal','bold','bolder','lighter'
                                fontWeight: 'bold',
                                //字体大小
                                fontSize: 14
                            }
                        },
                        // 控制legend颜色
                        color: ['#FF0000', '#2db7f5', '#80FF80'],
                        // 模块
                        legend: {
                            data: ['最大响应时间', '最小响应时间', '平均响应时间']
                        },
                        grid: {
                            x: 15,
                            x2: 100,
                            y2: 150,
                            left: '3%',
                            right: '4%',
                            bottom: '27%',
                            containLabel: true
                        },
                        xAxis: [{
                            type: 'category',
                            data: name,
                            axisLabel: {
                                //横坐标上的文字斜着显示 begin
                                interval: 0,
                                rotate: 45,
                                margin: 2,
                                textStyle: {
                                    color: "#222"
                                }
                            }
                        }],
                        yAxis: [{
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} ms'
                            }
                        }],
                        series: [{
                            name: '最大响应时间',
                            type: 'bar',
                            data: this.max
                        }, {
                            name: '最小响应时间',
                            type: 'bar',
                            data: this.min
                        }, {
                            name: '平均响应时间',
                            type: 'bar',
                            splitNumber: 2,
                            data: this.avg
                        }]
                    };
                    myChart.setOption(option);
                })
            }
        },
    };
</script>

<style scoped>
    .interfaceIndexRow {
        border: 1px solid #e6e6e6;
        padding-top: 20px;
        width: 100%;
        height: 140px;
        text-align: center;
    }

    .fontStyle {
        color: #2196f3;
        font-size: 18px;
        margin-bottom: 20px;
    }

    .elButton {
        width: 160px;
        height: 100px;
        font-size: 16px;
        text-align: center;
    }

</style>
