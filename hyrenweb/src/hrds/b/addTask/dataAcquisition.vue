<template>
  <div id="dataAcquisition">
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="30%" class="demo-ruleForm">
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-form-item label="数据采集任务名" prop="task_name" :rules="rule.default">
            <el-col :span="16">
              <el-input v-model="ruleForm.task_name"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="作业编号" prop="task_num">
            <el-col :span="16">
              <el-input></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-form-item label="分类编号" prop="tasksort_num" :rules="rule.default">
            <el-col :span="16">
              <el-input v-model="ruleForm.tasksort_num">
                <el-button slot="append" icon="el-icon-zoom-in" @click="outerVisible = true"></el-button>
              </el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="分类名称" prop="tasksort_name" :rules="rule.default">
            <el-col :span="16">
              <el-input v-model="ruleForm.tasksort_name"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-form-item label="数据源" prop="name">
            <el-col :span="16">
              <el-input></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="数据库" prop="db" :rules="rule.selected">
            <el-col :span="16">
              <el-select placeholder="MYSQL" v-model="ruleForm.db">
                <el-option label="MYSQL" value="1"></el-option>
                <el-option label="Oracle9i及一下" value="2"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-form-item label="数据库驱动" prop="name">
            <el-col :span="16">
              <el-input></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="数据库名称" prop="db_name" :rules="rule.default">
            <el-col :span="16">
              <el-input v-model="ruleForm.db_name"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-form-item label="数据库服务器IP" prop="db_ip" :rules="rule.default">
            <el-col :span="16">
              <el-input v-model="ruleForm.db_ip"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="数据库端口" prop="db_port" :rules="rule.default">
            <el-col :span="16">
              <el-input v-model="ruleForm.db_port"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <el-form-item label="用户名" prop="user_name" :rules="rule.default">
            <el-col :span="16">
              <el-input v-model="ruleForm.user_name"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="密码" prop="user_pwd" :rules="rule.default">
            <el-col :span="16">
              <el-input v-model="ruleForm.user_pwd"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="jdbcURL"
            prop="user_jdbcurl"
            :rules="rule.default"
            style="width: 70%;"
          >
            <el-col :span="24">
              <el-input style="width: 124%;" v-model="ruleForm.user_jdbcurl"></el-input>
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
    <el-dialog title="外层 Dialog" :visible.sync="outerVisible">
      <el-dialog width="30%" title="内层 Dialog" :visible.sync="innerVisible" append-to-body>2</el-dialog>
      <div slot="footer" class="dialog-footer">
        1
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
      </div>
    </el-dialog>
    <!-- 测试连接弹层 -->
    <el-dialog title="提示信息" :visible.sync="testLink" width="30%" :before-close="handleClose">
      <div class="testLinnk">
        <span>连接成功</span>
      </div>
    </el-dialog>
    <!-- 查看日志弹层 -->
    <el-dialog title="Agent日志信息" :visible.sync="viewLog" width="70%" :before-close="handleClose">
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
</template>
<script>
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
export default {
  data() {
    return {
      ruleForm: {
        nature: []
      },
      rule: validator.default,
      outerVisible: false,
      innerVisible: false,
      testLink: false,
      viewLog: false,
      input0: ""
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
/* 下划线样式 */
.lines {
  width: 100%;
  min-height: 1px;
  background: #dddddd;
  margin-bottom: 15px;
}
.logseach{
      width: 25%;
    position: absolute;
    top: 10px;
    left: 160px;
}
 .logseach>div>input{
    height: 20px;
  }
</style>