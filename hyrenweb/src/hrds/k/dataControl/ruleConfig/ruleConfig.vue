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
                    <el-button type="primary" @click="addRuleData()">新增</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-divider/>
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
                            <el-button @click="editRuleData(scope.row.reg_num)" icon="el-icon-edit" type="text"
                                       size="medium" title="编辑"/>
                        </el-col>
                        <el-col :span="4">
                            <el-button @click="viewRuleSchedulingStatus(scope.row.reg_num)" icon="el-icon-s-unfold"
                                       type="text" size="medium" title="查看调度状态"/>
                        </el-col>
                        <el-col :span="4">
                            <el-button @click="delRuleData(scope.row.reg_num)" icon="el-icon-delete-solid" type="text"
                                       size="medium" title="删除"/>
                        </el-col>
                        <el-col :span="4">
                            <el-button @click="releaseTrigger(scope.row.reg_num)" icon="el-icon-share" type="text"
                                       size="medium" title="发布"/>
                        </el-col>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper" style="text-align: center"
                           :total="totalSize">
            </el-pagination>
        </el-row>

        <!-- 弹出手动执行模态框 start-->
        <el-dialog title="请输入检查日期" :visible.sync="manual_execution_dialog">
            <el-row>
                <el-date-picker v-model="verify_date" placeholder="开始日期" value-format="yyyyMMdd"/>
                <el-button type="primary" class="goIndex" size="mini" @click="manualExecution()">确定
                </el-button>
                <el-button type="danger" class="goIndex" size="mini" @click="manual_execution_dialog=false"
                           style="margin-right: 5px">取消
                </el-button>
            </el-row>
        </el-dialog>
        <!-- 弹出手动执行模态框 end-->

        <!-- 弹出发布到工程调度模态框 start-->
        <el-dialog title="发布到工程调度" :visible.sync="release_trigger_dialog" width="400px">
            <el-form :model="save_etl_form">
                <el-form-item label="选择工程">
                    <el-select v-model="save_etl_form.etl_sys_cd" placeholder="选择工程" size="mini"
                               @change="selectProjectTrigger">
                        <el-option v-for="i in etl_sys_s" :label="i.etl_sys_name" :value="i.etl_sys_cd"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择任务">
                    <el-select v-model="save_etl_form.sub_sys_cd" placeholder="选择任务" size="mini">
                        <el-option v-for="i in sub_sys_s" :label="i.sub_sys_desc" :value="i.sub_sys_cd"/>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="goIndex" size="mini" @click="saveETLJob">保存</el-button>
                    <el-button type="danger" class="goIndex" size="mini" @click="release_trigger_dialog=false"
                               style="margin-right: 5px">取消
                    </el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 弹出发布到工程调度模态框 end-->

        <!-- 加载过度 -->
        <transition name="fade">
            <loading v-if="isLoading"/>
        </transition>
    </div>
</template>

<script>
    import * as message from '../../../../utils/js/message';
    import * as rcFun from './ruleConfig'
    import Loading from '../../../components/loading';

    export default {
        name: 'ruleConfig',
        components: {
            Loading,
        },
        data() {
            return {
                isLoading: false,
                currentPage: 1,
                pageSize: 5,
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
                release_trigger_reg_num: '',
                release_trigger_dialog: false,
                verify_date: '',
                save_etl_form: {etl_sys_cd: '', sub_sys_cd: '',},
                etl_sys_s: [],
                sub_sys_s: [],
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
                rcFun.searchDqDefinitionInfos(this.search_dq_data,).then(res => {
                    if (res.success) {
                        this.rule_dqd_data_s = res.data.rule_dqd_data_s;
                        this.totalSize = res.data.totalSize;
                    }
                })
            },
            //获取规则信息列表
            getDqDefinitionInfos() {
                rcFun.getDqDefinitionInfos().then(res => {
                    this.rule_dqd_data_s = res.data.rule_dqd_data_s;
                    this.totalSize = res.data.totalSize;
                })
            },
            //获取代码项信息-ETl作业有效标志
            getJobEffectiveFlag() {
                //获取ETl作业有效标志
                this.$Code.getCategoryItems({
                    'category': 'Job_Effective_Flag'
                }).then(res => {
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
                this.$Code.getCategoryItems({
                    'category': 'EdRuleLevel'
                }).then(res => {
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
            //手工执行确定
            manualExecution() {
                this.manual_execution_dialog = false;
                this.isLoading = true;
                rcFun.manualExecution({
                    'reg_num': this.manual_execution_reg_num,
                    'verify_date': this.verify_date
                }).then(res => {
                    if (res.success) {
                        this.isLoading = false;
                        this.$router.push({
                            name: 'ruleDetectionDetail',
                            query: {
                                'task_id': res.data,
                            }
                        });
                    } else {
                        this.isLoading = false;
                    }
                });
            },
            //新增规则信息
            addRuleData() {
                this.$router.push({
                    name: 'ruleInfo',
                    query: {
                        'operation_type': 'add',
                    }
                });
            },
            //编辑规则信息
            editRuleData(reg_num) {
                this.$router.push({
                    name: 'ruleInfo',
                    query: {
                        'operation_type': 'edit',
                        'reg_num': reg_num,
                    }
                });
            },
            //查看规则调度状态
            viewRuleSchedulingStatus(reg_num) {
                this.$router.push({
                    name: 'ruleETLStatus',
                    query: {
                        'reg_num': reg_num,
                    }
                });
            },
            //删除规则
            delRuleData(reg_num) {
                this.$confirm('确认删除吗?').then(() => {
                    rcFun.deleteDqDefinition({'reg_num': reg_num}).then(res => {
                        message.deleteSuccess(res);
                        //获取最新数据
                        this.getDqDefinitionInfos();
                    })
                }).catch(() => {
                    message.customizTitle("已取消删除申请!")
                });
            },
            //发布触发
            releaseTrigger(reg_num) {
                this.save_etl_form = {};
                this.release_trigger_dialog = true;
                this.release_trigger_reg_num = reg_num;
                //获取工程信息
                rcFun.getProInfos().then(res => {
                    this.etl_sys_s = res.data;
                });
            },
            //选择工程触发
            selectProjectTrigger() {
                this.sub_sys_s = [];
                //获取工程下任务信息
                rcFun.getTaskInfo({'etl_sys_cd': this.save_etl_form.etl_sys_cd}).then(res => {
                    this.sub_sys_s = res.data;
                });
            },
            //保存到调度平台
            saveETLJob() {
                if ('' === this.save_etl_form.etl_sys_cd) {
                    this.$message.error('请选择工程!');
                    return;
                }
                if ('' === this.save_etl_form.sub_sys_cd) {
                    this.$message.error('请选择任务!');
                    return;
                }
                //保存作业信息
                rcFun.saveETLJob({
                    'pro_id': this.save_etl_form.etl_sys_cd,
                    'task_id': this.save_etl_form.sub_sys_cd,
                    'reg_num': this.release_trigger_reg_num,
                }).then(res => {
                    if (res.success) {
                        message.saveSuccess(res);
                        this.release_trigger_dialog = false;
                    }
                });
            },
        },
    }
</script>
