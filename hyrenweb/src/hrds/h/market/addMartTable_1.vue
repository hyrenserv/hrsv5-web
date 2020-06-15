<template>
    <div id="marketIndex">

        <el-row>
            <el-button type="primary" @click="back()" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回
            </el-button>
        </el-row>
        <Step :active="active"></Step>
        <el-row class='topTitle'>
            <span>基础配置</span>
        </el-row>
        <el-form :model="dm_datatable" ref="dm_datatable" class="demo-form-inline" :inline="true" label-width="170px">
            <el-col :span="10">
                <el-form-item label="表英文名" prop="datatable_en_name"
                              :rules="rule.default">
                    <el-input :disabled="ennameiflock" v-model="dm_datatable.datatable_en_name" @change="checkrepeat()"
                              placeholder="表英文名">
                        <el-button slot="append" icon="el-icon-zoom-in"
                                   @click="showalreadyexisttablename()"></el-button>
                    </el-input>
                </el-form-item>

            </el-col>
            <el-col :span="10">
                <el-form-item label="表中文名" prop="datatable_cn_name"
                              :rules="rule.default">
                    <el-input :disabled="iflock" v-model="dm_datatable.datatable_cn_name" autocomplete="off"
                              placeholder="表中文名"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="10">
                <el-form-item label="表名可能重复" prop="repeat_flag" :rules="rule.selected">
                    <el-select @change="changerepeat()" :disabled="repeatiflock" v-model="dm_datatable.repeat_flag"
                               placeholder="请选择">
                        <el-option v-for="item in isflag" :key="item.value" :label="item.value"
                                   :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="10">
                <el-form-item label="执行引擎" prop="sql_engine" :rules="rule.selected">
                    <el-select :disabled="iflock" v-model="dm_datatable.sql_engine" placeholder="请选择">
                        <el-option v-for="item in allsqlengine" :key="item.value" :label="item.value"
                                   :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="10">
                <el-form-item label="表描述" prop="datatable_desc">
                    <el-input :disabled="iflock" type="text" v-model="dm_datatable.datatable_desc" autocomplete="off"
                              placeholder="表描述"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="10">
                <el-form-item label="进数方式" prop="storage_type" :rules="rule.selected">
                    <el-select :disabled="iflock" v-model="dm_datatable.storage_type" placeholder="请选择">
                        <el-option v-for="item in allstoragetype" :key="item.value" :label="item.value"
                                   :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="10">
                <el-form-item label="数据存储方式" prop="table_storage" :rules="rule.selected">
                    <el-select :disabled="iflock" v-model="dm_datatable.table_storage" placeholder="请选择">
                        <el-option v-for="item in alltablestorage" :key="item.value" :label="item.value"
                                   :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="10">
                <el-form-item label="数据生命周期" prop="datatable_lifecycle" :rules="rule.selected">
                    <el-select :disabled="iflock" v-model="dm_datatable.datatable_lifecycle" placeholder="请选择"
                               @change="changeDataLifeCycle">
                        <el-option v-for="item in alldatatablelifecycle" :key="item.value" :label="item.value"
                                   :value="item.code"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="10" v-if="showData_date">
                <el-form-item label="数据表到期日期" prop="datatable_due_date" :rules="rule.selected">
                    <el-date-picker :disabled="iflock" v-model="dm_datatable.datatable_due_date" value-format="yyyyMMdd"
                                    align="right" placeholder="选择日期"></el-date-picker>
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
                    <el-radio :disabled="iflock" v-model="dsl_id" :label="scope.row.dsl_id">&thinsp;</el-radio>
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
        <!--<el-button type="primary" size="medium" class="leftbtn" @click="back()"><i class="fa fa-home fa-lg"></i>返回</el-button>-->
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


        <el-dialog title="选择已有的集市表" :visible.sync="ifalreadyexisttablename" width="35%">
            <el-table :data="alldatatable_en_name" border stripe size="medium">
                <el-table-column property label="选择" type="index" align="center" width='60'>
                    <template slot-scope="scope">
                        <el-radio v-model="selecttablename" :label="scope.row.datatable_en_name">&thinsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="datatable_en_name" label="表英文名" show-overflow-tooltip
                                 align="center"></el-table-column>
            </el-table>
            <el-row>
                <el-button type="primary" size="mini" class="rightbtn"
                           @click="confirmselecttable()">
                    确定
                </el-button>
                <el-button type="primary" size="mini" class="rightbtn" @click="ifalreadyexisttablename = false">取消
                </el-button>
            </el-row>
        </el-dialog>

        <transition name="fade">
            <loading v-if="isLoading"/>
        </transition>
    </div>

