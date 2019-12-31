<template>
    <div>
        <el-row>
            <span class="el-icon-monitor" style="color: #3a8ee6"> SQL 操作台</span>
        </el-row>
        <el-row>
            <hr>
        </el-row>
        <el-row>
            <el-col :span="2">
                <navigation-menu></navigation-menu>
            </el-col>
            <el-col class="borderStyle" :span="5" style="margin-right: 10px;">
                <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
                <el-tree empty-text="暂无数据" :expand-on-click-node="true" :props="treeProps" :load="loadNode" lazy
                         node-key="id" :filter-node-method="filterNode" ref="tree">
                </el-tree>
            </el-col>
            <el-col :span="16">
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
                        <template class="sql-search">
                            <el-col :span="20">
                                <el-input type="textarea" autosize placeholder="请输入查询SQL" v-model="querySQL"></el-input>
                            </el-col>
                            <el-col :span="4">
                                <el-button class="query-sql-btn" type="primary" @click="getDataBySQL(querySQL)"
                                           size="small">查询
                                </el-button>
                            </el-col>
                        </template>
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
    import navigationMenu from "./navigationMenu";
    import * as dataQuery from "./dataQuery";

    export default {
        components: {
            "navigation-menu": navigationMenu,
        },
        data() {
            return {
                querySQL: '',
                activeIndex: 1,
                filterText: '',
                activeName: 'tableQuery',
                treeNode: [],
                dataByTableName: [],
                dataBySQL: [],
                treeDataInfo: {
                    agent_layer: '', source_id: '', classify_id: '', data_mart_id: '', category_id: '',
                    systemDataType: '', kafka_id: '', batch_id: '', groupid: '', sdm_consum_id: '', type_id: '',
                    parent_id: '', spaceTable: '', database_type: '', isFileCo: 'false', tree_menu_from: 'webSQL',
                    isPublicLayer: '1', isRootNode: '1', isIntoHBase: '', isParent: ''
                },
                treeProps: {
                    id: 'id',
                    label: 'name',
                    children: 'children',
                },
            };
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        mounted() {
        },
        methods: {
            // 节点搜索
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            // 加载树结点
            loadNode(node, resolve) {
                // 如果节点level为0,获取源树节点,否则根据节点信息获取子节点数据
                if (node.level === 0) {
                    dataQuery.getTreeDataInfo(this.treeDataInfo).then((res) => {
                        this.treeNode = res.data.tree_sources;
                        return resolve(this.treeNode);
                    }).catch(() => {
                        this.treeNode = [];
                        return resolve(this.treeNode)
                    });
                } else {
                    // 如果当前节点是父节点,则根据当前节点数据获取下一级的所有节点,否则根据节点信息查询数据
                    if (node.data.isParent) {
                        dataQuery.getTreeDataInfo(node.data).then((res) => {
                            return resolve(res.data.tree_sources);
                        });
                    } else {
                        // 查询数据
                        dataQuery.queryDataBasedOnTableName({'tableName': 'sys_para', 'queryNum': 8}).then((res) => {
                            this.dataByTableName = res.data;
                            return resolve([]);
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
                    dataQuery.queryDataBasedOnSql({'querySQL': querySQL, 'queryNum': 8}).then((res) => {
                        this.dataBySQL = res.data;
                    });
                }
            }
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
