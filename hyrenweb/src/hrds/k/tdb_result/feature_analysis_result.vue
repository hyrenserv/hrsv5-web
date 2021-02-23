<template>
<div id='feature_analysis_result'>
    <el-row class='topTitle'>
        <span class='el-icon-location'>特征分析结果</span>
        <router-link to="/tdb_result">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <!-- 搜索框 -->
    <el-row>
        <el-col :span="6" :offset="9">
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="mini">
                <el-form-item label="表名" prop="table_code" title="表名称搜索">
                    <!-- <el-input type="text" placeholder="表名" v-model="searchForm.table_code" /> -->
                    <el-select v-model="searchForm.table_code" filterable placeholder="请选择" clearable>
                        <el-option v-for="item in table_code_s" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="searchFieldFeatureAnalysisResults()">搜索</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    <el-tabs :tab-position="tabPosition" style="height: 500px;">
        <el-tab-pane label="图表展示">
            <!--echarts图展示关系-->
            <div id="recordStatisticsChart" style="width: 100%; height: 550px " ref="recordStatisticsChart" />
            <div id="lengthStatisticsChart" style="width: 100%; height: 550px " ref="lengthStatisticsChart" />
        </el-tab-pane>
        <el-tab-pane label="表格展示">
            <el-row class='topTitle'>表名: {{searchForm.table_code}}</el-row>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="col_code" label="字段名" align="center" min-width="20%" ></el-table-column>
                <el-table-column prop="col_records" label="总记录数" align="center" min-width="10%"></el-table-column>
                <el-table-column prop="col_distinct" label="去重记录数" align="center" min-width="10%"></el-table-column>
                <el-table-column prop="max_len" label="最大长度" align="center" min-width="10%"></el-table-column>
                <el-table-column prop="min_len" label="最小长度" align="center" min-width="10%"></el-table-column>
                <el-table-column prop="avg_len" label="平均长度" align="center" min-width="10%"></el-table-column>
                <el-table-column prop="skew_len" label="偏度" align="center" min-width="10%"></el-table-column>
                <el-table-column prop="kurt_len" label="峰度" align="center" min-width="10%"></el-table-column>
                <el-table-column prop="median_len" label="中位数" align="center" min-width="10%"></el-table-column>
                <el-table-column prop="var_len" label="方差" align="center" min-width="10%"></el-table-column>
                <el-table-column prop="has_chinese" label="包含中文" align="center" min-width="10%"></el-table-column>
                <el-table-column prop="tech_cate" label="分类" align="center" min-width="10%"></el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import * as tdbFun from "./tdb_result";
