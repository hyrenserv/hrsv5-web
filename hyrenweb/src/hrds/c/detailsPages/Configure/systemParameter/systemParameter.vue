<template>
<div>
    <div class="subSystemdiv2">
        <el-input size="mini" placeholder="变量名称" v-model="input" class="elinput">
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
        <el-table-column type="selection" show-overflow-tooltip align='center' disabled='true' :selectable="isDisabled">
        </el-table-column>
        <el-table-column prop="etl_sys_cd" show-overflow-tooltip label="工程编号" align='center'>
        </el-table-column>
        <el-table-column prop="para_cd" show-overflow-tooltip label="变量名称" align='center'>
        </el-table-column>
        <el-table-column prop="paraType" show-overflow-tooltip label="变量类型" align='center'>
        </el-table-column>
        <el-table-column prop="para_val" show-overflow-tooltip label="变量值" align='center'>
        </el-table-column>
        <el-table-column prop="para_desc" show-overflow-tooltip label="描述" align='center'>
        </el-table-column>
        <el-table-column label="操作" align='center'>
            <template slot-scope="scope">
                <el-button v-if="scope.row.etl_sys_cd != 'SYS'" size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button v-if="scope.row.etl_sys_cd != 'SYS'" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-row :gutter="20" class="tabBtns">
        <el-pagination layout="total, sizes,prev, pager, next, jumper" style="float:right" :page-sizes="[5, 10, 15, 20]"  :page-size="pagesize" :total="pageLength" @current-change="handleCurrentChange" @size-change="handleSizeChange">
        </el-pagination>
    </el-row>
    <!-- 添加/修改系统模态框 -->
    <el-dialog :title="systemTitle" :visible.sync="dialogFormVisibleAdd" width="40%" :before-close="beforeClosechange">
        <el-form :model="formAdd" ref="formAdd" class="demo-ruleForm" label-width="120px">
            <el-form-item label="工程编号" prop="etl_sys_cd" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.etl_sys_cd" style="width:300px;" autocomplete="off" placeholder="工程编号" disabled></el-input>
            </el-form-item>
            <el-form-item label="变量名称" prop="para_cd" :rules="filter_rules([{required: true}])">
                <div>
                    <el-input style="width:300px;" v-if="this.systemTitle == '修改系统参数'" placeholder="变量名称" v-model="formAdd.para_cd" disabled>
                        <template slot="prepend">!</template>
                    </el-input>
                    <el-input style="width:300px;" v-if="this.systemTitle == '添加系统参数'" placeholder="变量名称" v-model="formAdd.para_cd">
                        <template slot="prepend">!</template>
                    </el-input>
                    &nbsp;
                    <el-tooltip class="item" effect="dark" content="如果需要添加自定义格式日期，请使用txdate(当前跑批)、txdate_next(后一跑批日)、txdate_pre(前一跑批日)、date(当前系统日)开头的变量参数名,变量值如yyyyMMdd" placement="bottom-end">
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                </div>
            </el-form-item>
            <el-form-item label="变量类型" prop="para_type" :rules="rule.selected">
                <div>
                    <el-select style="width:300px;" v-model="formAdd.para_type" placeholder="变量类型">
                        <el-option v-for="item in formSelect.paraType" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item label="变量值" prop="para_val" :rules="filter_rules([{required: true}])">
                <div>
                    <el-input style="width:300px;" v-model="formAdd.para_val" autocomplete="off" placeholder="变量值"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="描述" prop="para_desc">
                <div style="width:330px">
                    <el-input style="width:300px;" type="textarea" v-model="formAdd.para_desc" autocomplete="off" placeholder="描述"></el-input>
                </div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="saveAdd('formAdd')" size="mini">保存</el-button>
        </div>
    </el-dialog>
    <!-- 获取上传文件 -->
    <el-dialog title="导入系统参数数据" :visible.sync="dialogImportData" :before-close="importDatacancel">
        <span v-if="fileList != ''">确认导入 “ {{fileList[0].name}} ” </span>
        <div slot="footer" class="dialog-footer">
            <el-button @click="importDatacancel" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="importData" :loading="loadingUpload" size="mini">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as systemParameterAllFun from "./systemParameter";
