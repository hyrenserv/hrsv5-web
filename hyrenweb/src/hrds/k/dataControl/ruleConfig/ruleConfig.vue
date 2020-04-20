<template>
    <div id='ruleConfig'>
        <el-row class='topTitle'>
            <span>规则配置</span>
            <router-link to="/dataControl">
                <el-button type="primary" size="small" class="goIndex">
                    <i class="fa fa-home fa-lg"/>返回首页
                </el-button>
            </router-link>
        </el-row>
        <el-row>
            <el-form :model="search_dq_data" :inline="true">
                <el-form-item label="规则编号:" prop='reg_num' size="mini">
                    <el-input placeholder="规则编号" v-model="search_dq_data.reg_num"/>
                </el-form-item>
                <el-form-item label="规则名称 : " prop='reg_name' size="mini">
                    <el-input placeholder="规则名称" v-model="search_dq_data.reg_name"/>
                </el-form-item>
                <el-form-item label="规则类型 : " prop='case_type' size="mini">
                    <el-select v-model="search_dq_data.case_type" multiple placeholder="请选择">
                        <el-option v-for="item in dq_rule_def_s" :key="item.case_type" :label="item.case_type_desc"
                                   :value="item.case_type">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="规则标签 : " prop='rule_tag' size="mini">
                    <el-input placeholder="规则标签" v-model="search_dq_data.rule_tag"/>
                </el-form-item>
                <el-form-item label="规则来源 : " prop='rule_src' size="mini">
                    <el-input placeholder="规则来源" v-model="search_dq_data.rule_src"/>
                </el-form-item>
                <el-form-item label="目标表名 : " prop='target_tab' size="mini">
                    <el-input placeholder="目标表名" v-model="search_dq_data.target_tab"/>
                </el-form-item>
                <el-form-item label="调度状态 : " prop='job_status' size="mini">
                    <el-select v-model="search_dq_data.job_status" multiple placeholder="请选择">
                        <el-option v-for="i in job_eff_flag_s" :key="i.code" :label="i.value" :value="i.code"/>
                    </el-select>
                </el-form-item>
                <el-form-item size="mini">
                    <el-button type="primary" @click="searchDqData()">搜索</el-button>
                </el-form-item>
                <el-form-item size="mini">
                    <el-button type="primary" @click="addRuleData(dq_rule_def_s,ed_rule_level_s)">新增</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <hr>
        </el-row>
        <el-row>
            <el-table :data="rule_dqd_data_s.slice((currentPage-1) * pageSize,currentPage * pageSize)" size="mini">
                <el-table-column type="index" prop="date" label="序号" align="center" width="80px">
                    <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
                </el-table-column>
                <el-table-column prop="reg_num" label="规则编号" align="center"/>
                <el-table-column prop="reg_name" label="规则名称" align="center"/>
                <el-table-column prop="case_type" label="规则类型" align="center">
                    <template slot-scope="scope">{{dq_rule_def_map[scope.row.case_type]}}</template>
                </el-table-column>
                <el-table-column prop="rule_tag" label="规则标签" align="center"/>
                <el-table-column prop="rule_src" label="规则来源" align="center"/>
                <el-table-column prop="target_tab" label="目标表名" align="center"/>
                <el-table-column prop="job_status" label="调度状态" align="center">
                    <template slot-scope="scope">{{job_eff_flag_map[scope.row.job_status]}}</template>
                </el-table-column>
                <el-table-column prop="app_updt_dt" label="修改日期" align="center"/>
                <el-table-column prop="app_updt_ti" label="修改时间" align="center"/>
                <el-table-column prop="operate" label="操作" align="center" width="140px">
                    <template slot-scope="scope">
                        <el-col :span="4">
                            <el-button @click="manual_execution_click(scope.row.reg_num)" icon="el-icon-caret-right"
                                       type="text" size="medium" title="手工执行"/>
                        </el-col>
                        <el-col :span="4">
                            <el-button @click="editRuleData(scope.row,dq_rule_def_s,ed_rule_level_s)"
                                       icon="el-icon-edit" type="text" size="medium" title="编辑"/>
                        </el-col>
                        <el-col :span="4">
                            <el-button @click="viewRuleSchedulingStatus(scope.row)" icon="el-icon-s-unfold" type="text"
                                       size="medium" title="查看调度状态"/>
                        </el-col>
                        <el-col :span="4">
                            <el-button @click="delRuleData(scope.row)" icon="el-icon-delete-solid" type="text"
                                       size="medium" title="删除"/>
                        </el-col>
                        <el-col :span="4">
                            <el-button @click="delRuleData(scope.row)" icon="el-icon-share" type="text"
                                       size="medium" title="发布"/>
                        </el-col>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="currentPage" :page-sizes="[10, 50, 100, 500]" :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper" style="text-align: center"
                           :total="rule_dqd_data_s.length">
            </el-pagination>
        </el-row>
        <!-- 弹出手动执行模态框 start-->
        <el-dialog title="请输入检查日期" :visible.sync="manual_execution_dialog">
            <el-row>
                <el-date-picker v-model="verify_date" placeholder="开始日期" value-format="yyyyMMdd"/>
                <el-button type="primary" class="goIndex" size="mini"
                           @click="manualExecution()">确定
                </el-button>
                <el-button type="danger" class="goIndex" size="mini" @click="manual_execution_dialog=false"
                           style="margin-right: 5px">取消
                </el-button>
            </el-row>
        </el-dialog>
        <!-- 弹出手动执行模态框 end-->
    </div>
