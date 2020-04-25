<template>
    <div id='meta_listDataManagement'>
        <el-row class='topTitle'>
            <span>元数据管理</span>
            <router-link to="/dataControl">
                <el-button type="primary" size="small" class="goIndex">
                    <i class="fa fa-home fa-lg"/>返回首页
                </el-button>
            </router-link>
        </el-row>
        <el-row :gutter='60'>
            <el-col :span="6">
                <el-tabs v-model="mdmActiveName" type="border-card" @tab-click="tagHandleClick">
                    <el-tab-pane label="源数据列表" name="mdm">
                        <div class="mytree">
                            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini"/>
                            <el-tree class="filter-tree" :data="mdmTreeList" :indent='0' @node-click="mdmHandleClick"
                                     :default-expand-all="true" :filter-node-method="filterNode" ref="tree1">
                                <span class="span-ellipsis" slot-scope="{ node, data }">
                                    <span :title="data.description">{{node.label}}</span>
                                </span>
                            </el-tree>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="数据回收站" name="drb">
                        <div class="mytree">
                            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini"/>
                            <el-tree class="filter-tree" :data="drbTreeList" :indent='0' @node-click="drbHandleClick"
                                     :default-expand-all="true" :filter-node-method="filterNode" ref="tree2">
                                <span class="span-ellipsis" slot-scope="{node, data}">
                                    <span :title="data.description">{{node.label}}</span>
                                </span>
                            </el-tree>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <el-col :span="18">
                <el-row>
                    <el-form :model="data_meta_info" :inline="true">
                        <el-form-item label="表英文名 : " prop='table_name'>
                            <el-input placeholder="表英文名" size='mini' v-model="data_meta_info.table_name"
                                      :disabled="true"/>
                        </el-form-item>
                        <el-form-item label="表中文名 : " prop='table_ch_name'>
                            <el-input placeholder="表中文名" size='mini' v-model="data_meta_info.table_ch_name"
                                      v-bind:disabled="table_ch_name_input"/>
                        </el-form-item>
                        <el-form-item label="创建日期 : " prop='create_date'>
                            <el-input placeholder="创建日期 :" size='mini' v-model="data_meta_info.create_date"
                                      :disabled="true"/>
                        </el-form-item>
                        <template v-if="tag_type === 'mdm'">
                            <el-form-item>
                                <el-button type="primary" size="mini" @click="editMetadata()">编辑</el-button>
                                <el-button type="primary" size="mini" @click="saveMetaData()">保存</el-button>
                            </el-form-item>
                        </template>
                        <template v-else>
                            <el-form-item>
                                <el-button type="primary" size="mini" @click="restoreDRBTable()">恢复</el-button>
                            </el-form-item>
                        </template>
                    </el-form>
                </el-row>
                <el-row>
                    <el-table
                            :data="data_meta_info.meta_list.slice((currentPage-1) * pageSize,currentPage * pageSize)"
                            size="mini">
                        <el-table-column type="index" prop="date" label="序号" align="center" width="80px">
                            <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
                        </el-table-column>
                        <el-table-column prop="column_name" label="字段名" align="center"/>
                        <el-table-column prop="table_ch_name" label="字段中文名" align="center">
                            <template slot-scope="scope">
                                <el-input placeholder="表中文名" v-model="scope.row.column_ch_name"
                                          v-bind:disabled="column_ch_name_input"/>
                            </template>
                        </el-table-column>
                        <el-table-column prop="data_type" label="字段类型" align="center"/>
                        <el-table-column prop="data_len" label="长度" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.data_type==='numeric'">
                                    {{scope.row.data_len}},{{scope.row.decimal_point}}</span>
                                <span v-else>{{scope.row.data_len}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="is_primary_key" label="是否主键" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.is_primary_key==='0'">否</span>
                                <span v-else-if="scope.row.is_primary_key==='1'" class='issuecolor'>是</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                   :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pageSize"
                                   layout="total, sizes, prev, pager, next, jumper" style="text-align: center"
                                   :total="data_meta_info.meta_list.length">
                    </el-pagination>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import * as mdmFun from './mateDataManage'
    import Loading from "../../../components/loading/index";

    export default {
        components: {
            Loading,
        },
        data() {
            return {
                tag_type: 'mdm',
                table_ch_name_input: true,
                column_ch_name_input: true,
                currentPage: 1,
                pageSize: 5,
                totalSize: 0,
                mdmActiveName: 'mdm',
                mdmTreeList: [],
                drbTreeList: [],
                filterText: '',
                data_meta_info: {
                    table_id: '', data_layer: '', table_type: '', table_name: '', table_ch_name: '', create_date: '',
                    meta_list: [], data_len: 0,
                },
            }
        },
        created() {
            //页面初始化时获取源数据列表树
            this.getMDMTreeData();
        },
        watch: {
            //树节点搜索
            filterText(val) {
                this.$refs.tree1.filter(val);
                this.$refs.tree2.filter(val);
            },
        },
        methods: {
            /* 设置每页显示条数 */
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
            },
            /* 查询页面 */
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
            },
            //获取源数据列表树信息
            getMDMTreeData() {
                mdmFun.getMDMTreeData().then(res => {
                    this.mdmTreeList = res.data.mdmTreeList;
                })
            },
            //获取数据回收站树信息
            getDRBTreeData() {
                mdmFun.getDRBTreeData().then(res => {
                    this.drbTreeList = res.data.drbTreeList;
                })
            },
            //树节点搜索调用方法
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            //点击源数据管理树节点触发
            mdmHandleClick(data) {
                if (data.file_id !== '') {
                    mdmFun.getMDMTableColumnInfo({
                        "data_layer": data.data_layer, "file_id": data.file_id,
                    }).then(res => {
                        this.data_meta_info = res.data;
                        console.log(res.data);
                    })
                }
            },
            //点击回收站树节点触发
            drbHandleClick(data) {
                if (data.file_id !== '') {
                    mdmFun.getDRBTableColumnInfo({"failure_table_id": data.file_id}).then(res => {
                        this.data_meta_info = res.data;
                    })
                }
            },
            //点击tags标签触发
            tagHandleClick(data) {
                if (data.name === 'mdm') {
                    this.tag_type = 'mdm';
                    this.getMDMTreeData();
                }
                if (data.name === 'drb') {
                    this.tag_type = 'drb';
                    this.getDRBTreeData();
                }
            },
            //编辑元数据
            editMetadata() {
                console.log(this.data_meta_info);
                if ("DQC" !== this.data_meta_info.data_layer) {
                    this.table_ch_name_input = false;
                    this.column_ch_name_input = false;
                }
            },
            //保存元数据,保存完成后查询保存的信息
            saveMetaData() {
                console.log(this.data_meta_info);
                mdmFun.saveMetaData(this.data_meta_info).then(res => {
                    console.log(this.data_meta_info);
                    if (res.success) {
                        this.table_ch_name_input = true;
                    }
                });
            },
            //恢复数据回收站的表
            restoreDRBTable() {
                console.log(this.data_meta_info);
            }
        },
    }
</script>

<style lang="less">
    #meta_listDataManagement {
        .mytree /deep/ {
            .el-tree > .el-tree-node:after {
                border-top: none;
            }

            .el-tree-node {
                position: relative;
                padding-left: 16px;
            }

            //节点有间隙，隐藏掉展开按钮就好了,如果觉得空隙没事可以删掉
            /*.el-tree-node__expand-icon.is-leaf {*/
            /*    display: none;*/
            /*}*/

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
