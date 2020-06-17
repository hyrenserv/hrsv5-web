<template>
<div>
    <Step :active="active"></Step>
    <el-form ref="ruleForm" :model="ruleForm">
        <el-table stripe class="step3" :data="ruleForm.tableData.slice((currentPage - 1) * pagesize, currentPage *pagesize)" border size="medium" >
            <el-table-column property label="序号" width="60px" align="center">
                <template slot-scope="scope">
                    <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column property="table_name" label="表名" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column property="table_ch_name" label="中文表名" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    <el-form-item :prop="'tableData.'+scope.$index+'.table_ch_name'" :rules="rule.default">
                        <el-input size="mini" v-model="scope.row.table_ch_name" style="margin-bottom: 8px;" placeholder="中文表名"></el-input>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column property="is_archived"  label="是否转存" align="center">
                  <template slot="header" slot-scope="scope">
                        <el-checkbox @change="handleCheckAllChange(ruleForm.tableData,is_archivedAll)" v-model="is_archivedAll" :checked="is_archivedAll">
                            <span class="allclickColor">是否转存</span>
                        </el-checkbox>
                    </template>
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.is_archived" :checked="scope.row.is_archived" @change="col_everySelectfun(scope.row.is_archived,ruleForm.tableData)"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column property="dbfile_format" label="文件格式" align="center">
                <template slot-scope="scope">
                    <!-- <el-form-item :prop="'tableData.'+scope.$index+'.dbfile_format'" :rules="rule.selected"> -->
                    <el-select placeholder="文件格式" v-model="scope.row.dbfile_format" style="margin-bottom: 5px;" size="mini" @change="getFormatFun(scope.row)">
                        <el-option size="medium" v-for="(item,index) in scope.row.DataExtractType" :key="index" :label="item.value" :value="item.code"></el-option>
                    </el-select>
                    <!-- </el-form-item> -->
                </template>
            </el-table-column>
            <el-table-column property="is_header" width="94" label="是否有表头" align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.is_header" :checked="scope.row.is_header" disabled></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column property="row_separator" label="换行符" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    <!-- <el-form-item :prop="'tableData.'+scope.$index+'.row_separator'" :rules="rule.selected"> -->
                    <el-select placeholder="换行符" v-model="scope.row.row_separator" style="margin-bottom: 8px" size="mini" disabled>
                        <el-option size="medium" v-for="(item,index) in newlineCharacter" :key="index" :label="item.value" :value="item.value">{{item.title}}</el-option>
                    </el-select>
                    <!-- </el-form-item> -->
                </template>
            </el-table-column>
            <el-table-column property="database_separatorr" label="列分隔符" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    <!-- <el-form-item :prop="'tableData.'+scope.$index+'.database_separatorr'" :rules="rule.default" > -->
                    <el-input size="mini" v-model="scope.row.database_separatorr" style="margin-bottom: 8px;" disabled placeholder="列分隔符"></el-input>
                    <!-- </el-form-item> -->
                </template>
            </el-table-column>
            <el-table-column property="plane_url" label="源文件路径" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    <!-- <el-form-item :prop="'tableData.'+scope.$index+'.plane_url'" :rules="rule.default"> -->
                    <el-input size="mini" v-model="scope.row.plane_url" style="margin-bottom: 8px;" readonly placeholder="源文件路径"></el-input>
                    <!-- </el-form-item> -->
                </template>
            </el-table-column>
            <el-table-column property="database_code" label="数据字符集" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    <!-- <el-form-item :prop="'tableData.'+scope.$index+'.database_code'" > -->
                    <el-select placeholder="数据字符集" v-model="scope.row.database_code" style="margin-bottom: 8px;" disabled size="mini">
                        <el-option v-for="(item,index) in DataBaseCode" :key="index" :label="item.value" :value="item.code"></el-option>
                    </el-select>
                    <!-- </el-form-item> -->
                </template>
            </el-table-column>
        </el-table>
    </el-form>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="ruleForm.tableData.length" class="locationcenter"></el-pagination>
    <el-row>
        <el-col :span="12">
            <el-button type="primary" size="medium" class="leftbtn" @click="backFun()">返回</el-button>
        </el-col>
        <el-col :span="12">
            <el-button type="primary" size="medium" class='rightbtn' @click="nextSteps('ruleForm')">下一步</el-button>
            <el-button type="primary" size="medium" class='rightbtn' @click="backSteps()">上一步</el-button>
        </el-col>
    </el-row>
    <!--所有表分隔符设置  -->
    <!-- <el-dialog title="表转存分隔符设置" :visible.sync="dialogtransferSettings" width="50%" class="alltable">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">表转存分隔符设置</span>
        </div>
        <el-form ref="separatorData" :model="separatorData" label-width="240px" text-align="center">
            <el-form-item label="换行符">
                <el-select placeholder="换行符" v-model="separatorData.row_separator" style="width: 190px;" size="medium">
                    <el-option v-for="(item,index) in newlineCharacter" :key="index" :label="item.value" :value="item.value">{{item.title}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数据列分隔符">
                <el-input placeholder="数据列分隔符" v-model="separatorData.database_separatorr" style="width:190px" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="数据字符集">
                <template>
                    <el-select placeholder="数据字符集" v-model="separatorData.database_code" style="width: 190px;" size="medium">
                        <el-option v-for="(item,index) in DataBaseCode" :key="index" :label="item.value" :value="item.code"></el-option>
                    </el-select>
                </template>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="mini">取 消</el-button>
            <el-button type="primary" size="mini" @click="TransferSubmitFun()">确 定</el-button>
        </div>
    </el-dialog> -->
    <!-- 加载过度 -->
    <transition name="fade">
        <loading v-if="isLoading" />
    </transition>
</div>
</template>

<script>
import Step from "./step";
import * as functionAll from "./dbAgentcollect"
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
import * as message from "@/utils/js/message";
import Loading from '../../components/loading'
export default {
    components: {
        Step,
        Loading
    },
    data() {
        return {
            active: 2,
            isLoading: false,
            rule: validator.default,
            tableloadingInfo: "数据加载中...",
            // dialogtransferSettings: false,
            ruleForm: {
                tableData: [],
            },
            FileFormat: [],
            pagesize: 100,
            currentPage: 1,
            DataBaseCode: [],
            ExtractDataType: [],
            DataExtractType: [],
            separatorData: {
                row_separator: '',
                database_separatorr: '',
                database_code: ''
            },
            tablename: '', //点击转存临时存表名
            is_archivedAll:false,
            newlineCharacter: [{
                    value: "\\n",
                    code: "1",
                    title: "\\n  (Linux、Unix换行符)"
                },
                {
                    value: "\\r",
                    code: "2",
                    title: "\\r  (Mac OS换行符)"
                },
                {
                    value: "\\r\\n",
                    code: "3",
                    title: "\\r\\n  (windows换行符)"
                }
            ],
        }
    },
    created() {
        this.getDataBaseCodeFun()
        this.getFileFormat()
    },
    mounted() {
        this.getInitDataTransferFun()

    },
    methods: {
        // 返回上一级
        backFun() {
            this.$router.push({
                path: "/agentList"
            });
        },
        // 文件格式改变
        getFormatFun(row) {
            for (let i = 0; i < row.storage.length; i++) {
                if (row.storage[i].dbfile_format == row.dbfile_format) {
                    row.database_separatorr = row.storage[i].database_separatorr
                    row.database_code = row.storage[i].database_code
                    row.plane_url = row.storage[i].plane_url
                    row.row_separator = row.storage[i].row_separator
                    row.is_header = row.storage[i].is_header== '1'? true : false
                }
            }
        },
        //转存
         handleCheckAllChange(items, e) {
            items.forEach((item, i) => {
                if (e) {
                    item.is_archived = true;
                } else {
                    item.is_archived = false;
                }
            });
        },
        //转存单个点击
        col_everySelectfun(val, alldata) {
            let count = 0
            if (val == true) {
                for (let i = 0; i < alldata.length; i++) {
                    if (alldata[i].is_archived == true) {
                        count++
                    }
                }
                if (count == alldata.length) {
                    this.is_archivedAll = true
                } else {
                    this.is_archivedAll = false
                }
            } else {
                for (let i = 0; i < alldata.length; i++) {
                    if (alldata[i].is_archived == false) {
                        if (count < alldata.length) {
                            this.is_archivedAll = false
                        }
                    }
                }
            }
        },
        // 抽取数据存储方式
        getFileFormat() {
            let params = {};
            params["category"] = "FileFormat";
            this.$Code.getCategoryItems(params).then(res => {
                if (res.data) {
                    this.ExtractDataType = res.data;
                }
            });
        },
        // 根据code值返回value---文件格式
        getFileFormatValue(code) {

            for (let i = 0; i < this.ExtractDataType.length; i++) {
                if (this.ExtractDataType[i].code == code) {
                    return this.ExtractDataType[i].value
                }
            }
        },
        // 获取数据字符集下拉
        getDataBaseCodeFun() {
            let params2 = {};
            params2["category"] = "DataBaseCode";
            this.$Code.getCategoryItems(params2).then(res => {
                if (res.data) {
                    this.DataBaseCode = res.data;
                }
            });
        },
        // 获取表格数据
        getInitDataTransferFun() {
            this.tableloadingInfo = '数据加载中...'
            functionAll.getInitDataTransfer({
                colSetId: this.$route.query.id
            }).then(res => {
                if (res.data.length > 0) {
                    let getData = res.data
                    for (let i = 0; i < getData.length; i++) {
                        getData[i].DataExtractType = []
                         getData[i].table_ch_name=getData[i].table_ch_name==''?getData[i].table_name:getData[i].table_ch_name
                        getData[i].dbfile_format = getData[i].storage[0].dbfile_format
                        getData[i].is_header = getData[i].storage[0].is_header == '1' ? true : false
                        getData[i].row_separator = getData[i].storage[0].row_separator
                        getData[i].database_separatorr = getData[i].storage[0].database_separatorr
                        getData[i].plane_url = getData[i].storage[0].plane_url
                        getData[i].database_code = getData[i].storage[0].database_code
                        getData[i].is_archived = getData[i].is_archived == '1' ? true : false
                        for (let j = 0; j < getData[i].storage.length; j++) {
                            if(getData[i].storage[j].dbfile_format){
                                getData[i].DataExtractType.push({
                                'code': getData[i].storage[j].dbfile_format,
                                'value': this.getFileFormatValue(getData[i].storage[j].dbfile_format)
                            })
                            }
                            
                        }
                    }
                    this.ruleForm.tableData = getData
                } else {
                    this.tableloadingInfo = '暂无数据'
                }

            })
        },
        handleSizeChange(size) {
            this.pagesize = size;
        },
        handleCurrentChange(current) {
            this.currentPage = current;
        },
        // 下一步
        // 接口
        nextSteps(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.isLoading = true
                    let dataExtractionDefs = [],
                        table_info = [],
                        count = 0
                    for (let i = 0; i < this.ruleForm.tableData.length; i++) {
                        if (this.ruleForm.tableData[i].is_archived == true) {
                            count++
                        }
                        if (this.ruleForm.tableData[i].table_id) {
                            table_info.push({
                                'table_id': this.ruleForm.tableData[i].table_id,
                                'table_name': this.ruleForm.tableData[i].table_name,
                                'table_ch_name': this.ruleForm.tableData[i].table_ch_name,
                            })
                            if (this.ruleForm.tableData[i].ded_id) {
                                dataExtractionDefs.push({
                                    'table_id': this.ruleForm.tableData[i].table_id,
                                    'ded_id': this.ruleForm.tableData[i].ded_id,
                                    'is_header': this.ruleForm.tableData[i].is_header==true ? '1' : '0',
                                    'is_archived': this.ruleForm.tableData[i].is_archived==true ? '1' : '0',
                                    'dbfile_format': this.ruleForm.tableData[i].dbfile_format,
                                    'row_separator': this.ruleForm.tableData[i].row_separator,
                                    'database_separatorr': this.ruleForm.tableData[i].database_separatorr,
                                    'plane_url': this.ruleForm.tableData[i].plane_url,
                                    'database_code': this.ruleForm.tableData[i].database_code,
                                    // 'data_extract_type':this.ruleForm.tableData[i].is_archived ? '3' : '2'
                                })
                            } else {
                                dataExtractionDefs.push({
                                    'table_id': this.ruleForm.tableData[i].table_id,
                                    'is_header': this.ruleForm.tableData[i].is_header==true ? '1' : '0',
                                    'is_archived': this.ruleForm.tableData[i].is_archived==true ? '1' : '0',
                                    'dbfile_format': this.ruleForm.tableData[i].dbfile_format,
                                    'row_separator': this.ruleForm.tableData[i].row_separator,
                                    'database_separatorr': this.ruleForm.tableData[i].database_separatorr,
                                    'plane_url': this.ruleForm.tableData[i].plane_url,
                                    'database_code': this.ruleForm.tableData[i].database_code,
                                    // 'data_extract_type':this.ruleForm.tableData[i].is_archived ? '3' : '2'
                                })
                            }

                        } else {
                            table_info.push({
                                'table_name': this.ruleForm.tableData[i].table_name,
                                'table_ch_name': this.ruleForm.tableData[i].table_ch_name,
                            })
                            if (this.ruleForm.tableData[i].ded_id) {
                                dataExtractionDefs.push({
                                    'is_header': this.ruleForm.tableData[i].is_header==true ? '1' : '0',
                                    'ded_id': this.ruleForm.tableData[i].ded_id,
                                    'is_archived': this.ruleForm.tableData[i].is_archived==true ? '1' : '0',
                                    'dbfile_format': this.ruleForm.tableData[i].dbfile_format,
                                    'row_separator': this.ruleForm.tableData[i].row_separator,
                                    'database_separatorr': this.ruleForm.tableData[i].database_separatorr,
                                    'plane_url': this.ruleForm.tableData[i].plane_url,
                                    'database_code': this.ruleForm.tableData[i].database_code,
                                    // 'data_extract_type':this.ruleForm.tableData[i].is_archived ? '3' : '2'
                                })
                            } else {
                                dataExtractionDefs.push({
                                    'is_header': this.ruleForm.tableData[i].is_header==true ? '1' : '0',
                                    'is_archived': this.ruleForm.tableData[i].is_archived==true ? '1' : '0',
                                    'dbfile_format': this.ruleForm.tableData[i].dbfile_format,
                                    'row_separator': this.ruleForm.tableData[i].row_separator,
                                    'database_separatorr': this.ruleForm.tableData[i].database_separatorr,
                                    'plane_url': this.ruleForm.tableData[i].plane_url,
                                    'database_code': this.ruleForm.tableData[i].database_code,
                                    // 'data_extract_type':this.ruleForm.tableData[i].is_archived ? '3' : '2'
                                })
                            }

                        }

                    }
                    let params = {};
                    params["colSetId"] =this.$route.query.id;
                    params["dataExtractionDefs"] = JSON.stringify(dataExtractionDefs);
                    params["tableInfos"] = JSON.stringify(table_info);
                    functionAll.saveDataTransferData(params).then(res => {
                        this.isLoading = false
                        if (res.code == 200) {
                            let data = {}
                            if (this.$route.query.edit == 'yes') {
                                if (count > 0) {
                                    data = {
                                        agent_id: this.$route.query.agent_id,
                                        id: this.$route.query.id,
                                        source_id: this.$route.query.source_id,
                                        source_name: this.$route.query.source_name,
                                        is_archived: 'yes',
                                        edit: "yes"
                                    }
                                } else {
                                    data = {
                                        agent_id: this.$route.query.agent_id,
                                        id: this.$route.query.id,
                                        source_id: this.$route.query.source_id,
                                        source_name: this.$route.query.source_name,
                                        is_archived: 'no',
                                        edit: "yes"
                                    }
                                }

                            } else {
                                if (count > 0) {
                                    data = {
                                        agent_id: this.$route.query.agent_id,
                                        id: this.$route.query.id,
                                        source_id: this.$route.query.source_id,
                                        source_name: this.$route.query.source_name,
                                        is_archived: 'yes',
                                    }
                                } else {
                                    data = {
                                        agent_id: this.$route.query.agent_id,
                                        id: this.$route.query.id,
                                        source_id: this.$route.query.source_id,
                                        source_name: this.$route.query.source_name,
                                        is_archived: 'no',
                                    }
                                }
                            }
                            if (count > 0) {
                                this.$router.push({
                                    path: "/collection4_4",
                                    query: data
                                })
                            } else {
                                this.$router.push({
                                    path: "/collection4_5",
                                    query: data
                                })
                            }

                        }
                    })

                }
            })

        },
        //上一步
        backSteps() {
            let data = {}
            if (this.$route.query.edit == 'yes') {
                data = {
                    agent_id: this.$route.query.agent_id,
                    id: this.$route.query.id,
                    source_id: this.$route.query.source_id,
                    source_name: this.$route.query.source_name,
                    edit: "yes"
                }
            } else {
                data = {
                    agent_id: this.$route.query.agent_id,
                    id: this.$route.query.id,
                    source_id: this.$route.query.source_id,
                    source_name: this.$route.query.source_name,
                }
            }
            this.$router.push({
                path: "/collection4_2",
                query: data
            })
        },
    },
}
</script>

