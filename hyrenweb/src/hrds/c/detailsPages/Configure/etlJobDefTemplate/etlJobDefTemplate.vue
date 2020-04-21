<template>
<div>
    <el-row>
        <template v-for="(item, index) in templateData">
            <el-button size="small" type="primary" :key="index" @click="filesBtn(item,index)">{{item.etl_temp_type}}
            </el-button>
        </template>
    </el-row>
    <!-- 点击上传时模态框 -->
    <el-dialog title="作业程序参数" :visible.sync="dialogFormVisibleUpload" width="45%">
        <el-form :model="formUpload" ref="formUpload" class="demo-ruleForm" label-width="150px">
            <el-form-item label="任务编号" :rules="filter_rules([{required: true}])">
                <el-select v-model="formUpload.sub_sys_cd" placeholder="数据库调度(i)" clearable>
                    <el-option v-for="item in uploadSelect.project_no" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="作业名称" prop="etl_job" :rules="filter_rules([{required: true}])">
                <div style="width:193px">
                    <el-input v-model="formUpload.etl_job" autocomplete="off" placeholder="作业名称"></el-input>
                </div>
            </el-form-item>
            <template v-for="(item, index) in paramData">
                <el-form-item v-if="item.etl_para_type == 'text'" :label="item.etl_job_pro_para" :key="index" :prop="item.value" :rules="filter_rules([{required: true}])">
                    <div style="width:193px">
                        <el-input v-model="item.value" autocomplete="off" :placeholder="'请输入'+item.etl_job_pro_para"></el-input>
                    </div>
                </el-form-item>
                <el-form-item v-if="item.etl_para_type == 'radio'" :label="item.etl_job_pro_para" :key="index" :prop="item.value" :rules="filter_rules([{required: true}])">
                    <el-radio-group v-model="item.value">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </template>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleUpload" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="saveUpload" size="mini">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as etlJobDefTemplateAllFun from "./etlJobDefTemplate";
export default {
    data() {
        return {
            sys_cd: '',
            dialogFormVisibleUpload: false,
            formUpload: {
                sub_sys_cd: '',
                etl_job: '',
            },
            uploadSelect: {
                project_no: [],
            },
            templateData: [],
            paramData: [],
        };
    },
    mounted() {
        this.getSelect();
        this.getInfo();
    },
    methods: {
        //获取该工程下所有作业模板信息
        getInfo() {
            let params = {};
            etlJobDefTemplateAllFun.searchEtlJobTemplate(params).then(res => {
                this.templateData = res.data;
            });
        },
        //文件按钮
        filesBtn(item, index) {
            let params = {};
            params["etl_temp_id"] = item.etl_temp_id;
            etlJobDefTemplateAllFun.searchEtlJobTempAndParam(params).then(res => {
                this.paramData = res.data;
            });
            this.dialogFormVisibleUpload = true;
        },
        //任务编号下拉框数据
        getSelect() {
            let params = {};
            let arr = [];
            this.sys_cd = sessionStorage.getItem('sys_cd');
            params["etl_sys_cd"] = this.sys_cd;
            etlJobDefTemplateAllFun.searchEtlSubSys(params).then(res => {
                arr = res.data;
                arr.forEach((item) => {
                    item.label = item.sub_sys_desc + '(' + item.sub_sys_cd + ')';
                    item.value = item.sub_sys_cd;
                });
                this.uploadSelect.project_no = arr;
            });
        },
        //模态框取消按钮
        cancleUpload() {
            this.formUpload = {};
            this.dialogFormVisibleUpload = false;
        },
        //模态框保存按钮
        saveUpload() {
            let arr = [];
            let id = '';
            this.paramData.forEach((item) => {
                arr.push(item.value);
                id = item.etl_temp_id;
            });
            let params = {};
            params["etl_sys_cd"] = this.sys_cd;
            params["sub_sys_cd"] = this.formUpload.sub_sys_cd;
            params["etl_job"] = this.formUpload.etl_job;
            params["etl_temp_id"] = id;
            params["etl_job_temp_para"] = arr;
            etlJobDefTemplateAllFun.saveEtlJobTemp(params).then(res => {
                if (res && res.success) {
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    this.formUpload = {};
                    this.dialogFormVisibleUpload = false;
                }
            })
        },
    },
};
</script>

<style scoped>
</style>
