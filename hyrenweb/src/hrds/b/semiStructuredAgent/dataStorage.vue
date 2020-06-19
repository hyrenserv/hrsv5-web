<template>
<div>
     <el-row class="partOne">
        <el-col :span="24">
            <Step :active="active"></Step>
        </el-col>
    </el-row>
    <div class="cleanbtn">
        <el-button size="mini" type="success" @click="AllSettingDestinationFun()">所有表目的地设置</el-button>
    </div>
    <el-form ref="ruleForm" :model="ruleForm" class="steps5">
        <el-table :header-cell-style="{background:'#e6e0e0'}" ref="filterTable" stripe :default-sort="{prop: 'date', order: 'descending'}" style="width: 100%" size="medium" border :data="ruleForm.ex_destinationData.slice((ex_destinationcurrentPage - 1) * ex_destinationpagesize, ex_destinationcurrentPage *ex_destinationpagesize)">
            <el-table-column label="序号" align="center" width="60">
                <template scope="scope">
                    <span>{{scope.$index+(ex_destinationcurrentPage - 1) * ex_destinationpagesize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column label="表名" prop="table_name"  align="center" :show-overflow-tooltip="true">
                <!--  <template slot-scope="scope">
                    <el-form-item :prop="'ex_destinationData.'+scope.$index+'.table_name'" :rules="rule.default" >
                        <el-input size="medium" v-model="scope.row.table_name" style="width:160px" readonly></el-input>
                    </el-form-item>
                </template> -->
            </el-table-column>
            <el-table-column label="表中文名"  align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <el-form-item :prop="'ex_destinationData.'+scope.$index+'.table_ch_name'" :rules="rule.default">
                        <el-input size="medium" v-model="scope.row.table_ch_name" style="width:160px"></el-input>
                    </el-form-item>
                </template>
            </el-table-column>
            <el-table-column label=" 选择目的地" width="190" align="center">
                <template slot="header">
                    <el-tooltip class="item" effect="light" content placement="right">
                        <div slot="content">请至少选择一个目的地,当选择的目的地是oracle时,落地表名长度不能大于27</div>
                        <i class="el-icon-question" aria-hidden="true">选择目的地</i>
                    </el-tooltip>
                </template>
                <template slot-scope="scope">
                    <span class="settingbtn" v-if="scope.row.data_extract_type!='1'">
                        <el-button type="success" size="mini" v-if="scope.row.table_setting==true" @click="ChooseDestination(scope.row,scope.$index)">已选择</el-button>
                        <el-button type="warning" size="mini" v-else @click="ChooseDestination(scope.row,scope.$index)">未选择</el-button>
                    </span>
                </template>
            </el-table-column>
            <!-- <el-table-column label=" 是否拉链存储" align="center">
                <template slot="header">
                    <el-checkbox @change="Allis_zipperFun(ruleForm.ex_destinationData,Allis_zippercheck)" v-model="Allis_zippercheck" :checked="Allis_zippercheck">
                        <span class="allclickColor">是否拉链存储</span>
                    </el-checkbox>
                </template>
                <template slot-scope="scope">
                    <el-checkbox :checked="scope.row.is_zipper" v-model="scope.row.is_zipper" v-if="scope.row.data_extract_type!='1'" @change="is_zipperFun(scope.row)"></el-checkbox>
                </template>
            </el-table-column> -->
            <!-- <el-table-column label=" 存储方式" align="center">
                <template slot="header">
                    <el-checkbox v-if="Allis_zippercheck==false" disabled>
                        <span class="allclickColor">存储方式</span>
                    </el-checkbox>
                    <el-popover v-else placement="right" width="120" height="50" v-model="visible">
                        <el-select placeholder="存储方式" v-model="allstoragetype" style="width:140px" size="mini">
                            <el-option v-for="(item,index) in StorageType" :key="index" :label="item.value" :value="item.code"></el-option>
                        </el-select>
                        <div style="text-align: right; margin:30px 0 5px 0">
                            <el-button size="mini" type="text" @click="allStorageModeCloseFun()">取消</el-button>
                            <el-button type="primary" size="mini" @click="allStorageModeFun()">确定</el-button>
                        </div>
                        <el-checkbox slot="reference" @change="allcunchuFun(allcunchu)" :checked="allcunchu" v-model="allcunchu">
                            <span class="allclickColor">存储方式</span>
                        </el-checkbox>
                    </el-popover>
                </template>
                <template slot-scope="scope">
                    <div v-if="scope.row.data_extract_typ!=='1'">
                        <el-select placeholder="存储方式" v-model="scope.row.storage_type" size="medium" v-if="scope.row.is_zipper==false" disabled>
                            <el-option v-for="(item,index) in StorageType" :key="index" :label="item.value" :value="item.code"></el-option>
                        </el-select>
                        <el-form-item v-else :prop="'ex_destinationData.'+scope.$index+'.storage_type'" :rules="rule.selected">
                            <el-select placeholder="存储方式" v-model="scope.row.storage_type" size="medium"> -->
                                <!-- StorageType -->
                                <!-- <el-option v-for="(item,index) in StorageType" :key="index" :label="item.value" :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                </template>
            </el-table-column> -->
            <!-- <el-table-column label=" 数据保留天数" align="center">
                <template slot="header">
                    <el-popover placement="right" width="100" height="50" v-model="saveDayvisible">
                        <div class="alldays">
                            <el-input size="medium" v-model="allSaveDay" style="width:66px"></el-input>
                            <span style="margin-left: 10px;">天</span>
                        </div>
                        <div style="text-align: right; margin:10px">
                            <el-button size="mini" type="danger" @click="allsaveDayCloseFun()">取消</el-button>
                            <el-button type="primary" size="mini" @click="allsaveDaySubmitFun()">确定</el-button>
                        </div>
                        <el-checkbox slot="reference" @change="allsaveDayFun(allSaveDayActive)" :checked="allSaveDayActive" v-model="allSaveDayActive">
                            <span class="allclickColor">数据保留天数(/天)</span>
                        </el-checkbox>
                    </el-popover>
                </template>
                <template slot-scope="scope">
                    <el-form-item :prop="'ex_destinationData.'+scope.$index+'.storage_time'" :rules="rule.default" v-if="scope.row.data_extract_type!='1'">
                        <el-input size="medium" v-model="scope.row.storage_time"></el-input>
                    </el-form-item>
                </template>
            </el-table-column> -->
        </el-table>
    </el-form>
    <el-pagination @size-change="ex_destination_handleSizeChange" @current-change="ex_destination_handleCurrentChange" :current-page="ex_destinationcurrentPage" :page-sizes="[100, 200, 300, 400]" :page-size="ex_destinationpagesize" layout="total, sizes, prev, pager, next, jumper" :total="ruleForm.ex_destinationData.length" class="locationcenter"></el-pagination>
    <el-row>
        <el-col :span="12">
            <el-button type="primary" size="medium" class="leftbtn" @click="backFun()">返回</el-button>
        </el-col>
        <el-col :span="12">
            <el-button type="primary" size="medium" class='rightbtn' @click="next('ruleForm')">下一步</el-button>
            <el-button type="primary" size="medium" class='rightbtn' @click="pre()">上一步</el-button>
        </el-col>
    </el-row>
    <!-- 选择目的地弹框 -->
    <el-dialog title=" 选择目的地" :visible.sync="dialogChooseDestination" width="70%" class="alltable">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">选择目的地</span>
        </div>
        <el-form ref="digForm" :model="digForm" label-width="20%">
            <!-- <el-row>
                <el-col :span="12">
                    <el-form-item label="落地表名:" prop="hyren_name" :rules="filter_rules([{required: true,dataType:'compositions'}])">
                        <el-input placeholder="表名" v-model="digForm.hyren_name" size="mini">
                            <template slot="prepend">{{datasource_number}}_{{classify_num}}_</template></el-input>
                    </el-form-item>
                </el-col>
            </el-row> -->
        </el-form>
        <el-table stripe :data="destinationData.slice((destination_currentPage - 1) * destination_pagesize, destination_currentPage * destination_pagesize)" border size="medium" highlight-current-row ref="multipleTable" tooltip-effect="dark" :row-key="getRowKeys">
            <el-table-column width="55" align="center" prop="selectionState">
                <template slot="header" slot-scope="scope">
                    <el-checkbox @change="Allis_destinationFun(destinationData,Allis_destination)" v-model="Allis_destination" :checked="Allis_destination"></el-checkbox>
                </template>
                <template slot-scope="scope">
                    <el-checkbox :checked="scope.row.usedflag" v-model="scope.row.usedflag" @change="destination_evercheck(scope.row.usedflag,scope.row.dsl_name)"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="序号" align="center" width="60">
                <template slot-scope="scope">
                    <span>{{scope.$index+(destination_currentPage - 1) * destination_pagesize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column property="dsl_name" label="存储名称" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column property="store_type" label="存储类型" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="详情" width="160px" align="center">
                <template slot-scope="scope">
                    <el-row>
                        <el-col :span="24" class="delbtn">
                            <el-button size="medium" type="text" circle @click="getStoDestDetailFun(scope.row)">查看详情</el-button>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column prop="selectCol" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="success" @click="getColumnStoInfoFun(scope.row)">配置字段属性</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="destination_handleSizeChange" @current-change="destination_handleCurrentChange" :current-page.sync="destination_currentPage" :page-size="destination_pagesize" layout="total, prev, pager, next" :total="destinationData.length" class="locationcenter"></el-pagination>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogChooseDestination = false" type="danger" size="mini">取 消</el-button>
            <el-button type="primary" @click="ChooseDestinationSubmitFun('digForm')" size="mini">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 查看详情 -->
    <el-dialog title=" 查看详情" :visible.sync="dialogViewDetails" width="60%" class="alltable">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">查看详情</span>
        </div>
        <table v-if="viewDatilsData==''" class="mailTable" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td class="nocontent">暂无信息</td>
            </tr>
        </table>
        <table v-else class="mailTable" border="0" cellspacing="0" cellpadding="0">
            <tr v-for="(item,index) in viewDatilsData" :key="index">
                <td>{{item.storage_property_key}}：</td>
                <td>
                    <p>{{item.storage_property_val}}</p>
                </td>
            </tr>
        </table>
    </el-dialog>
    <!-- 配置字段属性 -->
    <el-dialog :visible.sync="dialogFieldProperty" width="80%" class="alltable">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">配置字段属性(根据目的地选择字段存储)</span>
        </div>
        <!--   <el-button
        type="success"
        size="mini"
        width="20"
        @click="FieldProperty_addRow(FieldProperty)"
        class="addline"
      >新增行</el-button>-->
        <el-table stripe :data="FieldProperty.slice((fieldProperty_currentPage - 1) * fieldProperty_pagesize, fieldProperty_currentPage * fieldProperty_pagesize)" border size="medium" highlight-current-row>
            <el-table-column label="序号" width="60px" align="center">
                <template scope="scope">
                    <span>{{scope.$index+(fieldProperty_currentPage - 1) * fieldProperty_pagesize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="item.value" :property="item.id" v-for="item in selectedColumnList" :key="item.id" align="center">
                <template slot-scope="scope" slot="header">
                    <span :key="scope.column.property" class="allclickColor" v-if="item.id=='column_name'||item.id=='column_ch_name'">{{item.value}}</span>
                    <el-checkbox :key="scope.column.property" v-else @change="allSelectFun(item.id,item.active)" v-model="item.active" :checked="item.active">
                        <span class="allclickColor">{{item.value}}</span>
                    </el-checkbox>
                </template>
                <template slot-scope="scope">
                    <span v-if="scope.column.property=='column_name'">{{ scope.row[scope.column.property] }}</span>
                    <el-input v-else-if="scope.column.property=='column_ch_name'" v-model="scope.row[scope.column.property]" :title="scope.row[scope.column.property]" placeholder="列中文名" size="medium"></el-input>
                    <div v-else>
                        <el-checkbox v-if="scope.row[scope.column.property]" checked v-model="scope.row[scope.column.property]"></el-checkbox>
                        <el-checkbox v-else v-model="scope.row[scope.column.property]"></el-checkbox>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" v-if="Hbase">
                <template slot-scope="scope">
                    <el-button size="mini" :disabled="scope.$index===0" @click="moveUp(scope.$index,scope.row,FieldProperty)">
                        <i class="el-icon-arrow-up"></i>
                    </el-button>
                    <el-button size="mini" :disabled="scope.$index===(FieldProperty.length-1)" @click="moveDown(scope.$index,scope.row,FieldProperty)">
                        <i class="el-icon-arrow-down"></i>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="fieldProperty_handleSizeChange" @current-change="fieldProperty_handleCurrentChange" :current-page.sync="fieldProperty_currentPage" :page-size="fieldProperty_pagesize" layout="total, prev, pager, next" :total="FieldProperty.length" class="locationcenter"></el-pagination>
        <div slot="footer" class="dialog-footer">
            <el-button @click="ConfigureFieldPropertiesCloseFun()" type="danger" size="mini">取 消</el-button>
            <el-button type="primary" size="mini" @click="ConfigureFieldPropertiesSubmitFun()">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 选择全表目的地弹框 -->
    <el-dialog title=" 选择目的地" :visible.sync="dialogAllChooseDestination" width="70%" class="alltable">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">全表选择目的地设置</span>
            <span class="dialogtoptxt">
                <p class="dialogtopname">(存储名称选择存在oracle时，落地表名长度不能大于27，需单独设置并更改对应落地表名)</p>
            </span>
        </div>
        <el-table stripe :data="AlldestinationData.slice((Alldestination_currentPage - 1) * Alldestination_pagesize,Alldestination_currentPage * Alldestination_pagesize)" border size="medium" highlight-current-row ref="multipleTable" tooltip-effect="dark" :row-key="(row)=>{ return row.dsl_id}" @selection-change="AllhandleSelectionChange" @select-all='allselectD'>
            <el-table-column width="55" align="center" type="selection">
            </el-table-column>
            <el-table-column label="序号" align="center" width="60">
                <template slot-scope="scope">
                    <span>{{scope.$index+(Alldestination_currentPage - 1) * Alldestination_pagesize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column property="dsl_name" label="存储名称" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column property="store_type" label="存储类型" align="center" :show-overflow-tooltip="true"></el-table-column>
             <el-table-column label="详情" width="160px" align="center">
                <template slot-scope="scope">
                    <el-row>
                        <el-col :span="24" class="delbtn">
                            <el-button size="medium" type="text" circle @click="getStoDestDetailFun(scope.row)">查看详情</el-button>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="Alldestination_handleSizeChange" @current-change="Alldestination_handleCurrentChange" :current-page.sync="Alldestination_currentPage" :page-size="Alldestination_pagesize" layout="total, prev, pager, next" :total="AlldestinationData.length" class="locationcenter"></el-pagination>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogAllChooseDestination = false" type="danger" size="mini">取 消</el-button>
            <el-button type="primary" @click="ChooseAllDestinationSubmitFun()" size="mini">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
import * as functionAll from "./semiStructuredAgent";
import * as message from "@/utils/js/message";
import Step from "./step";
import {
    parse
} from "path";
export default {
    components: {
        Step
    },
    data() {
        return {
            rule: validator.default,
            tableloadingInfo: "数据加载中...",
            dbid: null,
            aId: null,
            sourId: null,
            sName: null,
            active: 2,
            Allis_zippercheck: false,
            pzcheckAll: false,
            allcunchu: false,
            allSaveDayActive: false,
            visible: false,
            saveDayvisible: false,
            Allis_destination: false,
            ex_destinationcurrentPage: 1,
            ex_destinationpagesize: 100,
            destination_currentPage: 1,
            destination_pagesize: 10,
            fieldProperty_currentPage: 1,
            fieldProperty_pagesize: 10,
            Alldestination_pagesize: 10,
            Alldestination_currentPage: 1,
            ruleForm: {
                ex_destinationData: [],

            },
            digForm: {
                hyren_name: "",
            }, //选择目的地弹框显示的表名
            ex_destinationData: [],
            dialogChooseDestination: false,
            dialogViewDetails: false,
            dialogFieldProperty: false,
            destinationData: [{
                Storagename: "1",
                Storage: "2"
            }],
            FieldProperty: [{
                col_name: "",
                col_chname: "",
                isKey: "",
                isPartitionCol: ""
            }],
            StorageType: [],
            storeTypeData: [],
            viewDatilsData: [],
            tableId: "",
            dynamic: [],
            selectedColumnList: {},
            Hbase: false,
            type: "",
            dslid: "",
            allstoragetype: "",
            allSaveDay: "",
            StoreData: [],
            dslIdString: [],
            multipleSelection: [],
            dataExtractypeindex: "",
            oldTbData: [],
            submit_0: false,
            submit_1: false,
            datasource_number: '', //数据源编号
            classify_num: '', // 分类编号
            dialogAllChooseDestination: false, //全表设置目的地
            AlldestinationData: [],
            Alldestinationchoose: [],
        };
    },
    computed: {
        address() {
            const {
                submit_0,
                submit_1
            } = this;
            return {
                submit_0,
                submit_1
            };
        }
    },
    watch: {
        address(val) {
            if (val.submit_0 == true && val.submit_1 == true) {
                this.nextLinkfun();
            }
        }
    },
    created() {
        // this.dbid = this.$route.query.id;
        // this.aId = this.$route.query.agent_id;
        // this.sourId = this.$route.query.source_id;
        // this.sName = this.$Base64.decode(this.$route.query.source_name);
    },
    mounted() {
        // let params = {};
        // params["colSetId"] = this.dbid;
        // this.tableloadingInfo = "数据加载中...";
        // addTaskAllFun.stodegetInitInfo(params).then(res => {
        //     this.datasource_number = res.data.datasource_number
        //     this.classify_num = res.data.classify_num
        //     if (res) {
        //         if (res.data.storageTableData.length == 0) {
        //             this.tableloadingInfo = "暂无数据";
        //         } else {
        //             let arr = res.data.storageTableData;
        //             let paramst = {};
        //             paramst["colSetId"] = this.$route.query.id;
        //             addTaskAllFun.getTbStoDestByColSetId(paramst).then(res => {
        //                 if (res) {
        //                     this.oldTbData = res.data != '' ? res.data : [];
        //                 }
        //                 if (this.oldTbData.length > 0) {
        //                     for (var i = 0; i < arr.length; i++) {
        //                         for (let j = 0; j < this.oldTbData.length; j++) {
        //                             if (arr[i].table_id == this.oldTbData[j].tableId) {
        //                                 if (this.oldTbData[j].dslIds.length > 0) {
        //                                     arr[i].table_setting = true;
        //                                 } else {
        //                                     arr[i].table_setting = false;
        //                                 }
        //                             }
        //                         }
        //                         if (arr[i].is_zipper == "1") {
        //                             arr[i].is_zipper = true;
        //                         } else {
        //                             arr[i].is_zipper = false;
        //                         }
        //                         if (!arr[i].storage_type) {
        //                             arr[i].storage_type = "3";
        //                         }
        //                         if (!arr[i].storage_time) {
        //                             arr[i].storage_time = 1;
        //                         }
        //                     }
        //                     this.ruleForm.ex_destinationData = arr;
        //                 } else {
        //                     for (var i = 0; i < arr.length; i++) {
        //                         if (arr[i].is_zipper == "1") {
        //                             arr[i].is_zipper = true;
        //                         } else {
        //                             arr[i].is_zipper = false;
        //                         }
        //                         if (!arr[i].storage_type) {
        //                             arr[i].storage_type = "3";
        //                         }
        //                         if (!arr[i].storage_time) {
        //                             arr[i].storage_time = 1;
        //                         }
        //                     }
        //                     this.ruleForm.ex_destinationData = arr;
        //                 }

        //             });
        //         }
        //     } else {
        //         this.tableloadingInfo = "暂无数据";
        //     }
        // });
        // let params2 = {};
        // params2["category"] = "StorageType";
        // this.$Code.getCategoryItems(params2).then(res => {
        //     this.StorageType = res.data ? res.data : [];
        // });
        // this.storeTypeFun();
        // this.specialfieldFun();
        // this.getSaveDataFun();
    },

    methods: {
        backFun() {
            this.$router.push({
                path: "/agentList"
            });
        },
        //获取初始数据，数据抽取及入库
        getTbStoDestByColSetIdFun() {

        },
        next(formName) {
            let dataAll = this.ruleForm.ex_destinationData,
                datasource_number1 = this.datasource_number,
                classify_num1 = this.classify_num;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // oldTbData this.dslIdString
                    let tbStoInfoString = [],
                        tableString = [],
                        arr = dataAll,
                        desDataArr = [],
                        dslIdString = [];
                    for (let i = 0; i < arr.length; i++) {
                        /* if (arr[i].is_zipper == true) {
                          arr[i].is_zipper = "1";
                        }else{
                          arr[i].is_zipper = "0";
                        } */
                        if (arr[i].data_extract_type != "1") {
                            tbStoInfoString.push({
                                is_zipper: arr[i].is_zipper == true ? "1" : "0",
                                storage_time: parseInt(arr[i].storage_time),
                                storage_type: arr[i].storage_type,
                                table_id: arr[i].table_id
                            });
                            desDataArr.push({
                                tableId: arr[i].table_id,
                                dslIds: [],
                                hyren_name: datasource_number1 + '_' + classify_num1 + '_' + arr[i].table_name
                            });
                        }

                        tableString.push({
                            table_id: arr[i].table_id,
                            table_ch_name: arr[i].table_ch_name,
                            table_name: arr[i].table_name
                        });
                    }
                    // 判断获得的表里面
                    for (let j = 0; j < desDataArr.length; j++) {
                        for (let k = 0; k < this.oldTbData.length; k++) {
                            if (desDataArr[j].tableId == this.oldTbData[k].tableId) {
                                desDataArr[j].dslIds = this.oldTbData[k].dslIds;
                                if (this.oldTbData[k].hyren_name != ''&&this.oldTbData[k].hyren_name!=undefined) {
                                    desDataArr[j].hyren_name = this.oldTbData[k].hyren_name
                                }
                            }
                        }
                    }

                    for (let m = 0; m < desDataArr.length; m++) {
                        for (let n = 0; n < this.dslIdString.length; n++) {
                            if (desDataArr[m].tableId == this.dslIdString[n].tableId) {
                                desDataArr[m].dslIds = this.dslIdString[n].dslIds;
                                if (this.dslIdString[n].hyren_name != ''&&this.dslIdString[n].hyren_name!=undefined) {
                                    desDataArr[m].hyren_name = this.dslIdString[n].hyren_name

                                }
                            }
                        }
                    }
                    dslIdString = desDataArr;
                    if (tbStoInfoString.length > 0) {
                        let params = {};
                        params["tbStoInfoString"] = JSON.stringify(tbStoInfoString);
                        params["colSetId"] = parseInt(this.dbid);
                        params["dslIdString"] = JSON.stringify(dslIdString);
                        addTaskAllFun.saveTbStoInfo(params).then(res => {
                            if (res.code == 200) {
                                this.submit_1 = true;
                            }
                        });
                    } else {
                        this.submit_1 = true;
                    }

                    // 保存表名
                    if (tableString.length > 0) {
                        let params0 = {};
                        params0["tableString"] = JSON.stringify(tableString);
                        addTaskAllFun.updateTableName(params0).then(res => {
                            if (res.code == 200) {
                                this.submit_0 = true;
                                // this.dbid = res.data;
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: res.message,
                                    type: "error"
                                });
                            }
                        });
                    } else {
                        this.submit_0 = true;
                    }

                }
            });
        },
        nextLinkfun() {
            let data = {};
            if (this.$route.query.edit == "yes") {
                data = {
                    agent_id: this.aId,
                    id: this.$route.query.id,
                    source_id: this.sourId,
                    source_name: this.$route.query.source_name,
                    is_archived: this.$route.query.is_archived,
                    edit: "yes"
                };
            } else {
                data = {
                    id: this.$route.query.id,
                    agent_id: this.aId,
                    source_id: this.sourId,
                    source_name: this.$route.query.source_name,
                    is_archived: this.$route.query.is_archived,
                };
            }
            this.$router.push({
                path: "/collection4_6",
                query: data
            });
        },
        pre() {
            let data = {};
            if (this.$route.query.edit == "yes") {
                data = {
                    agent_id: this.aId,
                    id: this.dbid,
                    source_id: this.sourId,
                    source_name: this.$route.query.source_name,
                    is_archived: this.$route.query.is_archived,
                    edit: "yes"
                };
            } else {
                data = {
                    agent_id: this.aId,
                    id: this.dbid,
                    source_id: this.sourId,
                    source_name: this.$route.query.source_name,
                    is_archived: this.$route.query.is_archived,
                };
            }
            if (this.$route.query.is_archived == 'no') {
                this.$router.push({
                    path: "/collection4_3",
                    query: data
                });
            } else {
                this.$router.push({
                    path: "/collection4_4",
                    query: data
                });
            }

        },
        /*   // 获取编辑状态下原有存储数据
        getSaveDataFun() {
          let paramst = {};
          paramst["colSetId"] = this.$route.query.id;
          addTaskAllFun.getTbStoDestByColSetId(paramst).then(res => {
            console.log(res);
          });
        }, */
        // store_type
        storeTypeFun() {
            let params = {};
            params["category"] = "Store_type";
            this.$Code.getCategoryItems(params).then(res => {
                if (res) {
                    this.storeTypeData = res.data;
                }
            });
        },
        ex_destination_handleSizeChange(size) {
            this.ex_destinationpagesize = size;
        },
        ex_destination_handleCurrentChange(current) {
            this.ex_destinationcurrentPage = current;
        },
        destination_handleSizeChange(size) {
            this.destination_pagesize = size;
        },
        destination_handleCurrentChange(current) {
            this.destination_currentPage = current;
        },
        Alldestination_handleSizeChange(size) {
            this.Alldestination_pagesize = size;
        },
        Alldestination_handleCurrentChange(current) {
            this.Alldestination_currentPage = current;
        },
        fieldProperty_handleSizeChange(size) {
            this.fieldProperty_pagesize = size;
        },
        fieldProperty_handleCurrentChange(current) {
            this.fieldProperty_currentPage = current;
        },
        /*   FieldProperty_addRow(tableData, event) {
          tableData.push({
            col_name: "",
            col_chname: "",
            isKey: "",
            isPartitionCol: ""
          });
        }, */
        is_zipperFun(row) {
            if (row.is_zipper == false) {
                row.storage_type = "";
            }
        },
        Allis_zipperFun(items, e) {
            items.forEach((item, i) => {
                if (e) {
                    item.is_zipper = true;
                } else {
                    item.is_zipper = false;
                    item.storage_type = "";
                }
            });
        },
        ChooseDestination(row, index) {
            this.dataExtractypeindex = index;
            this.tableId = row.table_id;
            if (this.dslIdString.length > 0) {
                let aartrue = [],
                    aarfalse = [],
                    arrall = [];
                for (let m = 0; m < this.dslIdString.length; m++) {
                    arrall.push(this.dslIdString[m].tableId);
                }
                if (arrall.indexOf(row.table_id) != -1) {
                    arrall.length = 0
                    for (let m = 0; m < this.dslIdString.length; m++) {
                        if (this.dslIdString[m].tableId == row.table_id) {
                            let params = {},
                                dslIds = this.dslIdString[m].dslIds;
                            let data = this.storeTypeData;
                            params["tableId"] = row.table_id;
                            addTaskAllFun.getStoDestByTableId(params).then(res => {
                                let arr = JSON.parse(JSON.stringify(res.data.tableStorage));
                                if (dslIds.length > 0) {
                                    for (let yn = 0; yn < arr.length; yn++) {
                                        arr[yn].usedflag = false;
                                        for (let n = 0; n < dslIds.length; n++) {
                                            if (arr[yn].dsl_id == dslIds[n]) {
                                                arr[yn].usedflag = true;
                                            }
                                        }
                                        for (let j = 0; j < data.length; j++) {
                                            if (data[j].code == arr[yn].store_type) {
                                                arr[yn].store_type = data[j].value;
                                            }
                                        }
                                    }
                                } else {
                                    for (let yn = 0; yn < arr.length; yn++) {
                                        arr[yn].usedflag = false;
                                        for (let j = 0; j < data.length; j++) {
                                            if (data[j].code == arr[yn].store_type) {
                                                arr[yn].store_type = data[j].value;
                                            }
                                        }
                                    }
                                }
                                this.destinationData = arr;
                            })
                            this.digForm.hyren_name = this.dslIdString[m].new_name

                        }
                    }
                } else {
                    this.destinationOldDataFun(row.table_id, row.table_name);
                }
            } else {
                this.destinationOldDataFun(row.table_id, row.table_name);
            }
            this.dialogChooseDestination = true;
        },
        //目的地弹框初始数据
        destinationOldDataFun(id, tablename) {
            let params = {};
            params["tableId"] = id;
            addTaskAllFun.getStoDestByTableId(params).then(res => {
                let str = this.datasource_number + '_' + this.classify_num + '_'
                if (res.data) {
                    this.digForm.hyren_name = res.data.hyren_name != '' ? res.data.hyren_name.replace(str, '').trim() : tablename;
                    let arr = JSON.parse(JSON.stringify(res.data.tableStorage));
                    let data = this.storeTypeData;
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i].usedflag == "1") {
                            arr[i].usedflag = true;
                        } else {
                            arr[i].usedflag = false;
                        }
                        for (let j = 0; j < data.length; j++) {
                            if (data[j].code == arr[i].store_type) {
                                arr[i].store_type = data[j].value;
                            }
                        }
                    }
                    this.destinationData = arr;
                }
            });
        },
        // 点击查看详情
        getStoDestDetailFun(row) {
            this.dialogViewDetails = true;
            let params = {};
            params["dslId"] = row.dsl_id;
            addTaskAllFun.getStoDestDetail(params).then(res => {
                if (res.data) {
                    this.viewDatilsData = res.data;
                }
            });
        },
        // 点击配置属性按钮
        getColumnStoInfoFun(row) {
            this.type = row.store_type;
            this.dslid = row.dsl_id;
            if (row.store_type == "Hbase") {
                this.Hbase = true;
            } else {
                this.Hbase = false;
            }
            this.dialogFieldProperty = true;
            // 获取表头
            let params0 = {};
            params0["dslId"] = row.dsl_id;
            addTaskAllFun.getColumnHeader(params0).then(res => {
                if (res.data) {
                    let arr = [];
                    for (var key in res.data) {
                        if (key == "column_name") {
                            arr.push({
                                id: key,
                                value: res.data[key]
                            });
                        }
                    }
                    for (var key in res.data) {
                        if (key == "column_ch_name") {
                            arr.push({
                                id: key,
                                value: res.data[key]
                            });
                        }
                    }
                    for (var key in res.data) {
                        if (key != "column_name" && key != "column_ch_name") {
                            arr.push({
                                id: key,
                                value: "是否" + res.data[key],
                                active: false
                            });
                        }
                    }
                    this.selectedColumnList = arr;
                }
            });
            // 获取数据
            let params = {};
            params["dslId"] = row.dsl_id;
            params["tableId"] = this.tableId;
            addTaskAllFun.getColumnStoInfo(params).then(res => {
                if (res.data) {
                    let arr = JSON.parse(JSON.stringify(res.data));
                    for (let i = 0; i < arr.length; i++) {
                        for (let key in arr[i]) {
                            if (
                                key == "column_id" ||
                                key == "column_ch_name" ||
                                key == "column_name" ||
                                key == "csi_number"
                            ) {
                                key = arr[i][key];
                            } else {
                                if (arr[i][key] == "0") {
                                    arr[i][key] = false;
                                } else {
                                    arr[i][key] = true;
                                }
                            }
                        }
                    }
                    this.FieldProperty = arr;
                }
            });
        },
        allSelectFun(tit, e) {
            let data = this.FieldProperty;
            for (let i = 0; i < data.length; i++) {
                for (let key in data[i]) {
                    if (key == tit) {
                        if (e) {
                            data[i][key] = true;
                        } else {
                            data[i][key] = false;
                        }
                    }
                }
            }
        },
        //上移
        moveUp(index, row, tableData) {
            if (index > 0) {
                let upDate = tableData[index - 1];
                tableData.splice(index - 1, 1);
                tableData.splice(index, 0, upDate);
            } else {
                // alert("已经是第一条，不可上移");
            }
        },
        //下移
        moveDown(index, row, tableData) {
            if (index + 1 === tableData.length) {
                // alert("已经是最后一条，不可下移");
            } else {
                let downDate = tableData[index + 1];
                tableData.splice(index + 1, 1);
                tableData.splice(index, 0, downDate);
            }
        },
        //  获取特殊字段值
        specialfieldFun() {
            let params = {};
            params["category"] = "StoreLayerAdded";
            this.$Code.getCategoryItems(params).then(res => {
                if (res.data) {
                    this.StoreData = res.data;
                }
            });
        },
        // 配置字段属性
        ConfigureFieldPropertiesSubmitFun() {
            let data = this.FieldProperty;
            let arr = data,
                columnString = [],
                count = 0,
                specialfield = [],
                arrlist = [];
            // 调特殊字段接口dslid
            let params0 = {};
            params0["dslId"] = this.dslid;
            addTaskAllFun.getDataStoreLayerAddedId(params0).then(res => {
                if (res.data) {
                    let data = res.data,
                        arr2 = [];
                    // 将获得的id以固定形式给arr2
                    if (data) {
                        for (let item in data) {
                            arr2.push({
                                key: item,
                                value: data[item]
                            });
                        }
                        // 将特殊字段对应id组成新的数组给specialfield
                        for (let i = 0; i < this.StoreData.length; i++) {
                            for (let j = 0; j < arr2.length; j++) {
                                if (this.StoreData[i].code == arr2[j].key) {
                                    specialfield.push({
                                        key: this.StoreData[i].value,
                                        value: arr2[j].value
                                    });
                                }
                            }
                        }
                    }
                    //columnString
                    for (let i = 0; i < arr.length; i++) {
                        columnString.push({
                            column_id: arr[i].column_id,
                            column_ch_name: arr[i].column_ch_name
                        });
                        delete arr[i].column_name;
                        delete arr[i].column_ch_name;
                        arr[i].dsladIds = [];
                        // Hbase类型增加csiNumber字段
                        if (this.type == "Hbase") {
                            delete arr[i].csiNumber;
                            if (arr[i].rowkey) {
                                if (arr[i].rowkey == true) {
                                    count = count + 1;
                                    arr[i].csiNumber = count;
                                }
                            }
                        }
                        // 遍历得到dsladIds数组
                        for (let key in arr[i]) {
                            if (
                                key != "csiNumber" &&
                                key != "column_id" &&
                                key != "dsladIds" &&
                                key != "csi_number"
                            ) {
                                if (key) {
                                    if (arr[i][key] == true) {
                                        delete arr[i][key];
                                        arr[i].dsladIds.push(key);
                                    } else {
                                        delete arr[i][key];
                                    }
                                }
                            }
                            if (key == "column_id") {
                                arr[i].columnId = arr[i][key];
                                delete arr[i][key];
                            }
                            if (key == "csi_number") {
                                delete arr[i][key];
                            }
                        }
                    }
                    arrlist = JSON.parse(JSON.stringify(arr));
                    // dslIds空的删除，并替换对应特殊字段id
                    for (let j = 0; j < arrlist.length; j++) {
                        if (arrlist[j].dsladIds.length == "0") {
                            arrlist.splice(j, 1);
                            j--;
                        } else {
                            for (let n = 0; n < arrlist[j].dsladIds.length; n++) {
                                for (let m = 0; m < specialfield.length; m++) {
                                    if (specialfield[m].key == arrlist[j].dsladIds[n]) {
                                        arrlist[j].dsladIds[n] = specialfield[m].value;
                                    }
                                }
                            }
                        }
                    }
                    // 保存特殊字段
                    let params = {};
                    params["colStoInfoString"] = JSON.stringify(arrlist);
                    params["tableId"] = this.tableId;
                    addTaskAllFun.saveColStoInfo(params).then(res => {
                        message.saveSuccess(res);
                    });
                    // 保存修改的中文列名
                    let params1 = {};
                    params1["columnString"] = JSON.stringify(columnString);
                    addTaskAllFun.updateColumnZhName(params1).then(res => {
                        // message.saveSuccess(res);
                        this.dialogFieldProperty = false;
                    });
                }
            });
        },
        // 配置字段属性取消按钮
        ConfigureFieldPropertiesCloseFun() {
            this.dialogFieldProperty = false;
        },
        // 改变所有存储方式确定按钮方法
        allcunchuFun(e) {
            if (e) {
                this.visible = true;
            } else {
                this.visible = false;
            }
        },
        allStorageModeFun() {
            this.visible = false;
            for (let i = 0; i < this.ruleForm.ex_destinationData.length; i++) {
                this.ruleForm.ex_destinationData[i].storage_type = this.allstoragetype;
            }
        },
        allStorageModeCloseFun() {
            this.visible = false;
            this.allcunchu = false;
        },
        //保留天数弹出
        allsaveDayCloseFun() {
            this.allSaveDay = "";
            this.saveDayvisible = false;
            this.allSaveDayActive = false;
        },
        allsaveDaySubmitFun() {
            this.saveDayvisible = false;
            for (let i = 0; i < this.ruleForm.ex_destinationData.length; i++) {
                this.ruleForm.ex_destinationData[i].storage_time = this.allSaveDay;
            }
        },
        allsaveDayFun(e) {
            if (e) {
                this.saveDayvisible = true;
            } else {
                this.saveDayvisible = false;
            }
        },
        //选择目的地弹框提交确定按钮
        ChooseDestinationSubmitFun(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let data = JSON.parse(JSON.stringify(this.destinationData)),
                        str = '',
                        searcharr = [];
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].usedflag == true) {
                            searcharr.push(data[i].dsl_name.toLowerCase())
                        }
                    }
                    if (searcharr.indexOf('oracle') == -1) {
                        str = this.datasource_number + '_' + this.classify_num + '_' + this.digForm.hyren_name
                        let dslIds = [];
                        if (this.dslIdString.length > 0) {
                            for (let j = 0; j < this.dslIdString.length; j++) {
                                if (this.dslIdString[j].tableId == this.tableId) {
                                    this.dslIdString.splice(j, 1);
                                    j--
                                }
                            }
                        }
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].usedflag == true) {
                                dslIds.push(data[i].dsl_id);
                            }
                        }
                        if (dslIds.length != 0) {
                            this.dslIdString.push({
                                dslIds: dslIds,
                                tableId: this.tableId,
                                hyren_name: str,
                                new_name: this.digForm.hyren_name
                            });
                            this.dialogChooseDestination = false;
                            this.ruleForm.ex_destinationData[
                                this.dataExtractypeindex
                            ].table_setting = true;
                        } else {
                            this.open();
                        }
                    } else {
                        str = this.datasource_number + '_' + this.classify_num + '_' + this.digForm.hyren_name
                        if (str.length > 27) {
                            this.$message({
                                showClose: true,
                                message: "选择目的地存在oracl时,落地表名长度不能超过27,请修改落地表名",
                                type: "error"
                            });
                        } else {
                            let dslIds = [];
                            if (this.dslIdString.length > 0) {
                                for (let j = 0; j < this.dslIdString.length; j++) {
                                    if (this.dslIdString[j].tableId == this.tableId) {
                                        this.dslIdString.splice(j, 1);
                                        j--
                                    }
                                }
                            }
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].usedflag == true) {
                                    dslIds.push(data[i].dsl_id);
                                }
                            }
                            if (dslIds.length != 0) {
                                this.dslIdString.push({
                                    dslIds: dslIds,
                                    tableId: this.tableId,
                                    hyren_name: str,
                                    new_name: this.digForm.hyren_name
                                });
                                this.dialogChooseDestination = false;
                                this.ruleForm.ex_destinationData[
                                    this.dataExtractypeindex
                                ].table_setting = true;
                            } else {
                                this.open();
                            }
                        }
                    }
                }
            })

        },
        open() {
            this.$message({
                showClose: true,
                message: "请至少选择一个存储目的地",
                type: "error"
            });
        },
        getRowKeys(row) {
            return row.dsl_id;
        },

        //
        //选择目的地弹框全选
        Allis_destinationFun(items, e) {
            let that = this;
            items.forEach((item, j) => {
                if (e) {
                    item.usedflag = true;
                } else {
                    item.usedflag = false;
                }
            });
        },
        // 选择目的地弹框选择某一个
        destination_evercheck(val, name) {
            if (val == true) {
                for (let i = 0; i < this.destinationData.length; i++) {
                    if (this.destinationData[i].dsl_name == name) {
                        this.destinationData[i].usedflag = true;
                    }
                }
            } else {
                for (let i = 0; i < this.destinationData.length; i++) {
                    if (this.destinationData[i].dsl_name == name) {
                        this.destinationData[i].usedflag = false;
                    }
                }
            }
        },
        // 全表设置目的地
        AllSettingDestinationFun() {
            this.dialogAllChooseDestination = true
            //    AlldestinationData
            addTaskAllFun.getStorageData().then(res => {
                let arr = JSON.parse(JSON.stringify(res.data));
                let data = this.storeTypeData;
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        if (data[j].code == arr[i].store_type) {
                            arr[i].store_type = data[j].value;
                        }
                    }
                }
                this.AlldestinationData = arr;
            })

        },
        // 全表设置目的地确定提交
        ChooseAllDestinationSubmitFun() {
            if (this.Alldestinationchoose.length > 0) {
                this.dslIdString.length = 0
                let dslIds = []
                for (let i = 0; i < this.Alldestinationchoose.length; i++) {
                    dslIds.push(this.Alldestinationchoose[i].dsl_id)
                }
                for (let i = 0; i < this.ruleForm.ex_destinationData.length; i++) {
                    this.dslIdString.push({
                        dslIds: dslIds,
                        tableId: this.ruleForm.ex_destinationData[i].table_id,
                        hyren_name: this.datasource_number + '_' + this.classify_num + '_' + this.ruleForm.ex_destinationData[i].table_name,
                        new_name: this.ruleForm.ex_destinationData[i].table_name
                    });
                    this.ruleForm.ex_destinationData[i].table_setting = true
                }
                this.dialogAllChooseDestination = false
                console.log(this.dslIdString)
            } else {
                this.open()
            }
        },
        // 全表设置目的地全选
        AllhandleSelectionChange(item) {
            this.Alldestinationchoose = item
        },
        // 全表设置目的地单个勾选
        allselectD(item) {
            this.Alldestinationchoose = item
        }
    }
};
</script>

