<template>
<div class="relyJob">
    <div class="title">搜索条件</div>
    <el-form :model="form" ref="form" class="demo-form-inline tops" :inline="true">
        <el-form-item label="作业名称" style="font-weight: 600">
            <el-input v-model="form.etl_job" placeholder="作业名称" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="searchSingle" size="mini">单作业搜索</el-button>
            <el-button type="success" @click="searchALL" size="mini">全作业搜索</el-button>
        </el-form-item>
    </el-form>
    <el-row>
        <el-row v-show="showChartsHidden" class="workName">
            <div id="myChart" :style="{width: '100%', height: '500px'}"></div>
        </el-row>
        <el-row v-show="showOrHidden" class="workName">
            <div id="myChartSingle" :style="{width: '100%', height: '500px'}"></div>
        </el-row>
    </el-row>
</div>
</template>

<script>
import * as functionAll from "./relyJob";
import * as message from "@/utils/js/message";
require('echarts/dist/extension/dataTool.js')
export default {
    data() {
        return {
            showOrHidden: false,
            showChartsHidden: false,
            form: {
                etl_job: '',
            },
        };
    },
    mounted() {

    },
    methods: {
        // 单作业搜索
        searchSingle() {
            if (this.form.etl_job) {
                this.showOrHidden = true;
                this.showChartsHidden = false;
                functionAll.monitorJobDependencyInfo({
                    etl_sys_cd: 'A1',
                    etl_job: 'nantong'
                }).then(res => {
                    let myChart = this.$echarts.init(document.getElementById('myChartSingle'));
                    let data = res.data;
                    let arr = [];
                    // 绘制图表
                    myChart.setOption({
                        title: {
                            text: '单作业依赖关系图',
                            subtext: 'Default layout',
                            top: 'bottom',
                            left: 'right'
                        },
                        tooltip: {
                            trigger: 'item',
                            triggerOn: 'mousemove'
                        },
                        series: [{
                            name: '作业依赖关系图',
                            type: 'tree',
                            data: [data],
                            left: '25%',
                            right: '25%',
                            label: {
                                position: 'left',
                                verticalAlign: 'middle',
                                align: 'right',
                                fontSize: 16
                            },
                            symbol: 'diamond',
                             symbolSize:12,
                            leaves: {
                                label: {
                                    position: 'right',
                                    verticalAlign: 'middle',
                                    align: 'left'
                                }
                            },
                            expandAndCollapse: false,
                            animationDuration: 550,
                            animationDurationUpdate: 750
                        }]
                    });
                })
            } else {
                message.customizTitle('作业名称不能为空', 'warning');
            }

        },
        // 全作业搜索
        searchALL() {
            this.showOrHidden = false;
            this.showChartsHidden = true;
            functionAll.monitorBatchEtlJobDependencyInfo({
                etl_sys_cd: 'A1'
            }).then(res => {
                let data = res.data;
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'));
                var graph = this.$echarts.dataTool.gexf.parse(data); //xml文件
                var count = 0;
                var num = 0;
                var jobNum = 0;
                var allNum = 0;
                var plNum = 0;
                graph.nodes.forEach(function (node) {
                    node.itemStyle = null;
                    node.symbolSize = 20;
                    node.value = node.symbolSize;
                    node.category = node.attributes.modularity_class;
                    if (node.category == 0) {
                        plNum += 1;
                    } else if (node.category == 1) {
                        count += 1;
                    } else if (node.category == 2) {
                        num += 1;
                    } else if (node.category == 3) {
                        jobNum += 1;
                    }
                    allNum = jobNum + num + count;
                    node.x = node.y = null;
                    node.draggable = true;
                });
                var categories = [];
                categories[0] = {
                    name: '频率作业' + plNum + "个"
                };
                categories[1] = {
                    name: '定时作业或无依赖关系作业' + count + "个"
                };
                categories[2] = {
                    name: '依赖但无上游作业' + num + "个"
                };
                categories[3] = {
                    name: '依赖作业' + jobNum + "个，共有作业" + allNum + "个"
                };
                // 绘制图表
                myChart.setOption({
                    title: {
                        text: '全作业依赖关系图',
                        subtext: 'Default layout',
                        top: 'bottom',
                        left: 'right'
                    },
                    tooltip: {
                        position: 'bottom',
                        confine: 'overflow: hidden'

                    },
                    legend: [{
                        // selectedMode: 'single',
                        data: categories.map(function (a) {
                            return a.name;
                        })
                    }],
                    animation: false,
                    series: [{
                        name: '作业依赖关系图',
                        type: 'graph',
                        edgeSymbol: ['none', 'arrow'],
                        layout: 'force',
                        data: graph.nodes,
                        links: graph.links,
                        categories: categories,
                        roam: true,
                        label: {
                            normal: {
                                position: 'top'
                            }
                        },
                        force: {
                            repulsion: 300
                        }
                    }]
                });
            })
        }
    }
};
</script>

<style scoped>
.relyJob .workName {
    margin-top: 16px;
}

.relyJob .title {
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: 600;
}
</style>
