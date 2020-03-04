<template>
  <div>
        <el-row>
            <span class="titles">工程名称 : {{pName}}</span>
            <el-button type="primary" class="el1 els" @click="goBack" size="small">
                <i class="block_icon fa fa-home"></i>返回首页
            </el-button>
            <div class="lines"></div>
        </el-row>
        <el-row class="menus">
            <el-col :span="4">
                <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#e5e5e5" text-color="#000" active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-view"></i>
                            <span>监控</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu :default-active="this.$router.path" router background-color="#e5e5e5">
                                <el-menu-item v-for="(item,i) in navList1" :key="i" :index="item.name">
                                    <i class="el-icon-location-outline"></i>
                                    {{ item.navItem }}
                                </el-menu-item>
                            </el-menu>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>干预</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu :default-active="this.$router.path" router background-color="#e5e5e5">
                                <el-menu-item v-for="(item,i) in navList2" :key="i" :index="item.name">
                                    <i class="el-icon-location-outline"></i>
                                    {{ item.navItem }}
                                </el-menu-item>
                            </el-menu>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span>配置</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu :default-active="this.$router.path" router background-color="#e5e5e5">
                                <el-menu-item v-for="(item,i) in navList3" :key="i" :index="item.name">
                                    <i class="el-icon-location-outline"></i>
                                    {{ item.navItem }}
                                </el-menu-item>
                            </el-menu>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="7">
                <div></div>
            </el-col>
        </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
        pName:'',
        navList1:[
            {name:'/currentBatch',navItem:'当前批量'},
            {name:'/historyBatch',navItem:'历史批量'},
            {name:'/currentJob',navItem:'当前作业'},
            {name:'/historyJob',navItem:'历史作业'},
            {name:'/relyJob',navItem:'依赖作业'},
            {name:'/systemResource',navItem:'系统资源'},
        ],
        navList2:[
            {name:'/sysLevelIntervente',navItem:'系统级干预'},
            {name:'/jobLevelIntervente',navItem:'作业级干预'},
        ],
        navList3:[
            {name:'/subSystem',navItem:'任务'},
            {name:'/etlJobDefTemplate',navItem:'作业模板'},
            {name:'/etlJobDef',navItem:'作业'},
            {name:'/resourcesAvailable',navItem:'资源定义'},
            {name:'/resourcesUsage',navItem:'资源分配'},
            {name:'/systemParameter',navItem:'系统参数'},
            {name:'/etlDependency',navItem:'作业依赖'},
        ],
    };
  },
  methods: {
      //返回首页按钮
      goBack(){
          this.$router.go(-1);
      },
  },
  mounted() {
      this.pName = this.$route.query.project_name;
  },
};
</script>
<style scoped>
.lines {
    margin-top: 10px;
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 15px;
}

.menus{
    margin-top: 30px;
}
.el-row {
    height: 64px;
    line-height: 64px;
    width: 100%;
}

.titles {
    color: #2196f3;
    font-size: 18px;
}

/* 字体小图标样式设置 */

i {
    margin-right: 5px;
}

/* button样式设置 */
.els {
    float: right;
    margin-top: 18px;
}

.el1 {
    margin-left: 10px;
}

</style>