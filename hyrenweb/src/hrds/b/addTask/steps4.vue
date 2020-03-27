<template>
<div id="steps4">
    <Step :active="active"></Step>
    <div class="cleanbtn">
        <el-button size="mini" type="success" @click="AllTable_SeparatorFun()" class="alltables">所有表分隔符设置</el-button>
    </div>
    <el-form ref="ruleForm" :model="ruleForm" class="steps4">
        <el-table :header-cell-style="{background:'#e6e0e0'}" ref="filterTable" stripe :empty-text="tableloadingInfo" :default-sort="{prop: 'date', order: 'descending'}" style="width: 100%" size="medium" border :data="ruleForm.unloadingFileData.slice((unloadingcurrentPage - 1) * unloadingpagesize, unloadingcurrentPage *unloadingpagesize)">
            <el-table-column label="序号" align="center" width="60">
                <template scope="scope">
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
                            <el-option size="medium" v-for="(item,index) in ExtractDataType" :key="index" :label="item.value" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column label="落地目录" align="center" width="260">
                <template scope="scope">
                    <el-input v-show="scope.row.fdc" v-model="scope.row.fdc_ml" disabled placeholder="非定长落地目录" size="mini" style="margin-bottom: 8px;">
                        <template slot="prepend">
                            <el-button size="mini" @click="dialogSelectfolder = true;seletFilePath()">选择目录<span class='exDataColor'>(非定长)</span></el-button>
                        </template>
                    </el-input>
                    <el-input v-show="scope.row.dc" v-model="scope.row.dc_ml" disabled placeholder="定长落地目录" size="mini" style="margin-bottom: 8px;">
                        <template slot="prepend">
                            <el-button size="mini" @click="dialogSelectfolder = true;">选择目录<span class='exDataColor'>(定长)</span></el-button>
                        </template>
                    </el-input>
                    <el-input v-show="scope.row.orc" v-model="scope.row.orc_ml" disabled placeholder="ORC落地目录" size="mini" style="margin-bottom: 8px;">
                        <template slot="prepend">
                            <el-button size="mini" @click="dialogSelectfolder = true;">选择目录<span class='exDataColor'>(ORC)</span></el-button>
                        </template>
                    </el-input>
                    <el-input v-show="scope.row.par" v-model="scope.row.par_ml" disabled placeholder="PAR落地目录" size="mini" style="margin-bottom: 8px;">
                        <template slot="prepend">
                            <el-button size="mini" @click="dialogSelectfolder = true;">选择目录<span class='exDataColor'>(PAR)</span></el-button>
                        </template>
                    </el-input>
                    <el-input v-show="scope.row.csv" v-model="scope.row.csv_ml" disabled placeholder="CSV落地目录" size="mini" style="margin-bottom: 8px;">
                        <template slot="prepend">
                            <el-button size="mini" @click="dialogSelectfolder = true;">选择目录<span class='exDataColor'>(CSV)</span></el-button>
                        </template>
                    </el-input>
                    <el-input v-show="scope.row.seq" v-model="scope.row.seq_ml" disabled placeholder="SEQ落地目录" size="mini" style="margin-bottom: 8px;">
                        <template slot="prepend">
                            <el-button size="mini" @click="dialogSelectfolder = true;">选择目录<span class='exDataColor'>(SEQ)</span></el-button>
                        </template>
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column label=" 换行符" align="center">
                <template slot-scope="scope">
                    <el-form-item v-show="scope.row.fdc" :prop="'unloadingFileData.'+scope.$index+'.row_separator'" :rules="rule.selected">
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
                    <el-select v-show="scope.row.csv" placeholder="CSV换行符" v-model="scope.row.csv_row_separator" style="margin-bottom: 8px;" size="mini">
                        <el-option size="medium" v-for="(item,index) in newlineCharacter" :key="index" :label="item.value" :value="item.value">{{item.title}}</el-option>
                    </el-select>
                    <el-select v-show="scope.row.seq" disabled placeholder="SEQ换行符" v-model="scope.row.seq_row_separator" style="margin-bottom: 8px;" size="mini">
                        <el-option size="medium" v-for="(item,index) in newlineCharacter" :key="index" :label="item.value" :value="item.value">{{item.title}}</el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label align="center">
                <template slot="header">
                    <el-tooltip class="item" effect="light" content placement="right">
                        <div slot="content">
                            多行信息
                            <br />第二行信息
                        </div>
                        <i class="el-icon-question" aria-hidden="true">数据列分隔符</i>
                    </el-tooltip>
                </template>
                <template scope="scope">
                    <el-form-item v-show="scope.row.fdc" :prop="'unloadingFileData.'+scope.$index+'.fdc_database_separatorr'" :rules="rule.default">
                        <el-input size="mini" v-model="scope.row.fdc_database_separatorr" style="margin-bottom: 8px;" placeholder="非定长数据列分隔符"></el-input>
                    </el-form-item>
                    <el-input v-show="scope.row.dc" size="mini" v-model="scope.row.dc_database_separatorr" style="margin-bottom: 8px;" placeholder="定长数据列分隔符"></el-input>
                    <el-input v-show="scope.row.orc" disabled size="mini" v-model="scope.row.orc_database_separatorr" style="margin-bottom: 8px;" placeholder="ORC数据列分隔符"></el-input>
                    <el-input v-show="scope.row.par" disabled size="mini" v-model="scope.row.par_database_separatorr" style="margin-bottom: 8px;" placeholder="PAR数据列分隔符"></el-input>
                    <el-input v-show="scope.row.csv" size="mini" v-model="scope.row.csv_database_separatorr" style="margin-bottom: 8px;" placeholder="CSV数据列分隔符"></el-input>
                    <el-input v-show="scope.row.seq" disabled size="mini" v-model="scope.row.seq_database_separatorr" style="margin-bottom: 8px;" placeholder="SEQ数据列分隔符"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="数据字符集" align="center">
                <template scope="scope">
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
    <el-pagination @size-change="unloading_handleSizeChange" @current-change="unloading_handleCurrentChange" :current-page="unloadingcurrentPage" :page-sizes="[100, 200, 300, 400]" :page-size="unloadingpagesize" layout="total, sizes, prev, pager, next, jumper" :total="ruleForm.unloadingFileData.length" class="locationcenter"></el-pagination>
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
                        <el-button size="mini">选择目录</el-button>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="换行符" key="1" v-if="separatorData.Extractformat=='非定长'" prop="Newlinecharacte" :rules="rule.selected">
                <el-select placeholder="换行符" v-model="separatorData.Newlinecharacte" style="width: 190px;" size="medium" :disabled="separatorData.Extractformat=='ORC'||separatorData.Extractformat=='PARQUET'||separatorData.Extractformat=='SEQUENCEFILE'">
                    <el-option v-for="(item,index) in newlineCharacter" :key="index" :label="item.value" :value="item.value">{{item.title}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="换行符" key="2" v-else>
                <el-select placeholder="换行符" v-model="separatorData.Newlinecharacte" style="width: 190px;" size="medium" :disabled="separatorData.Extractformat=='ORC'||separatorData.Extractformat=='PARQUET'||separatorData.Extractformat=='SEQUENCEFILE'">
                    <el-option v-for="(item,index) in newlineCharacter" :key="index" :label="item.value" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="数据列分隔符" v-if="separatorData.Extractformat=='非定长'" key="3" prop="Datacolumnseparator" :rules="rule.default">
                <el-input :disabled="separatorData.Extractformat=='ORC'||separatorData.Extractformat=='PARQUET'||separatorData.Extractformat=='SEQUENCEFILE'" v-model="separatorData.Datacolumnseparator" placeholder="数据列分隔符" style="width:190px" size="medium"></el-input>
            </el-form-item>
            <el-form-item label="数据列分隔符" key="4" v-else>
                <el-input :disabled="separatorData.Extractformat=='ORC'||separatorData.Extractformat=='PARQUET'||separatorData.Extractformat=='SEQUENCEFILE'" v-model="separatorData.Datacolumnseparator" placeholder="数据列分隔符" style="width:190px" size="medium"></el-input>
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
    <el-button type="primary" size="medium" class="leftbtn" @click="pre()">上一步</el-button>
    <el-button type="primary" size="medium" class="rightbtn" @click="next('ruleForm')">下一步</el-button>
    <!-- 抽取数据存储方式弹框 -->
    <!--    <el-dialog title="数据存储方式" :visible.sync="dialogDatasaveType" width="80%" class="alltable">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">数据存储方式</span>
        </div>
        <el-form ref="ruleForm" :model="ruleForm" class="steps4">
            <el-table :header-cell-style="{background:'#e6e0e0'}" ref="filterTable" stripe style="width: 100%" size="medium" border :data='ruleForm.dataSaveFileData'>
                <el-table-column width="55" align="center" type="selection" :reserve-selection="true">
                </el-table-column>
                <el-table-column label="序号" align="center" type="index" width="60">
                </el-table-column>
                <el-table-column label=" 抽取数据存储方式" align="center" prop="dbfile_format">
                </el-table-column>
                <el-table-column label=" 换行符" align="center">
                    <template slot-scope="scope">
                        <el-form-item v-if="scope.row.dbfile_format=='非定长'" :prop="'dataSaveFileData.'+scope.$index+'.row_separator'" :rules="rule.selected">
                            <el-select placeholder="换行符" v-model="scope.row.row_separator" style="width:150px" size="medium" :disabled="scope.row.dbfile_format=='ORC'||scope.row.dbfile_format=='PARQUET'||scope.row.dbfile_format=='SEQUENCEFILE'">
                                <el-option size="medium" v-for="(item,index) in newlineCharacter" :key="index" :label="item.value" :value="item.value">{{item.title}}</el-option>
                            </el-select>
                        </el-form-item>
                        <el-select v-else placeholder="换行符" v-model="scope.row.row_separator" style="width:150px" size="medium" :disabled="scope.row.dbfile_format=='ORC'||scope.row.dbfile_format=='PARQUET'||scope.row.dbfile_format=='SEQUENCEFILE'">
                            <el-option size="medium" v-for="(item,index) in newlineCharacter" :key="index" :label="item.value" :value="item.value">{{item.title}}</el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label align="center">
                    <template slot="header">
                        <el-tooltip class="item" effect="light" content placement="right">
                            <div slot="content">
                                多行信息
                                <br />第二行信息
                            </div>
                            <i class="el-icon-question" aria-hidden="true">数据列分隔符</i>
                        </el-tooltip>
                    </template>
                    <template scope="scope">
                        <el-form-item v-if="scope.row.dbfile_format=='非定长'" :prop="'dataSaveFileData.'+scope.$index+'.database_separatorr'" :rules="rule.default">
                            <el-input :disabled="scope.row.dbfile_format=='ORC'||scope.row.dbfile_format=='PARQUET'||scope.row.dbfile_format=='SEQUENCEFILE'" size="medium" v-model="scope.row.database_separatorr" style="width:150px" placeholder="数据列分隔符"></el-input>
                        </el-form-item>
                        <el-input v-else :disabled="scope.row.dbfile_format=='ORC'||scope.row.dbfile_format=='PARQUET'||scope.row.dbfile_format=='SEQUENCEFILE'" size="medium" v-model="scope.row.database_separatorr" style="width:150px" placeholder="数据列分隔符"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="数据字符集" align="center">
                    <template scope="scope">
                        <el-select placeholder="数据字符集" v-model="scope.row.database_code" style="width:150px" size="medium">
                            <el-option v-for="(item,index) in DataBaseCode" :key="index" :label="item.value" :value="item.code"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="是否有表头" align="center">
                    <template scope="scope">
                        <el-checkbox v-if="scope.row.dbfile_format=='CSV'" v-model="scope.row.istable" :checked="scope.row.istableS"></el-checkbox>
                        <el-checkbox v-else disabled v-model="scope.row.istable" :checked="scope.row.istableS"></el-checkbox>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogDatasaveType=false" type="danger" size="mini">取 消</el-button>
            <el-button type="primary" @click="dialogDatasaveType=false" size="mini">确 定</el-button>
        </div>
    </el-dialog> -->
    <!-- 选择目录弹出框 -->
    <el-dialog title="选择目录" :visible.sync="dialogSelectfolder">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">选择目录</span>
        </div>
        <div class="mytree"  hight='200'>
            <el-tree ref='tree' :data="data2" show-checkbox node-key="name" :props="defaultProps" accordion :indent='0' @check-change="handleCheckChange" @node-expand='appendFun'>
                <span class="span-ellipsis" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
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
            rule: validator.default,
            dialogAllTableSeparatorSettings: false,
            unloadingcurrentPage: 1,
            unloadingpagesize: 100,
            ruleForm: {
                unloadingFileData: [],
                /*  dataSaveFileData: [{
                         dbfile_format: '定长',
                         row_separator: '',
                         database_separatorr: '',
                         database_code: '',
                         istable: ''
                     },
                     {
                         dbfile_format: '非定长',
                         row_separator: '',
                         database_separatorr: '',
                         database_code: '',
                         istable: ''
                     }, {
                         dbfile_format: 'ORC',
                         row_separator: '',
                         database_separatorr: '',
                         database_code: '',
                         istable: ''
                     },
                     {
                         dbfile_format: 'CSV',
                         row_separator: '',
                         database_separatorr: '',
                         database_code: '',
                         istable: ''
                     },
                     {
                         dbfile_format: 'PARQUET',
                         row_separator: '',
                         database_separatorr: '',
                         database_code: '',
                         istable: ''
                     },
                     {
                         dbfile_format: 'SEQUENCEFILT',
                         row_separator: '',
                         database_separatorr: '',
                         database_code: '',
                         istable: ''
                     }
                 ] */
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
                    title: "\\n  (windows换行符)"
                },
                {
                    value: "\\r",
                    code: "2",
                    title: "\\r  (Mac OS换行符)"
                },
                {
                    value: "\\r\\n",
                    code: "3",
                    title: "\\r\\n  (Linux、Unix换行符)"
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
            path: ''
        };
    },
    created() {
        this.dbid = this.$route.query.id;
        this.aId = this.$route.query.agent_id;
        this.sourId = this.$route.query.source_id;
        this.sName = this.$Base64.decode(this.$route.query.source_name);
    },
    mounted() {

        // 获取进入页面的总数据
        // if (this.$route.query.edit == "yes") {
        this.getInitInfo();
        // }
        // 抽取数据存储方式
        let params = {};
        params["category"] = "FileFormat";
        this.$Code.getCategoryItems(params).then(res => {
            if (res.data) {
                this.ExtractDataType = res.data;
                console.log(this.ExtractDataType)
            }
        });
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
        next(formName) {
            this.isLoading = true
            var a = this.ruleForm.unloadingFileData;
            console.log(this.ruleForm.unloadingFileData)
            /*  this.$refs[formName].validate(valid => {
                 if (valid) {
                     let dataAll = a;
                     for (var i = 0; i < dataAll.length; i++) {
                         delete dataAll[i].table_ch_name;
                         delete dataAll[i].table_name;
                         dataAll[i].row_separator = dataAll[i].row_separator
                             .split("(")[0]
                             .split(" ")
                             .join("");
                         if (dataAll[i].data_extract_type == true) {
                             for (var key in IsExtypeData1) {
                                 if (IsExtypeData1[key].value == dataAll[i].dbfile_format) {
                                     dataAll[i].dbfile_format = IsExtypeData1[key].code;
                                 }
                             }
                             dataAll[i].data_extract_type = "1";
                         } else {
                             for (var key in IsExtypeData2) {
                                 if (IsExtypeData2[key].value == dataAll[i].dbfile_format) {
                                     dataAll[i].dbfile_format = IsExtypeData2[key].code;
                                 }
                                 dataAll[i].data_extract_type = "2";
                             }
                         }
                     }
                     if (dataAll.length > 0) {
                         let params = {};
                         params["colSetId"] = this.databaseId;
                         params["extractionDefString"] = JSON.stringify(dataAll);
                         addTaskAllFun.saveFileConf(params).then(res => {
                             this.isLoading = false
                             this.getInitInfo();
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
                                     source_id: this.sourId,
                                     source_name: this.$Base64.encode(this.sName)
                                 };
                             }
                             this.$router.push({
                                 path: "/collection1_5",
                                 query: data
                             });
                         });
                     } else {
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
                                 source_id: this.sourId,
                                 source_name: this.$Base64.encode(this.sName)
                             };
                         }
                         this.isLoading = false
                         this.$router.push({
                             path: "/collection1_5",
                             query: data
                         });
                     }

                 } else {
                     return false;
                     this.isLoading = false
                 }
             }); */
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
                console.log(res)
                if (res) {
                    if (res.data.length == 0) {
                        this.tableloadingInfo = "暂无数据";
                    } else {
                        /*    for(let i=0;i<res.data.length;i++){
res.data[i].dbfile_format=['定长','1','3']
 console.log(res.data[i].dbfile_format[0])
                        } */
                        this.ruleForm.unloadingFileData = res.data;
                        console.log(this.ruleForm.unloadingFileData)
                    }
                }
            });
        },
        //全表设置提交
        AllTable_SeparatorSubmitFun(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.dialogAllTableSeparatorSettings = false;
                    let data = this.separatorData;
                    let alldata = this.ruleForm.unloadingFileData;
                    console.log(this.ruleForm.unloadingFileData, this.separatorData)
                    for (var i = 0; i < alldata.length; i++) {
                        alldata[i].dc = false
                        alldata[i].fdc = false
                        alldata[i].orc = false
                        alldata[i].seq = false
                        alldata[i].par = false
                        alldata[i].csv = false
                        alldata[i].dbfile_format = '' //抽取方式
                        alldata[i].dc_database_code = '' //字符集
                        alldata[i].dc_database_separatorr = '' //数据列分隔符
                        alldata[i].dc_row_separator = '' //换行符
                        alldata[i].dc_ml = this.separatorData.ml //目录
                        alldata[i].fdc_database_code = '' //字符集
                        alldata[i].fdc_database_separatorr = '' //数据列分隔符
                        alldata[i].fdc_row_separator = '' //换行符
                        alldata[i].fdc_ml = '' //目录
                        alldata[i].orc_database_code = '' //字符集
                        alldata[i].orc_database_separatorr = '' //数据列分隔符
                        alldata[i].orc_row_separator = '' //换行符
                        alldata[i].orc_ml = '' //目录
                        alldata[i].seq_database_code = '' //字符集
                        alldata[i].seq_database_separatorr = '' //数据列分隔符
                        alldata[i].seq_row_separator = '' //换行符
                        alldata[i].seq_ml = '' //目录
                        alldata[i].cvs_database_code = '' //字符集
                        alldata[i].cvs_database_separatorr = '' //数据列分隔符
                        alldata[i].cvs_row_separator = '' //换行符
                        alldata[i].cvs_ml = '' //目录
                        alldata[i].par_database_code = '' //字符集
                        alldata[i].par_database_separatorr = '' //数据列分隔符
                        alldata[i].par_row_separator = '' //换行符
                        alldata[i].par_ml = '' //目录
                        if (this.separatorData.Extractformat == '定长') {
                            alldata[i].dc = true
                            alldata[i].dbfile_format = [this.separatorData.Extractformat] //抽取方式
                            alldata[i].dc_database_code = this.separatorData.Datacharacterset //字符集
                            alldata[i].dc_database_separatorr = this.separatorData.Datacolumnseparator //数据列分隔符
                            alldata[i].dc_row_separator = this.separatorData.Newlinecharacte //换行符
                            alldata[i].dc_ml = this.separatorData.ml //目录
                        } else if (this.separatorData.Extractformat == '非定长') {
                            alldata[i].fdc = true
                            alldata[i].dbfile_format = [this.separatorData.Extractformat] //抽取方式
                            alldata[i].fdc_database_code = this.separatorData.Datacharacterset //字符集
                            alldata[i].fdc_database_separatorr = this.separatorData.Datacolumnseparator //数据列分隔符
                            alldata[i].fdc_row_separator = this.separatorData.Newlinecharacte //换行符
                            alldata[i].fdc_ml = this.separatorData.ml //目录
                        } else if (this.separatorData.Extractformat == 'ORC') {
                            alldata[i].orc = true
                            alldata[i].dbfile_format = [this.separatorData.Extractformat] //抽取方式
                            alldata[i].orc_database_code = this.separatorData.Datacharacterset //字符集
                            alldata[i].orc_database_separatorr = this.separatorData.Datacolumnseparator //数据列分隔符
                            alldata[i].orc_row_separator = this.separatorData.Newlinecharacte //换行符
                            alldata[i].orc_ml = this.separatorData.ml //目录
                        } else if (this.separatorData.Extractformat == 'SEQUENCEFILE') {
                            alldata[i].seq = true
                            alldata[i].dbfile_format = [this.separatorData.Extractformat] //抽取方式
                            alldata[i].seq_database_code = this.separatorData.Datacharacterset //字符集
                            alldata[i].seq_database_separatorr = this.separatorData.Datacolumnseparator //数据列分隔符
                            alldata[i].seq_row_separator = this.separatorData.Newlinecharacte //换行符
                            alldata[i].seq_ml = this.separatorData.ml //目录
                        } else if (this.separatorData.Extractformat == 'CVS') {
                            alldata[i].cvs = true
                            alldata[i].dbfile_format = [this.separatorData.Extractformat] //抽取方式
                            alldata[i].cvs_database_code = this.separatorData.Datacharacterset //字符集
                            alldata[i].cvs_database_separatorr = this.separatorData.Datacolumnseparator //数据列分隔符
                            alldata[i].cvs_row_separator = this.separatorData.Newlinecharacte //换行符
                            alldata[i].cvs_ml = this.separatorData.ml //目录
                        } else if (this.separatorData.Extractformat == 'PARQUET') {
                            alldata[i].par = true
                            alldata[i].dbfile_format = [this.separatorData.Extractformat] //抽取方式
                            alldata[i].par_database_code = this.separatorData.Datacharacterset //字符集
                            alldata[i].par_database_separatorr = this.separatorData.Datacolumnseparator //数据列分隔符
                            alldata[i].par_row_separator = this.separatorData.Newlinecharacte //换行符
                            alldata[i].par_ml = this.separatorData.ml //目录
                        }
                        console.log(alldata)
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
        /*   isexRadFun() {
              this.separatorData.Extractformat = "";
              this.separatorData.Newlinecharacte = "";
              this.separatorData.Datacolumnseparator = "";
          }, */

        removeTag(key) {
            if (key == '非定长') {
                this.arrData.fdc_database_code = ''
                this.arrData.fdc_database_separatorr = ''
                this.arrData.fdc_row_separator = ''
                this.arrData.fdc_ml = ''
            } else if (key == '定长') {
                this.arrData.dc_database_code = ''
                this.arrData.dc_database_separatorr = ''
                this.arrData.dc_row_separator = ''
                this.arrData.dc_ml = ''
            } else if (key == 'CSV') {
                this.arrData.csv_database_code = ''
                this.arrData.csv_database_separatorr = ''
                this.arrData.csv_row_separator = ''
                this.arrData.csv_ml = ''
            } else if (key == 'SEQUENCEFILE') {
                this.arrData.seq_database_code = ''
                this.arrData.seq_database_separatorr = ''
                this.arrData.seq_row_separator = ''
                this.arrData.seq_ml = ''
            } else if (key == 'PARQUET') {
                this.arrData.par_database_code = ''
                this.arrData.par_database_separatorr = ''
                this.arrData.par_row_separator = ''
                this.arrData.par_ml = ''
            } else if (key == 'ORC') {
                this.arrData.orc_database_code = ''
                this.arrData.orc_database_separatorr = ''
                this.arrData.orc_row_separator = ''
                this.arrData.orc_ml = ''
            }
        },
        // 获取目录结构
        seletFilePath(data) {
            let arry = [];
            let path;
            if (typeof (data) != "undefined") {
                path = data.path;
            }
            addTaskAllFun
                .selectPath({
                    agent_id: this.$route.query.agent_id,
                    path: path
                })
                .then(res => {
                    if (typeof (data) == 'undefined') {
                        for (let i = 0; i < res.data.length; i++) {
                            if (res.data[i].isFolder == 'true') {
                                res.data[i].children = [{}]
                            }
                        }
                        this.data2 = res.data;
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
        appendFun(data, b, c) {
            console.log(data, b, c)
            addTaskAllFun
                .selectPath({
                    agent_id: this.$route.query.agent_id,
                    path: data.path
                })
                .then(res => {
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].isFolder == 'true') {
                            res.data[i].children = [{}]
                        }
                    }
                    data.children = res.data
                    console.log(res.data)
                });
        },
        pathSubmit() {
            console.log(this.path)
        }
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
