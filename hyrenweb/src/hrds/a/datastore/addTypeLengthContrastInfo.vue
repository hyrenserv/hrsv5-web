<template>
<div class="addTypeLengthContrastInfo">
    <el-row class="dataSave">
        <el-col :span="12">
            <span>存储层数据类型长度对照主表</span>
        </el-col>
    </el-row>
    <el-row class="partOne">
        <el-form ref="form" :model="form" label-width="140px">
            <el-col :span="12">
                <el-col :span="20">
                    <el-form-item label="长度对照名称" prop="dlcs_name" :rules="filter_rules([{required: true}])">
                        <el-input v-model="form.dlcs_name" placeholder="长度对照名称"></el-input>
                    </el-form-item>
                </el-col>
            </el-col>

            <el-col :span="12">
                <el-col :span="20">
                    <el-form-item label="长度对照表备注" prop="dlcs_remark">
                        <el-input v-model="form.dlcs_remark" placeholder="长度对照表备注"></el-input>
                    </el-form-item>
                </el-col>
            </el-col>

            <span class="saveDataSpan">存储层数据类型长度对照详细信息</span>
            <el-button size="medium" class="partTwoBtn" type="success" @click="addTableData">增加行</el-button>
            <el-table :data="form.tableData" border stripe size="medium">
                <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>

                <el-table-column label="字段类型" align="center">
                    <template slot-scope="scope">
                        <el-form-item :prop="`tableData.${scope.$index}.dlc_type`" :rules="filter_rules([{required: true}])">
                            <el-input size="meduim" v-model="scope.row.dlc_type"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>

                <el-table-column label="字段长度" align="center">
                    <template slot-scope="scope">
                        <el-form-item :prop="`tableData.${scope.$index}.dlc_length`" :rules="filter_rules([{required: true,dataType: 'number'}])">
                            <el-input size="meduim" v-model="scope.row.dlc_length"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>

                <el-table-column prop="dlc_remark" label="备注" align="center">
                    <template slot-scope="scope">
                        <el-form-item>
                            <el-input type="textarea" v-model="scope.row.dlc_remark" autosize></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="deleteArry(scope.$index, scope.row);">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
    </el-row>
    <el-row class="partFour">
        <div class="elButton">
            <el-button type="primary" size="medium" @click="cancelSave">取消</el-button>
            <el-button type="primary" size="medium" @click="add('form')">保存</el-button>
        </div>
    </el-row>
</div>
</template>

<script>
import * as functionAll from "./dataStoreAction";
import * as validator from "@/utils/js/validator";
import * as message from "@/utils/js/message";
import regular from "@/utils/js/regular";
export default {
    data() {
        return {
            form: {
                tableData: []
            },
            rule: validator.default
        }
    },
    methods: {
        // 新增存储层数据类型长度对照表
        add(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.form.tableData.length == 0) {
                        message.customizTitle('字段类型为必填项,至少选择一项', 'warning')
                    } else if (this.form.tableData.length > 0) {
                        this.form['lengthInfo'] = JSON.stringify(this.form.tableData);
                        delete this.form.tableData;
                        functionAll.addTypeLengthContrastInfo(this.form).then((res) => {
                            if (res && res.success) {
                                message.saveSuccess(res);
                                this.$router.push({
                                    name: 'typeLengthContrastInfo'
                                })
                            } else {
                                this.form.tableData = JSON.parse(this.form.lengthInfo);
                            }
                        })
                    }
                }
            })

        },
        // 删除表格的当前行
        deleteArry(index, row) {
            if (this.form.tableData.length > 1) {
                this.form.tableData.splice(index, 1)
            } else {
                message.customizTitle('请至少选择一项', 'warning')
            }

        },
        // 添加行数据
        addTableData() {
            this.form.tableData.push({
                dlc_type: "",
                dlc_length: "",
                dlc_remark: ""
            })
        },
        // 点击取消返回展示页面        
        cancelSave() {
            this.$router.push({
                name: "typeLengthContrastInfo"
            })
        },
    }
}
</script>

<style scoped>
.addTypeLengthContrastInfo .dataSave {
    margin: 20px 0;
    color: #2196f3;
    font-size: 18px;
}

.addTypeLengthContrastInfo .dataSave .el-button {
    float: right;
}

/* 按钮样式 */
.addTypeLengthContrastInfo .elButton {
    float: right;
    margin-top: 20px;
}

.addTypeLengthContrastInfo .partTwoBtn {
    float: right;
    margin-top: 20px;
}

/* span字体样式 */
.addTypeLengthContrastInfo .saveDataSpan {
    display: inline-block;
    margin-top: 20px;
    color: #2196f3;
    font-size: 18px;
}

.addTypeLengthContrastInfo .el-table>>>.el-form-item__content {
    margin-left: 0 !important;
}
</style>
