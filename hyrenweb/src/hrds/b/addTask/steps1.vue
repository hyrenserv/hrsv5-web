<template>
  <div>
    <Step :active="active"></Step>
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
                    <el-input v-model="ruleForm.task_name" size="medium"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="作业编号" prop="classify_num">
                  <el-col :span="16">
                    <el-input v-model="ruleForm.classify_num" size="medium"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="10">
                <el-form-item label="分类编号" prop="classify_num" :rules="rule.default">
                  <el-col :span="16">
                    <el-input v-model="ruleForm.classify_num" size="medium">
                      <el-button slot="append" icon="el-icon-zoom-in" @click="outerVisible = true"></el-button>
                    </el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="分类名称" prop="classify_name" :rules="rule.default">
                  <el-col :span="16">
                    <el-input v-model="ruleForm.classify_name" size="medium"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="10">
                <el-form-item label="数据源" prop="sourceName">
                  <el-col :span="16">
                    <el-input v-model="sourceName" size="medium"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="数据库" :rules="rule.selected">
                  <el-col :span="16">
                    <el-select
                      placeholder="数据库类型"
                      v-model="ruleForm.database_type"
                      @change="dbTypeFun"
                      size="medium"
                    >
                      <el-option
                        v-for="(item,index) in DatabaseType"
                        :key="index"
                        :label="item.value"
                        :value="item.code"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="10">
                <el-form-item label="数据库驱动" prop="database_drive">
                  <el-col :span="16">
                    <el-input v-model="ruleForm.database_drive" size="medium"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="数据库名称" prop="database_name" :rules="rule.default">
                  <el-col :span="16">
                    <el-input v-model="ruleForm.database_name" size="medium"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="10">
                <el-form-item label="数据库服务器IP" prop="database_ip" :rules="rule.default">
                  <el-col :span="16">
                    <el-input v-model="ruleForm.database_ip" size="medium"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="数据库端口" prop="database_port" :rules="rule.default">
                  <el-col :span="16">
                    <el-input v-model="ruleForm.database_port" size="medium"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" justify="center">
              <el-col :span="10">
                <el-form-item label="用户名" :rules="rule.default" prop="user_name">
                  <el-col :span="16">
                    <el-input v-model="ruleForm.user_name" size="medium"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="10" prop="database_pad">
                <el-form-item label="密码" :rules="rule.default" prop="database_pad">
                  <el-col :span="16">
                    <el-input v-model="ruleForm.database_pad" size="medium"></el-input>
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
                    <el-input style="width: 124%;" v-model="ruleForm.jdbc_url" size="medium"></el-input>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6" style="text-align:right;">
                <el-button type="text" @click="testLink = true,testLinkFun()" size="medium">测试连接</el-button>
              </el-col>
              <el-col :span="2">
                <el-button type="text" @click="viewLog = true" size="medium">查看日志</el-button>
              </el-col>
            </el-row>
          </el-form>
          <!-- 分类编号弹层 -->
          <el-dialog title="采集任务分类" :visible.sync="outerVisible" class="collTask">
            <el-dialog width="40%" title="修改采集任务分类" :visible.sync="innerVisible" append-to-body>
              <el-form :model="addClassTask" ref="addClassTask">
                <el-form-item label=" 分类编号" prop="class_num" :rules="rule.default">
                  <el-input v-model="addClassTask.class_num" style="width:284px"></el-input>
                </el-form-item>
                <el-form-item label=" 分类名称" prop="class_name" :rules="rule.default">
                  <el-input v-model="addClassTask.class_name" style="width:284px"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="class_des">
                  <el-input v-model="addClassTask.class_des" type="textarea" style="width:284px"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer">
                <el-button size="mini" type="danger" @click="innerVisible = false">取 消</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="innerVisible = false;addClassTaskFun(addClassTask)"
                >保存</el-button>
              </div>
            </el-dialog>
            <div slot="footer" class="dialog-footer">
              <el-table
                :data="CollTaskData.slice((currentPage - 1) * pagesize, currentPage * pagesize)"
                border
                size="medium"
                highlight-current-row
                @current-change="handleSelectionChange"
                @row-click="chooseone"
              >
                <el-table-column property label width="60px" type="index">
                  <template slot-scope="scope">
                    <el-radio v-model="radio" :label="scope.row.classify_id">&thinsp;</el-radio>
                  </template>
                </el-table-column>
                <el-table-column property label="序号" width="60px" align="center">
                  <template scope="scope">
                    <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                  </template>
                </el-table-column>
                <el-table-column property="classify_num" label="分类编号" align="center"></el-table-column>
                <el-table-column property="classify_name" label="分类名称" width="100px" align="center"></el-table-column>
                <el-table-column property="remark" label="描述" width="100px" align="center"></el-table-column>
                <el-table-column label="操作" width="150px" align="center">
                  <template scope="scope">
                    <el-row>
                      <el-col :span="12" class="edilt" style="text-align: center;">
                        <el-button type="text" circle @click="colltaskEditBtn(scope.row)">编辑</el-button>
                      </el-col>
                      <el-col :span="12" class="delbtn">
                        <el-button
                          class="delbtn"
                          type="text"
                          circle
                          @click="colltaskDeleBtn(scope.row)"
                          @row-click="chooseone"
                        >删除</el-button>
                      </el-col>
                    </el-row>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="pagesize"
                layout="total, prev, pager, next"
                :total="CollTaskData.length"
              ></el-pagination>
              <div class="btntop">
                <el-button @click="cancelClassNumBtn()" type="danger" size="mini">取 消</el-button>
                <el-button @click="innerVisible = true" type="success" size="mini">新增</el-button>
                <el-button @click="updataClassNumBtn()" type="primary" size="mini">确定</el-button>
              </div>
            </div>
          </el-dialog>
          <!-- 点击编辑弹层 -->
          <el-dialog width="50%" title="修改采集任务分类" :visible.sync="ediltVisible" append-to-body>
            <el-form :model="editClassTask" ref="addClassTask">
              <el-form-item
                label=" 分类编号"
                prop="class_num"
                :rules="rule.default"
                :label-width="formLabelWidth"
                width="130"
              >
                <el-input v-model="editClassTask.class_num" style="width:284px"></el-input>
              </el-form-item>
              <el-form-item
                label=" 分类名称"
                prop="class_name"
                :rules="rule.default"
                :label-width="formLabelWidth"
              >
                <el-input v-model="editClassTask.class_name" style="width:284px"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="class_des" :label-width="formLabelWidth">
                <el-input v-model="editClassTask.class_des" type="textarea" style="width:284px"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer">
              <el-button size="mini" class="cancelbtn" @click="ediltVisible = false">取 消</el-button>
              <el-button size="mini" @click="editClassTaskSane(editClassTask)" class="okbtn">保存</el-button>
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
    <el-button type="primary" size="medium" class="leftbtn" @click="pre()">返回</el-button>
    <el-button type="primary" size="medium" class="rightbtn" @click="next()">下一步</el-button>
  </div>
