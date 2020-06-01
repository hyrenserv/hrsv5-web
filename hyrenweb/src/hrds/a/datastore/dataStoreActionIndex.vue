<template>
<div class="dataStoreAction">
    <el-row class="dataSave">
        <span>数据存储层定义</span>
        <el-button size="small" class="dataSaveBtn" type="primary" @click="addTableData"><i class="el-icon-circle-plus-outline"></i>新增数据存储层</el-button>
    </el-row>
    <el-divider></el-divider>
    <el-row class="partTwo">
        <el-table :data="tableData" border stripe size="medium">
            <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>

            <el-table-column prop="dsl_name" label="名称" show-overflow-tooltip align="center"></el-table-column>

            <el-table-column prop="store_type" label="存储类型" show-overflow-tooltip align="center"></el-table-column>

            <el-table-column prop="dsl_remark" label="备注" show-overflow-tooltip align="center"></el-table-column>

            <el-table-column prop="is_hadoopclient" width="140" label="hadoop客户端" align="center"></el-table-column>

            <el-table-column prop="store_type" width="202" label="数据存储层配置属性" align="center">
                <template slot-scope="scope">
                    <el-button type="info" size="mini" @click="dataSaveConfigure = true;handleEdit(scope.$index, scope.row)">数据存储层配置属性</el-button>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="160" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="dialogFormVisibleUpdate = true;updateData(scope.row.dsl_id,scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="deleteArry(scope.row.dsl_id);">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-row>
    <!-- 数据存储层配置属性弹出框 -->
    <el-dialog title="数据存储层配置属性" :visible.sync="dataSaveConfigure" width="60%">
        <el-form>
            <el-table :data="tableDataConfigure" border stripe size="medium">
                <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>

                <el-table-column prop="storage_property_key" show-overflow-tooltip label="key" align="center"></el-table-column>

                <el-table-column prop="storage_property_val" show-overflow-tooltip label="value" align="center"></el-table-column>

                <el-table-column prop="dsla_remark" label="描述" show-overflow-tooltip align="center"></el-table-column>

                <el-table-column label="下载" align="center" width="80" v-if="showDownloadButton">
                    <template slot-scope="scope">
                        <el-button @click="downLoadFiles(scope.row)" size="mini" disabled type="info" v-if="scope.$index < showNumberDisabled ">下载</el-button>
                        <el-button @click="downLoadFiles(scope.row)" size="mini" type="info" v-else>下载</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-form-item label="附加信息">
                <el-checkbox-group v-model="form.dsla_storelayer" disabled>
                    <el-checkbox v-for="item in checkboxType" :key="item.value" :label="item.value" :value="item.code"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dataSaveConfigure = false" size="mini" type="danger">关 闭</el-button>
        </div>
    </el-dialog>

    <!-- 编辑数据存储层配置弹出框 -->
    <el-dialog title="更新数据存储层" :visible.sync="dialogFormVisibleUpdate" :before-close="beforeClose" width="80%">
        <el-row class="partOne">
            <el-form ref="form" :model="form" label-width="150px">
                <el-col :span="12">
                    <el-col :span="20">
                        <el-form-item label="存储层配置名称" prop="dsl_name" :rules="filter_rules([{required: true}])">
                            <el-input v-model="form.dsl_name" placeholder="请输入名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="存储层配置存储类型" prop="store_type" :rules="rule.selected">
                        <el-select v-model="form.store_type" placeholder="请选择存储类型" @change="changedata">
                            <el-option v-for="item in storeType" :key="item.value" :label="item.value" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-col :span="20">
                        <el-form-item label="存储层配置表备注">
                            <el-input v-model="form.dsl_remark" placeholder="存储层配置表备注"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="类型长度对比信息" prop="dlcs_id" :rules="rule.selected">
                        <el-select v-model="form.dlcs_id" placeholder="类型长度对比信息">
                            <el-option v-for="item in typeLengthinfo" :key="item.dlcs_id" :label="item.dlcs_name" :value="item.dlcs_id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="是否支持外部表" prop="is_hadoopclient" :rules="rule.selected" label-width="150px">
                        <el-radio-group v-model="form.is_hadoopclient">
                            <el-radio v-for="item in YesNo" :key="item.value" :label="item.code">{{item.value}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="数据类型对比信息" prop="dtcs_id" :rules="rule.selected">
                        <el-select v-model="form.dtcs_id" placeholder="数据类型对比信息">
                            <el-option v-for="item in dataTypeinfo" :key="item.dtcs_id" :label="item.dtcs_name" :value="item.dtcs_id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="12">
                    <el-col :span="20">
                        <el-form-item label="附加信息表备注">
                            <el-input v-model="form.dslad_remark" placeholder="附加信息表备注"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>

                <el-col :span="12">
                    <el-col>
                        <el-form-item label="附加信息">
                            <el-checkbox-group v-model="form.dsla_storelayer">
                                <el-checkbox v-for="item in checkboxType" :key="item.value" :label="item.value" :value="item.code"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-col>
                <span class="saveDataSpan">数据存储层配置属性</span>
                <el-button size="medium" class="partTwoBtn" type="success" @click="addTableDataRow">增加行</el-button>
                <el-table :data="form.tableDataConfigure" border stripe size="medium">
                    <el-table-column type="index" label="序号" width="64" align="center" :key="1"></el-table-column>

                    <el-table-column label="key" align="center" :key="2">
                        <template slot-scope="scope">
                            <el-input size="meduim" disabled v-if="scope.$index < lengthdata " v-model="scope.row.storage_property_key"></el-input>
                            <el-input size="meduim" v-else v-model="scope.row.storage_property_key"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column label="value" align="center" v-if="showValue" :key="3">
                        <template slot-scope="scope">
                            <el-select v-if="scope.$index == 0 &&scope.row.storage_property_key == 'database_type'" v-model="scope.row.storage_property_val" style="width:98%">
                                <el-option v-for="item in databaseType" :key="item.code" :label="item.value" :value="item.code"></el-option>
                            </el-select>
                            <el-input v-else size="meduim" v-model="scope.row.storage_property_val" style="width:98%"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column label="value" align="center" :key="4" v-if="selectVlueOrUpload">
                        <template slot-scope="scope">
                            <el-upload v-if="scope.$index > uploadindexless  &&  scope.$index <= uploadindexmore " class="upload-demo" ref="upload" :file-list="fileList" action="" :auto-upload="false" :on-change="handleChange" :on-remove="removeFile" style="width:98%">
                                <el-button size="small" type="info" @click="handleEditchange(scope.$index, scope.row)">选择文件</el-button>
                            </el-upload>

                            <el-select v-if="scope.$index <= inputindex &&scope.$index == 0 &&scope.row.storage_property_key == 'database_type' " v-model="scope.row.storage_property_val" style="width:98%">
                                <el-option v-for="item in databaseType" :key="item.code" :label="item.value" :value="item.code"></el-option>
                            </el-select>

                            <el-input type="text" size="meduim" v-model="scope.row.storage_property_val" v-else-if="scope.$index <= inputindex " style="width:98%"></el-input>

                            <el-radio-group v-model="scope.row.radio" v-if="scope.$index > uploadindexmore">
                                <el-radio @change="selectedValue=true;handleEditValue(scope.$index, scope.row)" label="0">填写value</el-radio>
                                <el-radio @change="selectedUploadValue=true;handleEditValue(scope.$index, scope.row)" label="1">选择文件</el-radio>
                            </el-radio-group>
                        </template>
                    </el-table-column>

                    <el-table-column prop="dsla_remark" label="描述" align="center">
                        <template slot-scope="scope">
                            <el-input type="textarea" v-model="scope.row.dsla_remark" autosize></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="80" align="center">
                        <template slot-scope="scope">
                            <el-button type="danger" size="small" disabled v-if="scope.row.storage_property_val !=undefined &&scope.row.storage_property_val.indexOf('.xml') !=-1 ">删除</el-button>
                            <el-button type="danger" size="small" v-else @click="deleteTableDataRow(scope.$index, scope.row);">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelUpdate" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="upDate('form')" size="mini">更新</el-button>
        </div>
    </el-dialog>
    <!-- 编辑弹出框完 -->
    <!-- 填写value弹出框 -->
    <el-dialog title="value" :visible.sync="selectedValue">
        <el-form>
            <el-table :data="selectedValueTabledata" border stripe size="medium">
                <el-table-column type="index" label="序号" width="64" align="center" :key="1"></el-table-column>

                <el-table-column label="key" prop="storage_property_key" align="center" :key="2">
                    <template slot-scope="scope">
                        <el-input size="meduim" disabled v-model="scope.row.storage_property_key"></el-input>
                    </template>
                </el-table-column>

                <el-table-column label="value" align="center" :key="3">
                    <template slot-scope="scope">
                        <el-input size="meduim" v-model="scope.row.storage_property_val"></el-input>
                    </template>
                </el-table-column>

            </el-table>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSaveselectedValue" size="mini" type="danger">取消</el-button>
            <el-button @click="SaveselectedValue" size="mini" type="primary">确认</el-button>
        </div>
    </el-dialog>

    <!-- 上传导入文件弹出框 -->
    <el-dialog title="上传导入的文件 " :visible.sync="selectedUploadValue" width="30%">
        <el-form>
            <el-form-item label="上传要导入的文件 :">
                <el-upload class="upload-demo" ref="upload" :file-list="fileList" action="" :auto-upload="false" :on-change="handleChange" :on-remove="removeFile">
                    <el-button size="small" type="info">选择上传文件</el-button>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSaveselectedUploadValue" size="mini" type="danger">取消</el-button>
            <el-button @click="SaveselectedUploadValue" size="mini" type="primary">确认</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as functionAll from "./dataStoreAction";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
import * as message from "@/utils/js/message";
let arr = [];
let arr2 = [];
let tableDataLength;
let tableDatas = [];
let fileArry = [];
let dataKey;
let index;
let flag = 0;
let flag2 = 0;
let flag3 = 0;
let flag4 = 0;
let flag5 = 0;
let flag6 = 0;
let uploadindex;
let valueIndex;
let storetype;
let uploadIndex;
let arrMarkall = [];
let diffentMark = [];
export default {
    data() {
        return {
            form: {
                dsl_name: '',
                dtcs_id: '',
                dlcs_id: '',
                is_hadoopclient: '',
                dslad_remark: '',
                store_type: '',
                dsl_remark: '',
                dsla_storelayer: [],
                tableDataConfigure: [],
            },
            oldDataArry: [],
            showValue: true,
            selectVlueOrUpload: false,
            showDownloadButton: false,
            selectedUploadValue: false,
            selectedValue: false,
            showNumberDisabled: '',
            lengthdata: '',
            deleteLength: '',
            uploadindexmore: '',
            uploadindexless: '',
            inputindex: '',
            selectedValueTabledata: [],
            dataTypeinfo: [],
            typeLengthinfo: [],
            fileList: [],
            dsl_id: '',
            tableDataConfigure: [],
            change_storelayer: [],
            tableData: [],
            storeType: [],
            checkboxType: [],
            YesNo: [],
            databaseType: [],
            dataSaveConfigure: false,
            dialogFormVisibleUpdate: false,
            rule: validator.default
        }
    },
    created() {
        this.searchDataStore();
        fileArry = [];
    },
    methods: {
        // 查询首页信息
        searchDataStore() {
            functionAll.searchDataStore().then((res) => {
                if (res && res.success) {
                    res.data.forEach((item) => {
                        if (item.is_hadoopclient == "1") {
                            item.is_hadoopclient = "是";
                        } else if (item.is_hadoopclient == "0") {
                            item.is_hadoopclient = "否";
                        };
                        functionAll.getValue({
                            category: "Store_type",
                            code: item.store_type
                        }).then((res) => {
                            item.store_type = res.data;
                        })
                    })
                    this.tableData = res.data;
                }
            })
        },
        // 获取表格当前行数据
        handleEdit(index, row) {
            this.searchDataStoreById(row.dsl_id);
        },
        // 根据dsl_id显示对应的数据(数据存储层配置属性)
        searchDataStoreById(e) {
            this.checkboxType = [];
            functionAll.searchDataStoreById({
                dsl_id: e
            }).then((res) => {
                // 是否显示下载按钮
                if (res.data.store_type == 2 || res.data.store_type == 3) {
                    this.showDownloadButton = true;
                    let i = 0;
                    res.data.layerAndAttr.forEach((item) => {
                        if (item.is_file == 0) {
                            i++;
                        }
                    });
                    if (res.data.store_type == 2) {
                        this.showNumberDisabled = i;
                    } else if (res.data.store_type == 3) {
                        this.showNumberDisabled = i;
                    }

                } else {
                    this.showDownloadButton = false;
                }
                this.tableDataConfigure = res.data.layerAndAttr;
                this.form.dsl_name = res.data.dsl_name;
                this.form.store_type = res.data.store_type;
                res.data.layerAndAdded.forEach((item) => {
                    if (item.dsla_storelayer) {
                        functionAll.getValue({
                            category: "StoreLayerAdded",
                            code: item.dsla_storelayer
                        }).then((res) => {
                            this.checkboxType.push({
                                value: res.data,
                                code: item.dsla_storelayer
                            })
                            this.form.dsla_storelayer = true;
                        })
                    }
                })
            })
        },
        // 数据存储完整信息
        getDataLayerAttrKeyTwo(val) {
            functionAll.getDataLayerAttrKey({
                store_type: val
            }).then(res => {
                let arry = [];
                let arr = [];
                let arrNew = [];
                for (let index = 0; index < res.data.jdbcKey.length; index++) {
                    if (res.data.jdbcKey[index] == "database_type") {
                        arr.push(res.data.jdbcKey[index]);
                        this.getCategoryItems("DatabaseType");
                    } else {
                        arrNew.push(res.data.jdbcKey[index]);
                    }
                }
                // 数据合并
                this.oldDataArry = [...arr, ...arrNew, ...res.data.fileKey];
            })
        },
        // 根据dsl_id删除对应的数据
        deleteArry(e) {
            this.$confirm('确定删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                functionAll.deleteDataStore({
                        dsl_id: e,
                    })
                    .then(res => {
                        if (res && res.success) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            // 重新渲染页面
                            this.searchDataStore();
                        }
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 根据dsl_id更新对应的数据回显和更新
        updateData(e, row) {
            this.dsl_id = e;
            this.fixedError(e, row);
            this.getCategoryItems("Store_type");
            this.getCategoryItems("IsFlag");
            this.searchDataLayerDataTypeLengthInfo();
            this.searchDataLayerDataTypeInfo();
        },
        // 处理编辑附加信息冲突问题的方法
        fixedError(e, row) {
            this.checkboxType = [];
            functionAll.searchDataStoreById({
                dsl_id: e
            }).then((res) => {
                // 获取编辑参数
                storetype = res.data.store_type;
                let arry = [];
                let arr = [];
                let arr2 = [];
                let arr3 = [];
                // 处理tableData格式正确性
                res.data.layerAndAttr.forEach((item) => {
                    if (item.is_file == 0) {
                        arr.push(item);
                    } else if (item.is_file == 1) {
                        arr2.push(item);
                    }
                })
                for (let index = 0; index < arr.length; index++) {
                    if (arr[index].storage_property_key == "database_type") {
                        arr3.push(arr[index]);
                        arr.splice(index, 1);
                        this.getCategoryItems("DatabaseType");
                    }
                }
                arry = [...arr3, ...arr, ...arr2]
                let j = arr.length - 1;
                let i = res.data.layerAndAttr.length;
                if (row.store_type == "hive") {
                    this.getDataLayerAttrKeyTwo("2")
                } else if (row.store_type == "Hbase") {
                    this.getDataLayerAttrKeyTwo("2")
                };
                // 编辑显示选择文件
                if (row.store_type == "hive" || row.store_type == "Hbase") {
                    if (row.store_type == "hive") {
                        this.inputindex = j;
                        this.uploadindexmore = arry.length;
                        this.uploadindexless = j;
                        this.showValue = false;
                        this.selectVlueOrUpload = true;
                        let length = arry.length;
                        flag = 1;
                        flag2 = 0;
                        flag3 = 0;
                        flag4 = 0;
                        flag5 = 0;
                        flag6 = 0;
                        this.form.tableDataConfigure = arry;
                    } else if (row.store_type == "Hbase") {
                        this.inputindex = j;
                        this.uploadindexmore = arry.length;
                        this.uploadindexless = j;
                        this.showValue = false;
                        this.selectVlueOrUpload = true;
                        let length = arry.length;
                        flag = 0;
                        flag2 = 0;
                        flag3 = 1;
                        flag4 = 0;
                        flag5 = 0;
                        flag6 = 0;
                        this.form.tableDataConfigure = arry;
                    }
                    diffentMark = arry;
                } else {
                    if (row.store_type == "solr") {
                        flag = 0;
                        flag2 = 0;
                        flag3 = 0;
                        flag4 = 1;
                        flag5 = 0;
                        flag6 = 0;
                    } else if (row.store_type == "ElasticSearch") {
                        flag = 0;
                        flag2 = 0;
                        flag3 = 0;
                        flag4 = 0;
                        flag5 = 1;
                        flag6 = 0;
                    } else if (row.store_type == "mongodb") {
                        flag = 0;
                        flag2 = 0;
                        flag3 = 0;
                        flag4 = 0;
                        flag5 = 0;
                        flag6 = 1;
                    } else if (row.store_type == "关系型数据库") {
                        flag = 0;
                        flag2 = 1;
                        flag3 = 0;
                        flag4 = 0;
                        flag5 = 0;
                        flag6 = 0;
                    }
                    this.showValue = true;
                    this.selectVlueOrUpload = false;
                    fileArry = [];
                    this.form.tableDataConfigure = arry;
                    arrMarkall = arry;
                }
                this.form.dsl_name = res.data.dsl_name;
                this.form.dtcs_id = res.data.dtcs_id;
                this.form.dlcs_id = res.data.dlcs_id;
                valueIndex = res.data.store_type;
                if (res.data.dsl_remark) {
                    this.form.dsl_remark = res.data.dsl_remark;
                }
                this.form.store_type = res.data.store_type;
                if (res.data.layerAndAdded.length > 0) {
                    if (res.data.layerAndAdded[0].dslad_remark != "undefined") {
                        this.form.dslad_remark = res.data.layerAndAdded[0].dslad_remark;
                    } else {
                        this.form.dslad_remark = '';
                    }
                }
                this.form.is_hadoopclient = res.data.is_hadoopclient;
                this.form.dsla_storelayer = [];
                arr = [];
                if (res.data.layerAndAdded.length == 0) {
                    this.getCategoryItems("StoreLayerAdded");
                } else {
                    res.data.layerAndAdded.forEach((item) => {
                        if (item.dsla_storelayer) {
                            functionAll.getValue({
                                category: "StoreLayerAdded",
                                code: item.dsla_storelayer
                            }).then((res) => {
                                if (res && res.success) {
                                    arr.push({
                                        value: res.data,
                                        code: item.dsla_storelayer
                                    })
                                    this.fixedError2(arr);
                                }
                            })
                        }
                    });
                }
            })
        },
        // 封装调用方法处理冲突2
        fixedError2(arr) {
            functionAll.getCategoryItems({
                category: "StoreLayerAdded"
            }).then((res) => {
                arr2 = res.data;
                this.form.dsla_storelayer.splice(0, this.form.dsla_storelayer.length)
                arr.forEach((item) => {
                    arr2.forEach((select) => {
                        if (item.code == select.code) {
                            this.checkboxType = arr2;
                            this.form.dsla_storelayer.push(item.value);
                        }
                    })
                })
            })
        },

        //  添加一条新的数据
        addTableData() {
            this.$router.push({
                name: "dataStoreAction"
            })
        },
        // 编辑时table删除一行
        deleteArrydata(index, row) {
            this.form.tableDataConfigure.splice(index, 1)
        },
        // 获取编辑时的文件名称
        handleEditchange(index, row) {
            dataKey = row.storage_property_key;
        },
        //更新数据
        upDate(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // 处理参数
                    if (this.form.tableDataConfigure.length == 0) {
                        this.$message({
                            showClose: true,
                            type: 'warning',
                            message: '表格数据信息为必填项',
                            duration: 0
                        })
                    } else if (this.form.tableDataConfigure.length > 0) {
                        this.change_storelayer = [];
                        this.form.dsla_storelayer.forEach((item) => {
                            if (item == "主键") {
                                this.change_storelayer.push("01");
                            } else if (item == "rowkey") {
                                this.change_storelayer.push("02");
                            } else if (item == "索引列") {
                                this.change_storelayer.push("03");
                            } else if (item == "预聚合列") {
                                this.change_storelayer.push("04");
                            } else if (item == "排序列") {
                                this.change_storelayer.push("05");
                            } else if (item == "分区列") {
                                this.change_storelayer.push("06");
                            }
                        });

                        let param = new FormData() // 创建form对象
                        param.append('dsl_name', this.form.dsl_name);
                        param.append('store_type', this.form.store_type);
                        param.append('is_hadoopclient', this.form.is_hadoopclient);
                        param.append('dsl_remark', this.form.dsl_remark);
                        param.append('dslad_remark', this.form.dslad_remark);
                        param.append('dsl_id', this.dsl_id);

                        // 处理参数dataStoreLayerAttr
                        let valueArr = [];
                        this.form.tableDataConfigure.forEach((item) => {
                            if (item.is_file != 1 || JSON.stringify(item).indexOf("is_file") == -1) {
                                valueArr.push(item);
                            }
                        });
                        valueArr.forEach(item => {
                            item['is_file'] = 0;
                        })
                        // 如果是hbase
                        if (valueIndex == 3) {
                            let arrtable = [];
                            valueArr.forEach(item => {
                                if (item.storage_property_val) {
                                    arrtable.push(item);
                                    item['is_file'] = 0;
                                }
                            });
                            arrtable.forEach((item) => {
                                if (item.radio) {
                                    delete item.radio
                                }
                            })
                            param.append('dataStoreLayerAttr', JSON.stringify(arrtable));
                        } else if (valueIndex == 2) {
                            let arrtable = [];
                            for (let i = 0; i < valueArr.length; i++) {
                                if (valueArr[i].storage_property_val) {
                                    arrtable.push(valueArr[i]);
                                    valueArr[i].is_file = "0";
                                }
                            }
                            param.append('dataStoreLayerAttr', JSON.stringify(arrtable));
                        } else {
                            if (tableDatas.length > 0) {
                                tableDatas.forEach((item) => {
                                    if (item.radio) {
                                        delete item.radio
                                    }
                                })
                                param.append('dataStoreLayerAttr', JSON.stringify(tableDatas));
                            } else {
                                param.append('dataStoreLayerAttr', JSON.stringify(this.form.tableDataConfigure));
                            };
                        }
                        //    处理参数dsla_storelayer
                        for (let index = 0; index < this.change_storelayer.length; index++) {
                            param.append('dsla_storelayer', this.change_storelayer[index])
                        }
                        param.append('dtcs_id', this.form.dtcs_id);
                        param.append('dlcs_id', this.form.dlcs_id);
                        // 处理上传文件参数
                        if (fileArry.length > 0) {
                            for (let index = 0; index < fileArry.length; index++) {
                                param.append('files', fileArry[index]);
                            }
                        } else {
                            param.append('files', '');
                        };
                        functionAll.updateDataStore(
                            param
                        ).then((res) => {
                            if (res && res.success) {
                                this.$message({
                                    type: 'success',
                                    message: '更新成功!'
                                });
                                // 重新渲染页面
                                this.searchDataStore();
                                // 关闭弹出层
                                this.dialogFormVisibleUpdate = false;
                                fileArry = [];
                                this.fileList = [];
                            }
                        })
                    }
                }
            });
        },
        // // 取消更新触发事件
        cancelUpdate() {
            this.searchDataStore();
            this.dialogFormVisibleUpdate = false;
            this.$refs.form.resetFields();
            this.form.tableDataConfigure = [];
        },
        // 关闭弹出框之前触发事件
        beforeClose() {
            this.searchDataStore();
            this.dialogFormVisibleUpdate = false;
            this.$refs.form.resetFields();
        },
        // 获取代码项对应的值
        getCategoryItems(e) {
            if (e == "Store_type") {
                functionAll
                    .getCategoryItems({
                        category: e
                    })
                    .then(res => {
                        if (res && res.success) {
                            this.storeType = res.data;
                        }
                    });
            } else if (e == "StoreLayerAdded") {
                functionAll
                    .getCategoryItems({
                        category: e
                    })
                    .then(res => {
                        if (res && res.success) {
                            this.checkboxType = res.data;
                        }
                    });
            } else if (e == "IsFlag") {
                functionAll
                    .getCategoryItems({
                        category: e
                    })
                    .then(res => {
                        this.YesNo = res.data;
                    });
            } else if (e == "DatabaseType") {
                functionAll
                    .getCategoryItems({
                        category: e
                    })
                    .then(res => {
                        this.databaseType = res.data;
                    });
            }
        },
        // 获取数据类型长度信息
        searchDataLayerDataTypeLengthInfo() {
            functionAll.searchDataLayerDataTypeLengthInfo().then((res) => {
                let arr = res.data;
                res.data.forEach((item, index) => {
                    delete item.dlc_id;
                    delete item.dlc_type;
                    delete item.dlc_length;
                    delete item.dlcs_remark;
                    delete item.dlc_remark;
                })
                for (var i = 0; i < arr.length; i++) {
                    for (var j = i + 1; j < arr.length;) {
                        if (arr[i].dlcs_id == arr[j].dlcs_id && arr[i].dlcs_name == arr[j].dlcs_name) {
                            arr.splice(j, 1);
                        } else j++;
                    }
                }
                this.typeLengthinfo = arr;
            })
        },
        // 获取数据类型信息
        searchDataLayerDataTypeInfo() {
            functionAll.searchDataLayerDataTypeInfo().then((res) => {
                let arr = res.data;
                arr.forEach((item, index) => {
                    delete item.dtc_id;
                    delete item.target_type;
                    delete item.source_type;
                    delete item.dtcs_remark;
                    delete item.dtc_remark;
                })
                for (var i = 0; i < arr.length; i++) {
                    for (var j = i + 1; j < arr.length;) {
                        if (arr[i].dtcs_id == arr[j].dtcs_id && arr[i].dtcs_name == arr[j].dtcs_name) {
                            arr.splice(j, 1);
                        } else j++;
                    }
                }
                this.dataTypeinfo = arr;
            })
        },
        // 根据存储类型动态显示key
        changedata(val) {
            let dataList = [];
            let numberCount = '';
            let numberCountfile = '';
            valueIndex = val;
            this.$refs.form.clearValidate();
            functionAll.getDataLayerAttrKey({
                store_type: val
            }).then(res => {
                let arry = [];
                let arr = [];
                let arrNew = [];
                for (let index = 0; index < res.data.jdbcKey.length; index++) {
                    if (res.data.jdbcKey[index] == "database_type") {
                        arr.push(res.data.jdbcKey[index]);
                        this.getCategoryItems("DatabaseType");
                    } else {
                        arrNew.push(res.data.jdbcKey[index]);
                    }
                }
                // 数据合并
                dataList = [...arr, ...arrNew, ...res.data.fileKey];
                // 记录需要判断的长度
                numberCount = res.data.jdbcKey.length;
                numberCountfile = res.data.fileKey.length;
                dataList.forEach((item, index) => {
                    arry.push({
                        'storage_property_key': item
                    })
                })
                this.form.tableDataConfigure = arry;
                tableDataLength = this.form.tableDataConfigure.length;
                this.lengthdata = 0;
                this.deleteLength = 0;
                if (val === "1") {
                    this.showValue = true;
                    this.selectVlueOrUpload = false;
                    this.showDownloadButton = false;
                    if (flag2 == 1) {
                        this.form.tableDataConfigure = arrMarkall;
                        this.lengthdata = 0
                    } else {

                    }
                } else if (val === "2") {
                    if (flag == 1) {
                        this.form.tableDataConfigure = diffentMark;
                        this.lengthdata = 0
                    } else {

                    }
                    this.showDownloadButton = false;
                    this.showValue = false;
                    this.selectVlueOrUpload = true;
                    this.uploadindexless = numberCount - 1;
                    this.uploadindexmore = this.form.tableDataConfigure.length - 1;
                    this.inputindex = numberCount - 1;
                } else if (val === "3") {
                    if (flag3 == 1) {
                        this.form.tableDataConfigure = diffentMark;
                        this.lengthdata = 0
                    } else {

                    }
                    this.showValue = false;
                    this.selectVlueOrUpload = true;
                    this.showDownloadButton = false;
                    this.uploadindexless = numberCount - 1;
                    this.uploadindexmore = this.form.tableDataConfigure.length - 1;
                    this.inputindex = numberCount - 1;
                } else if (val === "4") {
                    this.showValue = true;
                    this.selectVlueOrUpload = false;
                    if (flag4 == 1) {
                        this.form.tableDataConfigure = arrMarkall;
                        this.lengthdata = 0
                    } else {

                    }
                    this.showDownloadButton = false;
                } else if (val === "5") {
                    this.showValue = true;
                    if (flag5 == 1) {
                        this.form.tableDataConfigure = arrMarkall;
                        this.lengthdata = 0
                    } else {

                    }
                    this.showDownloadButton = false;
                    this.selectVlueOrUpload = false;
                } else if (val === "6") {
                    this.showValue = true;
                    if (flag6 == 1) {
                        this.form.tableDataConfigure = arrMarkall;
                        this.lengthdata = 0
                    } else {

                    }
                    this.showDownloadButton = false;
                    this.selectVlueOrUpload = false;
                }
            })
        },
        // 保存上传文件
        handleChange(file, fileList) {
            if (fileList.length > 1) {
                message.customizTitle("最多上传一条,请删除多余项", "warning");
            } else {
                if (dataKey == file.name) {
                    fileArry.push(file.raw);
                } else {
                    message.customizTitle("请选择与key命名相同的文件", "warning");
                }
            }
        },
        // 删除上传文件
        removeFile(file, fileList) {
            if (fileArry.length != 0) {
                if (JSON.stringify(fileArry).indexOf(JSON.stringify(file)) != -1) {
                    fileArry.splice(file, 1);
                }
                fileList.forEach((item) => {
                    if (item.name != dataKey) {
                        message.customizTitle("请保留与key命名相同的文件", "warning");
                    }
                })
            }
        },
        // 下载文件
        downLoadFiles(val) {
            functionAll.downloadConfFile({
                fileName: val.storage_property_key,
                filePath: val.storage_property_val
            }).then((res) => {
                this.filename = val.storage_property_key;
                const blob = new Blob([res.data]);
                if (window.navigator.msSaveOrOpenBlob) {
                    // 兼容IE10
                    navigator.msSaveBlob(blob, this.filename);
                } else {
                    //  chrome/firefox
                    let aTag = document.createElement("a");
                    aTag.download = this.filename;
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
        },
        // 编辑的新增
        addTableDataRow() {
            this.form.tableDataConfigure.push({
                storage_property_key: "",
                storage_property_val: "",
                dsla_remark: "",
                dsl_id: this.dsl_id,
            });
        },
        // 删除一行信息
        deleteTableDataRow(index, row) {
            this.form.tableDataConfigure.splice(index, 1);
        },
        // 确定填写value
        SaveselectedValue() {
            this.selectedValue = false;
        },
        // 取消填写value
        cancelSaveselectedValue() {
            this.selectedValueTabledata.forEach((item) => {
                delete item.radio;
            });
            this.selectedValue = false;
        },
        // 确定选择好要上传的文件
        SaveselectedUploadValue() {
            if (fileArry.length > 0) {
                this.fileList = [];
                this.selectedUploadValue = false;
            } else {
                message.customizTitle("请选择上传文件保存", "warning");
            }
        },
        // 取消选择上传文件
        cancelSaveselectedUploadValue() {
            this.form.tableDataConfigure.forEach((item, index) => {
                if (index == uploadindex) {
                    if (item.radio) {
                        delete item.radio;
                    }
                }
            });
            this.selectedUploadValue = false;
            this.fileList = [];
        },
        // 获取对应的key值
        handleEditValue(index, row) {
            this.selectedValueTabledata = [];
            dataKey = row.storage_property_key;
            this.selectedValueTabledata.push(row)
        },
    }
}
</script>

<style scoped>
.dataStoreAction>>>.el-divider--horizontal {
    margin: 1px 0 15px 0;
}

/* form边框 */
.dataStoreAction .partOne {
    border: 1px solid #e6e6e6;
    padding: 2%;
    width: 100%;
}

.dataStoreAction .dataSave {
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: #2196f3;
    font-size: 18px;
}

/* 按钮样式 */
.dataStoreAction .elButton {
    float: right;
    margin-top: 20px;
}

.dataStoreAction .dataSaveBtn {
    float: right;
}

.dataStoreAction .partTwoBtn {
    margin: 20px 0 2px;
    float: right;
}

/* span字体样式 */
.dataStoreAction .saveDataSpan {
    display: inline-block;
    margin-top: 20px;
    font-size: 18px;
}

/* table的input样式 */
.dataStoreAction .el-table>>>.el-form-item {
    margin-bottom: 17px !important;
}

.dataStoreAction .el-table>>>.el-form-item__content {
    margin-left: 0 !important;
}
</style>
