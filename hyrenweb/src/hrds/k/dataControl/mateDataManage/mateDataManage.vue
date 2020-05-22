<template>
    <div id='metaDataManagement'>
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
                            <el-tree class="filter-tree" :data="mdmTreeList" :indent='0'
                                     @node-click="mdmHandleClick" @node-contextmenu="rightMouseClick"
                                     :filter-node-method="filterNode" ref="tree1">
                                <span class="span-ellipsis" slot-scope="{ node, data }">
                                    <span :title="data.description">{{node.label}}</span>

                                </span>
                            </el-tree>
                            <div v-show="mouseVisible">
                                <ul id="menu" class="menu">
                                    <li class="menu__item" @click="tableSetToInvalid">删除</li>
                                </ul>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="数据回收站" name="drb">
                        <div class="mytree">
                            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini"/>
                            <el-tree class="filter-tree" :data="drbTreeList" :indent='0'
                                     @node-click="drbHandleClick" @node-contextmenu="recoverRightMouseClick"
                                     :filter-node-method="filterNode" ref="tree2">
                                <span class="span-ellipsis" slot-scope="{node, data}">
                                    <span :title="data.description">{{node.label}}</span>
                                </span>
                            </el-tree>
                            <div v-show="recoverMouseVisible">
                                <ul id="menu2" class="menu2">
                                    <li class="menu__item2" @click="removeCompletelyTable">彻底删除表</li>
                                    <li class="menu__item2" @click="restoreDRBTable">恢复表</li>
                                </ul>
                            </div>
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
                        <template v-if="data_meta_info.table_id !== ''">
                            <template v-if="tag_type === 'mdm'">
                                <el-form-item>
                                    <template v-if="data_meta_info.data_layer !=='DQC'">
                                        <el-button type="primary" size="mini" @click="editMetadata()">编辑
                                        </el-button>
                                        <el-button type="success" size="mini" @click="saveMetaData()">保存
                                        </el-button>
                                    </template>
                                    <el-button type="danger" size="mini" @click="tableSetToInvalid()">删除
                                    </el-button>
                                </el-form-item>
                            </template>
                            <template v-else>
                                <el-form-item>
                                    <el-button type="primary" size="mini" @click="restoreDRBTable()">恢复
                                    </el-button>
                                </el-form-item>
                            </template>
                        </template>
                    </el-form>
                </el-row>
                <el-row>
                    <el-table
                            :data="data_meta_info.column_info_list.slice((currentPage-1) * pageSize,currentPage * pageSize)"
                            size="mini">
                        <el-table-column type="index" prop="date" label="序号" align="center" width="80px">
                            <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}
                            </template>
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
                                   :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]"
                                   :page-size="pageSize"
                                   layout="total, sizes, prev, pager, next, jumper" style="text-align: center"
                                   :total="data_meta_info.column_info_list.length">
                    </el-pagination>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import * as mdmFun from './mateDataManage'
    import Loading from "../../../components/loading/index";
    import * as vcFun from "../variableConfig/variableConfig";
    import * as message from "../../../../utils/js/message";

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
                description: '',
                mouseVisible: false,
                recoverMouseVisible: false,
                data_meta_info: {
                    file_id: '',
                    table_id: '',
                    data_layer: '',
                    table_type: '',
                    table_name: '',
                    table_ch_name: '',
                    create_date: '',
                    column_info_list: [],
                    data_len: 0,
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
            //点击tags标签触发
            tagHandleClick(data) {
                this.column_ch_name_input = true;
                this.table_ch_name_input = true;
                this.data_meta_info = {table_id: '', column_info_list: []};
                if (data.name === 'mdm') {
                    this.tag_type = 'mdm';
                    this.getMDMTreeData();
                }
                if (data.name === 'drb') {
                    this.tag_type = 'drb';
                    this.getDRBTreeData();
                }
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
                this.mouseVisible = false;
                //初始化输入框
                this.table_ch_name_input = true;
                this.column_ch_name_input = true;
                //初始化查询结果
                this.data_meta_info = {table_id: '', column_info_list: []};
                if (data.file_id !== '') {
                    mdmFun.getMDMTableColumnInfo({
                        "data_layer": data.data_layer, "file_id": data.file_id,
                    }).then(res => {
                        if (res.success) {
                            this.data_meta_info = res.data;
                        } else {
                            this.data_meta_info = {table_id: '', column_info_list: []};
                        }
                    })
                }
            },
            // 树节点鼠标右击事件
            rightMouseClick(event, object, value, element) {
                if (value.level !== 2) {
                    this.mouseVisible = true;
                    const menu = document.querySelector('#menu');
                    this.description = object.description;
                    menu.style.left = event.clientX - 210 + 'px';
                    menu.style.top = event.clientY - 120 + 'px';
                }
            },
            hiddenMouse() {
                this.mouseVisible = false;
                this.recoverMouseVisible = false;
            },
            // 回收站树节点鼠标右击事件
            recoverRightMouseClick(event, object, value, element) {
                if (value.level !== 2) {
                    // 共四个参数，依次为：event、传递给data属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身
                    this.recoverMouseVisible = true;
                    const menu = document.querySelector('#menu2');
                    this.description = object.description;
                    menu.style.left = event.clientX - 210 + 'px';
                    menu.style.top = event.clientY - 120 + 'px';
                }
            },
            //点击回收站树节点触发
            drbHandleClick(data) {
                this.recoverMouseVisible=false;
                if (data.file_id !== '') {
                    mdmFun.getDRBTableColumnInfo({"failure_table_id": data.file_id}).then(res => {
                        if (res.success) {
                            this.data_meta_info = res.data;
                        } else {
                            this.data_meta_info = {table_id: '', column_info_list: []};
                        }
                    })
                }
            },
            //编辑元数据
            editMetadata() {
                this.table_ch_name_input = false;
                this.column_ch_name_input = false;
            },
            //保存元数据,保存完成后查询保存的信息
            saveMetaData() {
                let params = {};
                let columnInfoBeans = [];
                this.data_meta_info.column_info_list.forEach(o => {
                    let column_info = {};
                    column_info['column_id'] = o.column_id;
                    column_info['column_ch_name'] = o.column_ch_name;
                    columnInfoBeans.push(column_info);
                });
                params['columnInfoBeans'] = JSON.stringify(columnInfoBeans);
                params['data_layer'] = this.data_meta_info.data_layer;
                params['table_ch_name'] = this.data_meta_info.table_ch_name;
                params['file_id'] = this.data_meta_info.file_id;
                params['table_id'] = this.data_meta_info.table_id;
                mdmFun.saveMetaData(params).then(res => {
                    if (res.success) {
                        this.table_ch_name_input = true;
                        this.column_ch_name_input = true;
                    }
                });
            },
            //删除表(表设置为无效)
            tableSetToInvalid() {
                this.$confirm('确定要将' + this.description + '表放入数据回收站吗？?', '提示', {
                    confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning',
                }).then(() => {
                    mdmFun.tableSetToInvalid({
                        'data_layer': this.data_meta_info.data_layer,
                        'file_id': this.data_meta_info.file_id
                    }).then(res => {
                        if (res.success) {
                            //重新获取树数据
                            this.getMDMTreeData();
                            this.data_meta_info = {table_id: '', column_info_list: []};
                            this.menuVisible = false;
                        }
                    })
                }).catch(() => {
                    this.hiddenMouse();
                });
            },
            //恢复数据回收站的表
            restoreDRBTable() {
                this.$confirm('确定要将' + this.description + '表恢复吗?', '提示', {
                    confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning',
                }).then(() => {
                    mdmFun.restoreDRBTable({
                        'data_layer': this.data_meta_info.data_layer,
                        'file_id': this.data_meta_info.file_id
                    }).then(res => {
                        if (res.success) {
                            //重新获取树数据
                            this.getDRBTreeData();
                            this.data_meta_info = {table_id: '', column_info_list: []};
                        }
                    })
                }).catch(() => {
                    this.hiddenMouse();
                });
            },
            //恢复数据回收站的表
            removeCompletelyTable() {
                this.$confirm('确定要将' + this.description + '表彻底删除吗?', '提示', {
                    confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning',
                }).then(() => {
                    mdmFun.removeCompletelyTable({
                        'data_layer': this.data_meta_info.data_layer,
                        'file_id': this.data_meta_info.file_id
                    }).then(res => {
                        if (res.success) {
                            //重新获取树数据
                            this.getDRBTreeData();
                            this.data_meta_info = {table_id: '', column_info_list: []};
                        }
                    })
                }).catch(() => {
                    this.hiddenMouse();
                });
            },
        }
    }
</script>

<style lang="less">
    .menu__item {
        display: block;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
    }

    .menu {
        height: 20px;
        width: 40px;
        position: absolute;
        border: 1px solid #999999;
        background-color: #f5f5f5;
    }

    .menu__item2 {
        display: block;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
    }

    .menu2 {
        height: 40px;
        width: 60px;
        position: absolute;
        border: 1px solid #999999;
        background-color: #f5f5f5;
    }

    li:hover {
        color: brown;
        cursor: pointer;
    }

    #metaDataManagement {
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
