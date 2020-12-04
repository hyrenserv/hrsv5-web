<template>
<div id='pk_analysis_result'>
    <el-row class='topTitle'>
        <span class='el-icon-location'>主键分析结果</span>
        <router-link to="/tdb_result">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <el-table :data="tableData" style="width: 100%" :height="600">
        <el-table-column prop="col_num" label="分组序号" sortable width="150"></el-table-column>
        <el-table-column prop="table_code" label="表名" sortable width="300"></el-table-column>
        <el-table-column prop="col_code" label="字段名" width="300"></el-table-column>
        <el-table-column prop="col_type" label="预测字段类型" width="180"></el-table-column>
        <el-table-column prop="col_nullable" label="是否可为空" width="120"></el-table-column>
        <el-table-column prop="col_pk" label="是否为主键" width="120"></el-table-column>
        <el-table-column align="right">
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
            this.getPageTablePkData(params);
        },
        getPageTablePkData(params) {
            tdbFun.getPageTablePkData(params).then(res => {
                this.totalSize = res.data.totalSize;
                this.tableData = res.data.tablePkData;
            })
        }
    }
}
</script>

<style lang="less" scoped>
#pk_analysis_result {
    .title {
        color: #2196f3;
        line-height: 30px;
        padding-bottom: 10px;
        font-size: 18px;
    }
}
</style>
