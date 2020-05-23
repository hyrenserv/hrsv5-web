<template>
<div id='dataControl'>
    <el-row class='topTitle'>
        <span>数据管控</span>
    </el-row>
    <el-row class="bottomMargin">
        <el-col v-for="item in this.dmStatistics.tableStatistics" :key="item.dsl_name" class="elcolFor" :span="6">
            <el-button type="success" class="elcolForbutton">
                <el-row>{{item.dsl_name}}表数</el-row>
                <el-row class="elcolCount">{{item.count}}</el-row>
            </el-button>
        </el-col>
    </el-row>

    <el-row class="elButttonSheetrow">
        <div class="elButttonSheet">
            <router-link to="/mateDataManagement">
                <el-button class="elButttonSheetbutton elButttonSheetbutton1">元数据管理</el-button>
            </router-link>
        </div>
        <div class="elButttonSheet">
            <router-link to="/bloodAnalysis">
                <el-button class="elButttonSheetbutton elButttonSheetbutton1">血缘分析</el-button>
            </router-link>
        </div>
        <div class="elButttonSheet">
            <router-link to="/variableConfig">
                <el-button class="elButttonSheetbutton elButttonSheetbutton1">变量配置</el-button>
            </router-link>
        </div>
        <div class="elButttonSheet">
            <router-link to="/ruleConfig">
                <el-button class="elButttonSheetbutton elButttonSheetbutton1">规则配置</el-button>
            </router-link>
        </div>
        <div class="elButttonSheet">
            <router-link to="/ruleResults">
                <el-button class="elButttonSheetbutton elButttonSheetbutton1">规则结果</el-button>
            </router-link>
        </div>
    </el-row>
    <el-row>
        <el-col :span="8">
            <p>检查通过TOP5</p>
            <el-row class="elrowTop5">
                <el-table stripe border :data="this.dmStatistics.ruleStatistics.check_passes_top5" size="medium">
                    <el-table-column show-overflow-tooltip prop="task_id" label="任务编号" align="center" />
                    <el-table-column show-overflow-tooltip width="94" prop="verify_date" label="检查日期" align="center" />
                    <el-table-column show-overflow-tooltip prop="target_tab" label="目标表名" align="center" />
                </el-table>
            </el-row>

        </el-col>
        <el-col :span="7" :offset="1">
            <p> 数据异常TOP5</p>
            <el-row class="elrowTop5">
                <el-table stripe border :data="this.dmStatistics.ruleStatistics.check_exception_top5" size="medium">
                    <el-table-column show-overflow-tooltip prop="task_id" label="任务编号" align="center" />
                    <el-table-column show-overflow-tooltip width="94" prop="verify_date" label="检查日期" align="center" />
                    <el-table-column show-overflow-tooltip prop="target_tab" label="目标表名" align="center" />
                </el-table>
            </el-row>
        </el-col>
        <el-col :span="7" :offset="1">
            <p>执行失败TOP5</p>
            <el-row class="elrowTop5">
                <el-table stripe border :data="this.dmStatistics.ruleStatistics.execution_failed_top5" size="medium">
                    <el-table-column show-overflow-tooltip prop="task_id" label="任务编号" align="center" />
                    <el-table-column show-overflow-tooltip width="94" prop="verify_date" label="检查日期" align="center" />
                    <el-table-column show-overflow-tooltip prop="target_tab" label="目标表名" align="center" />
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
#dataControl .elButttonSheetrow {
    display: flex;
    border: 1px solid #e6e6e6;
    height: 200px;
    line-height: 200px;
    margin-top: 20px;
    margin-bottom: 20px;
}

#dataControl .bottomMargin {
    border: 1px solid #e6e6e6;
    padding: 10px;
}

#dataControl .bottomMargin .elcolFor {
    text-align: center
}

#dataControl .bottomMargin .elcolForbutton {
    height: 60px;
    width: 120px;
    border-radius: 10px;
    cursor: default;
}

#dataControl .bottomMargin .elcolCount {
    margin-top: 4px;
    font-weight: 800;
    font-size: 16px;
}

#dataControl .elButttonSheet {
    flex: 1;
    text-align: center;
}

#dataControl .elButttonSheet .elButttonSheetbutton {
    width: 120px;
    height: 90px;
    border-radius: 10px;
}

#dataControl .elButttonSheet .elButttonSheetbutton1 {
    background-color: #5bc0de;
    color: white;
    border-color: #5bc0de;
    font-size: 16px;
}

#dataControl .elrowTop5 {
    min-height: 270px;
    margin-bottom: 20px;
    border: 1px solid #e6e6e6;
    padding: 10px 3px 0 3px;
}

#dataControl p {
    height: 38px;
    background-color: #f5f5f5;
    border-color: #ddd;
    line-height: 38px;
    font-size: 16px;
    padding-left: 5px;
}
</style>
