<template>
<div class="dataStoreAction">
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
                <el-form-item label="附加信息" prop="dsla_storelayer" :rules="rule.selected">
                    <el-checkbox-group v-model="form.dsla_storelayer">
                        <el-checkbox v-for="item in checkboxType" :key="item.value" :label="item.value" :value="item.code"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-col>

        </el-form>
    </el-row>

    <el-row class="partTwo">

        <span>数据存储层配置属性</span>
        <el-button size="medium" class="partTwoBtn" type="success" @click="addTableData">增加行</el-button>
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

            <el-table-column label="操作" width="80" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="dialogFormVisibleAdd = true;deleteArry(scope.$index, scope.row);">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-row>
    <el-row class="partFour">
        <div class="elButton">
            <el-button type="primary" size="medium">取消</el-button>
            <el-button type="primary" size="medium" @click="saveData('form')">保存</el-button>
        </div>

    </el-row>
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

            change_storelayer: [],
            tableData: [],
            storeType: [],
            checkboxType: [],
            rule: validator.default
        }
    },
    created() {
        this.getCategoryItems("store_type");
        this.getCategoryItems("StoreLayerAdded");
        this.getCategoryItems("UserType")
    },
    methods: {
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
                        if (res && res.success) {
                            console.log(res.data)
                        }
                    });
            }

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

.dataStoreAction .partOne {
    border: 1px solid #e6e6e6;
    padding: 2%;
    width: 100%;
}

.dataStoreAction .elButton {
    float: right;
    margin-top: 20px;
}

.dataStoreAction .partTwoBtn {
    float: right;
    margin-top: 20px;
}

.dataStoreAction .partTwo span {
    display: inline-block;
    margin-top: 26px;
    color: #2196f3;
    font-size: 18px;
}
</style>
