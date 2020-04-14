<template>
    <div>
        <el-row class='topTitle'>
            <span>数据集市</span>
        </el-row>
        <el-form  class="demo-form-inline" :inline="true" label-width="170px">
            <el-row>
                <span>SQL</span>
            </el-row>
            <el-row>
                <el-input type="textarea" rows="5" readonly="" autosize placeholder="请输入查询SQL" v-model="querysql"/>
            </el-row>
            <el-row>
                <el-form-item label="变量" :rules="rule.default">
                    <el-input v-model="parameter" placeholder="参数如: 自定义名称=123;自定义名称2=456"></el-input>
                </el-form-item>
            </el-row>
            <el-row :span="10" >
                <el-form-item label="日期"  :rules="rule.selected">
                    <el-date-picker  format="yyyy-MM-dd" type="date" v-model="date"
                                    align="right" placeholder="选择日期"></el-date-picker>
                </el-form-item>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" size="medium" class="rightbtn" @click="excutmartjob()" >执行</el-button>
            <el-button type="primary" size="medium" class="rightbtn" @click="back()" >上一步</el-button>
        </div>
    </div>
</template>
<script>
    import * as functionAll from "./marketAction";
    import * as validator from "@/utils/js/validator";
    import * as message from "@/utils/js/message";

    export default {
        data() {
            return {
                rule: validator.default,
                data_mart_id: this.$route.query.data_mart_id,
                datatable_id: this.$route.query.datatable_id,
                date:"",
                parameter:"",
                querysql:"",

            };
        },
        mounted() {
            this.getquerysql();
        },
        methods: {
            back() {
                this.$router.push({
                    name: 'addMartTable_2',
                    query: {
                        data_mart_id: this.data_mart_id,
                        datatable_id: this.datatable_id,
                        is_add: 1
                    }
                });
            },
            getquerysql(){
                functionAll.getQuerySql({"datatable_id":this.datatable_id}).then((res) => {
                    if (res && res.success) {
                        this.querysql = res.data[0].querysql;
                    }
                })
            },
            excutmartjob(){
                let param={
                    "datatable_id":this.datatable_id,
                    "date":this.date,
                    "parameter":this.parameter
                }
                functionAll.excutMartJob(param).then((res) => {
                    debugger;
                    if (res && res.success) {
                        this.querysql = res.data.querysql;
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .demo-form-inlines {
        height: 100px;
    }
</style>
