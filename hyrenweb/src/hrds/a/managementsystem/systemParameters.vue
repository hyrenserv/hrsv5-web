<template>
<div class="systemParameters">
    <el-row>
        <i class="el-icon-coin"></i>
        <span>系统参数列表</span>
        <router-link to="managementsystem">
            <el-button type="primary" class="el1 els" size="small">
                <i class="block_icon fa fa-cubes"></i>返回首页
            </el-button>
        </router-link>
        <el-button type="primary" class="els" @click="dialogFormVisibleAdd = true;" size="small">
            <i class="el-icon-circle-plus-outline"></i>新增系统参数
        </el-button>
    </el-row>
    <el-table stripe :data="systemParameters.filter(data => !search || data.para_name.toLowerCase().includes(search.toLowerCase()))" size="medium" border>
        <el-table-column type="index" label="序号" width="62" align="center"></el-table-column>
        <el-table-column prop="para_name" label="系统参数名称" width="130" align="center"></el-table-column>
        <el-table-column prop="para_value" label="系统参数值" align="center"></el-table-column>
        <el-table-column prop="para_type" label="系统参数类型 " width="150" align="center"></el-table-column>
        <el-table-column prop="remark" label="系统参数备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="160">
            <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="关键字搜索" />
            </template>
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
    <el-dialog title="新增系统参数" :visible.sync="dialogFormVisibleAdd" width="40%">
        <el-form :model="formAdd" ref="formAdd">
            <el-form-item label=" 系统参数名称" :label-width="formLabelWidth" prop="para_name" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.para_name" autocomplete="off" placeholder="请输入系统参数名称" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 系统参数值" :label-width="formLabelWidth" prop="para_value" :rules="filter_rules([{required: true}])">
                <el-input type="textarea" v-model="formAdd.para_value" autocomplete="off" placeholder="请输入系统参数值" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 系统参数类型" :label-width="formLabelWidth" prop="para_type" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.para_type" autocomplete="off" placeholder="请输入系统参数类型" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 系统参数备注" :label-width="formLabelWidth" prop="remark">
                <el-input type="textarea" v-model="formAdd.remark" autocomplete="off" placeholder="请输入系统参数备注" style="width:284px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="addSysPara('formAdd')" size="mini">保存</el-button>
        </div>
    </el-dialog>

    <!-- 实现点击编辑按钮进行页面部门更新-->
    <!-- 编辑的弹出表单 -->
    <el-dialog title="更新系统参数信息" :visible.sync="dialogFormVisibleUpdate" width="40%" :before-close="beforeClose">
        <el-form :model="formUpdate" ref="formUpdate">
            <el-form-item label=" 系统参数名称" :label-width="formLabelWidth" prop="para_name" :rules="filter_rules([{required: true}])">
                <el-input v-model="formUpdate.para_name" autocomplete="off" placeholder="请输入系统参数名称" :disabled="true" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 系统参数值" :label-width="formLabelWidth" prop="para_value" :rules="filter_rules([{required: true}])">
                <el-input type="textarea" v-model="formUpdate.para_value" autosize autocomplete="off" placeholder="请输入系统参数值" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 系统参数类型" :label-width="formLabelWidth" prop="para_type" :rules="filter_rules([{required: true}])">
                <el-input v-model="formUpdate.para_type" autocomplete="off" placeholder="请输入系统参数类型" :disabled="true" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label=" 系统参数备注" :label-width="formLabelWidth" prop="remark">
                <el-input type="textarea" v-model="formUpdate.remark" autosize autocomplete="off" placeholder="系统参数备注" style="width:284px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="updateSysPara('formUpdate')" size="mini">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as functionAll from "@/hrds/a/managementsystem/managementsystem";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
let savecurrentPage;
export default {
    data() {
        return {
            systemParameters: [],
            totalItem: 0,
            search: '',
            getAllCodeItems: [],
            currentPage: 1,
            pageSize: 10,
            options: [],
            dialogFormVisibleAdd: false,
            dialogFormVisibleUpdate: false,
            // 添加数据与导入源字段
            formAdd: {
                para_name: "",
                para_value: "",
                para_type: "",
                remark: ""
            },
            formUpdate: {
                para_name: "",
                para_value: "",
                para_type: "",
                remark: ""
            },
            formLabelWidth: "150px"
        }
    },
    created() {
        this.getSysPara("1");
    },
    methods: {
        // 获取部门列表信息
        getSysPara(e) {
            functionAll.getSysPara({
                currPage: e,
                pageSize: this.pageSize
            }).then((res) => {
                if (res && res.success) {
                    this.systemParameters = res.data.sysParas;
                    this.totalItem = res.data.totalSize;
                }
            })
        },
        // 添加新的部门信息
        addSysPara(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    functionAll.addSysPara(this.formAdd).then((res) => {
                        if (res && res.success) {
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            })
                            this.getSysPara("1");
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
            this.getSysPara(savecurrentPage);
            this.dialogFormVisibleAdd = false;
            this.dialogFormVisibleUpdate = false;
        },
        // 获取表格当前行数据
        handleEdit(index, row) {
            this.para_id = row.para_id;
            this.formUpdate = row;
            this.para_name = row.para_name;
        },
        //编辑部门信息
        updateSysPara(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.formUpdate["para_id"] = this.para_id;
                    functionAll.updateSysPara(this.formUpdate).then((res) => {
                        if (res && res.success) {
                            this.$message({
                                type: 'success',
                                message: '更新成功!'
                            })
                            // 渲染页面
                            this.currentPage = savecurrentPage
                            this.getSysPara(savecurrentPage);
                            this.dialogFormVisibleUpdate = false;
                            this.formUpdate = {};
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        // 关闭弹出框之前触发事件
        beforeClose() {
            this.getSysPara(savecurrentPage);
            this.dialogFormVisibleUpdate = false;

        },
        // 删除部门信息
        delteThisData() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                functionAll.deleteSysPara({
                        para_id: this.para_id,
                        para_name: this.para_name
                    })
                    .then(res => {
                        if (res && res.success) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            // 从新渲染表格
                            this.currentPage = savecurrentPage
                            this.getSysPara(savecurrentPage);
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
            savecurrentPage = val;
            this.currentPage = val;
            this.getSysPara(val)
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

.el-icon-coin,
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
