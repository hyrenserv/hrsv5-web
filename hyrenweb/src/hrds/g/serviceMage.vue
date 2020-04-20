<template>
    <!-- 接口首页展示 -->
    <el-row class="interfaceIndexRow" :gutter="20">
        <el-col :span="6">
            <router-link to="/userManage">
                <el-button class="elButton" type="primary" icon="el-icon-user">
                    <p class="textManage">用户管理</p>
                </el-button>
            </router-link>
        </el-col>
        <el-col :span="6">
            <router-link to="/releaseManage">
                <el-button class="elButton" type="warning" icon="el-icon-menu">
                    <p class="textManage">发布管理</p>
                </el-button>
            </router-link>
        </el-col>
        <el-col :span="6">
            <router-link to="/dataRangeManage">
                <el-button class="elButton" type="success" icon="el-icon-s-data">
                    <p class="textManage">数据范围管理</p>
                </el-button>
            </router-link>
        </el-col>
        <el-col :span="6">
            <router-link to="/interfaceUseMonitor">
                <el-button class="elButton" type="info" icon="el-icon-s-check">
                    <p class="textManage">接口使用监控</p>
                </el-button>
            </router-link>
        </el-col>
    </el-row>
</template>
<script>
    export default {
        //写定义的变量数据方法等
        data() {
            return {}
        },
        methods: {},
    };
</script>

<style scoped>
    .interfaceIndexRow {
        border: 2px solid #e6e6e6;
        padding-top: 20px;
        width: 100%;
        height: 150px;
        text-align: center;
    }
    .elButton {
        width: 160px;
        height: 110px;
        font-size: 50px;
        text-align: center;
    }
    .textManage {
        font-size: 18px;
        text-align: center;
    }
</style>