export default {
    data() {
        return {
            //默认便签
            tabPosition: '图表展示',
            //下拉框表名列表
            table_code_s: [],
            //搜索
            searchForm: { table_code: '' },
            //表格需要展示的数据
            tableData: [],
        };
    },
    mounted() {
        //获取特征分析表名list
        this.getColumnFeatureAnalysisTableCodeList();
    },
    methods: {
        //获取字段特征分析表名列表
        getColumnFeatureAnalysisTableCodeList() {
            tdbFun.getColumnFeatureAnalysisTableCodeList().then(res => {
                let table_code_list = [];
                table_code_list = res.data;
                table_code_list.forEach(table_code => {
                    let table_code_info = {};
                    table_code_info["lable"] = table_code;
                    table_code_info["value"] = table_code;
                    this.table_code_s.push(table_code_info);
                });
                //页面加载完成后,默认显示第一张表的统计信息
                this.searchForm.table_code = table_code_list[0];
                //获取图表展示数据
                this.searchFieldFeatureAnalysisResults();
                //获取表格展示数据
                this.getColumnFeatureAnalysisResult();
            });
        },
        //根据表名获取字段特征分析结果表格数据
        getColumnFeatureAnalysisResult() {
            let params = {};
            params["table_code"] = this.searchForm.table_code;
            tdbFun.getColumnFeatureAnalysisResult(params).then(res => {
                this.tableData = res.data;
            })
        },
        //根据表名获取字段特征分析结果图表数据
        searchFieldFeatureAnalysisResults() {
            let params = {};
            params["table_code"] = this.searchForm.table_code;
            tdbFun.searchColumnFeatureAnalysisResult(params).then(res => {
                //获取记录统计结果
                this.recordStatisticsChartBar(res.data);
                //获取长度统计结果
                this.lengthStatisticsChartBar(res.data);
            })
        },
        //记录数柱状图
        recordStatisticsChartBar(data) {
            var myChart = this.$echarts.init(document.getElementById('recordStatisticsChart')); //初始化记录数柱状图
            var len = data.column_name_s.length;
            var dataZoom_end = null; //为空默认100%所以默认显示5个是能显示下的
            if (len > 10) {
                var dataZoom_end = (10 / len) * 100;
            } else if (len < 10) {
                var dataZoom_end = (10 / len) * 100;
            };
            var option = {
                color: ['#5470c6', '#91cc75'],
                title: {
                    text: data.table_code,
                    subtext: '记录数统计'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    type: 'scroll',
                    right: 10,
                    top: 20,
                    bottom: 10,
                    data: ['总记录数', '去重记录数']
                },
                grid: { top: '15%', left: '5%', right: '5%', bottom: '5%', containLabel: true }, //所在网格设置
                xAxis: [{ //X 轴设置
                    name: '字段名',
                    axisLabel: { interval: 0, rotate: 30 }, //x轴栏目字体斜度
                    type: 'category',
                    data: data.column_name_s,
                }],
                yAxis: [{ type: 'value', name: '记录统计数', }], //Y 轴设置
                //开启鼠标滚动
                dataZoom: [{
                    start: 0,
                    end: dataZoom_end,
                    type: 'slider',
                    show: true,
                    xAxisIndex: [0],
                    handleSize: 0,
                    height: 10,
                    left: '10%',
                    right: '10%',
                    bottom: 26,
                    showDataShadow: true,
                    showDetail: false,
                    realtime: true,
                    filterMode: 'filter',
                }],
                series: [{
                        name: '总记录数',
                        type: 'bar',
                        label: { show: true }, //显示柱子统计数量
                        barWidth: 30,
                        emphasis: {
                            focus: 'series'
                        },
                        data: data.col_record_s
                    },
                    {
                        name: '去重记录数',
                        type: 'bar',
                        label: { show: true }, //显示柱子统计数量
                        stack: '广告',
                        barWidth: 30,
                        emphasis: {
                            focus: 'series'
                        },
                        data: data.col_distinct_s
                    },
                ]
            };
            option && myChart.setOption(option);
        },
        //长度统计图
        lengthStatisticsChartBar(data) {
            var myChart = this.$echarts.init(document.getElementById('lengthStatisticsChart')); //初始化长度统计图
            var len = data.column_name_s.length;
            var dataZoom_end = null; //为空默认100%所以默认显示5个是能显示下的
            if (len > 5) {
                var dataZoom_end = (5 / len) * 100;
            } else if (len < 5) {
                var dataZoom_end = (5 / len) * 100;
            };
            var option = {
                color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
                title: {
                    text: '',
                    subtext: '长度统计'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'line', // 默认为直线，可选为：'line' | 'shadow'
                    },
                    //重新展示鼠标滑过内容
                    formatter: function (params) {
                        var res = params[0].name + '<br/>'
                        for (var i = 0, length = params.length; i < length; i++) {
                            res += params[i].seriesName + '：' +
                                params[i].value + '<br/>'
                        }
                        return res
                    }
                },
                legend: {
                    type: 'scroll',
                    right: 10,
                    top: 20,
                    bottom: 10,
                    data: ['最大长度', '最小长度', '平均长度', '偏度', '峰度', '中位数', '方差', '是否包含中文', '技术分类']
                },
                grid: {
                    top: '15%',
                    left: '5%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true
                },
                xAxis: [{
                    axisLabel: {
                        interval: 0,
                        rotate: 30
                    },
                    name: '字段名',
                    type: 'category',
                    data: data.column_name_s,
                }],
                yAxis: [{ type: 'value', name: '长度统计数', }],
                //开启鼠标滚动
                dataZoom: [{
                    start: 0,
                    end: dataZoom_end,
                    type: 'slider',
                    show: true,
                    xAxisIndex: [0],
                    handleSize: 0,
                    height: 10,
                    left: '10%',
                    right: '10%',
                    bottom: 26,
                    showDataShadow: true,
                    showDetail: false,
                    realtime: true,
                    filterMode: 'filter',
                }],
                series: [{
                        name: '最大长度',
                        type: 'bar',
                        label: { show: true }, //显示柱子统计数量
                        barWidth: 20,
                        emphasis: {
                            focus: 'series'
                        },
                        data: data.max_len_s
                    }, {
                        name: '最小长度',
                        type: 'bar',
                        label: { show: true }, //显示柱子统计数量
                        barWidth: 20,
                        emphasis: {
                            focus: 'series'
                        },
                        data: data.min_len_s
                    }, {
                        name: '平均长度',
                        type: 'bar',
                        label: { show: true }, //显示柱子统计数量
                        barWidth: 20,
                        emphasis: {
                            focus: 'series'
                        },
                        data: data.avg_len_s
                    },
                    {
                        name: '偏度',
                        type: 'bar',
                        label: { show: true }, //显示柱子统计数量
                        barWidth: 20,
                        emphasis: {
                            focus: 'series'
                        },
                        data: data.skew_len_s
                    },
                    {
                        name: '峰度',
                        type: 'bar',
                        label: { show: true }, //显示柱子统计数量
                        barWidth: 20,
                        emphasis: {
                            focus: 'series'
                        },
                        data: data.kurt_len_s
                    },
                    {
                        name: '中位数',
                        type: 'bar',
                        barWidth: 20,
                        label: { show: true }, //显示柱子统计数量
                        emphasis: {
                            focus: 'series'
                        },
                        data: data.median_len_s
                    },
                    {
                        name: '方差',
                        type: 'bar',
                        label: { show: true }, //显示柱子统计数量
                        barWidth: 20,
                        stack: '其他',
                        emphasis: {
                            focus: 'series'
                        },
                        data: data.var_len_s
                    },
                    {
                        name: '是否包含中文',
                        type: 'bar',
                        stack: '其他',
                        emphasis: {
                            focus: 'series'
                        },
                        data: data.has_chinese_s,
                    },
                    {
                        name: '技术分类',
                        type: 'bar',
                        stack: '其他',
                        emphasis: {
                            focus: 'series'
                        },
                        data: data.tech_cate_s
                    },
                ]
            };
            option && myChart.setOption(option);
        }
    }
}
</script>
