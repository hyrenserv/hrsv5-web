<template>
<div id="agentList">
    <el-row>
        <span>数据源Agent列表</span>
        <router-link to="/">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <div class="lines"></div>
    <el-table :data="AgenttableData" border style="width: 100%">
        <el-table-column prop="datasource_name" label="数据源" width="180" align="center"></el-table-column>
        <el-table-column label="数据库 Agent" width="180" align="center">
            <template scope="scope">
                <el-button v-if="scope.row.dbflag!=0" type="primary" size="mini" @click="dialogTableVisible = true;clickTaskflag(scope.row.source_id,1)">任务配置</el-button>
            </template>
        </el-table-column>
        <el-table-column label="数据文件 Agent" width="180" align="center">
            <template scope="scope">
                <el-button v-if="scope.row.dfflag!=0" type="primary" size="mini" @click="dialogTableVisible = true;clickTaskflag(scope.row.source_id,4)">任务配置</el-button>
            </template>
        </el-table-column>
        <el-table-column label="非结构化 Agent" align="center">
            <template scope="scope">
                <el-button v-if="scope.row.nonstructflag!=0" type="primary" size="mini" @click="dialogTableVisible = true;clickTaskflag(scope.row.source_id,2)">任务配置</el-button>
            </template>
        </el-table-column>
        <el-table-column label="半结构化 Agent" align="center">
            <template scope="scope">
                <el-button v-if="scope.row.halfstructflag!=0" type="primary" size="mini" @click="dialogTableVisible = true;clickTaskflag(scope.row.source_id,5)">任务配置</el-button>
            </template>
        </el-table-column>
        <el-table-column label="Ftp Agent" align="center">
            <template scope="scope">
                <el-button v-if="scope.row.ftpflag!=0" type="primary" size="mini" @click="dialogTableVisible = true;clickTaskflag(scope.row.source_id,3)">任务配置</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 点击部署显示弹框-->
    <el-dialog title :visible.sync="dialogTableVisible" width="80%">
        <div slot="title" class="header-title">
            <span class="title-sourceName">数据源名称:{{ sourceName }}&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span class="title-agentType">采集类型:{{agentType }}</span>
        </div>
        <el-table :data="gridData2" border size="medium">
            <el-table-column property="agent_name" label="Agent名称" width="150px" align="center"></el-table-column>
            <el-table-column property="agent_ip" label="Agent IP" align="center"></el-table-column>
            <el-table-column property="agent_port" label="Agent端口" width="100px" align="center"></el-table-column>
            <el-table-column label="采集类型" width="100px" align="center">{{agentType}}</el-table-column>
            <el-table-column label="Agent连接状态" width="160px" align="center">{{agentStatus}}</el-table-column>
            <el-table-column property="AgentOpt" label="操作" width="280px" align="center">
                <template scope="scope">
                    <el-row>
                        <el-col :span="8">
                            <el-button type="primary" size="mini" @click="addtask(scope.row.agent_type)">新增任务</el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="primary" size="mini" @click="taskManagement(scope.row.agent_id,scope.row.source_id)">任务管理</el-button>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="primary" size="mini" @click="tasklogFun(scope.row.agent_type,scope.row.agent_id)">日志查看</el-button>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 点击任务管理出现弹层 -->
    <el-dialog title="数据采集任务" :visible.sync="dialogTableTask" width="50%" class="taskEx">
        <el-button type="primary" size="mini" style="margin: 10px 0;">全部发送</el-button>
        <el-table :data="taskMang" border size="medium">
            <el-table-column property="task_name" label="任务名称" width="150px" align="center"></el-table-column>
            <el-table-column property label="采集类型" align="center">{{agentType}}</el-table-column>
            <el-table-column property label="启动方式" width="100px" align="center"></el-table-column>
            <el-table-column label="采集频率" width="100px" align="center"></el-table-column>
            <el-table-column label="操作" width="200px" align="center">
                <template scope="scope">
                    <el-row>
                        <el-col :span="5" class="edilt" style="text-align: center;">
                            <el-button type="text" @click="taskEditBtn(agentType,scope.row.agent_id,scope.row.id,scope.row.source_id,sourceName)">编辑</el-button>
                        </el-col>
                        <el-col :span="5" class="delbtn">
                            <el-button type="text">删除</el-button>
                        </el-col>
                        <el-col :span="5" class="sendmsg">
                            <el-button type="text">发送</el-button>
                        </el-col>
                        <el-col :span="9" class="sendmsg">
                            <el-button type="text">生成作业</el-button>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableTask = false">关闭</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as agentList from "./agentList";
export default {
    data() {
        return {
            AgenttableData: [],
            gridData2: [],
            taskMang: [],
            dialogTableVisible: false,
            agentType: "",
            sourceName: "",
            agentStatus: "",
            dialogTableTask: false
        };
    },
    mounted() {
        agentList.getAgentInfoList().then(res => {
            this.AgenttableData = res.data;
        });
    },
    methods: {
        clickTaskflag(id, type) {
            let params = {};
            params["sourceId"] = id;
            params["agentType"] = type;
            agentList.getAgentInfo(params).then(res => {
                this.gridData2 = res.data;
                this.sourceName = res.data[0].datasource_name;
                if (res.data[0].agent_type == 1) {
                    this.agentType = "数据库采集";
                } else if (res.data[0].agent_type == 2) {
                    this.agentType = "非结构化采集";
                } else if (res.data[0].agent_type == 3) {
                    this.agentType = "Ftp采集Agent";
                } else if (res.data[0].agent_type == 4) {
                    this.agentType = "数据文件采集";
                } else {
                    this.agentType = "半结构化采集";
                }
                if (res.data[0].agent_status == 1) {
                    this.agentStatus = "已连接";
                } else if (res.data[0].agent_status == 2) {
                    this.agentStatus = "未连接";
                } else {
                    this.agentStatus = "正在进行中";
                }
            });
        },
        taskManagement(Agentid, sourceid) {
            this.dialogTableTask = true;
            let params = {};
            params["sourceId"] = sourceid;
            params["agentId"] = Agentid;
            agentList.getTaskInfo(params).then(res => {
                this.taskMang = res.data;
            });
        },
        // 任务管理里面的编辑  根据不同类型跳转不同页面
        taskEditBtn(type, agentId, databaseId, sourceId, sourceName) {
            if (type == "数据库采集") {
                this.$router.push({
                    path: "addTask",
                    query: {
                        aId: agentId,
                        id: databaseId,
                        sourId: sourceId,
                        sName: sourceName
                    }
                });
            }
        },
        // 新增任务  根据不同类型跳转不同页面
        addtask(type) {
            if (type == "1") {
                this.$router.push({
                    path: "/addTask"
                });
            } else if (type == "2") {

            } else if (type == "3") {

            } else if (type == "4") {

            } else if (type == "5") {
                this.$router.push({
                    path: "/semiStructuredAgent"
                });
            }
        },
        tasklogFun(type, agentid) {
            if (type == "1") {
                this.$router.push({
                    path: "/taskLog",
                    query: {
                        agenId: agentid
                    }
                });
            }
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

.title-sourceName,
.title-agentType {
    font-size: 18px;
}
</style>
