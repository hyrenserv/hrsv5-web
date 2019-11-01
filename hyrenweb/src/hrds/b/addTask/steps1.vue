<template>
    <div class="singlesearch">
      <el-tabs v-model="activeName" type="border-card" >
        <el-tab-pane label="单表查询" name="first" >
            <singleTableQuery></singleTableQuery>
        </el-tab-pane>
        <el-tab-pane label="使用SQL抽取数据" name="second">
           <ExtractDataSQL></ExtractDataSQL>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>
<script>
import singleTableQuery from './singleTableQuery'
import ExtractDataSQL from './ExtractDataSQL'
export default {
  components:{
     'singleTableQuery':singleTableQuery,
     'ExtractDataSQL':ExtractDataSQL,
  },
  data() {
    return {
      activeName: "first"
    };
  },

 
};
</script>
<style scoped>
.singlesearch>>>.el-tabs__content{
  overflow: visible !important;
}
</style>