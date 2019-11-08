<template>
  <div>
    <el-steps
      :active="active"
      finish-status="success"
      align-center
      style="margin: 10px 60px 20px 60px;"
    >
      <el-step title="步骤 1" description="配置源DB属性"></el-step>
      <el-step title="步骤 2" description="定义表抽取属性"></el-step>
      <el-step title="步骤 3" description="定义清洗规则"></el-step>
      <el-step title="步骤 4" description="定义卸数文件"></el-step>
      <el-step title="步骤 5" description="定义存储目的地"></el-step>
      <el-step title="步骤 6" description="定义启动方式"></el-step>
    </el-steps>
    <keep-alive>
      <steps0 v-if="active===0" :steps0data="steps0Data" ref="steps0"></steps0>
      <steps1 v-if="active===1"></steps1>
      <steps2 v-if="active===2"></steps2>
      <steps3 v-if="active===3"></steps3>
      <steps4 v-if="active===4"></steps4>
      <steps5 v-if="active===5"></steps5>
    </keep-alive>
    <el-button
      type="primary"
      style="margin-top: 12px;margin-top: 12px;float: right;margin: 15px;"
      @click="next()"
    >{{titleright}}</el-button>
    <el-button
      type="primary"
      v-if="active>0"
      style="margin-top: 12px;margin-top: 12px;float: left;margin: 15px;"
      @click="pre()"
    >{{titleleft}}</el-button>
  </div>
</template>
<script>
import * as addTaskAllFun from "./addTask";
import steps0 from "./steps0";
import steps1 from "./steps1";
import steps2 from "./steps2";
import steps3 from "./steps3";
import steps4 from "./steps4";
import steps5 from "./steps5";
export default {
  components: {
    steps0: steps0,
    steps1: steps1,
    steps2: steps2,
    steps3: steps3,
    steps4: steps4,
    steps5: steps5
  },
  data() {
    return {
      active: 0,
      titleleft: "上一步",
      titleright: "下一步",
      steps0Data: []
    };
  },

  mounted() {
    if (this.$route.query.id) {
      let params = {};
      params["databaseId"] = this.$route.query.id;
      addTaskAllFun.getDBConfInfo(params).then(res => {
        this.steps0Data = res.data;
      });
    }
  },
  methods: {
    next() {
      if (this.active >= 5) {
        this.active == 6;
        this.titleright = "完成";
      } else {
        //验证成功走下一步
        /*  console.log(this.$refs.steps0.ruleForm);
        let formdata = this.$refs.steps0.ruleForm; */
        /*    this.$refs[formdata].validate(valid => {
          if (valid) {
            this.active++;
            console.log("success!!");
          } else {
            console.log("error submit!!");
            return false;
          }
        }); */
        this.active++;
      }
    },
    pre() {
      this.titleright = "下一步";
      if (this.active-- < 0) {
        this.active == 0;
      }
    }
  }
};
</script>
<style scoped>
</style>