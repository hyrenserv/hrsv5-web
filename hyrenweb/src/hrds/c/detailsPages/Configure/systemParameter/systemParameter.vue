<template>
<div>
    <div class="subSystemdiv2">
        <el-input size="mini" placeholder="变量名称" v-model="input">
            <el-button size="mini" slot="append" @click="searchBtn">搜索</el-button>
        </el-input>
    </div>
    <div class="subSystemdiv">
        <el-upload class="buttonStyle" accept=".xlsx" action="" :auto-upload="false" :on-change="handleChange" :limit="1" :on-exceed="handleExceed" :fileList="fileList">
            <el-button size="mini" type="primary">选择上传文件</el-button>
        </el-upload>
        <el-button class="buttonStyle" size="mini" type="success" @click="importData">导入数据
        </el-button>
        <el-button class="buttonStyle" size="mini" type="primary" @click="downloadModel">下载模板
        </el-button>
        <el-button class="buttonStyle" size="mini" type="primary" @click="handleAdd">新增
        </el-button>
        <el-button class="buttonStyle" size="mini" type="danger" @click="handleBatchDelete">批量删除
        </el-button>
    </div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%" @selection-change="handleSelectionChange">
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
                <el-button v-if="scope.row.etl_sys_cd != 'SYS'" size="mini" icon="el-icon-edit" title="编辑" type="primary" @click="handleEdit(scope.$index, scope.row)">
                </el-button>
                <el-button v-if="scope.row.etl_sys_cd != 'SYS'" size="mini" icon="el-icon-delete" title="删除" type="danger" @click="handleDelete(scope.$index, scope.row)">
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-row :gutter="20" class="tabBtns">
        <el-col :span="13" :offset="11">
            <el-pagination background layout="prev, pager, next, sizes, total, jumper" :page-sizes="[5, 10, 15, 20]"  :page-size="pagesize" :total="pageLength" @current-change="handleCurrentChange" @size-change="handleSizeChange">
            </el-pagination>
        </el-col>
    </el-row>
    <!-- 添加/修改系统模态框 -->
    <el-dialog :title="systemTitle" :visible.sync="dialogFormVisibleAdd" width="40%">
        <el-form :model="formAdd" ref="formAdd" class="demo-ruleForm" label-width="120px">
            <el-form-item label="工程编号" prop="etl_sys_cd" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.etl_sys_cd" autocomplete="off" placeholder="工程编号" disabled></el-input>
            </el-form-item>
            <el-form-item label="变量名称" prop="para_cd" :rules="filter_rules([{required: true}])">
                <div>
                    <el-input v-if="this.systemTitle == '修改系统参数'" placeholder="变量名称" v-model="formAdd.para_cd" disabled>
                        <template slot="prepend">!</template>
                    </el-input>
                    <el-input v-if="this.systemTitle == '添加系统参数'" placeholder="变量名称" v-model="formAdd.para_cd">
                        <template slot="prepend">!</template>
                    </el-input>
                    &nbsp;
                    <el-tooltip class="item" effect="dark" content="如果需要添加自定义格式日期，请使用txdate(当前跑批)、txdate_next(后一跑批日)、txdate_pre(前一跑批日)、date(当前系统日)开头的变量参数名,变量值如yyyyMMdd" placement="bottom-end">
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                </div>
            </el-form-item>
            <el-form-item label="变量类型" :rules="filter_rules([{required: true}])">
                <div style="width:330px">
                    <el-select v-model="formAdd.para_type" placeholder="变量类型">
                        <el-option v-for="item in formSelect.paraType" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-form-item>
            <el-form-item label="变量值" prop="para_val" :rules="filter_rules([{required: true}])">
                <div style="width:193px">
                    <el-input v-model="formAdd.para_val" autocomplete="off" placeholder="变量值"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="描述" prop="para_desc">
                <div style="width:330px">
                    <el-input type="textarea" v-model="formAdd.para_desc" autocomplete="off" placeholder="描述"></el-input>
                </div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="saveAdd" size="mini">保存</el-button>
        </div>
    </el-dialog>
    <!-- 删除/批量删除系统模态框 -->
    <el-dialog :title="deleteTitle" :visible.sync="dialogVisibleDelete" width="40%">
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleDelete" size="mini" type="danger">否</el-button>
            <el-button type="primary" @click="saveDelete" size="mini">是</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as systemParameterAllFun from "./systemParameter";
