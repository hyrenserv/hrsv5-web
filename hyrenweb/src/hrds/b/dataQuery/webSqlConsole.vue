<template>
    <div>
         <el-row class='topTitle'>
        <span>SQL 操作台</span>
        <router-link to="/collectmonitor">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
        <el-row>
            <hr>
        </el-row>
        <el-row>
            <el-col class="borderStyle" :span="5" style="margin-right: 10px;">
                <!--树菜单-->
                <el-input placeholder="输入关键字进行过滤" v-model="filterText"/>
                <div class='mytree'>
                <el-tree empty-text="暂无数据"  :expand-on-click-node="true" :indent='0' :props="treeProps" :load="loadNode" lazy
                         node-key="id" :filter-node-method="filterNode" ref="tree" highlight-current>
                          <span class="span-ellipsis" slot-scope="{ node, data }">
                            <span :title="node.label">{{ node.label }}</span>
                        </span>
                </el-tree>
                </div>
            </el-col>
            <el-col :span="18">
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="表查询" name="tableQuery">
                        <el-table :data="dataByTableName" border size="mini">
                            <el-table-column v-for="(index, item) in dataByTableName[0]" :key="dataByTableName.$index"
                                             :label="item" :prop="item">
                                <!-- 数据的遍历  scope.row就代表数据的每一个对象-->
                                <template slot-scope="scope">{{scope.row[scope.column.property]}}</template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="Sql查询" name="sqlQuery">
                        <el-col :span="20">
                            <el-input type="textarea" autosize placeholder="请输入查询SQL" v-model="querySQL"/>
                        </el-col>
                        <el-col :span="4">
                            <el-button class="query-sql-btn" type="primary" @click="getDataBySQL(querySQL)"
                                       size="small">查询
                            </el-button>
                        </el-col>
                        <el-table :data="dataBySQL" border size="mini">
                            <el-table-column v-for="(index, item) in dataBySQL[0]" :key="dataBySQL.$index" :label="item"
                                             :prop="item">
                                <!-- 数据的遍历  scope.row就代表数据的每一个对象-->
                                <template slot-scope="scope">{{scope.row[scope.column.property]}}</template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="图查询" name="graphQuery">图查询</el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import * as dataQuery from "./dataQuery";
    import * as fileOperations from '../../../utils/js/fileOperations'

    export default {
        name: "webSqlConsole",
        data() {
            return {
                querySQL: '',
                filterText: '',
                activeName: 'tableQuery',
                filterNodeData: [],
                dataByTableName: [],
                dataBySQL: [],
                treeDataInfo: {
                    isFileCo: 'false', tree_menu_from: 'webSQL', isPublicLayer: '1',
                    isRootNode: '1', tableName: ''
                },
                treeProps: {id: 'id', label: 'name', children: 'children',},
            };
        },
        watch: {
            //设置检索内容
            filterText() {
                this.$refs.tree.filter(this.filterText);
                // this.treeDataInfo.tableName = this.filterText;
                // dataQuery.getTreeNodeSearchInfo(this.treeDataInfo).then((res) => {
                //     res = fileOperations.getTreeNodeSearchInfo();
                //     console.log(res.data.search_nodes);
                //     this.searchResolve(res.data.search_nodes);
                // });
            }
        },
        mounted() {
        },
        methods: {
            // 节点搜索
            filterNode(value, data, node) {
                // 如果检索内容为空,直接返回
                if (!value) return true;
                // 如果传入的value和data中的name相同说明是匹配到了
                return data.name.indexOf(value) !== -1;
                // 否则要去判断它是不是选中节点的子节点
                // return this.checkBelongToChooseNode(value, data, node);
            },
            // 判断传入的节点是不是选中节点的子节点
            // checkBelongToChooseNode(value, data, node) {
            //     const level = node.level;
            //     // 如果传入的节点本身就是一级节点就不用校验了
            //     if (level === 1) {
            //         return false;
            //     }
            //     // 先取当前节点的父节点
            //     let parentData = node.parent;
            //     // 遍历当前节点的父节点
            //     let index = 0;
            //     while (index < level - 1) {
            //         // 如果匹配到直接返回
            //         if (parentData.data.name.indexOf(value) !== -1) {
            //             return true;
            //         }
            //         // 否则的话再往上一层做匹配
            //         parentData = parentData.parent;
            //         index++;
            //     }
            //     // 没匹配到返回false
            //     return false;
            // },
            // 加载树节点
            loadNode(node, resolve) {
                // this.searchResolve = resolve;
                // 如果节点level为0,获取源树节点,否则根据节点信息获取子节点数据 那个是搜索
                if (node.level === 0) {
                    dataQuery.getTreeDataInfo(this.treeDataInfo).then((res) => {
                        return resolve(res.data.tree_sources);
                    }).catch(() => {
                        return resolve([]);
                    });
                } else {
                    // 如果当前节点是父节点,则根据当前节点数据获取下一级的所有节点,否则根据节点信息查询数据
                    if (node.data.isParent) {
                        dataQuery.getTreeDataInfo(node.data).then((res) => {
                            return resolve(res.data.tree_sources);
                        });
                    } else {
                        // 查询数据
                        dataQuery.queryDataBasedOnTableName({'tableName': 'sys_para', 'queryNum': 10}).then((res) => {
                            this.dataByTableName = res.data;
                        });
                    }
                }

            },
            // 根据SQL查询数据
            getDataBySQL(querySQL) {
                if (querySQL === '') {
                    this.$message({type: 'warning', message: '查询sql不能为空!'});
                } else {
                    querySQL = "select * from sys_user";
                    dataQuery.queryDataBasedOnSql({'querySQL': querySQL, 'queryNum': 10}).then((res) => {
                        this.dataBySQL = res.data;
                    });
                }
            },
        }
    }
</script>
<style scoped>
    .borderStyle {
        border: 1px solid #e6e6e6;
        padding: 1%;
    }

    /* 查询sql按钮*/
    .query-sql-btn {
        margin-left: 5%;
    }
</style>
