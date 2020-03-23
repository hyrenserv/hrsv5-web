<template>
<div class="menus">

    <el-container>
        <el-header>
            <el-row>
                <div class="el-header">
                    <span class="titles">工程名称 : {{sys_name}}</span>
                    <el-button type="primary" class="el1" @click="goBack" size="small">
                        <i class="block_icon fa fa-home"></i>返回首页
                    </el-button>
                </div>
            </el-row>
        </el-header>
        <div class="lines"></div>
        <el-container>
            <el-aside width="16%">
                <!-- 导航 -->
                <el-menu :unique-opened="true" :default-active="defaultActive" class="el-menu-vertical-demo" @select="handleSelect">

                    <div v-for="items in menus" :key="items.name">
                        <template v-if="items.children">
                            <!--二级菜单循环-->
                            <el-submenu :index="items.children[0].path">
                                <template slot="title">{{items.title}}</template>
                                <div v-for="item in items.children" :key="item.name">
                                    <el-menu-item :index="item.path">
                                        <i :class="item.icon"></i>
                                        <span>{{item.title}}</span>
                                    </el-menu-item>
                                </div>
                            </el-submenu>
                        </template>
                        <template v-else>
                            <!--一级菜单循环-->
                            <el-menu-item :index="items.path">
                                <i :class="items.icon"></i>
                                <span>{{items.title}}</span>
                            </el-menu-item>
                        </template>
                    </div>
                </el-menu>
            </el-aside>
            <el-container>
                <div class="pcontain">
                    <div class="ptitle">
                        <el-col :span="14">{{pTitle}}</el-col>
                    </div>
                    <el-main class="pbody">
                        <router-view v-on:viewIn="changeTitle"></router-view>
                    </el-main>
                </div>
            </el-container>
        </el-container>
    </el-container>
</div>
</template>

<script>
import menus from './menus'
import * as menusAllFun from "./menus";
export default {
    data() {
        return {
            sys_cd: '',
            defaultActive: '',
            job: '',
            menus: menus,
            sys_name: '',
            pTitle: '任务',
            form: {
                runDate: ''
            },
            forms: {
                etl_job: ''
            },
        }
    },
    mounted() {
        if (this.$route.query.name && this.$route.query.dec) {
            this.defaultActive = this.$route.query.name;
            this.pTitle = this.$Base64.decode(this.$route.query.dec);
        }
        this.sys_name = sessionStorage.getItem('sys_name');
        this.sys_cd = sessionStorage.getItem('sys_cd');
    },
    methods: {
        //返回首页按钮
        goBack() {
            this.$router.push({
                path: '/etlMage'
            })
        },
        // 改变菜单栏的路径显示
        changeTitle(val, val2) {
            this.defaultActive = val;
            this.pTitle = val2;
        },
        //导航栏路由跳转
        handleSelect(key, keyPath, title) {
            this.defaultActive = key;
            let path = key.replace(/\//g, "");
            let changeKey;
            switch (key) {
                case '/currentBatch':
                    changeKey = "当前批量";
                    break;
                case '/historyBatch':
                    changeKey = "历史批量";
                    break;
                case '/currentJob':
                    changeKey = "当前作业";
                    break;
                case '/historyJob':
                    changeKey = "历史作业";
                    break;
                case '/relyJob':
                    changeKey = "依赖作业";
                    break;
                case '/systemResource':
                    changeKey = "系统资源";
                    break;
                case '/sysLevelIntervente':
                    changeKey = "系统级干预";
                    break;
                case '/jobLevelIntervente':
                    changeKey = "作业级干预";
                    break;
                case '/subSystem':
                    changeKey = "任务";
                    break;
                case '/etlJobDefTemplate':
                    changeKey = "作业模板";
                    break;
                case '/etlJobDef':
                    changeKey = "作业";
                    break;
                case '/resourcesAvailable':
                    changeKey = "资源定义";
                    break;
                case '/resourcesUsage':
                    changeKey = "资源分配";
                    break;
                case '/systemParameter':
                    changeKey = "系统参数";
                    break;
                case '/etlDependency':
                    changeKey = "作业依赖";
                    break;
            }
            this.$router.push({
                name: path,
                query: {
                    etl_sys_name: this.$route.query.etl_sys_name,
                    etl_sys_cd: this.$route.query.etl_sys_cd,
                    name: key,
                    dec: this.$Base64.encode(changeKey)
                }
            });
            this.pTitle = title.$slots.default[1].children[0].text;
        }
    }
}
</script>

<style scoped>
/* .menus {
    padding: 0 4% 0 3%;
} */

.el-header {
    height: 50px;
    line-height: 50px;
    padding: 0;
}

.el-aside {
    background-color: #e5e5e5;
    height: 550px;
}

.el-main {
    padding: 15px;
    margin-bottom: 15px;
}

.el-menu {
    border: none !important;
    background-color: #e5e5e5;
    color: #000;
}

.el-menu-item {
    color: #000 !important;
}

.el-menu-item:focus,
.el-menu-item:hover {
    outline: 0;
    background-color: #e9f0aa;
}

.el-container {
    min-height: 550px;
    overflow: hidden;
}

.el-menu-item.is-active {
    background-color: #337ab7 !important;
}

i {
    margin-right: 5px;
}

.el1 {
    margin-top: 15px;
    float: right;
}

.titles {
    color: #2196f3;
    font-size: 18px;
}

.pcontain {

    width: 100%;
    min-height: 550px;

    overflow-x: hidden;
    overflow-y: auto;
    border: 1px solid #d5d5d5;
    margin-left: 15px;
    border-radius: 5px;
}

.ptitle {
    background-color: #e5e5e5;
    line-height: 30px;
    padding: 10px;
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #d5d5d5;
    color: #000;
}

.tops {
    height: 30px;
    margin-bottom: 0;
}
.lines {
    margin-top: 10px;
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 15px;
}
</style>
