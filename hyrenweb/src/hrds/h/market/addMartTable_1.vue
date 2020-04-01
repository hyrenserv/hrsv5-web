<template>
    <div id="marketIndex">
        <el-row>
            <span>基础配置</span>
            <el-button type="primary" @click="back()" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回
            </el-button>
        </el-row>
        <el-form :model="dm_datatable" ref="dm_datatable" class="demo-form-inline" :inline="true" label-width="170px">
            <el-col :span="10">
                <el-form-item label="表英文名" prop="datatable_en_name"
                              :rules="rule.default">
                    <el-input v-model="dm_datatable.datatable_en_name" placeholder="表英文名"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="10">
                <el-form-item label="表中文名" prop="datatable_cn_name"
                              :rules="rule.default">
                    <el-input v-model="dm_datatable.datatable_cn_name" autocomplete="off" placeholder="表中文名"></el-input>
                </el-form-item>
            </el-col>


            <el-col :span="10">
                <el-form-item label="执行引擎" prop="sql_engine" :rules="rule.selected">
                    <el-select v-model="dm_datatable.sql_engine" placeholder="请选择">
                        <el-option v-for="item in allsqlengine" :key="item.value" :label="item.value"
                                   :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="10">
                <el-form-item label="表描述" prop="datatable_desc">
                    <el-input type="text" v-model="dm_datatable.datatable_desc" autocomplete="off"
                              placeholder="表描述"></el-input>
                </el-form-item>
            </el-col>


            <el-col :span="10">
                <el-form-item label="数据存储方式" prop="datatype" :rules="rule.selected">
                    <el-select v-model="dm_datatable.datatype" placeholder="请选择">
                        <el-option v-for="item in alldatatype" :key="item.value" :label="item.value"
                                   :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-form>

        <el-col :span='13'>&nbsp;</el-col>
        <el-col :span='5' style="float:right">
            <el-input placeholder="请输入内容" class="input-with-select" size="mini" v-model="fuzzyqueryitem">
                <el-button slot="append" icon="el-icon-search" @click="getTableByFuzzyQuery()"></el-button>
            </el-input>
        </el-col>
        <el-table :data="tableData" border stripe size="medium">
            <el-table-column property label="选择" type="index" align="center" width='60'>
                <template slot-scope="scope">
                    <el-radio v-model="dsl_id" :label="scope.row.dsl_id">&thinsp;</el-radio>
                </template>
            </el-table-column>

            <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>

            <el-table-column prop="dsl_name" label="名称" show-overflow-tooltip align="center"></el-table-column>

            <el-table-column prop="store_type" label="存储类型" show-overflow-tooltip align="center"></el-table-column>

            <el-table-column prop="dsl_remark" label="备注" show-overflow-tooltip align="center"></el-table-column>

            <el-table-column prop="is_hadoopclient" width="140" label="hadoop客户端" align="center"></el-table-column>

            <el-table-column prop="store_type" width="202" label="数据存储层配置属性" align="center">
                <template slot-scope="scope">
                    <el-button type="info" size="mini"
                               @click="dataSaveConfigure = true;handleEdit(scope.$index, scope.row)">数据存储层配置属性
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button type="primary" size="medium" class="rightbtn" @click="next('dm_datatable')">下一步</el-button>
        <!--<el-pagination @size-change="item_handleSizeChange" @current-change="item_handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total,prev, pager, next" :total="tableData.length" class='pagerigth'></el-pagination>-->

        <el-dialog title="数据存储层配置属性" :visible.sync="dataSaveConfigure" width="60%">
            <el-form>
                <el-table :data="tableDataConfigure" border stripe size="medium">
                    <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>

                    <el-table-column prop="storage_property_key" show-overflow-tooltip label="key"
                                     align="center"></el-table-column>

                    <el-table-column prop="storage_property_val" show-overflow-tooltip label="value"
                                     align="center"></el-table-column>

                    <el-table-column prop="dsla_remark" label="描述" show-overflow-tooltip
                                     align="center"></el-table-column>
                </el-table>
                <el-form-item label="附加信息">
                    <el-checkbox-group v-model="form.dsla_storelayer" disabled>
                        <el-checkbox v-for="item in checkboxType" :key="item.value" :label="item.value"
                                     :value="item.code"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dataSaveConfigure = false" size="mini" type="danger">关 闭</el-button>
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
                data_table_id: "",
                rule: validator.default,
                dsl_id: "",
                data_mart_id: this.$route.query.data_mart_id,
                is_add: this.$route.query.is_add,
                datatable_id: this.$route.query.datatable_id,
                allsqlengine: [],
                alldatatype: [],
                dataSaveConfigure: false,
                tableData: [],
                dm_datatable: {
                    datatable_en_name: "",
                    datatable_cn_name: "",
                    datatable_desc: "",
                    sql_engine: "",
                    datatype: ""
                },
                checkboxType: [],
                tableDataConfigure: [],
                form: {},
                fuzzyqueryitem: "",
                // currentPage: 1,
                // pagesize: 5,

            };
        },
        mounted() {
            if (this.datatable_id != undefined) {
                this.queryDMDataTableByDataTableId()
            }
            this.getTable();
            this.getAllSqlEngine();
            this.getAllDataType();
        },
        methods: {
            queryDMDataTableByDataTableId() {
                let param = {
                    "datatable_id": this.datatable_id
                }
                functionAll.queryDMDataTableByDataTableId(param).then((res) => {
                    if (res && res.success) {
                        this.dm_datatable = res.data[0];
                        this.dsl_id = res.data[0].dsl_id;
                    } else {
                        this.$emit(response.message);
                    }
                })
            },
            getAllSqlEngine() {
                this.$Code.getCategoryItems({
                    'category': 'SqlEngine'
                }).then(res => {
                    this.allsqlengine = res.data
                })
            },
            getAllDataType() {
                this.$Code.getCategoryItems({
                    'category': 'StorageType'
                }).then(res => {
                    this.alldatatype = res.data
                })
            },
            next(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (this.dsl_id == "") {
                            this.$message({
                                type: "warning",
                                message: "请选择存储目的地!"
                            });
                            return false;
                        } else {
                            //新增
                            if (this.is_add == 0) {
                                this.dm_datatable.dsl_id = this.dsl_id;
                                this.dm_datatable.data_mart_id = this.data_mart_id;
                                functionAll.addDMDataTable(this.dm_datatable).then((res) => {
                                    if (res && res.success) {
                                        this.datatable_id = res.data.datatable_id;
                                        this.$router.push({
                                            name: 'addMartTable_2',
                                            query: {
                                                data_mart_id: this.data_mart_id,
                                                datatable_id: this.datatable_id
                                            }
                                        });
                                    }
                                })
                            }
                            //更新
                            else {
                                this.dm_datatable.dsl_id = this.dsl_id;
                                this.dm_datatable.data_mart_id = this.data_mart_id;
                                functionAll.updateDMDataTable(this.dm_datatable).then((res) => {
                                    if (res && res.success) {
                                        // this.datatable_id = res.data.datatable_id;
                                        this.$router.push({
                                            name: 'addMartTable_2',
                                            query: {
                                                data_mart_id: this.data_mart_id,
                                                datatable_id: this.datatable_id
                                            }
                                        });
                                    }
                                })
                            }
                        }
                    }
                })
            },
            getTable() {
                functionAll.searchDataStore().then(res => {
                    if (res && res.success) {
                        res.data.forEach((item) => {
                            this.$Code.getValue({
                                category: "IsFlag",
                                code: item.is_hadoopclient
                            }).then((res) => {
                                item.is_hadoopclient = res.data;
                            });
                            this.$Code.getValue({
                                category: "Store_type",
                                code: item.store_type
                            }).then((res) => {
                                item.store_type = res.data;
                            })
                        })
                        this.tableData = res.data;
                    }
                });
            },
            getTableByFuzzyQuery() {
                if (this.fuzzyqueryitem == "") {
                    this.getTable();
                    return;
                }
                let params = {
                    "fuzzyqueryitem": this.fuzzyqueryitem
                };
                functionAll.searchDataStoreByFuzzyQuery(params).then(res => {
                    if (res && res.success) {
                        res.data.forEach((item) => {
                            this.$Code.getValue({
                                category: "IsFlag",
                                code: item.is_hadoopclient
                            }).then((res) => {
                                item.is_hadoopclient = res.data;
                            });
                            this.$Code.getValue({
                                category: "Store_type",
                                code: item.store_type
                            }).then((res) => {
                                item.store_type = res.data;
                            })
                        })
                        this.tableData = res.data;
                    }
                });
            },
            handleEdit(index, row) {
                this.searchDataStoreById(row.dsl_id);
            },
            searchDataStoreById(e) {
                this.checkboxType = [];
                functionAll.searchDataStoreById({
                    "dsl_id": e
                }).then((res) => {
                    this.tableDataConfigure = res.data.layerAndAttr;
                    this.form.dsl_name = res.data.dsl_name;
                    this.form.store_type = res.data.store_type;
                    res.data.layerAndAdded.forEach((item) => {
                        this.$Code.getValue({
                            category: "StoreLayerAdded",
                            code: item.dsla_storelayer
                        }).then((res) => {
                            this.checkboxType.push({
                                value: res.data,
                                code: item.dsla_storelayer
                            })
                            this.form.dsla_storelayer = true;
                        })
                    })
                })
            },
            back() {
                this.$router.push({
                    name: 'detailMart',
                    query: {
                        data_mart_id: this.data_mart_id
                    }
                });
            }
        }
    };
</script>

<style scoped>

    .demo-form-inlines {
        height: 100px;
    }

    .rightbtn {
        margin-top: 12px;
        margin-top: 12px;
        float: right;
        margin: 15px;
        margin-bottom: 10px;
    }
</style>
