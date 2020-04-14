<template>
<div class="departmentalList">
    <el-row class="elRows">
        <!-- <i class="el-icon-s-check"></i> -->
        <span>部门列表</span>
        <el-button type="primary" class="els" @click="dialogFormVisibleAdd = true;" size="small">
            <i class="el-icon-circle-plus-outline"></i>新增部门
        </el-button>
    </el-row>
    <div class="lines"></div>
    <el-table stripe :data="departmentalList" border size="medium">
        <el-table-column type="index" label="序号" width="62" align="center">
            <template slot-scope="scope">
                <span>{{scope.$index+(currentPage - 1) * pageSize + 1}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="dep_name" label="部门名称" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="160">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="dialogFormVisibleUpdate = true;handleEdit(scope.$index, scope.row);">编辑</el-button>
                <el-button size="mini" type="danger" @click="delteThisData(scope.row.dep_id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页内容 -->
    <el-row class="pagination">
        <el-pagination @current-change="handleCurrentChangeList" :current-page="currentPage" @size-change="handleSizeChange" :page-sizes="[5, 10, 50, 100,500]" :page-size="pageSize" layout=" total,sizes,prev, pager, next,jumper" :total="totalItem"></el-pagination>
    </el-row>
    <!-- 实现点击添加按钮进行页面数添加-->
    <!-- 添加的弹出表单 -->
    <el-dialog title="新增部门" :visible.sync="dialogFormVisibleAdd" :before-close="beforeCloseAdd">
        <el-form :model="formAdd" ref="formAdd">
            <el-form-item label=" 部门名称" :label-width="formLabelWidth" prop="dep_name" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.dep_name" autocomplete="off" placeholder="请输入部门名称" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 备注" :label-width="formLabelWidth" prop="dep_remark">
                <el-input type="textarea" v-model="formAdd.dep_remark" autocomplete="off" placeholder="备注" style="width:284px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="addDepartmentInfo('formAdd')" size="mini">保存</el-button>
        </div>
    </el-dialog>

    <!-- 实现点击编辑按钮进行页面部门更新-->
    <!-- 编辑的弹出表单 -->
    <el-dialog title="更新部门信息" :visible.sync="dialogFormVisibleUpdate" :before-close="beforeClose">
        <el-form :model="formUpdate" ref="formUpdate">
            <el-form-item label=" 部门名称" :label-width="formLabelWidth" prop="dep_name" :rules="filter_rules([{required: true}])">
                <el-input v-model="formUpdate.dep_name" autocomplete="off" placeholder="请输入部门名称" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 备注" :label-width="formLabelWidth" prop="dep_remark">
                <el-input type="textarea" v-model="formUpdate.dep_remark" autocomplete="off" placeholder="备注" style="width:284px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleUpdate" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="updateDepartmentInfo('formUpdate')" size="mini">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as functionAll from "@/hrds/a/managementsystem/managementsystem";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
export default {
    data() {
        return {
            departmentalList: [],
            totalItem: 0,
            getAllCodeItems: [],
            currentPage: 1,
            pageSize: 10,
            options: [],
            dialogFormVisibleAdd: false,
            dialogFormVisibleUpdate: false,
            // 添加数据与导入源字段
            formAdd: {
                dep_name: "",
                dep_remark: ""
            },
            formUpdate: {
                dep_name: "",
                dep_remark: ""
            },
            formLabelWidth: "150px"
        }
    },
    created() {
        this.getDepartmentInfoAll();
    },
    methods: {
        // 获取部门列表信息
        getDepartmentInfoAll() {
            functionAll.getDepartmentInfo({
                currPage: this.currentPage,
                pageSize: this.pageSize
            }).then((res) => {
                if (res && res.success) {
                    this.departmentalList = res.data.departmentInfos;
                    this.totalItem = res.data.totalSize;

                }
            })
        },
        // 添加新的部门信息
        addDepartmentInfo(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    functionAll.addDepartmentInfo(this.formAdd).then((res) => {
                        if (res && res.success) {
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            })
                            this.getDepartmentInfoAll();
                            this.dialogFormVisibleAdd = false;
                            this.formAdd = {};
                        }
                    })
                } else {
                    return false;
                }
            });

        },
        // 点击添加弹出框的取消按钮
        cancleAdd() {
            // 表单清空
            this.formAdd = {};
            // 隐藏对话框
            this.getDepartmentInfoAll();
            this.dialogFormVisibleAdd = false;
            this.$refs.formAdd.resetFields();
        },
        // 弹出框关闭之前清空表单验证
        beforeCloseAdd() {
            this.dialogFormVisibleAdd = false;
            this.$refs.formAdd.resetFields();
        },
        // 获取表格当前行数据
        handleEdit(index, row) {
            this.dep_id = row.dep_id;
            this.formUpdate = Object.assign({}, row);
        },
        //编辑部门信息
        updateDepartmentInfo(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.formUpdate["dep_id"] = this.dep_id;
                    functionAll.updateDepartmentInfo(this.formUpdate).then((res) => {
                        if (res && res.success) {
                            this.$message({
                                type: 'success',
                                message: '更新成功!'
                            })
                            this.getDepartmentInfoAll();
                            this.dialogFormVisibleUpdate = false;
                            this.formUpdate = {};
                        }
                    })
                } else {
                    return false;
                }
            });

        },
        // 删除部门信息
        delteThisData(val) {
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                functionAll.deleteDepartmentInfo({
                        dep_id: val,
                    })
                    .then(res => {
                        if (res && res.success) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            // 从新渲染表格
                            this.getDepartmentInfoAll();
                        }
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 关闭弹出框之前触发事件
        beforeClose() {
            this.getDepartmentInfoAll();
            this.dialogFormVisibleUpdate = false;
            this.$refs.formUpdate.resetFields();
        },
        // 取消编辑
        cancleUpdate() {
            // 表单清空
            this.formUpdate = {};
            // 隐藏对话框
            this.getDepartmentInfoAll();
            this.dialogFormVisibleUpdate = false;
            this.$refs.formUpdate.resetFields();
        },
        // 获取数据管理列表数据实现分页功能
        handleCurrentChangeList(val) {
            //把val赋给当前页面
            this.currentPage = val;
            this.getDepartmentInfoAll();
        },
        // 改变每页显示条数
        handleSizeChange(val) {
            this.pageSize = val;
            this.getDepartmentInfoAll();
            this.currentPage = 1;
        },
    }
}
</script>

<style scoped>
.el-row {
    height: 64px;
    line-height: 64px;
    width: 100%;
}

.el-icon-s-check,
.el-row span {
    color: #2196f3;
    font-size: 18px;
}

.elRows {
    width: 100%;
    height: 40px;
    line-height: 40px;
}

/* button样式设置 */
.els {
    float: right;
    margin-top: 3px;

}

.el1 {
    margin-left: 10px;
}

.item {
    float: right;
}

.upload-demo {
    float: left;
}

.fa-question-circle {
    margin-top: 12px;
}

/* 分页 */
.pagination {
    margin-top: 20px;
    width: 100%;
}

.el-pagination {
    float: right;
}

.lines {
    margin-top: 4px;
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 15px;
}
</style>
