<template>
  <div>
    <el-tabs v-model="activeNames" type="border-card" @tab-click="handleClick0">
      <el-tab-pane label="数据采集" name="first">
        <div id="dataAcquisition">
          <el-form
            :model="ruleForm"
            status-icon
            ref="ruleForm"
            label-width="30%"
            class="demo-ruleForm"
          >
            <el-row type="flex" justify="center">
              <el-col :span="10">
                <el-form-item label="数据采集任务名" prop="task_name" :rules="rule.default">
                  <el-col :span="16">
                    <el-input v-model="ruleForm.task_name"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="作业编号" prop="classify_num">
                  <el-col :span="16">
                    <el-input v-model="ruleForm.classify_num"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="10">
                <el-form-item label="分类编号" prop="classify_num" :rules="rule.default">
                  <el-col :span="16">
                    <el-input v-model="ruleForm.classify_num">
                      <el-button slot="append" icon="el-icon-zoom-in" @click="outerVisible = true"></el-button>
                    </el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="分类名称" prop="classify_name" :rules="rule.default">
                  <el-col :span="16">
                    <el-input v-model="ruleForm.classify_name"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="10">
                <el-form-item label="数据源" prop="sourceName">
                  <el-col :span="16">
                    <el-input v-model="sourceName"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="数据库" :rules="rule.selected">
                  <el-col :span="16">
                    <el-select placeholder="数据库类型" v-model="ruleForm.database_type">
                      <el-option label="MYSQL" value="1"></el-option>
                      <el-option label="Oracle9i及一下" value="11"></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="10">
                <el-form-item label="数据库驱动" prop="database_drive">
                  <el-col :span="16">
                    <el-input v-model="ruleForm.database_drive"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="数据库名称" prop="database_name" :rules="rule.default">
                  <el-col :span="16">
                    <el-input v-model="ruleForm.database_name"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="10">
                <el-form-item label="数据库服务器IP" prop="database_ip" :rules="rule.default">
                  <el-col :span="16">
                    <el-input v-model="ruleForm.database_ip"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="数据库端口" prop="database_port" :rules="rule.default">
                  <el-col :span="16">
                    <el-input v-model="ruleForm.database_port"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="10">
                <el-form-item label="用户名" :rules="rule.default" prop="user_name">
                  <el-col :span="16">
                    <el-input v-model="ruleForm.user_name"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="10" prop="database_pad">
                <el-form-item label="密码" :rules="rule.default" prop="database_pad">
                  <el-col :span="16">
                    <el-input v-model="ruleForm.database_pad"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  label="jdbcURL"
                  prop="jdbc_url"
                  :rules="rule.default"
                  style="width: 70%;"
                >
                  <el-col :span="24">
                    <el-input style="width: 124%;" v-model="ruleForm.jdbc_url"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6" style="text-align:right;">
                <el-button type="text" @click="testLink = true">测试连接</el-button>
              </el-col>
              <el-col :span="2">
                <el-button type="text" @click="viewLog = true">查看日志</el-button>
              </el-col>
            </el-row>
          </el-form>
          <!-- 分类编号弹层 -->
          <el-dialog title="采集任务分类" :visible.sync="outerVisible">
            <el-dialog width="30%" title="修改采集任务分类" :visible.sync="innerVisible" append-to-body>
              <el-form :model="addClassTask" ref="addClassTask" >
                <el-form-item label=" 分类编号"  prop="class_num" :rules="rule.default">
                    <el-input v-model="addClassTask.class_num"  style="width:284px" ></el-input>
                </el-form-item>
                <el-form-item label=" 分类名称"  prop="class_name" :rules="rule.default">
                    <el-input v-model="addClassTask.class_name"   style="width:284px"></el-input>
                </el-form-item>
                <el-form-item label="备注"  prop="class_des">
                    <el-input v-model="addClassTask.class_des" type="textarea"  style="width:284px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" >
                <el-button size="mini" type="danger"  @click="innerVisible = false">取 消</el-button>
                <el-button type="primary"  size="mini" @click="innerVisible = false;addClassTaskFun(addClassTask)">保存</el-button>
            </div>
            </el-dialog>
            <div slot="footer" class="dialog-footer">
              <el-table :data="CollTaskData" border size="medium" highlight-current-row @current-change="handleSelectionChange"  @row-click="chooseone">
                <el-table-column property label="" width="60px" type="index">
                  <template slot-scope="scope">
                    <el-radio v-model="radio" :label="scope.row.classify_id">&thinsp;</el-radio>
                  </template>
                </el-table-column>
                <el-table-column property label="序号" width="40px" type="index"></el-table-column>
                <el-table-column property="classify_num" label="分类编号"></el-table-column>
                <el-table-column property="classify_name" label="分类名称" width="100px"></el-table-column>
                <el-table-column property="remark" label="描述" width="100px"></el-table-column>
                <el-table-column label="操作" width="150px">
                  <template scope="scope">
                    <el-row>
                      <el-col :span="8" class="edilt" style="text-align: center;">
                        <el-button
                          type="primary"
                          icon="el-icon-edit"
                          circle
                          @click="colltaskEditBtn(scope.row)"
                        ></el-button>
                      </el-col>
                      <el-col :span="8" class="delbtn">
                        <el-button type="primary" icon="el-icon-delete" circle @click="colltaskDeleBtn(scope.row)" @row-click="chooseone"></el-button>
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
              </el-table>
              <el-button @click="cancelClassNumBtn()">取 消</el-button>
              <el-button type="primary" @click="innerVisible = true">新增</el-button>
              <el-button @click="updataClassNumBtn()">确定</el-button>
            </div>
          </el-dialog>
          <!-- 点击编辑弹层 -->
          <el-dialog width="30%" title="修改采集任务分类" :visible.sync="ediltVisible" append-to-body>
              <el-form :model="editClassTask" ref="addClassTask" >
                <el-form-item label=" 分类编号"  prop="class_num" :rules="rule.default" >
                    <el-input v-model="editClassTask.class_num"  readonly style="width:284px" ></el-input>
                </el-form-item>
                <el-form-item label=" 分类名称"  prop="class_name" :rules="rule.default">
                    <el-input v-model="editClassTask.class_name"   style="width:284px"></el-input>
                </el-form-item>
                <el-form-item label="备注"  prop="class_des">
                    <el-input v-model="editClassTask.class_des" type="textarea"  style="width:284px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" >
                <el-button size="mini" type="danger"  @click="ediltVisible = false">取 消</el-button>
                <el-button type="primary"  size="mini" @click="editClassTaskSane(editClassTask)">保存</el-button>
            </div>
            </el-dialog>

          <!-- 测试连接弹层 -->
          <el-dialog title="提示信息" :visible.sync="testLink" width="30%" :before-close="handleClose">
            <div class="testLinnk">
              <span>连接成功</span>
            </div>
          </el-dialog>
          <!-- 查看日志弹层 -->
          <el-dialog
            title="Agent日志信息"
            :visible.sync="viewLog"
            width="70%"
            :before-close="handleClose"
          >
            <div class="logseach">
              <el-input placeholder="请输入查询内容" v-model="input0" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
            <div>
              <span>连接成功</span>
            </div>
          </el-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane label="贴源登记" name="second">
        <div>贴源登记</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