</template>

<script>
    import * as validator from "@/utils/js/validator";
    import regular from "@/utils/js/regular";
    import * as functionAll from "./marketAction";
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
                active: 0,
                showData_date: false,
                data_table_id: "",
                rule: validator.default,
                dsl_id: "",
                data_mart_id: this.$route.query.data_mart_id,
                is_add: this.$route.query.is_add,
                datatable_id: this.$route.query.datatable_id,
                allsqlengine: [],
                isflag: [],
                allstoragetype: [],
                alltablestorage: [],
                alldatatablelifecycle: [],
                dataSaveConfigure: false,
                tableData: [],
                dm_datatable: {
                    datatable_en_name: "",
                    datatable_cn_name: "",
                    datatable_desc: "",
                    sql_engine: "",
                    storage_type: "",
                    table_storage: "",
                    datatable_lifecycle: "",
                    datatable_due_date: "",
                    repeat_flag: ""
                },
                checkboxType: [],
                tableDataConfigure: [],
                form: {},
                fuzzyqueryitem: "",
                isLoading: false,
                ifalreadyexisttablename: false,
                alldatatable_en_name: [],
                selecttablename: "",
                iflock: false,
                ennameiflock: false,
                repeatiflock: false,
            };
        },
        created() {

        },
        mounted() {
            this.getisflag();
            this.getTable();
            this.getAllSqlEngine();
            this.getAllStorageType();
            this.getAllTableStorage();
            this.getAllDatatableLifecycle();
            if ((this.is_add == 1 || this.is_add == "1") && this.datatable_id != undefined) {
                this.queryDMDataTableByDataTableId(this.datatable_id)
                this.checkrunstatus();
                this.checkrepeat2();
            }
        },
        methods: {
            checkrunstatus() {
                functionAll.checkRunStatus({
                    "datatable_id": this.datatable_id
                }).then((res) => {
                        if (res && res.success) {
                            if (res.data == true) {
                                // this.iflock = res.data;
                                // this.ennameiflock = res.data;
                                // this.repeatiflock = res.data;
                            }
                        }
                    }
                )
            },
            changeDataLifeCycle() {
                if (this.dm_datatable.datatable_lifecycle == "1") {
                    this.showData_date = false;
                } else {
                    this.showData_date = true;
                }
            },
            queryDMDataTableByDataTableId(datatable_id) {
                let param = {
                    "datatable_id": datatable_id
                }
                functionAll.queryDMDataTableByDataTableId(param).then((res) => {
                    if (res && res.success) {
                        this.dm_datatable = res.data[0];
                        let dataYear = this.dm_datatable.datatable_due_date.substring(0, 4);
                        let dataMonth = this.dm_datatable.datatable_due_date.substring(4, 6);
                        let dataDay = this.dm_datatable.datatable_due_date.substring(6, 9);
                        let data = dataYear + "-" + dataMonth + "-" + dataDay;
                        this.dm_datatable.datatable_due_date = data;
                        this.dsl_id = res.data[0].dsl_id;
                        if (this.dm_datatable.datatable_lifecycle == "2") {
                            this.showData_date = true;
                        }
                        if (this.datatable_id == undefined) {
                            this.dm_datatable.repeat_flag = "1";
                        }
                        this.changerepeat();
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
            getisflag() {
                this.$Code.getCategoryItems({
                    'category': 'IsFlag'
                }).then(res => {
                    this.isflag = res.data
                })
            },
            getAllStorageType() {
                this.$Code.getCategoryItems({
                    'category': 'StorageType'
                }).then(res => {
                    this.allstoragetype = res.data
                })
            },
            getAllTableStorage() {
                this.$Code.getCategoryItems({
                    'category': 'TableStorage'
                }).then(res => {
                    this.alltablestorage = res.data
                })
            },
            getAllDatatableLifecycle() {
                this.$Code.getCategoryItems({
                    'category': 'TableLifeCycle'
                }).then(res => {
                    this.alldatatablelifecycle = res.data
                })
            },
            // checkoracle(dsl_id, datatable_en_name) {
            //     functionAll.checkOracle({
            //         "dsl_id": dsl_id,
            //         "datatable_en_name": datatable_en_name
            //     }).then((res) => {
            //         debugger;
            //         if (res && res.success) {
            //             return res.data;
            //         } else {
            //             this.$emit(response.message);
            //         }
            //     })
            // },
            next(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        if (this.dsl_id == "") {
                            this.$message({
                                type: "warning",
                                message: "请选择存储目的地!"
                            });
                            return false;
                        }
                        //判断是否为oracle
                        let isorclaeok = true;
                        functionAll.checkOracle({
                            "dsl_id": this.dsl_id,
                            "datatable_en_name": this.dm_datatable.datatable_en_name
                        }).then((res) => {
                            // debugger;
                            if (res && res.success) {
                                // debugger;
                                isorclaeok = res.data;
                                if (!res.data) {
                                    this.$message({
                                        type: "warning",
                                        message: "选择存储目的地为oracle,且表名长度大于26，请修改表名!"
                                    });
                                    return false;
                                }
                                this.isLoading = true;
                                if (this.is_add == 0) {
                                    this.dm_datatable.dsl_id = this.dsl_id;
                                    this.dm_datatable.data_mart_id = this.data_mart_id;
                                    functionAll.addDMDataTable(this.dm_datatable).then((res) => {
                                        this.isLoading = false;
                                        if (res && res.success) {
                                            this.datatable_id = res.data.datatable_id;
                                            this.$router.push({
                                                name: 'addMartTable_2',
                                                query: {
                                                    data_mart_id: this.data_mart_id,
                                                    datatable_id: this.datatable_id,
                                                    is_add: 1,
                                                    ifrepeat: res.data.ifrepeat
                                                }
                                            });
                                        }
                                    })
                                }
                                //更新
                                else {
                                    this.dm_datatable.dsl_id = this.dsl_id;
                                    this.dm_datatable.data_mart_id = this.data_mart_id;
                                    this.dm_datatable.datatable_id = this.datatable_id;
                                    functionAll.updateDMDataTable(this.dm_datatable).then((res) => {
                                        this.isLoading = false;
                                        if (res && res.success) {
                                            // this.datatable_id = res.data.datatable_id;
                                            this.$router.push({
                                                name: 'addMartTable_2',
                                                query: {
                                                    data_mart_id: this.data_mart_id,
                                                    datatable_id: this.datatable_id,
                                                    is_add: 1,
                                                    ifrepeat: res.data.ifrepeat
                                                }
                                            });

                                        }
                                    })
                                }


                            } else {
                                this.$emit(response.message);
                            }
                        })
                        if (!isorclaeok) {

                        }

                        //新增


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
            },
            showalreadyexisttablename() {
                if (this.dm_datatable.repeat_flag == "0") {
                    this.$message({
                        type: "warning",
                        message: "表名不能重复，不能选择已有表名"
                    });
                    return false;
                }
                this.ifalreadyexisttablename = true;
                this.selecttablename = this.dm_datatable.datatable_en_name;
                functionAll.getalldatatable_en_name().then((res) => {
                    this.alldatatable_en_name = res.data;
                })
            },
            confirmselecttable() {
                if (this.selecttablename == "") {
                    this.$message({
                        type: "warning",
                        message: "请选择表名"
                    });
                    return false;
                }
                this.ifalreadyexisttablename = false;
                this.dm_datatable.datatable_en_name = this.selecttablename;
                this.dm_datatable.repeat_flag = '1';
                // this.ennameiflock = true;
                this.checkrepeat();
            },
            checkrepeat() {
                let param = {
                    "datatable_en_name": this.dm_datatable.datatable_en_name,
                    "datatable_id": this.datatable_id,
                }
                if (this.dm_datatable.datatable_en_name == "") {
                    return false;
                }
                functionAll.querytablenameifrepeat(param).then((res) => {
                    if (res && res.success) {
                        if (res.data.result == true) {
                            this.queryDMDataTableByDataTableId(res.data.datatable_id);

                            // this.iflock = true;
                            this.dm_datatable.repeat_flag = "1";
                            // this.ennameiflock = true;
                        } else {
                            // this.iflock = false;
                        }
                    }
                })
            },
            checkrepeat2() {
                let param = {
                    "datatable_id": this.datatable_id
                }
                functionAll.querydatatableidifrepeat(param).then((res) => {
                    if (res && res.success) {
                        if (res.data == true) {
                            // this.iflock = res.data;
                        }
                    }
                })
            },
            changerepeat() {
                //如果改为是
                if (this.dm_datatable.repeat_flag == "1") {
                    // this.ennameiflock = true;
                } else {
                    // this.ennameiflock = false;
                }
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

    .leftbtn {
        margin-top: 12px;
        margin-top: 12px;
        float: left;
        margin: 15px;
        margin-bottom: 10px;
    }
</style>
