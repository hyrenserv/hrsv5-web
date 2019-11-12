
<template>
<div class="home">
    <el-container>
        <el-header>
            <el-row type="flex" :gutter="29">
                <el-col :span="6">
                    <span><i class="el-icon-menu"></i>菜单列表</span>
                </el-col>
                <el-col :span="2" :offset="19">
                    <!-- <el-link :underline="false" @click="goback"><i class="el-icon-s-check">修改密码</i></el-link> -->
                </el-col>
                <el-col :span="6">
                    <el-link :underline="false" @click="goback"><i class="el-icon-s-custom" style="color:#fff">退出登录</i></el-link>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="15%">
                <!-- 导航 -->
                <el-menu router :default-active="menus[0].path">
                    <div v-for="items in menus" :key="items.name">
                        <template v-if="items.children">
                            <!--二级菜单循环-->
                            <el-submenu :index="items.children[0].path">
                                <template slot="title"><i class="el-icon-message"></i>{{items.title}}</template>
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
                <el-main>
                    <router-view></router-view>
                </el-main>
                <!-- <el-footer><span>版权所有：海云数服 Version 5.0</span></el-footer> -->
            </el-container>
        </el-container>
        <el-footer><span>版权所有：海云数服 Version 5.0</span></el-footer>
    </el-container>
</div>
</template>

<script>
import {
    mapActions
} from 'vuex'
import menu from './menu'
export default {
    data() {
        return {
            menus: menu
        }
    },
    mounted() {
        // 这里是菜单默认路径
        // this.$router.push('syspara');
    },
    methods: {
        ...mapActions(['resetToken']),
        goback() {
            this.resetToken();
            this.$router.push('/');
        }
    }
}
</script>

<style scoped>
.el-header,
.el-footer {
    background-color: #495179;
    text-align: center;
    line-height: 50px;
    color: #fff;
}
.el-aside{background-color: #495179;}
.el-header{
    height: 50px !important;
}
.el-main {
    padding: 15px;
    margin-bottom: 15px;
}
.el-menu{
    border: none !important;
    background-color: #495179 !important;
    color:#fff;
}
.el-menu-item{
    color: #fff !important;
}
.el-menu-item:focus, .el-menu-item:hover {
    outline: 0;
    background-color: #aacaf0;
}
.el-container {
    min-height: 556px;
}
.el-menu-item.is-active {
    color: #409EFF !important;
}

/* .home .el-header i {
    color: white;
} */

.el-footer {
    height: 30px !important;
    line-height: 30px;
    font-size: 12px;
    position: fixed;
    bottom: 0%;
    width: 100%;
    z-index: 10;
}
</style>
