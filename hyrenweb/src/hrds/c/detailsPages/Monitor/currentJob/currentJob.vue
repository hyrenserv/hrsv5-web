<template>
<div>
    <div class="title">搜索条件</div>
    <el-form :model="form" ref="form" class="demo-form-inline tops" :inline="true">
        <el-form-item label="作业名称" style="font-weight: 600">
            <el-input v-model="form.etl_job" placeholder="作业名称" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="search" size="mini">搜索</el-button>
            <el-button type="success" @click="intervene" size="mini">干预</el-button>
        </el-form-item>
    </el-form>
    <div class="titles">作业信息</div>
    <el-form :model="forms" ref="forms" class="demo-form-inline" :inline="true" label-width="100px">
        <el-col :span="8">
            <el-form-item label="作业描述">
                <el-input v-model="forms.etl_job_desc" size="mini" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="作业程序类型">
                <el-input v-model="forms.pro_type" size="mini" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="调度时间位移">
                <el-input v-model="forms.disp_offset" size="mini" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="作业程序参数">
                <el-input v-model="forms.pro_para" size="mini" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="调度触发时间">
                <el-input v-model="forms.disp_time" size="mini" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="调度频率" v-model="forms.disp_freq">
                <el-input size="mini" v-if="forms.disp_freq == null" value="" disabled></el-input>
                <el-input size="mini" v-if="forms.disp_freq == 'D'" value="天(D)" disabled></el-input>
                <el-input size="mini" v-if="forms.disp_freq == 'M'" value="月(M)" disabled></el-input>
                <el-input size="mini" v-if="forms.disp_freq == 'W'" value="周(W)" disabled></el-input>
                <el-input size="mini" v-if="forms.disp_freq == 'X'" value="旬(X)" disabled></el-input>
                <el-input size="mini" v-if="forms.disp_freq == 'Y'" value="年(Y)" disabled></el-input>
                <el-input size="mini" v-if="forms.disp_freq == 'F'" value="频率(F)" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="作业程序名称">
                <el-input v-model="forms.pro_name" size="mini" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="当前批量日期">
                <el-input v-model="forms.curr_bath_date" size="mini" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="调度触发方式" v-model="forms.disp_type">
                <el-input size="mini" v-if="forms.disp_type == null" value="" disabled></el-input>
                <el-input size="mini" v-if="forms.disp_type == 'B'" value="批前(B)" disabled></el-input>
                <el-input size="mini" v-if="forms.disp_type == 'D'" value="依赖触发(D)" disabled></el-input>
                <el-input size="mini" v-if="forms.disp_type == 'T'" value="定时T+1触发(T)" disabled></el-input>
                <el-input size="mini" v-if="forms.disp_type == 'Z'" value="定时T+0触发(Z)" disabled></el-input>
                <el-input size="mini" v-if="forms.disp_type == 'A'" value="批后(A)" disabled></el-input>
                <el-input size="mini" v-if="forms.disp_type == 'F'" value="频率(F)" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="作业程序目录">
                <el-input v-model="forms.pro_dic" size="mini" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="开始时间">
                <el-input v-model="forms.star_time" size="mini" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="作业有效标志" v-model="forms.job_eff_flag">
                <el-input size="mini" v-if="forms.job_eff_flag == null" value="" disabled></el-input>
                <el-input size="mini" v-if="forms.job_eff_flag == 'Y'" value="有效(Y)" disabled></el-input>
                <el-input size="mini" v-if="forms.job_eff_flag == 'N'" value="无效(N)" disabled></el-input>
                <el-input size="mini" v-if="forms.job_eff_flag == 'V'" value="空跑(V)" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="日志目录">
                <el-input v-model="forms.log_dic" size="mini" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="结束时间">
                <el-input v-model="forms.end_time" size="mini" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="当天是否调度" v-model="forms.today_disp">
                <el-input size="mini" v-if="forms.today_disp == null" value="" disabled></el-input>
                <el-input size="mini" v-if="forms.today_disp == 'Y'" value="是(Y)" disabled></el-input>
                <el-input size="mini" v-if="forms.today_disp == 'N'" value="否(N)" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="备注信息">
                <el-input v-model="forms.comments" size="mini" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="超时阀值">
                <el-input v-model="forms.overtime_val" size="mini" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="作业调度状态" v-model="forms.job_disp_status">
                <el-input size="mini" v-if="forms.job_disp_status == null" value="" disabled></el-input>
                <el-input size="mini" v-if="forms.job_disp_status == 'D'" value="完成" disabled></el-input>
                <el-input size="mini" v-if="forms.job_disp_status == 'E'" value="错误" disabled></el-input>
                <el-input size="mini" v-if="forms.job_disp_status == 'P'" value="挂起" disabled></el-input>
                <el-input size="mini" v-if="forms.job_disp_status == 'R'" value="运行" disabled></el-input>
                <el-input size="mini" v-if="forms.job_disp_status == 'S'" value="停止" disabled></el-input>
                <el-input size="mini" v-if="forms.job_disp_status == 'W'" value="等待" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="主服务器同步标志" v-model="forms.main_serv_sync" label-width="130px">
                <div style="width:150px">
                    <el-input size="mini" v-if="forms.main_serv_sync == null" disabled></el-input>
                    <el-input size="mini" v-if="forms.main_serv_sync == 'L'" value="锁定" disabled></el-input>
                    <el-input size="mini" v-if="forms.main_serv_sync == 'N'" value="不同步" disabled></el-input>
                    <el-input size="mini" v-if="forms.main_serv_sync == 'Y'" value="同步" disabled></el-input>
                    <el-input size="mini" v-if="forms.main_serv_sync == 'B'" value="备份中" disabled></el-input>
                </div>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="超长阀值">
                <el-input v-model="forms.overlength_val" size="mini" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="作业优先级">
                <el-input v-model="forms.job_priority" size="mini" disabled></el-input>
            </el-form-item>
        </el-col>
    </el-form>
    <div class="tips">资源信息</div>
    <el-table ref="multipleTable" size="medium " :data="tableData" tooltip-effect="dark" border style="width: 100%">
        <el-table-column prop="resource_type" label="资源类型" align='center'>
        </el-table-column>
        <el-table-column prop="resource_req" label="需求数" align='center'>
        </el-table-column>
    </el-table>
    <el-row :gutter="20" class="tabBtns">
        <el-col :span="4" :offset="20">
            <el-pagination background layout="prev, pager, next" :total="1">
            </el-pagination>
        </el-col>
    </el-row>
