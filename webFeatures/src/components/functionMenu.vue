<template>
<div class="hello">
    <el-container style="max-height:680px;min-height:680px; border: 1px solid #eee">
        <el-aside width="300px" style="background-color: #fff">
            <el-menu router default-active="items.children[0].path" unique-opened="true" background-color="#545c64" text-color="#fff">
                <div v-for="items in menus" :key="items.title">
                    <template v-if="items.children">
                        <!--二级菜单循环-->
                        <el-submenu :index="items.path">
                            <template slot="title">
                                <i class="el-icon-setting"></i>
                                {{items.title}}
                            </template>
                            <div v-for="item in items.children" :key="item.title">
                                <template v-if="item.children">
                                    <!--三级菜单循环-->
                                    <el-submenu :index="item.path">
                                        <template slot="title">
                                            {{item.title}}
                                        </template>
                                        <div v-for="data in item.children" :key="data.title">
                                            <el-menu-item @click="handleOpen(data.title)" :index="data.path">
                                                <i :class="data.icon"></i>
                                                <span>{{data.title}}</span>
                                            </el-menu-item>
                                        </div>
                                    </el-submenu>
                                </template>
                                <template v-else>
                                    <el-menu-item @click="handleOpen(item.title)" :index="item.path">
                                        <i :class="item.icon"></i>
                                        <span>{{item.title}}</span>
                                    </el-menu-item>
                                </template>
                            </div>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <!--一级菜单循环-->
                        <el-menu-item @click="handleOpen(items.title)" :index="items.path">
                            <i :class="items.icon"></i>
                            <span>{{items.title}}</span>
                        </el-menu-item>
                    </template>
                </div>
            </el-menu>
        </el-aside>

        <el-container>
            <el-main v-if="titleMsg">
                <el-row>
                    <span>{{titleMsg}}</span>
                    <el-divider></el-divider>
                </el-row>
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
        return {
            menus: menu,
            titleMsg: ''
        }
    },
    methods: {
        handleOpen(msg) {
            this.titleMsg = msg;
        }
    }
};
</script>
