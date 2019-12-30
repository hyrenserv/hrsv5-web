<template>
<div id="agentList">
    <el-row>
        <span>数据源Agent列表</span>
        <router-link to="/collectmonitor">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <div class="lines"></div>
    <el-table :data="AgenttableData" border style="width: 100%">
        <el-table-column prop="datasource_name" label="数据源" width="180" align="center"></el-table-column>

        <el-table-column label="数据库 Agent" align="center">

            <template scope="scope">
                <el-button v-if="scope.row.dbflag!=0" type="success" size="mini" @click="dialogTableVisible = true;clickTaskflag(scope.row.source_id,1)">任务配置</el-button>
            </template>
        </el-table-column>

        <el-table-column label="半结构化 Agent" align="center">

            <template scope="scope">
                <el-button v-if="scope.row.dfflag!=0" type="success" size="mini" @click="dialogTableVisible = true;clickTaskflag(scope.row.source_id,5)">任务配置</el-button>
            </template>
        </el-table-column>
        <el-table-column label="非结构化 Agent" align="center">
            <template scope="scope">
                <el-button v-if="scope.row.nonstructflag!=0" type="success" size="mini" @click="dialogTableVisible = true;clickTaskflag(scope.row.source_id,2)">任务配置</el-button>
            </template>
        </el-table-column>
        <el-table-column label="Ftp Agent" align="center">
            <template scope="scope">
                <el-button v-if="scope.row.halfstructflag!=0" type="success" size="mini" @click="dialogTableVisible = true;clickTaskflag(scope.row.source_id,3)">任务配置</el-button>
            </template>
        </el-table-column>
        <el-table-column label="数据文件 Agent" align="center">
            <template scope="scope">
                <el-button v-if="scope.row.ftpflag!=0" type="success" size="mini" @click="dialogTableVisible = true;clickTaskflag(scope.row.source_id,4)">任务配置</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 点击任务配置显示弹框-->
    <el-dialog title :visible.sync="dialogTableVisible" width="80%">
        <div slot="title" class="header-title">
            <span class="title-sourceName">数据源名称:{{ sourceName }}&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span class="title-agentType">采集类型:{{agentType }}</span>
        </div>
        <el-table :data="gridData2" border size="medium">
            <el-table-column property="agent_name" label="Agent名称" width="150px" align="center"></el-table-column>
            <el-table-column property="agent_ip" label="Agent IP" align="center"></el-table-column>

            <el-table-column property="agent_port" label="Agent端口" align="center"></el-table-column>
            <el-table-column property="agent_type" label="采集类型" align="center"></el-table-column>
            <el-table-column  label="Agent连接状态" align="center">
                <template scope="scope">
                      <span v-if="scope.row.agent_status=='未连接'" class='unlink'>{{scope.row.agent_status}}</span>
                      <span v-else-if="scope.row.agent_status=='已连接'" class='successlink'>{{scope.row.agent_status}}</span>
                      <span v-else class='linking'>{{scope.row.agent_status}}</span>
                </template>
            </el-table-column>

            <el-table-column property="AgentOpt" label="操作" width="350px" align="center">
                <template scope="scope">
                    <el-row class='optheight'>
                        <el-col :span="8" >
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
    <el-dialog title="数据采集任务" :visible.sync="dialogTableTask" width="60%" class="taskEx">
        <el-button type="primary" size="mini" style="margin: 10px 0;">全部发送</el-button>
        <el-table :data="taskMang" border size="medium">
            <el-table-column property="task_name" label="任务名称" width="140px" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column property="agent_type" label="采集类型" align="center" :show-overflow-tooltip="true"></el-table-column>

            <el-table-column property label="启动方式" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="采集频率" align="center" :show-overflow-tooltip="true"></el-table-column>

            <el-table-column label="操作" width="200px" align="center">
                <template scope="scope">
                    <el-row class='optheight'>
                        <el-col :span="5" class="edilt" style="text-align: center;">
                            <el-button type="text" @click="taskEditBtn(scope.row,sourceName)" class='editcolor'>编辑</el-button>
                        </el-col>
                        <el-col :span="5" class="delbtn">
                            <el-button type="text" @click="taskDelBtn(agentType,scope.row)" class="delcolor">删除</el-button>
                        </el-col>
                        <el-col :span="5" class="sendmsg">
                            <el-button type="text" class="sendcolor">发送</el-button>
                        </el-col>
                        <el-col :span="9" class="sendmsg">
                            <el-button type="text" class="workcolor" @click="ProdeceJobsFun()">生成作业</el-button>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableTask = false" type="danger" size="medium">关闭</el-button>
        </div>
    </el-dialog>
    <!--生成作业  -->
     <el-dialog title="生成作业" :visible.sync="dialogProdeceJobs" width="50%" class="alltable">
        <el-form ref="separatorData" :model="ProdeceJobsData" label-width="240px" text-align="center">
            <el-form-item label="选择工程" prop="project" :rules="rule.selected">
                <el-select placeholder="选择工程" v-model="ProdeceJobsData.project" style="width: 190px;" size="medium" >
                    <el-option v-for="(item,index) in Allproject" :key="index" :label="item.value" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="选择任务"  prop="task" :rules="rule.selected">
                <el-select placeholder="选择任务" v-model="ProdeceJobsData.task" style="width: 190px;" size="medium" >
                    <el-option v-for="(item,index) in Alltask" :key="index" :label="item.value" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button  type="danger" size="mini">取 消</el-button>
            <el-button type="primary" size="mini">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
