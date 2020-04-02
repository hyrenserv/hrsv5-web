<template>
<div>
    <el-form :model="form" ref="form" class="demo-form-inlines" :inline="true">
        <el-col :span="12">
            <el-form-item label="作业名称">
                <el-autocomplete :fetch-suggestions="querySearch" size="mini" v-model="form.etl_job" style="width:180px" placeholder="作业名称"></el-autocomplete>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="资源类型">
                <el-input size="mini" v-model="form.resource_type" style="width:180px" placeholder="资源类型"></el-input>
                <el-button class="searchBtn" size="mini" type="primary" @click="searchBtn">搜索</el-button>
            </el-form-item>
        </el-col>
    </el-form>
    <el-divider></el-divider>
    <el-row>
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
    </el-row>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" align='center'>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="etl_sys_cd" label="工程编号" align='center'>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="etl_job" label="作业名称" align='center'>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="resource_type" label="资源类型" align='center'>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="resource_req" label="资源需求数" align='center'>
        </el-table-column>
        <el-table-column label="操作" align='center'>
            <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-edit" title="编辑" type="primary" @click="handleEdit(scope.$index, scope.row)">
                </el-button>
                <el-button size="mini" icon="el-icon-delete" title="删除" type="danger" @click="handleDelete(scope.$index, scope.row)">
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
    <!-- 添加/修改资源模态框 -->
    <el-dialog :title="resourceTitle" :visible.sync="dialogFormVisibleAdd" width="40%" :before-close="beforeClosechange">
        <el-form :model="formAdd" ref="formAdd" class="demo-ruleForm" label-width="150px">
            <el-form-item label="工程编号" prop="etl_sys_cd" :rules="filter_rules([{required: true}])">
                <div style="width:193px">
                    <el-input v-model="formAdd.etl_sys_cd" autocomplete="off" placeholder="工程编号" disabled></el-input>
                </div>
            </el-form-item>
            <el-form-item label="作业名称" :rules="filter_rules([{required: true}])">
                <el-select v-model="formAdd.etl_job" placeholder="作业名称">
                    <el-option v-for="item in formSelect.jobName" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资源类型" :rules="filter_rules([{required: true}])">
                <el-select v-model="formAdd.resource_type" placeholder="作业名称">
                    <el-option v-for="item in formSelect.resourceType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="资源需求数" prop="resource_req" :rules="filter_rules([{required: true}])">
                <div style="width:193px">
                    <el-input v-model="formAdd.resource_req" autocomplete="off" placeholder="资源需求数"></el-input>
                </div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="saveAdd" size="mini">保存</el-button>
        </div>
    </el-dialog>
    <!-- 删除/批量删除资源模态框 -->
    <el-dialog :title="deleteTitle" :visible.sync="dialogVisibleDelete" width="40%">
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleDelete" size="mini" type="danger">否</el-button>
            <el-button type="primary" @click="saveDelete" size="mini">是</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as resourcesUsageAllFun from "./resourcesUsage";
