<template>
<div id='dataControl'>
    <el-row class='topTitle'>
        <span>数据管控</span>
    </el-row>
    <el-row>
        <span class="tab_class">元数据管理功能列表</span>
    </el-row>
    <el-row class="elButttonSheetrow">
        <div class="elButttonSheet">
            <router-link to="/mateDataManagement">
                <el-button class="elButttonSheetbutton elButttonSheetbutton1 iconfont icon-guanli">元数据管理</el-button>
            </router-link>
        </div>
        <div class="elButttonSheet">
            <router-link to="/bloodAnalysis">
                <el-button class="elButttonSheetbutton elButttonSheetbutton1 iconfont icon-fenxi">血缘分析</el-button>
            </router-link>
        </div>
        <div class="elButttonSheet">
            <router-link to="/variableConfig">
                <el-button class="elButttonSheetbutton elButttonSheetbutton1 iconfont icon-peizhi">变量配置</el-button>
            </router-link>
        </div>
        <div class="elButttonSheet">
            <router-link to="/ruleConfig">
                <el-button class="elButttonSheetbutton elButttonSheetbutton1 iconfont icon-peizhi1">规则配置</el-button>
            </router-link>
        </div>
        <div class="elButttonSheet">
            <router-link to="/ruleResults">
                <el-button class="elButttonSheetbutton elButttonSheetbutton1 iconfont icon-fenxijieguo">规则结果</el-button>
            </router-link>
        </div>
    </el-row>
    <!-- <el-row>
        <span class="tab_class">存储层表统计信息</span>
    </el-row>
    <el-row class="bottomMargin" :gutter="20">
        <el-col v-for="item in this.tableStatistics" :key="item.dsl_name" :span="3">
            <div class="elcolFor">
                <i class='el-icon-menu' style="font-size:30px"></i>
                <el-row>
                    <div style="font-size: 12px; padding: 0 4px;text-align: center;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.dsl_name}}表数</div>
                </el-row>
                <el-row class="elcolCount">{{item.count}}</el-row>
            </div>
        </el-col>
    </el-row> -->
    <el-row style="height: 310px;">
        <el-col :span="11">
            <span class="tab_class">存储层表统计信息</span>
            <ve-pie :data="dslChartData" :settings="dslChartSettings" />
        </el-col>
        <el-col :span="11">
            <span class="tab_class">规则检测执行统计信息</span>
            <ve-ring :data="ruleChartData" :settings="ruleChartSettings" />
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="8">
            <span class="tab_class">检查通过TOP5</span>
            <el-row class="elrowTop5">
                <el-table stripe border :data="this.ruleStatistics.check_passes_top5" size="medium">
                    <el-table-column show-overflow-tooltip prop="task_id" label="任务编号" align="center" />
                    <el-table-column show-overflow-tooltip width="94" prop="verify_date" label="检查日期" align="center" />
                    <el-table-column show-overflow-tooltip prop="target_tab" label="目标表名" align="center" />
                </el-table>
            </el-row>
        </el-col>
        <el-col :span="7" :offset="1">
            <span class="tab_class"> 数据异常TOP5</span>
            <el-row class="elrowTop5">
                <el-table stripe border :data="this.ruleStatistics.check_exception_top5" size="medium">
                    <el-table-column show-overflow-tooltip prop="task_id" label="任务编号" align="center" />
                    <el-table-column show-overflow-tooltip width="94" prop="verify_date" label="检查日期" align="center" />
                    <el-table-column show-overflow-tooltip prop="target_tab" label="目标表名" align="center" />
                </el-table>
            </el-row>
        </el-col>
        <el-col :span="7" :offset="1">
            <span class="tab_class">执行失败TOP5</span>
            <el-row class="elrowTop5">
                <el-table stripe border :data="this.ruleStatistics.execution_failed_top5" size="medium">
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
            //存储层统计数据图配置信息
            dslChartSettings: {},
            dslChartData: { columns: [], rows: [], },
            ruleChartSettings: {},
            ruleChartData: { columns: [], rows: [], },
        }
    },
    created() {
        //获取表统计信息
        this.getTableStatistics();
        //获取各种规则统计结果
        this.getRuleStatistics();

    },
    methods: {
        //获取统计数据
        getTableStatistics() {
            dataControlFun.getTableStatistics().then(res => {
                this.tableStatistics = res.data;
                // 初始化图表显示样式
                this.dslChartSettings = {
                    radius: 120,
                    offsetY: '220',
                    limitShowNum: 5
                };
                // 初始化 v-charts 图表数据
                this.dslChartData.columns = ['dsl_name', 'count'];
                this.dslChartData.rows = res.data;
            })
        },
        //获取各种规则统计结果
        getRuleStatistics() {
            dataControlFun.getRuleStatistics().then(res => {
                this.ruleStatistics = res.data;
                // 初始化图表显示样式
                this.ruleChartSettings = {
                    name: '规则统计结果',
                    type: 'pie',
                    radius: ['40%', '65%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    }
                };
                // 初始化 v-charts 图表数据
                this.ruleChartData.columns = ['statistics_name', 'count'];
                // console.log(this.ruleStatistics);
                let check_passes_info = { 'statistics_name': '检查通过数', 'count': this.ruleStatistics.check_passes_number }
                let rule_total_info = { 'statistics_name': '规则总数', 'count': this.ruleStatistics.rule_total_number }
                let execution_failed_info = { 'statistics_name': '执行失败数', 'count': this.ruleStatistics.execution_failed_number }
                let check_exception_info = { 'statistics_name': '检查异常数', 'count': this.ruleStatistics.check_exception_number }
                this.ruleChartData.rows.push(check_passes_info, check_exception_info, execution_failed_info, rule_total_info)
            })
        },
    },
}
</script>

<style>
.tab_class {
    font-size: 16px;
    color: #3a8ee6;
    margin-bottom: 4px;
    display: inline-block;
    margin-top: 10px;
}

#dataControl .elButttonSheetrow {
    display: flex;
    border: 1px solid #e6e6e6;
    height: 140px;
    justify-content: center;
    /*垂直居中*/
    align-items: center;
    /*水平居中*/
}

#dataControl .bottomMargin {
    border: 1px solid #e6e6e6;
    padding: 10px;
    margin: 0 !important;
}

#dataControl .bottomMargin .elcolFor {
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
    background: #3d8dd2;
    ;
    padding: 10px 0;
    border-radius: 4px;
    color: #fff;
    margin: 0 10px;
}

#dataControl .bottomMargin .elcolForbutton {
    /* height: px; */
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
    width: 160px;
    height: 80px;
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
