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
                    <el-select v-model="searchForm.table_code" filterable placeholder="请选择">
                        <el-option v-for="item in table_code_s" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="searchFieldFeatureAnalysisResults()">搜索</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    <!-- <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="table_code" label="表名" sortable width="240"></el-table-column>
        <el-table-column prop="col_code" label="字段名" width="200"></el-table-column>
        <el-table-column prop="col_records" label="总记录数" width="120"></el-table-column>
        <el-table-column prop="col_distinct" label="去重记录数" width="120"></el-table-column>
        <el-table-column prop="max_len" label="最大长度" width="120"></el-table-column>
        <el-table-column prop="min_len" label="最小长度" width="120"></el-table-column>
        <el-table-column prop="avg_len" label="平均长度" width="120"></el-table-column>
        <el-table-column prop="skew_len" label="平均长度偏度" width="120"></el-table-column>
        <el-table-column prop="kurt_len" label="平均长度峰度" width="120"></el-table-column>
        <el-table-column prop="median_len" label="平均长度中位数" width="120"></el-table-column>
        <el-table-column prop="var_len" label="平均长度方差" width="120"></el-table-column>
        <el-table-column prop="has_chinese" label="是否包含中文" width="120"></el-table-column>
        <el-table-column prop="tech_cate" label="技术分类" width="120"></el-table-column>
        <el-table-column align="right" width="180">
            <template slot="header" slot-scope="scope" >
                <el-input v-model="table_code" size="mini" @keyup.enter.native="fitterTableData()" placeholder="输入表名搜索" />
            </template>
        </el-table-column>
    </el-table>
    <el-pagination style="text-align: center" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currPage" :page-sizes="[10, 25, 50, 100, 200]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
    </el-pagination> -->
    <!--echarts图展示关系-->
    <el-row>
        <el-col :span="12">
            <div id="recordStatisticsChart" style="width: 100%; height: 550px " ref="recordStatisticsChart" />
        </el-col>
        <el-col :span="12">
            <div id="lengthStatisticsChart" style="width: 100%; height: 550px " ref="lengthStatisticsChart" />
        </el-col>
    </el-row>
</div>
</template>

<script>
import * as tdbFun from "./tdb_result";
export default {
    data() {
        return {
            table_code_s: [],
            //搜索
            searchForm: { table_code: 'S10_I_AGENT_ACCOUNTS' },
        };
    },
    mounted() {
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
            });
        },
        //根据表名获取字段特征分析结果
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
            var myChart = this.$echarts.init(document.getElementById('recordStatisticsChart'));
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
                    type: 'category',
                    data: data.column_name_s,
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: [{
                        name: '总记录数',
                        type: 'bar',
                        emphasis: {
                            focus: 'series'
                        },
                        data: data.col_record_s
                    },
                    {
                        name: '去重记录数',
                        type: 'bar',
                        stack: '广告',
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
            var myChart = this.$echarts.init(document.getElementById('lengthStatisticsChart'));
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
                    type: 'category',
                    data: data.column_name_s,
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: [{
                        name: '最大长度',
                        type: 'bar',
                        stack: '其他',
                        emphasis: {
                            focus: 'series'
                        },
                        data: data.max_len_s
                    }, {
                        name: '最小长度',
                        type: 'bar',
                        stack: '其他',
                        emphasis: {
                            focus: 'series'
                        },
                        data: data.min_len_s
                    }, {
                        name: '平均长度',
                        type: 'bar',
                        stack: '其他',
                        emphasis: {
                            focus: 'series'
                        },
                        data: data.avg_len_s
                    },
                    {
                        name: '偏度',
                        type: 'bar',
                        stack: '其他',
                        emphasis: {
                            focus: 'series'
                        },
                        data: data.skew_len_s
                    },
                    {
                        name: '峰度',
                        type: 'bar',
                        stack: '其他',
                        emphasis: {
                            focus: 'series'
                        },
                        data: data.kurt_len_s
                    },
                    {
                        name: '中位数',
                        type: 'bar',
                        stack: '其他',
                        emphasis: {
                            focus: 'series'
                        },
                        data: data.median_len_s
                    },
                    {
                        name: '方差',
                        type: 'bar',
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