<style scoped>
.el-form-item__content .el-input-group {
    vertical-align: middle;
}

.el-select .el-input {
    width: 130px;
}

.input-with-select .el-input-group__prepend {
    background-color: #fff;
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

.mailTable {
    width: 66%;
    margin: 0 auto;
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-left: 1px solid #ccc;
    box-sizing: border-box;
}

.mailTable>tr>td:nth-child(1) {
    width: 25%;
    text-align: right;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
    font-weight: bold;
    background-color: #eff3f6;
}

.mailTable>tr>td:nth-child(2) {
    width: 40%;
    text-align: left;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
}

.alltable>>>.el-dialog__body {
    padding: 10px 20px 20px;
}

.topcolumename {
    display: inline-block;
    background: #f3eded;
    color: #ec0b35;
    padding: 2px;
}

.addline {
    margin: 5px 0;
}

.nocontent {
    text-align: center;
    font-weight: normal;
    border-right: 0;
}

.alldays {
    text-align: center;
    margin-top: 10px;
}

.alldays>>>.el-input--medium .el-input__inner {
    height: 24px !important;
}

.settingbtn {
    color: #409eff;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
}

.steps5>>>.el-form-item {
    margin-bottom: 0 !important;
}

.steps5>>>.el-form-item__content::before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
    display: inline-block;
    position: absolute;
    left: -5%;
}

.steps5>>>.el-icon-question:before {
    content: "" !important;
}

.steps5>>>.el-icon-question:after {
    content: "\E7A4" !important;
    margin-left: 10px;
}

.steps5>>>tr>td {
    padding: 0;
}

.steps5>>>tr>td>.cell {
    padding: 11px 10px;
}

.steps5>>>.el-form-item__error {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 6px;
    position: absolute;
    top: 86%;
    left: 1%;
}

.cleanbtn {
    width: 100%;
    background: #f3f1f1;
    padding: 10px 0;
    overflow: hidden;
    position: relative;
}

.cleanbtn>button {
    float: right;
    margin: 0 10px;
}
</style>
