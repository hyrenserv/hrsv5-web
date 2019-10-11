<template>
  <div class="index1001">
    <el-container>
      <el-header height="50px">Header</el-header>
      <el-container>
        <el-aside width="30px">As</el-aside>
        <el-main>
          <!-- 数据来源标题 -->
          <el-row>
            <i class="fa text-warning fa-desktop blue"></i>
            <span>数据源Agent列表</span>
            <router-link to="/index1001"><el-button type="primary" size="small" class="goIndex">
              <i class="fa fa-home fa-lg"></i>返回首页
            </el-button></router-link>
          </el-row>
          <div class="lines"></div>
          <!-- 列表内容 -->
          <div class="listContent">
            <div class="listPic">
              <img src="@/assets/images/a1.png" alt="数据图片" />
            </div>
            <h3>数据库 Agent</h3>
            <p>数据库 Agent 是用于采集结构化数据（RDBMS Etc）的Agent，只需要一个Agent就可以采集同一数据源中的不同源数据</p>
          </div>
          
          <!-- 数据类型标题 -->
          <h4>
            当前所属数据源为：
            <strong>传的东西</strong>
          </h4>
          <!-- 数据表格标题 -->
          <div class="tableList">
            <el-row>
              <i class="fa text-warning fa-database blue"></i>
              <span>数据源Agent</span>
          <!-- 添加数据表单弹出框  -->
              <el-button type="success"  class="addAgent" size="small" @click="dialogFormVisible = true;DataCathInfo()"  >新增数据库Agent</el-button>
            </el-row>
        <!-- 表格内容 -->
            <el-table
              stripe
              size="mini"
              :data="tableData"
              border
              :header-cell-style="{background:'#ede7f3',color:'black'}"
            >
              <el-table-column prop="date" label="Agent名称" width="191" align="center"></el-table-column>
              <el-table-column prop="name" label="Agent所在服务器IP" width="319" align="center"></el-table-column>
              <el-table-column prop="address" label="Agent 连接端口" width="265" align="center"></el-table-column>
              <el-table-column prop="date" label="数据采集用户" width="219" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                 <template slot-scope="scope">
                     
                      <el-button size="mini" type="primary" @click="dialogFormVisibleview = true;handleEdit(scope.$index, scope.row)"  >查看</el-button> 
                      <el-button size="mini" type="danger" >删除</el-button>
                </template>
                
              </el-table-column>
            </el-table>
            <div class="lines"></div>
          </div>
 <!-- 点击新建按钮弹出框 -->
 <el-dialog title="添加数据库 Agent" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="formAdd" ref="formAdd" :rules="rules">
        <el-form-item label=" Agent名称"  :label-width="formLabelWidth" prop="agent_name">
          <el-input
            v-model="formAdd.agent_name"
            autocomplete="off"
            placeholder="Agent名称"
            style="width:284px"
          ></el-input>
        </el-form-item>
        <el-form-item label=" Agent所在服务器ip" :label-width="formLabelWidth" prop="agent_ip">
          <el-input
            v-model="formAdd.agent_ip"
            autocomplete="off"
            placeholder="例如 127.9.08.7"
            style="width:284px"
          ></el-input>
        </el-form-item>
        <el-form-item label=" Agent 连接端口" :label-width="formLabelWidth" prop="agent_port">
          <el-input
            v-model="formAdd.agent_port"
            autocomplete="off"
            placeholder="端口范围1204-65535"
            style="width:284px"
          ></el-input>
        </el-form-item>
        <el-form-item label=" 数据采集用户" :label-width="formLabelWidth" prop="agent_type">
          <el-select v-model="formAdd.agent_type" filterable placeholder="请选择"  style="width:284px">
            <el-option
             v-for="(item,index) in options"
              :key="index"
              :label="item.user_name"
              :value="item.user_id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini" type="danger">取 消</el-button>
        <el-button type="primary" @click="add('formAdd')" size="mini">保存</el-button>
      </div>
    </el-dialog>
  <!-- 点击查看按钮查看信息弹出框 -->
  <el-dialog title="查看数据库 Agent" :visible.sync="dialogFormVisibleview" width="40%">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label=" Agent名称"  :label-width="formLabelWidth" prop="agent_name">
          <el-input
            v-model="form.agent_name"
            autocomplete="off"
            :disabled="true"
            style="width:284px"
          ></el-input>
        </el-form-item>
        <el-form-item label=" Agent所在服务器ip" :label-width="formLabelWidth" prop="agent_ip">
          <el-input
            v-model="form.agent_ip"
            autocomplete="off"
            style="width:284px"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label=" Agent 连接端口" :label-width="formLabelWidth" prop="agent_port">
          <el-input
            v-model="form.agent_port"
            autocomplete="off"
            :disabled="true"
            style="width:284px"
          ></el-input>
        </el-form-item>
        <el-form-item label=" 数据采集用户" :label-width="formLabelWidth" prop="depIds">
          <el-select v-model="form.agent_type" disabled  filterable placeholder="请选择" multiple style="width:284px">
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.user_name"
              :value="item.user_id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleview = false" size="mini" type="danger">取 消</el-button>
        <el-button type="primary" @click="add('formAdd')" size="mini">保存</el-button>
      </div>
    </el-dialog>
        </el-main>
        
      </el-container>
    </el-container>

  </div>
