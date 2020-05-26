<template>
<div>
    <div class="title">搜索条件</div>
    <el-form :model="form" ref="form" class="demo-form-inline tops" :inline="true">
        <el-form-item label="作业名称" class="itemformel">
            <el-autocomplete :fetch-suggestions="querySearch" v-model="form.etl_job" placeholder="作业名称" size="mini" clearable style="width:284px"></el-autocomplete>
        </el-form-item>
        <el-form-item class="itemformel">
            <el-button type="primary" @click="search" size="mini">搜索</el-button>
            <el-button type="success" @click="intervene" size="mini">干预</el-button>
        </el-form-item>
    </el-form>
    <el-divider></el-divider>
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
            <el-form-item label="调度频率">
                <el-input size="mini" v-model="forms.disp_freq" disabled></el-input>
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
            <el-form-item label="调度触发方式">
                <el-input size="mini" v-model="forms.disp_type" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="作业程序目录">
                <el-input v-model="forms.pro_dic" size="mini" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="开始时间">
                <el-input v-model="forms.curr_st_time" size="mini" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="作业有效标志">
                <el-input size="mini" v-model="forms.job_eff_flag" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="日志目录">
                <el-input v-model="forms.log_dic" size="mini" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="结束时间">
                <el-input v-model="forms.curr_end_time" size="mini" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="当天是否调度" v-model="forms.today_disp">
                <el-input size="mini" v-model="forms.today_disp" disabled></el-input>
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
            <el-form-item label="作业调度状态">
                <el-input size="mini" v-model="forms.job_disp_status" disabled></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="主服务器同步标志" label-width="130px">
                <el-input style="width:148px;" size="mini" v-model="forms.main_serv_sync" disabled></el-input>
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
    <el-table ref="multipleTable" size="medium " :data="tableData" tooltip-effect="dark" stripe border style="width: 100%">
        <el-table-column prop="resource_type" label="资源类型" align='center'>
        </el-table-column>
        <el-table-column prop="resource_req" label="需求数" align='center'>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import * as currentJobAllFun from "./currentJob";
import * as fixedAll from "@/utils/js/fileOperations";
export default {
    data() {
        return {
            sys_cd: '',
            job: '',
            form: {
                etl_job: '',
            },
            listDatas: [],
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
                curr_st_time: '',
                job_eff_flag: '',
                log_dic: '',
                curr_end_time: '',
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
        this.getJobName();
    },
    methods: {
        //刷新表单
        getForm() {
            if (this.$route.etl_sys_cd) {
                this.sys_cd = this.$route.etl_sys_cd;
            } else {
                this.sys_cd = sessionStorage.getItem('sys_cd');
            }
            this.job = this.$route.query.etl_job;
            this.form.etl_job = this.job;
            if (this.job) {
                let params = {};
                params["etl_sys_cd"] = this.sys_cd;
                params["etl_job"] = this.form.etl_job;
                this.monitorCurrJobInfo(params);
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
                this.monitorCurrJobInfo(params);
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
                    name: '/jobLevelIntervente',
                    dec: this.$Base64.encode('作业级干预')
                }
            });

        },
        // input框的历史信息
        querySearch(queryString, cb) {
            var res = this.listDatas;
            var results = queryString ? res.filter(this.createFilter(queryString)) : res;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (res) => {
                return (res.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        //获取作业名称/上游作业名称下拉框数据
        getJobName() {
            let params = {};
            let arr = [];
            let obj = {};
            params["etl_sys_cd"] = this.sys_cd;
            currentJobAllFun.searchEtlJob(params).then(res => {
                res.data.forEach((item) => {
                    obj.label = item;
                    obj.value = item;
                    arr.push(obj);
                    obj = {};
                });
                this.listDatas = arr;
            });
        },
        // 获取当前作业信息
        monitorCurrJobInfo(params) {
            currentJobAllFun.monitorCurrJobInfo(params).then(res => {
                // 数据处理
                switch (res.data.disp_freq) {
                    case 'D':
                        res.data.disp_freq = "天(D)";
                        break;
                    case 'M':
                        res.data.disp_freq = "月(M)";
                        break;
                    case 'W':
                        res.data.disp_freq = "周(W)";
                        break;
                    case 'X':
                        res.data.disp_freq = "旬(X)";
                        break;
                    case 'Y':
                        res.data.disp_freq = "年(Y)";
                        break;
                    case 'F':
                        res.data.disp_freq = "频率(F)";
                        break;
                }

                switch (res.data.disp_type) {
                    case 'B':
                        res.data.disp_type = "批前(B)";
                        break;
                    case 'D':
                        res.data.disp_type = "依赖触发(D)";
                        break;
                    case 'T':
                        res.data.disp_type = "定时T+1触发(T)";
                        break;
                    case 'Z':
                        res.data.disp_type = "定时T+0触发(Z)";
                        break;
                    case 'A':
                        res.data.disp_type = "批后(A)";
                        break;
                    case 'F':
                        res.data.disp_type = "频率(F)";
                        break;
                }
                switch (res.data.job_eff_flag) {
                    case 'V':
                        res.data.job_eff_flag = "空跑(V)";
                        break;
                    case 'N':
                        res.data.job_eff_flag = "无效(N)";
                        break;
                    case 'Y':
                        res.data.job_eff_flag = "有效(Y)";
                        break;
                }

                switch (res.data.today_disp) {
                    case 'N':
                        res.data.today_disp = "否(N)";
                        break;
                    case 'Y':
                        res.data.today_disp = "是(Y)";
                        break;
                }

                switch (res.data.job_disp_status) {
                    case 'D':
                        res.data.job_disp_status = "完成";
                        break;
                    case 'E':
                        res.data.job_disp_status = "错误";
                        break;
                    case 'P':
                        res.data.job_disp_status = "挂起";
                        break;
                    case 'R':
                        res.data.job_disp_status = "运行";
                        break;
                    case 'S':
                        res.data.job_disp_status = "停止";
                        break;
                    case 'W':
                        res.data.job_disp_status = "等待";
                        break;
                }

                switch (res.data.main_serv_sync) {
                    case 'L':
                        res.data.main_serv_sync = "锁定";
                        break;
                    case 'N':
                        res.data.main_serv_sync = "不同步";
                        break;
                    case 'Y':
                        res.data.main_serv_sync = "同步";
                        break;
                    case 'B':
                        res.data.main_serv_sync = "备份中";
                        break;
                }
                if (res.data.curr_st_time != undefined) {
                    if (res.data.curr_st_time.length > 0) {
                        res.data.curr_st_time = fixedAll.dateToMilldate(res.data.curr_st_time);
                    }
                }
                if (res.data.curr_end_time != undefined) {
                    if (res.data.curr_end_time.length > 0) {
                        res.data.curr_end_time = fixedAll.dateToMilldate(res.data.curr_end_time);
                    }
                }
                if (res.data.curr_bath_date != undefined) {
                    if (res.data.curr_bath_date.length > 0) {
                        res.data.curr_bath_date = fixedAll.dateFormat(res.data.curr_bath_date);
                    }
                }
                this.forms = res.data;
                let arr = [];
                let dates = res.data.resourceRelation;
                arr.push(dates);
                this.tableData = arr;
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

.itemformel {
    margin-bottom: 0;
}
</style><style>
.el-autocomplete-suggestion li {
    overflow: visible;
    /* text-overflow: ellipsis; */
}
</style>