<style scoped>
.leftbtn {
    margin-top: 12px;
    margin-top: 12px;
    float: left;
    margin: 15px;
    margin-bottom: 10px;
}

.rightbtn {
    margin-top: 12px;
    margin-top: 12px;
    float: right;
    margin: 15px;
    margin-bottom: 10px;
}

/* 按钮设置 */
.step3 .el-table {
    margin-bottom: 20px;
}

.step3 .partFourDiv {
    float: right;
}

.step3 .partFourDiv .el-button {
    margin-bottom: 20px;
}

.step3>>>.el-form-item {
    margin-bottom: 0 !important;
}
.allclickColor {
    color: #fff;
    font-weight: bold;
}

.step3>>>.el-form-item__error {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 6px;
    position: absolute;
    top: 69%;
    left: 4%;
    z-index: 1
}

.linefs>>>.el-form-item__content {
    line-height: 23px !important;
}

.step3>>>.el-form-item__content::before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
    display: inline-block;
    position: absolute;
    left: -8px;
}

.step3>>>tr>td {
    padding: 0;
}

.step3>>>.el-input-group__prepend {
    color: #FFF !important;
    background-color: #E6A23C !important;
    border-color: #E6A23C !important;
}

.step3>>>tr>td>.cell {
    padding: 6px 10px;
}
</style>
