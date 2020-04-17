<template>
    <!-- 接口首页展示 -->
    <el-row class="interfaceIndexRow">
        <router-link to="/userManage">
            <el-button class="elButton" type="primary">
                <i class="el-icon-user"/>
                <p class="textManage">用户管理</p>
            </el-button>
        </router-link>
        <router-link to="/releaseManage">
            <el-button class="elButton" type="warning">
                <i class="el-icon-menu"/>
                <p class="textManage">发布管理</p>
            </el-button>
        </router-link>
        <router-link to="/dataRangeManage">
            <el-button class="elButton" type="success">
                <i class="el-icon-s-data"/>
                <p class="textManage">数据范围管理</p>
            </el-button>
        </router-link>
        <router-link to="/interfaceUseMonitor">
            <el-button class="elButton" type="info">
                <i class="el-icon-s-check"/>
                <p class="textManage">接口使用监控</p>
            </el-button>
        </router-link>
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
    }

    .elButton {
        margin-left: 100px;
        margin-right: 60px;
        width: 160px;
        height: 110px;
        text-align: center;
    }

    .el-icon-user {
        margin-bottom: 10px;
        font-size: 50px;
        text-align: center;
    }

    .el-icon-s-data {
        margin-bottom: 10px;
        font-size: 50px;
        text-align: center;
    }

    .el-icon-menu {
        margin-bottom: 10px;
        font-size: 50px;
        text-align: center;
    }

    .el-icon-s-check {
        margin-bottom: 10px;
        font-size: 50px;
        text-align: center;
    }

    .textManage {
        font-size: 16px;
        text-align: center;
    }
</style>
