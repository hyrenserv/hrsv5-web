<template>
<div class="historyJob">
    <div class="title">搜索条件</div>
    <el-form :model="form" ref="form" class="demo-form-inline" :inline="true" label-width="100px">
        <el-col :span="12">
            <el-form-item label="作业名称">
                <el-input v-model="form.etl_job" placeholder="作业名称" size="small"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="开始批量日期">
                <el-date-picker v-model="form.start_date" @change="changevalue1" type="date" placeholder="开始批量日期" size="small">
                </el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="结束批量日期">
                <el-date-picker v-model="form.end_date" @change="changevalue2" type="date" placeholder="结束批量日期" size="small">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="search" size="small">搜索</el-button>
            </el-form-item>
        </el-col>
    </el-form>
</div>
</template>

<script>
import * as functionAll from "./historyJob";
export default {
    data() {
        return {
            form: {
                etl_job: '',
                start_date: '',
                end_date: '',
                isHistoryBatch: '',
                etl_sys_cd: this.$route.query.etl_sys_cd
            }
        };
    },
    mounted() {
        this.formatterLong24HH('2020-02-19')
        // 通过传参判断是哪种途径
        if (this.$route.query.etl_job) {
            this.form.start_date = this.$route.query.start_date;
            this.form.etl_job = this.$route.query.etl_job;
            this.form.isHistoryBatch = 1;
            this.monitorHistoryJobInfo();
        } else {
            this.form.isHistoryBatch = '';
        }
    },
    methods: {
        //查询历史作业
        monitorHistoryJobInfo() {
            functionAll.monitorHistoryJobInfo(this.form).then(res => {
                console.log(res.data)
            })
        },
        // 点击按钮查询
        search() {
            this.monitorHistoryJobInfo();
        },
        //更改时间格式
        changeTime(val) {
            if (val != null) {
                function changeData(num) {
                    return num > 9 ? (num + "") : ("0" + num);
                };
                let Date = (val.getFullYear() + '-' + changeData((val.getMonth() + 1)) + '-' + changeData(val.getDate()));
                return Date;
            }

        },
        changevalue1(val) {
            this.form.start_date = this.changeTime(val);
        },
        changevalue2(val) {
            this.form.end_date = this.changeTime(val);
        },
        // =====================
        formatterLong24HH(value) {
            var str = 0;
            var datetime = new Date(value);

            var HH = datetime.getHours();
            var MM = datetime.getMinutes();
            var SS = datetime.getMinutes();
            str += SS * 1000;
            str += MM * 60 * 1000;
            str += HH * 60 * 60 * 1000;

            return str;
        },
    }

};
</script>

<style scoped>
.historyJob .title {
    font-size: 16px;
    margin-bottom: 10px;
    font-weight: 600;
}
</style>
