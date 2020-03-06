<template>
<div>
    <el-row><h4 class='el-icon-s-home' style='color: #2196f3;
    line-height: 30px;
    margin-top: 20px;
    padding-bottom: 10px;font-size: 18px;'>标准元管理</h4></el-row>
    <el-tabs type="border-card" @tab-click="handleClick">
  <el-tab-pane label="基础信息">
      <BasicInformation @handleClick="handleClick" :data='data' :options='options' :tip='tip'></BasicInformation>
  </el-tab-pane>
  <el-tab-pane label="代码配置">
      <CodeConfiguration></CodeConfiguration>
  </el-tab-pane>
  <el-tab-pane label="标准分类配置">
      <StandardClassConfiguration @handleClick="handleClick" :data='data' :options='options'></StandardClassConfiguration>
  </el-tab-pane>
</el-tabs>
</div>
    
</template>
<script>
import BasicInformation from "./dataBenchmarking_tip01";
import CodeConfiguration from "./dataBenchmarking_tip02";
import StandardClassConfiguration from "./dataBenchmarking_tip03";
import * as dataBenchmarkingAllFun from './dataBenchmarking'
export default {
    name:'dataBenchmarking_tip',
     components: {
        "BasicInformation": BasicInformation,
        "CodeConfiguration": CodeConfiguration,
        "StandardClassConfiguration": StandardClassConfiguration,
    },
    data(){
        return{
            data:[],
            options:[],
            tip:''
        }
    },
    created(){
        this.handleClick()
    },
    methods:{
        handleClick(){
            this.tip='数据加载中...'
            dataBenchmarkingAllFun.getDbmSortInfoTreeData().then(res => {
                console.log(111)
                this.data = res.data.dbmSortInfoTreeDataList
                if(this.data.length>0){
                  this.tip=''
                }else{
                    this.tip='暂无数据'
                }
                this.options = res.data.dbmSortInfoTreeDataList
            });
        }
       
       
    }
}
</script>
<style scoped>

</style>