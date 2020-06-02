<template>
<div class="subSystem">
    <div class="subSystemdiv2">
        <el-input size="mini" placeholder="任务编号" v-model="input">
            <el-button size="mini" slot="append" @click="searchBtn">搜索</el-button>
        </el-input>
    </div>
    <div class="subSystemdiv">
        <el-upload class="buttonStyle" accept=".xlsx" action="" :show-file-list="false" :auto-upload="false" :on-change="handleChange" :limit="1" :on-exceed="handleExceed" :fileList="fileList">
            <el-button size="mini" type="primary">导入数据</el-button>
        </el-upload>
        <el-button class="buttonStyle" size="mini" type="primary" @click="downloadModel">下载模板
        </el-button>
        <el-button class="buttonStyle" size="mini" type="primary" @click="handleAdd">新增
        </el-button>
        <el-button class="buttonStyle" size="mini" type="danger" @click="handleBatchDelete">批量删除
        </el-button>
    </div>
    <el-table size="medium" ref="multipleTable" :data="tableData" tooltip-effect="dark" stripe border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" align='center'>
        </el-table-column>
        <el-table-column prop="etl_sys_cd" show-overflow-tooltip label="工程编号" align='center'>
        </el-table-column>
        <el-table-column prop="sub_sys_cd" show-overflow-tooltip label="任务编号" align='center'>
        </el-table-column>
        <el-table-column prop="sub_sys_desc" show-overflow-tooltip label="任务名称" align='center'>
        </el-table-column>
        <el-table-column prop="comments" show-overflow-tooltip label="备注" align='center'>
        </el-table-column>
        <el-table-column label="操作" align='center'>
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-row :gutter="20" class="tabBtns">
        <el-pagination layout=" total, sizes,prev, pager, next, jumper" style="float:right" :page-sizes="[5, 10, 15, 20]"  :page-size="pagesize" :total="pageLength" @current-change="handleCurrentChange" @size-change="handleSizeChange">
        </el-pagination>
    </el-row>
    <!-- 添加任务模态框 -->
    <el-dialog title="添加任务" :visible.sync="dialogFormVisibleAdd" width="42%" :before-close="beforeClosechange">
        <el-form :model="formAdd" ref="formAdd" class="demo-ruleForm" label-width="120px">
            <el-form-item label="工程编号" prop="etl_sys_cd" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.etl_sys_cd" autocomplete="off" placeholder="工程编号" disabled></el-input>
            </el-form-item>
            <el-form-item label="任务编号" prop="sub_sys_cd" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.sub_sys_cd" autocomplete="off" placeholder="工程名称"></el-input>
            </el-form-item>
            <el-form-item label="任务名称" prop="sub_sys_desc" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.sub_sys_desc" autocomplete="off" placeholder="任务名称"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="comments">
                <div style="width:330px">
                    <el-input type="textarea" v-model="formAdd.comments" autocomplete="off" placeholder="备注"></el-input>
                </div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="saveAdd('formAdd')" size="mini">保存</el-button>
        </div>
    </el-dialog>
    <!-- 修改任务模态框 -->
    <el-dialog title="修改任务" :visible.sync="dialogFormVisibleModify" width="42%">
        <el-form :model="formModify" ref="formModify" class="demo-ruleForm" label-width="120px">
            <el-form-item label="工程编号" prop="etl_sys_cd" :rules="filter_rules([{required: true}])">
                <el-input v-model="formModify.etl_sys_cd" autocomplete="off" placeholder="工程编号" disabled></el-input>
            </el-form-item>
            <el-form-item label="任务编号" prop="sub_sys_cd" :rules="filter_rules([{required: true}])">
                <el-input v-model="formModify.sub_sys_cd" autocomplete="off" placeholder="工程名称" disabled></el-input>
            </el-form-item>
            <el-form-item label="任务名称" prop="sub_sys_desc" :rules="filter_rules([{required: true}])">
                <el-input v-model="formModify.sub_sys_desc" autocomplete="off" placeholder="任务名称"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="comments">
                <div style="width:330px">
                    <el-input type="textarea" v-model="formModify.comments" autocomplete="off" placeholder="备注"></el-input>
                </div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleModify" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="saveModify('formModify')" size="mini">保存</el-button>
        </div>
    </el-dialog>
    <!-- 获取上传文件 -->
    <el-dialog title="导入任务数据" :visible.sync="dialogImportData" :before-close="importDatacancel">
        <span v-if="fileList != ''">确认导入 “ {{fileList[0].name}} ” </span>
        <div slot="footer" class="dialog-footer">
            <el-button @click="importDatacancel" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="importData" :loading="loadingUpload" size="mini">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as subSystemAllFun from "./subSystem";
