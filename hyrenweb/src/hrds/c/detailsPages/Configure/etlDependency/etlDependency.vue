<template>
<div>
    <el-form :model="form" ref="form" class="demo-form-inlines" :inline="true">
        <el-col :span="12">
            <el-form-item label="作业名称">
                <el-autocomplete :fetch-suggestions="querySearch" size="mini" v-model="form.etl_job" style="width:264px" placeholder="作业名称"></el-autocomplete>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="上游作业名称">
                <el-input size="mini" v-model="form.pre_etl_job" style="width:264px" placeholder="上游作业名称"></el-input>
                <el-button size="mini" class="searchBtn" type="primary" @click="searchBtn">搜索
                </el-button>
            </el-form-item>
        </el-col>
    </el-form>
    <el-divider></el-divider>
    <el-row>
        <div class="subSystemdiv">
            <el-upload class="buttonStyle" accept=".xlsx" action="" :show-file-list="false" :auto-upload="false" :on-change="handleChange" :limit="1" :on-exceed="handleExceed" :fileList="fileList">
                <el-button size="mini" type="primary">导入数据</el-button>
            </el-upload>
            <el-button class="buttonStyle" size="mini" type="primary" @click="downloadModel">下载模板
            </el-button>
            <el-button class="buttonStyle" size="mini" type="primary" @click="handleAdd">新增
            </el-button>
            <el-button class="buttonStyle" size="mini" type="primary" @click="handleBatchAdd">批量新增
            </el-button>
            <el-button class="buttonStyle" size="mini" type="danger" @click="handleBatchDelete">批量删除
            </el-button>
        </div>
    </el-row>
    <el-table size="medium" ref="multipleTable" :data="tableData" tooltip-effect="dark" stripe border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" align='center'>
        </el-table-column>
        <el-table-column prop="etl_sys_cd" show-overflow-tooltip label="工程编号" align='center'>
        </el-table-column>
        <el-table-column prop="etl_job" show-overflow-tooltip label="作业名称" align='center'>
        </el-table-column>
        <el-table-column prop="pre_etl_sys_cd" show-overflow-tooltip label="上游工程编号" align='center'>
        </el-table-column>
        <el-table-column prop="pre_etl_job" show-overflow-tooltip label="上游作业名称" align='center'>
        </el-table-column>
        <el-table-column prop="statu" show-overflow-tooltip label="状态" align='center'>
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
        <el-pagination layout="total, sizes,prev, pager, next, jumper" style="float:right" :page-sizes="[5, 10, 15, 20]"  :page-size="pagesize" :total="pageLength" @current-change="handleCurrentChange" @size-change="handleSizeChange">
        </el-pagination>
    </el-row>
    <!-- 添加/修改/批量添加作业模态框 -->
    <el-dialog :title="dependTitle" :visible.sync="dialogFormVisibleAdd" width="40%" :before-close="beforeClose">
        <el-form :model="formAdd" ref="formAdd" class="demo-ruleForm" label-width="150px">
            <el-form-item label="工程编号" prop="etl_sys_cd" :rules="filter_rules([{required: true}])">
                <div style="width:193px">
                    <el-input v-model="formAdd.etl_sys_cd" style="width:218px;" autocomplete="off" placeholder="工程编号" disabled></el-input>
                </div>
            </el-form-item>

            <el-form-item v-if="this.dependTitle == '添加作业依赖'" prop="etl_job" label="作业名称" :rules="rule.selected ">
                <el-select v-model="formAdd.etl_job" placeholder="请选择作业名称" style="width:218px;">
                    <el-option v-for="item in formSelect.jobName" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="this.dependTitle == '修改作业依赖'" prop="etl_job" label="作业名称" :rules="rule.selected ">
                <el-select v-model="formAdd.etl_job" placeholder="请选择作业名称" style="width:218px;">
                    <el-option v-for="item in formSelect.jobName" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="this.dependTitle == '批量添加作业依赖'" prop="sub_sys_cd" label="任务名称" :rules="rule.selected ">
                <el-select v-model="formAdd.sub_sys_cd" placeholder="请选择任务名称" style="width:218px;">
                    <el-option v-for="item in formSelect.proName" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="上游工程编号" prop="pre_etl_sys_cd">
                <div style="width:193px">
                    <el-input v-model="formAdd.pre_etl_sys_cd" autocomplete="off" style="width:218px;" placeholder="上游工程编号" disabled></el-input>
                </div>
            </el-form-item>
            <el-form-item v-if="this.dependTitle != '批量添加作业依赖'" prop="pre_etl_job" label="上游作业名称" :rules="rule.selected ">
                <el-select v-model="formAdd.pre_etl_job" placeholder="请选择上游作业" style="width:218px;">
                    <el-option v-for="item in formSelect.jobName" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item v-if="this.dependTitle == '批量添加作业依赖'" prop="pre_sub_sys_cd" label="上游任务名称" :rules="rule.selected ">
                <el-select v-model="formAdd.pre_sub_sys_cd" placeholder="请选择上游任务" style="width:218px;">
                    <el-option v-for="item in formSelect.proName" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="状态" prop="status" :rules="rule.selected ">
                <el-select v-model="formAdd.status" placeholder="请选择状态" style="width:218px;">
                    <el-option v-for="item in formSelect.statu" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="saveAdd('formAdd')" size="mini">保存</el-button>
        </div>
    </el-dialog>
    <!-- 获取上传文件 -->
    <el-dialog title="导入作业依赖数据" :visible.sync="dialogImportData" :before-close="importDatacancel">
        <span v-if="fileList != ''">确认导入 “ {{fileList[0].name}} ” </span>
        <div slot="footer" class="dialog-footer">
            <el-button @click="importDatacancel" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="importData" :loading="loadingUpload" size="mini">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as etlDependencyAllFun from "./etlDependency";
