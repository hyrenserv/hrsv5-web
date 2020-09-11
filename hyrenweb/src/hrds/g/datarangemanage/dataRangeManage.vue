<template>
<div class="dataRangeManage">
    <el-row class="topTitle">
        <span class="el-icon-s-data">数据使用范围</span>
        <router-link to="/serviceMage">
            <el-button class="goIndex" type="primary" size="mini" icon="el-icon-s-home">
                返回首页
            </el-button>
        </router-link>
    </el-row>
    <el-row :gutter='20'>
        <el-col :span='6'>
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini">
            </el-input>
            <div class="mytree" hight='200'>
                <el-tree class="filter-tree" :data="treeData" :indent='0' :filter-node-method="filterNode" ref="tree" @node-click="handleNodeClick">
                    <span class="span-ellipsis" slot-scope="{ node, data }">
                        <span :title="data.description" v-if="'undefined' !== typeof data.file_id && data.file_id !== ''">
                            <i class=" el-icon-document"></i>
                            <template v-if="'undefined' !== typeof data.original_name && data.original_name !== ''">{{data.original_name}}</template>
                            <template v-else-if="data.original_name === '' && data.table_name!==''">{{data.table_name}}</template>
                            <template v-else>{{data.hyren_name}}</template>
                        </span>
                        <span :title="data.description" v-else>
                            <i class="el-icon-folder-opened"></i>{{node.label}}
                        </span>
                    </span>
                </el-tree>
            </div>
        </el-col>
        <el-col :span="18" style="border-left: 1px #e0dcdc dashed;min-height: 400px;">
            <el-form ref="form" :model="form" label-width="100px" size="medium">
                <span class="fontStyle">表信息列表
                    <el-button class="saveButton" type="success" size="mini" @click="saveTableData('form')">保存
                    </el-button>
                </span>
                <el-divider />
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户选择" prop="user_id" :rules="rule.selected">
                            <el-select v-model="form.user_id" multiple clearable filterable placeholder="请选择" size="small">
                                <el-option v-for="item in userData" :label="item.user_name" :value="item.user_id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="备注">
                            <el-input v-model="form.table_note" size="small" placeholder="备注" clearable />
                        </el-form-item>
                    </el-col>
                </el-row>
                <!--接口信息列表展示-->
                <el-table :data="tableData.slice((currPage - 1) * pageSize,currPage*pageSize)" border style="width: 100%" ref="multipleTable" size="medium" :row-key="(row)=>{ return row.id}" @selection-change="selectionChange" @select-all='allSelect'>
                    <el-table-column width="40" align="center" type="selection" :reserve-selection="true">
                    </el-table-column>
                    <el-table-column label="序号" width="50px" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.$index+(currPage - 1) * pageSize + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="table_name" label="采集原始表名" align="center" />
                    <el-table-column prop="original_name" label="原始表中文名" align="center" />
                    <el-table-column prop="hyren_name" v-show="tableShowStatus" label="系统内对应表名" align="center" />
                    <el-table-column prop="selectColumn" label="选择字段" align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="searchFieldById(scope.row,scope.$index)">
                                选择字段
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页内容 -->
                <el-row class="pagination">
                    <el-pagination @current-change="handleCurrentChangeList" :current-page="currPage" @size-change="handleSizeChange" :page-sizes="[5, 10, 50, 100,500]" :page-size="pageSize" layout=" total,sizes,prev, pager, next,jumper" :total="totalSize" class='locationcenter' />
                </el-row>
            </el-form>
        </el-col>
    </el-row>
    <!--选择列展示-->
    <el-dialog title="查看字段信息" :visible.sync="dialogShowFieldFormVisible" :before-close="beforeShowFieldClose">
        <el-table :data="columnData" border style="width: 100%" ref="multipleColumnTable" :row-key="(row)=>{ return row.column_id}" height="450" size="medium" @select="columnSelectionChange" @select-all='allColumnSelect'>
            <el-table-column width="40" align="center" type="selection" :reserve-selection="true">
            </el-table-column>
            <el-table-column label="序号" align="center">
                <template slot-scope="scope">
                    <span>{{scope.$index+(currPage - 1) * pageSize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="column_name" label="字段英文名" align="center" />
            <el-table-column prop="column_cn_name" label="字段中文名" align="center" />
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
                this.$Msg.customizTitle("请至少选择一条数据", "warning");
                return;
            }
            this.selectRow.forEach(row => {
                let tableChColumns = [];
                let tableEnColumns = [];
                let param = {};
                if (row.selectColumn !== undefined) {
                    row.selectColumn.forEach(o => {
                        tableChColumns.push(o.column_cn_name);
                        tableEnColumns.push(o.column_name);
                    })
                }
                param["file_id"] = row.file_id;
                param["table_ch_column"] = tableChColumns;
                param["table_en_column"] = tableEnColumns;
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
                        this.$Msg.saveSuccess(res);
                        if (this.selectRow.selectColumn !== undefined) {
                            this.$refs.multipleColumnTable.clearSelection();
                        }
                        this.$refs.multipleTable.clearSelection();
                        this.$refs.form.resetFields();
                        this.tableData = [];
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
            this.searchInterfaceInfoByType("1");
        },
        // 改变每页显示条数
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.searchInterfaceInfoByType("1");
        },
        // 树节点触发
        handleNodeClick(data) {
            this.tableData = [];
            //如果节点的file_id为未定义并且节点的分类id不为空并且节点分类不是未定义,代表该节点是分类信息,则添加分类下节点数据到展示区
            if ('undefined' === typeof data.file_id && data.classify_id !== "" && 'undefined' !== typeof data.classify_id) {
                //如果该节点的子节点信息不是未定义,则添加该节点下所有表信息
                if (typeof data.children !== "undefined") {
                    data.children.forEach(element => {
                        //判断如果该节点下每个子节点的file_id不是未定义,并且不为空,代表该子节点是表信息,则添加该子节点到数据展示区
                        if ('undefined' !== typeof element.file_id && element.file_id !== "") {
                            this.tableData.push(element);
                        }
                    });
                }
            }
            //如果数据层是DQC或者UDL,并且父id是DQC或者UDL则添加存储层下的表信息到展示区 
            else if ((data.data_layer === 'DQC' || data.data_layer === 'UDL') && (data.parent_id === 'DQC' || data.parent_id === 'UDL')) {
                this.table_data = data.children;
            }
            //如果file_id不为空,代表该节点是表信息,添加表信息到展示区 
            else if ('undefined' !== typeof data.file_id && data.file_id !== "") {
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
            this.selectRow = selectTrue;
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
.fontStyle {
    color: #2196f3;
    font-size: 18px;
}

.saveButton {
    float: right;
}

.locationcenter {
    text-align: center;
    margin-top: 5px;
}
</style>
