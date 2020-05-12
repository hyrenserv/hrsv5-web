<template>
<div class="loindex">
    <el-row class="elRows">
        <!-- <i class="block_icon fa fa-briefcase fa-globe blue"></i> -->
        <span>工程管理</span>
        <el-button type="primary" class="el1 els" @click="addProject" size="small">
            <i class="block_icon fa fa-plus-circle"></i>添加工程
        </el-button>
        <div class="lines"></div>
    </el-row>
    <el-tabs class="tabes" v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="工程信息" name="first">
            <el-table size="medium" :data="tableData" border style="width: 100%">
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
                <el-table-column label="操作" align='center' width="320px">
                    <template slot-scope="scope">
                        <el-button size="mini" icon="el-icon-edit" title="编辑" circle type="primary" @click="handleEdit(scope.$index, scope.row)">
                        </el-button>
                        <el-button size="mini" icon="el-icon-thumb" title="部署Agent" circle type="warning" @click="handleDeploy(scope.$index, scope.row)">
                        </el-button>
                        <el-button size="mini" icon="el-icon-video-pause" v-if="scope.row.sys_run_status != 'S'" title="停止工程" circle type="warning" @click="stopWork(scope.$index, scope.row)">
                        </el-button>
                        <el-button size="mini" icon="el-icon-switch-button" title="启动CONTROL" circle type="success" @click="handleStartco(scope.$index, scope.row)">
                        </el-button>
                        <el-button size="mini" icon="el-icon-switch-button" title="启动TRIGGER" circle type="primary" @click="handleStarttr(scope.$index, scope.row)">
                        </el-button>
                        <el-button size="mini" icon="el-icon-document" title="CONTROL日志信息" circle type="success" @click="handleRecordco(scope.$index, scope.row)">
                        </el-button>
                        <el-button size="mini" icon="el-icon-document" title="TRIGGER日志信息" circle type="primary" @click="handleRecordtr(scope.$index, scope.row)">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="调度监控" name="second">
            <draggable v-model="listdata">
                <el-col :span=12 v-for="(item,index) in listdata" :key="item.etl_sys_cd">
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
                        <p :id="`radar${index}`" :style="{ height: '300px'}"></p>
                    </div>
                </el-col>
            </draggable>
        </el-tab-pane>
    </el-tabs>
    <!-- 添加/编辑工程模态框 -->
    <el-dialog :title="projectTitle" :visible.sync="dialogFormVisibleAdd" width="40%" :before-close="beforeClose">
        <el-form :model="formAdd" ref="formAdd" class="demo-ruleForm" label-width="150px">
            <el-form-item label="工程编号" prop="etl_sys_cd" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.etl_sys_cd" style="width:270px" autocomplete="off" placeholder="工程编号"></el-input>
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
            <el-button type="primary" @click="saveDeploy('formDeploy')" size="mini">部署</el-button>
        </div>
    </el-dialog>
    <!-- 启动CONTROL模态框 -->
    <el-dialog title="启动CONTROL配置参数" :visible.sync="dialogFormVisibleStartCON" width="35%">
        <el-form :model="formStartCON" ref="formStartCON" class="demo-ruleForm" label-width="150px">
            <el-form-item label="工程编号" prop="etl_sys_cd" :rules="filter_rules([{required: true}])">
                <div style="width:220px">
                    <el-input v-model="formStartCON.etl_sys_cd" disabled></el-input>
                </div>
            </el-form-item>
            <el-form-item label="是否续跑" prop="isResumeRun">

                <el-radio-group v-model="formStartCON.isResumeRun">
                    <el-radio v-for="item in YesNo" :key="item.value" :label="item.code">{{item.value}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否日切" prop="isAutoShift">
                <el-radio-group v-model="formStartCON.isAutoShift">
                    <el-radio v-for="item in YesNo" :key="item.value" :label="item.code">{{item.value}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="当前批量日期" prop="curr_bath_date" :rules="filter_rules([{required: true}])">
                <el-date-picker v-model="formStartCON.curr_bath_date" type="date" format="yyyy-MM-dd" value-format="yyyyMMdd" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleCON" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="startCON('formStartCON')" size="mini">启动</el-button>
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
            <el-button type="primary" @click="startTRI" size="mini">是</el-button>
        </div>
    </el-dialog>
    <!-- CONTROL日志模态框 -->
    <el-dialog title="CONTROL日志信息?" :visible.sync="dialogFormVisibleRecordCON" width="72%">
        <el-form :model="formRecordCON" ref="formRecordCON" class="demo-form-inline" :inline="true" label-width="100px">
            <el-form-item label="工程编号" prop="readNum">
                <el-input v-model="formRecordCON.readNum"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onViewCON">查看</el-button>
            </el-form-item>
            <el-form-item label="跑批日期" prop="curr_bath_date">
                <el-date-picker v-model="formRecordCON.curr_bath_date" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyyMMdd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="downRecordCON">下载日志</el-button>
            </el-form-item>
        </el-form>
        <div style="margin-top:-25px">
            <span>{{formRecordCON.project_records}}</span>
            <el-divider></el-divider>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeCON" size="mini" type="danger">关闭</el-button>
        </div>
    </el-dialog>
    <!-- TRIGGER日志模态框 -->
    <el-dialog title="TRIGGER日志信息?" :visible.sync="dialogFormVisibleRecordTRI" width="72%">
        <el-form :model="formRecordTRI" ref="formRecordTRI" class="demo-form-inline" :inline="true" label-width="100px">
            <el-form-item label="工程编号" prop="readNum">
                <el-input v-model="formRecordTRI.readNum"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onViewTRI">查看</el-button>
            </el-form-item>
            <el-form-item label="跑批日期" prop="curr_bath_date">
                <el-date-picker v-model="formRecordTRI.curr_bath_date" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyyMMdd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="downRecordTRI">下载日志</el-button>
            </el-form-item>
        </el-form>
        <div style="margin-top:-25px">
            <span>{{formRecordTRI.project_records}}</span>
            <el-divider></el-divider>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeTRI" size="mini" type="danger">关闭</el-button>
        </div>
    </el-dialog>
    <!-- 调度监控模态框 -->
    <el-dialog :title="title" :visible.sync="dialogMointer" width="78%">
        <el-divider></el-divider>
        <div>
            <div class="fixed">
                <el-col :span="10">
                    <p class="span22">批量运行状态</p>
                    <p class="span2">批量日期:{{this.dayDate}}</p>
                    <VeLine :data="chartdataChartOne" :extend="chartExtendChartOne"></VeLine>
                </el-col>
                <el-col :span="14">
                    <p class="span22">系统运行状态</p>
                    <p class="span2">批量日期:{{this.dayDate}}</p>
                    <VeLine :data="chartdataChartTwo" :extend="chartExtendChartTwo" :settings="chartSettings" :events="chartEvents"></VeLine>
                </el-col>
            </div>

            <div v-if="showOrhidden">
                <p class="span22">任务:{{this.task}}</p>
                <p class="span2">批量日期:{{this.dayDate}}</p>
            </div>
            <div v-if="showOrhidden" id="container" :style="{width: '100%', height: 'auto'}"></div>
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
import VeLine from 'v-charts/lib/histogram.common';
import Vuex from 'vuex';
import draggable from 'vuedraggable'
import Sortable from 'sortablejs'
let changValue;
let sys_cds;
export default {
    components: {
        draggable,
        Sortable,
        VeLine
    },
    data() {
        this.chartSettings = {
            stack: {
                '任务': ['挂起', '等待', '运行', '暂停', '错误', '完成']
            }
        }
        let self = this;
        this.chartEvents = {
            click: function (e) {
                self.task = e.name;
                self.showOrhidden = true;
                let id = self.changeParamas(e.name)
                self.searchMonitorJobStateBySubCd(id);
            }
        }
        return {
            dialogFormVisibleAdd: false,
            dialogFormVisibleDeploy: false,
            dialogFormVisibleStartCON: false,
            dialogFormVisibleStartTRI: false,
            dialogFormVisibleRecordCON: false,
            dialogFormVisibleRecordTRI: false,
            dialogMointer: false,
            projectTitle: '',
            activeName: 'first',
            title: "",
            formAdd: {
                etl_sys_cd: "",
                etl_sys_name: "",
                comments: "",
            },
            chartdataChartOne: {
                columns: ['sub_sys_desc', '完成', '等待', '错误', '暂停', '运行', '挂起'],
                rows: []
            },
            chartdataChartTwo: {
                columns: ['sub_sys_desc', '完成', '等待', '错误', '暂停', '运行', '挂起'],
                rows: []
            },
            dayDate: '',
            task: '',
            showOrhidden: false,
            valueTime: '',
            chartExtendChartOne: {
                series: {
                    //柱子宽度
                    barWidth: 15
                }
            },
            chartExtendChartTwo: {
                series: {
                    //柱子宽度
                    barWidth: 80
                }
            },
            formDeploy: {
                etl_sys_cd: "",
                etl_serv_ip: "",
                user_name: "",
                user_pwd: "",
                serv_file_path: "",
            },
            formStartCON: {
                etl_sys_cd: "",
                isResumeRun: "",
                isAutoShift: "",
                curr_bath_date: "",
            },
            formStartTRI: {
                etl_sys_cd: "",
            },
            formRecordCON: {
                etl_sys_cd: "",
                readNum: "",
                curr_bath_date: "",
                project_records: "",
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
            isStop: false
        };
    },
    mounted() {
        this.getTable();
        this.monitorAllProjectChartsData();
    },
    methods: {
        //刷新表格
        getTable() {
            let params = {};
            etlMageAllFun.searchEtlSys(params).then(res => {
                for (let index = 0; index < res.data.length; index++) {
                    let year = res.data[index].curr_bath_date.substring(0, 4);
                    let month = res.data[index].curr_bath_date.substring(4, 6);
                    let day = res.data[index].curr_bath_date.substring(6, 9);
                    let date = year + "-" + month + "-" + day;
                    res.data[index].curr_bath_date = date;
                }
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
            }

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
                    let arry = [];
                    item['挂起'] = item.pending;
                    item['等待'] = item.waiting;
                    item['运行'] = item.runing;
                    item['暂停'] = item.suspension;
                    item['错误'] = item.error;
                    item['完成'] = item.done;
                    arry.push(item);
                    var bar_dv = document.getElementById(`radar${index}`);
                    if (bar_dv) {
                        let myChart = this.$echarts.init(bar_dv);
                        myChart.setOption({
                            legend: {},
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            dataset: {
                                dimensions: ['etl_sys_name', '错误', '等待', '运行', '暂停', '完成', '挂起'],
                                source: arry
                            },
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: [{
                                type: 'category',
                                axisTick: {
                                    alignWithLabel: true
                                }
                            }],
                            yAxis: {},
                            series: [{
                                    type: 'bar'
                                },
                                {
                                    type: 'bar'
                                },
                                {
                                    type: 'bar'
                                }, {
                                    type: 'bar'
                                },
                                {
                                    type: 'bar'
                                },
                                {
                                    type: 'bar'
                                }
                            ]
                        })
                    }

                })

            })
        },
        //添加工程按钮
        addProject() {
            this.dialogFormVisibleAdd = true;
            this.projectTitle = '添加工程';
        },
        //点击工程编号跳转按钮
        details(index, row) {
            // this.SET_CD({sys_cd:row.etl_sys_cd});
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
                    let params = {};
                    params["etl_sys_cd"] = this.formDeploy.etl_sys_cd;
                    params["etl_serv_ip"] = this.formDeploy.etl_serv_ip;
                    params["serv_file_path"] = this.formDeploy.serv_file_path;
                    params["user_name"] = this.formDeploy.user_name;
                    params["user_pwd"] = this.formDeploy.user_pwd;
                    etlMageAllFun.deployEtlJobScheduleProject(params).then(res => {
                        if (res.code == 200) {
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
                    let params = {};
                    params["etl_sys_cd"] = this.formStartCON.etl_sys_cd;
                    params["isResumeRun"] = this.formStartCON.isResumeRun;
                    params["isAutoShift"] = this.formStartCON.isAutoShift;
                    params["curr_bath_date"] = this.formStartCON.curr_bath_date;
                    etlMageAllFun.startControl(params).then(res => {
                        if (res.code == 200) {
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
            this.dialogFormVisibleStartCON = false;
            this.formStartCON = {};
        },
        //启动TRIGGER模态框启动按钮
        startTRI() {
            let params = {};
            params["etl_sys_cd"] = this.formStartTRI.etl_sys_cd;
            etlMageAllFun.startTrigger(params).then(res => {
                if (res.code == 200) {
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
            this.getEtlSys(this.formRecordCON.etl_sys_cd);
            let params = {};
            params["etl_sys_cd"] = this.formRecordCON.etl_sys_cd;
            params["readNum"] = this.formRecordCON.readNum;
            params["isControl"] = '0';
            etlMageAllFun.readControlOrTriggerLog(params).then(res => {
                this.getTable();
            });
        },
        //CONTROL日志下载按钮
        downRecordCON() {
            this.getEtlSys(this.formRecordCON.etl_sys_cd);
            let params = {};
            params["etl_sys_cd"] = this.formRecordCON.etl_sys_cd;
            params["curr_bath_date"] = this.formRecordCON.curr_bath_date;
            params["isControl"] = '0';
            etlMageAllFun.downloadControlOrTriggerLog(params).then(res => {
                this.getTable();
            });
        },
        //CONTROL日志关闭按钮
        closeCON() {
            this.dialogFormVisibleRecordCON = false;
            this.formRecordCON = {};
        },
        //TRIGGER日志查看按钮
        onViewTRI() {
            this.getEtlSys(this.formRecordTRI.etl_sys_cd);
            let params = {};
            params["etl_sys_cd"] = this.formRecordTRI.etl_sys_cd;
            params["readNum"] = this.formRecordTRI.readNum;
            params["isControl"] = '1';
            etlMageAllFun.readControlOrTriggerLog(params).then(res => {
                this.getTable();
            });
        },
        //TRIGGER日志下载按钮
        downRecordTRI() {
            this.getEtlSys(this.formRecordTRI.etl_sys_cd);
            let params = {};
            params["etl_sys_cd"] = this.formRecordTRI.etl_sys_cd;
            params["curr_bath_date"] = this.formRecordTRI.curr_bath_date;
            params["isControl"] = '1';
            etlMageAllFun.downloadControlOrTriggerLog(params).then(res => {
                this.getTable();
            });
        },
        //TRIGGER日志关闭按钮
        closeTRI() {
            this.dialogFormVisibleRecordTRI = false;
            this.formRecordTRI = {};
        },

        //表格编辑
        handleEdit(index, row) {
            this.dialogFormVisibleAdd = true;
            this.formAdd = row;
            this.projectTitle = '修改工程';
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
            this.dialogFormVisibleStartCON = true;
            this.getEtlSys(row.etl_sys_cd);
            this.getCategoryItems("IsFlag");
            this.formStartCON.etl_sys_cd = row.etl_sys_cd;
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
            this.onViewCON();
        },
        //表格TRIGGER日志信息按钮
        handleRecordtr(index, row) {
            this.dialogFormVisibleRecordTRI = true;
            this.formRecordTRI.etl_sys_cd = row.etl_sys_cd;
            this.onViewTRI();
        },
        // 全屏幕显示
        fullScreen(val) {
            this.dayDate = val.bathdate;
            this.monitorCurrentBatchInfo(val.etl_sys_cd);
            changValue = val.etl_sys_cd;
            this.title = val.sys_name;
        },
        // 当前批量情况获取
        monitorCurrentBatchInfo(val) {
            functionAll.monitorCurrentBatchInfo({
                etl_sys_cd: val
            }).then((res) => {
                res.data.systemOperationStatus.forEach(item => {
                    item['挂起'] = item.pending;
                    item['等待'] = item.waiting;
                    item['运行'] = item.runing;
                    item['暂停'] = item.suspension;
                    item['错误'] = item.error;
                    item['完成'] = item.done;
                })
                this.dayDate = res.data.curr_bath_date;
                // 系统运行状态
                this.chartdataChartTwo.rows = res.data.systemOperationStatus;
                // 批量运行状态
                this.chartdataChartOne.rows = res.data.systemOperationStatus;
                this.dialogMointer = true;
            })
        },
        // 改变传参
        changeParamas(val) {
            this.chartdataChartTwo.rows.forEach(item => {
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
                curr_bath_date: this.dayDate
            }).then(res => {
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
                        colorsArray[index] = '#c4b4e4';
                        start = date;
                        end = date;
                    }
                    // 等待
                    if (arry[index]['job_disp_status'] == "W") {
                        colorsArray[index] = '#5ab1ef';
                        start = date;
                        end = date;
                    }
                    // 暂停
                    if (arry[index]['job_disp_status'] == "S") {
                        colorsArray[index] = '#ffb980';
                        startTime[index] = this.dateToMill(curr_st_time);
                        endTime[index] = this.dateToMill(curr_end_time);
                        start = startTime[index];
                        end = start;
                    }

                    // 错误
                    if (arry[index]['job_disp_status'] == "E") {
                        colorsArray[index] = '#c23531';
                        startTime[index] = this.dateToMill(curr_st_time);
                        endTime[index] = this.dateToMill(curr_end_time);
                        start = startTime[index];
                        end = start;
                    }
                    // 运行时长：
                    if (arry[index]['job_disp_status'] == "R") {
                        colorsArray[index] = '#0067a6';
                        startTime[index] = this.dateToMill(curr_st_time);
                        start = startTime[index];
                        end = date;
                    }
                    // 完成
                    if (arry[index]['job_disp_status'] == "D") {
                        startTime[index] = (this.dateToMill(curr_st_time));
                        endTime[index] = (this.dateToMill(curr_end_time));
                        colorsArray[index] = '#19d4ae';
                        // 是否虚拟作业
                        if (startTime[index] > endTime[index]) {
                            startTime[index] = endTime[index];
                        }
                        start = startTime[index];
                        end = endTime[index];
                    }
                    time[index] = [start, end];
                    this.getChartInfo(sysName, startTime, status, endTime, time, colorsArray);
                }

            })
        },
        // 获得图表信息
        getChartInfo(sysName, startTime, status, endTime, time, colorsArray) {
            let that = this;
            var chart = Highcahrts.chart('container', {
                chart: {
                    type: 'columnrange',
                    inverted: true,
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
                                    return this.x + '<br/>' + '状态' + ':' + '挂机' + '<br/>' + '开始时间' + '<br/>' + '结束时间';
                                } else if (status[index] == "W") {
                                    return this.x + '<br/>' + '状态' + ':' + '等待' + '<br/>' + '开始时间' + '<br/>' + '结束时间';
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
                yAxis: {
                    type: 'datetime',
                    title: {
                        text: ''
                    },
                    gridLineWidth: 0,
                    labels: {
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

                                    // that.$emit('viewIn', '/currentJob', '当前作业');
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

            })
        },
        // 毫秒数
        dateToMill(date) {
            date = date.replace(new RegExp("-", "gm"), "/");
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
            this.chartdataChartTwo.rows = [];
            this.chartdataChartOne.rows = [];
            this.showOrhidden = false;
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
            this.$confirm('确定停止' + mess + '工程?', '提示', {
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
</style>
