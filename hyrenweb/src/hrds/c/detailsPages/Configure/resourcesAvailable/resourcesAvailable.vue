<template>
<div>
    <el-row>
        <div>
            <el-input placeholder="资源类型" v-model="input">
                <el-button slot="append" @click="searchBtn">搜索</el-button>
            </el-input>
        </div>
    </el-row>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" align='center' disabled='true' :selectable="isDisabled">
        </el-table-column>
        <el-table-column prop="etl_sys_cd" label="工程编号" align='center'>
        </el-table-column>
        <el-table-column prop="resource_type" label="资源类型" align='center'>
        </el-table-column>
        <el-table-column prop="resource_max" label="资源阀值" align='center'>
        </el-table-column>
        <el-table-column prop="resource_used" label="已使用数" align='center'>
        </el-table-column>
        <el-table-column label="操作" align='center'>
            <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-edit" title="编辑" type="primary" @click="handleEdit(scope.$index, scope.row)">
                </el-button>
                <el-button v-if="scope.row.resource_type != 'Thrift' && scope.row.resource_type != 'Yarn'" size="mini" icon="el-icon-delete" title="删除" type="danger" @click="handleDelete(scope.$index, scope.row)">
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-row :gutter="20" class="tabBtns">
        <el-col :span="8">
            <el-button size="mini" type="primary" @click="handleAdd">新增
            </el-button>
            <el-button size="mini" type="danger" @click="handleBatchDelete">批量删除
            </el-button>
        </el-col>
        <el-col :span="13" :offset="3">
            <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]"  :page-size="pagesize" :total="pageLength" @current-change="handleCurrentChange" @size-change="handleSizeChange">
            </el-pagination>
        </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
        <el-col :span="4">
            <el-upload accept=".xlsx" class="upload-demo" action="" :auto-upload="false" :on-change="handleChange" :limit="1" :on-exceed="handleExceed" :fileList="fileList">
                <el-button size="mini" type="primary"><i class="el-icon-upload el-icon--left"></i>选择上传文件</el-button>
            </el-upload>
        </el-col>
        <el-col :span="8" :offset="2">
            <el-button size="mini" type="success" @click="importData">导入数据
            </el-button>
            <el-button size="mini" type="primary" @click="downloadModel">下载模板
            </el-button>
        </el-col>
    </el-row>
    <!-- 添加资源模态框 -->
    <el-dialog title="添加资源定义" :visible.sync="dialogFormVisibleAdd" width="40%">
        <el-form :model="formAdd" ref="formAdd" class="demo-ruleForm" label-width="170px">
            <el-form-item label="工程编号" prop="etl_sys_cd" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.etl_sys_cd" autocomplete="off" placeholder="工程编号" disabled></el-input>
            </el-form-item>
            <el-form-item label="资源类型" prop="resource_type" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.resource_type" autocomplete="off" placeholder="资源类型"></el-input>
            </el-form-item>
            <el-form-item label="资源阀值" prop="resource_max" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.resource_max" autocomplete="off" placeholder="资源阀值"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="saveAdd" size="mini">保存</el-button>
        </div>
    </el-dialog>
    <!-- 修改资源模态框 -->
    <el-dialog title="修改资源定义" :visible.sync="dialogFormVisibleModify" width="40%">
        <el-form :model="formModify" ref="formModify" class="demo-ruleForm" label-width="170px">
            <el-form-item label="工程编号" prop="etl_sys_cd" :rules="filter_rules([{required: true}])">
                <el-input v-model="formModify.etl_sys_cd" autocomplete="off" placeholder="工程编号" disabled></el-input>
            </el-form-item>
            <el-form-item label="资源类型" prop="resource_type" :rules="filter_rules([{required: true}])">
                <el-input v-model="formModify.resource_type" autocomplete="off" placeholder="资源类型" disabled></el-input>
            </el-form-item>
            <el-form-item label="资源阀值" prop="resource_max" :rules="filter_rules([{required: true}])">
                <el-input v-model="formModify.resource_max" autocomplete="off" placeholder="资源阀值"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleModify" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="saveModify" size="mini">保存</el-button>
        </div>
    </el-dialog>
    <!-- 删除资源模态框 -->
    <el-dialog title="确定删除该资源?" :visible.sync="dialogVisibleDelete" width="20%">
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleDelete" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="saveDelete" size="mini">保存</el-button>
        </div>
    </el-dialog>
    <!-- 批量删除资源模态框 -->
    <el-dialog title="确定批量删除?" :visible.sync="dialogVisibleBatchDelete" width="20%">
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleBatchDelete" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="saveBatchDelete" size="mini">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as resourcesAvailableAllFun from "./resourcesAvailable";
export default {
    data() {
        return {
            input: '',
            sys_cd: '',
            tableData: [],
            multipleSelection: [],
            fileList: [],
            dialogFormVisibleAdd: false,
            dialogFormVisibleModify: false,
            dialogVisibleDelete: false,
            dialogVisibleBatchDelete: false,
            formAdd: {
                etl_sys_cd: '',
                resource_type: '',
                resource_max: '',
            },
            formModify: {
                etl_sys_cd: '',
                resource_type: '',
                resource_max: '',
            },
            deleteForm: {
                etl_sys_cd: '',
                resource_type: '',
            },
            batchDeleteForm: {
                etl_sys_cd: '',
                resource_type: '',
            },
            pagesize: 5,
            currpage: 1,
            pageLength: 100,
        };
    },
    mounted() {
        this.getTable();
    },
    methods: {
        //刷新表格
        getTable() {
            let params = {};
            this.sys_cd = sessionStorage.getItem('sys_cd');
            params["etl_sys_cd"] = this.sys_cd;
            params["resource_type"] = '';
            params["currPage"] = this.currpage;
            params["pageSize"] = this.pagesize;
            resourcesAvailableAllFun.searchEtlResourceByPage(params).then(res => {
                this.tableData = res.data.etlResourceList;
                this.pageLength = res.data.totalSize;
            });
        },
        //表格复选框是否禁用
        isDisabled(row, index) {
            if (row.resource_type == 'Thrift' || row.resource_type == 'Yarn') {
                return 0;
            } else {
                return 1;
            }
        },
        //搜索按钮
        searchBtn() {
            let params = {};
            params["etl_sys_cd"] = this.sys_cd;
            params["resource_type"] = this.input;
            params["currPage"] = this.currpage;
            params["pageSize"] = this.pagesize;
            resourcesAvailableAllFun.searchEtlResourceByPage(params).then(res => {
                this.tableData = res.data.etlResourceList;
                this.pageLength = res.data.totalSize;
            });
        },
        //选中的数据
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //新增按钮
        handleAdd() {
            this.dialogFormVisibleAdd = true;
            this.formAdd.etl_sys_cd = this.sys_cd;
        },
        //批量删除按钮
        handleBatchDelete() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: '请选择需要删除的数据',
                    type: 'warning'
                });
            } else {
                this.dialogVisibleBatchDelete = true;
                let arr = [];
                this.multipleSelection.forEach((item) => {
                    arr.push(item.resource_type);
                });
                this.batchDeleteForm.etl_sys_cd = this.sys_cd;
                this.batchDeleteForm.resource_type = arr;
            }
        },
        //编辑按钮
        handleEdit(index, row) {
            this.dialogFormVisibleModify = true;
            this.formModify = row;
        },
        //删除按钮
        handleDelete(index, row) {
            this.dialogVisibleDelete = true;
            this.deleteForm.etl_sys_cd = row.etl_sys_cd;
            this.deleteForm.resource_type = row.resource_type;
        },
        //模态框新增取消按钮
        cancleAdd() {
            this.dialogFormVisibleAdd = false;
        },
        //模态框新增保存按钮
        saveAdd() {
            let params = {};
            params["etl_sys_cd"] = this.sys_cd;
            params["resource_type"] = this.formAdd.resource_type;
            params["resource_max"] = this.formAdd.resource_max;
            resourcesAvailableAllFun.saveEtlResource(params).then(res => {
                this.getTable();
                this.formAdd = {};
            });
            this.dialogFormVisibleAdd = false;
        },
        //模态框修改取消按钮
        cancleModify() {
            this.dialogFormVisibleModify = false;
        },
        //模态框修改保存按钮
        saveModify() {
            let params = {};
            params["etl_sys_cd"] = this.sys_cd;
            params["resource_type"] = this.formModify.resource_type;
            params["resource_max"] = this.formModify.resource_max;
            resourcesAvailableAllFun.updateEtlResource(params).then(res => {
                this.getTable();
                this.formModify = {};
            });
            this.dialogFormVisibleModify = false;
        },
        //模态框删除取消按钮
        cancleDelete() {
            this.dialogVisibleDelete = false;
        },
        //模态框删除保存按钮
        saveDelete() {
            let params = {};
            params["etl_sys_cd"] = this.deleteForm.etl_sys_cd;
            params["resource_type"] = this.deleteForm.resource_type;
            resourcesAvailableAllFun.deleteEtlResource(params).then(res => {
                this.getTable();
                this.deleteForm = {};
            });
            this.dialogVisibleDelete = false;
        },
        //模态框批量删除取消按钮
        cancleBatchDelete() {
            this.dialogVisibleBatchDelete = false;
        },
        //模态框批量删除保存按钮
        saveBatchDelete() {
            let params = {};
            params["etl_sys_cd"] = this.batchDeleteForm.etl_sys_cd;
            params["resource_type"] = this.batchDeleteForm.resource_type;
            resourcesAvailableAllFun.batchDeleteEtlResource(params).then(res => {
                this.getTable();
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            }).catch(err => {
                this.$message.error('删除失败');
            });
            this.dialogVisibleBatchDelete = false;
        },
        //分页方法
        handleCurrentChange(cpage) {
            this.currpage = cpage;
            this.getTable();
        },
        handleSizeChange(psize) {
            this.pagesize = psize;
            this.getTable();
        },
    },
};
</script>

<style scoped>
.el-input {
    width: 330px;
    margin-bottom: 15px;
}

.tabBtns {
    margin-top: 15px;
}
</style>
