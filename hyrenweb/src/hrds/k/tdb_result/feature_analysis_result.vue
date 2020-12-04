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
    <el-table :data="tableData" style="width: 100%" :height="600">
        <el-table-column prop="table_code" label="表名" sortable width="240"></el-table-column>
        <el-table-column prop="col_code" label="字段名" width="200"></el-table-column>
        <el-table-column prop="col_records" label="总记录数" width="120"></el-table-column>
        <el-table-column prop="col_distinct" label="去重记录数" width="120"></el-table-column>
        <!-- <el-table-column prop="max_len" label="最大长度" width="120"></el-table-column>
        <el-table-column prop="min_len" label="最小长度" width="120"></el-table-column> -->
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
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currPage" :page-sizes="[10, 25, 50, 100, 200]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
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
            tableData: [],
            pageSize: 10,
            totalSize: 0,
        };
    },
    mounted() {
        this.getTableData();
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.getTableData();
        },
        handleCurrentChange(val) {
            this.currPage = val;
            this.getTableData();
        },
        fitterTableData(){
            this.currPage = 1;
            this.getTableData();
        },
        getTableData() {
            let params = {};
            params["table_code"] = this.table_code;
            params["currPage"] = this.currPage;
            params["pageSize"] = this.pageSize;
            this.getColumnFeatureAnalysisResult(params);
        },
        getColumnFeatureAnalysisResult(params) {
            tdbFun.getColumnFeatureAnalysisResult(params).then(res => {
                this.totalSize = res.data.totalSize;
                this.tableData = res.data.columnFeatureAnalysisResult;
            })
        }
    }
}
</script>

<style lang="less" scoped>
#feature_analysis_result {
    .title {
        color: #2196f3;
        line-height: 30px;
        padding-bottom: 10px;
        font-size: 18px;
    }
}
</style>
