<template>
    <div id="marketIndex">
        <el-row class='topTitle1'>
            <i class="block_icon fa text-warning fa-globe blue"></i>
            <span>数据集市</span>
            <div class="elButton ">
                <el-upload class="buttonStyle" accept=".xlsx" action="" :show-file-list="false" :auto-upload="false"
                           :on-change="handleChange" :limit="1" :on-exceed="handleExceed" :fileList="fileList">
                    <el-button size="mini" type="primary">
                        <i class="el-icon-circle-plus-outline"></i> 导入数据</el-button>
                </el-upload>
                <el-button type="primary" @click="adddmdatatable()" size="mini">
                    <i class="el-icon-circle-plus-outline"></i>新增数据表
                </el-button>
                <el-button type="primary" @click="back()" size="mini">
                    <i class="fa fa-home fa-lg"></i>返回首页
                </el-button>
            </div>
        </el-row>

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="index" width="60" label="序号" align='center'>
            </el-table-column>
            <el-table-column prop="datatable_id" width="110" label="作业参数" align='center'>
            </el-table-column>
            <el-table-column prop="datatable_en_name" label="英文表名" show-overflow-tooltip align='center'>
            </el-table-column>
            <el-table-column prop="datatable_cn_name" label="中文表名" show-overflow-tooltip align='center'>
            </el-table-column>
            <el-table-column prop="datatable_lifecycle" width="80" label="生命周期" align='center'>
            </el-table-column>
            <el-table-column prop="etl_date" width="90" label="跑批日期" align='center'>
            </el-table-column>
            <el-table-column prop="is_successful" width="90" label="执行状态" align='center'>
            </el-table-column>
            <el-table-column prop="datatable_create_date" width="90" label="创建日期" align='center'>
            </el-table-column>
            <el-table-column prop="datatable_due_date" width="90" label="到期日期" align='center'>
            </el-table-column>
            <el-table-column label="操作" width="250" align='center'>
                <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="editdmdatatable(scope.row)">编辑
                    </el-button>
                    <el-button size="mini" type="text" v-if="scope.row.isadd" @click="producefun(scope.row)">生成作业
                    </el-button>
                    <el-button size="mini" type="text" v-if="scope.row.isadd" @click="pushtoaddmart3(scope.row)">立即执行
                    </el-button>
                    <el-button size="mini" type="text" v-if="scope.row.isadd" @click="downloaddmdatatable(scope.row)">导出
                    </el-button>
                    <el-button size="mini" type="text" @click="deletedmdatatable(scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

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

        <el-dialog title="导入Excel" :visible.sync="dialogImportData" :before-close="importDatacancel">
            <span v-if="fileList != ''">确认导入 “ {{fileList[0].name}} ” </span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="importDatacancel" size="mini" type="danger">取消</el-button>
                <el-button type="primary" @click="importData" size="mini">保存</el-button>
            </div>
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

    let arr = [];
    export default {
        components: {
            Loading
        },
        data() {
            return {
                data_mart_id: this.$route.query.data_mart_id,
                tableData: [],
                dialogProdeceJobs: false,
                alletlsys: [],
                alletltask: [],
                selectedetlsys: "",
                selectedetltask: "",
                selecteddatatable_id: "",
                fileList: [],
                isLoading: false,
                dialogImportData: false,

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
                let datatable_en_name = row.datatable_en_name;
                message.confirmMsg('确定删除 ' + datatable_en_name + ' 吗').then(res => {
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
            downloaddmdatatable(row) {
                let datatable_id = row.datatable_id;
                let datatable_en_name = row.datatable_en_name;
                message.confirmMsg('确定导出 ' + datatable_en_name + ' 吗').then(res => {
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
            producefun(row) {
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
                            if(item.etl_date == "00000000"){
                                item.etl_date = "--------";
                            }
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
                let param = {
                    "etl_sys_cd": this.selectedetlsys,
                    "sub_sys_cd": this.selectedetltask,
                    "datatable_id": this.selecteddatatable_id,
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
            },
            handleChange(file, fileList) {
                this.fileList = fileList;
                if (fileList.length != 0) {
                    this.dialogImportData = true;
                } else {
                    this.dialogImportData = false;
                }
                arr = fileList;
            },
            //文件超出个数限制时的钩子
            handleExceed(files, fileList) {
                this.$message.warning(`只能选择一个文件`);
            },
            importDatacancel() {
                this.dialogImportData = false;
                this.fileList = [];
                this.$message.info('已取消上传');
            },
            importData() {
                if (arr.length > 0) {
                    let param = new FormData() // 创建form对象
                    for (let i = 0; i < arr.length; i++) {
                        param.append('file', arr[i].raw);
                    }
                    param.append('data_mart_id', this.data_mart_id);
                    this.isLoading = true;
                    functionAll.uploadExcelFile(param).then(res => {
                        this.isLoading = false;
                        this.dialogImportData = false;
                        if (res.code == 200) {
                            message.customizTitle("文件上传成功", "success");
                            this.querydmdatatable(this.data_mart_id);
                            this.fileList = [];
                        }
                    });
                    this.isLoading = false;
                } else {
                    message.customizTitle("请选择上传文件", "warning");
                }
            },
        }
    };
</script>


<style scoped>
    /* 按钮样式 */
    .elButton {
        float: right;
    }

    .buttonStyle {
        display: block;
        float: left;
        margin-right: 10px;
        margin-left: 0px;
    }

    .tabes {
        margin-top: 25px;
    }

    .topTitle1 {
        border-bottom: 1px solid #e6e3e3;
        margin-bottom: 10px;
        width: 100%;
        height: 40px;
        line-height: 40px;
    }
</style>