</template>
<script>
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
import * as addTaskAllFun from "./addTask";
import * as message from "@/utils/js/message";
import Step from "./step";
export default {
  // props: ["steps0data"],
  components: {
    Step
  },
  data() {
    return {
      active: 0,
      activeNames: "first",
      radio: null,
      CollTaskData: [],
      currentPage: 1,
      pagesize: 2,
      formLabelWidth: "150px",
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
      sourceId: "",
      agentId: "",
      rule: validator.default,
      outerVisible: false,
      innerVisible: false,
      ediltVisible: false,
      testLink: false,
      viewLog: false,
      input0: "",
      addClassTask: {
        class_num: "",
        class_name: "",
        class_des: ""
      },
      editClassTask: {
        class_id: "",
        class_num: "",
        class_name: "",
        class_des: ""
      },
      currentSelectItem: {},
      classifyName: "",
      classifyNum: "",
      DatabaseType: [],
      ipPlaceholder: "",
      portPlaceholder: "",
      urlPrefix: "",
      urlSuffix: "",
      dbid: null
    };
  },
  /*   watch: {
    steps0data(val) {
      this.ruleForm = val[0];
    }
  }, */
  created() {
    let params = {};
    params["category"] = "DatabaseType";
    addTaskAllFun.getCategoryItems(params).then(res => {
      this.DatabaseType = res.data;
    });
    this.sourceName = this.$route.query.sName;
    this.sourceId = this.$route.query.sourId;
    this.agentId = this.$route.query.aId;
    if (this.sourceId) {
      this.collTaskClassFun();
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.dbid = this.$route.query.id;
      let params = {};
      params["databaseId"] = this.$route.query.id;
      addTaskAllFun.getDBConfInfo(params).then(res => {
        this.ruleForm = res.data[0];
      });
    }
  },
  methods: {
    next() {
      let data={}
      if(this.$route.query.edit=='yes'){
         data={
          aId: this.agentId,
          id: this.dbid,
          sourId: this.sourceId,
          sName: this.sourceName,
          edit:'yes'
        }
      }
      else{
         data={
          aId: this.$route.query.agent_id,
        }
      }
      this.$router.push({
        path: "/dbaddTasksteps02",
        query: data
      });
    },
    pre() {
      this.$router.push({ path: "/agentList" });
    },
    handleClick0(tab, event) {
      // console.log(tab, event);
    },
    handleSizeChange(size) {
      this.pagesize = size;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
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
      this.classifyName = row.classify_name;
      this.classifyNum = row.classify_num;
    },
    chooseone(row) {
      this.radio = row.classify_id;
      this.off = "true";
    },
    updataClassNumBtn() {
      this.outerVisible = false;
      this.ruleForm.classify_name = this.classifyName;
      this.ruleForm.classify_num = this.classifyNum;
    },
    cancelClassNumBtn() {
      this.outerVisible = false;
      this.radio = "";
      this.currentSelectItem = {};
    },
    collTaskClassFun() {
      let params = {};
      params["sourceId"] = this.sourceId;
      addTaskAllFun.getClassifyInfo(params).then(res => {
        this.CollTaskData = res.data;
      });
    },
    colltaskEditBtn(row) {
      this.ediltVisible = true;
      this.editClassTask.class_id = row.classify_id;
      this.editClassTask.class_name = row.classify_name;
      this.editClassTask.class_num = row.classify_num;
      this.editClassTask.class_des = row.remark;
    },
    editClassTaskSane(data) {
      this.ediltVisible = false;
      let params = {};
      params["classify_id"] = data.class_id;
      params["classify_num"] = data.class_num;
      params["classify_name"] = data.class_name;
      params["remark"] = data.class_des;
      params["agent_id"] = this.agentId;
      params["sourceId"] = this.sourceId;
      addTaskAllFun.updateClassifyInfo(params).then(res => {
        message.updateSuccess(res);
        this.collTaskClassFun();
      });
    },
    colltaskDeleBtn(row) {
      let params = {};
      params["classifyId"] = row.classify_id;
      addTaskAllFun.deleteClassifyInfo(params).then(res => {
        message.deleteSuccess(res);
        this.collTaskClassFun();
      });
    },
    addClassTaskFun(data) {
      let params = {};
      params["classify_num"] = data.class_num;
      params["classify_name"] = data.class_name;
      params["remark"] = data.class_des;
      params["agent_id"] = this.agentId;
      params["sourceId"] = this.sourceId;
      addTaskAllFun.saveClassifyInfo(params).then(res => {
        message.saveSuccess(res);
        this.collTaskClassFun();
      });
    },
    // 根据数据库类型获取数据驱动
    dbTypeFun(sval) {
      let params = {};
      params["dbType"] = String(sval);
      addTaskAllFun.getJDBCDriver(params).then(res => {
        this.ruleForm.database_drive = res.data;
      });
      addTaskAllFun.getDBConnectionProp(params).then(res => {
        this.ipPlaceholder = res.data.ipPlaceholder;
        this.portPlaceholder = res.data.portPlaceholder;
        this.urlPrefix = res.data.urlPrefix;
        this.urlSuffix = res.data.urlSuffix;
        let that = this;
        let code;
        that.DatabaseType.forEach(function(currentValue, index) {
          if (currentValue.value == "TeraData") {
            code = currentValue.code;
            if (that.ruleForm.database_type == code) {
              that.ruleForm.jdbc_url =
                that.urlPrefix +
                that.ruleForm.database_ip +
                that.ipPlaceholder +
                that.ruleForm.database_name +
                that.urlSuffix +
                that.ruleForm.database_port;
            } else {
              that.ruleForm.jdbc_url =
                that.urlPrefix +
                that.ruleForm.database_ip +
                that.ipPlaceholder +
                that.ruleForm.database_port +
                that.portPlaceholder +
                that.ruleForm.database_name +
                that.urlSuffix;
            }
          }
        });
      });
    },
    // 点击测试连接
    testLinkFun() {
      let params = {};
      params["database_drive"] = this.ruleForm.database_drive;
      params["user_name"] = this.ruleForm.user_name;
      params["database_pad"] = this.ruleForm.database_pad;
      params["jdbc_url"] = this.ruleForm.jdbc_url;
      params["database_type"] = this.ruleForm.database_type;
      console.log(params);
      addTaskAllFun.testConnection(params).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style scoped>
.leftbtn {
  margin-top: 12px;
  margin-top: 12px;
  float: left;
  margin: 15px;
  margin-bottom: 10px;
}
.rightbtn {
  margin-top: 12px;
  margin-top: 12px;
  float: right;
  margin: 15px;
  margin-bottom: 10px;
}
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
.collTask >>> .el-dialog__body {
  padding: 0;
}
.btntop {
  margin: 10px 0;
}
</style>