<template>
    <div>
      <el-row class='topTitle'>
        <span>标准元管理</span>
        <router-link to="/collectmonitor">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
        <el-tabs type="border-card" @tab-click="handleClick">
            <el-tab-pane label="基础信息">
                <BasicInformation @handleClick="handleClick" :data='data' :options='options' :tip='tip' ref='child1'/>
            </el-tab-pane>
            <el-tab-pane label="代码配置">
                <CodeConfiguration ref='child2'/>
            </el-tab-pane>
            <el-tab-pane label="标准分类配置">
                <StandardClassConfiguration @handleClick="handleClick" :data='data' :options='options' ref='child3'/>
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
                    this.data = res.data.dbmSortInfoTreeDataList;
                    if (this.data.length > 0) {
                        this.tip = ''
                    } else {
                        this.tip = '暂无数据'
                    }
                    this.options = res.data.dbmSortInfoTreeDataList;
                     this.$refs.child1.getDbmNormbasicInfo(1,10);
                     this.$refs.child2.getDbmCodeTypeInfo(1,10);
                     this.$refs.child3.getDbmCodeTypeInfo(1,10);
                     this.$refs.child1.cleanFun()
                     this.$refs.child2.cleanFun()
                     this.$refs.child3.cleanFun()
                });
            }


        }
    }
</script>
<style scoped>

</style>
