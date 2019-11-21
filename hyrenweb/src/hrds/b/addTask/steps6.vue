<template>
  <div>
    <Step :active="active"></Step>6
    <el-button type="primary" size="medium" class="leftbtn" @click="pre()">上一步</el-button>
    <el-button type="primary" size="medium" class="rightbtn" @click="next()">完成</el-button>
  </div>
</template>
<script>
import Step from "./step";
export default {
  components: {
    Step
  },
  data() {
    return {
      active: 5,
      dbid: null,
      aId: null,
      sourId: null,
      sName: null
    };
  },
  created() {
    this.dbid = this.$route.query.id;
    this.aId = this.$route.query.aId;
    this.sourId = this.$route.query.sourId;
    this.sName = this.$route.query.sName;
  },
  methods: {
    next() {
      this.active = 6;
    },
    pre() {
         let data={}
      if(this.$route.query.edit=='yes'){
         data={
          aId: this.$route.query.aId,
          id: this.$route.query.id,
          sourId:this.$route.query.sourId,
          sName: this.$route.query.sName,
          edit:'yes'
        }
      }
      else{
         data={
          aId: this.$route.query.agent_id,
        }
      }
      this.$router.push({
        path: "/dbaddTasksteps05",
        query: data
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
</style>