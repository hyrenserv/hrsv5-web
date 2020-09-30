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
            <el-table :header-cell-style="{background:'#e6e0e0'}" ref="filterTable" stripe
                      :default-sort="{prop: 'date', order: 'descending'}" style="width: 100%" size="medium" border
                      :data="ruleForm.ex_destinationData.slice((ex_destinationcurrentPage - 1) * ex_destinationpagesize, ex_destinationcurrentPage *ex_destinationpagesize)">
                <el-table-column label="序号" align="center" width="60">
                    <template scope="scope">
                        <span>{{scope.$index+(ex_destinationcurrentPage - 1) * ex_destinationpagesize + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="表名" prop="en_name" align="center" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column label="表中文名" align="center" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <el-form-item :prop="'ex_destinationData.'+scope.$index+'.zh_name'" :rules="rule.default">
                            <el-input size="medium" v-model="scope.row.zh_name" style="width:90%"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label=" 选择目的地" width="200" align="center">
                    <template slot="header">
                        <el-tooltip class="item" effect="light" content placement="right">
                            <div slot="content">请至少选择一个目的地</div>
                            <i class="el-icon-question" aria-hidden="true">选择目的地</i>
                        </el-tooltip>
                    </template>
                    <template slot-scope="scope">
                    <span class="settingbtn" v-if="scope.row.data_extract_type!='1'">
                        <el-button type="success" size="mini"
                                   v-if="scope.row.dslIds.length !=0 || scope.row.dsl_id !=undefined"
                                   @click="ChooseDestination(scope.row,scope.$index)">已选择</el-button>
                        <el-button type="warning" size="mini" v-else @click="ChooseDestination(scope.row,scope.$index)">未选择</el-button>
                    </span>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        <el-pagination @size-change="ex_destination_handleSizeChange"
                       @current-change="ex_destination_handleCurrentChange" :current-page="ex_destinationcurrentPage"
                       :page-sizes="[100, 200, 300, 400]" :page-size="ex_destinationpagesize"
                       layout="total, sizes, prev, pager, next, jumper" :total="ruleForm.ex_destinationData.length"
                       class="locationcenter"></el-pagination>
        <el-row>
            <el-col :span="12">
                <el-button type="primary" size="medium" class="leftbtn" @click="backFun()">返回</el-button>
            </el-col>
            <el-col :span="12">
                <el-button type="primary" size="medium" class='rightbtn' @click="next('ruleForm')">下一步</el-button>
                <el-button type="success" size="medium" class='rightbtn' @click="startButtonFun()">立即启动</el-button>
                <el-button type="primary" size="medium" class='rightbtn' @click="pre()">上一步</el-button>
            </el-col>
        </el-row>
        <!-- 选择目的地弹框 -->
        <el-dialog title=" 选择目的地" :visible.sync="dialogChooseDestination" width="70%" class="alltable">
            <div slot="title">
                <span class="dialogtitle el-icon-caret-right">选择目的地</span>
            </div>
            <el-form ref="digForm" :model="digForm" label-width="20%">
            </el-form>
            <el-table stripe
                      :data="destinationData.slice((destination_currentPage - 1) * destination_pagesize, destination_currentPage * destination_pagesize)"
                      border size="medium" highlight-current-row ref="multipleTable" tooltip-effect="dark"
                      :row-key="getRowKeys">
                <el-table-column width="55" align="center" prop="selectionState">
                    <template slot="header" slot-scope="scope">
                        <el-checkbox @change="Allis_destinationFun(destinationData,Allis_destination)"
                                     v-model="Allis_destination" :checked="Allis_destination"></el-checkbox>
                    </template>
                    <template slot-scope="scope">
                        <el-checkbox :checked="scope.row.usedflag" v-model="scope.row.usedflag"
                                     @change="destination_evercheck(scope.row.usedflag,scope.row.dsl_name)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="序号" align="center" width="60">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(destination_currentPage - 1) * destination_pagesize + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column property="dsl_name" label="存储名称" align="center"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column property="store_type" label="存储类型" align="center"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="详情" width="160px" align="center">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="24" class="delbtn">
                                <el-button size="medium" type="text" circle @click="getStoDestDetailFun(scope.row)">
                                    查看详情
                                </el-button>
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
            <el-pagination @size-change="destination_handleSizeChange" @current-change="destination_handleCurrentChange"
                           :current-page.sync="destination_currentPage" :page-size="destination_pagesize"
                           layout="total, prev, pager, next" :total="destinationData.length"
                           class="locationcenter"></el-pagination>
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
            <el-table stripe
                      :data="FieldProperty.slice((fieldProperty_currentPage - 1) * fieldProperty_pagesize, fieldProperty_currentPage * fieldProperty_pagesize)"
                      border size="medium" highlight-current-row>
                <el-table-column label="序号" width="60px" align="center">
                    <template scope="scope">
                        <span>{{scope.$index+(fieldProperty_currentPage - 1) * fieldProperty_pagesize + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="列名" align="center" show-overflow-tooltip prop="column_name">
                </el-table-column>
                <el-table-column prop="column_name" label="列中文名" align="center">
                    <template slot-scope="scope">
                        <el-input placeholder="列中文名" v-model="scope.row.data_desc"></el-input>
                    </template>
                </el-table-column>
                <el-table-column :label="item.value" v-for="(item,index) in columnHeader" :key="item.dsla_storelayer"
                                 align="center">
                    <template slot-scope="scope" slot="header">
                        <el-checkbox :key="item.dsla_storelayer" :checked="item.colTrueFalse"
                                     v-model="item.colTrueFalse"
                                     @change="allSelectFun(FieldProperty,item.colTrueFalse,index)">
                            <span class="allclickColor">{{item.value}}</span>
                        </el-checkbox>
                    </template>
                    <template slot-scope="scope">
                        <el-checkbox :checked="scope.row['trueFalse'+index] " @change="changeMarknum(scope.row,index)"
                                     v-model="scope.row['trueFalse'+index]"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" v-if="Hbase">
                    <template slot-scope="scope">
                        <el-button size="mini" :disabled="scope.$index===0"
                                   @click="moveUp(scope.$index,scope.row,FieldProperty)">
                            <i class="el-icon-arrow-up"></i>
                        </el-button>
                        <el-button size="mini" :disabled="scope.$index===(FieldProperty.length-1)"
                                   @click="moveDown(scope.$index,scope.row,FieldProperty)">
                            <i class="el-icon-arrow-down"></i>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="fieldProperty_handleSizeChange"
                           @current-change="fieldProperty_handleCurrentChange"
                           :current-page.sync="fieldProperty_currentPage" :page-size="fieldProperty_pagesize"
                           layout="total, prev, pager, next" :total="FieldProperty.length"
                           class="locationcenter"></el-pagination>
            <div slot="footer" class="dialog-footer">
                <el-button @click="ConfigureFieldPropertiesCloseFun()" type="danger" size="mini">取 消</el-button>
                <el-button type="primary" size="mini" @click="ConfigureFieldPropertiesSubmitFun()">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 选择全表目的地弹框 -->
        <el-dialog title=" 选择目的地" :visible.sync="dialogAllChooseDestination" width="70%" class="alltable">
            <div slot="title">
                <span class="dialogtitle el-icon-caret-right">全表选择目的地设置</span>
            </div>
            <el-table stripe
                      :data="AlldestinationData.slice((Alldestination_currentPage - 1) * Alldestination_pagesize,Alldestination_currentPage * Alldestination_pagesize)"
                      border size="medium" highlight-current-row ref="multipleTable" tooltip-effect="dark"
                      :row-key="(row)=>{ return row.dsl_id}" @selection-change="AllhandleSelectionChange"
                      @select-all='allselectD'>
                <el-table-column width="55" align="center" type="selection">
                </el-table-column>
                <el-table-column label="序号" align="center" width="60">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(Alldestination_currentPage - 1) * Alldestination_pagesize + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column property="dsl_name" label="存储名称" align="center"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column property="store_type" label="存储类型" align="center"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="详情" width="160px" align="center">
                    <template slot-scope="scope">
                        <el-row>
                            <el-col :span="24" class="delbtn">
                                <el-button size="medium" type="text" circle @click="getStoDestDetailFun(scope.row)">
                                    查看详情
                                </el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="Alldestination_handleSizeChange"
                           @current-change="Alldestination_handleCurrentChange"
                           :current-page.sync="Alldestination_currentPage" :page-size="Alldestination_pagesize"
                           layout="total, prev, pager, next" :total="AlldestinationData.length"
                           class="locationcenter"></el-pagination>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAllChooseDestination = false" type="danger" size="mini">取 消</el-button>
                <el-button type="primary" @click="ChooseAllDestinationSubmitFun()" size="mini">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="设置数据跑批日期" :visible.sync="finishDialogVisible" width="30%">
            <div slot="title">
                <span class="dialogtitle el-icon-caret-right">设置数据跑批日期</span>
            </div>
            <div>
                <el-form>
                    <el-form-item>
                        <el-date-picker type="date" value-format="yyyyMMdd" placeholder="选择启动日期" v-model="etl_date"
                                        style="width:100%;"></el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="finishDialogVisible = false" type="danger" size="mini">取 消</el-button>
            <el-button type="primary" @click="execute()" size="mini">确 定</el-button>
        </span>
        </el-dialog>

        <transition name="fade">
            <loading v-if="isLoading"/>
        </transition>


    </div>
</template>

<script>
    import * as validator from "@/utils/js/validator";
    import regular from "@/utils/js/regular";
    import * as functionAll from "./semiStructuredAgent";
    import Step from "./step";
    import Loading from '../../components/loading'

    import {
        parse
    } from "path";

    export default {
        components: {
            Step,
            Loading
        },
        data() {
            return {
                isLoading: false,
                finishDialogVisible: false,
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
                colTrueFalse: false,
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
                ocsId: '',
                columnHeader: [],
                dataALLindex: '',
                markIsHbase: '',
                etl_date: '',

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
        mounted() {
            this.getCollectStorageLayerInfo();
        },

        methods: {
            // 返回数据源Agent列表
            backFun() {
                this.$router.push({
                    path: "/agentList"
                });
            },
            // 返回上一步
            pre() {
                if (this.$route.query.edit == 'yes') { //编辑
                    this.$router.push({
                        name: "collectFileOption",
                        query: {
                            agent_id: this.$route.query.agent_id,
                            odc_id: this.$route.query.odc_id,
                            edit: this.$route.query.edit
                        }
                    })
                } else { //新增
                    this.$router.push({
                        name: "collectFileOption",
                        query: {
                            agent_id: this.$route.query.agent_id,
                            odc_id: this.$route.query.odc_id
                        }
                    })
                }
            },
            // 获取页面初始值
            getCollectStorageLayerInfo() {
                functionAll.getCollectStorageLayerInfo({
                    odc_id: this.$route.query.odc_id
                }).then(res => {
                    res.data.forEach((item) => {
                        item.dslIds = [];
                    })
                    this.ruleForm.ex_destinationData = res.data;
                })
            },
            //根据ocs_id获取每行的目的存储数据
            ChooseDestination(row, index) {
                this.ocsId = row.ocs_id;
                this.dataALLindex = index;
                this.storeTypeFun(); //调用代码项
                if (row.dslIds.length > 0) {
                    functionAll.searchDataStore().then(res => {
                        if (res && res.success) {
                            res.data.forEach(item => {
                                row.dslIds.forEach(value => {
                                    if (value == item.dsl_id) {
                                        item.usedflag = true;
                                    }
                                })

                                this.storeTypeData.forEach(val => {
                                    if (item.store_type == val.code) {
                                        item.store_type = val.value;
                                    }
                                })
                            })
                            this.destinationData = res.data;
                            this.dialogChooseDestination = true;
                        }
                    })
                } else {
                    let getDslId = new Promise((resolve, reject) => { //查询是否为已选择项回显数据
                        functionAll.getStorageLayerDestById({
                            ocs_id: row.ocs_id
                        }).then(res => {
                            if (res && res.success) {
                                resolve(res.data)
                            } else {
                                reject()
                            }

                        })
                    })

                    let getSearchDataStore = new Promise((resolve, reject) => { //获取选择目的地信息
                        functionAll.searchDataStore().then(res => {
                            if (res && res.success) {
                                res.data.forEach(item => {
                                    item.usedflag = false;
                                    this.storeTypeData.forEach(val => {
                                        if (item.store_type == val.code) {
                                            item.store_type = val.value;
                                        }
                                    })
                                })
                                resolve(res.data)
                            } else {
                                reject()
                            }
                        })
                    })
                    Promise.all([getDslId, getSearchDataStore]).then(res => {
                        let arr1 = res[0]; //查询dsl_id是否存在回显
                        let arr2 = res[1]; //选择目的地表格内容
                        arr1.forEach(item1 => {
                            arr2.forEach(item2 => {
                                if (item1.dsl_id != undefined) {
                                    if (item1.dsl_id == item2.dsl_id) {
                                        item2.usedflag = true;
                                    }
                                }
                            })
                        })
                        this.dialogChooseDestination = true;
                        this.destinationData = arr2;
                    })
                }

            },
            // 代码项获取
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
            // 点击查看选择目的弹出框当前行详情
            getStoDestDetailFun(row) {
                functionAll.getStorageLayerAttrById({
                    dsl_id: row.dsl_id
                }).then(res => {
                    if (res.data) {
                        this.dialogViewDetails = true;
                        this.viewDatilsData = res.data;
                    }
                });
            },
            // 点击配置选择目的弹出框当前行属性获取数据
            getColumnStoInfoFun(row) {
                this.markIsHbase = row.store_type;
                if (row.store_type == 'Hbase') {
                    this.Hbase = true;
                } else {
                    this.Hbase = false;
                }
                this.specialfieldFun(); //调用代码项获取值
                functionAll.getColumnStorageLayerInfo({
                    ocs_id: this.ocsId,
                    dsl_id: row.dsl_id
                }).then(res => {
                    this.dialogFieldProperty = true;
                    this.columnHeader = res.data[0].dslaStorelayerList;
                    //对动态列数据进行处理匹配
                    res.data.forEach((item) => {
                        if (item.dsla_storelayer && item.dsla_storelayer.length > 0) {
                            let arry = [];
                            this.columnHeader.forEach((val2, index) => {
                                arry.push(val2.dsla_storelayer);
                            });
                            item.dsla_storelayer.forEach(val => {
                                let i = arry.indexOf(val);
                                item['trueFalse' + i] = true;
                                item['markNum' + i] = i;
                                item['dslad_id'] = [];
                            })
                        } else {
                            for (let i = 0; i < this.columnHeader.length; i++) {
                                item['trueFalse' + i] = false;
                                item['markNum' + i] = i;
                                item['dslad_id'] = [];
                            }
                        }

                    })
                    this.columnHeader.forEach((item, index) => {
                        item['markNum' + index] = index;
                        this.StoreData.forEach(value => {
                            if (item.dsla_storelayer == value.code) {
                                this.columnHeader[index].value = value.value
                            }
                        })
                    })
                    this.FieldProperty = res.data;
                })
            },
            //  获取代码项的值
            specialfieldFun() {
                let params = {};
                params["category"] = "StoreLayerAdded";
                this.$Code.getCategoryItems(params).then(res => {
                    if (res.data) {
                        this.StoreData = res.data;
                    }
                });
            },
            // 选择CHECKBOX更改markNum
            changeMarknum(row, index) {
                this.FieldProperty.forEach(item => {
                    if (row.column_name == item.column_name) {
                        item['markNum' + index] = index;
                    }
                })
            },
            // 保存配置字段属性
            ConfigureFieldPropertiesSubmitFun() {
                // 更新列字段中文名
                let saveName = new Promise((resolve, reject) => {
                    // 处理数据
                    let arr = [];
                    arr = JSON.parse(JSON.stringify(this.FieldProperty))
                    this.columnHeader.forEach((val, index) => {
                        arr.forEach(item => {
                            if (item.dslaStorelayerList) {
                                delete item.dslaStorelayerList;
                            }
                            delete item['trueFalse' + index];
                            delete item['markNum' + index];
                            delete item.dslad_id;
                        })
                    })
                    //保存列存储层的附加信息
                    functionAll.updateColumnZhName({
                        objectCollectStructs: JSON.stringify(arr)
                    }).then(res => {
                        if (res && res.success) {
                            resolve(res.code)
                        } else {
                            reject()
                        }
                    })
                })

                let saveColinfo = new Promise((resolve, reject) => {
                    //处理数据
                    let arr = [];
                    let arr2 = [];
                    this.columnHeader.forEach((item, index) => {
                        this.FieldProperty.forEach(val => {
                            if (item['markNum' + index] == val['markNum' + index] && val['trueFalse' + index] == true) {
                                val['dslad_id'].push(item.dslad_id)
                            }
                        })
                    })
                    arr = JSON.parse(JSON.stringify(this.FieldProperty));
                    arr.forEach((val, index) => {
                        if (val.dslad_id.length > 0) {
                            if (this.markIsHbase == 'Hbase') {
                                let num = index + 1;
                                arr2.push({
                                    columnId: val.struct_id,
                                    dsladIds: val.dslad_id,
                                    csiNumber: num
                                })
                            } else {
                                arr2.push({
                                    columnId: val.struct_id,
                                    dsladIds: val.dslad_id
                                })
                            }
                        }
                    })
                    arr2.forEach(item => { //数组去重
                        for (var i = 0; i < item.dsladIds.length; i++) {
                            for (var j = i + 1; j < item.dsladIds.length;) {
                                if (item.dsladIds[i] == item.dsladIds[j]) {
                                    item.dsladIds.splice(j, 1);
                                } else j++;
                            }
                        }
                    })
                    functionAll.saveColRelationStoreInfo({
                        ocs_id: this.ocsId,
                        colStoParams: JSON.stringify(arr2)
                    }).then(res => {
                        if (res && res.success) {
                            resolve(res.code)
                        } else {
                            reject()
                        }
                    })
                })

                Promise.all([saveName, saveColinfo]).then(res => {
                    let code1 = res[0];
                    let code2 = res[1];
                    if (code1 == "200" && code2 == "200") {
                        this.$Msg.customizTitle('配置字段属性保存成功', 'success');
                        this.dialogFieldProperty = false;
                        this.FieldProperty = [];
                    }
                }).catch(err => {

                })
            },
            // 配置字段属性取消按钮
            ConfigureFieldPropertiesCloseFun() {
                this.dialogFieldProperty = false;
                this.FieldProperty = [];
            },
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
            // 选择目的地弹框选择单独一个
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
            //选择目的地弹框提交确定按钮
            ChooseDestinationSubmitFun(formName) {
                let arr = [];
                let arr2 = [];
                this.destinationData.forEach(item => {
                    if (item.usedflag == true) {
                        arr.push(item.dsl_id)
                    }
                })
                arr.forEach(item => {
                    if (this.ruleForm.ex_destinationData[this.dataALLindex].dslIds.indexOf(item) == -1) {
                        this.ruleForm.ex_destinationData[this.dataALLindex].dslIds.push(
                            item
                        )
                    }
                })
                this.destinationData = [];
                this.dialogChooseDestination = false;
            },
            // 选择配置字段属性全选与反选
            allSelectFun(FieldProperty, colTrueFalse, val) {
                this.columnHeader[val].colTrueFalse = !this.columnHeader[val].colTrueFalse;
                this.FieldProperty.forEach((item, j) => {
                    if (this.columnHeader[val].colTrueFalse == true) {
                        item['trueFalse' + val] = false;
                    } else {
                        item['trueFalse' + val] = true;
                    }
                });
            },
            // 下一步保存
            next(formName) {
                this.gotoNextSteps(true);

            },
            startButtonFun() {
                this.gotoNextSteps(false);
                this.finishDialogVisible = true
            },
            execute() {
                let date = new Date()
                this.etl_date = date.getFullYear() + (date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + (date.getDate() > 9 ? date.getDate() : '0' + (date.getDate()))
                this.isLoading = true;
                functionAll.execute({
                    odc_id: this.$route.query.odc_id,
                    etl_date: this.etl_date
                }).then(res => {
                    this.isLoading = false;
                    if (res && res.success) {
                        this.$Msg.customizTitle('启动发送成功', 'success')
                        this.$router.push({
                            path: "/agentList"
                        });
                    }
                })
            },
            //保存接口
            gotoNextSteps(nextflag) {
                let batchSaveDtabRelationStoreInfo = new Promise((resolve, reject) => { //查询是否为已选择项回显数据
                    let arr = [];
                    let flag = true;
                    this.ruleForm.ex_destinationData.forEach((item) => {
                        if (item.dsl_id == undefined && item.dslIds.length == 0) {
                            this.$Msg.customizTitle(item.en_name + "未选择存储目的地，请选择", "warning");
                            flag = false;
                            return false;
                        }
                        if (item.dslIds.length == 0 && item.dsl_id.length > 0) {
                            arr.push({
                                tableId: item.ocs_id,
                                dslIds: item.dsl_id
                            })
                        } else if (item.dslIds.length > 0) {
                            arr.push({
                                tableId: item.ocs_id,
                                dslIds: item.dslIds
                            })
                        }
                    })
                    if (flag) {
                        functionAll.batchSaveDtabRelationStoreInfo({
                            odc_id: this.$route.query.odc_id,
                            dataStoRelaParams: JSON.stringify(arr)
                        }).then(res => {
                            if (res && res.success) {
                                resolve(res.code)
                            } else {
                                reject()
                            }
                        })
                    }
                })

                let updateTableZhName = new Promise((resolve, reject) => { //获取选择目的地信息
                    functionAll.updateTableZhName({
                        objectCollectTasks: JSON.stringify(this.ruleForm.ex_destinationData)
                    }).then(res => {
                        if (res && res.success) {
                            resolve(res.code)
                        } else {
                            reject()
                        }
                    })

                })
                Promise.all([batchSaveDtabRelationStoreInfo, updateTableZhName]).then(res => {
                    if (nextflag) {
                        let num0 = res[0];
                        let num1 = res[1];
                        if (num0 == 200 && num1 == 200) {
                            if (this.$route.query.edit == 'yes') { //编辑
                                this.$router.push({
                                    name: "startMode",
                                    query: {
                                        agent_id: this.$route.query.agent_id,
                                        odc_id: this.$route.query.odc_id,
                                        edit: this.$route.query.edit
                                    }
                                })
                            } else { //新增
                                this.$router.push({
                                    name: "startMode",
                                    query: {
                                        agent_id: this.$route.query.agent_id,
                                        odc_id: this.$route.query.odc_id
                                    }
                                })
                            }
                        }
                    } else {
                        //DO NOTHING
                    }
                })
            },
            //页面跳转
            routerpush(batchSaveDtabRelationStoreInfo, updateTableZhName) {
                Promise.all([batchSaveDtabRelationStoreInfo, updateTableZhName]).then(res => {
                    let num0 = res[0];
                    let num1 = res[1];
                    if (num0 == 200 && num1 == 200) {
                        if (this.$route.query.edit == 'yes') { //编辑
                            this.$router.push({
                                name: "startMode",
                                query: {
                                    agent_id: this.$route.query.agent_id,
                                    odc_id: this.$route.query.odc_id,
                                    edit: this.$route.query.edit
                                }
                            })
                        } else { //新增
                            this.$router.push({
                                name: "startMode",
                                query: {
                                    agent_id: this.$route.query.agent_id,
                                    odc_id: this.$route.query.odc_id
                                }
                            })
                        }
                    }
                })
            },
            // 所有表设置目的地
            AllSettingDestinationFun() {
                this.storeTypeFun(); //调用代码项
                functionAll.searchDataStore().then(res => {
                    if (res && res.success) {
                        res.data.forEach(item => {
                            // item.usedflag = false;
                            this.storeTypeData.forEach(val => {
                                if (item.store_type == val.code) {
                                    item.store_type = val.value;
                                }
                            })
                        })
                        this.dialogAllChooseDestination = true
                        this.AlldestinationData = res.data;
                    }
                })
            },
            // 全表设置目的地全选
            AllhandleSelectionChange(item) {
                this.Alldestinationchoose = item
            },
            // 全表设置目的地单个勾选
            allselectD(item) {
                this.Alldestinationchoose = item
            },
            // 全表设置目的地确定提交
            ChooseAllDestinationSubmitFun() {
                this.Alldestinationchoose.forEach(item => {
                    this.ruleForm.ex_destinationData.forEach(val => {
                        if (val.dslIds.indexOf(item.dsl_id) == -1) {
                            val.dslIds.push(
                                item.dsl_id
                            )
                        }

                    })
                })
                this.dialogAllChooseDestination = false;
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
            getRowKeys(row) {
                return row.dsl_id;
            },
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

    .mailTable > tr > td:nth-child(1) {
        width: 25%;
        text-align: right;
        padding: 10px;
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        box-sizing: border-box;
        font-weight: bold;
        background-color: #eff3f6;
    }

    .mailTable > tr > td:nth-child(2) {
        width: 40%;
        text-align: left;
        padding: 10px;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
    }

    .alltable >>> .el-dialog__body {
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

    .alldays >>> .el-input--medium .el-input__inner {
        height: 24px !important;
    }

    .settingbtn {
        color: #409eff;
        margin-left: 10px;
        font-size: 14px;
        font-weight: bold;
    }

    .steps5 >>> .el-form-item {
        margin-bottom: 0 !important;
    }

    .steps5 >>> .el-form-item__content::before {
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
        display: inline-block;
        position: absolute;
        left: -5%;
    }

    .steps5 >>> .el-icon-question:before {
        content: "" !important;
    }

    .steps5 >>> .el-icon-question:after {
        content: "\E7A4" !important;
        margin-left: 10px;
    }

    .steps5 >>> tr > td {
        padding: 0;
    }

    .steps5 >>> tr > td > .cell {
        padding: 11px 10px;
    }

    .steps5 >>> .el-form-item__error {
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
        margin-bottom: 2px;
        overflow: hidden;
        position: relative;
    }

    .cleanbtn > button {
        float: right;
    }
</style>
