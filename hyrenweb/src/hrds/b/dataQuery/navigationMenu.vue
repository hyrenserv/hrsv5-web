<template>
    <div class="navigationMenu">
        <el-menu :collapse="true">
            <router-link to="dataQuery">
                <el-menu-item index="1">
                    <i class="el-icon-files"></i>
                    <span slot="title">文件资源管理器</span>
                </el-menu-item>
            </router-link>
            <router-link to="fullTextSearch">
                <el-menu-item index="2">
                    <i class="el-icon-search"></i>
                    <span slot="title">全文检索</span>
                </el-menu-item>
            </router-link>
            <router-link to="webSqlConsole">
                <el-menu-item index="3">
                    <i class="el-icon-monitor"></i>
                    <span slot="title">WEB SQL 操作台</span>
                </el-menu-item>
            </router-link>
        </el-menu>
    </div>
</template>
