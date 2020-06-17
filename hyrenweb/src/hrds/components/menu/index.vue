<template>
<div class="home">
    <el-container style="height:100%">
        <el-header>
            <el-row>
                <el-col :span="6" style='text-align:left;line-height: 60px;'>
                    <span @click="meanClickFun()" style="cursor: pointer;"><i class="el-icon-menu" style="font-size:18px;margin-right:8px;">&nbsp;菜单列表</i></span>
                </el-col>
                <el-col :span="12">&nbsp;
                    <!-- <el-link :underline="false" @click="goback"><i class="el-icon-s-check">修改密码</i></el-link> -->
                </el-col>
                <el-col :span="6" style='text-align:right'>
                    <el-link :underline="false" @click="goback"><i class="el-icon-s-custom" style="color:#fff">退出登录</i></el-link>
                </el-col>
            </el-row>
        </el-header>
        <div style="margin-bottom:44px;"></div>
        <el-container>
            <div style="position:fixed" class='leftmean'>
                <el-container>
                    <el-aside :class="isCollapse==true?'aside1':'aside2'">
                        <happy-scroll color="rgba(204, 200, 200, 0.6)" size="5" resize>
                            <!-- 导航 -->
                            <el-menu :unique-opened='true' style="border:0" background-color="#495179" text-color="#fff" active-text-color="rgba(255, 208, 75, 0.8)" router :default-active="$route.path" :collapse-transition="true" :collapse="isCollapse" class="el-menu-vertical-demo">
                                <div v-for="items in menus" :key="items.name">
                                    <template v-if="items.children">
                                        <!--二级菜单循环-->
                                        <el-submenu :index="items.children[0].path" class='oneMenu'>
                                            <template slot="title"><i :class="items.icon"></i><span slot="title" v-if="isCollapse==false">{{items.title}}</span></template>
                                            <el-menu-item v-for="item in items.children" :key="item.name" :index="item.path">
                                                <i :class="item.icon"></i>
                                                <span>{{item.title}}</span>
                                            </el-menu-item>
                                        </el-submenu>
                                    </template>
                                    <template v-else>
                                        <!--一级菜单循环-->
                                        <el-menu-item :index="items.path">
                                            <i :class="items.icon"></i>
                                            <span slot="title">{{items.title}}</span>
                                        </el-menu-item>
                                    </template>
                                </div>
                            </el-menu>
                        </happy-scroll>
                    </el-aside>
                </el-container>
            </div>
            <div :class="isCollapse==true?'asidewidth1':'asidewidth2'"></div>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
        <div style="margin-top:18px"></div>
        <el-footer><span>版权所有：海云数服 Version 5.0</span></el-footer>
    </el-container>
</div>
</template>

<script>
import {
    mapActions
} from 'vuex'
import Scrollbar from '../scrollbar';

import * as addTaskAllFun from './menu'
import childrenMenus from './childrenMenus'
export default {
    components: {
        Scrollbar,
    },
    data() {
        return {
            menus: [],
            deflink: '',
            isCollapse: false,
        }
    },
    mounted() {
        // 这里是菜单默认路径
        // this.$router.push('syspara');
        addTaskAllFun.getMenu().then(res => {
            let data = res.data;
            let arr = []
            for (var i = 0; i < data.length; i++) {
                let user_type = data[i].user_type;
                let children = {
                    'icon': data[i].menu_remark,
                    'title': data[i].menu_name,
                    'path': data[i].menu_path
                }
                if (typeof childrenMenus[user_type] != 'undefined') {
                    children['children'] = childrenMenus[user_type]
                }
                arr.push(children)
            }
            this.menus = JSON.parse(JSON.stringify(arr));
            // this.deflink = this.menus[0]?this.menus[0].path:''

        })
        addTaskAllFun.getDefaultPage().then(res => {
            this.deflink = res.data;
        });

    },
    methods: {
        ...mapActions(['resetToken']),
        goback() {
            this.resetToken();
            this.$router.push('/');
        },
        meanClickFun() {
            this.isCollapse = !this.isCollapse
        },

    }
}
</script>

<style scoped>
.aside2 {
    background-color: #495179;
    min-height: 89.1vh;
    width: 200px !important;
    transition: 0.5s;
}

.aside1 {
    background-color: #495179;
    min-height: 89.1vh;
    width: 64px !important;
    transition: 0.5s;
}

.asidewidth2 {
    margin-left: 200px;
    transition: 0.5s;
}

.asidewidth1 {
    margin-left: 64px;
    transition: 0.5s;
}

.leftmean>>>.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-header {
    background-color: #495179;
    text-align: center;
    color: #fff;
    position: fixed;
    top: 0%;
    width: 100%;
    z-index: 10;
    left: 0;
    height: 45px !important;
    line-height: 45px;
}

.el-main {
    padding: 14px 20px;
}

.el-container {
    min-height: 93vh;
}

.el-footer {
    height: 30px !important;
    line-height: 30px;
    font-size: 12px;
    position: fixed;
    bottom: 0%;
    width: 100%;
    z-index: 10;
    background-color: #495179;
    text-align: center;
    color: #fff;
}
</style>
