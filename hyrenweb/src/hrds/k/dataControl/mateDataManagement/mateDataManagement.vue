<template>
    <div id='mateDataManagement'>
        <el-row class='topTitle'>
            <span>元数据管理</span>
            <router-link to="/dataControl">
                <el-button type="primary" size="small" class="goIndex">
                    <i class="fa fa-home fa-lg"/>返回首页
                </el-button>
            </router-link>
        </el-row>
        <el-row :gutter='20'>
            <el-col :span="6">
                <el-tabs v-model="mdmActiveName" @tab-click="dmdHandleClick">
                    <el-tab-pane label="源数据管理" name="mdm">
                        <div class="mytree" height='260'>
                            <el-tree class="filter-tree" :data="mdmTreeData" :indent='0' @node-click="mdmHandleClick"
                                     :default-expand-all="true">
                                <span class="span-ellipsis" slot-scope="{ node, data }">
                                    <span :title="data.description">{{node.label}}</span>
                                </span>
                            </el-tree>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="数据回收站" name="drb">
                        <div class="mytree" height='260'>
                            <el-tree class="filter-tree" :data="drbTreeData" :indent='0' @node-click="drbHandleClick"
                                     :default-expand-all="true">
                                <span class="span-ellipsis" slot-scope="{ node, data }">
                                    <span :title="data.description">{{node.label}}</span>
                                </span>
                            </el-tree>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import * as mdmFun from './mateDataManagement'
    import Loading from "../../../components/loading/index";

    export default {
        components: {
            Loading,
        },
        data() {
            return {
                mdmActiveName: 'mdm',
                mdmTreeData: [],
                drbTreeData: [],
            }
        },
        created() {
            //获取统计数据
            this.getMDMTreeData();
        },
        methods: {
            //获取统计数据
            getMDMTreeData() {
                mdmFun.getMDMTreeData().then(res => {
                    console.log(res.data.mdmTreeList);
                    this.mdmTreeData = res.data.mdmTreeList;
                })
            },
            //点击源数据管理树节点触发
            mdmHandleClick(data) {
                console.log(data);
            },
            //点击回收站树节点触发
            drbHandleClick(data) {
                console.log(data);
            },
            //点击tags标签触发
            dmdHandleClick(data) {
                console.log(data.name);
            }
        },
    }
</script>

<style lang="less">
    #mateDataManagement {
        .mytree /deep/ {
            .el-tree > .el-tree-node:after {
                border-top: none;
            }

            .el-tree-node {
                position: relative;
                padding-left: 16px;
            }

            //节点有间隙，隐藏掉展开按钮就好了,如果觉得空隙没事可以删掉
            /*  .el-tree-node__expand-icon.is-leaf {
                    display: none;
                } */

            .el-tree-node__children {
                padding-left: 16px;
            }

            .el-tree-node :last-child:before {
                height: 38px;
            }

            .el-tree > .el-tree-node:before {
                border-left: none;
            }

            .el-tree > .el-tree-node:after {
                border-top: none;
            }

            .el-tree-node:before {
                content: "";
                left: -4px;
                position: absolute;
                right: auto;
                border-width: 1px;
            }

            .el-tree-node:after {
                content: "";
                left: -4px;
                position: absolute;
                right: auto;
                border-width: 1px;
            }

            .el-tree-node:before {
                border-left: 1px dashed #4386c6;
                bottom: 0;
                height: 100%;
                top: -26px;
                width: 1px;
            }

            .el-tree-node__content {
                padding: 0 !important;
            }

            .el-tree-node__content > .el-tree-node__expand-icon {
                padding: 0;
            }

            .el-tree-node:after {
                border-top: 1px dashed #4386c6;
                height: 20px;
                top: 12px;
                width: 24px;
            }
        }
    }
</style>
