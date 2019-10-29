<template>
    <div>
         <el-tabs v-model="activeNames" type="border-card" @tab-click="handleClick0">
        <el-tab-pane label="数据采集" name="first">
            <dataAcquisition></dataAcquisition>
        </el-tab-pane>
        <el-tab-pane label="贴源登记" name="second">
            <sourceRegistration></sourceRegistration>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>
<script>
import dataAcquisition from './dataAcquisition'
import sourceRegistration from './sourceRegistration'
export default {
     components:{
     'dataAcquisition':dataAcquisition,
     'sourceRegistration':sourceRegistration,
    },
    data(){
        return{
           activeNames: "first"
        }
    },
     methods: {
    handleClick0(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>
<style scoped>

</style>