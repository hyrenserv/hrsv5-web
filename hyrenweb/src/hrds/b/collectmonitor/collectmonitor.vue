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
        <el-col :span="8">
            <div class="grid-content bg-purple">{{}}</div>
        </el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="12">
            <el-divider content-position="left">最近15天进数情况</el-divider>
            <template>
                <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
            </template>
            <el-divider></el-divider>
        </el-col>
        <el-col :span="12">
            <el-divider content-position="left">数据采集信息列表</el-divider>
            <el-badge :value="agentnum" class="item">
                <el-button type="success" size="medium">
                    <router-link to="/agentdeploy"><i class="el-icon-download"></i>部署Agent</router-link>
                </el-button>
            </el-badge>

        </el-col>
    </el-row>

</div>
</template>

<script>
import * as collect from './collectmonitor'
export default {
    data() {
        this.chartSettings = {
            // metrics: ['数据采集'],
            dimension: ['日期'],
            showLine: ['文件采集']
        }
        return {
            agentnum: 0,
            sourcenum: 0,

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
    created() {
        collect.getAgentNumAndSourceNum().then((res) => {
            if (res.success) {
                this.agentnum = res.data.agentnum;
                this.sourcenum = res.data.sourcenum;
            }
        })

        // collect.lineData().then((res) => {
        //     this.chartData = res;
        // })
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
</style>
