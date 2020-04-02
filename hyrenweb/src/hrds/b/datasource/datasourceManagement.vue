<template>
<div class="index1001">
    <lo-header @addEvent="addSucess"></lo-header>
    <data-sheetmain @addEvent="addSucess" :data="dataIndexAll"></data-sheetmain>
    <!-- 数据管理列表开始 -->
    <div class="dataManage">
        <el-row>
            <!-- <i class="block_icon fa text-warning fa-book blue"></i> -->
            <span>数据管理列表</span>
            <div class="lines"></div>
            <el-table stripe :data="tableDatalist" size="medium" border>
                <el-table-column type="index" label="序号" width="62" align="center">
                    <template slot-scope="scope">
                        {{scope.$index+(currentPagelist - 1) * pageSize + 1}}
                    </template>
                </el-table-column>
                <el-table-column prop="original_name" label="文件名" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="file_suffix" label="文件后缀名" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="fileType_zh" label="文件类型" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="user_name" label="提交人" align="center"></el-table-column>
                <el-table-column prop="applyDataTime" label="提交时间" width="192" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column prop="applyType_zh" label="申请类型" align="center"></el-table-column>
                <el-table-column prop="agent_id" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="reclaimAuthority(); handleEdit(scope.$index, scope.row)" size="mini">权限回收</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <!-- 分页内容 -->
        <el-row class="pagination">
            <el-pagination @current-change="handleCurrentChangeList" :current-page="currentPagelist" @size-change="handleSizeChangelist" :page-sizes="[5, 10, 50, 100,500]" :page-size="pageSize" layout=" total, sizes,prev, pager, next, jumper" :total="totalItemlist"></el-pagination>
        </el-row>
    </div>
    <!-- 数据管理列表完 -->

    <!-- 数据权限管理开始 -->
    <div class="authorityManagement">
        <!-- <i class="block_icon fa text-warning fa-users blue"></i> -->
        <span>数据权限管理</span>
        <div class="lines"></div>
        <!-- 表格 -->
        <el-table :data="tableData" border stripe size="medium">
            <el-table-column type="index" label="序号" width="64" align="center">
                <template slot-scope="scope">
                    {{scope.$index+(currentPage - 1) * pageSize + 1}}
                </template>
            </el-table-column>
            <el-table-column prop="datasource_name" label="数据源名称" align="center"></el-table-column>
            <el-table-column prop="dep_name" label="所属部门" align="center" show-overflow-tooltip></el-table-column>

            <el-table-column label="操作" width="196" align="center">
                <template slot-scope="scope">
                    <b @click="dialogFormVisibleAdd = true;handleEdit(scope.$index, scope.row);departmentInfo()">编辑</b>
                </template>
            </el-table-column>
        </el-table>
        <el-row>
            <!-- 点击操作弹出框 -->
            <el-dialog title="更改部门" :visible.sync="dialogFormVisibleAdd" width="40%">
                <el-form :model="formAdd" ref="formAdd">
                    <el-form-item label=" 数据源名称" :label-width="formLabelWidth" prop="datasource_name">
                        <el-input v-model="formAdd.datasource_name" autocomplete="off" placeholder="数据源名称" style="width:284px" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label=" 所属部门" :label-width="formLabelWidth" :rules="rule.selected">
                        <el-select v-model="depIds" filterable placeholder="请选择（可多选）" multiple style="width:284px">
                            <el-option v-for="(item,index) in options" :key="index" :label="item.dep_name" :value="item.dep_id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="mini" type="danger" @click="cancleAdd">取 消</el-button>
                    <el-button type="primary" @click="saveChangeAgent('formAdd')" size="mini">保存</el-button>
                </div>
            </el-dialog>
        </el-row>
        <!-- 分页内容 -->
        <el-row class="pagination">
            <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-sizes="[5, 10, 50, 100,500]" :page-size="pageSize" layout=" total, sizes,prev, pager, next, jumper" :total="totalItems"></el-pagination>
        </el-row>
    </div>
    <!-- 数据权限管理完 -->
</div>
</template>

