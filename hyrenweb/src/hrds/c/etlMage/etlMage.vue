<template>
<div class="loindex">
    <el-row class="elRows">
        <span>工程管理</span>
        <el-button type="primary" class="el1 els" @click="addProject" size="small">
            <i class="block_icon fa fa-plus-circle"></i>添加工程
        </el-button>
        <div class="lines"></div>
    </el-row>
    <el-tabs class="tabes" v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="工程信息" name="first">
            <el-table size="medium" :data="tableData" border stripe style="width: 100%">
                <el-table-column type="index" label="序号" width="70px" align='center'>
                </el-table-column>
                <el-table-column prop="etl_sys_cd" show-overflow-tooltip label="工程编号" align='center'>
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="details(scope.$index, scope.row)">
                            {{scope.row.etl_sys_cd}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="etl_sys_name" show-overflow-tooltip label="工程名称" align='center'>
                </el-table-column>
                <el-table-column prop="comments" show-overflow-tooltip label="工程描述" align='center'>
                </el-table-column>
                <el-table-column prop="curr_bath_date" show-overflow-tooltip label="当前批量日期" align='center'>
                </el-table-column>
                <el-table-column label="CONTROL" align='center'>
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="handleStartco(scope.$index, scope.row)">启动
                        </el-button>
                        <el-button size="mini" type="text" @click="handleRecordco(scope.$index, scope.row)">日志信息
                        </el-button>

                    </template>
                </el-table-column>
                <el-table-column label="TRIGGER" align='center'>
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="handleStarttr(scope.$index, scope.row)">启动
                        </el-button>
                        <el-button size="mini" type="text" @click="handleRecordtr(scope.$index, scope.row)">日志信息
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align='center' width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button size="mini" type="text" @click="handleDeploy(scope.$index, scope.row)">部署
                        </el-button>
                        <el-button size="mini" class="endAgent" type="text" @click="deleteWork(scope.row)">删除
                        </el-button>
                        <el-button size="mini" class="endAgent" v-if="scope.row.sys_run_status != 'S'" type="text" @click="stopWork(scope.$index, scope.row)">停止
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
        </el-tab-pane>
        <el-tab-pane label="调度监控" name="second">
            <draggable v-model="listdata">
                <el-col :span=12 v-for="(item) in listdata" :key="item.etl_sys_cd">
                    <div class="movePlace">
                        <span class="pDrag"> <span> {{item.sys_name}} --拖动可排列顺序</span>
                            <span>
                                <el-tooltip class="items" effect="dark" content="点击可放大查看详情" placement="bottom">
                                    <i @click="fullScreen(item)" class="el-icon-full-screen"></i>
                                </el-tooltip>
                            </span>
                        </span>
                        <p class="span10" @click="routerLink(item)">批量运行状态</p>
                        <p class="span11">批量日期：{{item.bathdate}}</p>
                        <p :id="`radar${item.etl_sys_cd}`" :key="item.etl_sys_cd" :style="{ height: '300px'}"></p>
                    </div>
                </el-col>
            </draggable>
        </el-tab-pane>
    </el-tabs>
    <!-- 添加/编辑工程模态框 -->
    <el-dialog :title="projectTitle" :visible.sync="dialogFormVisibleAdd" width="40%" :before-close="beforeClose">
        <el-form :model="formAdd" ref="formAdd" class="demo-ruleForm" label-width="150px">
            <el-form-item label="工程编号" prop="etl_sys_cd" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.etl_sys_cd" :readonly="disableds" style="width:270px" autocomplete="off" placeholder="工程编号"></el-input>
            </el-form-item>
            <el-form-item label="工程名称" prop="etl_sys_name" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.etl_sys_name" style="width:270px" autocomplete="off" placeholder="工程名称"></el-input>
            </el-form-item>
            <el-form-item label="工程描述" prop="comments">
                <el-input type="textarea" v-model="formAdd.comments" style="width:270px" autocomplete="off" placeholder="工程描述"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="add('formAdd')" size="mini">保存</el-button>
        </div>
    </el-dialog>
    <!-- 部署Agent工程模态框 -->
    <el-dialog title="部署Agent工程参数" :visible.sync="dialogFormVisibleDeploy" width="40%">
        <el-form :model="formDeploy" ref="formDeploy" label-width="170px" class="demo-ruleForm">
            <el-form-item label="工程编号" prop="etl_sys_cd" :rules="filter_rules([{required: true}])">
                <el-input v-model="formDeploy.etl_sys_cd" style="width:270px" disabled></el-input>
            </el-form-item>
            <el-form-item label="Agent服务器IP" prop="etl_serv_ip" :rules="filter_rules([{required: true}])">
                <el-input v-model="formDeploy.etl_serv_ip" style="width:270px"></el-input>
            </el-form-item>
            <el-form-item label="Agent服务器用户名" prop="user_name" :rules="filter_rules([{required: true}])">
                <el-input v-model="formDeploy.user_name" style="width:270px"></el-input>
            </el-form-item>
            <el-form-item label="Agent服务器密码" prop="user_pwd" :rules="filter_rules([{required: true}])">
                <el-input v-model="formDeploy.user_pwd" style="width:270px" show-password></el-input>
            </el-form-item>
            <el-form-item label="Agent服务器部署路径" prop="serv_file_path" :rules="filter_rules([{required: true}])">
                <el-input v-model="formDeploy.serv_file_path" style="width:270px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleDeploy" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="saveDeploy('formDeploy')" :loading="isLoadings" size="mini">部署</el-button>
        </div>
    </el-dialog>
    <!-- 启动CONTROL模态框 -->
    <el-dialog title="启动CONTROL配置参数" :visible.sync="dialogFormVisibleStartCON" width="35%" :before-close="cancleCON">
        <el-form :model="formStartCON" ref="formStartCON" class="demo-ruleForm" label-width="150px">
            <el-form-item label="工程编号" prop="etl_sys_cd" :rules="filter_rules([{required: true}])">
                <div style="width:220px">
                    <el-input v-model="formStartCON.etl_sys_cd" disabled></el-input>
                </div>
            </el-form-item>
            <el-form-item label="是否续跑" prop="isResumeRun">

                <el-radio-group v-model="formStartCON.isResumeRun">
                    <el-radio v-for="item in YesNo" @change="changeValue" :key="item.value" :label="item.code">{{item.value}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否日切" prop="isAutoShift">
                <el-radio-group v-model="formStartCON.isAutoShift">
                    <el-radio v-for="item in YesNo" :key="item.value" :label="item.code">{{item.value}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="当前批量日期" prop="curr_bath_date" :rules="filter_rules([{required: true}])">
                <el-date-picker v-model="formStartCON.curr_bath_date" :disabled="dateDisabled" type="date" format="yyyy-MM-dd" value-format="yyyyMMdd" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleCON" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="startCON('formStartCON')" :loading="isLoading" size="mini">启动</el-button>
        </div>
    </el-dialog>
    <!-- 启动TRIGGER模态框  -->
    <el-dialog title="确定启动TRIGGER?" :visible.sync="dialogFormVisibleStartTRI" width="35%">
        <el-form :model="formStartTRI" ref="formStartTRI" class="demo-ruleForm" label-width="150px">
            <el-form-item label="工程名为" prop="etl_sys_cd">
                <div style="width:220px">
                    <el-input v-model="formStartTRI.etl_sys_cd" disabled></el-input>
                </div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleTRI" size="mini" type="danger">否</el-button>
            <el-button type="primary" @click="startTRI" :loading="isloadingTri" size="mini">是</el-button>
        </div>
    </el-dialog>
    <!-- CONTROL日志模态框 -->
    <el-dialog :title="'CONTROL日志信息('  +this.dialogInfo + ')'" :visible.sync="dialogFormVisibleRecordCON" width="72%" :before-close="closeCON">
        <el-form :model="formRecordCON" ref="formRecordCON" class="demo-form-inline" :inline="true" label-width="100px">
            <el-form-item label="日志行数" prop="readNum">
                <el-input v-model="formRecordCON.readNum">
                </el-input>
            </el-form-item>
            <el-tooltip effect="dark" content="默认显示100行，最多显示1000行(正整数)" placement="right">
                <i class="fa fa-question-circle " aria-hidden="true"></i>
            </el-tooltip>
            <el-button type="primary" :loading="isViewCon" @click="onViewCON">查看</el-button>
            <el-form-item label="跑批日期" prop="curr_bath_date" :rules="filter_rules([{required: true}])">
                <el-date-picker v-model="formRecordCON.curr_bath_date" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyyMMdd">
                </el-date-picker>
            </el-form-item>
            <el-button type="primary" :loading="isViewDowncon" @click="downRecordCON('formRecordCON')">下载日志</el-button>
        </el-form>
        <div style="margin-top:-10px">
            <span v-html="formRecordCON.project_records"></span>
            <el-divider></el-divider>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeCON" size="mini" type="danger">关闭</el-button>
        </div>
    </el-dialog>
    <!-- TRIGGER日志模态框 -->
    <el-dialog :title="'TRIGGER日志信息('  +this.dialogInfoTri + ')'" :visible.sync="dialogFormVisibleRecordTRI" width="72%" :before-close="closeTRI">
        <el-form :model="formRecordTRI" ref="formRecordTRI" class="demo-form-inline" :inline="true" label-width="100px">
            <el-form-item label="日志行数" prop="readNum">
                <el-input v-model="formRecordTRI.readNum"></el-input>
            </el-form-item>
            <el-tooltip effect="dark" content="默认显示100行，最多显示1000行(正整数)" placement="right">
                <i class="fa fa-question-circle " aria-hidden="true"></i>
            </el-tooltip>
            <el-button type="primary" :loading="isViewTri" @click="onViewTRI">查看</el-button>
            <el-form-item label="跑批日期" prop="curr_bath_date" :rules="filter_rules([{required: true}])">
                <el-date-picker v-model="formRecordTRI.curr_bath_date" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyyMMdd">
                </el-date-picker>
            </el-form-item>
            <el-button type="primary" :loading="isViewDowntri" @click="downRecordTRI('formRecordTRI')">下载日志</el-button>
        </el-form>
        <div style="margin-top:-10px">
            <span v-html="formRecordTRI.project_records"></span>
            <el-divider></el-divider>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeTRI" size="mini" type="danger">关闭</el-button>
        </div>
    </el-dialog>
    <!-- 调度监控模态框 -->
    <el-dialog :title="title" :visible.sync="dialogMointer" width="78%" :before-close="close">
        <el-divider></el-divider>
        <div>
            <div class="fixed">
                <el-col :span="8">
                    <p class="span22">批量运行状态</p>
                    <p class="span2">批量日期:{{this.dayDate}}</p>
                    <div v-if="showChartsInfo" id="leftChart" style="width: 100%;height:400px;"></div>
                </el-col>
                <el-col :span="16">
                    <p class="span22">系统运行状态</p>
                    <p class="span2">批量日期:{{this.dayDate}}</p>
                    <div v-if="showChartsInfo" id="rightChart" style="width: 100%;height:400px;"></div>
                </el-col>
            </div>

            <div v-if="showOrhidden">
                <p class="span22">任务:{{this.task}}</p>
                <p class="span2">批量日期:{{this.dayDate}}</p>
            </div>
            <highcharts v-show="showOrhidden" :options="chartOptions"></highcharts>
        </div>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer">
            <el-button size="mini" @click="close" type="danger">关闭</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as etlMageAllFun from "./etlMage";
import * as functionAll from "../detailsPages/Monitor/currentBatch/currentBatch.js";
import Highcahrts from 'highcharts';
import highchartsMore from 'highcharts/highcharts-more';
highchartsMore(Highcahrts);
import regular from "@/utils/js/regular";
import Vuex from 'vuex';
import draggable from 'vuedraggable'
import Sortable from 'sortablejs';
import * as fixedAll from "@/utils/js/fileOperations";
import {
    Chart
} from 'highcharts-vue'
let changValue;
let sys_cds;
export default {
    components: {
        draggable,
        Sortable,
        highcharts: Chart
    },
    data() {
        return {
            dialogFormVisibleAdd: false,
            dialogFormVisibleDeploy: false,
            dialogFormVisibleStartCON: false,
            dialogFormVisibleStartTRI: false,
            dialogFormVisibleRecordCON: false,
            dialogFormVisibleRecordTRI: false,
            dateDisabled: false,
            dialogMointer: false,
            showChartsInfo: false,
            batchState: {},
            sysState: [],
            projectTitle: '',
            currDate: '',
            chartOptions: {
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
            },
            activeName: 'first',
            title: "",
            formAdd: {
                etl_sys_cd: "",
                etl_sys_name: "",
                comments: "",
            },
            dayDate: '',
            task: '',
            showOrhidden: false,
            valueTime: '',
            dialogInfo: '',
            dialogInfoTri: '',
            formDeploy: {
                etl_sys_cd: "",
                etl_serv_ip: "",
                user_name: "",
                user_pwd: "",
                serv_file_path: "",
            },
            formStartCON: {
                etl_sys_cd: "",
                isResumeRun: "0",
                isAutoShift: "0",
                curr_bath_date: "",
            },
            formStartTRI: {
                etl_sys_cd: "",
            },
            formRecordCON: {
                etl_sys_cd: "",
                readNum: "",
                curr_bath_date: "",
                project_records: ""
            },
            formRecordTRI: {
                etl_sys_cd: "",
                readNum: "",
                curr_bath_date: "",
                project_records: "",
            },
            tableData: [],
            EtlSysInfo: [],
            listdata: [],
            YesNo: [],
            online: {},
            isLoadings: false,
            isLoading: false,
            isloadingTri: false,
            disableds: false,
            isViewDowncon: false,
            isViewCon: false,
            isViewDowntri: false,
            isViewTri: false,
            timer: ''
        };
    },
    mounted() {
        this.getTable();
        this.monitorAllProjectChartsData();
    },
    beforeDestroy() {
        // 关闭定时器
        clearInterval(this.timer);
    },
    methods: {
        //刷新表格
        getTable() {
            let params = {};
            etlMageAllFun.searchEtlSys(params).then(res => {
                for (let index = 0; index < res.data.length; index++) {
                    res.data[index].curr_bath_date = fixedAll.dateFormat(res.data[index].curr_bath_date);
                }
                let arr = [];
                let arr2 = [];
                this.tableData = res.data;
            })
        },
        //查询作业调度工程信息
        getEtlSys(etl_sys_cd) {
            let params = {};
            params["etl_sys_cd"] = etl_sys_cd;
            etlMageAllFun.searchEtlSysById(params).then(res => {
                this.EtlSysInfo = res.data;
            });
        },
        //标签页切换按钮
        handleClick(tab, event) {
            if (tab.label == '调度监控') {
                this.monitorAllProjectChartsData();
                this.setFor();
            } else {
                // 关闭定时器
                clearInterval(this.timer);
            }

        },
        // 轮询
        setFor() {
            let that = this;
            this.timer = setInterval(() => {
                setTimeout(() => {
                    that.monitorAllProjectChartsData();
                }, 0);
            }, 10000);
        },

        // 关闭弹出框数据回显
        beforeClose() {
            this.getTable();
            this.dialogFormVisibleAdd = false;
        },
        // 所有项目图标数据
        monitorAllProjectChartsData() {
            etlMageAllFun.monitorAllProjectChartsData().then(res => {
                this.listdata = res.data;
                res.data.forEach((item, index) => {
                    res.data[index].bathdate = fixedAll.dateFormat(res.data[index].bathdate);
                    var bar_dv = document.getElementById(`radar${item.etl_sys_cd}`);
                    if (bar_dv) {
                        let that = this;
                        this.batchState = item;
                        let chart = Highcahrts.chart(`radar${item.etl_sys_cd}`, {
                            chart: {
                                type: 'column',
                            },
                            credits: {
                                enabled: false
                            },
                            exporting: {
                                enabled: false
                            },
                            legend: {
                                enabled: false
                            },
                            title: {
                                text: ''
                            },
                            xAxis: {
                                categories: ['挂起', '等待', '运行', '暂停', '错误', '完成']
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: '<div class="EdbeSubTitle">' + '作业数量' + '<div/>'
                                },
                                labels: {
                                    formatter: function () {
                                        return this.value;
                                    }
                                },
                                gridLineWidth: 1,
                                gridLineColor: 'gray'
                            },
                            tooltip: {
                                crosshairs: true,
                                pointFormat: '<span style="color:{series.color}">{series.name}</span>：' +
                                    '<b>{point.y}</b>',
                            },
                            plotOptions: {
                                column: {
                                    animation: false,
                                    dataLabels: {
                                        enabled: true,
                                        formatter: function () {
                                            return this.y;
                                        }
                                    },
                                    colorByPoint: true
                                }
                            },
                            series: [{
                                name: '作业数量',
                                data: [{
                                        y: parseInt(this.batchState.pending),
                                        color: "#90B1D8"
                                    },
                                    {
                                        y: parseInt(this.batchState.waiting),
                                        color: "#00FFFF"
                                    },
                                    {
                                        y: parseInt(this.batchState.runing),
                                        color: "#90EE7E"
                                    },
                                    {
                                        y: parseInt(this.batchState.suspension),
                                        color: "#F7A35C"
                                    },
                                    {
                                        y: parseInt(this.batchState.error),
                                        color: "#FF7474"
                                    },
                                    {
                                        y: parseInt(this.batchState.done),
                                        color: "#2B908F"
                                    }
                                ]
                            }]
                        })
                    }
                })
            })
        },
        //添加工程按钮
        addProject() {
            this.disableds = false;
            this.dialogFormVisibleAdd = true;
            this.projectTitle = '添加工程';
        },
        //点击工程编号跳转按钮
        details(index, row) {
            sessionStorage.setItem('sys_cd', row.etl_sys_cd);
            sessionStorage.setItem('sys_name', row.etl_sys_name);
            this.$router.push({
                name: 'menus',
                query: {
                    name: '/subSystem',
                    dec: this.$Base64.encode('任务'),
                    etl_sys_name: row.etl_sys_name,
                    etl_sys_cd: row.etl_sys_cd,
                }
            });
        },
        //添加/修改工程模态框保存按钮
        add(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.projectTitle == '添加工程') {
                        let params = {};
                        params["etl_sys_cd"] = this.formAdd.etl_sys_cd;
                        params["etl_sys_name"] = this.formAdd.etl_sys_name;
                        params["comments"] = this.formAdd.comments;
                        etlMageAllFun.addEtlSys(params).then(res => {
                            if (res.code == 200) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.dialogFormVisibleAdd = false;
                                this.getTable();
                                this.formAdd = {};
                            }

                        });
                    } else if (this.projectTitle == '修改工程') {
                        let params = {};
                        params["etl_sys_cd"] = this.formAdd.etl_sys_cd;
                        params["etl_sys_name"] = this.formAdd.etl_sys_name;
                        params["comments"] = this.formAdd.comments;
                        etlMageAllFun.updateEtlSys(params).then(res => {
                            if (res.code == 200) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.dialogFormVisibleAdd = false;
                                this.getTable();
                                this.formAdd = {};
                            }
                        });
                    }
                }
            })

        },
        //添加/修改工程模态框取消按钮
        cancleAdd() {
            // 表单清空
            this.formAdd = {};
            // 隐藏对话框
            this.getTable();
            this.$refs.formAdd.resetFields();
            this.dialogFormVisibleAdd = false;
        },
        //部署Agent工程模态框保存按钮
        saveDeploy(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.isLoadings = true;
                    let params = {};
                    params["etl_sys_cd"] = this.formDeploy.etl_sys_cd;
                    params["etl_serv_ip"] = this.formDeploy.etl_serv_ip;
                    params["serv_file_path"] = this.formDeploy.serv_file_path;
                    params["user_name"] = this.formDeploy.user_name;
                    params["user_pwd"] = this.formDeploy.user_pwd;
                    etlMageAllFun.deployEtlJobScheduleProject(params).then(res => {
                        this.isLoadings = false;
                        if (res && res.success) {
                            this.$message({
                                message: '部署成功',
                                type: 'success'
                            });
                            this.getTable();
                            this.dialogFormVisibleDeploy = false;
                            this.formDeploy = {};
                        }

                    });

                }
            })

        },
        //部署Agent工程模态框取消按钮
        cancleDeploy() {
            this.dialogFormVisibleDeploy = false;
            this.formDeploy = {};
            this.$refs.formDeploy.resetFields();
        },
        //启动CONTROL模态框启动按钮
        startCON(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.isLoading = true;
                    let params = {};
                    params["etl_sys_cd"] = this.formStartCON.etl_sys_cd;
                    params["isResumeRun"] = this.formStartCON.isResumeRun;
                    params["isAutoShift"] = this.formStartCON.isAutoShift;
                    params["curr_bath_date"] = this.formStartCON.curr_bath_date;
                    etlMageAllFun.startControl(params).then(res => {
                        this.isLoading = false;
                        if (res && res.success) {
                            this.$message({
                                message: '启动CONTROL成功',
                                type: 'success'
                            });
                            this.getTable();
                            this.dialogFormVisibleStartCON = false;
                            this.formStartCON = {};
                        }
                    });

                }
            })

        },
        //启动CONTROL模态框取消按钮
        cancleCON() {
            this.dateDisabled = false;
            this.dialogFormVisibleStartCON = false;
            this.formStartCON = {
                etl_sys_cd: "",
                isResumeRun: "0",
                isAutoShift: "0",
                curr_bath_date: "",
            }
        },
        //启动TRIGGER模态框启动按钮
        startTRI() {
            this.isloadingTri = true;
            let params = {};
            params["etl_sys_cd"] = this.formStartTRI.etl_sys_cd;
            etlMageAllFun.startTrigger(params).then(res => {
                this.isloadingTri = false;
                if (res && res.success) {
                    this.$message({
                        message: '启动TRIGGER成功',
                        type: 'success'
                    });
                    this.getTable();
                    this.formStartTRI = {};
                    this.dialogFormVisibleStartTRI = false;
                }
            });
        },
        //启动TRIGGER模态框取消按钮
        cancleTRI() {
            this.dialogFormVisibleStartTRI = false;
            this.formStartTRI = {};
            this.$refs.formStartTRI.resetFields();
        },
        //CONTROL日志查看按钮
        onViewCON() {
            this.isViewCon = true;
            let params = {};
            params["etl_sys_cd"] = this.formRecordCON.etl_sys_cd;
            params["readNum"] = this.formRecordCON.readNum;
            params["isControl"] = '0';
            etlMageAllFun.readControlOrTriggerLog(params).then(res => {
                this.isViewCon = false;
                if (res.data.length != 0) {
                    this.formRecordCON.project_records = res.data.replace(/\[/g, '<br>[');
                    let dataTIP = this.formRecordCON.project_records.replace(/: <br>\[/g, ':[');
                    this.formRecordCON.project_records = dataTIP;
                } else {
                    this.formRecordCON.project_records = "暂无日志信息";
                }

            });
        },
        //CONTROL日志下载按钮
        downRecordCON(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.isViewDowncon = true;
                    let params = {};
                    params["etl_sys_cd"] = this.formRecordCON.etl_sys_cd;
                    params["curr_bath_date"] = this.formRecordCON.curr_bath_date;
                    params["isControl"] = '0';
                    etlMageAllFun.downloadControlOrTriggerLog(params).then(res => {
                        this.isViewDowncon = false;
                        if (res && res.success) {
                            this.downloadFile(res.data)
                        }
                    });
                }
            })
        },
        // 下载日志方法封装
        downloadFile(val) {
            etlMageAllFun.downloadFile({
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
        },
        //CONTROL日志关闭按钮
        closeCON() {
            this.$refs.formRecordCON.resetFields();
            this.dialogFormVisibleRecordCON = false;
            this.formRecordCON = {};
        },
        //TRIGGER日志查看按钮
        onViewTRI() {
            this.isViewTri = true;
            let params = {};
            params["etl_sys_cd"] = this.formRecordTRI.etl_sys_cd;
            params["readNum"] = this.formRecordTRI.readNum;
            params["isControl"] = '1';
            etlMageAllFun.readControlOrTriggerLog(params).then(res => {
                this.isViewTri = false;
                if (res.data.length != 0) {
                    this.formRecordTRI.project_records = res.data.replace(/\[/g, '<br>[');
                    let dataTIP = this.formRecordTRI.project_records.replace(/: <br>\[/g, ':[');
                    this.formRecordTRI.project_records = dataTIP;
                } else {
                    this.formRecordTRI.project_records = "暂无日志信息";
                }

            });
        },
        //TRIGGER日志下载按钮
        downRecordTRI(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.isViewDowntri = true;
                    let params = {};
                    params["etl_sys_cd"] = this.formRecordTRI.etl_sys_cd;
                    params["curr_bath_date"] = this.formRecordTRI.curr_bath_date;
                    params["isControl"] = '1';
                    etlMageAllFun.downloadControlOrTriggerLog(params).then(res => {
                        this.isViewDowntri = false;
                        if (res && res.success) {
                            this.downloadFile(res.data)
                        }
                    });
                }
            })
        },
        //TRIGGER日志关闭按钮
        closeTRI() {
            this.$refs.formRecordTRI.resetFields();
            this.dialogFormVisibleRecordTRI = false;
            this.formRecordTRI = {};
        },

        //表格编辑
        handleEdit(index, row) {
            this.dialogFormVisibleAdd = true;
            this.formAdd = row;
            this.projectTitle = '修改工程';
            this.disableds = true;
        },
        // 删除作业工程
        deleteWork(row) {
            this.$confirm('确认删除(' + row.etl_sys_cd + ')工程吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                etlMageAllFun.deleteEtlProject({
                    "etl_sys_cd": row.etl_sys_cd
                }).then(res => {
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
        //表格部署按钮
        handleDeploy(index, row) {
            this.formDeploy.etl_sys_cd = row.etl_sys_cd;
            etlMageAllFun.searchEtlSysById({
                "etl_sys_cd": row.etl_sys_cd
            }).then(res => {
                this.formDeploy = res.data;
            });
            this.dialogFormVisibleDeploy = true;
        },
        //表格启动CONTROL按钮
        handleStartco(index, row) {
            this.formStartCON = {
                etl_sys_cd: "",
                isResumeRun: "0",
                isAutoShift: "0",
                curr_bath_date: "",
            }
            this.dialogFormVisibleStartCON = true;
            this.getEtlSys(row.etl_sys_cd);
            this.getCategoryItems("IsFlag");
            this.formStartCON.etl_sys_cd = row.etl_sys_cd;
            this.currDate = row.curr_bath_date;
        },
        //表格启动TRIGGER按钮
        handleStarttr(index, row) {
            this.dialogFormVisibleStartTRI = true;
            this.formStartTRI.etl_sys_cd = row.etl_sys_cd;
        },
        //表格CONTROL日志信息按钮
        handleRecordco(index, row) {
            this.dialogFormVisibleRecordCON = true;
            this.formRecordCON.etl_sys_cd = row.etl_sys_cd;
            this.dialogInfo = row.etl_sys_cd;
        },
        //表格TRIGGER日志信息按钮
        handleRecordtr(index, row) {
            this.dialogFormVisibleRecordTRI = true;
            this.formRecordTRI.etl_sys_cd = row.etl_sys_cd;
            this.dialogInfoTri = row.etl_sys_cd;
        },
        // 全屏幕显示
        fullScreen(val) {
            this.dayDate = val.bathdate;
            this.monitorCurrentBatchInfo(val.etl_sys_cd);
            this.monitorCurrentBatchInfoByTask(val.etl_sys_cd)
            changValue = val.etl_sys_cd;
            this.title = val.sys_name;
            this.dialogMointer = true;
            this.showChartsInfo = true;
        },
        // 系统运行状态数据
        monitorCurrentBatchInfo(val) {
            functionAll.monitorCurrentBatchInfo({
                etl_sys_cd: val
            }).then((res) => {
                let that = this;
                this.batchState = res.data;
                this.dayDate = fixedAll.dateFormat(res.data.curr_bath_date);
                let chart = Highcahrts.chart('leftChart', {
                    chart: {
                        type: 'column',
                    },
                    credits: {
                        enabled: false
                    },
                    exporting: {
                        enabled: false
                    },
                    legend: {
                        enabled: false
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: ['挂起', '等待', '运行', '暂停', '错误', '完成']
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: '<div class="EdbeSubTitle">' + '作业数量' + '<div/>'
                        },
                        labels: {
                            formatter: function () {
                                return this.value;
                            }
                        },
                        gridLineWidth: 1,
                        gridLineColor: 'gray'
                    },
                    tooltip: {
                        crosshairs: true,
                        pointFormat: '<span style="color:{series.color}">{series.name}</span>：' +
                            '<b>{point.y}</b>',
                    },
                    plotOptions: {
                        column: {
                            animation: false,
                            dataLabels: {
                                enabled: true,
                                formatter: function () {
                                    return this.y;
                                }
                            },
                            colorByPoint: true
                        }
                    },
                    series: [{
                        name: '作业数量',
                        data: [{
                                y: parseInt(this.batchState.pending),
                                color: "#90B1D8"
                            },
                            {
                                y: parseInt(this.batchState.waiting),
                                color: "#00FFFF"
                            },
                            {
                                y: parseInt(this.batchState.runing),
                                color: "#90EE7E"
                            },
                            {
                                y: parseInt(this.batchState.suspension),
                                color: "#F7A35C"
                            },
                            {
                                y: parseInt(this.batchState.error),
                                color: "#FF7474"
                            },
                            {
                                y: parseInt(this.batchState.done),
                                color: "#2B908F"
                            }
                        ]
                    }]
                })
            })
        },
        // 监控当前批量状态
        monitorCurrentBatchInfoByTask(val) {
            functionAll.monitorCurrentBatchInfoByTask({
                etl_sys_cd: val
            }).then((res) => {
                this.sysState = res.data;
                let sub_sys_cd = [];
                let name = [];
                let runingNum = [];
                let doneNum = [];
                let errorNum = [];
                let pendingNum = [];
                let waitingNum = [];
                let suspensionNum = [];
                for (let i in this.sysState) {
                    sub_sys_cd.push(this.sysState[i].sub_sys_cd);
                    name.push(this.sysState[i].sub_sys_desc);
                    runingNum.push(parseInt(this.sysState[i].runing));
                    doneNum.push(parseInt(this.sysState[i].done));
                    errorNum.push(parseInt(this.sysState[i].error));
                    pendingNum.push(parseInt(this.sysState[i].pending));
                    waitingNum.push(parseInt(this.sysState[i].waiting));
                    suspensionNum.push(parseInt(this.sysState[i].suspension));
                }
                let that = this;
                let chart = Highcahrts.chart('rightChart', {
                    chart: {
                        type: 'column'
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: ''
                    },
                    exporting: {
                        enabled: false
                    },
                    xAxis: {
                        title: {
                            text: this.value,
                        },
                        categories: name,
                        labels: {
                            rotation: -45,
                            formatter: function () {
                                var val;
                                if (this.value.length > 8) {
                                    val = this.value.substring(0, 6) + '...'
                                } else {
                                    val = this.value
                                }
                                return val;
                            }
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: ''
                        }
                    },
                    tooltip: {
                        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                        shared: true,
                        followPointer: true,
                        crosshairs: true
                    },
                    plotOptions: {
                        column: {
                            animation: false,
                            plotOptions: true,
                            enableMouseTracking: true,
                            stacking: 'percent',
                            events: {
                                click: function (event) {
                                    that.task = event.point.category;
                                    let id = that.changeParamas(event.point.category)
                                    that.searchMonitorJobStateBySubCd(id);
                                }
                            }
                        }
                    },
                    series: [{
                        name: '挂起',
                        color: "#90B1D8",
                        data: pendingNum
                    }, {
                        name: '等待',
                        color: "#00FFFF",
                        data: waitingNum
                    }, {
                        name: '运行',
                        color: "#90EE7E",
                        data: runingNum
                    }, {
                        name: '暂停',
                        color: "#F7A35C",
                        data: suspensionNum
                    }, {
                        name: '错误',
                        color: "#FF7474",
                        data: errorNum
                    }, {
                        name: '完成',
                        color: "#2B908F",
                        data: doneNum
                    }]
                })

            })
        },
        // 改变传参
        changeParamas(val) {
            this.sysState.forEach(item => {
                if (val == item.sub_sys_desc) {
                    val = item.sub_sys_cd;
                }
            })
            return val;
        },
        // 监控当前系统运行任务下的作业信息
        searchMonitorJobStateBySubCd(val) {
            let that = this;
            functionAll.searchMonitorJobStateBySubCd({
                etl_sys_cd: changValue,
                sub_sys_cd: val,
                curr_bath_date: this.dayDate.replace(/-/g, "")
            }).then(res => {
                if (res && res.success) {
                    // 数据处理成图标需要的格式
                    let time = [];
                    let colorsArray = [];
                    let sysName = [];
                    let status = [];
                    let startTime = [];
                    let endTime = [];
                    let start = 0;
                    let end = 0;
                    let arry = res.data;
                    let date = new Date().valueOf() + 8 * 60 * 60 * 1000;
                    for (let index = 0; index < arry.length; index++) {
                        sysName[index] = arry[index].etl_job;
                        status[index] = arry[index].job_disp_status;
                        let curr_st_time = arry[index]['curr_st_time']
                        let curr_end_time = arry[index]['curr_end_time']
                        // 挂起：
                        if (arry[index]['job_disp_status'] == "P") {
                            colorsArray[index] = '#90B1D8';
                            start = date;
                            end = date;
                        }
                        // 等待
                        if (arry[index]['job_disp_status'] == "W") {
                            colorsArray[index] = '#00FFFF';
                            start = date;
                            end = date;
                        }
                        // 暂停
                        if (arry[index]['job_disp_status'] == "S") {
                            colorsArray[index] = '#F7A35C';
                            startTime[index] = this.dateToMill(curr_st_time);
                            endTime[index] = this.dateToMill(curr_end_time);
                            start = startTime[index];
                            end = start;
                        }

                        // 错误
                        if (arry[index]['job_disp_status'] == "E") {
                            colorsArray[index] = '#FF7474';
                            startTime[index] = this.dateToMill(curr_st_time);
                            endTime[index] = this.dateToMill(curr_end_time);
                            start = startTime[index];
                            end = start;
                        }
                        // 运行时长：
                        if (arry[index]['job_disp_status'] == "R") {
                            colorsArray[index] = '#90EE7E';
                            startTime[index] = this.dateToMill(curr_st_time);
                            start = startTime[index];
                            end = date;
                        }
                        // 完成
                        if (arry[index]['job_disp_status'] == "D") {
                            startTime[index] = (this.dateToMill(curr_st_time));
                            endTime[index] = (this.dateToMill(curr_end_time));
                            colorsArray[index] = '#2B908F';
                            // 是否虚拟作业
                            if (startTime[index] > endTime[index]) {
                                startTime[index] = endTime[index];
                            }
                            start = startTime[index];
                            end = endTime[index];
                        }
                        time[index] = [start, end];
                        let that = this;
                        let heightbottom = 140 + arry.length * 30;
                        this.chartOptions = {
                            // 数据提示框
                            tooltip: {
                                crosshairs: true,
                                useHTML: true,
                                formatter: function () {
                                    var index = 0;
                                    for (var i = 0; i < sysName.length; i++) {
                                        if (this.x == sysName[i]) {
                                            index = i;
                                            var start = Highcahrts.dateFormat('%Y-%m-%d %H:%M:%S', startTime[index]);
                                            var end = Highcahrts.dateFormat('%Y-%m-%d %H:%M:%S', endTime[index]);
                                            if (status[index] == "P") {
                                                return this.x + '<br/>' + '状态' + ':' + '挂起';
                                            } else if (status[index] == "W") {
                                                return this.x + '<br/>' + '状态' + ':' + '等待';
                                            } else if (status[index] == "S") {
                                                return this.x + '<br/>' + '状态' + ':' + '暂停' + '<br/>' + '开始时间' + start + '<br/>' + '结束时间' + end;
                                            } else if (status[index] == "E") {
                                                return this.x + '<br/>' + '状态' + ':' + '错误' + '<br/>' + '开始时间' + start + '<br/>' + '结束时间' + end;
                                            } else if (status[index] == "D") {
                                                return this.x + '<br/>' + '状态' + ':' + '完成' + '<br/>' + '开始时间' + start + '<br/>' + '结束时间' + end;
                                            } else if (status[index] == "R") {
                                                return this.x + '<br/>' + '状态' + ':' + '运行' + '<br/>' + '开始时间' + start + '<br/>' + '至' +
                                                    Highcahrts.dateFormat('%Y-%m-%d %H:%M:%S', new Date().getTime() + 8 * 60 * 60 * 1000);
                                            }
                                        }

                                    }
                                }
                            },
                            chart: {
                                type: 'columnrange',
                                inverted: true,
                                height: heightbottom
                            },
                            credits: {
                                enabled: false
                            },
                            title: {
                                text: ''
                            },
                            exporting: {
                                enabled: false
                            },
                            xAxis: {
                                categories: sysName,
                                tickColor: 'gray',
                                gridLineWidth: 1,
                                gridLineColor: 'gray',
                                tickmarkPlacement: 'on'
                            },
                            yAxis: {
                                type: 'datetime',
                                title: {
                                    text: ''
                                },
                                gridLineWidth: 0,
                                labels: {
                                    rotation: -45,
                                    overflow: 'justify',
                                    useHTML: true,
                                    formatter: function () {
                                        var date = new Date(this.value);
                                        var hours = date.getUTCHours();
                                        var minutes = date.getUTCMinutes();
                                        var seconds = date.getUTCSeconds();
                                        if (this.isFirst) {
                                            return '<div class="EdbeSubTitle">' + Highcahrts.dateFormat('%m-%d %H:%M', this.value) + '<div/>';
                                        } else if (hours == 0 && minutes == 0 && seconds == 0) {
                                            return '<div class="EdbeSubTitle">' + Highcahrts.dateFormat('%m-%d %H:%M', this.value) + '<div/>';
                                        } else {
                                            return '<div class="EdbeSubTitle">' + Highcahrts.dateFormat('%H:%M:%S', this.value) + '<div/>';
                                        }
                                    }
                                }
                            },
                            // 数据点
                            plotOptions: {
                                columnrange: {
                                    colorByPoint: true,
                                    pointPadding: 1,
                                    borderWidth: 0,
                                    pointWidth: 8,
                                    showCheckbox: true,
                                },
                                series: {
                                    minPointLength: 15,
                                    cursor: 'pointer',
                                    point: {
                                        events: {
                                            plotOptions: true,
                                            enableMouseTracking: true,
                                            click: function () {
                                                let etlJobName = this.category;
                                                that.$router.push({
                                                    name: 'currentJob',
                                                    query: {
                                                        name: '/currentJob',
                                                        dec: that.$Base64.encode('当前作业'),
                                                        etl_job: etlJobName,
                                                        etl_sys_cd: changValue
                                                    }
                                                });
                                            }
                                        }
                                    }
                                },
                            },
                            // 图例
                            legend: {
                                enabled: false,
                            },
                            series: [{
                                data: time,
                                colors: colorsArray
                            }]

                        }
                        this.showOrhidden = true;
                    }
                }

            })
        },
        // 毫秒数
        dateToMill(date) {
            date = date.replace(/\s*/g, "");
            let year = date.substring(0, 4);
            let month = date.substring(4, 6);
            let day = date.substring(6, 8);
            let timeh = date.substring(8, 10);
            let timem = date.substring(10, 12)
            let times = date.substring(12, 14)
            let dates = year + "-" + month + "-" + day + " " + timeh + ":" + timem + ":" + times;
            date = dates;
            date = (new Date(date)).getTime() + 8 * 60 * 60 * 1000; //得到毫秒数
            return date;
        },
        edwColor(arry) {
            var color = ['#c23531', '#90EE7E', '#19d4ae'];
            if (typeof (arry) == "string") {
                if (arry == "E") {
                    return color[0];
                    //除了错误和已完成其余都是一个颜色
                } else if (arry == "R") {
                    return color[1];
                } else if (arry == "W") {
                    return color[1];
                } else if (arry == "P") {
                    return color[1];
                } else if (arry == "S") {
                    return color[1];
                } else if (arry == "D") {
                    return color[2];
                }
            }
        },
        // 关闭模态框
        close() {
            this.dialogMointer = false;
            this.showOrhidden = false;
            this.showChartsInfo = false;
        },
        // 跳转详情页
        routerLink(val) {
            this.$router.push({
                name: 'currentBatch',
                query: {
                    name: '/currentBatch',
                    dec: this.$Base64.encode('当前批量'),
                    etl_sys_name: val.etl_sys_name,
                    etl_sys_cd: val.etl_sys_cd,
                }
            });
        },
        // 获取代码项对应的值
        getCategoryItems(e) {
            if (e == "IsFlag") {
                functionAll
                    .getCategoryItems({
                        category: e
                    })
                    .then(res => {
                        this.YesNo = res.data;
                    });
            }
        },
        // 停止工程
        stopWork(index, row) {
            let mess = row.etl_sys_name;
            this.$confirm('确定停止(' + mess + ')工程?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                etlMageAllFun.stopEtlProject({
                    etl_sys_cd: row.etl_sys_cd
                }).then(res => {
                    if (res && res.success) {
                        this.$message({
                            message: '停止工程成功',
                            type: 'success'
                        });
                        this.getTable();
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消停止'
                });
            });
        },
        // 是否续跑控制日期选择
        changeValue(val) {
            if (val == "1") {
                this.formStartCON.curr_bath_date = this.currDate.replace(/-/g, "");
                this.dateDisabled = true;
            } else if (val == "0") {
                this.formStartCON.curr_bath_date = ''
                this.dateDisabled = false;
            }
        }
    },
};
</script>

