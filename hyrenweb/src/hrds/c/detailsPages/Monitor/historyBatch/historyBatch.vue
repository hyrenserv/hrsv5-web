<template>
<div class="historyBatch">
    <div class="title">搜索条件</div>
    <el-row class="elRowdate">
        日期筛选: <el-date-picker @change="changeValue" v-model="datePickerValue" type="date" placeholder="跑批日期">
        </el-date-picker>
    </el-row>
    <div class="titles">历史信息</div>
    <el-row>
        <ve-histogram :data="chartData"></ve-histogram>
    </el-row>
</div>
</template>

<script>
import * as functionAll from "./historyBatch";
export default {
    data() {
        return {
            datePickerValue: "",
            chartData: {
                columns: ['任务名称', '开始时间', '结束时间'],
                rows: []
            }
        };
    },
    // mounted(){
    //     this.monitorHistoryBatchInfo();

    // },
    methods: {
        // 获取历史批量详情
        monitorHistoryBatchInfo(val) {
            functionAll.monitorHistoryBatchInfo({
                etl_sys_cd: this.$route.query.etl_sys_cd,
                curr_bath_date: val
            }).then((res) => {
                res.data.forEach(item => {
                    item['任务名称'] = item.desc_sys;
                    item['开始时间'] = item.curr_st_time;
                    item['结束时间'] = item.curr_end_time;
                })
                this.chartData.rows = res.data;
                console.log(this.chartData.rows)
            })
        },

        // 获取日期对应数据
        changeValue(val) {
            if (val != null) {
                function changeData(num) {
                    return num > 9 ? (num + "") : ("0" + num);
                };
                let Date = (val.getFullYear() + '-' + changeData((val.getMonth() + 1)) + '-' + changeData(val.getDate()));
                this.monitorHistoryBatchInfo(Date);
            }
        }
    }
};
</script>

<style scoped>
.historyBatch .title {
    font-size: 16px;
    margin-bottom: 5px;
    font-weight: 600;
}

.historyBatch .elRowdate {
    margin-top: 16px;
}

.historyBatch .titles {
    margin-top: 20px;
    font-weight: 600;
}
</style>
