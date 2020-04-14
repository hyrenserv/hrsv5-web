<template>
    <div id="marketIndex">
        <el-row class='topTitle'>
            <i class="block_icon fa text-warning fa-globe blue"></i>
            <span>数据集市</span>
            <div class="elButton ">
                <el-button type="primary" @click="adddmdatatable()" size="medium">
                    <i class="el-icon-circle-plus-outline"></i>新增数据表
                </el-button>
                <el-button type="primary" @click="back()" size="medium">
                    <i class="fa fa-home fa-lg"></i>返回首页
                </el-button>
            </div>
        </el-row>

        <el-tabs class="tabes" type="card">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" label="序号" width="70px" align='center'>
                </el-table-column>
                <el-table-column prop="datatable_id" label="作业参数" width="150px" align='center'>
                </el-table-column>
                <el-table-column prop="datatable_en_name" label="英文表名" width="150px" align='center'>
                </el-table-column>
                <el-table-column prop="datatable_cn_name" label="中文表名" width="150px" align='center'>
                </el-table-column>
                <el-table-column prop="datatable_lifecycle" label="生命周期" width="150px" align='center'>
                </el-table-column>
                <el-table-column prop="datatable_create_date" label="创建日期" width="150px" align='center'>
                </el-table-column>
                <el-table-column prop="datatable_due_date" label="数据表到期日期" width="150px" align='center'>
                </el-table-column>
                <el-table-column label="操作" align='center'>
                    <template slot-scope="scope">
                        <el-button size="mini" icon="el-icon-edit" title="编辑" @click="editdmdatatable(scope.row)" circle
                                   type="primary">
                        </el-button>
                        <el-button size="mini" icon="el-icon-delete" title="删除" @click="deletedmdatatable(scope.row)"
                                   circle type="primary">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tabs>
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
                        })
                        this.tableData = res.data;
                    }
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

