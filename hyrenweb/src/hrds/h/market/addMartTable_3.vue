<template>
    <div>

        <el-row>
            <el-button type="primary" @click="backtodetail()" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回
            </el-button>
        </el-row>
        <Step :active="active"></Step>
        <el-row class='topTitle'>
            <span>配置完成，表名：{{tablename}}</span>
        </el-row>
        <el-tabs type="card">
            <el-row>
                <span>SQL</span>
            </el-row>
            <el-row>
                <el-input class="inputframe" type="textarea" rows="3" readonly v-model="querysql"/>
            </el-row>
            <el-row>
                <el-col :span="20">
                    <el-row>
                        <span>变量</span>
                    </el-row>
                    <el-input class="inputframe" v-model="parameter"
                              placeholder="参数如: 自定义名称=123;自定义名称2=456,中间用分号;隔开"></el-input>
                </el-col>
                <el-col :span="3"  :offset="1">
                    <el-row>
                        <span>日期</span>
                    </el-row>
                    <el-date-picker class="inputframe" v-model="date" align="right" value-format="yyyyMMdd"
                                    placeholder="选择日期"></el-date-picker>
                </el-col>
            </el-row>
        </el-tabs>
        <!--</el-form>-->
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" size="medium" class="rightbtn" @click="excutmartjob()">立即执行</el-button>
            <el-button type="primary" size="medium" class="rightbtn" @click="producefun()">生成作业</el-button>
            <el-button type="primary" size="medium" class="leftbtn" @click="back()">上一步</el-button>
        </div>

        <el-dialog title="生成作业" :visible.sync="dialogProdeceJobs" width="50%" class="alltable">
            <div slot="title">
                <span class="dialogtitle el-icon-caret-right">生成作业</span>
            </div>
            <el-form ref="separatorData" label-width="240px" text-align="center">
                <el-form-item label="选择工程">
                    <el-select placeholder="选择工程" v-model="selectedetlsys" @change="queryetltaskbyetlsys"
                                style="width: 190px;" size="medium">
                        <el-option v-for="(item,index) in alletlsys" :key="index" :label="item.etl_sys_cd"
                                   :value="item.etl_sys_cd"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择任务">
                    <el-select placeholder="选择任务" v-model="selectedetltask"
                               style="width: 190px;" size="medium">
                        <el-option v-for="(item,index) in alletltask" :key="index" :label="item.sub_sys_cd"
                                   :value="item.sub_sys_cd"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="danger" size="mini" @click="dialogProdeceJobs = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="savemartjobtoetl()">确 定</el-button>
            </div>
        </el-dialog>


        <transition name="fade">
            <loading v-if="isLoading" />
        </transition>

    </div>
</template>
<script>
    import * as functionAll from "./marketAction";
    import * as validator from "@/utils/js/validator";
    import * as message from "@/utils/js/message";
    import Loading from '../../components/loading'
    import Step from "./step";

    export default {
        components: {
            Step,
            Loading
        },
        data() {
            return {
                tablename:"",
                isLoading:false,
                dialogProdeceJobs: false,
                active: 2,
                rule: validator.default,
                data_mart_id: this.$route.query.data_mart_id,
                datatable_id: this.$route.query.datatable_id,
                is_add: this.$route.query.is_add,
                ifrepeat: this.$route.query.ifrepeat,
                date: "",
                parameter: "",
                querysql: "",
                alletlsys: [],
                alletltask: [],
                selectedetlsys: "",
                selectedetltask: ""
            };
        },
        mounted() {
            this.getquerysql();
            this.gettablename();
        },
        methods: {
            back() {
                this.$router.push({
                    name: 'addMartTable_2',
                    query: {
                        data_mart_id: this.data_mart_id,
                        datatable_id: this.datatable_id,
                        ifrepeat:this.ifrepeat,
                        is_add: this.is_add

                    }
                });
            },
            getquerysql() {
                functionAll.getQuerySql({"datatable_id": this.datatable_id}).then((res) => {
                    debugger;
                    if (res && res.success) {
                        this.querysql = res.data;                    }
                })
            },
            gettablename() {
                functionAll.getTableName({"datatable_id": this.datatable_id}).then((res) => {
                    if (res && res.success) {
                        this.tablename = res.data;
                    }
                })
            },
            excutmartjob() {
                if (this.date === '') {
                    this.$message({type: 'warning', message: '日期不能为空!'});
                    return ;
                }
                this.isLoading = true;
                let param = {
                    "datatable_id": this.datatable_id,
                    "date": this.date,
                    "parameter": this.parameter
                }
                functionAll.excutMartJob(param).then((res) => {
                    this.isLoading = false;
                    if (res && res.success) {
                        this.$message({
                            type: "success",
                            message: "执行成功!"
                        });
                    }
                })
            },
            backtodetail() {
                this.$router.push({
                    name: 'detailMart',
                    query: {
                        data_mart_id: this.data_mart_id
                    }
                });
            },
            producefun() {
                this.dialogProdeceJobs = true;
                functionAll.queryAllEtlSys().then((res) => {
                    if (res && res.success) {
                        this.alletlsys = res.data;
                    }
                })
            },
            queryetltaskbyetlsys() {
                functionAll.queryEtlTaskByEtlSys({"etl_sys_cd":this.selectedetlsys}).then((res) => {
                    if (res && res.success) {
                        this.alletltask = res.data;
                    }
                })
            },
            savemartjobtoetl() {
                let param ={
                    "etl_sys_cd":this.selectedetlsys,
                    "sub_sys_cd":this.selectedetltask,
                    "datatable_id":this.datatable_id,
                }
                functionAll.generateMartJobToEtl(param).then((res) => {
                    if (res && res.success) {
                        this.$message({
                            type: "success",
                            message: "成功"
                        });
                    }
                    this.dialogProdeceJobs = false;
                })
            }
        }
    }
</script>
<style scoped>
    .demo-form-inlines {
        height: 100px;
    }

    .rightbtn {
        margin-top: 12px;
        float: right;
        margin: 15px;
        margin-bottom: 10px;
    }

    .leftbtn {
        margin-top: 12px;
        float: left;
        margin: 15px;
        margin-bottom: 10px;
    }

    .inputframe {
        margin-top: 12px;
        margin-bottom: 10px;
    }
</style>
