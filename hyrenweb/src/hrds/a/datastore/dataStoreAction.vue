<template>
<div class="dataStoreAction">
    <el-row class="dataSave">
        <span>数据存储层配置定义</span>
    </el-row>
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
            <el-button size="medium" class="partTwoBtn" v-if="showAddbutton" type="success" @click="addTableData">增加行</el-button>
            <el-table :data="form.tableData" border stripe size="medium">
                <el-table-column type="index" label="序号" width="64" align="center" :key="1"></el-table-column>

                <el-table-column prop="storage_property_key" label="key" align="center" :key="2">
                    <template slot-scope="scope">
                        <el-form-item :prop="`tableData.${scope.$index}.storage_property_key`" :rules="filter_rules([{required: true}])">
                            <el-input size="meduim" disabled v-if="scope.$index < lengthdata " v-model="scope.row.storage_property_key"></el-input>
                            <el-input size="meduim" v-else v-model="scope.row.storage_property_key"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>

                <el-table-column label="value" prop="storage_property_val" align="center" v-if="showValue" :key="3">
                    <template slot-scope="scope">
                        <el-form-item v-if="scope.$index == 0 &&scope.row.storage_property_key == 'database_type'" :prop="`tableData.${scope.$index}.storage_property_val`" :rules="rule.selected">
                            <el-select v-model="scope.row.storage_property_val" style="width:98%">
                                <el-option v-for="item in databaseType" :key="item.code" :label="item.value" :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item v-else :prop="`tableData.${scope.$index}.storage_property_val`" :rules="filter_rules([{required: true}])">
                            <el-input size="meduim" v-model="scope.row.storage_property_val" style="width:98%"></el-input>
                        </el-form-item>

                    </template>
                </el-table-column>

                <el-table-column prop="dsla_remark" label="描述" align="center">
                    <template slot-scope="scope">
                        <el-form-item>
                            <el-input type="textarea" v-model="scope.row.dsla_remark" autosize></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>

                <el-table-column label="value" prop="storage_property_val" align="center" :key="3" v-if="selectVlueOrUpload">
                    <template slot-scope="scope">
                        <el-upload v-if="scope.$index > uploadindexless  &&  scope.$index <= uploadindexmore " class="upload-demo" ref="upload" :file-list="fileList" action="" :auto-upload="false" :on-change="handleChange" :on-remove="removeFile" style="width:98%">
                            <el-button size="small" type="info" @click="handleEdit(scope.$index, scope.row)">选择文件</el-button>
                        </el-upload>

                        <el-form-item :prop="`tableData.${scope.$index}.storage_property_val`" :rules="rule.selected" v-if="scope.$index <= inputindex &&scope.$index == 0 &&scope.row.storage_property_key == 'database_type' ">
                            <el-select v-if="scope.$index == 0 &&scope.row.storage_property_key == 'database_type' " v-model="scope.row.storage_property_val" style="width:98%">
                                <el-option v-for="item in databaseType" :key="item.code" :label="item.value" :value="item.code"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item :prop="`tableData.${scope.$index}.storage_property_val`" :rules="filter_rules([{required: true}])" v-else-if="scope.$index <= inputindex ">
                            <el-input type="text" size="meduim" v-model="scope.row.storage_property_val" v-if="scope.$index <= inputindex " style="width:98%"></el-input>
                        </el-form-item>

                        <el-radio-group v-model="scope.row.radio" v-if="scope.$index > uploadindexmore">
                            <el-radio @change="selectedValue=true;handleEdit(scope.$index, scope.row)" label="0">填写value</el-radio>
                            <el-radio @change="selectedUploadValue=true;handleEdit(scope.$index, scope.row)" label="1">选择文件</el-radio>
                        </el-radio-group>

                    </template>
                </el-table-column>

                <el-table-column label="操作" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button type="danger" size="small" disabled v-if="scope.$index < deleteLength " @click="dialogFormVisibleAdd = true;deleteArry(scope.$index, scope.row);">删除</el-button>
                        <el-button type="danger" size="small" v-else @click="dialogFormVisibleAdd = true;deleteArry(scope.$index, scope.row);">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
    </el-row>
    <el-row class="partFour">
        <div class="elButton">
            <el-button type="primary" size="medium" @click="cancelSave">取消</el-button>
            <el-button type="primary" size="medium" @click="saveData('form')">保存</el-button>
        </div>
    </el-row>

    <!-- 填写value弹出框 -->
    <el-dialog title="value" :visible.sync="selectedValue">
        <el-form ref="formDialog" :model="formDialog">
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
import * as message from "@/utils/js/message";
import regular from "@/utils/js/regular";
let tableDataLength;
let tableDatas = [];
let fileArry = [];
let dataKey;
let index;
let uploadindex;
let valueIndex;
export default {
    data() {
        return {
            form: {
                dsl_name: '',
                store_type: '',
                dsla_storelayer: [],
                tableData: [],
            },
            formDialog: {},
            showValue: true,
            selectVlueOrUpload: false,
            showAddbutton: false,
            selectedUploadValue: false,
            selectedValue: false,
            lengthdata: '',
            deleteLength: '',
            uploadindexmore: '',
            uploadindexless: '',
            inputindex: '',
            selectedValueTabledata: [],
            change_storelayer: [],
            storeType: [],
            checkboxType: [],
            dataTypeinfo: [],
            typeLengthinfo: [],
            fileList: [],
            YesNo: [],
            databaseType: [],
            rule: validator.default
        }
    },
    created() {
        this.getCategoryItems("Store_type");
        this.getCategoryItems("StoreLayerAdded");
        this.getCategoryItems("IsFlag");
        this.searchDataLayerDataTypeLengthInfo();
        this.searchDataLayerDataTypeInfo();
        fileArry = [];
    },
    methods: {
        // 获取代码项对应的值
        getCategoryItems(e) {
            if (e == "Store_type") {
                functionAll
                    .getCategoryItems({
                        category: e
                    })
                    .then(res => {
                        this.storeType = res.data;
                    });
            } else if (e == "StoreLayerAdded") {
                functionAll
                    .getCategoryItems({
                        category: e
                    })
                    .then(res => {
                        this.checkboxType = res.data;
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
        // 添加行数据
        addTableData() {
            this.form.tableData.push({
                storage_property_key: "",
                storage_property_val: "",
                dsla_remark: ""
            });
        },
        // 删除表格的当前行
        deleteArry(index, row) {
            this.form.tableData.splice(index, 1);
        },
        // 点击保存添加
        saveData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (valueIndex == 3 || valueIndex == 2) {
                        if (fileArry.length == 0) {
                            message.customizTitle("上传的文件不能为空！", "warning")
                        } else {
                            if (this.form.tableData.length > 0) {
                                // 处理参数
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
                                })

                                let param = new FormData() // 创建form对象
                                param.append('dsl_name', this.form.dsl_name);
                                param.append('store_type', this.form.store_type);
                                param.append('is_hadoopclient', this.form.is_hadoopclient);
                                if (this.form.dsl_remark != undefined) {
                                    param.append('dsl_remark', this.form.dsl_remark);
                                } else {
                                    param.append('dsl_remark', '');
                                }
                                if (this.form.dslad_remark != undefined) {
                                    param.append('dslad_remark', this.form.dslad_remark);
                                } else {
                                    param.append('dslad_remark', '');
                                }
                                this.form.tableData.forEach(item => {
                                    item['is_file'] = 0;
                                })
                                // 处理参数dataStoreLayerAttr
                                // 如果是hbase
                                if (valueIndex == 3) {
                                    let arrtable = [];
                                    this.form.tableData.forEach(item => {
                                        if (item.storage_property_val) {
                                            arrtable.push(item);
                                            item['is_file'] = 0;
                                        }
                                    })
                                    arrtable.forEach((item) => {
                                        if (item.radio) {
                                            delete item.radio
                                        }
                                    })
                                    param.append('dataStoreLayerAttr', JSON.stringify(arrtable));
                                } else if (valueIndex == 2) {
                                    let arrtable = [];
                                    for (let i = 0; i < this.form.tableData.length; i++) {
                                        if (this.form.tableData[i].storage_property_val) {
                                            arrtable.push(this.form.tableData[i]);
                                            this.form.tableData[i].is_file = "0";
                                        }
                                    }
                                    param.append('dataStoreLayerAttr', JSON.stringify(arrtable));
                                }

                                //    处理参数dsla_storelayer
                                for (let index = 0; index < this.change_storelayer.length; index++) {
                                    param.append('dsla_storelayer', this.change_storelayer[index])
                                }
                                param.append('dtcs_id', this.form.dtcs_id);
                                param.append('dlcs_id', this.form.dlcs_id);
                                if (fileArry.length > 0) {
                                    for (let index = 0; index < fileArry.length; index++) {
                                        param.append('files', fileArry[index]);
                                    };
                                }
                                functionAll.addDataStore(
                                    param
                                ).then((res) => {
                                    if (res && res.success) {
                                        message.saveSuccess(res);
                                        this.$router.push({
                                            name: "dataStoreActionIndex"
                                        })
                                    }
                                })
                            }
                        }
                    } else {
                        if (this.form.tableData.length > 0) {
                            // 处理参数
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
                            if (this.form.dsl_remark != undefined) {
                                param.append('dsl_remark', this.form.dsl_remark);
                            } else {
                                param.append('dsl_remark', '');
                            }
                            if (this.form.dslad_remark != undefined) {
                                param.append('dslad_remark', this.form.dslad_remark);
                            } else {
                                param.append('dslad_remark', '');
                            }
                            this.form.tableData.forEach((item) => {
                                item['is_file'] = 0;
                            });
                            param.append('dataStoreLayerAttr', JSON.stringify(this.form.tableData));
                            //    处理参数dsla_storelayer
                            for (let index = 0; index < this.change_storelayer.length; index++) {
                                param.append('dsla_storelayer', this.change_storelayer[index])
                            }
                            param.append('dtcs_id', this.form.dtcs_id);
                            param.append('dlcs_id', this.form.dlcs_id);
                            param.append('files', '');
                            functionAll.addDataStore(
                                param
                            ).then((res) => {
                                if (res && res.success) {
                                    message.saveSuccess(res);
                                    this.$router.push({
                                        name: "dataStoreActionIndex"
                                    })
                                }
                            })
                        }
                    }
                }
            });
        },
        // 点击取消返回展示页面        
        cancelSave() {
            this.$router.push({
                name: "dataStoreActionIndex"
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
                // 赋值给表格
                this.form.tableData = arry;
                this.deleteLength = this.form.tableData.length;
                tableDataLength = this.form.tableData.length;
                this.lengthdata = this.form.tableData.length;
                if (val === "1") {
                    this.showValue = true;
                    this.selectVlueOrUpload = false;
                    this.showAddbutton = true;
                } else if (val === "2") {
                    this.showValue = false;
                    this.selectVlueOrUpload = true;
                    this.showAddbutton = true;
                    this.uploadindexless = numberCount - 1;
                    this.uploadindexmore = this.form.tableData.length - 1;
                    this.inputindex = numberCount - 1;
                } else if (val === "3") {
                    this.showValue = false;
                    this.selectVlueOrUpload = true;
                    this.showAddbutton = true;
                    this.uploadindexless = numberCount - 1;
                    this.uploadindexmore = this.form.tableData.length - 1;
                    this.inputindex = numberCount - 1;
                } else if (val === "4") {
                    this.selectVlueOrUpload = false;
                    this.showValue = true;
                    this.showAddbutton = true;
                } else if (val === "5") {
                    this.selectVlueOrUpload = false;
                    this.showAddbutton = true;
                    this.showValue = true;
                } else if (val === "6") {
                    this.selectVlueOrUpload = false;
                    this.showAddbutton = true;
                    this.showValue = true;

                }
            })

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
        handleEdit(index, row) {
            uploadindex = index;
            this.selectedValueTabledata = [];
            dataKey = row.storage_property_key;
            this.selectedValueTabledata.push(row);
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
            this.form.tableData.forEach((item, index) => {
                if (index == uploadindex) {
                    if (item.radio) {
                        delete item.radio;
                    }
                }
            });
            this.selectedUploadValue = false;
            this.fileList = [];
        }
    }
}
</script>

<style scoped>
/* form边框 */
.dataStoreAction .partOne {
    border: 1px solid #e6e6e6;
    padding: 2%;
    width: 100%;
}

.dataStoreAction .dataSave {
    margin: 20px 0;
    color: #2196f3;
    font-size: 18px;
}

/* 按钮样式 */
.dataStoreAction .elButton {
    float: right;
    margin-top: 20px;
    margin-bottom: 20px;
}

.dataStoreAction .partTwoBtn {
    float: right;
    margin-top: 20px;
}

.dataStoreAction .partTwoBtn:last-child {
    margin-right: 10px;
}

/* span字体样式 */
.dataStoreAction .saveDataSpan {
    display: inline-block;
    margin-top: 20px;
    color: #2196f3;
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
