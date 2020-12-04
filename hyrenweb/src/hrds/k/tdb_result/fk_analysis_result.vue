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
    <el-table :data="tableData" style="width: 100%" :height="600">
        <el-table-column prop="row_num" label="分组序号" sortable width="120"></el-table-column>
        <el-table-column prop="fk_table_code" label="主表表名" sortable width="300"></el-table-column>
        <el-table-column prop="fk_col_code" label="主表字段名称" width="240"></el-table-column>
        <el-table-column prop="table_code" label="从表表名" sortable width="300"></el-table-column>
        <el-table-column prop="col_code" label="从表字段名称" width="240"></el-table-column>
        <el-table-column align="right">
            <template slot="header" slot-scope="scope" >
                <el-input v-model="fk_table_code" size="mini" @keyup.enter.native="fitterTableData()" placeholder="输入主表名称搜索" />
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
            fk_table_code: '',
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
            params["fk_table_code"] = this.fk_table_code;
            params["currPage"] = this.currPage;
            params["pageSize"] = this.pageSize;
            this.getPageTableFkData(params);
        },
        getPageTableFkData(params) {
            tdbFun.getPageTableFkData(params).then(res => {
                this.totalSize = res.data.totalSize;
                this.tableData = res.data.tableFkData;
            })
        }
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