import * as message from "@/utils/js/message";
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
            dialogFormVisibleAdd: false,
            dialogVisibleDelete: false,
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
            pageLength: 100,
        };
    },
    mounted() {
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
            systemParameterAllFun.searchEtlParaByPage(params).then(res => {
                let dates = res.data.etlParaList;
                this.pageLength = res.data.totalSize;
                dates.forEach((item) => {
                    //变量类型
                    (function () {
                        let params = {};
                        params["category"] = "ParamType";
                        params["code"] = item.para_type;
                        systemParameterAllFun.getValue(params).then(res => {
                            item.paraType = res.data;
                        });
                    })();
                });
                setTimeout(() => this.tableData = dates, 200);
            });
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
            systemParameterAllFun.searchEtlParaByPage(params).then(res => {
                let dates = res.data.etlParaList;
                this.pageLength = res.data.totalSize;
                dates.forEach((item) => {
                    //变量类型
                    (function () {
                        let params = {};
                        params["category"] = "ParamType";
                        params["code"] = item.para_type;
                        systemParameterAllFun.getValue(params).then(res => {
                            item.paraType = res.data;
                        });
                    })();
                });
                setTimeout(() => this.tableData = dates, 200);
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
                this.deleteTitle = '确定批量删除?';
                this.dialogVisibleDelete = true;
            }
        },
        //编辑按钮
        handleEdit(index, row) {
            this.dialogFormVisibleAdd = true;
            this.systemTitle = '修改系统参数';
            this.formAdd = row;
        },
        //删除按钮
        handleDelete(index, row) {
            this.dialogVisibleDelete = true;
            this.formDelete.para_cd = row.para_cd;
            this.deleteTitle = '确定删除?';
        },
        //模态框新增/修改取消按钮
        cancleAdd() {
            this.dialogFormVisibleAdd = false;
            this.formAdd = {};
        },
        //模态框新增/修改保存按钮
        saveAdd() {
            if (this.formAdd.para_cd == '' || this.formAdd.para_type == '' || this.formAdd.para_val == '') {
                this.$message({
                    message: '请输入完整信息',
                    type: 'warning'
                });
            } else {
                let params = {};
                params["etl_sys_cd"] = this.formAdd.etl_sys_cd;
                params["para_cd"] = this.formAdd.para_cd;
                params["para_val"] = this.formAdd.para_val;
                params["para_type"] = this.formAdd.para_type;
                params["para_desc"] = this.formAdd.para_desc;
                if (this.systemTitle == '添加系统参数') {
                    systemParameterAllFun.saveEtlPara(params).then(res => {
                        this.getTable();
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    });
                } else if (this.systemTitle == '修改系统参数') {
                    systemParameterAllFun.updateEtlPara(params).then(res => {
                        this.getTable();
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    });
                }
                this.dialogFormVisibleAdd = false;
                this.formAdd = {};
            }
        },
        //模态框删除/批量删除取消按钮
        cancleDelete() {
            this.dialogVisibleDelete = false;
            this.formDelete = {};
        },
        //模态框删除/批量删除保存按钮
        saveDelete() {
            let params = {};
            params["etl_sys_cd"] = this.sys_cd;
            params["para_cd"] = this.formDelete.para_cd;
            if (this.deleteTitle == '确定删除?') {
                systemParameterAllFun.deleteEtlPara(params).then(res => {
                    this.getTable();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                }).catch(err => {
                    this.$message.error('删除失败');
                });
            } else if (this.deleteTitle == '确定批量删除?') {
                let arr = [];
                this.multipleSelection.forEach((item) => {
                    arr.push(item.para_cd);
                });
                let params = {};
                params["etl_sys_cd"] = this.sys_cd;
                params["para_cd"] = arr;
                systemParameterAllFun.batchDeleteEtlPara(params).then(res => {
                    this.getTable();
                    this.$message({
                        message: '批量删除成功',
                        type: 'success'
                    });
                }).catch(err => {
                    this.$message.error('批量删除失败');
                });
            }
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
            arr = fileList;
        },
        //导入数据按钮
        importData() {
            if (arr.length > 0) {
                let param = new FormData() // 创建form对象
                for (let i = 0; i < arr.length; i++) {
                    param.append('file', arr[i].raw);
                }
                systemParameterAllFun.uploadExcelFile(param).then(res => {
                    if (res.code == 200) {
                        message.customizTitle("文件上传成功", "success");
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
                const blob = new Blob([res]);
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
.el-input {
    width: 330px;
    margin-bottom: 15px;
}

.tabBtns {
    margin-top: 15px;
}

.buttonStyle {
    display: inline-block;
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
