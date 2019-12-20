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
    this.aId = this.$route.query.agent_id;
    this.sourId = this.$route.query.source_id;
    this.sName = this.$Base64.decode(this.$route.query.source_name);
  },
  methods: {
    next() {
      this.active = 6;
    },
    pre() {
         let data={}
      if(this.$route.query.edit=='yes'){
         data={
         agent_id: this.aId,
                id: this.dbid,
                source_id: this.sourId,
                source_name: this.$Base64.encode(this.sName),
                edit: "yes"
        }
      }
      else{
         data={
           id: this.dbid,
              source_id:this.sourId,
              source_name: this.$Base64.encode(this.sName),
        }
      }
      this.$router.push({
        path: "/collection1_5",
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