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
          <el-button
            v-if="scope.row.dbflag!=0"
            type="success"
            size="mini"
            @click="dialogTableVisible = true;clickTaskflag(scope.row.source_id,1)"
          >任务配置</el-button>
        </template>
      </el-table-column>
      <el-table-column label="对象文件 Agent" width="180" align="center">
        <template scope="scope">
          <el-button
            v-if="scope.row.dfflag!=0"
            type="success"
            size="mini"
            @click="dialogTableVisible = true;clickTaskflag(scope.row.source_id,4)"
          >任务配置</el-button>
        </template>
      </el-table-column>
      <el-table-column label="文件 Agent" align="center">
        <template scope="scope">
          <el-button
            v-if="scope.row.nonstructflag!=0"
            type="success"
            size="mini"
            @click="dialogTableVisible = true;clickTaskflag(scope.row.source_id,2)"
          >任务配置</el-button>
        </template>
      </el-table-column>
      <el-table-column label="Ftp Agent" align="center">
        <template scope="scope">
          <el-button
            v-if="scope.row.halfstructflag!=0"
            type="success"
            size="mini"
            @click="dialogTableVisible = true;clickTaskflag(scope.row.source_id,5)"
          >任务配置</el-button>
        </template>
      </el-table-column>
      <el-table-column label="数据文件 Agent" align="center">
        <template scope="scope">
          <el-button
            v-if="scope.row.ftpflag!=0"
            type="success"
            size="mini"
            @click="dialogTableVisible = true;clickTaskflag(scope.row.source_id,3)"
          >任务配置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 点击部署显示弹框-->
    <el-dialog title :visible.sync="dialogTableVisible" width="80%">
      <div slot="title" class="header-title">
        <span class="title-sourceName">数据源名称:{{ sourceName }}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span class="title-agentType">采集类型:{{agentType }}</span>
      </div>
      <el-table :data="gridData2" border>
        <el-table-column property="agent_name" label="Agent名称" width="150px" align="center"></el-table-column>
        <el-table-column property="agent_ip" label="Agent IP" align="center"></el-table-column>
        <el-table-column property="agent_port" label="Agent端口" width="100px" align="center"></el-table-column>
        <el-table-column property="agent_type" label="采集类型" width="100px" align="center"></el-table-column>
        <el-table-column property="agent_status" label="Agent连接状态" width="160px" align="center"></el-table-column>
        <el-table-column property="AgentOpt" label="操作" width="280px" align="center">
          <template scope="scope">
            <el-row>
              <el-col :span="8">
                <el-button
                  type="success"
                  size="mini"
                  @click="addtask(scope.row,sourceName)"
                >新增任务</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" size="mini" @click="taskManagement(scope.row)">任务管理</el-button>
              </el-col>
              <el-col :span="8">
                <el-button
                  type="warning"
                  size="mini"
                  @click="tasklogFun(scope.row)"
                >日志查看</el-button>
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
        <el-table-column property="agent_type" label="采集类型" align="center"></el-table-column>
        <el-table-column property label="启动方式" width="100px" align="center"></el-table-column>
        <el-table-column label="采集频率" width="100px" align="center"></el-table-column>
        <el-table-column label="操作" width="200px" align="center">
          <template scope="scope">
            <el-row>
              <el-col :span="5" class="edilt" style="text-align: center;">
                <el-button type="text" @click="taskEditBtn(scope.row,sourceName)">编辑</el-button>
              </el-col>
              <el-col :span="5" class="delbtn">
                <el-button type="text" @click="taskDelBtn(agentType,scope.row)">删除</el-button>
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
import * as message from "@/utils/js/message";
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
      dialogTableTask: false,
      CollectType: [],
      AgentStatus: []
    };
  },
  mounted() {
    agentList.getAgentInfoList().then(res => {
      this.AgenttableData = res.data;
    });
    this.getType();
    this.getStatus();
  },
  methods: {
    //获取类型
    getType() {
      // CollectType
      let params = {};
      params["category"] = "CollectType";
      agentList.getCategoryItems(params).then(res => {
        this.CollectType = res.data;
      });
    },
    // 获取状态
    getStatus() {
      let params = {};
      params["category"] = "AgentStatus";
      agentList.getCategoryItems(params).then(res => {
        this.AgentStatus = res.data;
      });
    },
    clickTaskflag(id, type) {
      this.agentType = "";
      let params = {};
      params["sourceId"] = id;
      params["agentType"] = type;
      agentList.getAgentInfo(params).then(res => {
        console.log(res);
        let arrdata = res.data;
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
      console.log(row);
      this.dialogTableTask = true;
      let params = {};
      params["sourceId"] = row.source_id;
      params["agentId"] = row.agent_id;
      agentList.getTaskInfo(params).then(res => {
        let arrdata = res.data;
        for (let i = 0; i < arrdata.length; i++) {
          arrdata[i].agent_type = row.agent_type;
        }
        this.taskMang = arrdata;
        console.log(res);
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
              source_name: sourceName,
              edit: "yes"
            }
          });
        }
      }
      /*     if (row.agent_type == "数据库采集") {
        this.$router.push({
          path: "dbaddTasksteps01",
          query: {
            aId: row.agent_id,
            id: row.id,
            sourId: row.source_id,
            sName: sourceName,
            edit: "yes"
          }
        });
      } else if (type == "Ftp采集Agent") {
        this.$router.push({
          path: "/ftpCollect",
          query: {
            agent_id: agentId,
            ftp_id: databaseId
          }
        });
      } else if (type == "非结构化采集") {
        this.$router.push({
          path: "/configureStartMode",
          query: {
            agent_id: agentId,
            fcs_id: databaseId,
            agent_name: type
          }
        });
      } */
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
              source_name: sourceName,
            }
          });
        }
      }
      /* if (type == "数据库采集") {
        this.$router.push({
          path: "/dbaddTasksteps01",
          query: {
            aId: agent_id,
            sName: sourceName,
            sourId: sourceId
          }
        });
      } else if (type == "2") {
        this.$router.push({
          path: "/configureStartMode",
          query: {
            agent_name: name,
            agent_id: agent_id
          }
        });
      } else if (type == "3") {
        this.$router.push({
          path: "/ftpCollect",
          query: {
            agent_id: agent_id
          }
        });
      } else if (type == "4") {
      } else if (type == "5") {
        this.$router.push({
          path: "/collectOption",
          query: {
            agent_id: agent_id
          }
        });
      } */
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
      /* if (type == "数据库采集") {
        this.$router.push({
          path: "/taskLog",
          query: {
            agenId: agentid
          }
        });
      } else if (type == "5") {
        this.$router.push({
          path: "/collectOption",
          query: {
            agenId: agentid
          }
        });
      } */
    },
    //删除
    taskDelBtn(type, row) {
         if (type == "数据库采集") {
        let params = {};
        params["collectSetId"] = row.id;
        agentList.deleteDBTask(params).then(res => {
          this.taskManagement(type, row.agent_id, row.source_id);
          message.deleteSuccess(res);
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

.taskEx >>> .el-dialog__body {
  padding: 8px 20px;
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
</style>
