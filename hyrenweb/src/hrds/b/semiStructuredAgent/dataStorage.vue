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
                        <el-button type="success" size="mini" v-if="scope.row.dsl_id !=undefined" @click="ChooseDestination(scope.row,scope.$index)">已选择</el-button>
                        <el-button type="warning" size="mini" v-else @click="ChooseDestination(scope.row,scope.$index)">未选择</el-button>
                    </span>
                </template>
            </el-table-column>
        </el-table>
    </el-form>
    <!-- <el-pagination @size-change="ex_destination_handleSizeChange" @current-change="ex_destination_handleCurrentChange" :current-page="ex_destinationcurrentPage" :page-sizes="[100, 200, 300, 400]" :page-size="ex_destinationpagesize" layout="total, sizes, prev, pager, next, jumper" :total="ruleForm.ex_destinationData.length" class="locationcenter"></el-pagination> -->
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
        <el-table stripe :data="FieldProperty.slice((fieldProperty_currentPage - 1) * fieldProperty_pagesize, fieldProperty_currentPage * fieldProperty_pagesize)" border size="medium" highlight-current-row>
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
            <el-table-column :label="item.value" v-for="(item,index) in columnHeader" :key="item.dsla_storelayer" align="center">
                <template slot-scope="scope" slot="header">
                    <el-checkbox :key="item.dsla_storelayer" :checked="item.colTrueFalse" v-model="item.colTrueFalse" @change="allSelectFun(FieldProperty,item.colTrueFalse,index)">
                        <span class="allclickColor">{{item.value}}</span>
                    </el-checkbox>
                </template>
                <template slot-scope="scope">
                    <el-checkbox :checked="scope.row['trueFalse'+index] " @change="changeMarknum(scope.row,index)" v-model="scope.row['trueFalse'+index]"></el-checkbox>
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
            dataALLindex: ''
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
            this.$router.push({
                name: "collectFileOption",
                query: {
                    agent_id: this.$route.query.agent_id,
                    odc_id: this.$route.query.odc_id
                }
            })
        },
        // 获取页面初始值
        getCollectStorageLayerInfo() {
            functionAll.getCollectStorageLayerInfo({
                odc_id: this.$route.query.odc_id
            }).then(res => {
                this.ruleForm.ex_destinationData = res.data;
            })
        },
        //根据ocs_id获取每行的目的存储数据
        ChooseDestination(row, index) {
            this.ocsId = row.ocs_id;
            this.dataALLindex = index;
            this.storeTypeFun(); //调用代码项
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
                })
            })

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
                arr.forEach((val, imdex) => {
                    if (val.dslad_id.length > 0) {
                        if (val.csi_number != undefined) {
                            arr2.push({
                                columnId: val.struct_id,
                                dsladIds: val.dslad_id,
                                csiNumber: val.csi_number
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
                    message.customizTitle('配置字段属性保存成功', 'success');
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
        //选择目的地弹框提交确定按钮
        ChooseDestinationSubmitFun(formName) {
            let arr = [];
            let arr2 = [];
            this.destinationData.forEach(item => {
                if (item.usedflag == true) {
                    arr.push(item)
                }
            })

            arr.forEach(item => {
                arr2.push(
                    item.dsl_id
                )
            })
            functionAll.saveDtabRelationStoreInfo({
                odc_id: this.$route.query.odc_id,
                ocs_id: this.ocsId,
                dslIds: arr2
            }).then(res => {
                if (res && res.success) {
                    this.getCollectStorageLayerInfo(); //更新表格信息
                    message.customizTitle('选择目的地保存成功', 'success');
                    this.destinationData = [];
                    this.dialogChooseDestination = false;
                }
            })
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
        // 下一步保存前检查
        checkDtabRelationStore() {
            let arr = [];
            this.ruleForm.ex_destinationData.forEach(item => {
                if (item.dsl_id != undefined) {
                    arr.push(item.ocs_id);
                }
            })
            functionAll.checkDtabRelationStore({
                ocsIds: arr
            }).then((res) => {
                if (res && res.success) {
                    this.updateTableZhName();
                }
            })
        },
        // 下一步保存
        next(formName) {
            this.checkDtabRelationStore();
        },
        //保存接口
        updateTableZhName() {
            functionAll.updateTableZhName({
                objectCollectTasks: JSON.stringify(this.ruleForm.ex_destinationData)
            }).then(res => {
                if (res && res.success) {
                    // this.$router.push({
                    //     name: "startMode",
                    //     query: {
                    //         agent_id: this.$route.query.agent_id,
                    //         odc_id: this.$route.query.odc_id
                    //     }
                    // })
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
        // --------------end-----------------------------------------------------------
        //获取初始数据，数据抽取及入库
        getTbStoDestByColSetIdFun() {

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

        /*   // 获取编辑状态下原有存储数据
        getSaveDataFun() {
          let paramst = {};
          paramst["colSetId"] = this.$route.query.id;
          addTaskAllFun.getTbStoDestByColSetId(paramst).then(res => {

          });
        }, */

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
    margin-bottom: 2px;
    overflow: hidden;
    position: relative;
}

.cleanbtn>button {
    float: right;
}
</style>