import * as message from "@/utils/js/message";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
let arr = [];
export default {
    data() {
        return {
            sys_cd: '',
            input: '',
            systemTitle: '',
            deleteTitle: '',
            tableData: [],
            multipleSelection: [],
            fileList: [],
            paratype: [],
            dialogFormVisibleAdd: false,
            dialogImportData: false,
            loadingUpload: false,
            rule: validator.default,
            formAdd: {
                etl_sys_cd: '',
                para_cd: '',
                para_type: '',
                para_val: '',
                para_desc: '',
            },
            formDelete: {
                para_cd: '',
            },
            formSelect: {
                paraType: [],
            },
            pagesize: 5,
            currpage: 1,
            pageLength: 0,
        };
    },
    mounted() {
        this.getCodeItems("ParamType");
        this.getTable();
        this.getParaName();
    },
    methods: {
        //刷新表格
        getTable() {
            let params = {};
            this.sys_cd = sessionStorage.getItem('sys_cd');
            params["etl_sys_cd"] = this.sys_cd;
            params["para_cd"] = '';
            params["currPage"] = this.currpage;
            params["pageSize"] = this.pagesize;
            this.searchEtlParaByPage(params);
        },
        // 获取表格数据封装
        searchEtlParaByPage(params) {
            systemParameterAllFun.searchEtlParaByPage(params).then(res => {
                let dates = res.data.etlParaList;
                this.pageLength = res.data.totalSize;
                dates.forEach((item) => {
                    //变量类型
                    this.paratype.forEach(val => {
                        if (item.para_type == val.code) {
                            item.paraType = val.value;
                        }
                    })
                });
                this.tableData = dates;
            });
        },
        getCodeItems(val) {
            if (val == "ParamType") {
                systemParameterAllFun.getCategoryItems({
                    category: 'ParamType'
                }).then(res => {
                    this.paratype = res.data;
                })
            }
        },
        //获取变量名称下拉框数据
        getParaName() {
            let params = {};
            let arr = [];
            params["category"] = "ParamType";
            systemParameterAllFun.getCategoryItems(params).then(res => {
                arr = res.data;
                arr.forEach((item) => {
                    item.label = item.value;
                    item.value = item.code;
                });
                this.formSelect.paraType = arr;
            });
        },
        //表格复选框是否禁用
        isDisabled(row, index) {
            if (row.etl_sys_cd == 'SYS') {
                return 0;
            } else {
                return 1;
            }
        },
        //搜索按钮
        searchBtn() {
            let params = {};
            params["etl_sys_cd"] = this.sys_cd;
            params["para_cd"] = this.input;
            params["currPage"] = this.currpage;
            params["pageSize"] = this.pagesize;
            this.searchEtlParaByPage(params);
        },
        //选中的数据
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //新增按钮
        handleAdd() {
            this.dialogFormVisibleAdd = true;
            this.formAdd.etl_sys_cd = this.sys_cd;
            this.systemTitle = '添加系统参数';
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
                        arr.push(item.para_cd);
                    });
                    let params = {};
                    params["etl_sys_cd"] = this.sys_cd;
                    params["para_cd"] = arr;
                    systemParameterAllFun.batchDeleteEtlPara(params).then(res => {
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
            this.systemTitle = '修改系统参数';
            this.formAdd = Object.assign({}, row);
        },
        //删除按钮
        handleDelete(index, row) {
            this.formDelete.para_cd = row.para_cd;
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                let params = {};
                params["etl_sys_cd"] = this.sys_cd;
                params["para_cd"] = this.formDelete.para_cd;
                systemParameterAllFun.deleteEtlPara(params).then(res => {
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
        //模态框新增/修改取消按钮
        cancleAdd() {
            this.dialogFormVisibleAdd = false;
            this.formAdd = {};
            this.$refs.formAdd.resetFields();
        },
        beforeClosechange() {
            this.dialogFormVisibleAdd = false;
            this.formAdd = {};
            this.$refs.formAdd.resetFields();
        },
        //模态框新增/修改保存按钮
        saveAdd(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let params = {};
                    params["etl_sys_cd"] = this.formAdd.etl_sys_cd;
                    params["para_cd"] = this.formAdd.para_cd;
                    params["para_val"] = this.formAdd.para_val;
                    params["para_type"] = this.formAdd.para_type;
                    params["para_desc"] = this.formAdd.para_desc;
                    if (this.systemTitle == '添加系统参数') {
                        systemParameterAllFun.saveEtlPara(params).then(res => {
                            if (res && res.success) {
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
                    } else if (this.systemTitle == '修改系统参数') {
                        systemParameterAllFun.updateEtlPara(params).then(res => {
                            if (res && res.success) {
                                this.getTable();
                                this.$message({
                                    message: '修改成功',
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
                param.append('table_name', 'etl_para');
                systemParameterAllFun.uploadExcelFile(param).then(res => {
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
            systemParameterAllFun.generateExcel({
                etl_sys_cd: that.$route.query.etl_sys_cd,
                tableName: 'etl_para'
            }).then(res => {
                if (res && res.code == 200) {
                    that.downloadFile(res.data)
                }
            })
        },
        // 下载模板表格
        downloadFile(val) {
            systemParameterAllFun.downloadFile({
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
.elinput {
    width: 330px;
    margin-bottom: 15px;
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
