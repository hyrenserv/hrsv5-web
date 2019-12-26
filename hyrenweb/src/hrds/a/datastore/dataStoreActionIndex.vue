<template>
<div class="dataStoreAction">
    <el-row class="dataSave">
        <span>数据存储层定义</span>
        <el-button size="medium" class="dataSaveBtn" type="primary" @click="addTableData"><i class="el-icon-circle-plus-outline"></i>新增数据存储层</el-button>
    </el-row>

    <el-row class="partTwo">
        <el-table :data="tableData" border stripe size="medium">
            <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>

            <el-table-column prop="dsl_name" label="名称" align="center"></el-table-column>

            <el-table-column prop="store_type" label="存储类型" align="center"></el-table-column>

            <el-table-column prop="store_type" label="数据存储层配置属性" align="center">
                <template slot-scope="scope">
                    <el-button type="info" size="mini" @click="dataSaveConfigure = true;handleEdit(scope.$index, scope.row)">数据存储层配置属性</el-button>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="160" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="dialogFormVisibleUpdate = true;updateData(scope.row.dsl_id)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="deleteArry(scope.row.dsl_id);">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-row>
    <!-- 数据存储层配置属性弹出框 -->
    <el-dialog title="数据存储层配置属性" :visible.sync="dataSaveConfigure">
        <el-form>
            <el-table :data="tableDataConfigure" border stripe size="medium">
                <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>

                <el-table-column prop="storage_property_key" label="key" align="center">
                    <template slot-scope="scope">
                        <el-input disabled v-model="scope.row.storage_property_key"></el-input>
                    </template>
                </el-table-column>

                <el-table-column prop="storage_property_val" label="value" align="center">
                    <template slot-scope="scope">
                        <el-input disabled v-model="scope.row.storage_property_val"></el-input>
                    </template>
                </el-table-column>

                <el-table-column prop="dsla_remark" label="描述" align="center">
                    <template slot-scope="scope">
                        <el-input disabled type="textarea" v-model="scope.row.dsla_remark" autosize></el-input>
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

    <!-- 编辑数据存储层配置属性弹出框 -->
    <el-dialog title="更新数据存储层" :visible.sync="dialogFormVisibleUpdate" :before-close="beforeClose">
        <el-row class="partOne">
            <el-form ref="form" :model="form" label-width="80px">
                <el-col :span="12">
                    <el-col :span="16">
                        <el-form-item label="名称" prop="dsl_name" :rules="filter_rules([{required: true}])">
                            <el-input v-model="form.dsl_name" placeholder="请输入名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>

                <el-col :span="12">
                    <el-form-item label="存储类型" prop="store_type" :rules="rule.selected">
                        <el-select v-model="form.store_type" placeholder="请选择存储类型">
                            <el-option v-for="item in storeType" :key="item.value" :label="item.value" :value="item.code"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col>
                    <el-form-item label="附加信息">
                        <el-checkbox-group v-model="form.dsla_storelayer">
                            <el-checkbox v-for="(item,index) in checkboxType" :key="index" :label="item.value" :value="item.code"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>

                <el-button size="mini" class="partTwoBtn" type="success" @click="addTableDataData">增加行</el-button>
                <el-table :data="form.tableDataConfigure" border stripe size="medium">
                    <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>

                    <el-table-column label="key" align="center">
                        <template slot-scope="scope">
                            <el-form-item :prop="`tableDataConfigure.${scope.$index}.storage_property_key`" :rules="filter_rules([{required: true}])">
                                <el-input v-model="scope.row.storage_property_key" size="small"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>

                    <el-table-column label="value" align="center">
                        <template slot-scope="scope">
                            <el-form-item :prop="`tableDataConfigure.${scope.$index}.storage_property_val`" :rules="filter_rules([{required: true}])">
                                <el-input v-model="scope.row.storage_property_val" size="small"></el-input>
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

                    <el-table-column label="操作" width="80" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="dialogFormVisibleAdd = true;deleteArrydata(scope.$index, scope.row);">删除</el-button>
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
</div>
</template>

