<template>
    <div id='dataControl'>
        <el-row class='topTitle'>
            <span>数据管控</span>
            <router-link to="/dataControl">
                <el-button type="primary" size="small" class="goIndex">
                    <i class="fa fa-home fa-lg"/>返回首页
                </el-button>
            </router-link>
        </el-row>
        <el-row class="bottomMargin">
            <el-col>
                <el-button v-for="item in this.dmStatistics.tableStatistics">
                    <el-row>{{item.dsl_name}}表数:</el-row>
                    <el-row>{{item.count}}</el-row>
                </el-button>
            </el-col>
        </el-row>
        <el-row>
            <hr>
        </el-row>
        <el-row>
            <el-col :span="4">
                <router-link to="/mateDataManagement">
                    <el-button type="primary">元数据管理</el-button>
                </router-link>
            </el-col>
            <el-col :span="4">
                <router-link to="/bloodAnalysis">
                    <el-button type="primary">血缘分析</el-button>
                </router-link>
            </el-col>
            <el-col :span="4">
                <router-link to="/variableConfig">
                    <el-button type="primary">变量配置</el-button>
                </router-link>
            </el-col>
            <el-col :span="4">
                <router-link to="/ruleConfig">
                    <el-button type="primary">规则配置</el-button>
                </router-link>
            </el-col>
            <el-col :span="4">
                <router-link to="/ruleResults">
                    <el-button type="primary">规则结果</el-button>
                </router-link>
            </el-col>
        </el-row>
        <el-row>
            <hr>
        </el-row>
        <el-row>
            <el-col :span="7">
                <el-row>检查通过TOP5</el-row>
                <el-row>
                    <el-table :data="this.dmStatistics.ruleStatistics.check_passes_top5">
                        <el-table-column prop="task_id" label="任务编号" align="center"/>
                        <el-table-column prop="verify_date" label="检查日期" align="center"/>
                        <el-table-column prop="target_tab" label="目标表名" align="center"/>
                    </el-table>
                </el-row>
            </el-col>
            <el-col :span="7" :offset="1">
                <el-row>数据异常TOP5</el-row>
                <el-row>
                    <el-table :data="this.dmStatistics.ruleStatistics.check_exception_top5">
                        <el-table-column prop="task_id" label="任务编号" align="center"/>
                        <el-table-column prop="verify_date" label="检查日期" align="center"/>
                        <el-table-column prop="target_tab" label="目标表名" align="center"/>
                    </el-table>
                </el-row>
            </el-col>
            <el-col :span="7" :offset="1">
                <el-row>执行失败TOP5</el-row>
                <el-row>
                    <el-table :data="this.dmStatistics.ruleStatistics.execution_failed_top5">
                        <el-table-column prop="task_id" label="任务编号" align="center"/>
                        <el-table-column prop="verify_date" label="检查日期" align="center"/>
                        <el-table-column prop="target_tab" label="目标表名" align="center"/>
                    </el-table>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import * as dataControlFun from './dataControl'

    export default {
        components: {},

        data() {
            return {
                dmStatistics: {
                    tableStatistics: [],
                    ruleStatistics: {
                        check_passes_number: 0,
                        check_exception_number: 0,
                        execution_failed_number: 0,
                        rule_total_number: 0,
                        check_passes_top5: [],
                        check_exception_top5: [],
                        execution_failed_top5: [],
                    },
                },

            }
        },
        created() {
            //获取统计数据
            this.getDMStatistics();
        },
        methods: {
            //获取统计数据
            getDMStatistics() {
                dataControlFun.getDMStatistics().then(res => {
                    this.dmStatistics = res.data;
                })
            },
        },
    }
</script>

<style>
</style>
