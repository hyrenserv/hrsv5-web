<template>
<div class="hello">
    

    <el-container style="height: 680px; border: 1px solid #eee">
        <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
            <el-menu router :default-active="menus[0].path">
                <div v-for="items in menus" :key="items.title">
                    <template v-if="items.children">
                        <!--二级菜单循环-->
                        <el-submenu :index="items.children[0].path">
                            <template slot="title">
                                <i class="el-icon-message"></i>
                                {{items.title}}
                            </template>
                            <div v-for="item in items.children" :key="item.title">
                                <template v-if="item.children">
                                    <!--三级菜单循环-->
                                    <el-submenu :index="item.children[0].path">
                                        <template slot="title">
                                            <i class="el-icon-message"></i>
                                            {{item.title}}
                                        </template>
                                        <div v-for="data in item.children" :key="data.title">
                                            <el-menu-item :index="data.path">
                                                <i :class="data.icon"></i>
                                                <span>{{data.title}}</span>
                                            </el-menu-item>
                                        </div>
                                    </el-submenu>
                                </template>
                                <template v-else>
                                    <el-menu-item :index="item.path">
                                        <i :class="item.icon"></i>
                                        <span>{{item.title}}</span>
                                    </el-menu-item>
                                </template>
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
               <router-view />
            </el-main>
        </el-container>
    </el-container>
</div>
</template>

<script>
import menu from "./menu";
export default {
    data() {
        const item = {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          };
        return {
            menus: menu,
            tableData: Array(20).fill(item)
        };
    },
    methods: {

    }
};
</script>

<style scoped>
.el-header,
.el-footer {
    background-color: #3f51b5;
    text-align: center;
    line-height: 50px;
    color: #fff;
}

.el-aside {
    height: 100%;
}

.el-menu {
    height: 100%;
    /* background-color: #3F51B5; */
}

.hello .el-header i {
    color: white;
}

.el-footer {
    width: 100%;
    height: 45px !important;
    /* footer的高度一定要是固定值*/
    position: absolute;
    bottom: 0px;
    left: 0px;
    font-size: 12px;
}
</style>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
