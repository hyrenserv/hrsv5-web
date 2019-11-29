<template>
<div class="dataStoreAction">
    <el-row class="dataSave">
        <span>数据存储层定义</span>
    </el-row>

    <el-row class="partTwo">
        <el-table :data="tableData" border stripe size="medium">
            <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>

            <el-table-column prop="dsl_name" label="名称" align="center">

            </el-table-column>

            <el-table-column prop="store_type" label="存储类型" align="center">

            </el-table-column>

            <el-table-column prop="store_type" label="数据存储层配置属性" align="center">
                  <template slot-scope="scope">
                    <el-button type="info" size="mini" @click="dataSaveConfigure = true">数据存储层配置属性</el-button>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="160" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="dialogFormVisibleAdd = true;deleteArry(scope.$index, scope.row);">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-row>
    <!-- 数据存储层配置属性弹出框 -->
    <el-dialog title="数据存储层配置属性" :visible.sync="dataSaveConfigure">
        <el-form :model="formImport">
            <el-table :data="tableData" border stripe size="medium">
            <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>

            <el-table-column prop="storage_property_key" label="key" align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.storage_property_key"></el-input>
                </template>
            </el-table-column>

            <el-table-column prop="storage_property_val" label="value" align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.storage_property_val"></el-input>
                </template>
            </el-table-column>

            <el-table-column prop="dsla_remark" label="描述" align="center">
                <template slot-scope="scope">
                    <el-input type="textarea" v-model="scope.row.dsla_remark"></el-input>
                </template>
            </el-table-column>
        </el-table>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleImport" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="upload('formImport')" size="mini">上传</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as functionAll from "./dataStoreAction";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
export default {
    data() {
        return {
            form: {
                dsl_name: '',
                store_type: '',
                dsla_storelayer: [],
            },
            dslId: [],
            change_storelayer: [],
            tableData: [],
            storeType: [],
            checkboxType: [],
            dataSaveConfigure:false,
            rule: validator.default
        }
    },
    created() {
        this.searchDataStore();
        this.getCategoryItems("store_type");
        this.getCategoryItems("StoreLayerAdded");
        // this.getCategoryItems("UserType");
    },
    methods: {
        // 查询首页信息
        searchDataStore() {
            functionAll.searchDataStore().then((res) => {
                if (res && res.success) {
                    this.tableData = res.data.storeLayer
                }
            })
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
                            // this.storeType = res.data;
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
        // 获取下拉框的值
        changeData(data) {
            this.searchDataStoreById(data);
        },
        // 根据dsl_id显示对应的数据
        searchDataStoreById(e) {
            functionAll.searchDataStoreById({
                dsl_id: e
            }).then((res) => {
                this.tableData = res.data.layerAndAttr;
                this.form.store_type = res.data.store_type;
            })
        },
        // 添加行数据
        addTableData() {
            this.tableData.push({
                storage_property_key: "",
                storage_property_val: "",
                dsla_remark: ""
            })
        },
        // 删除表格的当前行
        deleteArry(index, row) {
            this.tableData.splice(index, 1)
        },
        // 点击保存添加
        saveData(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
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
                    this.form['dataStoreLayerAttr'] = JSON.stringify(this.tableData);
                    functionAll.addDataStore(
                        this.form
                    ).then((res) => {
                        if (res && res.success) {

                        }
                    })
                } else {
                    return false;
                }
            });

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
    margin: 20px 0;
    color: #2196f3;
    font-size: 18px;
}

/* 按钮样式 */
.dataStoreAction .elButton {
    float: right;
    margin-top: 20px;
}

.dataStoreAction .partTwoBtn {
    float: right;
    margin-top: 20px;
}

/* span字体样式 */
.dataStoreAction .partTwo span {
    display: inline-block;
    margin-top: 26px;
    color: #2196f3;
    font-size: 18px;
}
</style>
