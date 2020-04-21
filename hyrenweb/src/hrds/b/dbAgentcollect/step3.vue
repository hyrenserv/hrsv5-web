<template>
<div class="step3">
    <Step :active="active"></Step>
    <el-form ref="ruleForm" :model="ruleForm">
        <el-table :data="ruleForm.tableData.slice((currentPage - 1) * pagesize, currentPage *pagesize)" border size="medium">
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
            <el-table-column property="transfer" width="84" label="是否转存" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.transfer" :checked="scope.row.transfer"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column property="is_header" width="84" label="是否有表头" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.is_header" :checked="scope.row.is_header"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column property="dbfile_format"  label="文件格式" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    <el-form-item :prop="'tableData.'+scope.$index+'.dbfile_format'" :rules="rule.selected">
                        <el-select placeholder="文件格式"  v-model="scope.row.dbfile_format" style="margin-bottom: 5px;" size="mini" >
                            <el-option size="medium" v-for="(item,index) in ExtractDataType" :key="index" :label="item.value" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column property="row_separator" label="换行符" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    <el-form-item :prop="'tableData.'+scope.$index+'.row_separator'" :rules="rule.selected">
                        <el-select placeholder="换行符" v-model="scope.row.row_separator" style="margin-bottom: 8px" size="mini">
                            <el-option size="medium" v-for="(item,index) in newlineCharacter" :key="index" :label="item.value" :value="item.value">{{item.title}}</el-option>
                        </el-select>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column property="database_separatorr" label="列分隔符" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    <el-form-item :prop="'tableData.'+scope.$index+'.database_separatorr'" :rules="rule.default">
                        <el-input size="mini" v-model="scope.row.database_separatorr" style="margin-bottom: 8px;" placeholder="列分隔符"></el-input>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column property="plane_url" width="94" label="源文件路径" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    <el-form-item :prop="'tableData.'+scope.$index+'.plane_url'" :rules="rule.default">
                        <el-input size="mini" v-model="scope.row.plane_url" style="margin-bottom: 8px;" placeholder="源文件路径"></el-input>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column property="database_code"  label="数据字符集" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                    <el-form-item :prop="'tableData.'+scope.$index+'.database_code'" :rules="rule.selected">
                        <el-select placeholder="数据字符集" v-model="scope.row.database_code" style="margin-bottom: 8px;" size="mini">
                            <el-option v-for="(item,index) in DataBaseCode" :key="index" :label="item.value" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                </template>
            </el-table-column>
        </el-table>
    </el-form>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="ruleForm.tableData.length" class="locationcenter"></el-pagination>
    <div class="step1Footer">
        <el-col :span="12">
            <el-button type="primary" @click="goBackQuit" size="medium"> 返回</el-button>
        </el-col>
        <el-col :span="12">
            <div class="partFourDiv">
                <el-button type="primary" style="float:left" @click="backSteps" size="medium">上一步</el-button>
                <el-button type="primary" style="float:right" @click="nextSteps('ruleForm')" size="medium"> 下一步</el-button>
            </div>
        </el-col>
    </div>
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
            ruleForm: {
                tableData: [],
            },
            FileFormat: [],
            pagesize: 100,
            currentPage: 1,
            DataBaseCode: [],
            ExtractDataType: [],
            DataExtractType: [],
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
    mounted() {
        this.getInitDataTransferFun()
        this.getDataBaseCodeFun()
        this.getFileFormat()
    },
    methods: {
        // 返回上一级
        goBackQuit() {
            this.$router.push({
                name: "agentList"
            })
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
            functionAll.getInitDataTransfer({
                colSetId: this.$route.query.id
            }).then(res => {
                console.log(res)
                this.ruleForm.tableData = res.data
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
                    console.log(this.ruleForm.tableData)
                    this.isLoading = true
                    let params = {};
                    params["colSetId"] = parseInt(this.$route.query.id);
                    params["dataExtractionDefs"] = JSON.stringify(this.ruleForm.tableData);
                    functionAll.saveDataTransferData(params).then(res => {
                        console.log(res)
                        this.isLoading = false
                        if (res.success == true) {
                            let data = {}
                            if (this.$route.query.edit == 'yes') {
                                data = {
                                    agent_id: this.$route.query.agent_id,
                                    id: this.$route.query.id,
                                    sourceId: this.$route.query.sourceId,
                                    source_name: this.$route.query.source_name,
                                    edit: "yes"
                                }
                            } else {
                                data = {
                                    agent_id: this.$route.query.agent_id,
                                    id: this.$route.query.id,
                                    sourceId: this.$route.query.sourceId,
                                    source_name: this.$route.query.source_name,
                                }
                            }
                            this.$router.push({
                                path: "/collection4_4",
                                query: data
                            })
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
                    sourceId: this.$route.query.sourceId,
                    source_name: this.$route.query.source_name,
                    edit: "yes"
                }
            } else {
                data = {
                    agent_id: this.$route.query.agent_id,
                    id: this.$route.query.id,
                    sourceId: this.$route.query.sourceId,
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
