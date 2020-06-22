<template>
<div id="steps4">
    <Step :active="active"></Step>
    <div class="cleanbtn">
        <el-button size="mini" type="success" @click="AllTable_SeparatorFun()" class="alltables">所有表分隔符设置</el-button>
    </div>
    <el-form ref="ruleForm" :model="ruleForm" class="steps4">
        <el-table :header-cell-style="{background:'#e6e0e0'}" ref="filterTable" stripe :default-sort="{prop: 'date', order: 'descending'}" style="width: 100%" size="medium" border :data="ruleForm.unloadingFileData.slice((unloadingcurrentPage - 1) * unloadingpagesize, unloadingcurrentPage *unloadingpagesize)">
            <el-table-column label="序号" align="center" width="60">
                <template slot-scope="scope">
                    <span>{{scope.$index+(unloadingcurrentPage - 1) * unloadingpagesize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="table_name" label="表名" width="110" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="table_ch_name" label="表中文名" width="110" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label=" 抽取数据存储方式" align="center">
                <template slot-scope="scope">
                    <!-- <el-button type="success"  size="mini" @click="dialogDatasaveType=true">选择数据存储方式</el-button> -->
                    <el-form-item :prop="'unloadingFileData.'+scope.$index+'.dbfile_format'" :rules="rule.selected">
                        <el-select placeholder="抽取数据存储方式" multiple v-model="scope.row.dbfile_format" style="margin-bottom: 5px;" size="mini" @change="IsExChangeDataFun(scope.row)" @remove-tag='removeTag'>
                            <el-option size="medium" v-for="(item,index) in ExtractDataType" :key="index+scope.$index" :label="item.value" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column label="落地目录" align="center" width="260">
                <template slot-scope="scope">
                    <el-input v-show="scope.row.fdc" v-model="scope.row.fdc_ml" placeholder="非定长落地目录" size="mini" style="margin-bottom: 8px;">
                        <template slot="prepend">
                            <el-button size="mini" @click="seletFilePath(scope.row.table_id,'fdc')">选择目录<span class='exDataColor'>(非定长)</span></el-button>
                        </template>
                    </el-input>
                    <el-input v-show="scope.row.dc" v-model="scope.row.dc_ml" placeholder="定长落地目录" size="mini" style="margin-bottom: 8px;">
                        <template slot="prepend">
                            <el-button size="mini" @click="seletFilePath(scope.row.table_id,'dc')">选择目录<span class='exDataColor'>(定长)</span></el-button>
                        </template>
                    </el-input>
                    <el-input v-show="scope.row.orc" v-model="scope.row.orc_ml" placeholder="ORC落地目录" size="mini" style="margin-bottom: 8px;">
                        <template slot="prepend">
                            <el-button size="mini" @click="seletFilePath(scope.row.table_id,'orc')">选择目录<span class='exDataColor'>(ORC)</span></el-button>
                        </template>
                    </el-input>
                    <el-input v-show="scope.row.par" v-model="scope.row.par_ml" placeholder="PAR落地目录" size="mini" style="margin-bottom: 8px;">
                        <template slot="prepend">
                            <el-button size="mini" @click="seletFilePath(scope.row.table_id,'par')">选择目录<span class='exDataColor'>(PAR)</span></el-button>
                        </template>
                    </el-input>
                    <el-input v-show="scope.row.csv" v-model="scope.row.csv_ml" placeholder="CSV落地目录" size="mini" style="margin-bottom: 8px;">
                        <template slot="prepend">
                            <el-button size="mini" @click="seletFilePath(scope.row.table_id,'csv')">选择目录<span class='exDataColor'>(CSV)</span></el-button>
                        </template>
                    </el-input>
                    <el-input v-show="scope.row.seq" v-model="scope.row.seq_ml" placeholder="SEQ落地目录" size="mini" style="margin-bottom: 8px;">
                        <template slot="prepend">
                            <el-button size="mini" @click="seletFilePath(scope.row.table_id,'seq')">选择目录<span class='exDataColor'>(SEQ)</span></el-button>
                        </template>
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column label=" 换行符" align="center">
                <template slot-scope="scope">
                    <el-form-item v-if="scope.row.fdc==true" :prop="'unloadingFileData.'+scope.$index+'.fdc_row_separator'" :rules="rule.selected" class='linefs'>
                        <el-select placeholder="非定长换行符" v-model="scope.row.fdc_row_separator" style="margin-bottom: 8px" size="mini">
                            <el-option size="medium" v-for="(item,index) in newlineCharacter" :key="index" :label="item.value" :value="item.value">{{item.title}}</el-option>
                        </el-select>
                    </el-form-item>
                    <el-select v-show="scope.row.dc" placeholder="定长换行符" v-model="scope.row.dc_row_separator" style="margin-bottom: 8px;" size="mini">
                        <el-option size="medium" v-for="(item,index) in newlineCharacter" :key="index" :label="item.value" :value="item.value">{{item.title}}</el-option>
                    </el-select>
                    <el-select v-show="scope.row.orc" disabled placeholder="ORC换行符" v-model="scope.row.orc_row_separator" style="margin-bottom: 8px;" size="mini">
                        <el-option size="medium" v-for="(item,index) in newlineCharacter" :key="index" :label="item.value" :value="item.value">{{item.title}}</el-option>
                    </el-select>
                    <el-select v-show="scope.row.par" disabled placeholder="PAR换行符" v-model="scope.row.par_row_separator" style="margin-bottom: 8px;" size="mini">
                        <el-option size="medium" v-for="(item,index) in newlineCharacter" :key="index" :label="item.value" :value="item.value">{{item.title}}</el-option>
                    </el-select>
                    <el-select v-show="scope.row.csv" disabled placeholder="CSV换行符" v-model="scope.row.csv_row_separator" style="margin-bottom: 8px;" size="mini">
                        <el-option size="medium" v-for="(item,index) in newlineCharacter" :key="index" :label="item.value" :value="item.value">{{item.title}}</el-option>
                    </el-select>
                    <el-select v-show="scope.row.seq" disabled placeholder="SEQ换行符" v-model="scope.row.seq_row_separator" style="margin-bottom: 8px;" size="mini">
                        <el-option size="medium" v-for="(item,index) in newlineCharacter" :key="index" :label="item.value" :value="item.value">{{item.title}}</el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label='数据列分隔符' align="center">
                <!--  <template slot="header">
                    <el-tooltip class="item" effect="light" content placement="right">
                        <div slot="content">
                            多行信息
                            <br />第二行信息
                        </div>
                        <i class="el-icon-question" aria-hidden="true">数据列分隔符</i>
                    </el-tooltip>
                </template> -->
                <template slot-scope="scope">
                    <el-form-item v-if="scope.row.fdc==true" :prop="'unloadingFileData.'+scope.$index+'.fdc_database_separatorr'" :rules="rule.default" class='linefs'>
                        <el-input size="mini" v-model="scope.row.fdc_database_separatorr" style="margin-bottom: 8px;" placeholder="非定长数据列分隔符"></el-input>
                    </el-form-item>
                    <el-input v-show="scope.row.dc" size="mini" v-model="scope.row.dc_database_separatorr" style="margin-bottom: 8px;" placeholder="定长数据列分隔符"></el-input>
                    <el-input v-show="scope.row.orc" disabled size="mini" v-model="scope.row.orc_database_separatorr" style="margin-bottom: 8px;" placeholder="ORC数据列分隔符"></el-input>
                    <el-input v-show="scope.row.par" disabled size="mini" v-model="scope.row.par_database_separatorr" style="margin-bottom: 8px;" placeholder="PAR数据列分隔符"></el-input>
                    <el-input v-show="scope.row.csv" disabled size="mini" v-model="scope.row.csv_database_separatorr" style="margin-bottom: 8px;" placeholder="CSV数据列分隔符"></el-input>
                    <el-input v-show="scope.row.seq" disabled size="mini" v-model="scope.row.seq_database_separatorr" style="margin-bottom: 8px;" placeholder="SEQ数据列分隔符"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="数据字符集" align="center">
                <template slot-scope="scope">
                    <el-select v-show="scope.row.fdc" placeholder="非定长数据字符集" v-model="scope.row.fdc_database_code" style="margin-bottom: 8px;" size="mini">
                        <el-option v-for="(item,index) in DataBaseCode" :key="index" :label="item.value" :value="item.code"></el-option>
                    </el-select>
                    <el-select v-show="scope.row.dc" placeholder="定长数据字符集" v-model="scope.row.dc_database_code" style="margin-bottom: 8px;" size="mini">
                        <el-option v-for="(item,index) in DataBaseCode" :key="index" :label="item.value" :value="item.code"></el-option>
                    </el-select>
                    <el-select v-show="scope.row.orc" placeholder="ORC数据字符集" v-model="scope.row.orc_database_code" style="margin-bottom: 8px;" size="mini">
                        <el-option v-for="(item,index) in DataBaseCode" :key="index" :label="item.value" :value="item.code"></el-option>
                    </el-select>
                    <el-select v-show="scope.row.par" placeholder="PAR数据字符集" v-model="scope.row.par_database_code" style="margin-bottom: 8px;" size="mini">
                        <el-option v-for="(item,index) in DataBaseCode" :key="index" :label="item.value" :value="item.code"></el-option>
                    </el-select>
                    <el-select v-show="scope.row.csv" placeholder="CSV数据字符集" v-model="scope.row.csv_database_code" style="margin-bottom: 8px;" size="mini">
                        <el-option v-for="(item,index) in DataBaseCode" :key="index" :label="item.value" :value="item.code"></el-option>
                    </el-select>
                    <el-select v-show="scope.row.seq" placeholder="SEQ数据字符集" v-model="scope.row.seq_database_code" style="margin-bottom: 8px;" size="mini">
                        <el-option v-for="(item,index) in DataBaseCode" :key="index" :label="item.value" :value="item.code"></el-option>
                    </el-select>
                </template>
            </el-table-column>

        </el-table>
    </el-form>
    <el-pagination @size-change="unloading_handleSizeChange" @current-change="unloading_handleCurrentChange" :current-page="unloadingcurrentPage" :page-sizes="[50, 100, 150, 200]" :page-size="unloadingpagesize" layout="total, sizes, prev, pager, next, jumper" :total="ruleForm.unloadingFileData.length" class="locationcenter"></el-pagination>
    <!--所有表分隔符设置  -->
    <el-dialog title="所有表分隔符设置" :visible.sync="dialogAllTableSeparatorSettings" width="50%" class="alltable" @close="AllTable_SeparatorCloseFun()">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">所有表分隔符设置</span>
        </div>
        <el-form ref="separatorData" :model="separatorData" label-width="240px" text-align="center">
            <el-form-item label="抽取数据存储格式" prop="Extractformat" :rules="rule.selected">
                <el-select placeholder="抽取数据存储方式" v-model="separatorData.Extractformat" style="width: 240px;" size="medium" @change="exchangeFun">
                    <el-option v-for="(item,index) in ExtractDataType" :key="index" :label="item.value" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="落地目录" prop="Extractformat">
                <el-input v-model="separatorData.ml" placeholder="落地目录" size="medium" style="width: 240px;">
                    <template slot="prepend">
                        <el-button size="mini" @click="seletFilePath('','all')">选择目录</el-button>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="换行符" key="1" v-if="separatorData.Extractformat=='非定长'" prop="Newlinecharacte" :rules="rule.selected">
                <el-select placeholder="换行符" v-model="separatorData.Newlinecharacte" style="width: 190px;" size="medium" :disabled="separatorData.Extractformat=='ORC'||separatorData.Extractformat=='PARQUET'||separatorData.Extractformat=='SEQUENCEFILE'">
                    <el-option v-for="(item,index) in newlineCharacter" :key="index" :label="item.value" :value="item.value">{{item.title}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="换行符" key="2" v-else>
                <el-select placeholder="换行符" v-model="separatorData.Newlinecharacte" style="width: 190px;" size="medium" :disabled="separatorData.Extractformat=='ORC'||separatorData.Extractformat=='PARQUET'||separatorData.Extractformat=='SEQUENCEFILE'||separatorData.Extractformat=='CSV'">
                    <el-option v-for="(item,index) in newlineCharacter" :key="index" :label="item.value" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数据列分隔符" v-if="separatorData.Extractformat=='非定长'" key="3" prop="Datacolumnseparator" :rules="rule.default">
                <el-input :disabled="separatorData.Extractformat=='ORC'||separatorData.Extractformat=='PARQUET'||separatorData.Extractformat=='SEQUENCEFILE'" v-model="separatorData.Datacolumnseparator" placeholder="数据列分隔符" style="width:190px" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="数据列分隔符" key="4" v-else>
                <el-input :disabled="separatorData.Extractformat=='ORC'||separatorData.Extractformat=='PARQUET'||separatorData.Extractformat=='SEQUENCEFILE'||separatorData.Extractformat=='CSV'" v-model="separatorData.Datacolumnseparator" placeholder="数据列分隔符" style="width:190px" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="数据字符集">
                <template>
                    <el-select placeholder="数据字符集" v-model="separatorData.Datacharacterset" style="width: 190px;" size="medium">
                        <el-option v-for="(item,index) in DataBaseCode" :key="index" :label="item.value" :value="item.code"></el-option>
                    </el-select>
                </template>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="AllTable_SeparatorCloseFun()" type="danger" size="mini">取 消</el-button>
            <el-button type="primary" @click="AllTable_SeparatorSubmitFun('separatorData')" size="mini">确 定</el-button>
        </div>
    </el-dialog>
    <el-row>
        <el-col :span="12">
            <el-button type="primary" size="medium" class="leftbtn" @click="backFun()">返回</el-button>
        </el-col>
        <el-col :span="12">
            <el-button type="primary" size="medium" class='rightbtn' @click="next('ruleForm')">下一步</el-button>
            <el-button type="primary" size="medium" class='rightbtn' @click="pre()">上一步</el-button>
        </el-col>
    </el-row>
    <!-- 选择目录弹出框 -->
    <el-dialog title="选择目录" :visible.sync="dialogSelectfolder">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">选择目录</span>
        </div>
        <div class="mytree"  hight='200'>
            <el-tree ref='tree' :data="data2" :check-strictly="true" show-checkbox node-key="name" lazy :load="loadNode" :props="defaultProps" accordion :indent='0' @check-change="handleCheckChange">
                <span class="span-ellipsis" slot-scope="{ node, data }">
                    <span :title="node.label">{{ node.label }}</span>
                </span>
            </el-tree>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogSelectfolder=false" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="dialogSelectfolder = false;pathSubmit()" size="mini">保存</el-button>
        </div>
    </el-dialog>
    <!-- 加载过度 -->
    <transition name="fade">
        <loading v-if="isLoading" />
    </transition>
</div>
</template>

<script>
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
import * as addTaskAllFun from "./addTask";
import * as message from "@/utils/js/message";
import Loading from '../../components/loading'

import Step from "./step";
var IsExtypeData1 = [],
    IsExtypeData2 = [];
export default {
    components: {
        Step,
        Loading
    },
    data() {
        return {
            active: 3,
            data2: [],
            defaultProps: {
                children: "children",
                label: "path"
            },
            isLoading: false,
            dialogDatasaveType: false,
            tableloadingInfo: "数据加载中...",
            treenloadingInfo: '数据加载中...',
            rule: validator.default,
            dialogAllTableSeparatorSettings: false,
            unloadingcurrentPage: 1,
            unloadingpagesize: 100,
            ruleForm: {
                unloadingFileData: [],
            },
            unloadingFileData: [],
            separatorData: {
                ml: "",
                Extractformat: "",
                Newlinecharacte: "",
                Datacolumnseparator: "",
                Datacharacterset: ""
            },
            databaseId: "",
            dbid: null,
            aId: null,
            sourId: null,
            sName: null,
            DataBaseCode: [],
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
            AlltableisExData: [{
                    value: "是",
                    code: "1"
                },
                {
                    value: "否",
                    code: "2"
                }
            ],
            ExtractDataType: [],
            arrData: [],
            dialogSelectfolder: false,
            path: '',
            row_ml: '',
            row_ml_name: '',
            delcomData: []
        };
    },
    created() {
        this.dbid = this.$route.query.id;
        this.aId = this.$route.query.agent_id;
        this.sourId = this.$route.query.source_id;
        this.sName = this.$Base64.decode(this.$route.query.source_name);
        // 抽取数据存储方式
        let params = {};
        params["category"] = "FileFormat";
        this.$Code.getCategoryItems(params).then(res => {
            if (res.data) {
                this.ExtractDataType = res.data;
            }
        });
    },
    mounted() {

        // 获取进入页面的总数据
        // if (this.$route.query.edit == "yes") {
        this.getInitInfo();
        // }
        // 字符集下拉
        let params2 = {};
        params2["category"] = "DataBaseCode";
        this.$Code.getCategoryItems(params2).then(res => {
            if (res.data) {
                this.DataBaseCode = res.data;
            }
        });
    },
    methods: {
        backFun() {
            this.$router.push({
                path: "/agentList"
            });
        },
        next(formName) {
            var a = this.ruleForm.unloadingFileData;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.isLoading = true
                    let dataAll = a,
                        extractionDefString = [],
                        arrsaveDed_id = [];
                    if (dataAll.length > 0) {
                        for (var i = 0; i < dataAll.length; i++) {
                            for (let j = 0; j < dataAll[i].dbfile_format.length; j++) {
                                if (dataAll[i].dbfile_format[j] == '非定长') {
                                    arrsaveDed_id.push(dataAll[i].fdc_ded_id)
                                    extractionDefString.push({
                                        'table_id': dataAll[i].table_id,
                                        'plane_url': dataAll[i].fdc_ml,
                                        'row_separator': dataAll[i].fdc_row_separator,
                                        'database_separatorr': dataAll[i].fdc_database_separatorr,
                                        'database_code': dataAll[i].fdc_database_code,
                                        'dbfile_format': this.getExtractDataTypecodeFun(dataAll[i].dbfile_format[j])
                                    })
                                } else if (dataAll[i].dbfile_format[j] == '定长') {
                                    arrsaveDed_id.push(dataAll[i].dc_ded_id)
                                    extractionDefString.push({
                                        'table_id': dataAll[i].table_id,
                                        'plane_url': dataAll[i].dc_ml,
                                        'row_separator': dataAll[i].dc_row_separator,
                                        'database_separatorr': dataAll[i].dc_database_separatorr,
                                        'database_code': dataAll[i].dc_database_code,
                                        'dbfile_format': this.getExtractDataTypecodeFun(dataAll[i].dbfile_format[j])
                                    })
                                } else if (dataAll[i].dbfile_format[j] == 'CSV') {
                                    arrsaveDed_id.push(dataAll[i].csv_ded_id)
                                    extractionDefString.push({
                                        'table_id': dataAll[i].table_id,
                                        'plane_url': dataAll[i].csv_ml,
                                        'row_separator': dataAll[i].csv_row_separator,
                                        'database_separatorr': dataAll[i].csv_database_separatorr,
                                        'database_code': dataAll[i].csv_database_code,
                                        'dbfile_format': this.getExtractDataTypecodeFun(dataAll[i].dbfile_format[j])
                                    })
                                } else if (dataAll[i].dbfile_format[j] == 'ORC') {
                                    arrsaveDed_id.push(dataAll[i].orc_ded_id)
                                    extractionDefString.push({
                                        'table_id': dataAll[i].table_id,
                                        'plane_url': dataAll[i].orc_ml,
                                        'database_code': dataAll[i].orc_database_code,
                                        'dbfile_format': this.getExtractDataTypecodeFun(dataAll[i].dbfile_format[j])
                                    })

                                } else if (dataAll[i].dbfile_format[j] == 'SEQUENCEFILE') {
                                    arrsaveDed_id.push(dataAll[i].seq_ded_id)
                                    extractionDefString.push({
                                        'table_id': dataAll[i].table_id,
                                        'plane_url': dataAll[i].seq_ml,
                                        'database_code': dataAll[i].seq_database_code,
                                        'dbfile_format': this.getExtractDataTypecodeFun(dataAll[i].dbfile_format[j])
                                    })

                                } else if (dataAll[i].dbfile_format[j] == 'PARQUET') {
                                    arrsaveDed_id.push(dataAll[i].par_ded_id)
                                    extractionDefString.push({
                                        'table_id': dataAll[i].table_id,
                                        'plane_url': dataAll[i].par_ml,
                                        'database_code': dataAll[i].par_database_code,
                                        'dbfile_format': this.getExtractDataTypecodeFun(dataAll[i].dbfile_format[j])
                                    })

                                }
                            }

                        }
                        for (let j = 0; j < arrsaveDed_id.length; j++) { //本次
                            for (let i = 0; i < this.delcomData.length; i++) {
                                if (arrsaveDed_id[j] == this.delcomData[i]) {
                                    this.delcomData.splice(i, 1)
                                    i--
                                }
                            }
                        }
                        let params = {},
                            dedid = this.delcomData;
                        params["colSetId"] =this.databaseId;
                        params["extractionDefString"] = JSON.stringify(extractionDefString);
                        params['dedId'] = JSON.parse(JSON.stringify(dedid)).join('^')
                        addTaskAllFun.saveFileConf(params).then(res => {
                            this.isLoading = false
                            if (res.code == 200) {
                                let data = {};
                                if (this.$route.query.edit == "yes") {
                                    data = {
                                        agent_id: this.aId,
                                        id: this.dbid,
                                        source_id: this.sourId,
                                        source_name: this.$Base64.encode(this.sName),
                                        edit: "yes"
                                    };
                                } else {
                                    data = {
                                        id: this.dbid,
                                        agent_id: this.aId,
                                        source_id: this.sourId,
                                        source_name: this.$Base64.encode(this.sName)
                                    };
                                }
                                this.$router.push({
                                    path: "/collection1_5",
                                    query: data
                                });
                            }
                        });
                    }
                } else {
                    return false;
                    this.isLoading = false
                }
            });
        },
        pre() {
            let data = {};
            if (this.$route.query.edit == "yes") {
                data = {
                    agent_id: this.aId,
                    id: this.dbid,
                    source_id: this.sourId,
                    source_name: this.$Base64.encode(this.sName),
                    edit: "yes"
                };
            } else {
                data = {
                    agent_id: this.aId,
                    id: this.dbid,
                    source_id: this.sourId,
                    source_name: this.$Base64.encode(this.sName)
                };
            }
            this.$router.push({
                path: "/collection1_3",
                query: data
            });
        },
        unloading_handleSizeChange(size) {
            this.unloadingpagesize = size;
        },
        unloading_handleCurrentChange(current) {
            this.unloadingcurrentPage = current;
        },
        // 获取所有数据显示
        getInitInfo() {
            this.databaseId = this.dbid;
            let params = {};
            params["colSetId"] = this.databaseId;
            this.tableloadingInfo = "数据加载中...";
            addTaskAllFun.getInitInfo(params).then(res => {
                if (res) {
                    if (res.data.length == 0) {
                        this.tableloadingInfo = "暂无数据";
                    } else {
                        let arrData = res.data
                        for (let i = 0; i < arrData.length; i++) {
                            arrData[i].dbfile_format = []
                            for (let j = 0; j < arrData[i].tableData.length; j++) {
                                this.delcomData.push(arrData[i].tableData[j].ded_id)
                                if (this.getExtractDataTypeFun(arrData[i].tableData[j].dbfile_format) == '非定长') {
                                    arrData[i].fdc = true
                                    arrData[i].fdc_ml = arrData[i].tableData[j].plane_url
                                    arrData[i].fdc_row_separator = arrData[i].tableData[j].row_separator
                                    arrData[i].fdc_database_separatorr = arrData[i].tableData[j].database_separatorr
                                    arrData[i].fdc_database_code = arrData[i].tableData[j].database_code
                                    arrData[i].fdc_ded_id = arrData[i].tableData[j].ded_id
                                    arrData[i].dbfile_format.push('非定长')
                                } else if (this.getExtractDataTypeFun(arrData[i].tableData[j].dbfile_format) == '定长') {
                                    arrData[i].dc = true
                                    arrData[i].dc_ml = arrData[i].tableData[j].plane_url
                                    arrData[i].dc_row_separator = arrData[i].tableData[j].row_separator
                                    arrData[i].dc_database_separatorr = arrData[i].tableData[j].database_separatorr
                                    arrData[i].dc_database_code = arrData[i].tableData[j].database_code
                                    arrData[i].dc_ded_id = arrData[i].tableData[j].ded_id
                                    arrData[i].dbfile_format.push('定长')
                                } else if (this.getExtractDataTypeFun(arrData[i].tableData[j].dbfile_format) == 'ORC') {
                                    arrData[i].orc = true
                                    arrData[i].orc_ml = arrData[i].tableData[j].plane_url
                                    arrData[i].orc_row_separator = arrData[i].tableData[j].row_separator
                                    arrData[i].orc_database_separatorr = arrData[i].tableData[j].database_separatorr
                                    arrData[i].orc_database_code = arrData[i].tableData[j].database_code
                                    arrData[i].orc_ded_id = arrData[i].tableData[j].ded_id
                                    arrData[i].dbfile_format.push('ORC')
                                } else if (this.getExtractDataTypeFun(arrData[i].tableData[j].dbfile_format) == 'CSV') {
                                    arrData[i].csv = true
                                    arrData[i].csv_ml = arrData[i].tableData[j].plane_url
                                    arrData[i].csv_row_separator = arrData[i].tableData[j].row_separator
                                    arrData[i].csv_database_separatorr = arrData[i].tableData[j].database_separatorr
                                    arrData[i].csv_database_code = arrData[i].tableData[j].database_code
                                    arrData[i].csv_ded_id = arrData[i].tableData[j].ded_id
                                    arrData[i].dbfile_format.push('CSV')
                                } else if (this.getExtractDataTypeFun(arrData[i].tableData[j].dbfile_format) == 'SEQUENCEFILE') {
                                    arrData[i].seq = true
                                    arrData[i].seq_ml = arrData[i].tableData[j].plane_url
                                    arrData[i].seq_row_separator = arrData[i].tableData[j].row_separator
                                    arrData[i].seq_database_separatorr = arrData[i].tableData[j].database_separatorr
                                    arrData[i].seq_database_code = arrData[i].tableData[j].database_code
                                    arrData[i].seq_ded_id = arrData[i].tableData[j].ded_id
                                    arrData[i].dbfile_format.push('SEQUENCEFILE')
                                } else if (this.getExtractDataTypeFun(arrData[i].tableData[j].dbfile_format) == 'PARQUET') {
                                    arrData[i].par = true
                                    arrData[i].par_ml = arrData[i].tableData[j].plane_url
                                    arrData[i].par_row_separator = arrData[i].tableData[j].row_separator
                                    arrData[i].par_database_separatorr = arrData[i].tableData[j].database_separatorr
                                    arrData[i].par_database_code = arrData[i].tableData[j].database_code
                                    arrData[i].par_ded_id = arrData[i].tableData[j].ded_id
                                    arrData[i].dbfile_format.push('PARQUET')
                                }
                            }
                        }
                        this.ruleForm.unloadingFileData = arrData;
                    }
                }
            });
        },
        //抽取数据存储方式遍历得到中文名
        getExtractDataTypeFun(code) {
            for (let i = 0; i < this.ExtractDataType.length; i++) {
                if (this.ExtractDataType[i].code == code) {
                    return this.ExtractDataType[i].value
                }
            }
        },
        //抽取数据存储方式遍历得到code值
        getExtractDataTypecodeFun(value) {
            for (let i = 0; i < this.ExtractDataType.length; i++) {
                if (this.ExtractDataType[i].value == value) {
                    return this.ExtractDataType[i].code
                }
            }
        },
        //全表设置提交
        AllTable_SeparatorSubmitFun(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.dialogAllTableSeparatorSettings = false;
                    let data = this.separatorData;
                    let alldata = this.ruleForm.unloadingFileData;
                    for (var i = 0; i < alldata.length; i++) {
                        for (let m = 0; m < alldata[i].dbfile_format.length; m++) {
                            if (alldata[i].dbfile_format[m] == this.separatorData.Extractformat) {
                                alldata[i].dbfile_format.splice(m, 1)
                                break
                            }
                        }
                        alldata[i].dbfile_format.push(this.separatorData.Extractformat)
                        if (this.separatorData.Extractformat == '定长') {
                            alldata[i].dc = true

                            // this.$set(alldata[i], 'dbfile_format', [this.separatorData.Extractformat]) //抽取方式
                            this.$set(alldata[i], 'dc_database_code', this.separatorData.Datacharacterset) //字符集
                            this.$set(alldata[i], 'dc_database_separatorr', this.separatorData.Datacolumnseparator) //数据列分隔符
                            this.$set(alldata[i], 'dc_row_separator', this.separatorData.Newlinecharacte) //换行符
                            this.$set(alldata[i], 'dc_ml', this.separatorData.ml) //目录
                        } else if (this.separatorData.Extractformat == '非定长') {
                            alldata[i].fdc = true
                            // this.$set(alldata[i], 'dbfile_format', [this.separatorData.Extractformat]) //抽取方式
                            this.$set(alldata[i], 'fdc_database_code', this.separatorData.Datacharacterset) //字符集
                            this.$set(alldata[i], 'fdc_database_separatorr', this.separatorData.Datacolumnseparator) //数据列分隔符
                            this.$set(alldata[i], 'fdc_row_separator', this.separatorData.Newlinecharacte) //换行符
                            this.$set(alldata[i], 'fdc_ml', this.separatorData.ml) //目录
                        } else if (this.separatorData.Extractformat == 'ORC') {
                            alldata[i].orc = true
                            this.$set(alldata[i], 'orc_ml', this.separatorData.ml) //目录
                            this.$set(alldata[i], 'orc_database_code', this.separatorData.Datacharacterset) //字符集
                            alldata[i].orc_database_separatorr = this.separatorData.Datacolumnseparator //数据列分隔符
                            alldata[i].orc_row_separator = this.separatorData.Newlinecharacte //换行符
                        } else if (this.separatorData.Extractformat == 'SEQUENCEFILE') {
                            alldata[i].seq = true
                            this.$set(alldata[i], 'seq_ml', this.separatorData.ml) //目录
                            this.$set(alldata[i], 'seq_database_code', this.separatorData.Datacharacterset) //字符集
                            alldata[i].seq_database_separatorr = this.separatorData.Datacolumnseparator //数据列分隔符
                            alldata[i].seq_row_separator = this.separatorData.Newlinecharacte //换行符
                        } else if (this.separatorData.Extractformat == 'CSV') {
                            alldata[i].csv = true
                            this.$set(alldata[i], 'csv_ml', this.separatorData.ml) //目录
                            this.$set(alldata[i], 'csv_database_code', this.separatorData.Datacharacterset) //字符集
                            this.$set(alldata[i], 'csv_row_separator', this.separatorData.Newlinecharacte) //换行符
                            alldata[i].csv_database_separatorr = this.separatorData.Datacolumnseparator //数据列分隔符
                        } else if (this.separatorData.Extractformat == 'PARQUET') {
                            alldata[i].par = true
                            this.$set(alldata[i], 'par_ml', this.separatorData.ml) //目录
                            this.$set(alldata[i], 'par_database_code', this.separatorData.Datacharacterset) //字符集
                            alldata[i].par_database_separatorr = this.separatorData.Datacolumnseparator //数据列分隔符
                            alldata[i].par_row_separator = this.separatorData.Newlinecharacte //换行符
                        }
                    }
                    this.separatorData = {
                        ml: "",
                        Extractformat: "",
                        Newlinecharacte: "",
                        Datacolumnseparator: "",
                        Datacharacterset: ""
                    };
                } else {
                    this.dialogAllTableSeparatorSettings = true;
                    return false;
                }
            });
        },
        //全表关闭
        AllTable_SeparatorCloseFun() {
            this.dialogAllTableSeparatorSettings = false;
            this.separatorData = {
                isExtraction: "1",
                Extractformat: "",
                Newlinecharacte: "",
                Datacolumnseparator: "",
                Datacharacterset: ""
            };
        },
        //全表打开
        AllTable_SeparatorFun() {
            this.dialogAllTableSeparatorSettings = true;
        },
        // 选项改变时
        IsExChangeDataFun(row) {
            row.fdc = false
            row.dc = false
            row.orc = false
            row.seq = false
            row.par = false
            row.csv = false
            this.arrData = row
            for (let i = 0; i < row.dbfile_format.length; i++) {
                if (row.dbfile_format[i] == '非定长') {
                    row.fdc = true
                } else if (row.dbfile_format[i] == '定长') {
                    row.dc = true
                } else if (row.dbfile_format[i] == 'ORC') {
                    row.orc = true
                } else if (row.dbfile_format[i] == 'SEQUENCEFILE') {
                    row.seq = true
                } else if (row.dbfile_format[i] == 'PARQUET') {
                    row.par = true
                } else if (row.dbfile_format[i] == 'CSV') {
                    row.csv = true
                }
            }

            row.row_separator = "";
            row.database_separatorr = "";
        },
        exchangeFun() {
            this.separatorData.newlineCharacter = "";
            this.separatorData.dataColumnSeparator = "";
        },
        removeTag(key) {
            if (key == '非定长') {
                delete this.arrData.fdc_database_code
                delete this.arrData.fdc_database_separatorr
                delete this.arrData.fdc_row_separator
                delete this.arrData.fdc_ml
            } else if (key == '定长') {
                delete this.arrData.dc_database_code
                delete this.arrData.dc_database_separatorr
                delete this.arrData.dc_row_separator
                delete this.arrData.dc_ml
            } else if (key == 'CSV') {
                delete this.arrData.csv_database_code
                delete this.arrData.csv_database_separatorr
                delete this.arrData.csv_row_separator
                delete this.arrData.csv_ml
            } else if (key == 'SEQUENCEFILE') {
                delete this.arrData.seq_database_code
                delete this.arrData.seq_database_separatorr
                delete this.arrData.seq_row_separator
                delete this.arrData.seq_ml
            } else if (key == 'PARQUET') {
                delete this.arrData.par_database_code
                delete this.arrData.par_database_separatorr
                delete this.arrData.par_row_separator
                delete this.arrData.par_ml
            } else if (key == 'ORC') {
                delete this.arrData.orc_database_code
                delete this.arrData.orc_database_separatorr
                delete this.arrData.orc_row_separator
                delete this.arrData.orc_ml
            }
        },
        // 获取目录结构
        seletFilePath(id, name) {
            this.dialogSelectfolder = true;
            this.row_ml = id
            this.row_ml_name = name
            let arry = [],
                path = '';
            addTaskAllFun
                .selectPath({
                    agent_id: this.$route.query.agent_id,
                    path: path
                })
                .then(res => {
                    if (res.data && res.data.length > 0) {
                        for (let i = 0; i < res.data.length; i++) {
                            if (res.data[i].isFolder == 'true') {
                                res.data[i].children = [{}]
                            }
                        }
                        this.data2 = res.data;
                    } else {
                        this.treenloadingInfo = '暂无数据'
                    }

                });
        },
        //获取选中状态下的数据
        handleCheckChange(data, checked, node) {
            if (checked === true) {
                this.checkedId = data.name;
                this.path = data.path
                this.$refs.tree.setCheckedKeys([data.name]);
            } else {
                if (this.checkedId == data.name) {
                    this.$refs.tree.setCheckedKeys([data.name]);
                }
            }
        },
        loadNode(node, resolve) {
            if (node.level > 0) {
                let path = node.data.path,
                    id = this.$route.query.agent_id;
                setTimeout(() => {
                    addTaskAllFun
                        .selectPath({
                            agent_id: id,
                            path: path
                        })
                        .then(res => {
                            for (let i = 0; i < res.data.length; i++) {
                                if (res.data[i].isFolder == 'true') {
                                    res.data[i].children = [{}]
                                }
                            }
                            resolve(res.data);
                        });

                }, 500);
            }

        },
        pathSubmit() {
            let id = this.row_ml,
                path = this.path
            if (this.row_ml_name == 'fdc') {
                this.ruleForm.unloadingFileData.forEach((item) => {
                    if (item.table_id == id) {
                        this.$set(item, 'fdc_ml', path)
                    }
                })
            } else if (this.row_ml_name == 'dc') {
                this.ruleForm.unloadingFileData.forEach((item) => {
                    if (item.table_id == id) {
                        this.$set(item, 'dc_ml', path)

                    }
                })
            } else if (this.row_ml_name == 'csv') {
                this.ruleForm.unloadingFileData.forEach((item) => {
                    if (item.table_id == id) {
                        this.$set(item, 'csv_ml', path)

                    }
                })
            } else if (this.row_ml_name == 'seq') {
                this.ruleForm.unloadingFileData.forEach((item) => {
                    if (item.table_id == id) {
                        this.$set(item, 'seq_ml', path)

                    }
                })
            } else if (this.row_ml_name == 'par') {
                this.ruleForm.unloadingFileData.forEach((item) => {
                    if (item.table_id == id) {
                        this.$set(item, 'par_ml', path)
                    }
                })
            } else if (this.row_ml_name == 'orc') {
                this.ruleForm.unloadingFileData.forEach((item) => {
                    if (item.table_id == id) {
                        this.$set(item, 'orc_ml', path)
                    }
                })
            } else if (this.row_ml_name == 'all') {
                this.$set(this.separatorData, 'ml', path)
            }
        },

    }
};
</script>

<style scoped>
.alltables {
    float: right;
    margin: 4px 2px;
}

.locationcenter {
    text-align: center;
    margin-top: 5px;
}

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

.allclickColor {
    color: #fff;
    font-weight: bold;
}

.locationcenter {
    text-align: center;
    margin-top: 5px;
}

#steps4>>>.el-icon-question:before {
    content: "" !important;
}

#steps4>>>.el-icon-question:after {
    content: "\E7A4" !important;
    margin-left: 10px;
}

.steps4>>>.el-form-item {
    margin-bottom: 0 !important;
}

.steps4>>>.el-form-item__error {
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

.steps4>>>.el-form-item__content::before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
    display: inline-block;
    position: absolute;
    left: -8px;
}

.steps4>>>tr>td {
    padding: 0;
}

.steps4>>>.el-input-group__prepend {
    color: #FFF !important;
    background-color: #E6A23C !important;
    border-color: #E6A23C !important;
}

.steps4>>>tr>td>.cell {
    padding: 6px 10px;
}

.fdcColor>>>.el-input__inner {
    color: #f19b00;
}

.dcColor>>>.el-input__inner {
    color: #6abacc;
}

/* .exDataColor{
    color: #e6a23c;
} */
</style>