import * as agentList from "./agentList";
import * as message from "@/utils/js/message";
export default {
    data() {
        return {
            AgenttableData: [],
            gridData2: [],
            taskMang: [],
            rule: validator.default,
            dialogTableVisible: false,
            dialogProdeceJobs:false,
            agentType: "",
            sourceName: "",
            agentStatus: "",
            dialogTableTask: false,
            CollectType: [],
            AgentStatus: [],
            ProdeceJobsData:{
                  project:'',
                  task:''
            },
            Allproject:[
                {
                    value:'1'
                }
            ],
            Alltask:[
                 {
                    value:'2'
                }
            ]
        };
    },
    mounted() {
        agentList.getAgentInfoList().then(res => {
            this.AgenttableData = res.data ? res.data : [];
        });
        this.getType();
        this.getStatus();
    },
    methods: {
        //获取类型
        getType() {
            // CollectType
            let params = {};
            params["category"] = "AgentType";
            agentList.getCategoryItems(params).then(res => {
                this.CollectType = res.data ? res.data : [];
            });
        },
        // 获取状态
        getStatus() {
            let params = {};
            params["category"] = "AgentStatus";
            agentList.getCategoryItems(params).then(res => {
                this.AgentStatus = res.data ? res.data : [];
            });
        },
        clickTaskflag(id, type) {
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
            this.dialogTableTask = true;
            let params = {};
            params["sourceId"] = row.source_id;
            params["agentId"] = row.agent_id;
            agentList.getTaskInfo(params).then(res => {
                let arrdata = res.data ? res.data : [];
                for (let i = 0; i < arrdata.length; i++) {
                    arrdata[i].agent_type = row.agent_type;
                }
                this.taskMang = arrdata;
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
                            agent_id: row.agent_id,
                            source_id: row.source_id,
                            source_name: this.$Base64.encode(sourceName),
                        }
                    });
                }
            }
        },
        tasklogFun(row) {
            for (let i = 0; i < this.CollectType.length; i++) {
                if (this.CollectType[i].value == row.agent_type) {
                    this.$router.push({
                        path: "taskLog" + this.CollectType[i].code,
                        query: {
                            agent_id: row.agent_id,
                        }
                    });
                }

            }
        },
        //删除
        taskDelBtn(type, row) {
            for (let i = 0; i < this.CollectType.length; i++) {
                if (this.CollectType[i].value == type) {
                    if(this.CollectType[i].code=='1'){
                        message.confirmMsg('确定删除吗').then(res => {
                        let params = {};
                        params["collectSetId"] = row.id;
                        agentList.deleteDBTask(params).then(res => {
                            this.taskManagement(row);
                            message.deleteSuccess(res);
                        });
                    }).catch(() => {})
                    }else if(this.CollectType[i].code=='2'){
                    //文件系统agent--非结构化deleteNonStructTask
                       message.confirmMsg('确定删除吗').then(res => {
                        let params = {};
                        params["collectSetId"] = row.id;
                        agentList.deleteNonStructTask(params).then(res => {
                            this.taskManagement(row);
                            message.deleteSuccess(res);
                        });
                    }).catch(() => {})
                    }else if(this.CollectType[i].code=='3'){
                    //ftpagent
                      message.confirmMsg('确定删除吗').then(res => {
                        let params = {};
                        params["collectSetId"] = row.id;
                        agentList.deleteFTPTask(params).then(res => {
                            this.taskManagement(row);
                            message.deleteSuccess(res);
                        });
                    }).catch(() => {})
                    }else if(this.CollectType[i].code=='4'){
                    //数据文件agent
                       message.confirmMsg('确定删除吗').then(res => {
                        let params = {};
                        params["collectSetId"] = row.id;
                        agentList.deleteDFTask(params).then(res => {
                            this.taskManagement(row);
                            message.deleteSuccess(res);
                        });
                    }).catch(() => {})
                    }else if(this.CollectType[i].code=='5'){
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
        ProdeceJobsFun(){
            this.dialogProdeceJobs=true
        }
    }
};
</script>

<style scoped>
#agentList {
    padding: 0 40px;
}

/* 图标字体设置 */
.el-row {
    width: 100%;
    height: 64px;
    line-height: 64px;
}

.el-row span {
    color: #2196f3;
    font-size: 18px;
}

.fa-home {
    margin-right: 5px;
}

/* button样式设置 */
.goIndex {
    float: right;
    background: #337ab7;
    margin-top: 18px;
    margin-right: 14px;
}

/* 下划线样式 */
.lines {
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 15px;
}

.edilt {
    text-align: center;
    color: #4691ef;
    font-size: 22px;
    font-weight: bold;
}

.sendmsg {
    text-align: center;
    color: #4691ef;
    font-size: 22px;
    font-weight: bold;
}

.delbtn {
    text-align: center;
    color: #4691ef;
    font-size: 22px;
    font-weight: bold;
}

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

.editcolor {
    color: #2bc73e;
}

.delcolor {
    color: #e83a3a;
}

.sendcolor {
    color: #76b8f1;
}

.workcolor {
    color: #8c8b8b
}
.optheight{
    height: 20px;
    line-height: 20px;
}
</style>
