<template>
<div>
    <el-row :gutter="20">
        <el-col :span="12">
            <el-col :span="10" :offset="2">
                <el-badge :value="agentnum" class="item">
                    <router-link to="/agentdeploy">
                        <el-button type="success" size="medium">
                            <i class="el-icon-download" style="color: white;">部署Agent</i>
                        </el-button>
                    </router-link>
                </el-badge>
            </el-col>
            <el-col :span="10" :offset="2">
                <el-badge :value="sourcenum" class="item">
                    <router-link to="/agentList">
                        <el-button type="success" size="medium">
                            <i class="el-icon-setting" style="color: white;">设置采集任务</i>
                        </el-button>
                    </router-link>
                </el-badge>
            </el-col>
        </el-col>
        <el-col :span="12">
            <el-select v-model="database_id" filterable clearable placeholder="请选择任务进行查看">
                <el-option v-for="item in dataBaseSet" :key="item.taskid" :label="item.taskname" :value="item.taskid">
                    <span style="float: left">{{ item.taskname }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.agent_type }}</span>
                </el-option>
            </el-select>
            <!-- <el-divider direction="vertical"></el-divider>
            <span>成功 {{suceess}}</span>
            <el-divider direction="vertical"></el-divider>
            <span>失败 {{failure}}</span>
            <el-divider direction="vertical"></el-divider>
            <span>运行中 {{running}}</span> -->
        </el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="12">
            <el-divider content-position="left">最近15天进数情况 ( 单位/MB )</el-divider>
            <template>
                <ve-histogram :loading="true" :data="chartData" style="overflow:hidden" :settings="chartSettings"></ve-histogram>
            </template>
            <el-divider content-position="left">采集信息汇总</el-divider>
            <div class="cccc">
                <el-badge value="文件采集" class="items" style="border: 4px solid #19D4AE;" type="success">
                    <span size="small">{{dataCollectInfo.filesize}}</span>
                </el-badge>
                <el-badge value="数据采集" class="items" style="border: 4px solid #5AB1EF;" type="warning">
                    <span size="small">{{dataCollectInfo.dbsize}}</span>
                </el-badge>
                <el-badge value="采集任务数" class="items" style="border: 4px solid #EFCA69;" type="primary">
                    <span size="small">{{dataCollectInfo.taskNum}}</span>
                </el-badge>
            </div>
        </el-col>
        <el-col :span="12">
            <el-divider content-position="left">数据采集信息列表</el-divider>
            <collectTable :tableData="jobTableData"></collectTable>
        </el-col>
    </el-row>
</div>
</template>

<script>
import * as collect from "./collectmonitor";
import collectTable from "./collectTable";
export default {
    components: {
        collectTable
    },
    data() {
        this.chartSettings = {
            showLine: ["file"],
            labelMap: {
                date: "采集日期",
                data: "数据采集",
                file: "文件采集"
            }
        };
        return {
            agentnum: 0,
            sourcenum: 0,
            database_id: "",
            suceess: 0,
            failure: 0,
            running: 0,
            dataBaseSet: [], //任采集任务信息
            dataCollectInfo: {},
            chartData: {
                columns: [],
                rows: []
            },
            jobTableData: []
        };
    },
    mounted() {
        collect.getAgentNumAndSourceNum().then(res => {
            this.agentnum = res.data.agentnum;
            this.sourcenum = res.data.sourcenum;
        });

        collect.getDatabaseSet().then(res => {
            this.dataBaseSet = res.data;
        });

        collect.getDataCollectInfo().then(res => {
            this.dataCollectInfo = res.data[0];
        });

        collect.getHostoryCollect().then(res => {
            if (typeof res != 'undefined' && res.data != "") {
                this.chartData.columns = Object.keys(res.data[0]);
                this.chartData.rows = res.data.reverse();
            }
        });
    },
    watch: {
        database_id(newVal, oldVal) {
            if (newVal) {
                collect
                    .getCurrentTaskJob({
                        database_id: newVal
                    })
                    .then(res => {
                        this.jobTableData = res.data;
                        // console.log(this.jobTableData)
                        // let params = {
                        //     'name': 'collectTable',
                        //     'params': {
                        //         'jobTableData': this.jobTableData
                        //     }
                        // }
                        // this.$router.push(params)
                    });
            }
        }
    }
};
</script>

<style scoped>
.bg-purple {
    background: #108516;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.cccc>>>.el-badge__content--success {
    background-color: #19d4ae;
}

.cccc>>>.el-badge__content--warning {
    background-color: #5ab1ef !important;
}

.cccc>>>.el-badge__content--primary {
    background-color: #efca69;
}

.items>span {
    position: absolute;
    left: 50%;
    margin-left: -40px;
    width: 80px;
    top: 50%;
    margin-top: -10px;
    height: 20px;
}

.items {
    margin-right: 10%;
    width: 100px;
    height: 100px;
    background: #fff;
    border-radius: 50%;
    text-align: center;
    word-break: break-word;
}
</style>
