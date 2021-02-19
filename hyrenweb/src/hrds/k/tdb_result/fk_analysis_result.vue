<template>
<div id='fk_analysis_result'>
    <el-row class='topTitle'>
        <span class='el-icon-location'>外键分析结果</span>
        <router-link to="/tdb_result">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <!-- 搜索框 -->
    <el-row>
        <el-col :span="6" :offset="10">
            <el-form :inline="true" :model="searchForm" ref="searchForm" class="demo-form-inline" size="mini">
                <el-form-item label="主表表名" prop="table_name">
                    <el-input type="text" placeholder="主表表名" v-model="searchForm.table_name" />
                </el-form-item>
                <!-- <el-form-item label="主表字段名" prop="table_field_name">
                    <el-input type="text" placeholder="主表字段名" v-model="searchForm.table_field_name" />
                </el-form-item>
                <el-form-item label="从表表名" prop="fk_table_name">
                    <el-input type="text" placeholder="从表表名" v-model="searchForm.fk_table_name" />
                </el-form-item>
                <el-form-item label="从表字段名" prop="fk_table_field_name">
                    <el-input type="text" placeholder="主表字段名搜索" v-model="searchForm.fk_table_field_name" />
                </el-form-item> -->
                <el-form-item>
                    <el-button type="primary" size="mini" @click="searchFKAnalysisResults('searchForm')">搜索</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    <!--echarts图展示关系-->
    <div id="myChart" style="width: 100%; height: 750px " ref="myChart" />
    <!-- 表格展示数据 -->
    <!-- <el-table :data="tableData" style="width: 100%" :height="600">
        <el-table-column prop="row_num" label="分组序号" sortable width="120"></el-table-column>
        <el-table-column prop="fk_table_code" label="主表表名" sortable width="300"></el-table-column>
        <el-table-column prop="fk_col_code" label="主表字段名称" width="240"></el-table-column>
        <el-table-column prop="table_code" label="从表表名" sortable width="300"></el-table-column>
        <el-table-column prop="col_code" label="从表字段名称" width="240"></el-table-column>
        <el-table-column align="right">
            <template slot="header" slot-scope="scope">
                <el-input v-model="fk_table_code" size="mini" @keyup.enter.native="fitterTableData()" placeholder="输入主表名称搜索" />
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currPage" :page-sizes="[10, 25, 50, 100, 200]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
    </el-pagination> -->
</div>
</template>

<script>
import * as tdbFun from "./tdb_result";
export default {
    data() {
        return {
            fk_table_code: '',
            tableData: [],
            //分页配置
            currPage: 1,
            pageSize: 10,
            totalSize: 0,
            //搜索
            searchForm: { table_name: '', table_field_name: '', fk_table_name: '', fk_table_field_name: '' },
        };
    },
    mounted() {
        //页面加载时,默认展示所有表信息
        this.searchFKAnalysisResults();
    },
    methods: {
        //根据条件搜索外键分析结果
        searchFKAnalysisResults() {
            //设置搜索参数
            tdbFun.getFKAnalysisResults(this.searchForm).then(res => {
                var myChart = this.$echarts.init(document.getElementById('myChart'));
                var graph = res.data;
                myChart.showLoading();
                myChart.hideLoading();
                //定义节点位置,使用null时,设置 layout: 'force' 为力引导布局
                // for (let i = 0; i < graph.nodes.length; i++) {
                //     graph.nodes[i].x = graph.nodes[i].y = null;
                // }
                //
                // 随机生成颜色：根据类别数量设置颜色数量(存在一定几率重复)
                var colorList = [];
                for (var i = 0; i < graph.categories.length; i++) {
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
                //设置图的属性
                var option = {
                    color: colorList,
                    tooltip: {
                        //使用回调函数设置节点和连接线的提示内容：
                        formatter: function (params) { //触发之后返回的参数，这个函数是关键
                            if (params.data.category != undefined) { //如果触发节点
                                return '所属表名: ' + params.data.value; //返回标签
                            } else { //如果触发边
                                return '主外键关系: ' + params.data.source + " > " + params.data.target;
                            }
                        }
                    },
                    //是否显示分类
                    // legend: [{
                    //     data: graph.categories.map(function (a) {
                    //         return a.name;
                    //     })
                    // }],
                    series: [{
                        type: 'graph',
                        layout: 'none',
                        data: graph.nodes,
                        links: graph.links,
                        categories: graph.categories,
                        roam: true,
                        label: {
                            show: true, //不显示节点名称
                            position: 'right', //相对于节点标签的位置，默认在节点中间
                            formatter: '{b}'
                        },
                        labelLayout: {
                            hideOverlap: true
                        },
                        scaleLimit: {
                            min: 1,
                            max: 10
                        },
                        lineStyle: {
                            color: 'source', //颜色取向
                            curveness: 0.3 //线的弯曲度
                        },
                        draggable: true, //指示节点是否可以拖动
                        edgeSymbol: ['circle', 'arrow'], //边两端的标记类型,是否显示关系走向
                        edgeSymbolSize: [2, 4], //边两端的标记大小,剪头大小
                        roam: true, //是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
                        legendHoverLink: true, //是否启用图例 hover(悬停) 时的联动高亮。
                    }]
                };

                myChart.setOption(option);
            });
        },
    }
}
</script>

<style lang="less" scoped>
#fk_analysis_result {
    .title {
        color: #2196f3;
        line-height: 30px;
        padding-bottom: 10px;
        font-size: 18px;
    }
}
</style>