<style scoped>
.lines {
    margin-top: 2px;
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 10px;
}

.tabes {
    margin-top: 14px;
}

.el-row {
    height: 64px;
    line-height: 64px;
    width: 100%;
}

.elRows {
    height: 40px;
    line-height: 40px;
    width: 100%;
}

.el-row span {
    color: #2196f3;
    font-size: 18px;
}

/* 字体小图标样式设置 */
.fa-globe {
    color: #2196f3;
    margin-right: 5px;
}

i {
    margin-right: 5px;
}

/* button样式设置 */
.els {
    float: right;
    margin-top: 3px;
}

.el1 {
    margin-left: 10px;
}

.item {
    float: right;
}

.loindex .span11 {
    text-align: center;
    margin-bottom: 10px;
}

.loindex .span10 {
    color: #409EFF;
    cursor: pointer;
    margin-top: 30px;
    font-size: 20px;
    margin-bottom: 6px;
    text-align: center;
    margin-bottom: 10px;
}

.loindex .span11 {
    margin-top: 6px;
    font-size: 12px;
    margin-bottom: 10px;
}

.loindex .pDrag {
    display: inline-block;
    height: 40px;
    width: 100%;
    background: #f5f5f5;
    line-height: 40px;
    cursor: pointer;
}

.loindex .movePlace {
    border: 1px solid #ddd;
    margin: 0 10px 20px 10px;
}

.loindex .el-icon-full-screen {
    color: #478fca
}

.loindex .pDrag span:first-child {
    float: left;
    margin-left: 10px;
    font-size: 13px;
    font-weight: normal;
}

.loindex .pDrag span:last-child {
    float: right;
    margin-right: 10px;
}

.loindex .color-item {
    border: 1px solid #ddd;
}

.loindex .span2 {
    text-align: center;
    margin-bottom: 10px;
}

.loindex .span22 {
    text-align: center;
    margin-bottom: 10px;
}

.loindex .span22 {
    font-size: 20px;
}

.loindex .span2 {
    font-size: 12px;
}

.fixed {
    min-height: 500px;
}

.loindex>>>.el-dialog__body {
    padding: 0px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
}

.loindex .endAgent {
    color: red;
}

.loindex .fa-question-circle {
    margin-left: -5px;
    margin-right: 5px;
}
</style>
