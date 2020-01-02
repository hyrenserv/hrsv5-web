<template>
  <div>
        <el-container>
            <el-header>
                <el-row>
                    <div class="el-header">
                        <span class="titles">工程名称 : {{sys_name}}</span>
                        <el-button type="primary" class="el1 els" @click="goBack" size="small">
                            <i class="block_icon fa fa-home"></i>返回首页
                        </el-button>
                        <div class="lines"></div>
                    </div>
                </el-row>
            </el-header>
            <el-container>
                <el-aside width="16%">
                    <!-- 导航 -->
                    <el-menu router :default-active="menus[0].path" class="el-menu-vertical-demo" @select="handleSelect">
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
                            <el-col :span="8">{{pTitle}}</el-col>
                            <el-col :span="12" :offset="4" v-if="this.$route.path == '/historyBatch'" class="tops">
                                <el-form :model="form" ref="form" class="demo-form-inline tops" :inline="true">
                                    <el-form-item label="批量日期">
                                        <el-date-picker v-model="form.runDate" type="date" placeholder="跑批日期" size="mini">
                                        </el-date-picker>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="search" size="mini">搜索</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                            <el-col :span="14" :offset="2" v-if="this.$route.path == '/relyJob'" class="tops">
                                <el-form :model="forms" ref="forms" class="demo-form-inline tops" :inline="true">
                                    <el-form-item label="作业名称" class="tops">
                                        <el-input v-model="forms.etl_job" placeholder="作业名称" size="mini"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="singleSearch" size="mini">单作业搜索</el-button>
                                        <el-button type="primary" @click="allSearch" size="mini">全作业搜索</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-col>
                        </div>
                        <el-main class="pbody">
                            <router-view></router-view>
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
            sys_cd:'',
            job:'',
            menus: menus,
            sys_name:'',
            pTitle:'任务',
            form:{
              runDate:''  
            },
            forms:{
                etl_job:''
            },
        }
    },
    mounted() {
        // 这里是菜单默认路径
        // this.$router.push('subSystem');
        // this.sys_name = this.$route.query.etl_sys_name;
        this.sys_name = sessionStorage.getItem('sys_name');
        this.sys_cd = sessionStorage.getItem('sys_cd');
    },
    methods: {
        //返回首页按钮
        goBack(){
            this.$router.push({path:'/jobScheduling'})
        },
        //导航栏路由跳转
        handleSelect(key, keyPath,title) {
            this.pTitle = title.$slots.default[1].children[0].text;
        },
        //历史批量页面搜索按钮
        search(){

        },
        //依赖作业页面单作业搜索按钮
        singleSearch(){
            this.job = this.$route.query.etl_job;
            this.forms.etl_job = this.job;
            let params = {};
            params["etl_sys_cd"] = this.sys_cd;
            params["etl_job"] = this.forms.etl_job;
            menusAllFun.monitorJobDependencyInfo(params).then(res=>{
                console.log(res.data);
            });
        },
        //依赖作业页面全作业搜索按钮
        allSearch(){

        },
    }
}
</script>

<style scoped>
.lines {
    margin-top: 10px;
    margin-left: 150px;
    width: 81%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 15px;
}
.el-header{
    height: 50px;
    line-height: 50px;
}
.el-aside{
    background-color: #e5e5e5;
    margin-top: 25px;
    margin-left: 190px;
}
/* .el-header{
    height: 50px !important;
} */
.el-main {
    padding: 15px;
    margin-bottom: 15px;
}
.el-menu{
    border: none !important;
    background-color: #e5e5e5;
    color:#000;
}
.el-menu-item{
    color: #000 !important;
}
.el-menu-item:focus, .el-menu-item:hover {
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
.els {
    float: right;
    /* margin-top: 18px; */
}

.el1 {
    margin-right: 120px;
    margin-top: 15px;
}
.titles {
    color: #2196f3;
    font-size: 18px;
    padding-left: 150px;
}
.pcontain{
    width: 920px;
    height: 550px;
    overflow-x:hidden;
    overflow-y:auto;
    border: 1px solid #d5d5d5;
    margin-left: 15px;
    margin-top: 25px;
    border-radius: 5px;
}
.ptitle{
    background-color: #e5e5e5;
    line-height: 30px;
    padding: 10px;
    width: 900px;
    height: 30px;
    border-bottom: 1px solid #d5d5d5;
    color: #000;
}
.tops{
    height: 30px;
    margin-bottom:0;
}

</style>