import * as message from "@/utils/js/message";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
let arr = [];
export default {
    data() {
        return {
            sys_cd: '',
            rule: validator.default,
            form: {
                etl_job: '',
                pre_etl_job: '',
            },
            listDatas: [],
            tableData: [],
            dependTitle: '',
            deleteTitle: '',
            multipleSelection: [],
            fileList: [],
            dialogFormVisibleAdd: false,
            dialogVisibleDelete: false,
            dialogImportData: false,
            loadingUpload: false,
            statusNum: [],
            formAdd: {
                etl_sys_cd: '',
                etl_job: '',
                pre_etl_sys_cd: '',
                pre_etl_job: '',
                status: '',
                sub_sys_cd: '',
                pre_sub_sys_cd: '',
            },
            formDelete: {
                etl_sys_cd: '',
                etl_job: '',
                pre_etl_job: '',
                pre_etl_sys_cd: '',
            },
            formSelect: {
                jobName: [],
                proName: [],
                statu: [],
            },
            formOld: {
                oldEtlJob: '',
                oldPreEtlJob: '',
            },
            pagesize: 5,
            currpage: 1,
            pageLength: 0,
        };
    },
    mounted() {
        this.getCodeItems("Status");
        this.getStatu();
        this.getTable();
        this.getProName();
        this.getJobName();
    },
    methods: {
        //刷新表格
        getTable() {
            let params = {};
            this.sys_cd = sessionStorage.getItem('sys_cd');
            params["etl_sys_cd"] = this.sys_cd;
            params["etl_job"] = '';
            params["pre_etl_job"] = '';
            params["currPage"] = this.currpage;
            params["pageSize"] = this.pagesize;
            etlDependencyAllFun.searchEtlDependencyByPage(params).then(res => {
                let dates = res.data.etlDependencyList;
                this.pageLength = res.data.totalSize;
                dates.forEach((item) => {
                    //状态
                    this.statusNum.forEach(val => {
                        if (item.status == val.code) {
                            item.statu = val.value;
                        }
                    })
                });
                this.tableData = dates;
            });
        },
        // 获取表格代码项
        getCodeItems(val) {
            if (val == "Status") { //调度频率
                etlDependencyAllFun.getCategoryItems({
                    category: 'Status'
                }).then(res => {
                    this.statusNum = res.data;
                })
            }
        },
        //搜索按钮
        searchBtn() {
            let params = {};
            this.sys_cd = sessionStorage.getItem('sys_cd');
            params["etl_sys_cd"] = this.sys_cd;
            params["etl_job"] = this.form.etl_job;
            params["pre_etl_job"] = this.form.pre_etl_job;
            params["currPage"] = this.currpage;
            params["pageSize"] = this.pagesize;
            etlDependencyAllFun.searchEtlDependencyByPage(params).then(res => {
                let dates = res.data.etlDependencyList;
                this.pageLength = res.data.totalSize;
                dates.forEach((item) => {
                    //状态
                    this.statusNum.forEach(val => {
                        if (item.status == val.code) {
                            item.statu = val.value;
                        }
                    })
                });
                this.tableData = dates;
            });
        },
        //获取作业名称/上游作业名称下拉框数据
        getJobName(val) {
            let params = {};
            let arr = [];
            let obj = {};
            params["etl_sys_cd"] = this.sys_cd;
            etlDependencyAllFun.searchEtlJob(params).then(res => {
                res.data.forEach((item) => {
                    obj.label = item;
                    obj.value = item;
                    arr.push(obj);
                    obj = {};
                });
                this.formSelect.jobName = arr;
                this.listDatas = arr;
            });
        },
        // input框的历史信息
        querySearch(queryString, cb) {
            var res = this.listDatas;
            var results = queryString ? res.filter(this.createFilter(queryString)) : res;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (res) => {
                return (res.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        //获取任务名称/上游任务名称下拉框数据
        getProName() {
            let params = {};
            let arr = [];
            params["etl_sys_cd"] = this.sys_cd;
            etlDependencyAllFun.searchEtlSubSys(params).then(res => {
                arr = res.data;
                arr.forEach((item) => {
                    item.label = item.sub_sys_desc + '(' + item.sub_sys_cd + ')';
                    item.value = item.sub_sys_cd;
                });
                this.formSelect.proName = arr;
            });
        },
        //获取状态下拉框数据
        getStatu() {
            let params = {};
            let arr = [];
            params["category"] = "Status";
            etlDependencyAllFun.getCategoryItems(params).then(res => {
                arr = res.data;
                arr.forEach((item) => {
                    item.label = item.value;
                    item.value = item.code;
                });
                this.formSelect.statu = arr;
            });
        },
        //选中的数据
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //新增按钮
        handleAdd() {
            this.dialogFormVisibleAdd = true;
            this.dependTitle = '添加作业依赖';
            this.formAdd.etl_sys_cd = this.sys_cd;
            this.formAdd.pre_etl_sys_cd = this.sys_cd;
        },
        //批量新增按钮
        handleBatchAdd() {
            this.dialogFormVisibleAdd = true;
            this.dependTitle = '批量添加作业依赖';
            this.formAdd.etl_sys_cd = this.sys_cd;
            this.formAdd.pre_etl_sys_cd = this.sys_cd;
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
                    let obj = {};
                    let arr = [];
                    this.multipleSelection.forEach((item) => {
                        obj.etl_job = item.etl_job;
                        obj.pre_etl_job = item.pre_etl_job;
                        arr.push(obj);
                        obj = {};
                    });
                    arr = JSON.stringify(arr);
                    let params = {};
                    params["etl_sys_cd"] = this.sys_cd;
                    params["pre_etl_sys_cd"] = this.multipleSelection[0].pre_etl_sys_cd;
                    params["batchEtlJob"] = arr;
                    etlDependencyAllFun.batchDeleteEtlDependency(params).then(res => {
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
            this.dialogFormVisibleAdd = true;
            this.dependTitle = '修改作业依赖';
            this.formAdd = Object.assign({}, row);
            this.formOld.oldEtlJob = row.etl_job;
            this.formOld.oldPreEtlJob = row.pre_etl_job;
        },
        //删除按钮
        handleDelete(index, row) {
            this.formDelete.etl_sys_cd = row.etl_sys_cd;
            this.formDelete.etl_job = row.etl_job;
            this.formDelete.pre_etl_job = row.pre_etl_job;
            this.formDelete.pre_etl_sys_cd = row.pre_etl_sys_cd;
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                let params = {};
                params["etl_sys_cd"] = this.formDelete.etl_sys_cd;
                params["etl_job"] = this.formDelete.etl_job;
                params["pre_etl_job"] = this.formDelete.pre_etl_job;
                params["pre_etl_sys_cd"] = this.formDelete.pre_etl_sys_cd;
                etlDependencyAllFun.deleteEtlDependency(params).then(res => {
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
        //模态框添加/修改/批量添加取消按钮
        cancleAdd() {
            this.dialogFormVisibleAdd = false;
            this.formAdd = {};
            this.formOld = {};
            this.$refs.formAdd.resetFields();
        },
        //模态框添加/修改/批量添加保存按钮
        saveAdd(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.dependTitle == '添加作业依赖') {
                        let params = {};
                        params["etl_sys_cd"] = this.formAdd.etl_sys_cd;
                        params["etl_job"] = this.formAdd.etl_job;
                        params["pre_etl_sys_cd"] = this.formAdd.pre_etl_sys_cd;
                        params["pre_etl_job"] = this.formAdd.pre_etl_job;
                        params["status"] = this.formAdd.status;
                        etlDependencyAllFun.saveEtlDependency(params).then(res => {
                            if (res.code == 200) {
                                this.getTable();
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.dialogFormVisibleAdd = false;
                                this.formAdd = {};
                                this.$refs.formAdd.resetFields();
                            }
                        });

                    } else if (this.dependTitle == '修改作业依赖') {
                        let params = {};
                        params["etl_sys_cd"] = this.formAdd.etl_sys_cd;
                        params["etl_job"] = this.formAdd.etl_job;
                        params["pre_etl_sys_cd"] = this.formAdd.pre_etl_sys_cd;
                        params["pre_etl_job"] = this.formAdd.pre_etl_job;
                        params["status"] = this.formAdd.status;
                        params["oldEtlJob"] = this.formOld.oldEtlJob;
                        params["oldPreEtlJob"] = this.formOld.oldPreEtlJob;
                        etlDependencyAllFun.updateEtlDependency(params).then(res => {
                            if (res.code == 200) {
                                this.getTable();
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.dialogFormVisibleAdd = false;
                                this.formAdd = {};
                                this.formOld = {};
                                this.$refs.formAdd.resetFields();
                            }
                        });

                    } else if (this.dependTitle == '批量添加作业依赖') {
                        let params = {};
                        params["etl_sys_cd"] = this.formAdd.etl_sys_cd;
                        params["sub_sys_cd"] = this.formAdd.sub_sys_cd;
                        params["pre_etl_sys_cd"] = this.formAdd.pre_etl_sys_cd;
                        params["pre_sub_sys_cd"] = this.formAdd.pre_sub_sys_cd;
                        params["status"] = this.formAdd.status;
                        etlDependencyAllFun.batchSaveEtlDependency(params).then(res => {
                            if (res.code == 200) {
                                this.getTable();
                                this.$message({
                                    message: '批量添加成功',
                                    type: 'success'
                                });
                                this.dialogFormVisibleAdd = false;
                                this.formAdd = {};
                                this.$refs.formAdd.resetFields();
                            }
                        });

                    }
                }
            })
        },
        beforeClose() {
            this.formAdd = {};
            this.$refs.formAdd.resetFields();
            this.dialogFormVisibleAdd = false;
            this.dialogVisibleDelete = false;
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
                param.append('table_name', 'etl_dependency');
                etlDependencyAllFun.uploadExcelFile(param).then(res => {
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
            etlDependencyAllFun.generateExcel({
                etl_sys_cd: that.$route.query.etl_sys_cd,
                tableName: 'etl_dependency'
            }).then(res => {
                if (res && res.code == 200) {
                    that.downloadFile(res.data)
                }
            })
        },
        // 下载模板表格
        downloadFile(val) {
            etlDependencyAllFun.downloadFile({
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
};
</script>

<style scoped>
.tabBtns {
    margin-top: 15px;
}

.demo-form-inlines {
    height: 32px;
}

.searchBtn {
    margin-left: 10px;
}

.buttonStyle {
    display: block;
    float: left;
    margin-right: 10px;
    margin-left: 0px;
}

.subSystemdiv {
    float: right;
    margin-bottom: 14px;
}
</style><style>
.el-autocomplete-suggestion li {
    overflow: visible;
    /* text-overflow: ellipsis; */
}
</style>
