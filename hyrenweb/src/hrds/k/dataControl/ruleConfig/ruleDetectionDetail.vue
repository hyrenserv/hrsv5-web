<template>
    <div id='ruleDetectionDetail'>
        <el-row class='topTitle'>
            <span>规则检测详细信息</span>
            <router-link to="/ruleConfig">
                <el-button type="primary" size="small" class="goIndex">返回规则配置</el-button>
            </router-link>
        </el-row>
        <el-row>
            <el-form v-model="form_dq_data" :inline="true" size="mini" label-position="right">
                <el-form-item label="任务编号 :" prop="task_id">
                    <el-input v-model="form_dq_data.task_id" disabled/>
                </el-form-item>
                <el-form-item label="规则编号 :" prop="reg_name"/>
                <el-form-item label="规则类型 :" prop="case_type"/>
            </el-form>
        </el-row>
    </div>
</template>

<script>

    import * as rrFun from "../ruleResults/ruleResults";

    export default {
        name: "ruleDetectionDetail",
        data() {
            return {
                //页面初始化数据
                form_dq_data: {
                    reg_num: 0, reg_name: '', load_strategy: '', group_seq: '', target_tab: '', target_key_fields: '',
                    check_list_filter: '', opposite_tab: '', opposite_key_fields: '', range_min_val: '',
                    range_max_val: '', list_vals: '', check_limit_condition: '', specify_sql: '', err_data_sql: '',
                    index_desc1: '', index_desc2: '', index_desc3: '', flags: '', remark: '', rule_tag: '',
                    mail_receive: '', rule_src: '', is_saveindex1: '0', is_saveindex2: '0', is_saveindex3: '0',
                    case_type: '',
                },
                task_id: '',
            }
        },
        mounted() {
            //获取页面初始化数据
            if ('undefined' !== typeof this.$route.query.task_id) {
                this.$router.push({name: 'ruleConfig'});
            } else {
                this.getDqDefinition(this.$route.query.task_id);
            }
        }

    }
</script>

<style scoped>

</style>
