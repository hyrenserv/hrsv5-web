<template>
  <div>
    <el-form :model="form" ref="form" class="demo-form-inline" :inline="true" label-width="100px">
      <el-col :span="12">
        <el-form-item label="作业名称">
          <el-input v-model="form.job_name" placeholder="作业名称" size="mini"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="开始批量日期">
          <div style="width:100px">
            <el-date-picker v-model="form.startBatchDate" type="date" placeholder="开始批量日期" size="mini">
            </el-date-picker>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="结束批量日期">
          <el-date-picker v-model="form.endBatchDate" type="date" placeholder="结束批量日期" size="mini">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" size="mini">搜索</el-button>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form:{
        job_name:'',
        startBatchDate:'',
        endBatchDate:'',
      },
    };
  },
  methods: {
    //搜索按钮
    search(){

    },
  },
};
</script>
<style scoped>
</style>