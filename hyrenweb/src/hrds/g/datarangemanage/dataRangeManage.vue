<template>
    <div class="dataRangeManage">
        <el-row>
            <i class="el-icon-s-data">数据使用范围</i>
            <router-link to="/serviceMage">
                <el-button type="primary" size="mini" icon="el-icon-s-home">
                    返回首页
                </el-button>
            </router-link>
        </el-row>
        <el-divider/>
        <el-row :gutter='20'>
            <el-col :span='6'>
                <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini">
                </el-input>
                <div class="mytree" hight='200'>
                    <el-tree class="filter-tree" :data="treeData" :indent='0' :filter-node-method="filterNode"
                             ref="tree" @node-click="handleNodeClick">
                        <span class="span-ellipsis" slot-scope="{ node, data }">
                            <span :title="node.label">{{ node.label }}</span>
                        </span>
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="18" style="border-left: 1px #e0dcdc dashed;min-height: 400px;">
                <el-form ref="form" :model="form" label-width="100px" size="medium">
                    <el-row><span class="fontStyle">表信息列表
                        <el-button class="button-save" type="success" size="mini"
                                   @click="saveTableData('form')">保存
                        </el-button>
                    </span></el-row>
                    <el-divider/>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="用户选择" :rules="filter_rules([{required: true}])">
                                <el-select v-model="form.user_id" multiple clearable placeholder="请选择"
                                           style="width: 260px;">
                                    <el-option
                                            v-for="item in userData"
                                            :label="item.user_name"
                                            :value="item.user_id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="备注">
                                <el-input v-model="form.table_note" placeholder="备注" clearable/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <!--接口信息列表展示-->
                        <el-table :data="tableData.slice((currPage - 1) * pageSize,currPage*pageSize)"
                                  border style="width: 100%" ref="multipleTable"
                                  :row-key="(row)=>{ return row.table_id}"
                                  @selection-change="selectionChange" @select-all='allSelect'>
                            <el-table-column width="40" align="center" type="selection"
                                             :reserve-selection="true">
                            </el-table-column>
                            <el-table-column label="序号" align="center">
                                <template slot-scope="scope">
                                    <span>{{scope.$index+(currPage - 1) * pageSize + 1}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="table_name" label="采集原始表名" align="center"/>
                            <el-table-column prop="original_name" label="原始表中文名" align="center"/>
                            <el-table-column prop="hyren_name" v-show="tableShowStatus" label="系统内对应表名"
                                             align="center"/>
                            <el-table-column prop="selectColumn" label="选择字段" align="center">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="mini"
                                               @click="searchFieldById(scope.row,scope.$index)">
                                        选择字段
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!-- 分页内容 -->
                        <el-row class="pagination">
                            <el-pagination @current-change="handleCurrentChangeList" :current-page="currPage"
                                           @size-change="handleSizeChange" :page-sizes="[5, 10, 50, 100,500]"
                                           :page-size="pageSize"
                                           layout=" total,sizes,prev, pager, next,jumper"
                                           :total="totalSize" class='locationcenter'/>
                        </el-row>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
        <!--选择列展示-->
        <el-dialog title="查看字段信息" :visible.sync="dialogShowFieldFormVisible"
                   :before-close="beforeShowFieldClose">
            <el-table :data="columnData" border style="width: 100%" ref="multipleColumnTable"
                      :row-key="(row)=>{ return row.column_id}" height="450"
                      @select="columnSelectionChange" @select-all='allColumnSelect'>
                <el-table-column width="40" align="center" type="selection" :reserve-selection="true">
                </el-table-column>
                <el-table-column label="序号" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(currPage - 1) * pageSize + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="field_en_name" label="字段名" align="center"/>
                <el-table-column prop="field_cn_name" label="字段中文名" align="center"/>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel" size="mini">取 消</el-button>
                <el-button type="primary" @click="addColumn" size="mini">确 认
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import * as interfaceFunctionAll from "./dataRangeManage";
    import * as validator from "@/utils/js/validator";
    import * as message from "@/utils/js/message";
    import Scrollbar from '../../components/scrollbar';
    import Loading from "../../components/loading/index";

    export default {
        components: {
            Scrollbar,
            Loading
        },
        //写定义的变量数据方法等
        data() {
            return {
                rule: validator.default,
                currPage: 1,
                pageSize: 10,
                totalSize: 0,
                selectRow: [],
                tableData: [],
                columnData: [],
                selectColumnRow: [],
                userData: [],
                treeData: [],
                checkedAll: false,
                checked: false,
                dialogShowFieldFormVisible: false,
                filterText: '',
                tableShowStatus: true,
                index: "",
                form: {
                    table_note: '',
                    user_id: []
                }
            }
        },
        mounted() {
            this.searchDataUsageRangeInfoToTreeData();
            this.searchUserInfo();
        },
        methods: {
            // 展示树数据
            searchDataUsageRangeInfoToTreeData() {
                interfaceFunctionAll.searchDataUsageRangeInfoToTreeData().then(res => {
                    this.treeData = res.data;
                })
            },
            // 查询用户信息
            searchUserInfo() {
                interfaceFunctionAll.searchUserInfo().then(res => {
                    this.userData = res.data;
                })
            },
            // 选择字段
            searchFieldById(row, index) {
                this.index = index;
                this.dialogShowFieldFormVisible = true;
                let params = {};
                params["data_layer"] = row.data_layer;
                params["file_id"] = row.file_id;
                interfaceFunctionAll.searchFieldById(params).then(res => {
                    this.columnData = res.data;
                    this.totalSize = res.data.length;
                })
            },
            // 保存表数据
            saveTableData(formName) {
                let params = {};
                let tableDataInfos = [];
                if (this.selectRow.length === 0) {
                    this.$message({
                        message: "请至少选择一条数据",
                        type: 'warning'
                    });
                    return;
                }
                this.selectRow.forEach(row => {
                    let param = {};
                    let column_id = [];
                    let column_name = [];
                    if (row.selectColumn !== undefined) {
                        row.selectColumn.forEach(o => {
                            column_id.push(o.column_id);
                            column_name.push(o.field_en_name);
                        })
                        param["column_id"] = column_id;
                        param["column_name"] = column_name;
                    }
                    param["file_id"] = row.file_id;
                    tableDataInfos.push(param)
                });
                params["tableDataInfos"] = JSON.stringify(tableDataInfos);
                params["data_layer"] = this.selectRow[0].data_layer;
                params["user_id"] = this.form.user_id;
                params["table_note"] = this.form.table_note;
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        // 处理参数
                        interfaceFunctionAll.saveTableData(params).then((res) => {
                            message.saveSuccess(res);
                            if (this.selectRow.selectColumn !== undefined) {
                                this.$refs.multipleColumnTable.clearSelection();
                            }
                            this.$refs.multipleTable.clearSelection();
                            this.form = [];
                            this.tableData=[];
                            this.searchUserInfo();
                            this.searchDataUsageRangeInfoToTreeData();
                        })
                    }
                });
            },
            //表数据实现分页功能
            handleCurrentChangeList(currPage) {
                //把val赋给当前页面
                this.currPage = currPage;
                this.searchInterfaceInfoByType("1", currPage, this.pageSize);
            },
            // 改变每页显示条数
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.searchInterfaceInfoByType("1", 1, pageSize);
            },
            // 树节点触发
            handleNodeClick(data) {
                this.tableData = [];
                if (data.file_id === "" && data.classify_id !== "") {
                    if (typeof data.children !== "undefined")
                        this.tableData = data.children;
                } else if (data.file_id !== "") {
                    this.tableData.push(data);
                }
            },
            beforeShowFieldClose() {
                this.dialogShowFieldFormVisible = false;
            },
            // 表全选
            allSelect(all) {
                this.selectRow = all
            },
            // 表复选框选中
            selectionChange(selectTrue) {
                this.selectRow = selectTrue
            },
            // 选择字段全选
            allColumnSelect(all) {
                this.tableData[this.index].selectColumn = all;
            },
            // 选择字段复选框选中
            columnSelectionChange(selectTrue) {
                this.tableData[this.index].selectColumn = selectTrue;
            },
            // 取消
            cancel() {
                this.$refs.multipleColumnTable.clearSelection();
                this.dialogShowFieldFormVisible = false
            },
            // 确认
            addColumn() {
                this.$refs.multipleColumnTable.clearSelection();
                this.dialogShowFieldFormVisible = false;
            },
            // 搜索过滤节点
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
        }
    };
</script>
<style lang="less">
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
            bottom: 0px;
            height: 100%;
            top: -26px;
            width: 1px;
        }

        .el-tree-node__content > .el-tree-node__expand-icon {
            padding: 0px;
        }

        .el-tree-node:after {
            border-top: 1px dashed #4386c6;
            height: 20px;
            top: 12px;
            width: 24px;
        }
    }

    .el-icon-s-data {
        margin-bottom: 10px;
        margin-right: 1100px;
        font-size: 18px;
        text-align: center;
        color: #2196f3;
    }

    .button-save {
        margin-left: 800px;
    }
    .fontStyle {
        color: #2196f3;
        font-size: 18px;
    }
    .locationcenter {
        text-align: center;
        margin-top: 5px;
    }
</style>