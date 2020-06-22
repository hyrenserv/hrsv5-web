<template>
<div>
    <el-row class="elRows">
        <el-form :model="form" ref="form" class="demo-form-inline" style="height:40px;" :inline="true">
            <el-col :span="9">
                <el-form-item label="作业名称">
                    <el-autocomplete :fetch-suggestions="querySearch" size="mini" v-model="form.etl_job" clearable style="width:240px" placeholder="作业名称"></el-autocomplete>
                </el-form-item>
            </el-col>
            <el-col :span="7">
                <el-form-item label="任务名称">
                    <el-input size="mini" v-model="form.sub_sys_desc" style="width:150px" placeholder="任务名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="状态">
                    <el-select size="mini" v-model="form.job_status" placeholder="--请选择--" clearable style="width:140px">
                        <el-option v-for="item in jobStatus" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button size="mini" class="searchBtn" type="primary" @click="searchBtn">搜索
                    </el-button>
                </el-form-item>
            </el-col>

        </el-form>
    </el-row>
    <el-divider></el-divider>
    <div class="title">作业情况</div>
    <el-table size="medium" ref="multipleTable" :data="tableData" tooltip-effect="dark" stripe border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" align='center'>
        </el-table-column>
        <el-table-column prop="etl_sys_cd" show-overflow-tooltip label="工程编号" align='center'>
        </el-table-column>
        <el-table-column prop="subsysname" show-overflow-tooltip label="任务名称" align='center'>
        </el-table-column>
        <el-table-column prop="etl_job" label="作业名称" show-overflow-tooltip align='center' width="150">
            <template slot-scope="scope">
                <el-button size="mini" type="text" @click="jobBtn(scope.$index, scope.row)">
                    {{scope.row.etl_job}}
                </el-button>
            </template>
        </el-table-column>
        <el-table-column prop="curr_bath_date" label="批量日期" align='center' show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="status" label="状态" align='center' show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="relyJob" label="依赖作业" align='center' width="100">
            <template slot-scope="scope">
                <el-button size="mini" type="text" @click="relyBtn(scope.$index, scope.row)">
                    {{scope.row.relyJob}}
                </el-button>
            </template>
        </el-table-column>
        <el-table-column prop="configure" label="配置" align='center' width="100">
            <template slot-scope="scope">
                <i class="el-icon-setting handeler" title="配置" @click="setting(scope.$index, scope.row)"></i>
            </template>
        </el-table-column>
        <el-table-column label="操作" align='center' width="150">
            <template slot-scope="scope">
                <i class="el-icon-circle-close handeler ls" title="停止" @click="handleStop(scope.$index, scope.row)"></i>
                <i class="el-icon-finished handeler ls" title="跳过" @click="handlePass(scope.$index, scope.row)"></i>
                <i class="el-icon-refresh handeler ls" title="重跑" @click="handleRefresh(scope.$index, scope.row)"></i>
                <i class="el-icon-right handeler ls" title="强制执行" @click="handleForce(scope.$index, scope.row)"></i>
                <i class="el-icon-sort handeler ls" title="临时调整优先级" @click="handleAdjust(scope.$index, scope.row)"></i>
            </template>
        </el-table-column>
    </el-table>
    <el-row :gutter="20" class="tabBtns">
        <el-col :span="8">
            <el-button size="mini" type="danger" @click="handleBatchIntervene">批量干预
            </el-button>
        </el-col>
        <el-pagination layout="total, sizes,prev, pager, next, jumper" style="float:right" :page-sizes="[5, 10, 15, 20]"  :page-size="pagesize1" :total="pageLength1" @current-change="handleCurrentChange1" @size-change="handleSizeChange1">
        </el-pagination>
    </el-row>
    <el-divider></el-divider>
    <div class="title">当前干预情况</div>
    <el-table size="medium" ref="multipleTable" :data="tableData1" tooltip-effect="dark" stripe border style="width: 100%">
        <el-table-column prop="event_id" label="事件号" align='center' width="160">
        </el-table-column>
        <el-table-column prop="subsysname" show-overflow-tooltip label="任务名称" align='center'>
        </el-table-column>
        <el-table-column prop="etl_job" show-overflow-tooltip label="作业名称" align='center'>
        </el-table-column>
        <el-table-column prop="types" label="干预类型" align='center' show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="pro_para" show-overflow-tooltip label="作业程序参数" align='center'>
        </el-table-column>
        <el-table-column prop="status" label="状态" align='center' show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="st_time" label="接收时间" align='center' show-overflow-tooltip width="160">
        </el-table-column>
        <el-table-column prop="warning" show-overflow-tooltip label="提示信息" align='center' width="80">
        </el-table-column>
    </el-table>
    <el-row :gutter="20" class="tabBtns">
        <el-pagination layout="total, sizes,prev, pager, next, jumper" style="float:right" :page-sizes="[5, 10, 15, 20]"  :page-size="pagesize2" :total="pageLength2" @current-change="handleCurrentChange2" @size-change="handleSizeChange2">
        </el-pagination>
    </el-row>
    <el-divider></el-divider>
    <div class="title">历史干预情况</div>
    <el-table size="medium" ref="multipleTable" :data="tableData2" tooltip-effect="dark" stripe border style="width: 100%">
        <el-table-column prop="event_id" label="事件号" align='center' width="160">
        </el-table-column>
        <el-table-column prop="subsysname" show-overflow-tooltip label="任务名称" align='center'>
        </el-table-column>
        <el-table-column prop="etl_job" show-overflow-tooltip label="作业名称" align='center'>
        </el-table-column>
        <el-table-column prop="types" show-overflow-tooltip label="干预类型" align='center'>
        </el-table-column>
        <el-table-column prop="pro_para" show-overflow-tooltip label="作业程序参数" align='center'>
        </el-table-column>
        <el-table-column prop="status" show-overflow-tooltip label="状态" align='center'>
        </el-table-column>
        <el-table-column prop="st_time" show-overflow-tooltip label="接收时间" align='center' width="160">
        </el-table-column>
    </el-table>
    <el-row :gutter="20" class="tabBtns">
        <el-pagination layout="total, sizes,prev, pager, next, jumper" style="float:right" :page-sizes="[5, 10, 15, 20]"  :page-size="pagesize3" :total="pageLength3" @current-change="handleCurrentChange3" @size-change="handleSizeChange3">
        </el-pagination>
    </el-row>
    <!-- 停止模态框 -->
    <el-dialog :title="stopTitle" :visible.sync="dialogVisibleStop" width="20%">
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleStop = false" size="mini" type="danger">否</el-button>
            <el-button type="primary" @click="saveStop" size="mini">是</el-button>
        </div>
    </el-dialog>
    <!-- 跳过模态框 -->
    <el-dialog :title="dropTitle" :visible.sync="dialogVisiblePass" width="20%">
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisiblePass = false" size="mini" type="danger">否</el-button>
            <el-button type="primary" @click="savePass" size="mini">是</el-button>
        </div>
    </el-dialog>
    <!-- 重跑模态框 -->
    <el-dialog :title="refTitle" :visible.sync="dialogVisibleRefresh" width="20%">
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleRefresh = false" size="mini" type="danger">否</el-button>
            <el-button type="primary" @click="saveRefresh" size="mini">是</el-button>
        </div>
    </el-dialog>
    <!-- 强制执行模态框 -->
    <el-dialog :title="forceTitle" :visible.sync="dialogVisibleForce" width="20%">
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleForce = false" size="mini" type="danger">否</el-button>
            <el-button type="primary" @click="saveForce" size="mini">是</el-button>
        </div>
    </el-dialog>
    <!-- 调整优先级模态框 -->
    <el-dialog :title="adjustTitle" :visible.sync="dialogVisibleAdjust" width="30%">
        <el-form :model="formAdjust" ref="formAdjust" class="demo-ruleForm" label-width="80px">
            <el-form-item label="当前等级" prop="currentLevel">
                <el-input v-model="formAdjust.currentLevel" autocomplete="off" placeholder="优先级"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleAdjust = false" size="mini" type="danger">否</el-button>
            <el-button type="primary" @click="saveAdjust" size="mini">是</el-button>
        </div>
    </el-dialog>
    <!-- 批量干预模态框 -->
    <el-dialog title="批量干预" :visible.sync="dialogVisiblebatchInter" width="40%">
        <div class="dialogDiv">
            <el-button class="btns" type="primary" @click="handleStop1" size="mini">停止</el-button>
            <el-button class="btns" type="primary" @click="handlePass1" size="mini">跳过</el-button>
            <el-button class="btns" type="primary" @click="handleRefresh1" size="mini">重跑</el-button>
            <el-button class="btns" type="primary" @click="handleForce1" size="mini">强制执行</el-button>
            <el-button class="btns" type="primary" @click="handleAdjust1" size="mini">调整优先级</el-button>
        </div>

    </el-dialog>