import * as message from "@/utils/js/message";
let arr = [];
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
            dialogImportData: false,
            loadingUpload: false,
            formAdd: {
                etl_sys_cd: '',
                sub_sys_cd: '',
                sub_sys_desc: '',
                comments: ''
            },
            formModify: {
                etl_sys_cd: '',
                sub_sys_cd: '',
                sub_sys_desc: '',
                comments: ''
            },
            deleteForm: {
                etl_sys_cd: '',
                sub_sys_cd: ''
            },
            pagesize: 5,
            currpage: 1,
            pageLength: 0,
        };
    },
    methods: {
        //刷新表格
        getTable() {
            let params = {};
            // let sys_cd = this.$route.query.etl_sys_cd;
            this.sys_cd = sessionStorage.getItem('sys_cd');
            params["etl_sys_cd"] = this.sys_cd;
            params["sub_sys_cd"] = '';
            params["currPage"] = this.currpage;
            params["pageSize"] = this.pagesize;
            subSystemAllFun.searchEtlSubSysByPage(params).then(res => {
                this.tableData = res.data.etlSubSysList;
                this.pageLength = res.data.totalSize;
            });
        },
        //选中的数据
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //搜索按钮
        searchBtn() {
            let params = {};
            this.sys_cd = sessionStorage.getItem('sys_cd');
            params["etl_sys_cd"] = this.sys_cd;
            params["sub_sys_cd"] = this.input;
            params["currPage"] = this.currpage;
            params["pageSize"] = this.pagesize;
            subSystemAllFun.searchEtlSubSysByPage(params).then(res => {
                this.tableData = res.data.etlSubSysList;
                this.pageLength = res.data.totalSize;
            });
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
                this.$confirm('确认批量删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    let arr = [];
                    this.multipleSelection.forEach((item) => {
                        arr.push(item.sub_sys_cd);
                    });
                    let params = {};
                    params["etl_sys_cd"] = this.sys_cd;
                    params["sub_sys_cd"] = arr;
                    subSystemAllFun.batchDeleteEtlSubSys(params).then(res => {
                        if (res && res.success) {
                            this.getTable();
                            this.$message({
                                message: '批量删除成功',
                                type: 'success'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消批量删除'
                    });
                });

            }
        },
        //编辑按钮
        handleEdit(index, row) {
            this.dialogFormVisibleModify = true;
            this.formModify = Object.assign({}, row);
        },
        //删除按钮
        handleDelete(index, row) {
            this.deleteForm.etl_sys_cd = row.etl_sys_cd;
            this.deleteForm.sub_sys_cd = row.sub_sys_cd;
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                let params = {};
                params["etl_sys_cd"] = this.deleteForm.etl_sys_cd;
                params["sub_sys_cd"] = this.deleteForm.sub_sys_cd;
                subSystemAllFun.deleteEtlSubSys(params).then(res => {
                    if (res && res.success) {
                        this.getTable();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //模态框新增取消按钮
        cancleAdd() {
            this.$refs.formAdd.resetFields();
            this.dialogFormVisibleAdd = false;
        },
        // 关闭弹出框之前触发事件
        beforeClosechange() {
            this.dialogFormVisibleAdd = false;
            this.$refs.formAdd.resetFields();
        },
        //模态框新增保存按钮
        saveAdd(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let params = {};
                    params["etl_sys_cd"] = this.sys_cd;
                    params["sub_sys_cd"] = this.formAdd.sub_sys_cd;
                    params["sub_sys_desc"] = this.formAdd.sub_sys_desc;
                    params["comments"] = this.formAdd.comments;
                    subSystemAllFun.saveEtlSubSys(params).then(res => {
                        if (res && res.success) {
                            this.getTable();
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.dialogFormVisibleAdd = false;
                            this.formAdd = {};
                        }
                    })
                }
            })
        },
        //模态框修改取消按钮
        cancleModify() {
            this.dialogFormVisibleModify = false;
        },
        //模态框修改保存按钮
        saveModify(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let params = {};
                    params["etl_sys_cd"] = this.sys_cd;
                    params["sub_sys_cd"] = this.formModify.sub_sys_cd;
                    params["sub_sys_desc"] = this.formModify.sub_sys_desc;
                    params["comments"] = this.formModify.comments;
                    subSystemAllFun.updateEtlSubSys(params).then(res => {
                        if (res && res.success) {
                            this.getTable();
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.dialogFormVisibleModify = false;
                            this.formModify = {};
                        }
                    })
                }
            })
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
        //文件超出个数限制时的钩子
        handleExceed(files, fileList) {
            this.$message.warning(`只能选择一个文件`);
        },
        // 获取上传的文件详情
        handleChange(file, fileList) {
            this.fileList = fileList;
            if (fileList.length != 0) {
                this.dialogImportData = true;
            } else {
                this.dialogImportData = false;
            }
            arr = fileList;
        },
        // 取消数据导入
        importDatacancel() {
            this.dialogImportData = false;
            this.fileList = [];
            this.$message.info('已取消导入数据');
        },
        //导入数据按钮
        importData() {
            if (arr.length > 0) {
                this.loadingUpload = true;
                let param = new FormData() // 创建form对象
                for (let i = 0; i < arr.length; i++) {
                    param.append('file', arr[i].raw);
                }
                param.append('table_name', 'etl_sub_sys_list');
                subSystemAllFun.uploadExcelFile(param).then(res => {
                    if (res && res.success) {
                        message.customizTitle("导入数据成功", "success");
                        this.getTable();
                        this.fileList = [];
                        this.dialogImportData = false;
                        this.loadingUpload = false;
                    } else {
                        this.loadingUpload = false;
                    }
                });
            } else {
                message.customizTitle("请选择上传文件", "warning");
            }

        },
        //下载按钮
        downloadModel() {
            let that = this;
            subSystemAllFun.generateExcel({
                etl_sys_cd: that.$route.query.etl_sys_cd,
                tableName: 'etl_sub_sys_list'
            }).then(res => {
                if (res && res.code == 200) {
                    that.downloadFile(res.data)
                }
            })
        },
        // 下载模板表格
        downloadFile(val) {
            subSystemAllFun.downloadFile({
                fileName: val
            }).then(res => {
                this.filename = val;
                const blob = new Blob([res.data]);
                if (window.navigator.msSaveOrOpenBlob) {
                    // 兼容IE10
                    navigator.msSaveBlob(blob, this.filename);
                } else {
                    //  chrome/firefox
                    let aTag = document.createElement("a");
                    // document.body.appendChild(aTag);
                    aTag.download = this.filename;
                    aTag.href = URL.createObjectURL(blob);
                    if (aTag.all) {
                        aTag.click();
                    } else {
                        //  兼容firefox
                        var evt = document.createEvent("MouseEvents");
                        evt.initEvent("click", true, true);
                        aTag.dispatchEvent(evt);
                    }
                    URL.revokeObjectURL(aTag.href);
                }
            })
        }
    },
    mounted() {
        this.getTable();
    },

};
</script>

<style scoped>
.el-input {
    width: 330px;
    margin-bottom: 12px;
}

.tabBtns {
    margin-top: 15px;
}

.buttonStyle {
    display: block;
    float: left;
    margin-right: 10px;
    margin-left: 0px;
}

.subSystemdiv {
    float: right;
}

.subSystemdiv2 {
    float: left;
}
</style>