</div>
</template>

<script>
import * as currentJobAllFun from "./currentJob";
export default {
    data() {
        return {
            sys_cd: '',
            job: '',
            form: {
                etl_job: '',
            },
            forms: {
                etl_job_desc: '',
                pro_type: '',
                timeShift: '',
                pro_para: '',
                disp_time: '',
                disp_freq: '',
                pro_name: '',
                curr_bath_date: '',
                disp_type: '',
                pro_dic: '',
                star_time: '',
                job_eff_flag: '',
                log_dic: '',
                end_time: '',
                today_disp: '',
                comments: '',
                overtime_val: '',
                job_disp_status: '',
                main_serv_sync: '',
                overlength_val: '',
                job_priority: '',
                dispFreq: '',
            },
            tableData: [],
        };
    },
    mounted() {
        this.getForm();
    },
    methods: {
        //刷新表单
        getForm() {
            this.sys_cd = sessionStorage.getItem('sys_cd');
            this.job = this.$route.query.etl_job;
            this.form.etl_job = this.job;
            if (this.job) {
                let params = {};
                params["etl_sys_cd"] = this.sys_cd;
                params["etl_job"] = this.form.etl_job;
                currentJobAllFun.monitorCurrJobInfo(params).then(res => {
                    this.forms = res.data;
                    let arr = [];
                    let dates = res.data.resourceRelation;
                    arr.push(dates);
                    this.tableData = arr;
                    let date = res.data;
                });
            }
        },
        changeMenu(val, val2) {
            this.$emit('viewIn', val, val2);
        },
        //搜索按钮
        search() {
            if (this.form.etl_job == '') {
                this.$message({
                    message: '请选择需要搜索的作业名称',
                    type: 'warning'
                });
            } else {
                let params = {};
                params["etl_sys_cd"] = this.sys_cd;
                params["etl_job"] = this.form.etl_job;
                currentJobAllFun.monitorCurrJobInfo(params).then(res => {
                    this.forms = res.data;
                    let arr = [];
                    let dates = res.data.resourceRelation;
                    arr.push(dates);
                    this.tableData = arr;
                });
            }
        },
        //干预按钮
        intervene() {
            this.changeMenu('/jobLevelIntervente', '作业级干预');
            this.$router.push({
                path: '/jobLevelIntervente',
                query: {
                    etl_sys_cd: this.sys_cd,
                    etl_job: this.form.etl_job,
                }
            });

        },
    },
};
</script>

<style scoped>
.title {
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: 600;
}

.titles {
    margin-top: 20px;
    font-weight: 600;
}

.line {
    margin-top: 460px;
}

.lines {
    margin-top: -5px;
    margin-bottom: -5px;
}

.tips {
    margin-top: -5px;
    margin-bottom: 10px;
    font-weight: 600;
}

.tabBtns {
    margin-top: 15px;
}
</style>