<script>
import * as functionAll from "./dataStoreAction";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
import {
    async
} from 'q';
let arr = [];
let arr2 = [];
export default {
    data() {
        return {
            form: {
                dsl_name: '',
                store_type: '',
                dsla_storelayer: [],
                tableDataConfigure: [],
            },
            dsl_id: '',
            dslId: [],
            tableDataConfigure: [],
            change_storelayer: [],
            tableData: [],
            storeType: [],
            checkboxType: [],
            dataSaveConfigure: false,
            dialogFormVisibleUpdate: false,
            rule: validator.default
        }
    },
    created() {
        this.searchDataStore();
    },
    methods: {
        // 查询首页信息
        searchDataStore() {
            functionAll.searchDataStore().then((res) => {
                if (res && res.success) {
                    res.data.forEach((item) => {
                        functionAll.getValue({
                            category: "store_type",
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
            this.searchDataStoreById(row.dsl_id)
        },
        // 根据dsl_id显示对应的数据(数据存储层配置属性)
        searchDataStoreById(e) {
            this.checkboxType = [];
            functionAll.searchDataStoreById({
                dsl_id: e
            }).then((res) => {
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
                    } else {}
                })
            })
        },
        // 根据dsl_id删除对应的数据
        deleteArry(e) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
        // 处理编辑附加信息冲突问题的方法
        fixedError(e) {
            this.checkboxType = [];
            functionAll.searchDataStoreById({
                dsl_id: e
            }).then((res) => {
                this.form.tableDataConfigure = res.data.layerAndAttr;
                this.form.dsl_name = res.data.dsl_name;
                this.form.store_type = res.data.store_type;
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
        // 根据dsl_id更新对应的数据回显和更新
        updateData(e) {
            this.dsl_id = e;
            this.fixedError(e);
            this.getCategoryItems("store_type");
        },
        //  添加一条新的数据
        addTableData() {
            this.$router.push({
                name: "dataStoreAction"
            })
        },
        // 编辑时table新增一行
        addTableDataData() {
            this.form.tableDataConfigure.push({
                storage_property_key: "",
                storage_property_val: "",
                dsla_remark: ""
            })
        },
        // 编辑时table删除一行
        deleteArrydata(index, row) {
            this.form.tableDataConfigure.splice(index, 1)
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
                        this.form['dsla_storelayer'] = JSON.parse(JSON.stringify(this.change_storelayer))
                        this.form['dataStoreLayerAttr'] = JSON.stringify(this.form.tableDataConfigure);
                        this.form['dsl_id'] = this.dsl_id;
                        functionAll.updateDataStore(
                            this.form
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
                            }
                        })
                    } else {
                        return false;
                    }
                }
            });
        },
        // // 取消更新触发事件
        cancelUpdate() {
            this.searchDataStore();
            this.dialogFormVisibleUpdate = false;
        },
        // 关闭弹出框之前触发事件
        beforeClose() {
            this.searchDataStore();
            this.dialogFormVisibleUpdate = false;

        },
        // 获取代码项对应的值
        getCategoryItems(e) {
            if (e == "store_type") {
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
            } else {
                functionAll
                    .getCategoryItems({
                        category: e
                    })
                    .then(res => {
                        if (res && res.success) {}
                    });
            }
        },
    }
}
</script>

<style scoped>
.dataStoreAction {
    padding: 0 2% 0 2%;

}

/* form边框 */
.dataStoreAction .partOne {
    border: 1px solid #e6e6e6;
    padding: 2%;
    width: 100%;
}

.dataStoreAction .dataSave {
    margin: 20px 0 10px;
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
}

/* span字体样式 */
.dataStoreAction .partTwo span {
    display: inline-block;
    margin-top: 26px;
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
