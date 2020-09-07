<template>
    <div id='dataDashboardList'>
        <el-row >
            <el-button type="primary" size='mini' class='creat_panelBtn' @click="creat_panel()">新建仪表盘</el-button>
        </el-row>
        <el-table :data="dataDashboardList" size='medium' border stripe>
          <el-table-column label="序号" type="index" width="60"></el-table-column>
          <el-table-column label="仪表板名称" prop='panel_name'></el-table-column>
          <el-table-column label="仪表板描述" prop='panel_desc'></el-table-column>
          <el-table-column label="仪表板状态" prop='panel_status'></el-table-column>
          <el-table-column label="创建日期" prop='panel_updata'></el-table-column>
          <el-table-column label="最后更新日期" prop='panel_updataTime'></el-table-column>
          <el-table-column label="操作" >
              <template slot-scope="scope">
                  <el-button type="text">发布</el-button>
                  <el-button type="text">编辑</el-button>
                  <el-button type="text">删除</el-button>
              </template>
          </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data(){
        return{
            dataDashboardList:[{
                panel_name:'多组件',
                panel_desc:'多组件',
                panel_status:'0',
                panel_updata:'2020-08-28 15:18:32',
                panel_updataTime:'2020-09-01 09:48:56'
            }]
        }
    },
    methods:{
        creat_panel(){
            this.$router.push({
               path:'/dataDashboard',
               query:{
                   is_add:'1',
               }
            })
        }
    }
}
</script>
<style scoped>
.creat_panelBtn{
    float: right;
    margin: 0 10px 10px 0;
}
</style>