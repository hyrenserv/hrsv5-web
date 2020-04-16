<template>
<div>
    <el-row class='topTitle'>
        <span class='el-icon-location'>标准元查看</span>
        <router-link to="/collectmonitor">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <el-tabs type="border-card" @tab-click="handleClick" >
        <el-tab-pane label="基础信息">
            <BasicInformation @handleClick="handleClick" :data='data' :options='options' :tip='tip' ref='child1' />
        </el-tab-pane>
        <el-tab-pane label="代码配置">
            <CodeConfiguration ref='child2'/>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import dbm_check__normbasic from "./dbm_check_normbasic";
import dbm_check_code_info from "./dbm_check_code_info";
import * as dataBenchmarkingAllFun from './dbm_check'

export default {
    name: 'dbm',
    components: {
        "BasicInformation": dbm_check__normbasic,
        "CodeConfiguration": dbm_check_code_info,
    },
    data() {
        return {
            data: [],
            options: [],
            tip: ''
        }
    },
    created() {
        this.handleClick()
    },
    methods: {
        handleClick() {
            this.tip = '数据加载中...';
            dataBenchmarkingAllFun.getDbmSortInfoTreeData().then(res => {
                this.data = res.data.dbmSortInfoTreeDataList;
                if (this.data.length > 0) {
                    this.tip = ''
                } else {
                    this.tip = '暂无数据'
                }
                this.options = res.data.dbmSortInfoTreeDataList;
                 this.$refs.child1.getDbmNormbasicInfo(1,10);
                     this.$refs.child2.getDbmCodeTypeInfo(1,10);
                     this.$refs.child1.cleanFun()
                     this.$refs.child2.cleanFun()
            });
        }

    }
}
</script>

<style scoped>

</style>
