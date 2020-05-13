<template>
    <div id="marketIndex">
        <el-row class='topTitle'>
            <i class="block_icon fa text-warning fa-globe blue"></i>
            <span>数据集市</span>
            <div class="elButton ">
                <el-button type="primary" @click="adddmdatatable()" size="mini">
                    <i class="el-icon-circle-plus-outline"></i>新增数据表
                </el-button>
                <el-button type="primary" @click="back()" size="mini">
                    <i class="fa fa-home fa-lg"></i>返回首页
                </el-button>
            </div>
        </el-row>

        <el-tabs class="tabes" type="card">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" label="序号"  align='center'>
                </el-table-column>
                <el-table-column prop="datatable_id" label="作业参数"  align='center'>
                </el-table-column>
                <el-table-column prop="datatable_en_name" label="英文表名" show-overflow-tooltip align='center'>
                </el-table-column>
                <el-table-column prop="datatable_cn_name" label="中文表名"  show-overflow-tooltip align='center'>
                </el-table-column>
                <el-table-column prop="datatable_lifecycle" label="生命周期"   align='center'>
                </el-table-column>
                <el-table-column prop="etl_date" label="跑批日期"   align='center'>
                </el-table-column>
                <el-table-column prop="is_successful" label="执行状态"  align='center'>
                </el-table-column>
                <el-table-column prop="datatable_create_date" label="创建日期"   align='center'>
                </el-table-column>
                <el-table-column prop="datatable_due_date" label="数据到期日期"   align='center'>
                </el-table-column>
                <el-table-column label="操作"  width="300" align='center'>
                    <template slot-scope="scope">
                        <el-button size="mini" icon="el-icon-edit" title="编辑" @click="editdmdatatable(scope.row)" circle
                                   type="primary">
                        </el-button>
                        <el-button size="mini" icon="el-icon-share" v-if="scope.row.isadd" title="生成作业" @click="producefun(scope.row)"
                                   circle type="primary">
                        </el-button>
                        <el-button size="mini" icon="el-icon-caret-right" v-if="scope.row.isadd" title="立即执行" @click="pushtoaddmart3(scope.row)"
                                   circle type="primary">
                        </el-button>
                        <el-button size="mini" icon="el-icon-download" v-if="scope.row.isadd" title="导出表" @click="downloaddmdatatable(scope.row)"
                                   circle type="primary">
                        </el-button>
                        <el-button size="mini" icon="el-icon-delete" title="删除" @click="deletedmdatatable(scope.row)"
                                   circle type="primary">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tabs>

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


    </div>
</template>

<script>
    import * as validator from "@/utils/js/validator";
    import regular from "@/utils/js/regular";
    import * as functionAll from "./marketAction";
    import * as message from "@/utils/js/message";

    export default {
        data() {
            return {
                data_mart_id: this.$route.query.data_mart_id,
                tableData: [],
                dialogProdeceJobs: false,
                alletlsys: [],
                alletltask: [],
                selectedetlsys: "",
                selectedetltask: "",
                selecteddatatable_id:""
            };
        },
        mounted() {
            this.querydmdatatable(this.data_mart_id);
        },
        methods: {
            back() {
                this.$router.push({
                    name: 'dataMart',
                });
            },
            adddmdatatable() {
                this.$router.push({
                    name: 'addMartTable_1',
                    query: {
                        data_mart_id: this.data_mart_id,
                        is_add: 0
                    }
                });
            },
            editdmdatatable(row) {
                this.$router.push({
                    name: 'addMartTable_1',
                    query: {
                        data_mart_id: this.data_mart_id,
                        datatable_id: row.datatable_id,
                        is_add: 1
                    }
                });
            },
            deletedmdatatable(row) {
                message.confirmMsg('确定删除吗').then(res => {
                    let param = {
                        "datatable_id": row.datatable_id
                    }
                    functionAll.deleteDMDataTable(param).then((res) => {
                        if (res && res.success) {
                            message.deleteSuccess(res);
                            location.reload();
                        }
                    })
                }).catch(() => {
                })
            },
            pushtoaddmart3(row) {
                this.$router.push({
                    name: 'addMartTable_3',
                    query: {
                        data_mart_id: this.data_mart_id,
                        datatable_id: row.datatable_id,
                    }
                });
            },
            downloaddmdatatable(row){
                let datatable_id = row.datatable_id;
                let datatable_en_name = row.datatable_en_name;
                message.confirmMsg('确定导出吗').then(res => {
                    let that = this;
                    functionAll.downloadDmDatatable({
                        datatable_id: datatable_id
                    }).then(res => {
                        // if (res && res.success) {
                        let filename = datatable_en_name + ".xlsx"
                        const blob = new Blob([res.data]);
                        if (window.navigator.msSaveOrOpenBlob) {
                            // 兼容IE10
                            navigator.msSaveBlob(blob, filename);
                        } else {
                            //  chrome/firefox
                            let aTag = document.createElement("a");
                            // document.body.appendChild(aTag);
                            aTag.download = filename;
                            aTag.href = URL.createObjectURL(blob);
                            if (aTag.all) {
                                aTag.click();
                            } else {
                                //  兼容firefox
                                var evt = document.createEvent("MouseEvents");
                                evt.initEvent("click", true, true);
                                aTag.dispatchEvent(evt);
                            }
                            URL.revokeObjectURL(aTag.href);
                        }
                    })
                }).catch(() => {
                })


            },
            producefun(row){
                this.dialogProdeceJobs = true;
                this.selecteddatatable_id = row.datatable_id;
                functionAll.queryAllEtlSys().then((res) => {
                    if (res && res.success) {
                        this.alletlsys = res.data;
                    }
                })
            },
            querydmdatatable(data_mart_id) {
                let param = {
                    "data_mart_id": data_mart_id
                }
                functionAll.queryDMDataTableByDataMartID(param).then((res) => {
                    if (res && res.success) {
                        res.data.forEach((item) => {
                            this.$Code.getValue({
                                category: "TableLifeCycle",
                                code: item.datatable_lifecycle
                            }).then((res) => {
                                item.datatable_lifecycle = res.data;
                            });
                            this.$Code.getValue({
                                category: "JobExecuteState",
                                code: item.is_successful
                            }).then((res) => {
                                item.is_successful = res.data;
                            });
                        })
                        this.tableData = res.data;
                    }
                })
            },
            queryetltaskbyetlsys() {
                functionAll.queryEtlTaskByEtlSys({"etl_sys_cd": this.selectedetlsys}).then((res) => {
                    if (res && res.success) {
                        this.alletltask = res.data;
                    }
                })
            },
            savemartjobtoetl() {
                let param ={
                    "etl_sys_cd":this.selectedetlsys,
                    "sub_sys_cd":this.selectedetltask,
                    "datatable_id":this.selecteddatatable_id,
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
    };
</script>


<style scoped>
    /* 按钮样式 */
    .elButton {
        float: right;
    }
</style>

