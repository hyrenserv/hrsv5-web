<template>
    <div id="ruleInfo">
        <el-row class='topTitle'>
            <span>{{ruleTitle}}规则信息</span>
            <router-link to="/ruleConfig">
                <el-button type="primary" size="small" class="goIndex">返回规则配置</el-button>
            </router-link>
            <el-button type="success" size="small" class="goIndex" style="margin-right: 5px"
                       @click="saveRuleData('form_dq_data')">
                保存
            </el-button>
        </el-row>
        <el-row>
            <el-form :model="form_dq_data" ref="form_dq_data" :inline="true" size="mini" label-position="right">
                <el-collapse v-model="collapse_names">
                    <el-collapse-item title="基本信息" name="基本信息">
                        <div slot="title">
                            <el-button type="text" class="el-icon-edit">基本信息</el-button>
                        </div>
                        <el-row>
                            <el-col :span="7" :offset=1>
                                <el-form-item label="规则名称 :" prop="reg_name" :title="dq_help_info_map.regName">
                                    <el-input v-model="form_dq_data.reg_name" clearable placeholder="规则名称"/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7" :offset=1>
                                <el-form-item label="规则级别 :" prop="reg_name" :title="dq_help_info_map.flag">
                                    <el-select v-model="form_dq_data.flags" filterable placeholder="请选择">
                                        <el-option v-for="i in ed_rule_level_s" :key="i.code" :value="i.code"
                                                   :label="i.value"/>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7" :offset=1>
                                <el-form-item label="规则来源 :" prop="rule_src" :title="dq_help_info_map.ruleSrc">
                                    <el-input v-model="form_dq_data.rule_src" clearable placeholder="规则来源"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7" :offset=1>
                                <el-form-item label="加载策略 :" prop="load_strategy">
                                    <el-input v-model="form_dq_data.load_strategy" clearable placeholder="加载策略"/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7" :offset=1>
                                <el-form-item label="分组序号 :" prop="group_seq">
                                    <el-input v-model="form_dq_data.group_seq" clearable placeholder="分组序号"/>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7" :offset=1>
                                <el-form-item label="规则标签 :" prop="rule_tag" :title="dq_help_info_map.ruleTag">
                                    <el-input v-model="form_dq_data.rule_tag" clearable placeholder="规则标签"/>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item title="配置信息" name="配置信息">
                        <div slot="title">
                            <el-button type="text" class="el-icon-edit">配置信息</el-button>
                        </div>
                        <el-row>
                            <el-col :span="7" :offset=1>
                                <el-form-item label="规则类型 :" prop="case_type" :title="dq_help_info_map.ruleType">
                                    <el-select v-model="form_dq_data.case_type" clearable
                                               :rules="filter_rules([{required: true}])"
                                               @change="caseTypeChange(form_dq_data.case_type)"
                                               filterable placeholder="请选择">
                                        <el-option v-if="i.case_type!==''" v-for="i in dq_rule_def_s"
                                                   :key="i.case_type"
                                                    :value="i.case_type"
                                                   :label="i.case_type+' : '+i.case_type_desc" >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="7">
                                <template v-if="!check_target_tab">
                                    <el-form-item label="目标表名 :" prop="target_tab" :title="dq_help_info_map.targTab">
                                        <el-input v-model="form_dq_data.target_tab" clearable placeholder="目标表名"
                                                  :disabled="check_target_tab">
                                            <el-button @click="showDataSource('target_tab', check_target_tab)"
                                                       slot="append">数据源
                                            </el-button>
                                        </el-input>
                                    </el-form-item>
                                </template>
                            </el-col>
                            <el-col :span="7" :offset=1>
                                <template v-if="!check_target_key_fields">
                                    <el-form-item label="目标字段 :" prop="target_key_fields"
                                                  :title="dq_help_info_map.fields">
                                        <el-input v-model="form_dq_data.target_key_fields" clearable placeholder="目标表字段"
                                                  :disabled="check_target_key_fields">
                                            <el-button @click="selectFieldClick('target_tab',check_target_key_fields)"
                                                       slot="append">选择字段
                                            </el-button>
                                        </el-input>
                                    </el-form-item>
                                </template>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7" :offset=1>
                                <template v-if="!check_limit_condition">
                                    <el-form-item label="过滤条件 :" prop="check_limit_condition"
                                                  :title="dq_help_info_map.limit">
                                        <el-input v-model="form_dq_data.check_limit_condition"
                                                  :disabled="check_limit_condition " clearable placeholder="过滤条件"/>
                                    </el-form-item>
                                </template>
                            </el-col>
                            <el-col :span="7">
                                <template v-if="!check_opposite_tab">
                                    <el-form-item label="比对表名 :" prop="opposite_tab" :title="dq_help_info_map.opTab">
                                        <el-input v-model="form_dq_data.opposite_tab" :disabled="check_opposite_tab"
                                                  clearable placeholder="比对表名">
                                            <el-button slot="append"
                                                       @click="showDataSource('opposite_tab', check_opposite_tab)">
                                                数据源
                                            </el-button>
                                        </el-input>
                                    </el-form-item>
                                </template>
                            </el-col>
                            <el-col :span="7" :offset=1>
                                <template v-if="!check_opposite_tab">
                                    <el-form-item label="比对字段 :" prop="opposite_key_fields"
                                                  :title="dq_help_info_map.opField">
                                        <el-input v-model="form_dq_data.opposite_key_fields" clearable
                                                  :disabled="check_opposite_tab" placeholder="比对字段">
                                            <el-button slot="append"
                                                       @click="selectFieldClick('opposite_tab', check_opposite_tab)">
                                                选择字段
                                            </el-button>
                                        </el-input>
                                    </el-form-item>
                                </template>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="7" :offset=1>
                                <template v-if="!check_range_val">
                                    <el-form-item label="范围最小值 :" prop="range_min_val" :title="dq_help_info_map.min">
                                        <el-input v-model="form_dq_data.range_min_val" placeholder="范围最小值"/>
                                    </el-form-item>
                                </template>
                            </el-col>
                            <el-col :span="7">
                                <template v-if="!check_range_val">
                                    <el-form-item label="范围最大值 :" prop="range_max_val" :title="dq_help_info_map.max">
                                        <el-input v-model="form_dq_data.range_max_val" placeholder="范围最大值"/>
                                    </el-form-item>
                                </template>
                            </el-col>
                            <el-col :span="7" :offset=1>
                                <template v-if="!check_list_vals">
                                    <el-form-item label="清单值域 :" prop="list_vals" :title="dq_help_info_map.listVals">
                                        <el-input v-model="form_dq_data.list_vals" :disabled="check_list_vals"
                                                  clearable placeholder="清单值域"/>
                                    </el-form-item>
                                </template>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item title="结果信息" name="结果信息">
                        <div slot="title">
                            <el-button type="text" class="el-icon-edit">结果信息</el-button>
                        </div>
                        <div>
                            <el-row style="margin-top: 10px; margin-bottom: 5px">
                                <el-col :span="2" :offset=1>
                                    <span :title="dq_help_info_map.sql">检测sql<i class="el-icon-warning"/></span>
                                </el-col>
                                <el-col :span="4" :offset=1>
                                    <el-checkbox true-label="1" false-label="0" v-model="form_dq_data.is_saveindex1">
                                        保存不在范围内的记录数
                                    </el-checkbox>
                                </el-col>
                                <el-col :span="12" :offset=1>
                                    <el-checkbox true-label="1" false-label="0" v-model="form_dq_data.is_saveindex2">
                                        保存检查总记录数
                                    </el-checkbox>
                                </el-col>
                                <el-col :span="1" :offset=1>
                                    <el-button @click="specifySqlCheck(form_dq_data.specify_sql)" size="mini"
                                               type="primary" round>检测
                                    </el-button>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="22" :offset=1>
                                    <el-input type="textarea" autosize :disabled="check_sql_input"
                                              v-model="form_dq_data.specify_sql"/>
                                </el-col>
                            </el-row>
                        </div>
                        <div>
                            <el-row style="margin-top: 10px; margin-bottom: 5px">
                                <el-col :span="3" :offset=1>
                                    <span :title="dq_help_info_map.errSql">问题数据sql<i class="el-icon-warning"/></span>
                                </el-col>
                                <el-col :span="16" :offset=1>
                                    <el-checkbox true-label="1" false-label="0" v-model="form_dq_data.is_saveindex3">
                                        保存明细数据
                                    </el-checkbox>
                                </el-col>
                                <el-col :span="1" :offset=1>
                                    <el-button @click="errDataSqlCheck(form_dq_data.err_data_sql)" size="mini"
                                               type="primary" round>检测
                                    </el-button>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="22" :offset=1>
                                    <el-input type="textarea" autosize :disabled="problem_data_sql_input"
                                              v-model="form_dq_data.err_data_sql"/>
                                </el-col>
                            </el-row>
                        </div>
                        <div>
                            <el-row style="margin-top: 10px; margin-bottom: 5px">
                                <el-col :span="7" :offset=1>
                                    <span class="control-label" :title="dq_help_info_map.index1">检测指标1含义<i
                                            class="el-icon-warning"/></span>
                                    <el-input disabled :disabled="check_index_desc" :value="form_dq_data.index_desc1"/>
                                </el-col>
                                <el-col :span="7" :offset=1>
                                    <span class="control-label" :title="dq_help_info_map.index2">检测指标2含义
                                        <i class="el-icon-warning"/></span>
                                    <el-input disabled :disabled="check_index_desc" :value="form_dq_data.index_desc2"/>
                                </el-col>
                                <el-col :span="6" :offset=1>
                                    <span class="control-label" :title="dq_help_info_map.index3">检测指标3含义
                                        <i class="el-icon-warning"/></span>
                                    <el-input disabled :disabled="check_index_desc" :value="form_dq_data.index_desc3"/>
                                </el-col>
                            </el-row>
                        </div>
                        <div>
                            <el-row style="margin-top: 10px; margin-bottom: 5px">
                                <el-col :span="3" :offset=1>
                                    <span>规则描述</span>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="22" :offset=1>
                                    <el-input type="textarea" autosize v-model="form_dq_data.remark"/>
                                </el-col>
                            </el-row>
                        </div>
                        <div v-if="operation_type === 'edit'">
                            <el-row style="margin-top: 10px; margin-bottom: 5px">
                                <el-col :span="3" :offset=1>
                                    <span>调度作业信息</span>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="22" :offset=1>
                                </el-col>
                            </el-row>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </el-form>
        </el-row>
        <!-- 弹出数据源选择模态框 start-->
        <el-dialog title="选择数据表" :visible.sync="data_source_dialog">
            <el-row>
                <el-col :span="8">
                    <div class="mytree">
                        <el-tree class="filter-tree" :data="dataSourceTreeData" :indent='0'
                                 @node-click="handleNodeClick">
                        <span class="span-ellipsis" slot-scope="{ node, data }">
                            <span :title="data.description">{{node.label}}</span>
                        </span>
                        </el-tree>
                    </div>
                </el-col>
                <el-col :span="16" style="min-height: 400px;">
                    <el-table :data="table_data" size="mini">
                        <el-table-column type="index" label="序号" width="50" align="center"/>
                        <el-table-column prop="hyren_name" label="表英文名" align="center"/>
                        <el-table-column prop="original_name" label="表中文名" align="center"/>
                        <el-table-column prop="file_id" label="选择" align="center">
                            <template slot-scope="scope">
                                <el-radio v-model="table_data_radio" :label="scope.row">{{''}}</el-radio>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-button type="primary" class="goIndex" size="mini" @click="saveTableName">确定</el-button>
                <el-button type="danger" class="goIndex" size="mini" @click="data_source_dialog=false"
                           style="margin-right: 5px">取消
                </el-button>
            </el-row>
        </el-dialog>
        <!-- 弹出数据源选择模态框 end-->

        <!-- 弹出字段选择选择模态框 start-->
        <el-dialog title="选择数据表字段" :visible.sync="table_fields_dialog">
            <el-row>
                <el-col style="min-height: 400px;">
                    <el-table :data="table_fields_info" @selection-change="handleFieldSelectionChange">>
                        <el-table-column type="selection" label="选择" align="center">
                        </el-table-column>
                        <el-table-column prop="column_name" label="字段名" align="center"/>
                        <el-table-column prop="tc_remark" label="字段描述" align="center"/>
                    </el-table>
                </el-col>
            </el-row>
            <el-row style="margin-top: 5px;">
                <el-button type="primary" class="goIndex" size="mini" @click="saveTableFieldsInfo">确定</el-button>
                <el-button type="danger" class="goIndex" size="mini" @click="table_fields_dialog=false"
                           style="margin-right: 5px">取消
                </el-button>
            </el-row>
        </el-dialog>
        <!-- 弹出字段选择选择模态框 end-->

        <!-- 弹出检测结果模态框 start-->
        <el-dialog title="检测结果展示" :visible.sync="test_result_dialog">
            <el-row>
                <el-table :data="sysVarCheckBean" @selection-change="handleFieldSelectionChange">>
                    <el-table-column type="index" label="序号" align="center"/>
                    <el-table-column prop="name" label="变量" align="center"/>
                    <el-table-column prop="value" label="变量值" align="center"/>
                    <el-table-column prop="isEff" label="是否有效" align="center"/>
                </el-table>
            </el-row>
            <el-row style="margin-top: 5px;">
                <i>执行结果 : {{check_is_success}}</i>
            </el-row>
            <el-row>
                <el-button type="danger" class="goIndex" size="mini" @click="test_result_dialog=false"
                           style="margin-right: 5px; margin-top: 5px;">关闭
                </el-button>
            </el-row>
        </el-dialog>
        <!-- 弹出检测结果模态框 end-->
    </div>
