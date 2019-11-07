<template>
<div class="mansystem">
    <div class="grid-content">
        <router-link to="userManagement">
            <p><i class="el-icon-view"></i>用户管理</p>
        </router-link>
    </div>
    <div class="grid-content">
        <router-link to="departmentalList">
            <p><i class="el-icon-s-check"></i>部门管理</p>
        </router-link>
    </div>
    <div class="grid-content">
        <router-link to="systemParameters">
            <p><i class="el-icon-coin"></i>系统参数配置</p>
        </router-link>
    </div>
    <div class="grid-content ">
        <router-link to="systemParameters">
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

.grid-content {
    text-align: center;
    line-height: 200px;
    height: 200px;
    vertical-align: middle;
    flex: 1;
    /* background: skyblue; */
    font-size: 24px;
}

.grid-content:hover {
    background: wheat;
    cursor: pointer;
    color: white;
}
</style>
