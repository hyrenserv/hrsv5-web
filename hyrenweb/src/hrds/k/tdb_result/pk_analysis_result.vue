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
                    <el-button type="primary" size="mini" @click="searchPKAnalysisResult()">搜索</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="col_num" align="center" label="序号" min-width="10%" sortable></el-table-column>
        <el-table-column prop="table_code" align="center" label="表名" min-width="30%" sortable></el-table-column>
        <el-table-column prop="col_code" align="center" label="字段名" min-width="20%" sortable></el-table-column>
        <el-table-column prop="col_type" align="center" label="预测字段类型" min-width="20%" sortable></el-table-column>
        <el-table-column prop="col_nullable" align="center" label="是否可为空" min-width="10%" sortable></el-table-column>
        <el-table-column prop="col_pk" align="center" label="是否为主键" min-width="10%" sortable></el-table-column>
    </el-table>
</div>
</template>

<script>
import * as tdbFun from "./tdb_result";
export default {
    data() {
        return {
            //下拉列表信息
            table_code_s: [],
            //搜索
            searchForm: { table_code: '' },
            //主键分析结果信息
            tableData: [],
        };
    },
    mounted() {
        //获取主键分析结果表名列表
        this.getPKAnalysisTableCodeList();
    },
    methods: {
        //获取字段特征分析表名列表
        getPKAnalysisTableCodeList() {
            tdbFun.getPKAnalysisTableCodeList().then(res => {
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
                this.searchPKAnalysisResult();
            });
        },
        //根据表名获取主键分析结果
        searchPKAnalysisResult() {
            let params = {};
            params["table_code"] = this.searchForm.table_code;
            console.log(params);
            tdbFun.searchPKAnalysisResult(params).then(res => {
                console.log(res.data);
                this.tableData = res.data
            })
        },
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
