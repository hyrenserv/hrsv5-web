<template>
    <div>
        <el-row><h4 class='el-icon-s-home' style='color: #2196f3;
    line-height: 30px;
    padding-bottom: 10px;font-size: 18px;'>标准元管理</h4></el-row>
        <el-tabs type="border-card" @tab-click="handleClick">
            <el-tab-pane label="基础信息">
                <BasicInformation @handleClick="handleClick" :data='data' :options='options' :tip='tip'/>
            </el-tab-pane>
            <el-tab-pane label="代码配置">
                <CodeConfiguration/>
            </el-tab-pane>
            <el-tab-pane label="标准分类配置">
                <StandardClassConfiguration @handleClick="handleClick" :data='data' :options='options'/>
            </el-tab-pane>
        </el-tabs>
    </div>

</template>
<script>
    import dbm_normbasic from "./dbm_normbasic";
    import dbm_code_info from "./dbm_code_info";
    import dbm_sort_info from "./dbm_sort_info";
    import * as dataBenchmarkingAllFun from './dbm'

    export default {
        name: 'dbm',
        components: {
            "BasicInformation": dbm_normbasic,
            "CodeConfiguration": dbm_code_info,
            "StandardClassConfiguration": dbm_sort_info,
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
                    this.data = res.data.dbmSortInfoTreeDataList
                    if (this.data.length > 0) {
                        this.tip = ''
                    } else {
                        this.tip = '暂无数据'
                    }
                    this.options = res.data.dbmSortInfoTreeDataList
                });
            }


        }
    }
</script>
<style scoped>

</style>
