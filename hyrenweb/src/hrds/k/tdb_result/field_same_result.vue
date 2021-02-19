<template>
<div id='field_same_result'>
    <el-row class='topTitle'>
        <span class='el-icon-location'>字段相等类别分析结果</span>
        <router-link to="/tdb_result">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <!-- 搜索框 -->
    <el-row>
        <el-col :span="10" :offset="7">
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="mini">
                <el-form-item label="表名" prop="table_code" title="表名称搜索">
                    <el-input type="text" placeholder="表名" v-model="searchForm.table_code" />
                </el-form-item>
                <el-form-item label="分类" prop="category_same" title="分类搜索">
                    <el-input type="text" placeholder="分类" v-model="searchForm.category_same" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="searchFieldSameStatisticalResult('searchForm')">搜索</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    <!--echarts图展示关系-->
    <div id="myChart" style="width: 100%; height: 580px " ref="myChart" />
    <el-table :data="fieldSameResult" style="width: 100%" :height="600">
        <el-table-column prop="dim_order" label="分组序号" sortable></el-table-column>
        <el-table-column prop="table_code" label="表名" sortable></el-table-column>
        <el-table-column prop="col_code" label="字段名称" sortable></el-table-column>
        <el-table-column prop="rel_type" label="类型" sortable></el-table-column>
        <el-table-column prop="category_same" label="分类编号" sortable></el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currPage" :page-sizes="[10, 25, 50, 100, 200]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" style="text-align: center" :total="totalSize">
    </el-pagination>
</div>
</template>

<script>
import * as tdbFun from "./tdb_result";
export default {
    data() {
        return {
            currPage: 1,
            table_code: '',
            category_same: 0,
            fieldSameResult: [],
            pageSize: 10,
            totalSize: 0,
            //搜索
            searchForm: { table_code: '', category_same: "" },
        };
    },
    mounted() {
        //获取统计信息
        this.getFieldSameStatisticalResult();
        //根据分类编号获取结果
        this.getFieldSameResultByCategorysame();
        //打开提示信息
        this.open();
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.getFieldSameResultByCategorysame();
        },
        handleCurrentChange(val) {
            this.currPage = val;
            this.getFieldSameResultByCategorysame();
        },
        //根据条件检索
        searchFieldSameStatisticalResult() {
            this.fieldSameResult = [];
            this.totalSize = 0;
            this.getFieldSameStatisticalResult(this.searchForm);
        },
        //根据分类编号获取结果
        getFieldSameResultByCategorysame() {
            let params = {};
            params["category_same"] = this.category_same;
            params["currPage"] = this.currPage;
            params["pageSize"] = this.pageSize;
            tdbFun.getFieldSameResultByCategorysame(params).then(res => {
                this.totalSize = res.data.totalSize;
                this.fieldSameResult = res.data.fieldSameResult;
            })
        },
        //获取字段相同统计结果
        getFieldSameStatisticalResult(params) {
            this.totalSize = 0;
            this.fieldSameResult = [];
            tdbFun.getFieldSameStatisticalResult(params).then(res => {
                this.initBar(res);
            })
        },
        //柱状图
        initBar(res) {
            var myChart = this.$echarts.init(document.getElementById('myChart'));
            //设置x轴数据
            var dataAxis = res.data.legendData;;
            //设置y轴数据
            var data = [];
            let seriesData = [];
            seriesData = res.data.seriesData;
            if (seriesData.length > 0) {
                seriesData.forEach(item => {
                    data.push(item.value);
                });
            }
            var yMax = 500;
            var dataShadow = [];
            for (var i = 0; i < data.length; i++) {
                dataShadow.push(yMax);
            }
            var option = {
                title: {
                    text: '数据对标结果',
                    subtext: '字段相同分类统计结果'
                },
                xAxis: {
                    data: dataAxis,
                    axisLabel: {
                        inside: true,
                        textStyle: { color: '#fff' }
                    },
                    axisTick: { show: false },
                    axisLine: { show: false },
                    z: 10
                },
                yAxis: {
                    axisLine: { show: false },
                    axisTick: { show: false },
                    axisLabel: { textStyle: { color: '#999' } }
                },
                dataZoom: [{
                    type: 'inside'
                }],
                series: [{
                    type: 'bar',
                    showBackground: true,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: '#83bff6' },
                                { offset: 0.5, color: '#188df0' },
                                { offset: 1, color: '#188df0' }
                            ]
                        )
                    },
                    emphasis: {
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#2378f7' },
                                    { offset: 0.7, color: '#2378f7' },
                                    { offset: 1, color: '#83bff6' }
                                ]
                            )
                        }
                    },
                    data: data
                }]
            };
            if(myChart._$handlers.click){
                myChart._$handlers.click.length = 0;
            }
            // Enable data zoom when user click bar. 用户单击栏时启用数据缩放。
            var zoomSize = 6;
            //添加点击事件
            const that = this;
            myChart.on('click', function (param) {
                let params = {};
                params["search_condition"] = that.searchForm.search_condition;
                params["category_same"] = seriesData[param.dataIndex].name;
                params["currPage"] = that.currPage;
                params["pageSize"] = that.pageSize;
                tdbFun.getFieldSameResultByCategorysame(params).then(res => {
                    that.totalSize = res.data.totalSize;
                    that.fieldSameResult = res.data.fieldSameResult;
                })
                myChart.dispatchAction({
                    type: 'dataZoom',
                    startValue: dataAxis[0],//显示开始下标
                    endValue: dataAxis[data.length],//显示结束下标
                });
            });
            option && myChart.setOption(option);
        },
        //饼图
        initPie(res) {
            var myChart = this.$echarts.init(document.getElementById('myChart'));
            var data = res.data;
            // 随机生成颜色：根据类别数量设置颜色数量(存在一定几率重复)
            var colorList = [];
            for (var i = 0; i < data.legendData.length; i++) {
                var colorStr = Math.floor(Math.random() * 0xffffff).toString(16);
                //如果颜色值是五位，则补零
                if (colorStr.length < 6) {
                    colorStr += '0';
                }
                if (colorStr == '005094') {
                    i--;
                    continue;
                }
                colorList.push('#' + colorStr);
            }
            var option = {
                color: colorList,
                title: {
                    text: '字段相同分类统计结果',
                    // subtext: '统计结果',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 10,
                    top: 20,
                    bottom: 10,
                    data: data.legendData,
                },
                series: [{
                    name: '类别',
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '50%'],
                    data: data.seriesData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            };
            //添加点击事件
            const that = this;
            myChart.on('click', function (param) {
                let params = {};
                params["search_condition"] = that.searchForm.search_condition;
                params["category_same"] = param.data.name;
                params["currPage"] = that.currPage;
                params["pageSize"] = that.pageSize;
                tdbFun.getFieldSameResultByCategorysame(params).then(res => {
                    that.totalSize = res.data.totalSize;
                    that.fieldSameResult = res.data.fieldSameResult;
                })
            });
            option && myChart.setOption(option);
        },
        //页面打开提示信息
        open() {
            this.$notify({
                title: '提示',
                message: '相等类别分析，是将分布在不同表的同等类别的字段聚集到一起，同一组的分组序号最小的字段大概率为此分组的主数据',
                duration: 0
            });
        }
    }
}
</script>

<style lang="less" scoped>
#field_same_result {
    .title {
        color: #2196f3;
        line-height: 30px;
        padding-bottom: 10px;
        font-size: 18px;
    }
}
</style>
