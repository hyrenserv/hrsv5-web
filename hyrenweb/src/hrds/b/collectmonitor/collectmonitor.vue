<template>
<div>
    <el-row :gutter="20">
        <el-col :span="12">
            <el-col :span="10" :offset="2">
                <el-badge :value="agentnum" class="item">
                    <el-button type="success" size="medium">
                        <router-link to="/agentdeploy"><i class="el-icon-download"></i>部署Agent</router-link>
                    </el-button>
                </el-badge>
            </el-col>
            <el-col :span="10" :offset="2">
                <el-badge :value="sourcenum" class="item">
                    <el-button type="success" size="medium">
                        <router-link to="/addTask"><i class="el-icon-setting"></i>设置采集任务</router-link>
                    </el-button>
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
            <el-divider direction="vertical"></el-divider>
            <span>成功 {{suceess}}</span>
            <el-divider direction="vertical"></el-divider>
            <span>失败 {{failure}}</span>
            <el-divider direction="vertical"></el-divider>
            <span>运行中 {{running}}</span>

        </el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="12">
            <el-divider content-position="left">最近15天进数情况</el-divider>
            <template>
                <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
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
        </el-col>
    </el-row>
</div>
</template>

<script>
import * as collect from './collectmonitor'
//任务信息页面
import dataBaseSet from './databaseCollectTable'
export default {
    components: {

    },
    data() {
        this.chartSettings = {
            // metrics: ['数据采集'],
            dimension: ['日期'],
            showLine: ['文件采集']
        }
        return {
            agentnum: 0,
            sourcenum: 0,
            database_id: '',
            suceess: 0,
            failure: 0,
            running: 0,
            dataBaseSet: [], //任采集任务信息
            dataCollectInfo: {},
            chartData: {
                columns: ['日期', '文件采集', '数据采集'],
                rows: [{
                        '日期': '2019-01-01',
                        '日期2': '01-01',
                        '文件采集': 1393,
                        '数据采集': 1093,
                    },
                    {
                        '日期': '2019-01-02',
                        '文件采集': 3530,
                        '数据采集': 3230,
                    },
                    {
                        '日期': '2019-01-03',
                        '文件采集': 2923,
                        '数据采集': 2623,
                    },
                    {
                        '日期': '2019-01-04',
                        '文件采集': 1723,
                        '数据采集': 1423,
                    },
                    {
                        '日期': '2019-01-05',
                        '文件采集': 3792,
                        '数据采集': 3492,
                    },
                    {
                        '日期': '2019-01-06',
                        '文件采集': 3092,
                        '数据采集': 1192,
                    },
                    {
                        '日期': '2019-01-07',
                        '文件采集': 1992,
                        '数据采集': 2292,
                    },
                    {
                        '日期': '2019-01-08',
                        '文件采集': 2592,
                        '数据采集': 1692,
                    },
                    {
                        '日期': '2019-01-09',
                        '文件采集': 1392,
                        '数据采集': 1392,
                    },
                    {
                        '日期': '2019-01-10',
                        '文件采集': 2592,
                        '数据采集': 2692,
                    }
                ]
            }
        }
    },
    mounted() {
        collect.getAgentNumAndSourceNum().then((res) => {
            if (res.success) {
                this.agentnum = res.data.agentnum;
                this.sourcenum = res.data.sourcenum;
            }
        })

        collect.getDatabaseSet().then((res) => {
            this.dataBaseSet = res.data;
        })

        collect.getDataCollectInfo().then(res => {
            this.dataCollectInfo = res.data[0];
        })
    },
    watch: {
        database_id(newVal, oldVal) {
            let params = {
                'name': 'databaseCollectTable',
                'params': {
                    'database_id': newVal
                }
            }
            this.$router.push(params)
        }
    }
}
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
    background-color: #19D4AE;
}

.cccc>>>.el-badge__content--warning {
    background-color: #5AB1EF !important;
}

.cccc>>>.el-badge__content--primary {
    background-color: #EFCA69;
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
    margin-right: 100px;
    width: 100px;
    height: 100px;
    background: #fff;
    border-radius: 50%;
    text-align: center;
    word-break: break-word;
}
</style>
