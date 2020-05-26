<template>
<div id='ruleDetectionDetail'>
    <el-row class='topTitle'>
        <span>规则检测详细信息</span>
        <router-link to="/ruleConfig">
            <el-button type="primary" size="small" class="goIndex">返回规则配置</el-button>
        </router-link>
    </el-row>
    <el-row>
        <el-row>规则检测信息</el-row>
        <el-form v-model="form_dq_result" :inline="true" size="mini" label-position="right" title="规则检测详细信息">
            <el-row>
                <el-col :span="6" :offset=2>
                    <el-form-item label="任务编号 :" prop="task_id">
                        <el-input v-model="form_dq_result.task_id" disabled />
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset=1>
                    <el-form-item label="规则编号 :" prop="reg_name">
                        <el-input v-model="form_dq_result.reg_num" disabled />
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset=1>
                    <el-form-item label="规则类型 :" prop="case_type">
                        <el-input v-model="dq_rule_def_map[form_dq_result.case_type]" disabled />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" :offset=2>
                    <el-form-item label="执行方式 :" prop="exec_mode">
                        <el-input v-model="dq_rule_def_map[form_dq_result.case_type]" disabled />
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset=1>
                    <el-form-item label="检查日期 :" prop="verify_date">
                        <el-input v-model="form_dq_result.verify_date" disabled />
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset=1>
                    <el-form-item label="检测表名 :" prop="target_tab">
                        <el-input v-model="form_dq_result.target_tab" disabled />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" :offset=2>
                    <el-form-item label="检测字段 :" prop="target_key_fields">
                        <el-input v-model="form_dq_result.target_key_fields" disabled />
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset=1>
                    <el-form-item label="检测结果 :" prop="verify_result">
                        <el-input v-model="verify_result_map[form_dq_result.verify_result]" disabled />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" :offset=2>
                    <el-form-item label="开始时间 :" prop="start_date_time">
                        <el-input v-model="form_dq_result.start_date + ' '+ form_dq_result.start_time" disabled />
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset=1>
                    <el-form-item label="结束时间 :" prop="end_date_time">
                        <el-input v-model="form_dq_result.end_date + ' '+ form_dq_result.end_time" disabled />
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset=1>
                    <el-form-item label="执行耗时(ms) :" prop="elapsed_ms">
                        <el-input v-model="form_dq_result.elapsed_ms" disabled />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" :offset=2>
                    <el-form-item label="指标结果1 :" prop="check_index1">
                        <el-input v-model="form_dq_result.check_index1" disabled />
                    </el-form-item>
                </el-col>
                <el-col :span="6" :offset=1>
                    <el-form-item label="指标结果2 :" prop="check_index2">
                        <el-input v-model="form_dq_result.check_index2" disabled />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </el-row>
    <!--    当选中保存指标3结果时,显示指标3的结果,只取前10条数据 1:保存,0:不保存   -->
    <el-row v-if="form_dq_result.is_saveindex3 === '1'">
        <el-row>指标3结果</el-row>
        <el-col :span="19" :offset=1>
            <el-table :data="check_index3_list" border size="mini">
                <el-table-column v-for="(index, item) in check_index3_list[0]" :key="check_index3_list.$index" :label="item" :prop="item">
                    <!-- 数据的遍历 scope.row 就代表数据的每一个对象-->
                    <template slot-scope="scope">{{scope.row[scope.column.property]}}</template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <el-row>同规则历史执行信息</el-row>
    <el-row>
        <el-col :span="20" :offset=2>
            <el-table :data="dq_result_s" border size="mini">
                <el-table-column type="index" prop="date" label="序号" align="center" width="80px">
                    <template slot-scope="scope">{{scope.$index+(currPage - 1) * pageSize + 1}}</template>
                </el-table-column>
                <el-table-column prop="task_id" label="任务编号" align="center" />
                <el-table-column prop="verify_date" label="检测数据日期" align="center" />
                <el-table-column prop="verify_result" label="检测结果" align="center">
                    <template slot-scope="scope">{{verify_result_map[scope.row.verify_result]}}</template>
                </el-table-column>
                <el-table-column prop="operate" label="操作" align="center" width="80px">
                    <template slot-scope="scope">
                        <el-button @click="viewRuleDetectionDetail(scope.row.task_id)" icon="el-icon-s-unfold" type="text" size="medium" title="查看详情" />
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination :total="totalSize" @size-change="handleSizeChange" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pageSize" @prev-click='preclickFun' :current-page="currPage" @next-click='nextclickFun' @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" style="text-align: center">
            </el-pagination>
        </el-col>
    </el-row>
</div>
</template>

<script>
import * as rrFun from "../ruleResults/ruleResults";
import * as rcFun from "./ruleConfig";

