<template>
<div class="typeLengthContrastInfo">
    <el-row class="dataSave">
        <el-col :span="12">
            <span>添加存储层数据类型长度对照表</span>
        </el-col>
    </el-row>
    <el-row class="partOne">
        <el-form ref="form" :model="form" label-width="140px">
            <el-col :span="12">
                <el-form-item label="字段类型" prop="lengthInfo" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.lengthInfo" placeholder="字段类型"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">

            </el-col>

            <el-col :span="12">
                <el-form-item label="长度对照表备注" prop="dlc_remark">
                    <el-input v-model="form.dlc_remark" placeholder="长度对照表备注"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="长度对照表ID" prop="dlcs_id">
                    <el-input v-model="form.dlcs_id" placeholder="长度对照表ID"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="长度对照名称" prop="dlcs_name" :rules="filter_rules([{required: true}])">
                    <el-input v-model="form.dlcs_name" placeholder="长度对照名称"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="12">
                <el-form-item label="备注" prop="dlcs_remark">
                    <el-input v-model="form.dlcs_remark" placeholder="备注"></el-input>
                </el-form-item>
            </el-col>
            <span class="saveDataSpan">数据存储层配置属性</span>
            <el-button size="medium" class="partTwoBtn" type="success" @click="addTableData">增加行</el-button>
            <el-table :data="arry" border stripe size="mini">
                <el-table-column label="多列作rowkey的顺序" align="center" prop="key"></el-table-column>

                <el-table-column label="字段英文名" align="center" prop="name">
                    <template slot-scope="scope">
                        <el-checkbox name="nature" v-model="scope.row.d"></el-checkbox> &nbsp;<span class="spanName">{{scope.row.name}}</span>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="moveUp(scope.$index,scope.row,arry) ">上移</el-button>
                        <el-button type="primary" size="mini" @click="moveDown(scope.$index, scope.row,arry)">下移</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelAdd" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="add('form')" size="mini">保存</el-button>
        </div>
    </el-row>
</div>
</template>

<script>
import * as functionAll from "./dataStoreAction";
import * as validator from "@/utils/js/validator";
import * as message from "@/utils/js/message";
import regular from "@/utils/js/regular";
let tableDataLength;
export default {
    data() {
        return {
            form: {

            },
            change_storelayer: [],
            storeType: [],
            checkboxType: [],
            YesNo: [],
            addTypeLengthContrastInfo: false,
            rule: validator.default
        }
    },
    created() {
        this.searchDataTypeMasterTableInfo()
    },
    methods: {

        searchDataTypeMasterTableInfo() {
            functionAll.searchDataTypeMasterTableInfo().then((res) => {
                console.log(res.data)
            })
        },
        // 新增存储层数据类型长度对照表
        add(formName) {
            console.log(this.form)
            this.$refs[formName].validate(valid => {
                if (valid) {
                    functionAll.addTypeLengthContrastInfo(this.form).then((res) => {
                        console.log(res)
                    })
                }
            })

        },
        // 关闭弹出框之前触发事件
        beforeClose() {
            this.addTypeLengthContrastInfo = false;
            this.$refs.form.resetFields();
        },
        // 取消添加触发事件
        cancelAdd() {
            this.addTypeLengthContrastInfo = false;
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
            }
        },
        // 添加行数据
        addTableData() {
            this.form.tableData.push({
                storage_property_key: "",
                storage_property_val: "",
                dsla_remark: ""
            })
        },
        // 删除表格的当前行
        deleteArry(index, row) {
            console.log(index + 1)
            if (this.form.tableData.length > tableDataLength && index + 1 > tableDataLength) {
                this.form.tableData.splice(index, 1)
            } else if (this.form.tableData.length <= tableDataLength && index + 1 <= tableDataLength) {
                this.$message({
                    showClose: true,
                    message: "剩余项为必填项",
                    type: 'warning',
                    duration: 0
                });
            } else {
                this.$message({
                    showClose: true,
                    message: "该项为必填项",
                    type: 'warning',
                    duration: 0
                });
            }

        },
        // 点击保存添加
        saveData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.form.tableData.length == 0) {
                        this.$message({
                            showClose: true,
                            type: 'warning',
                            message: '数据存储层配置属性为必填项',
                            duration: 0
                        })
                    } else if (this.form.tableData.length > 0) {
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
                        this.form['dsla_storelayer'] = JSON.parse(JSON.stringify(this.change_storelayer))
                        this.form['dataStoreLayerAttr'] = JSON.stringify(this.form.tableData);
                        functionAll.addDataStore(
                            this.form
                        ).then((res) => {
                            if (res && res.success) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                })
                                this.$router.push({
                                    name: "dataStoreActionIndex"
                                })
                            }
                        })
                    } else {
                        return false;
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
            this.$refs.form.clearValidate();
            console.log(val)
            if (val === "1") {
                this.form.tableData = [{
                    storage_property_key: "database_drive"
                }, {
                    storage_property_key: "jdbc_url"
                }, {
                    storage_property_key: "user_name"
                }, {
                    storage_property_key: "database_pad"
                }, {
                    storage_property_key: "database_type"
                }];
                tableDataLength = this.form.tableData.length;
            } else if (val === "2") {
                this.form.tableData = [{
                    storage_property_key: "hbase-site.xml"
                }, {
                    storage_property_key: "hdfs-site.xml"
                }, {
                    storage_property_key: "core-site.xml"
                }, {
                    storage_property_key: "yarn-site.xml"
                }, {
                    storage_property_key: "mapreduce-site.xml"
                }]
                tableDataLength = this.form.tableData.length;
            } else if (val === "3") {
                this.form.tableData = [{
                    storage_property_key: "solr_url"
                }]
                tableDataLength = this.form.tableData.length;
            } else if (val === "4") {
                this.form.tableData = []
                tableDataLength = this.form.tableData.length;
            } else if (val === "5") {
                this.form.tableData = []
                tableDataLength = this.form.tableData.length;
            }

        },
    }
}
</script>

<style scoped>
.typeLengthContrastInfo {
    padding: 0 2% 0 2%;
}

/* form边框 */
.typeLengthContrastInfo .partOne {
    border: 1px solid #e6e6e6;
    padding: 2%;
    width: 100%;
}

.typeLengthContrastInfo .dataSave {
    margin: 20px 0;
    color: #2196f3;
    font-size: 18px;
}

.typeLengthContrastInfo .dataSave .el-button {
    float: right;
}

/* 按钮样式 */
.typeLengthContrastInfo .elButton {
    float: right;
    margin-top: 20px;
}

.typeLengthContrastInfo .partTwoBtn {
    float: right;
    margin-top: 20px;
}

/* span字体样式 */
.typeLengthContrastInfo .saveDataSpan {
    display: inline-block;
    margin-top: 20px;
    color: #2196f3;
    font-size: 18px;
}

/* dialog的input样式 */
.typeLengthContrastInfo>>>.el-dialog .el-input {
    width: 284px;
}
</style>