</template>


<script>
import * as functionAll  from "@/hrds/api/b/addScoure/AgentList";
export default {
  data() {
    return {
        dialogFormVisible: false,
        dialogFormVisibleview:false,
        options:[],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
         {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
         {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      formAdd:{
        // agent_name: "",
        // agent_ip: "",
        // agent_port: "",
        // agent_type: "",
      }, 
      form:{
        agent_name: "",
        agent_ip: "",
        agent_port: "",
        agent_type: "",
      },
      rules: {
        agent_name: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
        agent_ip: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
       agent_port: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ],
       agent_type: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur"
          }
        ]
      },
       formLabelWidth: "150px"
    };
  },
  methods:{
     // 点击查看获取数据采集信息
    DataCathInfo(){
     functionAll.getDataUserInfo().then((res)=>{
       if(res.code==200){
         this.options= res.data
       }
     })
    },
      // 编辑获取当前数据赋给表单
    handleEdit(index, row) {
      this.form.agent_name =row.address;
      this.form.agent_port= row.name;
      console.log(row)
    },
  }
};
</script>

<style scoped>
.index1001{
  width: 100%;
}
.index1001 .el-header {
  background: #7cb1de;
}
.index1001 .el-aside {
  background: #7cb1de;
}
.index1001 .el-main {
  padding: 0 74px 0 74px;
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
/* 字体小图标样式设置 */
.fa-desktop {
  color: #2196f3;
  margin-right: 5px;
}
.fa-database {
  color: #2196f3;
  margin-right: 5px;
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
.addAgent {
  background: #5cb85c;
  float: right;
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
/* 列表内容 */
.listContent {
  width: 207px;
  padding: 10px 10px 0 10px;
  border: 1px solid #cccccc;
  height: 278px;
  margin-bottom: 20px;
  margin-right: 5px;
  float: left;
  border-radius: 4px;
}
.listPic {
  width: 108px;
  border: 1px solid #cccccc;
  height: 108px;
  margin-left: 46px;
  padding: 1px 5px;
  margin-bottom: 22px;
}
.listPic img {
  width: 100%;
  height: 100%;
}
.listContent h3 {
  text-align: center;
  font-size: 24px;
  font-weight: normal;
  line-height: 30px;
  margin-bottom: 10px;
}
.listContent p {
  font-size: 13px;
  line-height: 18px;
}
/* 数据类型标题 */
h4 {
  height: 39px;
  line-height: 39px;
  clear: left;
  font-size: 18px;
  font-weight: normal;
}
h4 strong {
  font-size: 18px;
  color: red;
}
/* 表格数据 */
.tableList {
  width: 98%;
  min-height: 132px;
  border: 1px solid #cccccc;
  padding: 0 1%;
}
</style>