export default {
    name: "ruleDetectionDetail",
    data() {
        return {
            //页面加载数据
            currPage: 1,
            pageSize: 5,
            totalSize: 0,
            //页面初始化数据
            form_dq_result: {
                task_id: 0,
                reg_num: 0,
                reg_name: '',
                case_type: '',
                exec_mode: '',
                verify_date: '',
                target_tab: '',
                target_key_fields: '',
                verify_result: '',
                start_date: '',
                start_time: '',
                end_date: '',
                end_time: '',
                elapsed_ms: '',
                is_saveindex1: '0',
                is_saveindex2: '0',
                is_saveindex3: '0',
                check_index1: '',
                check_index2: '',
                check_index3: '',
            },
            check_index3_list: [],
            dq_result_s: [],
            task_id: '',
            dq_rule_def_map: {
                case_type: '',
                case_type_desc: ''
            },
            exec_mode_map: {},
            verify_result_map: {},
        }
    },
    created() {
        //获取规则类型数据
        this.getDqRuleDef();
        //获取执行方式数据
        this.getDqcExecMode();
        //获取检查结果数据
        this.getDqcVerifyResult();
    },
    mounted() {
        //获取页面初始化数据
        if ('undefined' !== typeof this.$route.query.task_id) {
            this.task_id = this.$route.query.task_id;
            //获取规则检测结果信息
            this.getRuleDetectDetail()
        } else {
            this.$router.push({
                name: 'ruleConfig'
            });
        }
    },
    watch: {
        '$route'(to, from) { //监听路由是否变化
            if (to.query.task_id != from.query.task_id) {
                this.task_id = to.query.task_id;
                this.getRuleDetectDetail(); //重新加载数据
            }
        }
    },
    methods: {
        /* 设置每页显示条数 */
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.getRuleExecuteHistoryInfo(this.currPage, this.pageSize);
        },
        /* 查询页面 */
        handleCurrentChange(currPage) {
            this.currPage = currPage;
            this.getRuleExecuteHistoryInfo(this.currPage, this.pageSize);
        },
        /* 上一页 */
        preclickFun(currPage) {
            this.currPage = currPage;
        },
        /* 下一页 */
        nextclickFun(currPage) {
            this.currPage = currPage;
        },
        //获取规则类型信息
        getDqRuleDef() {
            rcFun.getDqRuleDef().then(res => {
                res.data.forEach(row => {
                    this.dq_rule_def_map[row.case_type] = row.case_type_desc;
                });
            })
        },
        //获取代码项信息-执行方式
        getDqcExecMode() {
            this.$Code.getCategoryItems({
                'category': 'DqcExecMode'
            }).then(res => {
                res.data.forEach(row => {
                    this.exec_mode_map[row.code] = row.value;
                });
            });
        },
        //获取代码项信息-检查结果
        getDqcVerifyResult() {
            this.$Code.getCategoryItems({
                'category': 'DqcVerifyResult'
            }).then(res => {
                res.data.forEach(row => {
                    this.verify_result_map[row.code] = row.value;
                });
            });
        },
        //获取规则检测结果信息
        getRuleDetectDetail() {
            rrFun.getRuleDetectDetail({
                'task_id': this.task_id
            }).then(res => {
                if (res.success) {
                    if ('undefined' === typeof res.data.end_date) {
                        res.data.end_date = '';
                    }
                    if ('undefined' === typeof res.data.end_time) {
                        res.data.end_time = '';
                    }
                    //如果规则选中保存指标3数据,获取指标3的数据集,取10条
                    if (res.data.is_saveindex3 === '1') {
                        this.getCheckIndex3(res.data.task_id);
                    }
                    this.form_dq_result = res.data;
                    //获取规则执行历史记录信息
                    this.getRuleExecuteHistoryInfo(this.currPage, this.pageSize)
                }
            });
        },
        //获取指标结果3的数据集
        getCheckIndex3(task_id) {
            rrFun.getCheckIndex3({
                'task_id': task_id
            }).then(res => {
                if (res.success) {
                    this.check_index3_list = res.data;
                }
            });
        },
        //分页获取规则执行历史记录信息
        getRuleExecuteHistoryInfo(currPage, pageSize) {
            rrFun.getRuleExecuteHistoryInfo({
                'reg_num': this.form_dq_result.reg_num,
                'currPage': currPage,
                'pageSize': pageSize,
            }).then(res => {
                this.dq_result_s = res.data.dq_result_s;
                this.totalSize = res.data.totalSize;
            });
        },
        //查看规则检测详细信息
        viewRuleDetectionDetail(task_id) {
            if ('' !== task_id) {
                this.cc = task_id;
                this.$router.push({
                    name: 'ruleDetectionDetail',
                    query: {
                        'task_id': task_id,
                    }

                })
            }
        },
    },

}
</script>

<style scoped>

</style>