import * as message from "@/utils/js/message";
let arr = [];
export default {
    data() {
        return {
            sys_cd: '',
            form: {
                etl_job: '',
                resource_type: '',
            },
            listDatas: [],
            tableData: [],
            resourceTitle: '',
            deleteTitle: '',
            multipleSelection: [],
            fileList: [],
            dialogFormVisibleAdd: false,
            dialogVisibleDelete: false,
            formAdd: {
                etl_sys_cd: '',
                etl_job: '',
                resource_type: '',
                resource_req: '',
            },
            formDelete: {
                etl_job: '',
            },
            formSelect: {
                jobName: [],
                resourceType: [],
            },
            pagesize: 5,
            currpage: 1,
            pageLength: 0,
        };
    },
    mounted() {
        this.getTable();
        this.getJobName();
        this.getResourceType();
    },
    methods: {
        //刷新表格
        getTable() {
            let params = {};
            this.sys_cd = sessionStorage.getItem('sys_cd');
            params["etl_sys_cd"] = this.sys_cd;
            params["etl_job"] = '';
            params["resource_type"] = '';
            params["currPage"] = this.currpage;
            params["pageSize"] = this.pagesize;
            resourcesUsageAllFun.searchEtlJobResourceRelaByPage(params).then(res => {
                this.tableData = res.data.jobResourceRelation;
                this.pageLength = res.data.totalSize;
            });
        },
        //获取作业名称下拉框数据
        getJobName() {
            let params = {};
            let arr = [];
            let obj = {};
            params["etl_sys_cd"] = this.sys_cd;
            resourcesUsageAllFun.searchEtlJob(params).then(res => {
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
        //获取资源类型下拉框数据
        getResourceType() {
            let params = {};
            let arr = [];
            let obj = {};
            params["etl_sys_cd"] = this.sys_cd;
            resourcesUsageAllFun.searchEtlResourceType(params).then(res => {
                res.data.forEach((item) => {
                    obj.label = item;
                    obj.value = item;
                    arr.push(obj);
                    obj = {};
                });
                this.formSelect.resourceType = arr;
            });
        },
        //搜索按钮
        searchBtn() {
            let params = {};
            this.sys_cd = sessionStorage.getItem('sys_cd');
            params["etl_sys_cd"] = this.sys_cd;
            params["etl_job"] = this.form.etl_job;
            params["resource_type"] = this.form.resource_type;
            params["currPage"] = this.currpage;
            params["pageSize"] = this.pagesize;
            resourcesUsageAllFun.searchEtlJobResourceRelaByPage(params).then(res => {
                this.tableData = res.data.jobResourceRelation;
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
            this.resourceTitle = '添加资源分配';
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
            this.resourceTitle = '修改资源分配';
            this.formAdd = row;
        },
        //删除按钮
        handleDelete(index, row) {
            this.dialogVisibleDelete = true;
            this.formDelete.etl_job = row.etl_job;
            this.deleteTitle = '确定删除?';
        },
        //模态框新增/修改取消按钮
        cancleAdd() {
            this.dialogFormVisibleAdd = false;
            this.formAdd = {};
        },
        beforeClosechange() {
            this.dialogFormVisibleAdd = false;
            this.formAdd = {};
        },
        //模态框新增/修改保存按钮
        saveAdd() {
            if (this.formAdd.etl_job == '' || this.formAdd.resource_type == '' || this.formAdd.resource_req == '') {
                this.$message({
                    message: '请输入完整信息',
                    type: 'warning'
                });
            } else {
                let params = {};
                params["etl_sys_cd"] = this.formAdd.etl_sys_cd;
                params["etl_job"] = this.formAdd.etl_job;
                params["resource_type"] = this.formAdd.resource_type;
                params["resource_req"] = this.formAdd.resource_req;
                if (this.resourceTitle == '添加资源分配') {
                    resourcesUsageAllFun.saveEtlJobResourceRela(params).then(res => {
                        this.getTable();
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    });
                } else if (this.resourceTitle == '修改资源分配') {
                    resourcesUsageAllFun.updateEtlJobResourceRela(params).then(res => {
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
        },
        //模态框删除/批量删除确定按钮
        saveDelete() {
            let params = {};
            params["etl_sys_cd"] = this.sys_cd;
            params["etl_job"] = this.formDelete.etl_job;
            if (this.deleteTitle == '确定删除?') {
                resourcesUsageAllFun.deleteEtlJobResourceRela(params).then(res => {
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
                    arr.push(item.etl_job);
                });
                let params = {};
                params["etl_sys_cd"] = this.sys_cd;
                params["etl_job"] = arr;
                resourcesUsageAllFun.batchDeleteEtlJobResourceRela(params).then(res => {
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
                resourcesUsageAllFun.uploadExcelFile(param).then(res => {
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
            resourcesUsageAllFun.generateExcel({
                etl_sys_cd: that.$route.query.etl_sys_cd,
                tableName: 'etl_job_resource_rela'
            }).then(res => {
                if (res && res.code == 200) {
                    that.downloadFile(res.data)
                }
            })
        },
        // 下载模板表格
        downloadFile(val) {
            resourcesUsageAllFun.downloadFile({
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
</style>