</template>

<script>
    import * as message from '../../../../utils/js/message';
    import Loading from '@/hrds/components/loading';
    import * as validator from "@/utils/js/validator";
    import * as rcFun from "./ruleConfig";

    export default {
        name: 'ruleInfo',
        components: {
            Loading,
        },
        data() {
            return {
                //页面变量初始化
                rule: validator.default,
                isLoading: false,
                ruleTitle: '',
                operation_type: '',
                collapse_names: ['基本信息', '配置信息', '结果信息'],
                form_dq_data: {
                    reg_num: 0, reg_name: '', load_strategy: '', group_seq: '', target_tab: '', target_key_fields: '',
                    check_limit_condition: '', opposite_tab: '', opposite_key_fields: '', range_min_val: '',
                    range_max_val: '', list_vals: '', specify_sql: '', err_data_sql: '',
                    index_desc1: '', index_desc2: '', index_desc3: '', flags: '', remark: '', rule_tag: '',
                    mail_receive: '', rule_src: '', is_saveindex1: '0', is_saveindex2: '0', is_saveindex3: '0',
                    case_type: '',
                },
                dq_rule_def_s: [{case_type: '', case_type_desc: ''}],
                dq_rule_def_map: {},
                job_eff_flag_s: [],
                job_eff_flag_map: {},
                ed_rule_level_s: [],
                ed_rule_level_map: {},
                not_range_num: '',
                total_box: '',
                form_dq_data_reg_num: '',
                //系统帮助提示信息
                dq_help_info_s: [{help_info_id: '', help_info_desc: '', help_info_dtl: ''}],
                dq_help_info_map: {
                    scaduleF: '', flag: '', ruleSrc: '', regName: '', ruleType: '', ruleTag: '', targTab: '',
                    fields: '', limit: '', listVals: '', opTab: '', opField: '', min: '', max: '', sql: '', errSql: '',
                    index1: '', index2: '', index3: '',
                },
                //数据源模态框相关
                data_source_dialog: false,
                table_fields_dialog: false,
                test_result_dialog: false,
                source_modal_box_type: '',
                field_modal_box_type: '',
                dataSourceTreeData: [],
                target_tab_info: {},
                opposite_tab_info: {},
                table_data: [],
                table_data_radio: '',
                table_fields_info: [],
                select_fields: [],
                sysVarCheckBean: {name: '', value: '', isEff: ''},
                check_is_success: '',
            }
        },
        created() {
            //获取操作类型 新增,编辑
            if ('edit' === this.$route.query.operation_type) {
                this.ruleTitle = "编辑";
                this.operation_type = this.$route.query.operation_type;
            } else if ('add' === this.$route.query.operation_type) {
                this.ruleTitle = '新增';
                this.operation_type = this.$route.query.operation_type;
            } else {
                this.$message({type: 'info', message: '操作类型错误!'});
            }
            //获取系统帮助提示信息
            this.getDqHelpInfo();
            //获取规则类型数据
            this.getDqRuleDef();
            //获取规则级别标志
            this.getEdRuleLevel();
        },
        mounted() {
            //获取页面初始化数据
            if ('undefined' !== typeof this.$route.query.reg_num) {
                this.getDqDefinition(this.$route.query.reg_num);
            } else {
                this.form_dq_data.flags = '0';
            }
        },
        methods: {
            //获取系统帮助提示信息
            getDqHelpInfo() {
                rcFun.getDqHelpInfo().then(res => {
                    this.dq_help_info_s = res.data;
                    //处理系统帮助提示信息为map类型,显示
                    this.dq_help_info_s.forEach(row => {
                        this.dq_help_info_map[row.help_info_id] = row.help_info_dtl;
                    });
                })
            },
            //规则类型改变事件
            caseTypeChange(case_type) {
                this.dq_rule_def_s.forEach(dq_rule_def => {
                    if (case_type === dq_rule_def.case_type) {
                        this.form_dq_data.index_desc1 = dq_rule_def.index_desc1;
                        this.form_dq_data.index_desc2 = dq_rule_def.index_desc2;
                        this.form_dq_data.index_desc3 = dq_rule_def.index_desc3;
                    }
                })
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
            //获取页面初始化数据
            getDqDefinition(reg_num) {
                rcFun.getDqDefinition({"reg_num": reg_num}).then(res => {
                    this.form_dq_data = res.data;
                });
            },
            //点击数据源列表
            showDataSource(type, isShow) {
                //isShow为true,说明改规则不需要数据表信息
                if (isShow) {
                    return false;
                }
                //设置模态框操作类型 target_tab:目标表,opposite_tab:对比表
                this.source_modal_box_type = type;
                //获取数据源树数据成功后再加载弹框
                this.isLoading = true;
                rcFun.getRuleConfigTreeData().then(res => {
                    if (res.success) {
                        this.isLoading = false;
                        this.dataSourceTreeData = res.data;
                        this.data_source_dialog = true;
                    } else {
                        this.isLoading = false;
                    }
                });
            },
            //树点击触发
            handleNodeClick(data) {
                if (data.file_id === '' && data.classify_id !== '') {
                    //获取分类下所有表信息
                    if ('undefined' !== typeof data.children) {
                        this.table_data = data.children;
                    }
                } else if (data.file_id !== '') {
                    this.table_data = [];
                    this.table_data.push(data);
                }
            },
            //保存表名
            saveTableName() {
                if (this.table_data_radio !== '' && typeof this.table_data_radio !== 'undefined') {
                    //判断模态框操作类型 target_tab:目标表,opposite_tab:对比表
                    if ('target_tab' === this.source_modal_box_type) {
                        this.target_tab_info = this.table_data_radio;
                        this.form_dq_data.target_tab = this.target_tab_info.hyren_name;
                    } else if ('opposite_tab' === this.source_modal_box_type) {
                        this.opposite_tab_info = this.table_data_radio;
                        this.form_dq_data.opposite_tab = this.opposite_tab_info.hyren_name;
                    }
                    this.data_source_dialog = false;
                }
            },
            //选择字段触发
            selectFieldClick(type, isShow) {
                //isShow为true,说明改规则不需要存储该字段
                if (isShow) {
                    return false;
                }
                //设置字段模态框类型
                this.field_modal_box_type = type;
                //判断选中的字段框类型 target_tab:目标表,opposite_tab:对比表
                if ('target_tab' === type) {
                    //校验目标表名
                    if ('undefined' !== typeof this.form_dq_data.target_tab
                        && this.form_dq_data.target_tab.trim() !== '') {
                        //根据目标表信息获取字段列表
                        this.getTableColumns(this.form_dq_data.target_tab);
                        this.table_fields_dialog = true;
                    } else {
                        this.$message({type: 'warning', message: '请检查目标表名合法性!'});
                    }
                } else if ('opposite_tab' === type) {
                    //校验比对表名
                    if ('undefined' !== typeof this.form_dq_data.opposite_tab
                        && this.form_dq_data.opposite_tab.trim() !== '') {
                        //根据比对表信息获取字段列表
                        this.getTableColumns(this.form_dq_data.opposite_tab);
                        this.table_fields_dialog = true;
                    } else {
                        this.$message({type: 'warning', message: '请检查比对表名合法性!'});
                    }
                }
            },
            //根据选中表名获取表字段信息
            getTableColumns(table_name) {
                let params = {};
                params["table_name"] = table_name;
                rcFun.getColumnsByTableName(params).then(res => {
                    this.table_fields_info = res.data;
                });
            },
            //处理字段多选
            handleFieldSelectionChange(val) {
                this.select_fields = val;
            },
            //保存选中字段
            saveTableFieldsInfo() {
                let fields_str = '';
                this.select_fields.forEach(field => {
                    fields_str = fields_str + ',' + field.column_name;
                });
                fields_str = fields_str.substr(1, fields_str.length);
                if ('target_tab' === this.field_modal_box_type) {
                    this.form_dq_data.target_key_fields = fields_str;
                } else if ('opposite_tab' === this.field_modal_box_type) {
                    this.form_dq_data.opposite_key_fields = fields_str;
                }
                this.table_fields_dialog = false;
            },
            //保存规则信息
            saveRuleData(form_dq_data) {
                this.$refs[form_dq_data].validate(valid => {
                    if (valid) {
                        if (this.operation_type === 'add') {
                            rcFun.addDqDefinition(this.form_dq_data).then(res => {
                                if (res.success) {
                                    message.saveSuccess(res);
                                    //添加成功后跳转到规则配置页面
                                    this.$router.push({name: 'ruleConfig',});
                                }
                            });
                        } else if (this.operation_type === 'edit') {
                            rcFun.updateDqDefinition(this.form_dq_data).then(res => {
                                if (res.success) {
                                    message.saveSuccess(res);
                                    //添加成功后跳转到规则配置页面
                                    this.$router.push({name: 'ruleConfig',});
                                }
                            });

                        } else {
                            this.$message({type: 'info', message: '操作类型错误!'});
                        }
                    }
                });
            },
            //指定SQL（校验SQL）检查.
            specifySqlCheck() {
                this.sysVarCheckBean = [];
                rcFun.specifySqlCheck(this.form_dq_data).then(res => {
                    if (res.success) {
                        this.test_result_dialog = true;
                        this.sysVarCheckBean = res.data.sysVarCheckBean;
                        this.check_is_success = res.data.check_is_success;
                    }
                });
            },
            //问题数据sql明细检查
            errDataSqlCheck() {
                rcFun.errDataSqlCheck(this.form_dq_data).then(res => {
                    if (res.success) {
                        this.test_result_dialog = true;
                        this.sysVarCheckBean = res.data.sysVarCheckBean;
                        this.check_is_success = res.data.check_is_success;
                    }
                });
            },
        },
        computed: {
            //检测表名功能处理
            check_target_tab() {
                //如果选择的规则类型为 "" ,则不能选择数据源
                if ("" === this.form_dq_data.case_type) {
                    this.form_dq_data.case_type = "";
                    return true;
                }
                return false;
            },
            //检测表关键字段功能处理
            check_target_key_fields() {
                let case_type = this.form_dq_data.case_type;
                //如果选择的规则类型为 "" | SQL | TAB NAN ,则不能选择字段信息
                if ('' === case_type || "SQL" === case_type || "TAB NAN" === case_type) {
                    this.form_dq_data.target_key_fields = "";
                    return true;
                }
                return false;
            },
            //检测表过滤功能处理
            check_limit_condition() {
                let case_type = this.form_dq_data.case_type;
                if ("" === case_type || "SQL" === case_type) {
                    this.form_dq_data.check_limit_condition = "";
                    return true;
                }
                return false;
            },
            //比对表名功能处理
            check_opposite_tab() {
                let case_type = this.form_dq_data.case_type;
                if ("COL FK" === case_type) {
                    return false;
                }
                this.form_dq_data.opposite_tab = "";
                this.form_dq_data.opposite_key_fields = "";
                return true;
            },
            //清单值域功能处理
            check_list_vals() {
                let case_type = this.form_dq_data.case_type;
                if ("COL ENUM" === case_type || "COL REGULAR" === case_type) {
                    return false;
                }
                this.form_dq_data.list_vals = "";
                return true;
            },
            //范围区间最小/大值功能处理
            check_range_val() {
                let case_type = this.form_dq_data.case_type;
                if ("COL RANG" === case_type) {
                    return false;
                }
                this.form_dq_data.range_min_val = "";
                this.form_dq_data.range_max_val = "";
                return true;
            },
            //检测sql功能处理
            check_sql_input() {
                let case_type = this.form_dq_data.case_type;
                let target_tab = this.form_dq_data.target_tab;
                let opposite_tab = this.form_dq_data.opposite_tab;
                let check_limit_condition = '';
                if ('undefined' !== typeof this.form_dq_data.check_limit_condition) {
                    check_limit_condition = this.form_dq_data.check_limit_condition;
                }
                let list_vals = '';
                if ('undefined' !== typeof this.form_dq_data.list_vals) {
                    list_vals = this.form_dq_data.list_vals;
                }
                let target_key_fields = this.form_dq_data.target_key_fields;
                let opposite_key_fields = this.form_dq_data.opposite_key_fields;
                let range_min_val = this.form_dq_data.range_min_val;
                let range_max_val = this.form_dq_data.range_max_val;
                const fields = target_key_fields.split(',');
                //初始化sql
                let sql;
                //判断规则类型处理成不同的sql
                if ("COL ENUM" === case_type) {
                    //初始化sql
                    sql = "";
                    //设置不在范围内的记录数sql
                    sql = " SELECT \n\tCOUNT(1) AS index1,COUNT(1) \nFROM \n\t" + target_tab + " T1 \nWHERE \n\t";
                    if ('' !== check_limit_condition) {
                        sql = sql + "(" + check_limit_condition + ") \n AND \n\t";
                    }
                    if (fields.length > 0) {
                        fields.forEach(field => {
                            sql = sql + " " + field + " NOT IN (" + list_vals + ") AND";
                        });
                    }
                    sql = sql.substr(0, sql.length - 4);
                    sql += ";";
                    //设置检查的总记录数
                    sql += "\n\n SELECT \n\t COUNT(1) AS index2 \n FROM \n\t " + target_tab;
                    if ('' !== check_limit_condition) {
                        sql = sql + "\n WHERE \n\t (" + check_limit_condition + ")";
                    }
                    sql += ";";
                } else if ("COL FK" === case_type) {
                    //初始化sql
                    sql = "";
                    //设置不在范围内的记录数sql
                    sql = " SELECT \n\t COUNT(1) AS index1,COUNT(1) \n FROM \n\t " + target_tab + " T1 \n WHERE \n\t";
                    if ('' !== check_limit_condition) {
                        sql = sql + "(" + check_limit_condition + ") \n AND \n\t";
                    }
                    if (fields.length > 0) {
                        fields.forEach(field => {
                            sql = sql + " " + field + " NOT IN (SELECT " + opposite_key_fields + " FROM " +
                                opposite_tab + " T2) AND";
                        });
                    }
                    sql = sql.substr(0, sql.length - 4);
                    sql += ";";
                    //设置检查的总记录数
                    sql += "\n\n SELECT \n\t COUNT(1) AS index2 \n FROM \n\t " + target_tab;
                    if ('' !== check_limit_condition) {
                        sql = sql + "\n WHERE \n\t(" + check_limit_condition + ")";
                    }
                    sql += ";";
                } else if ("COL PK" === case_type) {
                    //初始化sql
                    sql = "";
                    //设置不在范围内的记录数sql
                    sql = " SELECT \n\t COUNT(1) AS index1,COUNT(1) \n FROM \n\t (SELECT " + target_key_fields +
                        " FROM " + target_tab + " GROUP BY " + target_key_fields + " HAVING COUNT(1) > 1 ) T;";
                    //设置检查的总记录数
                    sql += "\n\n SELECT \n\t COUNT(1) AS index2 \n FROM \n\t " + target_tab + " T";
                    sql += ";";
                } else if ("COL RANG" === case_type) {
                    //初始化sql
                    sql = "";
                    //设置不在范围内的记录数sql
                    sql = " SELECT \n\t COUNT(1) AS index1, COUNT(1) \n FROM \n\t " + target_tab + " \n WHERE \n\t";
                    if ('' !== check_limit_condition) {
                        sql = sql + "(" + check_limit_condition + ") \n AND \n\t";
                    }
                    if (fields.length > 0) {
                        fields.forEach(field => {
                            sql = sql + " " + field + " <= " + range_min_val + " OR " + field + " >= " +
                                range_max_val + ") AND";
                        });
                    }
                    sql = sql.substr(0, sql.length - 4);
                    sql += ";";
                    //设置检查的总记录数
                    sql += "\n\n SELECT \n\t COUNT(1) AS index2 \n FROM \n\t " + target_tab;
                    if ('' !== check_limit_condition) {
                        sql = sql + "\n WHERE \n\t(" + check_limit_condition + ")";
                    }
                    sql += ";";
                } else if ("COL REGULAR" === case_type) {
                    //初始化sql
                    sql = "";
                    //设置不在范围内的记录数sql
                    sql = " SELECT \n\t COUNT(1) AS index1,COUNT(1) \n FROM \n\t " + target_tab + " T1 \n WHERE \n\t";
                    if ('' !== check_limit_condition) {
                        sql = sql + "(" + check_limit_condition + ") \n AND \n\t";
                    }
                    if (fields.length > 0) {
                        fields.forEach(field => {
                            sql += " NOT(( " + field + " ) ~ ( " + list_vals + " )) AND";
                        });
                    }
                    sql = sql.substr(0, sql.length - 4);
                    //设置检查的总记录数
                } else if ("SQL" === case_type) {
                    this.form_dq_data.specify_sql = "";
                    return false;
                } else if ("COL NAN" === case_type) {
                    //初始化sql
                    sql = "";
                    //设置不在范围内的记录数sql
                    sql = " SELECT \n\t COUNT(1) AS index1,COUNT(1) \n FROM \n\t " + target_tab + " \n WHERE \n\t";
                    if ('' !== check_limit_condition) {
                        sql = sql + "(" + check_limit_condition + ") \n AND \n\t";
                    }
                    if (fields.length > 0) {
                        fields.forEach(field => {
                            sql += "(" + field + " IS NULL OR TRIM(" + field + ")='') AND";
                        });
                    }
                    sql = sql.substr(0, sql.length - 4);
                    sql += ";";
                    //设置检查的总记录数
                    sql += "\n\n SELECT \n\t COUNT(1) AS index2 \n FROM \n\t " + target_tab;
                    if ('' !== check_limit_condition) {
                        sql = sql + "\n WHERE \n\t (" + check_limit_condition + ") \n AND \n\t";
                    }
                    sql += ";";
                } else if ("TAB NAN" === case_type) {
                    //初始化sql
                    sql = "";
                    //设置不在范围内的记录数sql
                    sql = " SELECT \n\t COUNT(1) AS index1 \n FROM \n\t " + target_tab;
                    if ('' !== check_limit_condition) {
                        sql = sql + "\n WHERE \n\t(" + check_limit_condition + ")";
                    }
                    sql += ";";
                    //设置检查的总记录数
                }
                this.form_dq_data.specify_sql = sql;
                return true;
            },
            //问题明细sql功能处理
            problem_data_sql_input() {
                let case_type = this.form_dq_data.case_type;
                let target_tab = this.form_dq_data.target_tab;
                let opposite_tab = this.form_dq_data.opposite_tab;
                let check_limit_condition = '';
                if ('undefined' !== typeof this.form_dq_data.check_limit_condition) {
                    check_limit_condition = this.form_dq_data.check_limit_condition;
                }
                let list_vals = '';
                if ('undefined' !== typeof this.form_dq_data.list_vals) {
                    list_vals = this.form_dq_data.list_vals;
                }
                let target_key_fields = this.form_dq_data.target_key_fields;
                let opposite_key_fields = this.form_dq_data.opposite_key_fields;
                let range_min_val = this.form_dq_data.range_min_val;
                let range_max_val = this.form_dq_data.range_max_val;
                const fields = target_key_fields.split(',');
                //初始化sql
                let sql;
                //判断规则类型处理成不同的sql
                if ("COL ENUM" === case_type) {
                    //初始化sql
                    sql = "";
                    //问题数据sql
                    sql = " SELECT \n\t " + target_key_fields + " \n FROM \n\t " + target_tab + " T1 \n WHERE \n\t";
                    if ('' !== check_limit_condition) {
                        sql = sql + "(" + check_limit_condition + ") \n AND \n\t";
                    }
                    if (fields.length > 0) {
                        fields.forEach(field => {
                            sql = sql + " " + field + " NOT IN (" + list_vals + ") AND";
                        });
                    }
                    sql = sql.substr(0, sql.length - 4);
                } else if ("COL FK" === case_type) {
                    //初始化sql
                    sql = "";
                    //问题数据sql
                    sql = " SELECT \n\t " + target_key_fields + " \n FROM \n\t " + target_tab + " T1 \n WHERE \n\t";
                    if ('' !== check_limit_condition) {
                        sql = sql + "(" + check_limit_condition + ") \n AND \n\t";
                    }
                    if (fields.length > 0) {
                        fields.forEach(field => {
                            sql = sql + " " + field + " NOT IN (SELECT " + opposite_key_fields + " FROM " +
                                opposite_tab + " T2) AND";
                        });
                    }
                    sql = sql.substr(0, sql.length - 4);
                } else if ("COL PK" === case_type) {
                    //初始化sql
                    sql = "";
                    //问题数据sql
                    sql = " SELECT \n\t" + target_key_fields + "\n FROM \n\t (SELECT " + target_key_fields +
                        " FROM " + target_tab + " GROUP BY " + target_key_fields + " HAVING COUNT(1) > 1 ) T";
                } else if ("COL RANG" === case_type) {
                    //初始化sql
                    sql = "";
                    //设置不在范围内的记录数sql
                    sql = " SELECT \n\t " + target_key_fields + " \n FROM \n\t " + target_tab + " \n WHERE \n\t";
                    if ('' !== check_limit_condition) {
                        sql = sql + "(" + check_limit_condition + ") \n AND \n\t";
                    }
                    if (fields.length > 0) {
                        fields.forEach(field => {
                            sql = sql + " " + field + " <= " + range_min_val + " OR " + field + " >= " +
                                range_max_val + ") AND";
                        });
                    }
                    sql = sql.substr(0, sql.length - 4);
                } else if ("COL REGULAR" === case_type) {
                    //初始化sql
                    sql = "";
                    //设置不在范围内的记录数sql
                    sql = " SELECT \n\t " + target_key_fields + " \n FROM \n\t " + target_tab + " T1 \n WHERE \n\t";
                    if ('' !== check_limit_condition) {
                        sql = sql + "(" + check_limit_condition + ") \n AND \n\t";
                    }
                    if (fields.length > 0) {
                        fields.forEach(field => {
                            sql += " NOT(( " + field + " ) ~ ( " + list_vals + " )) AND";
                        });
                    }
                    sql = sql.substr(0, sql.length - 4);
                } else if ("SQL" === case_type) {
                    sql = "";
                    return false;
                } else if ("COL NAN" === case_type) {
                    //初始化sql
                    sql = "";
                    //设置不在范围内的记录数sql
                    sql = " SELECT \n\t * \n FROM \n\t " + target_tab + " \n WHERE \n\t";
                    if ('' !== check_limit_condition) {
                        sql = sql + "(" + check_limit_condition + ") \n AND \n\t";
                    }
                    if (fields.length > 0) {
                        fields.forEach(field => {
                            sql += "(" + field + " IS NULL OR TRIM(" + field + ")='') AND";
                        });
                    }
                    sql = sql.substr(0, sql.length - 4);
                }
                this.form_dq_data.err_data_sql = sql;
                return true;
            },
            //指标含义功能处理
            check_index_desc() {
                let case_type = this.form_dq_data.case_type;
                return "SQL" !== case_type;
            },
        },
    }
</script>
