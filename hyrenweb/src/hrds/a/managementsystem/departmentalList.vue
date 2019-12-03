<template>
<div class="departmentalList">
    <el-row>
        <i class="el-icon-s-check"></i>
        <span>部门列表</span>
        <router-link to="managementsystem">
            <el-button type="primary" class="el1 els" size="small">
                <i class="block_icon fa fa-cubes"></i>返回首页
            </el-button>
        </router-link>
        <el-button type="primary" class="els" @click="dialogFormVisibleAdd = true;" size="small">
            <i class="el-icon-circle-plus-outline"></i>新增部门
        </el-button>
    </el-row>
    <el-table stripe :data="departmentalList" border>
        <el-table-column type="index" label="序号" width="62" align="center"></el-table-column>
        <el-table-column prop="dep_name" label="部门名称" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="160">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="dialogFormVisibleUpdate = true;handleEdit(scope.$index, scope.row);">编辑</el-button>
                <el-button size="mini" type="danger" @click="delteThisData();handleEdit(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页内容 -->
    <el-row class="pagination">
        <el-pagination prev-text="上一页" next-text="下一页" @current-change="handleCurrentChangeList" :current-page="currentPage" :page-size="pageSize" layout=" total,prev, pager, next,jumper" :total="totalItem"></el-pagination>
    </el-row>
    <!-- 实现点击添加按钮进行页面数添加-->
    <!-- 添加的弹出表单 -->
    <el-dialog title="新增部门" :visible.sync="dialogFormVisibleAdd" width="40%">
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
    <el-dialog title="更新部门信息" :visible.sync="dialogFormVisibleUpdate" width="40%">
        <el-form :model="formUpdate" ref="formUpdate">
            <el-form-item label=" 部门名称" :label-width="formLabelWidth" prop="dep_name" :rules="filter_rules([{required: true}])">
                <el-input v-model="formUpdate.dep_name" autocomplete="off" placeholder="请输入部门名称" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 备注" :label-width="formLabelWidth" prop="dep_remark">
                <el-input type="textarea" v-model="formUpdate.dep_remark" autocomplete="off" placeholder="备注" style="width:284px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd" size="mini" type="danger">取 消</el-button>
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
            pageSize: 5,
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
            this.formUpdate = {};
            // 隐藏对话框
            this.dialogFormVisibleAdd = false;
            this.dialogFormVisibleUpdate = false;
        },
        // 获取表格当前行数据
        handleEdit(index, row) {
            this.dep_id = row.dep_id;
            this.formUpdate = row;
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
        delteThisData() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                functionAll.deleteDepartmentInfo({
                        dep_id: this.dep_id,
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

        // 获取数据管理列表数据实现分页功能
        handleCurrentChangeList(val) {
            //把val赋给当前页面
            this.currentPage = val;
            functionAll.getDepartmentInfo({
                currPage: this.currentPage,
                pageSize: this.pageSize
            }).then(res => {
                this.departmentalList = res.data;
            })

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

/* button样式设置 */
.els {
    float: right;
    margin-top: 18px;

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
</style>
