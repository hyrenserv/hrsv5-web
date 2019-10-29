<template>
<div>
    <!-- 列表数据 start-->
    <el-table :data="tableData.filter(data => !search || data.para_name.trim().toLowerCase().includes(search) || data.para_value.trim().toLowerCase().includes(search))" :default-sort="{prop: 'para_id', order: 'ascending'}" height="600px">
        <el-table-column prop="para_id" sortable label="参数ID"></el-table-column>
        <el-table-column label="参数名称" prop="para_name" sortable>
            <template slot-scope="{row, $index}">
                <el-input class="edit-cell" v-if="showEdit[$index]" v-model="row.para_name" />
                <span v-if="!showEdit[$index]">{{row.para_name}}</span>
            </template>
        </el-table-column>
        <el-table-column label="参数类型" prop="para_type">
            <template slot-scope="{row, $index}">
                <el-input class="edit-cell" v-if="showEdit[$index]" v-model="row.para_type" />
                <span v-if="!showEdit[$index]">{{row.para_type}}</span>
            </template>
        </el-table-column>
        <el-table-column label="参数值" prop="para_value">
            <template slot-scope="{row, $index}">
                <el-input class="edit-cell" v-if="showEdit[$index]" v-model="row.para_value" />
                <span v-if="!showEdit[$index]">{{row.para_value}}</span>
            </template>
        </el-table-column>
        <el-table-column label="描述" prop="remark">
            <template slot-scope="{row, $index}">
                <el-input class="edit-cell" v-if="showEdit[$index]" v-model="row.remark" />
                <span v-if="!showEdit[$index]">{{row.remark}}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="{row, $index}">
                <el-button size="mini" type="success" @click.native="handleUpdate($index, row)" v-if="showBtn[$index]">更新</el-button>
                <el-button size="mini" type="danger" @click.native="handleCancel($index)" v-if="showBtn[$index]">取消</el-button>
                <el-button size="mini" type="primary" @click.native="handleEdit($index)" v-if="!showBtn[$index]">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete($index, row)" v-if="!showBtn[$index]">删除</el-button>
            </template>
        </el-table-column>
        <el-table-column>
            <template slot="header" slot-scope="scope">
                <el-button size="mini" type="success" @click="dialogFormVisible = true">新增参数</el-button>
            </template>
        </el-table-column>
        <el-table-column>
            <template slot="header" slot-scope="scope">
                <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
            </template>
        </el-table-column>
    </el-table>
    <!-- 列表数据 end-->

    <!-- 添加一条数据 start-->
    <el-dialog title="添加一条数据" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="form">
            <el-form-item label="para_name" prop="para_name" :rules="rule.default" :label-width="formLabelWidth">
                <el-input v-model="form.para_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="para_value" prop="para_value" :rules="rule.default" :label-width="formLabelWidth">
                <el-input v-model="form.para_value" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="para_type" prop="para_type" :rules="rule.default" :label-width="formLabelWidth">
                <el-input v-model="form.para_type" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="remark" prop="remark" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.remark"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="resetForm('form')">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 添加一条数据 end-->
</div>
</template>

<script>
import * as sysPara from "@/hrds/a/syspara/syspara";
import validator from "@/utils/js/validator";
import * as message from '@/utils/js/message'

export default {
    name: "Syspara",
    data() {
        return {
            tableData: [],
            dialogFormVisible: false,
            search: "",
            rule: validator,
            form: {},
            formLabelWidth: "120px",
            showEdit: [], //显示编辑框
            showBtn: []
        };
    },
    mounted() {
        this.getSysPara();
    },
    methods: {
        getSysPara() {
            sysPara.getSysPara().then(response => {
                this.tableData = response.data;
            });
        },
        handleEdit(index) {
            //点击编辑
            this.$set(this.showEdit, index, true);
            this.$set(this.showBtn, index, true);
        },
        handleCancel(index) {
            //取消编辑
            this.$set(this.showEdit, index, false);
            this.$set(this.showBtn, index, false);
        },
        //点击更新
        handleUpdate(index, row) {
            sysPara.editorSysPara(row).then(response => {

                message.updateSuccess(response)
                // 重新渲染列表
                this.getSysPara();
                //取消输入框的显示
                this.$set(this.showEdit, index, false);
                this.$set(this.showBtn, index, false);
            });
        },
        // 删除
        handleDelete(index, row) {
            this.$confirm("确定要删除该条数据?", "提示", {
                type: "warning"
            }).then(() => {
                // 入参
                let params = {};
                params["para_id"] = row.para_id;
                params["para_name"] = row.para_name;

                // 调用删除方法
                sysPara.deleteSysPara(params).then(response => {

                    message.deleteSuccess(response)
                    // 重新渲染列表
                    this.getSysPara();
                });
            });

        },
        // 新增一条数据
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // 调用添加方法
                    sysPara.addSysPara(this.form).then(response => {
                        // 隐藏对话框
                        this.dialogFormVisible = false;
                        // 数据清空
                        this.form = {};
                        // 重新渲染列表
                        this.getSysPara();
                    });
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.dialogFormVisible = false;
        }
    }
};
</script>
