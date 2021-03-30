<template>
<div id="agentList">
    <el-row class='topTitle'>
        <span class='el-icon-location'>数据源Agent列表</span>
        <router-link to="/collectmonitor">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <el-table stripe :data="AgenttableData" border style="width: 100%">
        <el-table-column prop="datasource_name" label="数据源" width="180" align="center"></el-table-column>

        <el-table-column label="数据库 Agent" align="center">

            <template slot-scope="scope">
                <el-button v-if="scope.row.dbflag!=0" type="success" size="mini" @click="dialogTableVisible = true;clickTaskflag(scope.row.source_id,getValue.ShuJuKu)">任务配置</el-button>
            </template>
        </el-table-column>
        <el-table-column label="数据文件 Agent" align="center">
            <template slot-scope="scope">
                <el-button v-if="scope.row.dfflag!=0" type="success" size="mini" @click="dialogTableVisible = true;clickTaskflag(scope.row.source_id,getValue.DBWenJian)">任务配置</el-button>
            </template>
        </el-table-column>
        <el-table-column label="非结构化 Agent" align="center">
            <template slot-scope="scope">
                <el-button v-if="scope.row.nonstructflag!=0" type="success" size="mini" @click="dialogTableVisible = true;clickTaskflag(scope.row.source_id,getValue.WenJianXiTong)">任务配置</el-button>
            </template>
        </el-table-column>
        <el-table-column label="半结构化 Agent" align="center">
            <template slot-scope="scope">
                <el-button v-if="scope.row.halfstructflag!=0" type="success" size="mini" @click="dialogTableVisible = true;clickTaskflag(scope.row.source_id,getValue.DuiXiang)">任务配置</el-button>
            </template>
        </el-table-column>
        <el-table-column label="Ftp Agent" align="center">
            <template slot-scope="scope">
                <el-button v-if="scope.row.ftpflag!=0" type="success" size="mini" @click="dialogTableVisible = true;clickTaskflag(scope.row.source_id,getValue.FTP)">任务配置</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 点击任务配置显示弹框-->
    <el-dialog title :visible.sync="dialogTableVisible" width="80%">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">数据源名称:{{ sourceName }}</span>
            <span class="dialogtoptxt">采集类型: <p class="dialogtopname">{{agentType }}</p></span>
        </div>
        <el-table stripe :data="gridData2" border size="medium">
            <el-table-column property="agent_name" label="Agent名称" width="150px" align="center"></el-table-column>
            <el-table-column property="agent_ip" label="Agent IP" align="center"></el-table-column>

            <el-table-column property="agent_port" label="Agent端口" align="center"></el-table-column>
            <el-table-column property="agent_type" label="采集类型" align="center"></el-table-column>
            <el-table-column label="Agent连接状态" align="center">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.agent_status=='未连接'" type="danger">{{scope.row.agent_status}}</el-tag>
                    <el-tag v-else-if="scope.row.agent_status=='已连接'" type="success">{{scope.row.agent_status}}</el-tag>
                    <el-tag v-else>{{scope.row.agent_status}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column property="AgentOpt" label="操作" width="350px" align="center">
                <template slot-scope="scope">
                    <el-row class='optheight'>
                        <el-col :span="8">
                            <el-button type="success" size="mini" @click="addtask(scope.row,sourceName)" icon='el-icon-plus'>新增任务</el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="primary" size="mini" @click="taskManagement(scope.row)" icon='el-icon-s-cooperation'>任务管理</el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="warning" size="mini" @click="tasklogFun(scope.row)" icon="el-icon-search">日志查看</el-button>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false" type="danger" size="medium">取 消</el-button>
            <el-button type="primary" @click="dialogTableVisible = false" size="medium">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 点击任务管理出现弹层 -->
    <el-dialog title="数据采集任务" :visible.sync="dialogTableTask" width="70%" class="taskEx">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">数据采集任务</span>
        </div>
        <!-- <el-button type="success" size="mini" style="margin: 10px 0;">全部发送</el-button> -->
        <el-table stripe :data="taskMang" border size="medium" :empty-text="tableloadingInfo">
            <el-table-column property="task_name" label="任务名称" width="140px" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column property="agent_type" label="采集类型" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column property='collect_type' v-if="collect_type==true" label="采集方式" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.collect_type=='数据库采集'" type="info">{{scope.row.collect_type}}</el-tag>
                    <el-tag v-else-if="scope.row.collect_type=='数据库抽数'" type="success">{{scope.row.collect_type}}</el-tag>
                    <el-tag v-else type="primary">{{scope.row.collect_type}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                    <template v-if="scope.row.agent_type==='数据库Agent' || scope.row.agent_type==='数据文件Agent' || scope.row.agent_type==='对象Agent'">
                        <el-button type="text" @click="taskEditBtn(scope.row,sourceName)" class='editcolor'>编辑</el-button>
                        <el-button type="text" @click="taskDelBtn(agentType,scope.row)" class="delcolor">删除</el-button>
                        <el-button type="text" v-show="scope.row.collect_type!='贴元登记'" @click="taskSendBtn(agentType,scope.row)" class="sendcolor">发送</el-button>
                        <el-button type="text" v-if="scope.row.collect_type=='数据库抽数'||scope.row.agent_type=='数据文件Agent'" class="workcolor" @click="ProdeceJobsFun(scope.row)">生成作业</el-button>
                        <!-- <el-button type="text" v-show="scope.row.collect_type!='贴源登记'" class="workcolor">生成作业</el-button> -->
                        <!-- <el-button v-if="agentType == type.ShuJuKu" type="text" @click="downTaskData(scope.row)" class="sendcolor">下载数据字典</el-button> -->
                        <el-button v-if="scope.row.collect_type=='数据库抽数'" type="text" @click="finishDialogVisible = true;settingDownloadDirc(agentType,scope.row)" class="sendcolor">下载数据字典</el-button>
                    </template>
                    <template v-if="scope.row.agent_type==='文件系统Agent'">
                        <el-button type="text" @click="taskEditBtn(scope.row,sourceName)" class='editcolor'>编辑</el-button>
                        <el-button type="text" @click="taskDelBtn(agentType,scope.row)" class="delcolor">删除</el-button>
                        <el-button type="text" @click="fileCollectTaskSendBtn(agentType,scope.row)" class="workcolor">发送</el-button>
                        <el-button type="text" @click="executeImmediately(agentType,scope.row)" class="sendcolor">立即执行</el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableTask = false" type="danger" size="medium">关闭</el-button>
        </div>
    </el-dialog>
    <!--生成作业  -->
    <el-dialog title="生成作业" :visible.sync="dialogProdeceJobs" width="50%" class="alltable">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">生成作业</span>
        </div>
        <el-form ref="ProdeceJobsData" :model="ProdeceJobsData" label-width="240px" text-align="center">
            <el-form-item label="选择工程" prop="project" :rules="rule.selected">
                <el-select placeholder="选择工程" filterable v-model="ProdeceJobsData.project" style="width: 190px;" size="medium">
                    <el-option v-for="(item,index) in Allproject" :key="index" :label="item.etl_sys_cd+' ('+item.etl_sys_name+')'" :value="item.etl_sys_cd"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择任务" prop="task" :rules="rule.selected">
                <el-select placeholder="选择任务" filterable v-model="ProdeceJobsData.task" style="width: 190px;" size="medium" @focus="getbyidworkFun()">
                    <el-option v-for="(item,index) in Alltask" :key="index" :label="item.sub_sys_cd+' ('+item.sub_sys_desc+')'" :value="item.sub_sys_cd"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" @click="dialogProdeceJobs=false" size="mini">取 消</el-button>
            <el-button type="primary" size="mini" @click="workSubmitFun()">确 定</el-button>
        </div>
    </el-dialog>
    <!--下载数据字典时,数据库的采集任务中或许存在着SQL占位符,所以这里需要填写-->
    <el-dialog title="下载数据字典" :visible.sync="finishDialogVisible" width="40%">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">下载数据字典</span>
        </div>
        <div>
            <el-form>
                <el-form-item>
                    SQL中如果存在占位符,请填写占位符的值...多个参数之间请使用{{ParamPlaceholder}}进行分割,例如: column1=123{{ParamPlaceholder}}column2=456
                    <el-input type="textarea" placeholder="采集任务中的SQL占位参数值" v-model="sqlParam" style="width:100%;"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="finishDialogVisible = false" type="danger" size="mini">取 消</el-button>
            <el-button type="primary" @click="downloadDirc()" size="mini">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 发送的弹框 立即启动-->
    <el-dialog title="设置数据跑批日期" :visible.sync="sendLJQDDialogVisible" width="40%">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">设置数据跑批日期</span>
        </div>
        <div>
            <el-form>
                <el-form-item>
                    <el-date-picker type="date" value-format="yyyyMMdd" placeholder="选择启动日期" v-model="etl_date" style="width:100%;"></el-date-picker>
                </el-form-item>
                <el-form-item v-if="dbtype!='数据文件Agent'">
                    SQL中如果存在占位符,请填写占位符的值...多个参数之间请使用{{ParamPlaceholder}}进行分割,例如: column1=123{{ParamPlaceholder}}column2=456
                    <el-input type="textarea" placeholder="采集任务中的SQL占位参数值" v-model="sqlParam" style="width:100%;"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="sendLJQDDialogVisible = false" type="danger" size="mini">取 消</el-button>
            <el-button type="primary" @click="sendLJQDSubmit()" size="mini">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 发送弹框 发送作业 -->
    <el-dialog title="提示信息" :visible.sync="sendZYDialogVisible" width="30%">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">提示信息</span>
        </div>
        <span>设置完成！请等待Agent运行...不运行请点击取消或按下Esc键</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="sendZYDialogVisible = false" type="danger" size="mini">取 消</el-button>
            <el-button type="primary" @click="sendZYSubmit()" size="mini">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
import * as agentList from "./agentList";
import * as message from "@/utils/js/message";
import * as unstructuredAgentFunc from "../unstructuredAgent/unstructuredAgent";
let rowName;
export default {
    data() {
        return {
            sqlParam: '',
            etl_date: '',
            AgenttableData: [],
            gridData2: [],
            taskMang: [],
            tableloadingInfo: '数据加载中...',
            rule: validator.default,
            dialogTableVisible: false,
            dialogProdeceJobs: false,
            finishDialogVisible: false,
            agentType: "",
            sourceName: "",
            agentStatus: "",
            dialogTableTask: false,
            CollectType: [],
            AgentStatus: [],
            ProdeceJobsData: {
                project: '',
                task: ''
            },
            Allproject: [],
            Alltask: [],
            getValue: {},
            sqlParam: '',
            type: '',
            id: '',
            ParamPlaceholder: '',
            CollectTypeData: [],
            collect_type: false,
            sendLJQDDialogVisible: false,
            sendZYDialogVisible: false,
            dbid: '',
            dbtype: '',
            dbcollectType: '',
            checkAgentType: '',
            database_id: ''
        };
    },
    mounted() {
        agentList.getAgentInfoList().then(res => {
            this.AgenttableData = res.data ? res.data : [];
        });
        this.getType();
        this.getStatus();
        this.getTypeValue()
        agentList.getSqlParamPlaceholder().then(res => {
            this.ParamPlaceholder = res.data
        })
        let params = {};
        params["category"] = "CollectType";
        this.$Code.getCategoryItems(params).then(res => {
            this.CollectTypeData = res.data
        });
    },
    methods: {
        //获取类型
        getType() {
            // CollectType
            let params = {};
            params["category"] = "AgentType";
            this.$Code.getCategoryItems(params).then(res => {
                this.CollectType = res.data ? res.data : [];
            });
        },
        getTypeValue() {
            // CollectType
            let params = {};
            params["category"] = "AgentType";
            this.$Code.getCodeItems(params).then(res => {
                this.getValue = res.data
            });
        },
        // 获取状态
        getStatus() {
            let params = {};
            params["category"] = "AgentStatus";
            this.$Code.getCategoryItems(params).then(res => {
                this.AgentStatus = res.data ? res.data : [];
            });
        },
        clickTaskflag(id, type) {
            this.checkAgentType = type
            this.agentType = "";
            let params = {};
            params["sourceId"] = id;
            params["agentType"] = type;
            agentList.getAgentInfo(params).then(res => {
                let arrdata = res.data ? res.data : [];
                for (let i = 0; i < this.CollectType.length; i++) {
                    if (this.CollectType[i].code == arrdata[0].agent_type) {
                        this.agentType = this.CollectType[i].value;
                    }
                }
                for (let i = 0; i < arrdata.length; i++) {
                    for (let m = 0; m < this.CollectType.length; m++) {
                        if (arrdata[i].agent_type == this.CollectType[m].code) {
                            arrdata[i].agent_type = this.CollectType[m].value;
                        }
                    }
                    for (let n = 0; n < this.AgentStatus.length; n++) {
                        if (arrdata[i].agent_status == this.AgentStatus[n].code) {
                            arrdata[i].agent_status = this.AgentStatus[n].value;
                        }
                    }
                }
                this.sourceName = arrdata[0].datasource_name;
                this.gridData2 = arrdata;
            });
        },
        taskManagement(row) {
            rowName = row.agent_name;
            this.collect_type = row.agent_type == '数据库Agent' ? true : false
            this.dialogTableTask = true;
            let params = {};
            params["sourceId"] = row.source_id;
            params["agentId"] = row.agent_id;
            agentList.getTaskInfo(params).then(res => {
                let arrdata = res ? res.data : [];
                for (let i = 0; i < arrdata.length; i++) {
                    arrdata[i].agent_type = row.agent_type;
                    for (let j = 0; j < this.CollectTypeData.length; j++) {
                        if (arrdata[i].collect_type == this.CollectTypeData[j].code) {
                            arrdata[i].collect_type = this.CollectTypeData[j].value
                        }
                    }
                }
                this.taskMang = arrdata;
                if (arrdata.length > 0) {
                    this.tableloadingInfo = ''
                } else {
                    this.tableloadingInfo = '暂无数据'
                }
            });
        },
        // 任务管理里面的编辑  根据不同类型跳转不同页面
        taskEditBtn(row, sourceName) {
            for (let i = 0; i < this.CollectType.length; i++) {
                if (this.CollectType[i].value == row.agent_type) {
                    this.agentType = this.CollectType[i].code;
                    this.$router.push({
                        path: "collection" + this.CollectType[i].code + "_1",
                        query: {
                            agent_id: row.agent_id,
                            id: row.id,
                            source_id: row.source_id,
                            rowName: this.$Base64.encode(rowName),
                            source_name: this.$Base64.encode(sourceName),
                            edit: "yes"
                        }
                    });
                }
            }
        },
        // 新增任务  根据不同类型跳转不同页面
        addtask(row, sourceName) {
            for (let i = 0; i < this.CollectType.length; i++) {
                if (this.CollectType[i].value == row.agent_type) {
                    this.agentType = this.CollectType[i].code;
                    this.$router.push({
                        path: "collection" + this.CollectType[i].code + "_1",
                        query: {
                            agent_name: this.$Base64.encode(row.agent_name),
                            agent_id: row.agent_id,
                            source_id: row.source_id,
                            source_name: this.$Base64.encode(sourceName),
                        }
                    });
                }
            }
        },
        // 日志页面
        tasklogFun(row) {
            this.$router.push({
                path: "/taskLog",
                query: {
                    agent_id: row.agent_id,
                }
            });
            /* for (let i = 0; i < this.CollectType.length; i++) {
                if (this.CollectType[i].value == row.agent_type) {
                    this.$router.push({
                        path: "taskLog" + this.CollectType[i].code,
                        query: {
                            agent_id: row.agent_id,
                        }
                    });
                }

            } */
        },
        // 删除任务
        taskDelBtn(type, row) {
            for (let i = 0; i < this.CollectType.length; i++) {
                if (this.CollectType[i].value == type) {
                    if (this.CollectType[i].code == '1') {
                        message.confirmMsg('确定删除吗').then(res => {
                            let params = {};
                            params["collectSetId"] = row.id;
                            agentList.deleteDBTask(params).then(res => {
                                this.taskManagement(row);
                                message.deleteSuccess(res);
                            });
                        }).catch(() => {})
                    } else if (this.CollectType[i].code == '2') {
                        //文件系统agent--非结构化deleteNonStructTask
                        message.confirmMsg('确定删除吗').then(res => {
                            let params = {};
                            params["collectSetId"] = row.id;
                            agentList.deleteNonStructTask(params).then(res => {
                                this.taskManagement(row);
                                message.deleteSuccess(res);
                            });
                        }).catch(() => {})
                    } else if (this.CollectType[i].code == '3') {
                        //ftpagent
                        message.confirmMsg('确定删除吗').then(res => {
                            let params = {};
                            params["collectSetId"] = row.id;
                            agentList.deleteFTPTask(params).then(res => {
                                this.taskManagement(row);
                                message.deleteSuccess(res);
                            });
                        }).catch(() => {})
                    } else if (this.CollectType[i].code == '4') {
                        //数据文件agent
                        message.confirmMsg('确定删除吗').then(res => {
                            let params = {};
                            params["collectSetId"] = row.id;
                            agentList.deleteDFTask(params).then(res => {
                                this.taskManagement(row);
                                message.deleteSuccess(res);
                            });
                        }).catch(() => {})
                    } else if (this.CollectType[i].code == '5') {
                        //对象agent--半结构化deleteHalfStructTask
                        message.confirmMsg('确定删除吗').then(res => {
                            let params = {};
                            params["collectSetId"] = row.id;
                            agentList.deleteHalfStructTask(params).then(res => {
                                this.taskManagement(row);
                                message.deleteSuccess(res);
                            });
                        }).catch(() => {})
                    }

                }
            }
        },
        // 发送
        taskSendBtn(type, row) {
            let params = {},
                countNum = '';
            params["colSetId"] = row.id;
            this.dbid = row.id
            this.dbtype = type
            this.dbcollectType = row.collect_type
            agentList.startJobType(params).then(res => {
                if (res.data) {
                    //立即启动
                    this.sendLJQDDialogVisible = true
                    this.startButtonFun()
                } else {
                    //生成作业
                    this.sendZYDialogVisible = true
                }
            })
            // 
        },
        //文件采集发送任务
        fileCollectTaskSendBtn(agentType, row) {
            message.confirmMsg('确定发送吗?').then(res => {
                let fcs_id = row.id;
                unstructuredAgentFunc.executeJob({
                    'fcs_id': fcs_id,
                    'execute_type': 'execute_etl'
                }).then((res) => {
                    if (res.success) {
                        this.$Msg.customizTitle('发送成功!', 'success')
                        this.executeDialog = false;
                        this.$router.push({
                            name: "agentList"
                        })
                    } else {
                        this.executeDialog = false;
                    }
                })
            }).catch(() => {});
        },
        // 立即执行任务
        executeImmediately(agentType, row) {
            message.confirmMsg('确定立即执行吗?').then(res => {
                let fcs_id = row.id;
                unstructuredAgentFunc.executeJob({
                    'fcs_id': fcs_id,
                    'execute_type': 'execute_immediately'
                }).then((res) => {
                    if (res.success) {
                        this.$Msg.customizTitle('立即运行成功!', 'success')
                        this.executeDialog = false;
                        this.$router.push({
                            name: "agentList"
                        })
                    } else {
                        this.executeDialog = false;
                    }
                })
            }).catch(() => {});
        },
        ProdeceJobsFun(row) {
            this.database_id = row.id
            this.dialogProdeceJobs = true
            agentList.getProjectInfo().then(res => {
                this.$refs.ProdeceJobsData.resetFields()
                this.Allproject = res.data
            });
        },
        //点击任务编号按钮
        getbyidworkFun() {
            //调接口显示内容
            if (this.ProdeceJobsData.project != undefined && this.ProdeceJobsData.project != '') {
                agentList.getTaskInfoByTaskId({
                    'taskId': this.ProdeceJobsData.project
                }).then(res => {
                    this.Alltask = res.data
                })
            } else {
                this.$Msg.customizTitle("工程编号未选择", 'error')
            }

        },
        // 生成作业提交按钮
        workSubmitFun() {
            agentList.saveEtlJobs({
                database_id: this.database_id,
                agent_type: this.checkAgentType,
                etl_sys_cd: this.ProdeceJobsData.project,
                sub_sys_cd: this.ProdeceJobsData.task
            }).then(res => {
                if (res && res.success) {
                    this.$Msg.customizTitle("作业生成完成")
                    this.dialogProdeceJobs = false
                }
            })
        },
        downloadDirc() {
            for (let i = 0; i < this.CollectType.length; i++) {
                if (this.CollectType[i].value == this.type) {
                    if (this.CollectType[i].code == this.getValue.ShuJuKu) {
                        agentList.sendJDBCCollectTaskById({
                            'colSetId': this.id,
                            'is_download': 'true',
                            'sqlParam': this.sqlParam
                        }).then(res => {
                            if(res.status === 200) {
                                const blob = new Blob([JSON.stringify(res.data)]);
                                let filename = res.headers["content-disposition"].split('=')[1];
                                if (window.navigator.msSaveOrOpenBlob) {
                                    // 兼容IE10
                                    navigator.msSaveBlob(blob, filename);
                                } else {
                                    //  chrome/firefox
                                    let aTag = document.createElement("a");
                                    aTag.download = filename;
                                    aTag.href = URL.createObjectURL(blob);
                                    if (aTag.all) {
                                        aTag.click();
                                    } else {
                                        //  兼容firefox
                                        let evt = document.createEvent("MouseEvents");
                                        evt.initEvent("click", true, true);
                                        aTag.dispatchEvent(evt);
                                    }
                                    URL.revokeObjectURL(aTag.href);
                                }
                                this.finishDialogVisible = false
                            }
                        });
                    }
                }
            }
        },
        settingDownloadDirc(type, row) {
            this.type = type
            this.id = row.id
        },
        // 点击发送根据返回值不同显示不统
        startButtonFun() {
            // this.sendLJQDDialogVisible = true
            let date = new Date()
            this.etl_date = date.getFullYear() + '' + (date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '' + (date.getDate() > 9 ? date.getDate() : '0' + (date.getDate()))
        },
        //发送-立即启动
        sendLJQDSubmit() {
            let type = this.dbtype,
                dbid = this.dbid
            for (let i = 0; i < this.CollectType.length; i++) {
                if (this.CollectType[i].value == type) {
                    if (this.CollectType[i].code == '1') {
                        if (this.dbcollectType == '数据库抽数') {
                            let params = {};
                            params["colSetId"] = dbid;
                            params["etl_date"] = this.etl_date;
                            params["sqlParam"] = this.sqlParam;
                            agentList.sendJDBCCollectTaskById(params).then(res => {
                                if (res.success) {
                                    this.sendLJQDDialogVisible = false
                                    message.sendSuccess(res);
                                }
                            });
                        } else if (this.dbcollectType == '数据库采集') {
                            agentList
                                .sendCollectDatabase({
                                    colSetId: dbid,
                                    etl_date: this.etl_date,
                                    sqlParam: this.sqlParam
                                })
                                .then(res => {
                                    if (res.success) {
                                        this.sendLJQDDialogVisible = false
                                        message.sendSuccess(res);
                                    }
                                })
                        }
                    } else if (this.CollectType[i].code == '2') {
                        //文件系统agent--非结构化deleteNonStructTask
                        message.confirmMsg('确定发送吗').then(res => {
                            let params = {};
                            params["colSetId"] = dbid;
                            /*   agentList.sendDBCollctTaskById(params).then(res => {
                                  message.sendSuccess(res);
                              }); */
                        }).catch(() => {})
                    } else if (this.CollectType[i].code == '3') {
                        //ftpagent
                        message.confirmMsg('确定发送吗').then(res => {
                            let params = {};
                            params["colSetId"] = dbid;
                            /*   agentList.sendDBCollctTaskById(params).then(res => {
                                  message.sendSuccess(res);
                              }); */
                        }).catch(() => {})
                    } else if (this.CollectType[i].code == '4') {
                        //数据文件agent
                        message.confirmMsg('确定发送吗').then(res => {
                            let params = {};
                            params["colSetId"] = dbid;
                            params["etl_date"] = this.etl_date;
                            agentList.sendDBCollectTaskById(params).then(res => {
                                if (res.success) {
                                    this.sendLJQDDialogVisible = false
                                    message.sendSuccess(res);
                                }
                            });
                        }).catch(() => {})
                    } else if (this.CollectType[i].code == '5') {
                        //对象agent--半结构化deleteHalfStructTask
                        message.confirmMsg('确定发送吗').then(res => {
                            let params = {};
                            params["colSetId"] = dbid;
                            /*   agentList.sendDBCollctTaskById(params).then(res => {
                                  message.sendSuccess(res);
                              }); */
                        }).catch(() => {})
                    }

                }
            }
        },
        // 发送--作业
        sendZYSubmit() {
            let type = this.dbtype,
                dbid = this.dbid
            for (let i = 0; i < this.CollectType.length; i++) {
                if (this.CollectType[i].value == type) {
                    if (this.CollectType[i].code == '1') {
                        if (this.dbcollectType == '数据库抽数') {
                            let params = {};
                            params["colSetId"] = dbid;
                            agentList.sendJDBCCollectTaskById(params).then(res => {
                                if (res.success) {
                                    this.sendZYDialogVisible = false
                                    message.sendSuccess(res);
                                }
                            });
                        } else if (this.dbcollectType == '数据库采集') {
                            agentList
                                .sendCollectDatabase({
                                    colSetId: this.dbid
                                })
                                .then(res => {
                                    if (res.success) {
                                        this.sendZYDialogVisible = false
                                        message.sendSuccess(res);
                                    }
                                });
                        }
                    } else if (this.CollectType[i].code == '2') {
                        //文件系统agent--非结构化deleteNonStructTask
                        message.confirmMsg('确定发送吗').then(res => {
                            let params = {};
                            params["colSetId"] = dbid;
                            /*   agentList.sendDBCollctTaskById(params).then(res => {
                                  message.sendSuccess(res);
                              }); */
                        }).catch(() => {})
                    } else if (this.CollectType[i].code == '3') {
                        //ftpagent
                        message.confirmMsg('确定发送吗').then(res => {
                            let params = {};
                            params["colSetId"] = dbid;
                            /*   agentList.sendDBCollctTaskById(params).then(res => {
                                  message.sendSuccess(res);
                              }); */
                        }).catch(() => {})
                    } else if (this.CollectType[i].code == '4') {
                        //数据文件agent
                        message.confirmMsg('确定发送吗').then(res => {
                            let params = {};
                            params["colSetId"] = dbid;
                            agentList.sendDBCollectTaskById(params).then(res => {
                                if (res.success) {
                                    this.sendZYDialogVisible = false
                                    message.sendSuccess(res);
                                }
                            });
                        }).catch(() => {})
                    } else if (this.CollectType[i].code == '5') {
                        //对象agent--半结构化deleteHalfStructTask
                        message.confirmMsg('确定发送吗').then(res => {
                            let params = {};
                            params["colSetId"] = dbid;
                            /*   agentList.sendDBCollctTaskById(params).then(res => {
                                  message.sendSuccess(res);
                              }); */
                        }).catch(() => {})
                    }

                }
            }
        },
    }
};
</script>

<style scoped>
.taskEx>>>.el-dialog__body {
    padding: 8px 20px;
}

.taskEx>>>.el-table__row>td {
    padding: 0;
}

.title-sourceName,
.title-agentType {
    font-size: 18px;
}

.successlink {
    color: rgb(3, 97, 3);
}

.unlink {
    color: red;
}

.linking {
    color: #000;
}

.optheight {
    height: 20px;
    line-height: 20px;
}
</style>
