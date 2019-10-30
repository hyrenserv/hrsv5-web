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
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="datasource" label="数据源" width="180"></el-table-column>
      <el-table-column prop="dbAgent" label="数据库 Agent" width="180">
          <el-button type="primary" size="mini" @click="dialogTableVisible = true">任务配置</el-button>
      </el-table-column>
      <el-table-column prop="dbfileAgent" label="数据文件 Agent" width="180"></el-table-column>
      <el-table-column prop="unstructuredAgent" label="非结构化 Agent"></el-table-column>
      <el-table-column prop="structuredAgent" label="半结构化 Agent"></el-table-column>
      <el-table-column prop="ftpAgent" label="Ftp Agent"></el-table-column>
    </el-table>
    <!--  -->
    <el-dialog title="采集类型：数据库Agent，数据源名称：1023" :visible.sync="dialogTableVisible" width="80%">
  <el-table :data="gridData2" border size="medium">
    <el-table-column property="AgentName" label="Agent名称" width="150px"></el-table-column>
    <el-table-column property="AgentIp" label="Agent IP" ></el-table-column>
    <el-table-column property="AgentPort" label="Agent端口" width="100px"></el-table-column>
    <el-table-column property="AgentType" label="采集类型" width="100px"></el-table-column>
    <el-table-column property="AgentLink" label="Agent连接状态" width="160px"></el-table-column>
    <el-table-column property="AgentOpt" label="操作" width="280px">
        <el-row>
            <el-col :span="8">
             <router-link to="/addTask"><el-button type="primary" size="mini" >新增任务</el-button></router-link>
            </el-col>
             <el-col :span="8">
         <el-button type="primary" size="mini" >任务管理</el-button>
          </el-col>
          <el-col :span="8">
         <el-button type="primary" size="mini" >日志查看</el-button>
          </el-col>
        </el-row>
    </el-table-column>
  </el-table>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          datasource: "1023",
          dbAgent: "1234",
          dbfileAgent: "13424",
          unstructuredAgent:'1324',
          structuredAgent:'1324',
          ftpAgent:'143'
        },
        {
          datasource: "1023",
          dbAgent: "1234",
          dbfileAgent: "13424",
          unstructuredAgent:'1324',
          structuredAgent:'1324',
          ftpAgent:'143'
        },
         {
          datasource: "1023",
          dbAgent: "1234",
          dbfileAgent: "13424",
          unstructuredAgent:'1324',
          structuredAgent:'1324',
          ftpAgent:'143'
        },
      ],
        gridData2: [{
          AgentName: '2016-05-02',
          AgentIp: '12.13.13.13',
          AgentPort: '8888',
          AgentType:'123',
          AgentLink:'1324',
          AgentOpt:'1324'
        }],
        dialogTableVisible: false,
    };
  },
  methods(){
      
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
</style>