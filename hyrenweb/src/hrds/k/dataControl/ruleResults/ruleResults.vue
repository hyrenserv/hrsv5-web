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
                <el-row>
                    <el-col :span="7" :offset=1>
                        <el-form-item label="检查日期 : " prop='verify_date'>
                            <el-date-picker v-model="rule_result_form.verify_date" placeholder="检查日期"
                                            value-format="yyyyMMdd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset=1>
                        <el-form-item label="执行日期 : " prop='start_date'>
                            <el-date-picker v-model="rule_result_form.start_date" placeholder="执行日期"
                                            value-format="yyyyMMdd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset=1>
                        <el-form-item label="规则来源 : " prop='rule_src'>
                            <el-input placeholder="规则来源 :" v-model="rule_result_form.rule_src"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7" :offset=1>
                        <el-form-item label="规则标签 : " prop='rule_tag'>
                            <el-input placeholder="规则标签 :" v-model="rule_result_form.rule_tag"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset=1>
                        <el-form-item label="规则名称 : " prop='reg_name'>
                            <el-input placeholder="规则名称 :" v-model="rule_result_form.reg_name"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset=1>
                        <el-form-item label="规则编号 : " prop='reg_num'>
                            <el-input placeholder="规则编号 :" v-model="rule_result_form.reg_num"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7" :offset=1>
                        <el-form-item label="执行方式 : " prop='exec_mode'>
                            <el-select v-model="rule_result_form.exec_mode" placeholder="请选择">
                                <el-option v-for="item in exec_mode_list" :key="item.code" :label="item.value"
                                           :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset=1>
                        <el-form-item label="检查结果 : " prop='verify_result'>
                            <el-select v-model="rule_result_form.verify_result" multiple placeholder="请选择">
                                <el-option v-for="item in verify_result_list" :key="item.code" :label="item.value"
                                           :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7" :offset=1>
                        <el-form-item>
                            <el-button type="primary" @click="ruleResultSearch()">搜索</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-row>
        <el-divider/>
        <el-row>
            <el-table
                    :data="data_meta_info.meta_list.slice((currentPage-1) * pageSize,currentPage * pageSize)"
                    size="mini">
                <el-table-column type="index" prop="date" label="序号" align="center" width="80px">
                    <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
                </el-table-column>
                <el-table-column prop="column_name" label="字段名" align="center"/>
                <el-table-column prop="table_ch_name" label="字段中文名" align="center">
                    <template slot-scope="scope">
                        <el-input placeholder="表中文名" v-model="scope.row.column_ch_name"
                                  v-bind:disabled="column_ch_name_input"/>
                    </template>
                </el-table-column>
                <el-table-column prop="data_type" label="字段类型" align="center"/>
                <el-table-column prop="data_len" label="长度" align="center">
                    <template slot-scope="scope">
                                            <span v-if="scope.row.data_type==='numeric'">
                                                {{scope.row.data_len}},{{scope.row.decimal_point}}</span>
                        <span v-else>{{scope.row.data_len}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="is_primary_key" label="是否主键" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.is_primary_key==='0'">否</span>
                        <span v-else-if="scope.row.is_primary_key==='1'">是</span>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <el-pagination :total="totalSize" @size-change="handleSizeChange" :page-sizes="[10, 50, 100, 500]"
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
                pageSize: 5,
                totalSize: 0,
                //页面初始化数据
                rule_result_form: {
                    verify_date: '', start_date: '', rule_src: '', rule_tag: '', reg_name: '', reg_num: '',
                    exec_mode: '', verify_result: ''
                },
                rule_result_s: [],
                exec_mode_list: [],
                exec_mode_map: {},
                verify_result_list: [],
                verify_result_map: {},
            }
        },
        created() {
            //获取执行方式数据
            this.getDqcExecMode();
            //获取检查结果数据
            this.getDqcVerifyResult();
        },
        mounted() {
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
            //规则结果搜索
            ruleResultSearch() {
                rrFun.searchRuleResultInfos(this.rule_result_form).then(res => {
                    this.rule_result_s = res.data;
                    this.totalSize = res.data.totalSize;
                });
                console.log(this.rule_result_form);
            }
        }
    }
</script>