import * as addTaskAllFun from "./addTask";
export default {
  props: ["steps0data"],
  data() {
    return {
      activeNames: "first",
      radio: null,
      CollTaskData: [],
      ruleForm: {
        task_name: "",
        classify_num: "",
        classify_num: "",
        database_drive: "",
        database_name: "",
        database_ip: "",
        database_port: "",
        user_name: "",
        database_pad: "",
        jdbc_url: "",
        database_type: ""
      },
      sourceName: "",
      sourceId:'',
      agentId:'',
      rule: validator.default,
      outerVisible: false,
      innerVisible: false,
      ediltVisible:false,
      testLink: false,
      viewLog: false,
      input0: "",
      addClassTask:{
        class_num:"",
        class_name:'',
        class_des:''
      },
      editClassTask:{
        class_id:'',
        class_num:"",
        class_name:'',
        class_des:''
      },
       currentSelectItem: {},
       classifyName:'',
       classifyNum:'',
    };
  },
  watch: {
    steps0data(val) {
      this.ruleForm = val[0];
    }
  },
  mounted() {
    this.sourceName = this.$route.params.sName;
    this.sourceId=this.$route.params.sourId;
    this.agentId=this.$route.params.aId;
    if(this.sourceId){
      this.collTaskClassFun()
    }
  },
  methods: {
    handleClick0(tab, event) {
      // console.log(tab, event);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
     handleSelectionChange(row) {
      this.currentSelectItem = row;
      this.classifyName=row.classify_name;
      this.classifyNum=row.classify_num
    },
     chooseone(row){
      this.radio = row.classify_id
      this.off='true'
    },
    updataClassNumBtn(){
     this.outerVisible = false;
     this.ruleForm.classify_name=this.classifyName
     this.ruleForm.classify_num=this.classifyNum
    },
    cancelClassNumBtn(){
      this.outerVisible = false;
      this.radio=''
      this.currentSelectItem={}
    },
    collTaskClassFun(){
      let params = {};
      params["sourceId"] = this.sourceId;
      addTaskAllFun.getClassifyInfo(params).then(res => {
        this.CollTaskData = res.data;
      });
    },
    colltaskEditBtn(row) {
      this.ediltVisible=true;
     this.editClassTask.class_id=row.classify_id
     this.editClassTask.class_name= row.classify_name
     this.editClassTask.class_num= row.classify_num
     this.editClassTask.class_des= row.remark
    },
    editClassTaskSane(data){
      this.ediltVisible=false;
      let params = {};
      params["classify_id"] = data.class_id;
      params["classify_num"] = data.class_num;
      params["classify_name"] = data.class_name;
      params["remark"] = data.class_des;
      params["agent_id"] = this.agentId;
      params["sourceId"] = this.sourceId;
      addTaskAllFun.updateClassifyInfo(params).then(res=>{
       alert("删除成功")
       this.collTaskClassFun()
     })
    },
    colltaskDeleBtn(row){
      let params = {};
      params["classifyId"] = row.classify_id;
       console.log(params)
       addTaskAllFun.deleteClassifyInfo(params).then(res=>{
       console.log(res)
       this.collTaskClassFun()
     })
    },
    addClassTaskFun(data){
      let params = {};
      params["classify_num"] = data.class_num;
      params["classify_name"] = data.class_name;
      params["remark"] = data.class_des;
      params["agent_id"] = this.agentId;
      params["sourceId"] = this.sourceId;
     addTaskAllFun.saveClassifyInfo(params).then(res=>{
       console.log(res)
     })
    }
  }
};
</script>
<style scoped>
#jdbcUrl > lable {
  width: 20% !important;
}
.testLinnk {
  text-align: center;
}
.testLinnk > span {
  font-size: 18px;
}
.logseach {
  width: 25%;
  position: absolute;
  top: 10px;
  left: 160px;
}
.logseach > div > input {
  height: 20px;
}
#dataAcquisition >>> .el-dialog__header {
  border-bottom: 1px solid #f3f0f0;
}
</style>