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
    <el-tabs type="border-card">
        <el-tab-pane label="基础信息">
            <BasicInformation ref='child1' />
        </el-tab-pane>
        <el-tab-pane label="代码配置">
            <CodeConfiguration ref='child2' />
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import dbm_check__normbasic from "./dbm_check_normbasic";
import dbm_check_code_info from "./dbm_check_code_info";

export default {
    name: 'dbm',
    components: {
        "BasicInformation": dbm_check__normbasic,
        "CodeConfiguration": dbm_check_code_info,
    },
    data() {
        return {}
    },
    created() {},
    mounted() {},
    methods: {}
}
</script>