</template>
<script>
    import * as message from '../../../../utils/js/message';
    import * as rcFun from './ruleConfig'

    export default {
        name: 'ruleConfig',
        components: {},
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                totalSize: 0,
                search_dq_data: {},
                rule_dqd_data_s: [],
                dq_rule_def_s: [],
                dq_rule_def_map: {},
                job_eff_flag_s: [],
                job_eff_flag_map: {},
                ed_rule_level_s: [],
                ed_rule_level_map: {},
                manual_execution_reg_num: '',
                manual_execution_dialog: false,
                verify_date: '',
            }
        },
        created() {
            //获取规则类型信息
            this.getDqRuleDef();
            //获取代码项信息-ETl作业有效标志
            this.getJobEffectiveFlag();
            //获取代码项信息-规则级别标志
            this.getEdRuleLevel();
        },
        watch: {},
        mounted() {
            //获取规则信息列表
            this.getDqDefinitionInfos();
        },
        methods: {
            /* 设置每页显示条数 */
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
            },
            /* 查询页面 */
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
            },
            //检索规则信息
            searchDqData() {
                rcFun.searchDqDefinitionInfos(this.search_dq_data).then(res => {
                    if (res.success) {
                        this.rule_dqd_data_s = res.data;
                    }
                })
            },
            //获取规则信息列表
            getDqDefinitionInfos() {
                rcFun.getDqDefinitionInfos({'currPage': this.currPage, "pageSize": this.pageSize}).then(res => {
                    this.rule_dqd_data_s = res.data;
                })
            },
            //获取代码项信息-ETl作业有效标志
            getJobEffectiveFlag() {
                //获取ETl作业有效标志
                this.$Code.getCategoryItems({'category': 'Job_Effective_Flag'}).then(res => {
                    this.job_eff_flag_s = res.data;
                    //处理作业有效标志信息为map类型,显示
                    this.job_eff_flag_s.forEach(row => {
                        this.job_eff_flag_map[row.code] = row.value;
                    });
                });
            },
            //获取代码项信息-规则级别标志
            getEdRuleLevel() {
                //获取规则级别标志
                this.$Code.getCategoryItems({'category': 'EdRuleLevel'}).then(res => {
                    this.ed_rule_level_s = res.data;
                    //处理规则级别标志信息为map类型,显示
                    this.ed_rule_level_s.forEach(row => {
                        this.ed_rule_level_map[row.code] = row.value;
                    });
                });
            },
            //获取规则类型信息
            getDqRuleDef() {
                rcFun.getDqRuleDef().then(res => {
                    this.dq_rule_def_s = res.data;
                    //处理规则类型信息为map类型,显示
                    this.dq_rule_def_s.forEach(row => {
                        this.dq_rule_def_map[row.case_type] = row.case_type_desc;
                    });
                })
            },
            //手动执行点击触发
            manual_execution_click(reg_num) {
                this.manual_execution_dialog = true;
                this.manual_execution_reg_num = reg_num;
            },
            //手工执行
            manualExecution() {
                rcFun.manualExecution({
                    'reg_num': this.manual_execution_reg_num,
                    'verify_date': this.verify_date
                }).then(res => {
                    if (res.success) {
                        this.$router.push({
                            name: '',
                        });
                    }
                });
            },
            //新增规则信息
            addRuleData(dq_rule_def_s, ed_rule_level_s) {
                this.$router.push({
                    name: 'ruleInfo',
                    params: {
                        'ruleTitle': '新增',
                        'operation_type': 'add',
                        'dq_rule_def_s': dq_rule_def_s,
                        'ed_rule_level_s': ed_rule_level_s,
                    }
                });
            },
            //编辑规则信息
            editRuleData(row, dq_rule_def_s, ed_rule_level_s) {
                this.$router.push({
                    name: 'ruleInfo',
                    params: {
                        'ruleTitle': '编辑',
                        'operation_type': 'edit',
                        'dq_rule_def_s': dq_rule_def_s,
                        'ed_rule_level_s': ed_rule_level_s,
                        'form_dq_data': row,
                    }
                });
            },
            //查看规则调度状态
            viewRuleSchedulingStatus() {

            },
            //删除规则
            delRuleData() {
            },
            //发布,发布到调度平台
            saveETLJob() {
            },
        },
    }
</script>
