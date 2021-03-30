<template>
<div id='func_dep_result'>
    <el-row class='topTitle'>
        <span class='el-icon-location'>表内字段依赖分析结果</span>
        <router-link to="/tdb_result">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <el-table :data="tableFuncDepData" style="width: 100%" :height="600">
        <el-table-column prop="row_num" label="分组序号" sortable width="120"></el-table-column>
        <el-table-column prop="table_code" label="表名" sortable width="240"></el-table-column>
        <el-table-column prop="left_columns" label="左边字段" width="300"></el-table-column>
        <el-table-column prop="right_columns" label="右边字段" width="500"></el-table-column>
        <el-table-column align="right">
            <template slot="header" slot-scope="scope">
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
            tableFuncDepData: [],
            pageSize: 10,
            totalSize: 0,
        };
    },
    mounted() {
        this.getTableData();
        this.open();
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
        fitterTableData() {
            this.currPage = 1;
            this.getTableData();
        },
        getTableData() {
            let params = {};
            params["table_code"] = this.table_code;
            params["currPage"] = this.currPage;
            params["pageSize"] = this.pageSize;
            this.getPageTableFuncDepData(params);
        },
        getPageTableFuncDepData(params) {
            tdbFun.getPageTableFuncDepData(params).then(res => {
                this.totalSize = res.data.totalSize;
                this.tableFuncDepData = res.data.tableFuncDepData;
            })
        },
        open() {
            this.$notify({
                title: '提示',
                message: '字段依赖是指表内，左边一个或多个字段可以唯一查询到右边字段。左边字段为空，则说明，右边字段在表中为空或者是唯一值，不依赖任何字段就可以确定它的值。每张表的分组排序在最前面的左边字段，有较大概率为主键或者联合主键。',
                duration: 0
            });
        }
    }
}
</script>

<style lang="less" scoped>
#func_dep_result {
    .title {
        color: #2196f3;
        line-height: 30px;
        padding-bottom: 10px;
        font-size: 18px;
    }
}
</style>
