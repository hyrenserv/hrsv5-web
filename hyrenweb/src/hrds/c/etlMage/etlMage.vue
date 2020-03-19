<template>
<div class="loindex">
    <el-row>
        <i class="block_icon fa fa-briefcase fa-globe blue"></i>
        <span>工程管理</span>
        <el-button type="primary" class="el1 els" @click="addProject" size="small">
            <i class="block_icon fa fa-plus-circle"></i>添加工程
        </el-button>
        <div class="lines"></div>
    </el-row>
    <el-tabs class="tabes" v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="工程信息" name="first">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" label="序号" width="70px" align='center'>
                </el-table-column>
                <el-table-column prop="etl_sys_cd" label="工程编号" width="110px" align='center'>
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="details(scope.$index, scope.row)">
                            {{scope.row.etl_sys_cd}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="etl_sys_name" label="工程名称" width="150px" align='center'>
                </el-table-column>
                <el-table-column prop="comments" label="工程描述" width="220px" align='center'>
                </el-table-column>
                <el-table-column prop="curr_bath_date" label="当前批量日期" width="200px" align='center'>
                </el-table-column>
                <el-table-column label="操作" align='center'>
                    <template slot-scope="scope">
                        <el-button size="mini" icon="el-icon-edit" title="编辑" circle type="primary" @click="handleEdit(scope.$index, scope.row)">
                        </el-button>
                        <el-button size="mini" icon="el-icon-thumb" title="部署Agent" circle type="warning" @click="handleDeploy(scope.$index, scope.row)">
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
                                    <i @click="fullScreen" class="el-icon-full-screen"></i>
                                </el-tooltip>
                            </span>
                        </span>
                        <p class="span10">批量运行状态</p>
                        <p class="span11">批量日期：{{item.bathdate}}</p>
                        <p :id="`radar${index}`" :style="{ height: '300px'}"></p>
                    </div>
                </el-col>
            </draggable>
        </el-tab-pane>
    </el-tabs>
    <!-- 添加/编辑工程模态框 -->
    <el-dialog :title="projectTitle" :visible.sync="dialogFormVisibleAdd" width="40%">
        <el-form :model="formAdd" ref="formAdd" class="demo-ruleForm">
            <el-form-item label="工程编号" prop="etl_sys_cd" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.etl_sys_cd" autocomplete="off" placeholder="工程编号"></el-input>
            </el-form-item>
            <el-form-item label="工程名称" prop="etl_sys_name" :rules="filter_rules([{required: true}])">
                <el-input v-model="formAdd.etl_sys_name" autocomplete="off" placeholder="工程名称"></el-input>
            </el-form-item>
            <el-form-item label="工程描述" prop="comments">
                <el-input type="textarea" v-model="formAdd.comments" autocomplete="off" placeholder="工程描述"></el-input>
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
                <el-input v-model="formDeploy.etl_sys_cd" disabled></el-input>
            </el-form-item>
            <el-form-item label="Agent服务器IP" prop="etl_serv_ip" :rules="filter_rules([{required: true}])">
                <el-input v-model="formDeploy.etl_serv_ip"></el-input>
            </el-form-item>
            <el-form-item label="Agent服务器用户名" prop="user_name" :rules="filter_rules([{required: true}])">
                <el-input v-model="formDeploy.user_name"></el-input>
            </el-form-item>
            <el-form-item label="Agent服务器密码" prop="user_pwd" :rules="filter_rules([{required: true}])">
                <el-input v-model="formDeploy.user_pwd" show-password></el-input>
            </el-form-item>
            <el-form-item label="Agent服务器部署路径" prop="serv_file_path" :rules="filter_rules([{required: true}])">
                <el-input v-model="formDeploy.serv_file_path"></el-input>
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
                    <el-radio label="YES"></el-radio>
                    <el-radio label="NO"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否日切" prop="isAutoShift">
                <el-radio-group v-model="formStartCON.isAutoShift">
                    <el-radio label="YES"></el-radio>
                    <el-radio label="NO"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="当前批量日期" prop="curr_bath_date" :rules="filter_rules([{required: true}])">
                <el-date-picker v-model="formStartCON.curr_bath_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleCON" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="startCON" size="mini">启动</el-button>
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
    <el-dialog title="CONTROL日志信息?" :visible.sync="dialogFormVisibleRecordCON" width="60%">
        <el-form :model="formRecordCON" ref="formRecordCON" class="demo-form-inline" :inline="true" label-width="100px">
            <el-form-item label="工程编号" prop="readNum">
                <el-input v-model="formRecordCON.readNum"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onViewCON">查看</el-button>
            </el-form-item>
            <el-form-item label="跑批日期" prop="curr_bath_date">
                <el-date-picker v-model="formRecordCON.curr_bath_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="downRecordCON">下载日志</el-button>
            </el-form-item>
        </el-form>
        <div style="margin-top:-25px">
            <el-divider></el-divider>
            <span>{{formRecordCON.project_records}}</span>
            <el-divider></el-divider>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeCON" size="mini" type="danger">关闭</el-button>
        </div>
    </el-dialog>
    <!-- TRIGGER日志模态框 -->
    <el-dialog title="TRIGGER日志信息?" :visible.sync="dialogFormVisibleRecordTRI" width="60%">
        <el-form :model="formRecordTRI" ref="formRecordTRI" class="demo-form-inline" :inline="true" label-width="100px">
            <el-form-item label="工程编号" prop="readNum">
                <el-input v-model="formRecordTRI.readNum"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onViewTRI">查看</el-button>
            </el-form-item>
            <el-form-item label="跑批日期" prop="curr_bath_date">
                <el-date-picker v-model="formRecordTRI.curr_bath_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="downRecordTRI">下载日志</el-button>
            </el-form-item>
        </el-form>
        <div style="margin-top:-25px">
            <el-divider></el-divider>
            <span>{{formRecordTRI.project_records}}</span>
            <el-divider></el-divider>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeTRI" size="mini" type="danger">关闭</el-button>
        </div>
    </el-dialog>
    <!-- 调度监控模态框 -->
    <el-dialog title="TRIGGER日志信息?" :visible.sync="dialogMointer" width="60%">
        <div>
            
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button size="mini" type="danger">关闭</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as etlMageAllFun from "./etlMage";
import regular from "@/utils/js/regular";
import VeLine from 'v-charts/lib/histogram.common';
import Vuex from 'vuex';
import draggable from 'vuedraggable'
import Sortable from 'sortablejs'
export default {
    components: {
        draggable,
        Sortable
    },
    data() {

        return {
            dialogFormVisibleAdd: false,
            dialogFormVisibleDeploy: false,
            dialogFormVisibleStartCON: false,
            dialogFormVisibleStartTRI: false,
            dialogFormVisibleRecordCON: false,
            dialogFormVisibleRecordTRI: false,
            dialogMointer:false,
            projectTitle: '',
            activeName: 'first',
            formAdd: {
                etl_sys_cd: "",
                etl_sys_name: "",
                comments: "",
            },
            chartdataChartOne: {
                columns: ['etl_sys_name', '完成', '等待', '错误', '暂停', '运行', '挂起'],
                rows: []
            },
            chartExtendChartOne: {
                series: {
                    //柱子宽度
                    barWidth: 15
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
            listdata: []
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
                this.tableData = res.data;
            });
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
                    this.chartdataChartOne.rows.push(item)
                    arry.push(item);
                    let myChart = this.$echarts.init(document.getElementById(`radar${index}`));
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
                    etl_sys_name: row.etl_sys_name,
                    etl_sys_cd: row.etl_sys_cd,
                }
            });
        },
        //添加/修改工程模态框保存按钮
        add(formName) {
            this.dialogFormVisibleAdd = false;
            if (this.projectTitle == '添加工程') {
                let params = {};
                params["etl_sys_cd"] = this.formAdd.etl_sys_cd;
                params["etl_sys_name"] = this.formAdd.etl_sys_name;
                params["comments"] = this.formAdd.comments;
                etlMageAllFun.addEtlSys(params).then(res => {
                    this.getTable();
                });
            } else if (this.projectTitle == '修改工程') {
                let params = {};
                params["etl_sys_cd"] = this.formAdd.etl_sys_cd;
                params["etl_sys_name"] = this.formAdd.etl_sys_name;
                params["comments"] = this.formAdd.comments;
                etlMageAllFun.updateEtlSys(params).then(res => {
                    this.getTable();
                });
            }
            this.formAdd = {};
        },
        //添加/修改工程模态框取消按钮
        cancleAdd() {
            // 表单清空
            this.formAdd = {};
            // 隐藏对话框
            this.dialogFormVisibleAdd = false;
        },
        //部署Agent工程模态框保存按钮
        saveDeploy() {
            if (this.formDeploy.etl_sys_cd == '' || this.formDeploy.etl_serv_ip == '' || this.formDeploy.serv_file_path == '' || this.formDeploy.user_name == '' || this.formDeploy.user_pwd == '') {
                this.$message({
                    message: '请输入完整信息',
                    type: 'warning'
                });
            } else {
                let params = {};
                params["etl_sys_cd"] = this.formDeploy.etl_sys_cd;
                params["etl_serv_ip"] = this.formDeploy.etl_serv_ip;
                params["serv_file_path"] = this.formDeploy.serv_file_path;
                params["user_name"] = this.formDeploy.user_name;
                params["user_pwd"] = this.formDeploy.user_pwd;
                etlMageAllFun.deployEtlJobScheduleProject(params).then(res => {
                    this.getTable();
                });
                this.dialogFormVisibleDeploy = false;
                this.formDeploy = {};
            }
        },
        //部署Agent工程模态框取消按钮
        cancleDeploy() {
            this.dialogFormVisibleDeploy = false;
            this.formDeploy = {};
        },
        //启动CONTROL模态框启动按钮
        startCON() {
            if (this.formStartCON.etl_sys_cd == '' || this.formStartCON.isResumeRun == '' || this.formStartCON.isAutoShift == '' || this.formStartCON.curr_bath_date == '') {
                this.$message({
                    message: '请输入完整信息',
                    type: 'warning'
                });
            } else {
                let params = {};
                params["etl_sys_cd"] = this.formStartCON.etl_sys_cd;
                params["isResumeRun"] = this.formStartCON.isResumeRun;
                params["isAutoShift"] = this.formStartCON.isAutoShift;
                params["curr_bath_date"] = this.formStartCON.curr_bath_date;
                etlMageAllFun.startControl(params).then(res => {
                    this.getTable();
                });
                this.dialogFormVisibleStartCON = false;
                this.formStartCON = {};
            }
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
                this.getTable();
            });
            this.formStartTRI = {};
            this.dialogFormVisibleStartTRI = false;
        },
        //启动TRIGGER模态框取消按钮
        cancleTRI() {
            this.dialogFormVisibleStartTRI = false;
            this.formStartTRI = {};
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
            this.getEtlSys(row.etl_sys_cd);
            this.dialogFormVisibleDeploy = true;
        },
        //表格启动CONTROL按钮
        handleStartco(index, row) {
            this.dialogFormVisibleStartCON = true;
            this.getEtlSys(row.etl_sys_cd);
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
        fullScreen() {
            this.dialogMointer = true;
            console.log('i am click')
        }
    },
};
</script>

<style scoped>
.lines {
    margin-top: 10px;
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 15px;
}

.tabes {
    margin-top: 25px;
}

.el-row {
    height: 64px;
    line-height: 64px;
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
    margin-top: 18px;
}

.el1 {
    margin-left: 10px;
}

.item {
    float: right;
}

.loindex .span10 {
    text-align: center;
    margin-bottom: 10px;
}

.loindex .span11 {
    text-align: center;
    margin-bottom: 10px;
}

.loindex .span10 {
    margin-top: 30px;
    font-size: 20px;
    margin-bottom: 6px;
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
</style>