</div>
</template>

<script>
import * as jobLevelInterventeAllFun from "./jobLevelIntervente";
import * as fixedAll from "@/utils/js/fileOperations";
export default {
    data() {
        return {
            sys_cd: '',
            codes: [],
            form: {
                etl_job: '',
                sub_sys_desc: '',
                job_status: '',
            },
            tempForm: {
                etl_sys_cd: '',
                etl_job: '',
                curr_bath_date: '',
            },
            stopTitle: '',
            dropTitle: '',
            refTitle: '',
            forceTitle: '',
            adjustTitle: '',
            jobStatus: [],
            tableData: [],
            tableData1: [],
            tableData2: [],
            listDatas: [],
            formAdjust: {
                currentLevel: '',
            },
            multipleSelection: [],
            fileList: [],
            dialogVisibleStop: false,
            dialogVisiblePass: false,
            dialogVisibleRefresh: false,
            dialogVisibleForce: false,
            dialogVisibleAdjust: false,
            dialogVisiblebatchInter: false,
            pagesize1: 5,
            currpage1: 1,
            pageLength1: 0,
            pagesize2: 5,
            currpage2: 1,
            pageLength2: 0,
            pagesize3: 5,
            currpage3: 1,
            pageLength3: 0,
            meddletype: [],
            jobStatued: [],
            jobStatused: []
        };
    },
    mounted() {
        this.getCodeItems("Meddle_type");
        this.getCodeItems("Job_Status");
        this.getCodeItems("Status");
        this.goBack();
        this.getSelectValue();
        this.getJobInfo();
        this.getCurrInfo();
        this.getHistoryInfo();
        this.getCode();
        this.getJobName();

    },
    methods: {
        //从监控当前作业回来
        goBack() {
            if (this.$route.query.etl_sys_cd && this.$route.query.etl_job) {
                this.form.etl_job = this.$route.query.etl_job;
            }
        },
        getCodeItems(val) {
            if (val == "Meddle_type") {
                jobLevelInterventeAllFun.getCategoryItems({
                    category: 'Meddle_type'
                }).then(res => {
                    this.meddletype = res.data;
                })
            } else if (val == "Status") {
                jobLevelInterventeAllFun.getCategoryItems({
                    category: 'Status'
                }).then(res => {
                    this.jobStatused = res.data;
                })
            } else if (val == "Job_Status") {
                jobLevelInterventeAllFun.getCategoryItems({
                    category: 'Job_Status'
                }).then(res => {
                    this.jobStatued = res.data;
                })
            }
        },
        //操作按钮的代码值
        getCode() {
            let params = {};
            let arr = [];
            params["category"] = "Meddle_type";
            jobLevelInterventeAllFun.getCategoryItems(params).then(res => {
                this.codes = res.data;
            });
        },
        //获取状态下拉框数据
        getSelectValue() {
            let params = {};
            let arr = [];
            params["category"] = "Job_Status";
            jobLevelInterventeAllFun.getCategoryItems(params).then(res => {
                arr = res.data;
                arr.forEach((item) => {
                    item.label = item.value;
                    item.value = item.code;
                });
                this.jobStatus = arr;
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
        //获取作业名称/上游作业名称下拉框数据
        getJobName() {
            let params = {};
            let arr = [];
            let obj = {};
            params["etl_sys_cd"] = this.sys_cd;
            jobLevelInterventeAllFun.searchEtlJob(params).then(res => {
                res.data.forEach((item) => {
                    obj.label = item;
                    obj.value = item;
                    arr.push(obj);
                    obj = {};
                });
                this.listDatas = arr;
            });
        },
        //获取作业情况数据
        getJobInfo() {
            let params = {};
            this.sys_cd = sessionStorage.getItem('sys_cd');
            params["etl_sys_cd"] = this.sys_cd;
            params["etl_job"] = this.form.etl_job;
            params["sub_sys_desc"] = '';
            params["job_status"] = '';
            params["currPage"] = this.currpage1;
            params["pageSize"] = this.pagesize1;
            jobLevelInterventeAllFun.searchJobLevelIntervention(params).then(res => {
                this.pageLength1 = res.data.totalSize;
                let dates = res.data.etlJobInfoList;
                dates.forEach((item) => {
                    item.relyJob = '依赖作业';
                    //状态
                    this.jobStatued.forEach(value => {
                        if (item.job_disp_status == value.code) {
                            item.status = value.value
                        }
                    });
                    item.curr_bath_date = fixedAll.dateFormat(item.curr_bath_date);
                });
                this.tableData = dates;
            });
        },
        //获取当前干预情况数据
        getCurrInfo() {
            let params = {};
            params["etl_sys_cd"] = this.sys_cd;
            params["currPage"] = this.currpage2;
            params["pageSize"] = this.pagesize2;
            jobLevelInterventeAllFun.searchJobLevelCurrInterventionByPage(params).then(res => {
                this.pageLength2 = res.data.totalSize;
                let dates = res.data.currInterventionList;
                dates.forEach((item) => {
                    //干预类型
                    this.meddletype.forEach(val => {
                        if (item.etl_hand_type == val.code) {
                            item.types = val.value
                        }
                    });
                    //状态
                    this.jobStatused.forEach(value => {
                        if (item.hand_status == value.code) {
                            item.status = value.value
                        }
                    })
                });
                this.tableData1 = dates;
            });
        },
        //获取历史干预情况数据
        getHistoryInfo() {
            let params = {};
            params["etl_sys_cd"] = this.sys_cd;
            params["currPage"] = this.currpage3;
            params["pageSize"] = this.pagesize3;
            jobLevelInterventeAllFun.searchJobLeverHisInterventionByPage(params).then(res => {
                this.pageLength3 = res.data.totalSize;
                let dates = res.data.handHisList;
                dates.forEach((item) => {
                    //干预类型
                    this.meddletype.forEach(val => {
                        if (item.etl_hand_type == val.code) {
                            item.types = val.value
                        }
                    });
                    //状态
                    this.jobStatued.forEach(value => {
                        if (item.hand_status == value.code) {
                            item.status = value.value
                        }
                    })
                });
                this.tableData2 = dates
            });
        },
        //选中的数据
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //搜索按钮
        searchBtn() {
            let params = {};
            params["etl_sys_cd"] = this.sys_cd;
            params["etl_job"] = this.form.etl_job;
            params["sub_sys_desc"] = this.form.sub_sys_desc;
            params["job_status"] = this.form.job_status;
            params["currPage"] = this.currpage1;
            params["pageSize"] = this.pagesize1;
            jobLevelInterventeAllFun.searchJobLevelIntervention(params).then(res => {
                this.pageLength1 = res.data.totalSize;
                let dates = res.data.etlJobInfoList;
                dates.forEach((item) => {
                    item.relyJob = '依赖作业';
                    //状态
                    this.jobStatued.forEach(value => {
                        if (item.job_disp_status == value.code) {
                            item.status = value.value
                        }
                    })
                    item.curr_bath_date = fixedAll.dateFormat(item.curr_bath_date);
                });
                this.tableData = dates;
            });
        },
        //每个单独模态框
        //停止按钮
        handleStop(index, row) {
            this.dialogVisibleStop = true;
            this.stopTitle = '确定执行停止操作?';
            this.tempForm.etl_sys_cd = row.etl_sys_cd;
            this.tempForm.etl_job = row.etl_job;
            this.tempForm.curr_bath_date = row.curr_bath_date;
        },
        //跳过按钮
        handlePass(index, row) {
            this.dialogVisiblePass = true;
            this.dropTitle = '确定执行跳过操作?';
            this.tempForm.etl_sys_cd = row.etl_sys_cd;
            this.tempForm.etl_job = row.etl_job;
            this.tempForm.curr_bath_date = row.curr_bath_date;
        },
        //重跑按钮
        handleRefresh(index, row) {
            this.dialogVisibleRefresh = true;
            this.refTitle = '确定执行重跑操作?';
            this.tempForm.etl_sys_cd = row.etl_sys_cd;
            this.tempForm.etl_job = row.etl_job;
            this.tempForm.curr_bath_date = row.curr_bath_date;
        },
        //强制执行按钮
        handleForce(index, row) {
            this.dialogVisibleForce = true;
            this.forceTitle = '确定执行强制操作?';
            this.tempForm.etl_sys_cd = row.etl_sys_cd;
            this.tempForm.etl_job = row.etl_job;
            this.tempForm.curr_bath_date = row.curr_bath_date;
        },
        //调整优先级按钮
        handleAdjust(index, row) {
            this.dialogVisibleAdjust = true;
            this.adjustTitle = '确定执行临时调整优先级操作?';
            this.tempForm.etl_sys_cd = row.etl_sys_cd;
            this.tempForm.etl_job = row.etl_job;
            this.tempForm.curr_bath_date = row.curr_bath_date;
        },

        //批量干预按钮
        handleBatchIntervene() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: '请选择干预的作业',
                    type: 'warning'
                });
            } else {
                this.dialogVisiblebatchInter = true;
            }
        },
        //批量模态框
        //停止按钮1
        handleStop1(index, row) {
            this.dialogVisiblebatchInter = false;
            this.dialogVisibleStop = true;
            this.stopTitle = '确定批量执行停止操作?';
        },
        //跳过按钮1
        handlePass1(index, row) {
            this.dialogVisiblebatchInter = false;
            this.dialogVisiblePass = true;
            this.dropTitle = '确定批量执行跳过操作?';
        },
        //重跑按钮1
        handleRefresh1(index, row) {
            this.dialogVisiblebatchInter = false;
            this.dialogVisibleRefresh = true;
            this.refTitle = '确定批量执行重跑操作?';
        },
        //强制执行按钮1
        handleForce1(index, row) {
            this.dialogVisiblebatchInter = false;
            this.dialogVisibleForce = true;
            this.forceTitle = '确定批量执行强制操作?';
        },
        //调整优先级按钮1
        handleAdjust1(index, row) {
            this.dialogVisiblebatchInter = false;
            this.dialogVisibleAdjust = true;
            this.adjustTitle = '确定批量执行临时调整优先级操作?';
        },

        //停止保存按钮
        saveStop() {
            if (this.stopTitle == '确定批量执行停止操作?') {
                let arr = [];
                this.multipleSelection.forEach((item) => {
                    let obj = {};
                    obj.etl_job = item.etl_job;
                    obj.etl_sys_cd = item.etl_sys_cd;
                    obj.etl_hand_type = 'JS';
                    obj.curr_bath_date = item.curr_bath_date.replace(/-/g, "");
                    arr.push(obj);
                });
                arr = JSON.stringify(arr);
                let params = {};
                params["job_priority"] = 0;
                params["jobHandBeans"] = arr;
                jobLevelInterventeAllFun.batchJobLevelInterventionOperate(params).then(res => {
                    if (res && res.success) {
                        this.getJobInfo();
                        this.getCurrInfo();
                        this.getHistoryInfo();
                        this.$message({
                            message: '批量作业停止成功！',
                            type: 'success'
                        });
                        this.tempForm = {};
                        this.multipleSelection = [];
                        this.dialogVisibleStop = false;
                    }
                });
            } else {
                let code = 'JS';
                let params = {};
                params["etl_sys_cd"] = this.tempForm.etl_sys_cd;
                params["etl_job"] = this.tempForm.etl_job;
                params["etl_hand_type"] = code;
                params["curr_bath_date"] = this.tempForm.curr_bath_date;
                params["job_priority"] = 0;
                jobLevelInterventeAllFun.jobLevelInterventionOperate(params).then(res => {
                    if (res && res.success) {
                        this.getJobInfo();
                        this.getCurrInfo();
                        this.getHistoryInfo();
                        this.$message({
                            message: '作业停止成功！',
                            type: 'success'
                        });
                        this.tempForm = {};
                        this.multipleSelection = [];
                        this.dialogVisibleStop = false;
                    }
                });
            }

        },
        //跳过保存按钮
        savePass() {
            if (this.dropTitle == '确定批量执行跳过操作?') {
                let arr = [];
                this.multipleSelection.forEach((item) => {
                    let obj = {};
                    obj.etl_sys_cd = item.etl_sys_cd;
                    obj.etl_hand_type = 'JJ';
                    obj.etl_job = item.etl_job;
                    obj.curr_bath_date = item.curr_bath_date.replace(/-/g, "");
                    arr.push(obj);
                });
                arr = JSON.stringify(arr);
                let params = {};
                params["job_priority"] = 0;
                params["jobHandBeans"] = arr;
                jobLevelInterventeAllFun.batchJobLevelInterventionOperate(params).then(res => {
                    if (res && res.success) {
                        this.getJobInfo();
                        this.getCurrInfo();
                        this.getHistoryInfo();
                        this.$message({
                            message: '批量作业跳过成功！',
                            type: 'success'
                        });
                        this.tempForm = {};
                        this.multipleSelection = [];
                        this.dialogVisiblePass = false;
                    }
                });
            } else {
                let code = 'JJ';
                let params = {};
                params["etl_sys_cd"] = this.tempForm.etl_sys_cd;
                params["etl_job"] = this.tempForm.etl_job;
                params["etl_hand_type"] = code;
                params["curr_bath_date"] = this.tempForm.curr_bath_date;
                params["job_priority"] = 0;
                jobLevelInterventeAllFun.jobLevelInterventionOperate(params).then(res => {
                    if (res && res.success) {
                        this.getJobInfo();
                        this.getCurrInfo();
                        this.getHistoryInfo();
                        this.$message({
                            message: '作业跳过成功！',
                            type: 'success'
                        });
                        this.tempForm = {};
                        this.multipleSelection = [];
                        this.dialogVisiblePass = false;
                    }
                });
            }

        },
        //重跑保存按钮
        saveRefresh() {
            if (this.refTitle == '确定批量执行重跑操作?') {
                let arr = [];
                this.multipleSelection.forEach((item) => {
                    let obj = {};
                    obj.etl_sys_cd = item.etl_sys_cd;
                    obj.etl_hand_type = 'JR';
                    obj.etl_job = item.etl_job;
                    obj.curr_bath_date = item.curr_bath_date.replace(/-/g, "");
                    arr.push(obj);
                });
                arr = JSON.stringify(arr);
                let params = {};
                params["job_priority"] = 0;
                params["jobHandBeans"] = arr;
                jobLevelInterventeAllFun.batchJobLevelInterventionOperate(params).then(res => {
                    if (res && res.success) {
                        this.getJobInfo();
                        this.getCurrInfo();
                        this.getHistoryInfo();
                        this.$message({
                            message: '批量作业重跑成功！',
                            type: 'success'
                        });
                        this.tempForm = {};
                        this.multipleSelection = [];
                        this.dialogVisibleRefresh = false;
                    }
                });
            } else {
                let code = 'JR';
                let params = {};
                params["etl_sys_cd"] = this.tempForm.etl_sys_cd;
                params["etl_job"] = this.tempForm.etl_job;
                params["etl_hand_type"] = code;
                params["curr_bath_date"] = this.tempForm.curr_bath_date;
                params["job_priority"] = 0;
                jobLevelInterventeAllFun.jobLevelInterventionOperate(params).then(res => {
                    if (res && res.success) {
                        this.getJobInfo();
                        this.getCurrInfo();
                        this.getHistoryInfo();
                        this.$message({
                            message: '作业重跑成功！',
                            type: 'success'
                        });
                    }
                    this.tempForm = {};
                    this.multipleSelection = [];
                    this.dialogVisibleRefresh = false;
                });
            }

        },
        //强制执行保存按钮
        saveForce() {
            if (this.forceTitle == '确定批量执行强制操作?') {
                let arr = [];
                this.multipleSelection.forEach((item) => {
                    let obj = {};
                    obj.etl_sys_cd = item.etl_sys_cd;
                    obj.etl_hand_type = 'JT';
                    obj.etl_job = item.etl_job;
                    obj.curr_bath_date = item.curr_bath_date.replace(/-/g, "");
                    arr.push(obj);
                });
                arr = JSON.stringify(arr);
                let params = {};
                params["job_priority"] = 0;
                params["jobHandBeans"] = arr;
                jobLevelInterventeAllFun.batchJobLevelInterventionOperate(params).then(res => {
                    if (res && res.success) {
                        this.getJobInfo();
                        this.getCurrInfo();
                        this.getHistoryInfo();
                        this.$message({
                            message: '批量作业直接跑成功！',
                            type: 'success'
                        });
                        this.tempForm = {};
                        this.multipleSelection = [];
                        this.dialogVisibleForce = false;
                    }
                });
            } else {
                let code = 'JT';
                let params = {};
                params["etl_sys_cd"] = this.tempForm.etl_sys_cd;
                params["etl_job"] = this.tempForm.etl_job;
                params["etl_hand_type"] = code;
                params["curr_bath_date"] = this.tempForm.curr_bath_date;
                params["job_priority"] = 0;
                jobLevelInterventeAllFun.jobLevelInterventionOperate(params).then(res => {
                    if (res && res.success) {
                        this.getJobInfo();
                        this.getCurrInfo();
                        this.getHistoryInfo();
                        this.$message({
                            message: '作业直接跑成功！',
                            type: 'success'
                        });
                        this.tempForm = {};
                        this.multipleSelection = [];
                        this.dialogVisibleForce = false;
                    }
                });
            }
        },
        //调整优先级保存按钮
        saveAdjust() {
            if (this.adjustTitle == '确定批量执行临时调整优先级操作?') {
                let arr = [];
                this.multipleSelection.forEach((item) => {
                    let obj = {};
                    obj.etl_sys_cd = item.etl_sys_cd;
                    obj.etl_job = item.etl_job;
                    obj.etl_hand_type = 'JP';
                    obj.curr_bath_date = item.curr_bath_date.replace(/-/g, "");
                    arr.push(obj);
                });
                arr = JSON.stringify(arr);
                let params = {};
                params["job_priority"] = this.formAdjust.currentLevel;
                params["jobHandBeans"] = arr;
                jobLevelInterventeAllFun.batchJobLevelInterventionOperate(params).then(res => {
                    if (res && res.success) {
                        this.getJobInfo();
                        this.getCurrInfo();
                        this.getHistoryInfo();
                        this.$message({
                            message: '批量作业临时调整优先级成功！',
                            type: 'success'
                        });
                        this.tempForm = {};
                        this.formAdjust = {};
                        this.multipleSelection = [];
                        this.dialogVisibleAdjust = false;
                    }

                });
            } else {
                let code = 'JP';
                let params = {};
                params["etl_sys_cd"] = this.tempForm.etl_sys_cd;
                params["etl_job"] = this.tempForm.etl_job;
                params["etl_hand_type"] = code;
                params["curr_bath_date"] = this.tempForm.curr_bath_date;
                params["job_priority"] = this.formAdjust.currentLevel;
                jobLevelInterventeAllFun.jobLevelInterventionOperate(params).then(res => {
                    if (res && res.success) {
                        this.getJobInfo();
                        this.getCurrInfo();
                        this.getHistoryInfo();
                        this.$message({
                            message: '作业临时调整优先级成功！',
                            type: 'success'
                        });
                        this.tempForm = {};
                        this.formAdjust = {};
                        this.multipleSelection = [];
                        this.dialogVisibleAdjust = false;
                    }
                });
            }
        },
        //分页方法1
        handleCurrentChange1(cpage) {
            this.currpage1 = cpage;
            this.getJobInfo();
        },
        handleSizeChange1(psize) {
            this.pagesize1 = psize;
            this.getJobInfo();
        },
        //分页方法2
        handleCurrentChange2(cpage) {
            this.currpage2 = cpage;
            this.getCurrInfo();
        },
        handleSizeChange2(psize) {
            this.pagesize2 = psize;
            this.getCurrInfo();
        },
        //分页方法3
        handleCurrentChange3(cpage) {
            this.currpage3 = cpage;
            this.getHistoryInfo();
        },
        handleSizeChange3(psize) {
            this.pagesize3 = psize;
            this.getHistoryInfo();
        },
        //点击作业名称跳转
        jobBtn(index, row) {
            this.$router.push({
                path: '/currentJob',
                query: {
                    etl_sys_cd: row.etl_sys_cd,
                    etl_job: row.etl_job,
                    name: '/currentJob',
                    dec: this.$Base64.encode('当前作业')
                }
            });
            this.$emit('viewIn', '/currentJob', '当前作业');
        },
        //点击依赖作业跳转
        relyBtn(index, row) {
            this.$router.push({
                path: '/relyJob',
                query: {
                    etl_sys_cd: row.etl_sys_cd,
                    etl_job: row.etl_job,
                    name: '/relyJob',
                    dec: this.$Base64.encode('依赖作业')
                }
            });
            this.$emit('viewIn', '/relyJob', '依赖作业');
        },
        //配置按钮
        setting(index, row) {
            this.$emit('viewIn', '/etlJobDef', '作业');
            this.$router.push({
                path: '/etlJobDef',
                query: {
                    etl_sys_cd: row.etl_sys_cd,
                    etl_job: row.etl_job,
                    name: '/etlJobDef',
                    dec: this.$Base64.encode('作业')
                }
            });
        },
    },
};
</script>

<style scoped>
.lines {
    margin-top: -5px;
}

.title {
    font-size: 16px;
    margin-bottom: 10px;
}

.titles {
    font-size: 16px;
    margin-top: 15px;
    margin-bottom: 10px;
}

.ls {
    margin-right: 6px;
}

.tabBtns {
    margin-top: 15px;
}

.elRows {
    height: 32px;
}

.btns {
    margin-right: 10px;
}

.searchBtn {
    margin-left: 10px;
}

.dialogDiv {
    text-align: center;
}

.handeler {
    cursor: pointer;
}
</style><style>
.el-autocomplete-suggestion li {
    overflow: visible;
    /* text-overflow: ellipsis; */
}
</style>