<script>
import * as functionAll from "./datasource";
import Loheader from "./Loheader";
import dataSheetmain from "./dataSheetmain";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
let arrData;
export default {
    name: "index1001",
    components: {
        "lo-header": Loheader,
        "data-sheetmain": dataSheetmain,
    },
    data() {
        return {
            dataIndexAll: [],
            dialogVisible: false,
            dialogFormVisibleAdd: false,
            formAdd: {},
            formLabelWidth: "150px",
            currentPage: 1,
            currentPagelist: 1,
            pageSize: 5,
            totalItems: 0,
            totalItemlist: 0,
            options: [],
            source_id: "",
            da_id: "",
            depIds: [],
            tableData: [],
            rule: validator.default,
            tableDatalist: []
        };
    },
    // 获取首页数据
    created() {
        this.getIndexData();
    },
    mounted() {
        this.handleCurrentChangeList(1);
        this.handleCurrentChange(1);
    },
    methods: {
        // 子触发父的事件
        addSucess() {
            this.handleCurrentChangeList(1);
            this.getIndexData();
            this.handleCurrentChange(1);
        },
        // 封装调用事件
        getIndexData() {
            functionAll.searchDataSourceInfo().then(res => {
                if (res && res.success) {
                    // 获取所有数据
                    this.dataIndexAll = res.data;

                }
            });
        },
        // 获取表格当前行数据
        handleEdit(index, row) {
            this.source_id = row.source_id;
            this.da_id = row.da_id;
        },
        // 数据权限管理，更新数据源关系部门信息
        saveChangeAgent(formName) {
            this.formAdd["dep_id"] = this.depIds;
            this.formAdd["source_id"] = this.source_id;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    functionAll.updateAuditSourceRelationDep(this.formAdd).then(res => {
                        if (res && res.success) {
                            this.$message({
                                type: "success",
                                message: "更改成功!"
                            });
                            // 传入当前页数和当前需要的条数渲染
                            this.handleCurrentChange(this.currentPage);
                            // 隐藏对话框
                            this.dialogFormVisibleAdd = false;
                            // 表单清空
                            this.depIds = [];
                            this.formAdd = {};
                        } else {

                        }
                    });
                } else {
                    return false;
                }
            });

        },
        // 点击添加按钮获取部门信息
        departmentInfo() {
            this.depIds = [];
            functionAll.searchDataSourceOrDepartment().then(res => {
                if (res && res.success) {
                    this.options = res.data;
                    arrData = res.data;
                }
            });
            // 数据回显
            functionAll.searchDataSourceById({
                source_id: this.source_id
            }).then((res) => {
                if (res && res.success) {
                    this.formAdd = res.data;
                    res.data.depNameAndId.forEach((item) => {
                        this.depIds.push(item.dep_id);
                    })
                }
            })
        },
        // 点击取消按钮
        cancleAdd() {
            // 表单清空
            this.formAdd = {};
            this.depIds = [];
            // 隐藏对话框
            this.dialogFormVisibleAdd = false;
        },
        //获取数据权限管理数据实现分页功能
        handleCurrentChange(val) {
            //把val赋给当前页面
            this.currentPage = val;
            functionAll.searchSourceRelationDepForPage({
                currPage: this.currentPage,
                pageSize: this.pageSize
            }).then(res => {
                if (res && res.success) {
                    this.tableData = res.data;
                    // 获取数据权限管理分页总数
                    if (this.tableData.length === 0) {
                        this.totalItems = 0;
                    } else {
                        this.totalItems = this.tableData[0].totalSize;
                    }
                }
            })
        },
        // 获取数据管理列表数据实现分页功能
        handleCurrentChangeList(val) {
            //把val赋给当前页面
            this.currentPagelist = val;
            functionAll.getDataAuditInfoForPage({
                currPage: this.currentPagelist,
                pageSize: this.pageSize
            }).then(res => {
                if (res && res.success) {
                    this.tableDatalist = res.data;
                    // 获取数据管理列表分页总数
                    if (this.tableDatalist.length === 0) {
                        this.totalItemlist = 0;
                    } else {
                        this.totalItemlist = res.data[0].totalSize;
                    }
                }
            })
        },
        // 权限回收
        reclaimAuthority() {
            this.$confirm('确定要回收权限, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                functionAll.deleteAudit({
                        da_id: this.da_id,
                    })
                    .then(res => {
                        if (res && res.success) {
                            this.$message({
                                type: 'success',
                                message: '回收权限成功!'
                            });
                            this.tableDatalist = res.data;
                        }
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消回收权限'
                });
            });
        },
        // 改变数据管理列表每页显示条数
        handleSizeChangelist(val) {
            this.pageSize = val;
            this.currentPagelist = 1;
            this.handleCurrentChangeList(this.currentPagelist);
        },
        // 改变数据权限管理显示条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.currentPage = 1;
            this.handleCurrentChange(this.currentPage);
        }
    },
}
</script>

<style scoped>
.index1001 {
    padding-left: 8px;
    padding-right: 15px;
}

.authorityManagement {
    margin-top: 26px;
    margin-bottom: 10px;
    color: #61c3fa;
}

.authorityManagement span {
    color: #2196f3;
    font-size: 18px;
}

.authorityManagement b {
    font-size: 14px;
    font-weight: normal;
    cursor: pointer;
    color: red;
}

.lines {
    margin-top: 10px;
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 15px;
}

/* 小图标样式 */
.fa-users {
    margin-right: 5px;
    color: #2196f3;
}

/* 分页 */
.pagination {
    margin-top: 20px;
    width: 100%;
}

.el-pagination {
    float: right;
}

/* 弹出框input的样式 */
.elDialog .el-input {
    margin-left: 20px;
}

.elDialog .el-select {
    margin-left: 20px;
}

.elDialog .elInput {
    margin-right: 88px;
}

/* 数据管理列表样式 */
.dataManage {
    margin-top: 26px;
    margin-bottom: 10px;
    color: #61c3fa;
}

/* 下划线样式 */
.lines {
    margin-top: 10px;
    width: 100%;
    height: 1px;
    background: #dddddd;
    margin-bottom: 15px;
}

/* 小图标字体样式设置 */
.dataManage .fa-book {
    color: #2196f3;
    margin-right: 5px;
}

.dataManage span {
    color: #2196f3;
    font-size: 18px;
}

/* 按钮样式 */
.dataManage .el-button {
    color: red;
}
</style>
