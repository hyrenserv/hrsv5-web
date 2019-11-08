<template>
<div class="mansystem">
    <div class="gridcontent">
        <router-link class="mansystemRoute" to="userManagement">
            <p><i class="el-icon-view"></i>用户管理</p>
        </router-link>
    </div>
    <div class="gridcontent">
        <router-link class="mansystemRoute" to="departmentalList">
            <p><i class="el-icon-s-check"></i>部门管理</p>
        </router-link>
    </div>
    <div class="gridcontent">
        <router-link class="mansystemRoute" to="systemParameters">
            <p><i class="el-icon-coin"></i>系统参数配置</p>
        </router-link>
    </div>
    <div class="gridcontent ">
        <router-link class="mansystemRoute" to="managementsystem">
            <p><i class="el-icon-cpu"></i>系统数据整理</p>
        </router-link>
    </div>
</div>
</template>

<script>

</script>

<style scoped>
.mansystem {
    display: flex;
}

/* 路由样式 */
.mansystemRoute {
    text-decoration: none;
}

.gridcontent {
    text-align: center;
    height: 200px;
    vertical-align: middle;
    flex: 1;
    font-size: 24px;
}

.gridcontent p {
    margin: 60px auto;
    width: 220px;
    height: 80px;
    line-height: 80px;
    border-radius: 20px;
    font-size: 28px;
    color: #fff;
    background: linear-gradient(180deg, #f6982f, #ea3c49);
}
</style>
