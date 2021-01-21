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
    <el-table :data="fieldSameResult" style="width: 100%" :height="600">
        <el-table-column prop="dim_order" label="分组序号" sortable width="150"></el-table-column>
        <el-table-column prop="table_code" label="表名" sortable width="400"></el-table-column>
        <el-table-column prop="col_code" label="字段名称" width="400"></el-table-column>
        <el-table-column prop="category_same" label="分类" sortable width="150"></el-table-column>
        <el-table-column align="right">
            <template slot="header" slot-scope="scope" >
                <el-tooltip placement="top">
                    <div slot="content">搜索条件格式为:key=value<br/>例如:name=S10_I_USER或者class=5<br/>不写key默认为表名称搜索</div>
                    <el-input v-model="table_code" size="mini" @keyup.enter.native="fitterTableData()" placeholder="输入表名称或分类搜索"/>
                </el-tooltip>
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
            fieldSameResult: [],
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
        fitterTableData(){
            this.currPage = 1;
            this.getTableData();
        },
        getTableData() {
            let params = {};
            params["table_code"] = this.table_code;
            params["currPage"] = this.currPage;
            params["pageSize"] = this.pageSize;
            this.getPageFieldSameResult(params);
        },
        getPageFieldSameResult(params) {
            tdbFun.getPageFieldSameResult(params).then(res => {
                this.totalSize = res.data.totalSize;
                this.fieldSameResult = res.data.fieldSameResult;
            })
        },
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
