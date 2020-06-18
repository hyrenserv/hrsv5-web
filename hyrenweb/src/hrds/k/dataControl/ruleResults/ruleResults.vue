<template>
    <div id='dataControl'>
        <el-row class='topTitle'>
            <span>规则结果</span>
            <router-link to="/dataControl">
                <el-button type="primary" size="small" class="goIndex">
                    <i class="fa fa-home fa-lg"/>返回首页
                </el-button>
            </router-link>
        </el-row>
        <el-row>
            <el-form :model="rule_result_form" :inline="true" size='mini'>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="检查日期 : " prop='verify_date'>
                            <el-date-picker v-model="rule_result_form.verify_date" placeholder="检查日期"
                                            value-format="yyyyMMdd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="执行日期 : " prop='start_date'>
                            <el-date-picker v-model="rule_result_form.start_date" placeholder="执行日期"
                                            value-format="yyyyMMdd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="规则来源 : " prop='rule_src'>
                            <el-input placeholder="规则来源 :" v-model="rule_result_form.rule_src"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="规则标签 : " prop='rule_tag'>
                            <el-input placeholder="规则标签 :" v-model="rule_result_form.rule_tag"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="规则名称 : " prop='reg_name'>
                            <el-input placeholder="规则名称 :" v-model="rule_result_form.reg_name"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="规则编号 : " prop='reg_num'>
                            <el-input placeholder="规则编号 :" v-model="rule_result_form.reg_num"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="执行方式 : " prop='exec_mode'>
                            <el-select v-model="rule_result_form.exec_mode" placeholder="请选择">
                                <el-option v-for="item in exec_mode_list" :key="item.code" :label="item.value"
                                           :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="检查结果 : " prop='verify_result'>
                            <el-select v-model="rule_result_form.verify_result" multiple placeholder="请选择">
                                <el-option v-for="item in verify_result_list" :key="item.code" :label="item.value"
                                           :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item>
                            <el-button type="primary" @click="ruleResultSearch()">搜索</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>
        <el-divider/>
        <el-row>
            <el-table :data="rule_result_s.slice((currPage-1) * pageSize,currPage * pageSize)" size="mini">
                <el-table-column type="index" prop="date" label="序号" align="center" width="80px">
                    <template slot-scope="scope">{{scope.$index+(currPage - 1) * pageSize + 1}}</template>
                </el-table-column>
                <el-table-column prop="verify_date" label="检查日期" align="center"/>
                <el-table-column prop="reg_name" label="规则名" align="center"/>
                <el-table-column prop="reg_num" label="规则编号" align="center"/>
                <el-table-column prop="flags" label="规则级别" align="center">
                    <template slot-scope="scope">
                        {{ed_rule_level_map[scope.row.flags]}}
                    </template>
                </el-table-column>
                <el-table-column prop="rule_src" label="规则来源" align="center"/>
                <el-table-column prop="rule_tag" label="规则标签" align="center"/>
                <el-table-column prop="target_tab" label="目标表名" align="center"/>
                <el-table-column prop="start_date_time" label="执行开始时间" align="center" width="130px">
                    <template slot-scope="scope">
                        {{scope.row.start_date+' '+scope.row.start_time}}
                    </template>
                </el-table-column>
                <el-table-column prop="verify_result" label="检查结果" align="center">
                    <template slot-scope="scope">
                        {{verify_result_map[scope.row.verify_result]}}
                    </template>
                </el-table-column>
                <el-table-column prop="exec_mode" label="执行方式" align="center">
                    <template slot-scope="scope">
                        {{exec_mode_map[scope.row.exec_mode]}}
                    </template>
                </el-table-column>
                <el-table-column prop="data_len" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button @click="viewRuleDetectionDetail(scope.row.task_id)" icon="el-icon-s-unfold"
                                   type="text" size="medium" title="查看详情"/>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <el-pagination :total="totalSize" @size-change="handleSizeChange" :page-sizes="[5,10, 50, 100,500]"
                           :page-size="pageSize" @prev-click='preclickFun' :current-page="currPage"
                           @next-click='nextclickFun' @current-change="handleCurrentChange"
                           layout="total, sizes, prev, pager, next, jumper" style="text-align: center">
            </el-pagination>
        </el-row>
    </div>
</template>

<script>

    import * as rrFun from "./ruleResults";

    export default {
        name: "ruleDetectionDetail",
        data() {
            return {
                //页面加载数据
                currPage: 1,
                pageSize: 10,
                totalSize: 0,
                //页面初始化数据
                rule_result_form: {},
                rule_result_s: [],
                exec_mode_list: [],
                exec_mode_map: {},
                verify_result_list: [],
                verify_result_map: {},
                ed_rule_level_map: {},
            }
        },
        created() {
            //获取代码项信息-规则级别标志
            this.getEdRuleLevel();
            //代码项-获取执行方式数据
            this.getDqcExecMode();
            //代码项-获取检查结果数据
            this.getDqcVerifyResult();
        },
        mounted() {
            //获取初始化数据
            this.getRuleResultInfos();
        },
        methods: {
            /* 设置每页显示条数 */
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
            },
            /* 查询页面 */
            handleCurrentChange(currPage) {
                this.currPage = currPage;
            },
            /* 上一页 */
            preclickFun(currPage) {
                this.currPage = currPage;
            },
            /* 下一页 */
            nextclickFun(currPage) {
                this.currPage = currPage;
            },
            //获取代码项信息-规则级别标志
            getEdRuleLevel() {
                //获取规则级别标志
                this.$Code.getCategoryItems({
                    'category': 'EdRuleLevel'
                }).then(res => {
                    res.data.forEach(row => {
                        this.ed_rule_level_map[row.code] = row.value;
                    });
                });
            },
            //获取代码项信息-执行方式
            getDqcExecMode() {
                this.$Code.getCategoryItems({'category': 'DqcExecMode'}).then(res => {
                    this.exec_mode_list = res.data;
                    //处理List为Map
                    this.exec_mode_list.forEach(row => {
                        this.exec_mode_map[row.code] = row.value;
                    });
                });
            },
            //获取代码项信息-检查结果
            getDqcVerifyResult() {
                this.$Code.getCategoryItems({'category': 'DqcVerifyResult'}).then(res => {
                    this.verify_result_list = res.data;
                    //处理List为Map
                    this.verify_result_list.forEach(row => {
                        this.verify_result_map[row.code] = row.value;
                    });
                });
            },
            //获取规则执行结果数据
            getRuleResultInfos() {
                rrFun.getRuleResultInfos().then(res => {
                    this.rule_result_s = res.data.rule_result_s;
                    this.totalSize = res.data.totalSize;
                })
            },
            //规则结果搜索
            ruleResultSearch() {
                rrFun.searchRuleResultInfos(this.rule_result_form).then(res => {
                    this.rule_result_s = res.data.rule_result_s;
                    this.totalSize = res.data.totalSize;
                });
            },
            //查看规则检测详细信息
            viewRuleDetectionDetail(task_id) {
                if ('' !== task_id) {
                    this.$router.push({
                        name: 'ruleDetectionDetail',
                        query: {
                            'task_id': task_id,
                        }
                    });
                }
            },
        }
    }
</script>
