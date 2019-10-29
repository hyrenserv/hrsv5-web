<template>
    <div>
      <el-tabs v-model="activeName" type="border-card" >
        <el-tab-pane label="单表查询" name="first">
            1
        </el-tab-pane>
        <el-tab-pane label="使用SQL抽取数据" name="second">
           3
        </el-tab-pane>
      </el-tabs>
    </div>
</template>
<script>
export default {
  
  data() {
    return {
      activeName: "first"
    };
  },

 
};
</script>
<style scoped>
</style>